import React from 'react';
import { GraduationCap, Users, BookOpen, RefreshCw } from 'lucide-react';

export default function Header({ totalCount, courseCount, onRefresh, isLoading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Information System</h1>
              <p className="text-xs text-slate-500 font-medium">CRUD Management &bull; Spring Boot &amp; React API</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{totalCount} Total Students</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{courseCount} Active Courses</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh student list"
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
