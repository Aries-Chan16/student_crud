import React, { useState } from 'react';
import { Pencil, Trash2, AlertTriangle, Check, X, User, GraduationCap, Hash, Layers } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  editingStudentId,
  onEdit,
  onDelete,
  isDeletingId,
}) {
  // Store which row currently has inline delete confirmation active
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await onDelete(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header / Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-16">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-slate-400" />
                  ID
                </div>
              </th>
              <th className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Student Name
                </div>
              </th>
              <th className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  Course
                </div>
              </th>
              <th className="py-3.5 px-4 w-32">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Section
                </div>
              </th>
              <th className="py-3.5 px-4 text-right w-48">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="h-4 w-8 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-36 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-48 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-16 bg-slate-200 rounded"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-8 w-24 bg-slate-200 rounded ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : students.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} className="py-12 px-4 text-center">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">No students found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      No student records match your query or database is currently empty.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              students.map((student) => {
                const isEditing = editingStudentId === student.id;
                const isConfirming = confirmDeleteId === student.id;
                const isDeleting = isDeletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isEditing
                        ? 'bg-amber-50/70 border-l-4 border-l-amber-500'
                        : isConfirming
                        ? 'bg-rose-50/50'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-500">
                      #{student.id}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {student.firstname ? student.firstname[0] : ''}
                          {student.lastname ? student.lastname[0] : ''}
                        </div>
                        <span>
                          {student.lastname}, {student.firstname}
                        </span>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                        {student.course}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                        {student.section}
                      </span>
                    </td>

                    {/* Actions with strictly INLINE delete confirm */}
                    <td className="py-3.5 px-4 text-right">
                      {isConfirming ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-xs font-semibold text-rose-700 flex items-center gap-1 mr-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            Confirm?
                          </span>
                          <button
                            onClick={() => handleConfirmDelete(student.id)}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isDeleting ? 'Deleting...' : 'Yes'}</span>
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>No</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEdit(student)}
                            title="Edit student"
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              isEditing
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
                            }`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{isEditing ? 'Editing' : 'Edit'}</span>
                          </button>

                          <button
                            onClick={() => handleDeleteClick(student.id)}
                            title="Delete student"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
