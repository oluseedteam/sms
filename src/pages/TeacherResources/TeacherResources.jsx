import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutGrid, List, Upload, Filter, SortAsc, Search,
  Download, Eye, Star, Clock, FileText, BookOpen,
  Image, Monitor, ClipboardList, Layers, ChevronDown,
  ChevronRight, PlusCircle, X, ChevronUp
} from 'lucide-react';
import TeacherResourcesRight from './TeacherResourcesRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

// ── Data ──────────────────────────────────────────────────────
const resourceTypes = [
  { label: 'Lesson Plans', icon: BookOpen,      count: 45, children: ['Math Lessons (12)', 'English Lessons (15)', 'Science Lessons (10)', 'Social Studies (8)'] },
  { label: 'Worksheets',   icon: FileText,      count: 123 },
  { label: 'Activities',   icon: Layers,        count: 87  },
  { label: 'Visual Aids',  icon: Image,         count: 34  },
  { label: 'Assessments',  icon: ClipboardList, count: 29  },
  { label: 'Multimedia',   icon: Monitor,       count: 15  },
  { label: 'Templates',    icon: Layers,        count: 38  },
];

const grades   = ['Grade 3', 'Grade 4', 'Grade 5', 'Any Grade'];
const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Physical Education'];

const recentlyUsed = [
  { label: 'Addition Practice', time: '2 hours ago' },
  { label: 'Reading Log',       time: 'Yesterday'   },
  { label: 'Plant Growth Lab',  time: '1 day ago'   },
];

const collections = [
  { label: 'Current Unit', count: 23  },
  { label: 'Best Worksheets', count: 45 },
  { label: 'Parent Resources', count: 12 },
  { label: 'Favorites ⭐',   count: 8   },
];

const resources = [
  {
    id: 1, type: 'WORKSHEET', typeColor: 'bg-blue-500',
    title: 'Addition Practice – Up to 1000',
    desc: '35 problems with word problems and visual aids for Grade 4 Math',
    meta: 'Worksheet | Grade 4 Math',
    pages: 2, minutes: 20, downloads: 198, rating: 4,
    tags: ['Grade 4', 'Math'],
  },
  {
    id: 2, type: 'LESSON PLAN', typeColor: 'bg-green-500',
    title: 'Plants & Animals Life Cycles',
    desc: 'Complete 5-day unit with hands-on activities and illustrations',
    meta: 'Lesson Plan | Grade 4 Science',
    pages: 8, minutes: 60, downloads: 89, rating: 5,
    tags: ['Grade 4', 'Science'],
  },
  {
    id: 3, type: 'ACTIVITY', typeColor: 'bg-orange-500',
    title: 'Story Writing Workshop',
    desc: 'Creative writing exercise with peer review and publishing steps',
    meta: 'Group Activity | Grade 4 English',
    pages: 3, minutes: 45, downloads: 45, rating: 4,
    tags: ['Grade 4', 'English'],
  },
  {
    id: 4, type: 'TEMPLATE', typeColor: 'bg-purple-500',
    title: 'Math Worksheet Creator',
    desc: 'Customizable worksheet template for various math topics',
    meta: 'Template | Grades 3-5',
    pages: 1, minutes: null, downloads: 334, rating: 5,
    tags: ['Grade 4', 'Math'],
  },
  {
    id: 5, type: 'WORKSHEET', typeColor: 'bg-blue-500',
    title: 'Reading Comprehension Pack',
    desc: '10 differentiated reading passages with comprehension questions',
    meta: 'Worksheet | Grade 4 English',
    pages: 18, minutes: 30, downloads: 198, rating: 4,
    tags: ['Grade 4', 'English'],
  },
  {
    id: 6, type: 'ACTIVITY', typeColor: 'bg-orange-500',
    title: 'Volcano Science Experiment',
    desc: 'Step-by-step instructions for creating an erupting volcano model',
    meta: 'Lab Activity | Grade 4 Science',
    pages: 2, minutes: 45, downloads: 167, rating: 5,
    tags: ['Grade 4', 'Science'],
  },
];

const tabOptions = ['My Resources', 'School Library', 'Shared Resources'];
const activeChips = ['Grade 4 ×', 'Math ×', 'English ×'];

