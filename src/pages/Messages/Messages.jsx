import { useState } from 'react';
import { Search, Send, Paperclip, Smile, ChevronRight, CheckCheck, Check } from 'lucide-react';
import { motion } from 'motion/react';
import MessagesRight from './MessagesRight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const conversations = [
  {
    id: 1,
    name: 'Mrs. Anderson',
    role: 'Mathematics',
    tag: 'Mathematics',
    tagColor: 'bg-orange-500',
    category: 'Teachers',
    emoji: '👩‍🏫',
    lastMessage: 'Great job on your homework today!',
    time: 'Today, 2:35 PM',
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: 'Mr. Wilson',
    role: 'English',
    tag: 'English',
    tagColor: 'bg-purple-500',
    category: 'Teachers',
    emoji: '👨‍🏫',
    lastMessage: "Don't forget to bring your reading book tomorrow.",
    time: 'Yesterday, 4:15 PM',
    unread: false,
    online: false,
  },
  {
    id: 3,
    name: 'Ms. Parker',
    role: 'Science',
    tag: 'Science',
    tagColor: 'bg-green-500',
    category: 'Teachers',
    emoji: '👩‍🔬',
    lastMessage: 'The science fair project looks wonderful!',
    time: 'Monday, 9:20 PM',
    unread: false,
    online: true,
  },
  {
    id: 4,
    name: 'School Office',
    role: 'Administration',
    tag: 'General',
    tagColor: 'bg-blue-500',
    category: 'School Office',
    emoji: '🏫',
    lastMessage: 'Reminder: Picture day is next Friday',
    time: 'Last week',
    unread: false,
    online: true,
  },
  {
    id: 5,
    name: 'Miss Roberts',
    role: 'Class Teacher',
    tag: 'Class Teacher',
    tagColor: 'bg-red-500',
    category: 'Teachers',
    emoji: '👩‍🏫',
    lastMessage: "Well done on your spelling test!",
    time: 'Oct 15, 11:30 AM',
    unread: false,
    online: false,
  },
];

const chatMessages = [
  {
    id: 1,
    from: 'teacher',
    text: "Hi Emma! I wanted to let you know you did a great job on your math homework today. Your addition work was very neat and all the answers were correct! Keep up the good work! ⭐",
    time: 'Today, 2:30 PM',
    read: true,
  },
  {
    id: 2,
    from: 'student',
    text: 'Thank you, Mrs. Anderson! I practiced a lot at home. 😊',
    time: 'Today, 2:33 PM',
    read: true,
  },
];

const chatRules = [
  { text: 'Be polite and respectful', icon: '🤝' },
  { text: 'Use complete sentences', icon: '✍️' },
  { text: 'Ask questions if you need help', icon: '❓' },
];

const tabs = ['All', 'Teachers', 'Classmates', 'School Office'];

const Messages = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  const filtered = activeTab === 'All'
    ? conversations
    : conversations.filter((c) => c.category === activeTab);

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Main Content — Two-column chat layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 min-w-0"
      >
        <div className="flex flex-col md:flex-row gap-4 h-full">

          {/* ── LEFT: Conversation List ── */}
          <motion.div
            variants={itemVariants}
            className="md:w-72 w-full bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-gray-50">
              <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight mb-4">Conversations</h3>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 placeholder-gray-300 focus:outline-none focus:border-blue-200 transition-all"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all border
                      ${activeTab === tab
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full text-left p-4 hover:bg-blue-50/50 transition-all group relative ${selectedConv.id === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
                >
                  {conv.unread && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border border-gray-100 ${conv.id === 4 ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        {conv.emoji}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${conv.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className={`text-[11px] font-black text-gray-800 uppercase tracking-tight truncate ${conv.unread ? 'text-blue-700' : ''}`}>
                          {conv.name}
                        </p>
                      </div>
                      <span className={`inline-block px-1.5 py-0.5 text-[8px] font-black text-white rounded uppercase tracking-wide mb-1 ${conv.tagColor}`}>
                        {conv.tag}
                      </span>
                      <p className="text-[10px] font-bold text-gray-400 truncate leading-tight">{conv.lastMessage}</p>
                      <p className="text-[9px] font-bold text-gray-300 mt-0.5">{conv.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Chat Window ── */}
          <motion.div
            variants={itemVariants}
            className="flex-1 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[520px]"
          >
            {/* Chat Header */}
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-2xl border border-blue-100">
                    {selectedConv.emoji}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${selectedConv.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 text-sm uppercase tracking-tight">{selectedConv.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-0.5 text-[9px] font-black text-white rounded uppercase tracking-wide ${selectedConv.tagColor}`}>
                      {selectedConv.tag}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">{selectedConv.online ? 'Online now' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50/30">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'student' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {msg.from === 'teacher' && (
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-base shrink-0 border border-blue-100">
                      {selectedConv.emoji}
                    </div>
                  )}
                  <div className={`max-w-[75%] group`}>
                    <div className={`px-4 py-3 rounded-2xl text-xs font-bold leading-relaxed shadow-sm
                      ${msg.from === 'student'
                        ? 'bg-blue-600 text-white rounded-br-sm shadow-blue-100'
                        : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100'}`}
                    >
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.from === 'student' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[9px] font-bold text-gray-400">{msg.time}</span>
                      {msg.from === 'student' && (
                        msg.read
                          ? <CheckCheck className="w-3 h-3 text-blue-400" />
                          : <Check className="w-3 h-3 text-gray-300" />
                      )}
                    </div>
                  </div>
                  {msg.from === 'student' && (
                    <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-base shrink-0 border border-green-100">
                      👧
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Rules */}
            <div className="px-5 py-3 border-t border-gray-50 flex flex-wrap gap-4">
              {chatRules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-xs">{rule.icon}</span>
                  <span className="text-[10px] font-bold text-gray-400">{rule.text}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
                  <Paperclip className="w-4 h-4" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    maxLength={500}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-300 transition-all pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-yellow-400 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] font-bold text-gray-300 text-center mt-2">
                {messageText.length}/500 · Messages are reviewed by teachers before sending
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Sidebar */}
      <div className="lg:w-72 w-full">
        <MessagesRight />
      </div>
    </div>
  );
};

export default Messages;
