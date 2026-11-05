import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, X, Sparkles, Loader2, BookOpen, Layers, User } from 'lucide-react';

const INITIAL_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: '',
};

export default function StudentForm({
  editingStudent,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData(INITIAL_FORM);
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = 'First name is required';
    if (!formData.lastname.trim()) errs.lastname = 'Last name is required';
    if (!formData.course.trim()) errs.course = 'Course is required';
    if (!formData.section.trim()) errs.section = 'Section is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData(INITIAL_FORM);
      setErrors({});
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div className={`bg-white rounded-2xl border transition-all shadow-sm ${
      isEditing ? 'border-indigo-400 ring-2 ring-indigo-500/10' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isEditing ? 'bg-amber-100 text-amber-700' : 'bg-indigo-50 text-indigo-600'
          }`}>
            {isEditing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing ? `Modifying ID #${editingStudent.id}` : 'Fill in the information below'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> Edit Mode
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. Juan"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors.firstname
                ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200 bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {errors.firstname && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.firstname}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Dela Cruz"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors.lastname
                ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200 bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {errors.lastname && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.lastname}</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Course <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. BS Information Technology"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors.course
                ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200 bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {errors.course && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.course}</p>
          )}
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Section <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="e.g. DA3A or 3-A"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors.section
                ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200 bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {errors.section && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.section}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/30'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isEditing ? 'Updating...' : 'Saving...'}</span>
              </>
            ) : isEditing ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Update Student</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Save Student</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : 'Clear'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
