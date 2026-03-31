import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Search, Send, Paperclip, Bold, Italic, Underline,
  Link, Inbox, Clock, Users, MessageSquare, Star,
  Flag, Archive, Printer, Download, MoreVertical, ChevronDown
} from 'lucide-react';
import TeacherMessagesRight from './TeacherMessagesRight';

const tabs = [
  { label: 'Inbox',            count: 12, active: true  },
  { label: 'Sent',             count: 45, active: false },
  { label: 'Parent Messages',  count: 8,  active: false },
  { label: 'Student Messages', count: 2,  active: false },
  { label: 'Class Announcements', count: 3, active: false },
];

const inbox = [
  {
    id: 1, name: 'Jennifer Johnson (Emma\'s Mom)',
    preview: 'Question about homework assignment',
    body: 'Hi Miss Roberts, Emma is having trouble with…',
    time: 'Today, 2:45 PM', unread: true, attachment: true,
    email: 'jennifer.johnson@email.com', phone: '(555) 123-4567',
    relation: "Emma Johnson's Mother",
    thread: [
      {
        from: 'Jennifer Johnson', time: 'Today, 2:45 PM',
        msg: "Hi Miss Roberts, Emma is having trouble with the math homework assignment about addition up to 1000. She understands the concept but is struggling with showing her work step by step. Could you provide some guidance or examples? Thank you!",
        attachment: 'emma_homework_attempt.jpg',
      }
    ],
  },
  {
    id: 2, name: 'Michael Chen (Student)',
    preview: 'Help with math problem',
    body: "I don't understand problem #5…",
    time: 'Today, 1:30 PM', unread: false, attachment: false,
    email: 'michael.chen@student.school.edu', phone: null,
    relation: 'Student – Grade 4B',
    thread: [
      {
        from: 'Michael Chen', time: 'Today, 1:30 PM',
        msg: "Hi Miss Roberts, I don't understand problem #5 on the science worksheet. Can you explain?",
        attachment: null,
      }
    ],
  },
  {
    id: 3, name: 'Sarah Williams (Parent)',
    preview: 'Absence notification',
    body: 'Sarah will be absent tomorrow for…',
    time: 'Today, 9:00 AM', unread: false, attachment: false,
    email: 'sarah.parent@email.com', phone: null,
    relation: "Sarah Williams' Parent",
    thread: [
      {
        from: 'Sarah Williams (Parent)', time: 'Today, 9:00 AM',
        msg: "Good morning Miss Roberts, Sarah will be absent tomorrow for a doctor's appointment. Please let us know if there's any work she needs to make up. Thank you.",
        attachment: null,
      }
    ],
  },
  {
    id: 4, name: 'School Office',
    preview: 'Field trip forms due Friday',
    body: 'Reminder: All permission forms…',
    time: 'Yesterday, 4:02 PM', unread: false, attachment: false,
    email: 'office@school.edu', phone: null,
    relation: 'School Administration',
    thread: [
      {
        from: 'School Office', time: 'Yesterday, 4:02 PM',
        msg: "Reminder: All permission forms for the October 27 field trip to the zoo must be collected and submitted to the office by Friday, October 25.",
        attachment: null,
      }
    ],
  },
  {
    id: 5, name: 'Class 4B Parents (28)',
    preview: 'Field trip forms due Friday',
    body: '',
    time: '', unread: false, attachment: false,
    isGroup: true,
    email: null, phone: null,
    relation: 'Class Announcement',
    thread: [],
  },
];

const filterTags = ['All', 'Unread', 'Parents', 'Students', 'Urgent', 'Flagged'];

const TeacherMessages = () => {
  const [activeTab, setActiveTab]       = useState(0);
  const [selected, setSelected]         = useState(inbox[0]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [reply, setReply]               = useState('');

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-2 sm:px-4 lg:px-0 min-h-[80vh]">
      {/* ── Left column: inbox tabs + list ──────────────────── */}
      <div className="lg:w-72 w-full flex flex-col gap-4">
        {/* Tab strip */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <div className="flex">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === i
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1.5">
          {filterTags.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                activeFilter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Message list */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1">
          {inbox.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`w-full text-left p-4 border-b border-gray-50 transition-all hover:bg-blue-50/30 ${
                selected?.id === msg.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${msg.isGroup ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                  {msg.isGroup ? <Users className="w-4 h-4" /> : msg.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold truncate ${msg.unread ? 'text-gray-900' : 'text-gray-700'}`}>{msg.name}</span>
                    {msg.time && <span className="text-[9px] text-gray-400 shrink-0 ml-1">{msg.time.replace('Today, ', '')}</span>}
                  </div>
                  <p className={`text-[11px] mt-0.5 truncate ${msg.unread ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                    {msg.preview}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">{msg.body}</p>
                  {msg.attachment && <Paperclip className="w-3 h-3 text-gray-400 mt-1" />}
                </div>
                {msg.unread && <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Centre column: message thread + reply ─────────── */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {selected && (
          <>
            {/* Contact bar */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {selected.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">{selected.name.split('(')[0].trim()}</h2>
                  <p className="text-xs text-gray-500">{selected.relation}</p>
                  {selected.email && <p className="text-xs text-blue-600 mt-0.5">{selected.email}</p>}
                  {selected.phone && <p className="text-xs text-gray-500">{selected.phone}</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['View Emma\'s Profile', 'Schedule Conference', 'View Previous Messages', 'Add to Contacts'].map((a, i) => (
                  <button key={i} className="text-[11px] font-bold px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center gap-1">
                    {['👤', '📅', '💬', '➕'][i]} {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Thread */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex-1">
              {selected.thread.map((t, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm text-gray-800">{t.from}</span>
                    <span className="text-xs text-gray-400">{t.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.msg}</p>
                  {t.attachment && (
                    <div className="mt-3 flex items-center gap-2 bg-gray-50 rounded-xl p-2.5 border border-gray-100 w-fit">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">{t.attachment}</span>
                      <Download className="w-3.5 h-3.5 text-blue-500 cursor-pointer" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reply box */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-xs font-bold text-gray-500 mb-3">Reply to {selected.name.split('(')[0].trim()}</h3>
              <div className="flex gap-2 mb-2">
                {[Bold, Italic, Underline, Link].map((Icon, i) => (
                  <button key={i} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
              <textarea
                rows={4}
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Type your reply…"
                className="w-full border border-gray-200 rounded-2xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] text-gray-400">0/2000 characters • Draft saved at 3:02 PM</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 transition-all">Save Draft</button>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-200 transition-all">Schedule Send</button>
                  <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Send Reply
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">⚠️ All messages are stored in school records. Use professional, supportive language.</p>
            </div>

            {/* Bottom toolbar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 flex flex-wrap gap-2">
              {['Mark as Read', 'Archive', 'Flag', 'Move to Folder', 'Print', 'Export'].map((a, i) => (
                <button key={i} className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all flex items-center gap-1">
                  {['✓', '📦', '🚩', '📁', '🖨', '⬇'][i]} {a}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Right sidebar ─────────────────────────────────── */}
      <div className="lg:w-64 w-full">
        <TeacherMessagesRight />
      </div>
    </div>
  );
};

export default TeacherMessages;
