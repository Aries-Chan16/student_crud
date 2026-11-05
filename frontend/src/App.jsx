import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import AlertBanner from './components/AlertBanner';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { studentService } from './api/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Show notification alert with auto-dismiss
  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
  }, []);

  const dismissAlert = () => setAlert(null);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      setAlert(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  // Load students from Spring Boot backend
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await studentService.getAll();
      // Ensure data is array
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showAlert('error', `Failed to load students: ${err.message}. Make sure the Spring Boot backend is running on port 8080.`);
    } finally {
      setIsLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Distinct list of courses for the dropdown filter
  const courses = useMemo(() => {
    const list = students
      .map((s) => s.course?.trim())
      .filter((c) => Boolean(c));
    return Array.from(new Set(list)).sort();
  }, [students]);

  // Filtered students based on search and selected course
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        (student.firstname && student.firstname.toLowerCase().includes(term)) ||
        (student.lastname && student.lastname.toLowerCase().includes(term)) ||
        (student.course && student.course.toLowerCase().includes(term)) ||
        (student.section && student.section.toLowerCase().includes(term)) ||
        (student.id && String(student.id).includes(term));

      const matchesCourse =
        !selectedCourse ||
        (student.course && student.course.trim().toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  // Handle Form Submission (Add or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // UPDATE existing student
        const updated = await studentService.update(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? (typeof updated === 'object' ? updated : { ...s, ...formData }) : s))
        );
        showAlert('success', `Student "${formData.firstname} ${formData.lastname}" updated successfully!`);
        setEditingStudent(null);
      } else {
        // CREATE new student
        const created = await studentService.create(formData);
        if (created && typeof created === 'object' && created.id) {
          setStudents((prev) => [...prev, created]);
        } else {
          // Re-fetch if API didn't return created object directly
          await fetchStudents();
        }
        showAlert('success', `Student "${formData.firstname} ${formData.lastname}" added successfully!`);
      }
    } catch (err) {
      console.error('Save failed:', err);
      showAlert('error', `Operation failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Select a student for editing
  const handleStartEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handle student deletion (Strictly inline confirm, no modal)
  const handleDeleteStudent = async (id) => {
    setIsDeletingId(id);
    try {
      await studentService.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showAlert('success', `Student #${id} deleted successfully.`);
    } catch (err) {
      console.error('Delete failed:', err);
      showAlert('error', `Failed to delete student: ${err.message}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCourse('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <Header
        totalCount={students.length}
        courseCount={courses.length}
        onRefresh={fetchStudents}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Status Alert Banner */}
        <AlertBanner alert={alert} onDismiss={dismissAlert} />

        {/* Dual-Column Master-Detail Layout (Strictly Non-Modal) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Panel (Add / Edit) */}
          <section className="lg:col-span-4 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </section>

          {/* Right Column: Search + Table Directory */}
          <section className="lg:col-span-8 space-y-4">
            {/* Search and Filters */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={courses}
              totalResults={filteredStudents.length}
              onClear={handleClearFilters}
            />

            {/* Students Table with Inline Actions */}
            <StudentTable
              students={filteredStudents}
              isLoading={isLoading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={handleStartEdit}
              onDelete={handleDeleteStudent}
              isDeletingId={isDeletingId}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          Student CRUD &bull; Powered by Vite, React, Tailwind CSS &amp; Spring Boot
        </div>
      </footer>
    </div>
  );
}
