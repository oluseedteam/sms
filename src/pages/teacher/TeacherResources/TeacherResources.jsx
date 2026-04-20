import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutGrid, List, Upload, Filter, SortAsc, Search,
  Download, Eye, Star, Clock, FileText, BookOpen,
  Image, Monitor, ClipboardList, Layers, ChevronDown,
  ChevronRight, PlusCircle, X, ChevronUp, Loader2
} from 'lucide-react';
import TeacherResourcesRight from './TeacherResourcesRight';
import { getResources } from '../../../services/resourceService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

const TeacherResources = () => {
  const [activeTab, setActiveTab] = useState('My Resources');
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getResources();
        setResources(res.data || res);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Teaching Resources & Materials</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 min-w-0 space-y-4">
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
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <Upload className="w-3.5 h-3.5" /> Upload Resource
            </button>
          </div>

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
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{r.title}</h3>
                    <p className="text-[11px] text-gray-400">{r.subject?.name || 'General'}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{r.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-xl hover:bg-blue-700 transition-all">
                    Download
                  </button>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noreferrer" className="flex-1 py-2 border border-gray-200 text-gray-600 text-[11px] font-bold rounded-xl hover:bg-gray-50 text-center">
                      View Link
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 italic">
                No resources found.
              </div>
            )}
          </motion.div>
        </div>

        <div className="lg:w-64 w-full shrink-0">
          <TeacherResourcesRight />
        </div>
      </div>
    </div>
  );
};

export default TeacherResources;