// ── Component ─────────────────────────────────────────────────
const TeacherResources = () => {
  const [activeTab,    setActiveTab]    = useState('My Resources');
  const [viewMode,     setViewMode]     = useState('grid');
  const [expandedType, setExpandedType] = useState(0);
  const [leftOpen,     setLeftOpen]     = useState(false); // mobile left panel
  const [search,       setSearch]       = useState('');

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Teaching Resources &amp; Materials</h1>
        {/* Mobile: toggle left panel */}
        <button
          onClick={() => setLeftOpen(v => !v)}
          className="flex items-center gap-2 text-sm font-bold text-blue-600 sm:hidden border border-blue-200 rounded-2xl px-4 py-2"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* ── Tab bar ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
        {tabOptions.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            {t === 'My Resources' ? '🗂 ' : t === 'School Library' ? '🏫 ' : '🤝 '}{t}
          </button>
        ))}
      </div>

      {/* ── Three-column body ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left filter sidebar ─────────────────────────── */}
        {/* Desktop: always visible | Mobile: slide-down toggle */}
        <AnimatePresence>
          {(leftOpen || true) && (
            <motion.aside
              key="left"
              initial={leftOpen ? { height: 0, opacity: 0 } : false}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:w-56 w-full shrink-0 space-y-4 ${leftOpen ? 'block' : 'hidden lg:block'}`}
            >
              {/* Resource Types */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Resource Types
                </h3>
                <div className="space-y-1">
                  {resourceTypes.map((rt, i) => {
                    const Icon = rt.icon;
                    return (
                      <div key={i}>
                        <button
                          onClick={() => setExpandedType(expandedType === i ? -1 : i)}
                          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 text-left transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">{rt.label}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{rt.count}</span>
                            {rt.children && (
                              expandedType === i
                                ? <ChevronUp className="w-3 h-3 text-gray-400" />
                                : <ChevronDown className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {rt.children && expandedType === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-6 mt-1 space-y-1 overflow-hidden"
                            >
                              {rt.children.map((c, ci) => (
                                <button key={ci} className="w-full text-left text-[11px] text-gray-500 hover:text-blue-600 py-1 px-2 rounded-lg hover:bg-blue-50 transition-all">
                                  {c}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grade Level */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Grade Level</h3>
                {grades.map((g, i) => (
                  <label key={i} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="grade" defaultChecked={g === 'Grade 4'} className="accent-blue-600" />
                    <span className="text-xs font-medium text-gray-700">{g}</span>
                  </label>
                ))}
              </div>

              {/* Subject */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Subject</h3>
                {subjects.map((s, i) => (
                  <label key={i} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="subject" className="accent-blue-600" />
                    <span className="text-xs font-medium text-gray-700">{s}</span>
                  </label>
                ))}
              </div>

              {/* Recently Used */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recently Used
                </h3>
                {recentlyUsed.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-700">{r.label}</p>
                      <p className="text-[9px] text-gray-400">{r.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* My Collections */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">My Collections</h3>
                {collections.map((c, i) => (
                  <button key={i} className="w-full flex justify-between items-center p-1.5 rounded-xl hover:bg-gray-50 text-left">
                    <span className="text-xs font-medium text-gray-700">{c.label}</span>
                    <span className="text-[10px] text-gray-400 font-bold">({c.count})</span>
                  </button>
                ))}
                <button className="w-full mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 py-2 rounded-xl transition-all">
                  <PlusCircle className="w-3.5 h-3.5" /> Create New Collection
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Main grid ────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Search + controls bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources…"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                <Upload className="w-3.5 h-3.5" /> Upload Resource
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2.5 border border-gray-200 rounded-2xl text-xs font-bold text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all bg-white">
                <SortAsc className="w-3.5 h-3.5" /> Sort
              </button>
            </div>
          </div>

          {/* Active filter chips + view toggle */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-1.5 items-center">
              {activeChips.map((chip, i) => (
                <span key={i} className="flex items-center gap-1 text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
                  {chip} <X className="w-3 h-3 cursor-pointer" />
                </span>
              ))}
              <span className="text-xs text-gray-400">Showing {filtered.length} resources</span>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl border ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-400 hover:border-blue-200'}`}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl border ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-400 hover:border-blue-200'}`}>
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Resource Cards */}
          <motion.div
            className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'} pb-8`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(r => (
              <motion.div
                key={r.id}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)' }}
                className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group ${viewMode === 'list' ? 'flex gap-4 p-4 items-start' : ''}`}
              >
                {/* Thumbnail / type */}
                <div className={`${viewMode === 'grid' ? 'h-36' : 'w-20 h-20 shrink-0 rounded-2xl'} bg-linear-to-br from-gray-100 to-gray-50 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <span className={`absolute top-2 left-2 text-[9px] font-black text-white px-2 py-0.5 rounded-full ${r.typeColor}`}>
                    {r.type}
                  </span>
                </div>

                <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'}`}>
                  <p className="text-[10px] text-gray-400 font-medium mb-1">{r.meta}</p>
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug mb-1">{r.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3">{r.desc}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 flex-wrap">
                    {r.pages && <span>📄 {r.pages} pages</span>}
                    {r.minutes && <span>⏱ {r.minutes} min</span>}
                    <span>⬇ {r.downloads} times</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-100'}`} />
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-[11px] font-bold rounded-xl hover:border-blue-200 hover:text-blue-600 transition-all">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button className="ml-auto flex items-center gap-1 px-2 py-2 border border-gray-100 text-gray-400 rounded-xl hover:text-yellow-400 hover:border-yellow-200 transition-all">
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pb-4">
            {['‹', '1', '2', '3', '…', '12', '›'].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${p === '1' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right sidebar ─────────────────────────────────── */}
        <div className="lg:w-64 w-full shrink-0">
          <TeacherResourcesRight />
        </div>
      </div>
    </div>
  );
};

export default TeacherResources;
