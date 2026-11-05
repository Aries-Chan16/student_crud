import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses,
  totalResults,
  onClear,
}) {
  const hasFilter = searchTerm.trim() !== '' || selectedCourse !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by first name, last name, course, section..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative sm:w-56">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasFilter && (
          <button
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          Showing <span className="font-semibold text-slate-700">{totalResults}</span> student{totalResults === 1 ? '' : 's'}
        </span>
        {hasFilter && (
          <span className="text-indigo-600 font-medium">Filtered results</span>
        )}
      </div>
    </div>
  );
}
