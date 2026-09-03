import React from 'react';
import { BarChart2, BookOpen } from 'lucide-react';

const TeacherGradebookRight = () => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
    <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
      <BarChart2 className="w-4 h-4 text-blue-600" /> Marksheet Guidelines
    </h3>
    <p className="text-xs text-gray-500 leading-relaxed">
      Continuous Assessment (CA1 & CA2) scores can be saved as drafts at any time. If a subject is configured for Computer-Based Testing (CBT), the official exam score is automatically synchronized from verified CBT submissions.
    </p>
  </div>
);

export default TeacherGradebookRight;
