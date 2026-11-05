import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ alert, onDismiss }) {
  if (!alert) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    },
  };

  const config = typeConfig[alert.type] || typeConfig.info;

  return (
    <div
      className={`border rounded-xl px-4 py-3 flex items-center justify-between gap-3 shadow-xs transition-all ${config.bg}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {config.icon}
        <span className="text-sm font-medium">{alert.message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-md hover:bg-black/5 text-slate-500 hover:text-slate-700 transition-colors"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
