import { useState, useEffect, useRef } from 'react';
import {
  Search, Edit, Send, Smile, Loader2, X, Users, ChevronDown, Megaphone, UserCheck
} from 'lucide-react';
import TeacherMessagesRight from './TeacherMessagesRight';
import { getMessages, sendMessage } from '../../../services/messageService';
import { getClasses, getClass } from '../../../services/classService';
import { useAuth } from '../../../hooks/useAuth';
import apiFetch from '../../../services/api';

const TeacherMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeThread, setActiveThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Compose modal state
  const [showCompose, setShowCompose] = useState(false);
  const [composeTarget, setComposeTarget] = useState('student'); // 'student'
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [composeContent, setComposeContent] = useState('');
  const [composeSending, setComposeSending] = useState(false);
  const [composeError, setComposeError] = useState('');

  const chatEndRef = useRef(null);

  // Group messages into threads by the other person
  const getThreadKey = (m) => {
    const isSender = m.sender_id === user?.id;
    return isSender ? `${m.receiver_type}-${m.receiver_id}` : `${m.sender_type}-${m.sender_id}`;
  };

  const buildThreads = (msgs) => {
    const threadMap = {};
    msgs.forEach(m => {
      const key = getThreadKey(m);
      if (!threadMap[key]) threadMap[key] = { key, messages: [], other: null, lastMsg: m };
      threadMap[key].messages.push(m);
      if (new Date(m.created_at) > new Date(threadMap[key].lastMsg.created_at)) {
        threadMap[key].lastMsg = m;
      }
      const isSender = m.sender_id === user?.id;
      threadMap[key].other = isSender ? m.receiver : m.sender;
    });
    return Object.values(threadMap).sort((a, b) => new Date(b.lastMsg.created_at) - new Date(a.lastMsg.created_at));
  };

  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data || res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await getClasses();
      setClasses(Array.isArray(res) ? res : res?.data || []);
    } catch (e) {}
  };

  const handleClassSelect = async (classId) => {
    setSelectedClassId(classId);
    setSelectedStudent(null);
    if (!classId) { setStudentsInClass([]); return; }
    try {
      const detail = await getClass(classId);
      setStudentsInClass(detail.students || []);
    } catch (e) {}
  };

  useEffect(() => {
    fetchMessages();
    fetchClasses();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread]);

  const threads = buildThreads(messages);
  const activeMessages = activeThread
    ? messages.filter(m => getThreadKey(m) === activeThread.key)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    : [];

  const handleSend = async () => {
    if (!newMessage.trim() || !activeThread) return;
    setSending(true);
    try {
      const other = activeThread.other;
      const receiverType = activeThread.key.split('-')[0].includes('Student') ? 'student' : 'teacher';
      await sendMessage({ receiver_id: other?.id, receiver_type: receiverType, content: newMessage });
      setNewMessage('');
      await fetchMessages();
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const handleComposeSend = async () => {
    if (!composeContent.trim()) return setComposeError('Message content is required.');
    if (!selectedStudent) return setComposeError('Please select a student.');
    setComposeSending(true);
    setComposeError('');
    try {
      await sendMessage({ receiver_id: selectedStudent.id, receiver_type: 'student', content: composeContent });
      setShowCompose(false);
      setComposeContent('');
      setSelectedStudent(null);
      await fetchMessages();
    } catch (e) {
      setComposeError(e.message || 'Failed to send.');
    } finally {
      setComposeSending(false);
    }
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row h-[700px] overflow-hidden">

          {/* Thread List */}
          <div className="w-full md:w-80 border-r border-gray-50 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                <button onClick={() => setShowCompose(true)} title="New Message">
                  <Edit className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input placeholder="Search chats..." className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {threads.map(thread => (
                <div
                  key={thread.key}
                  onClick={() => setActiveThread(thread)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-b border-gray-50 ${activeThread?.key === thread.key ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-xs font-bold text-blue-600">
                    {thread.other?.full_name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-xs font-bold text-gray-800 truncate">{thread.other?.full_name || 'Unknown'}</p>
                      <span className="text-[9px] text-gray-400 shrink-0 ml-1">{new Date(thread.lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">{thread.lastMsg.content}</p>
                  </div>
                </div>
              ))}
              {threads.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-xs italic">No messages yet. Write to a student!</div>
              )}
            </div>
          </div>

          {/* Chat View */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50/30">
            {activeThread ? (
              <>
                <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                    {activeThread.other?.full_name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{activeThread.other?.full_name}</p>
                    <p className="text-[10px] text-green-500 font-bold">Active</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeMessages.map(m => {
                    const isMine = m.sender_id === user?.id;
                    return (
                      <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[78%] rounded-2xl p-3 text-xs shadow-sm ${isMine ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-100'}`}>
                          {m.content}
                          <p className={`text-[9px] mt-1 ${isMine ? 'opacity-70 text-right' : 'text-gray-400'}`}>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
                    <input
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent border-none text-xs focus:ring-0 outline-none"
                    />
                    <button onClick={handleSend} disabled={sending} className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                      {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
                <Smile className="w-12 h-12 opacity-20" />
                <p className="text-xs font-bold">Select a conversation or start a new one</p>
                <button onClick={() => setShowCompose(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
                  <Edit className="w-3.5 h-3.5" /> New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:w-80 w-full">
        <TeacherMessagesRight onCompose={() => setShowCompose(true)} />
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-500" /> Message a Student
              </h2>
              <button onClick={() => { setShowCompose(false); setComposeError(''); setComposeContent(''); setSelectedStudent(null); }}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {composeError && <p className="text-xs text-red-500 font-bold bg-red-50 p-3 rounded-xl border border-red-100">{composeError}</p>}

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Select Class</label>
                <select value={selectedClassId} onChange={e => handleClassSelect(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white">
                  <option value="">-- Pick a class --</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {studentsInClass.length > 0 && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Select Student</label>
                  <select value={selectedStudent?.id || ''} onChange={e => setSelectedStudent(studentsInClass.find(s => s.id === parseInt(e.target.value)))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white">
                    <option value="">-- Pick a student --</option>
                    {studentsInClass.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  value={composeContent}
                  onChange={e => setComposeContent(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowCompose(false)} className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-xl text-sm">Cancel</button>
                <button onClick={handleComposeSend} disabled={composeSending} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center gap-2">
                  {composeSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherMessages;
