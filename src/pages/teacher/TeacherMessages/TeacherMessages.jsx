import { useState, useEffect } from 'react';
import { 
  Search, Edit, Send, Check, Phone, Video, MoreVertical,
  ChevronRight, Smile, Paperclip, Clock, CheckCheck, Loader2
} from 'lucide-react';
import TeacherMessagesRight from './TeacherMessagesRight';
import { getMessages, sendMessage } from '../../../services/messageService';
import { useAuth } from '../../../hooks/useAuth';

const TeacherMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages();
        setMessages(res.data || res);
        if ((res.data?.length > 0 || res.length > 0) && !activeMessage) {
           setActiveMessage((res.data || res)[0]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [activeMessage]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeMessage) return;
    const receiverId = activeMessage.sender_id === user.id ? activeMessage.receiver_id : activeMessage.sender_id;
    try {
      await sendMessage({ receiver_id: receiverId, content: newMessage });
      setNewMessage('');
      // Refresh messages
      const res = await getMessages();
      setMessages(res.data || res);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (loading) {
     return (
       <div className="flex h-96 items-center justify-center">
         <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
       </div>
     );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-2 sm:px-4 lg:px-0">
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row h-[700px] overflow-hidden">
          {/* List Section */}
          <div className="w-full md:w-80 border-r border-gray-50 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                <Edit className="w-4 h-4 text-blue-600 cursor-pointer" />
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  placeholder="Search chats..."
                  className="w-full bg-gray-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {messages.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => setActiveMessage(m)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${activeMessage?.id === m.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <span className="text-xs font-bold text-blue-600">
                        {(m.sender_id === user?.id ? m.receiver?.full_name : m.sender?.full_name)?.charAt(0) || '?'}
                     </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-bold text-gray-800 truncate">
                        {m.sender_id === user?.id ? m.receiver?.full_name : m.sender?.full_name}
                      </p>
                      <span className="text-[9px] text-gray-400">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">{m.content}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-xs italic">
                  No messages found.
                </div>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50/30">
             {activeMessage ? (
               <>
                 <div className="p-4 bg-white border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">
                            {(activeMessage.sender_id === user?.id ? activeMessage.receiver?.full_name : activeMessage.sender?.full_name)?.charAt(0)}
                          </span>
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-800">
                            {activeMessage.sender_id === user?.id ? activeMessage.receiver?.full_name : activeMessage.sender?.full_name}
                          </p>
                          <p className="text-[10px] text-green-500 font-bold">Online</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className={`max-w-[80%] rounded-2xl p-3 text-xs shadow-sm bg-blue-600 text-white ml-auto`}>
                        {activeMessage.content}
                        <p className="text-[9px] mt-1 opacity-70 text-right">{new Date(activeMessage.created_at).toLocaleTimeString()}</p>
                    </div>
                 </div>

                 <div className="p-4 bg-white border-t border-gray-50">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
                       <input 
                         value={newMessage}
                         onChange={(e) => setNewMessage(e.target.value)}
                         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                         placeholder="Type a message..."
                         className="flex-1 bg-transparent border-none text-xs focus:ring-0 outline-none"
                       />
                       <button onClick={handleSendMessage} className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors">
                          <Send className="w-3.5 h-3.5" />
                       </button>
                    </div>
                 </div>
               </>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <Smile className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-xs font-bold">Select a conversation to start messaging</p>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="lg:w-80 w-full">
         <TeacherMessagesRight />
      </div>
    </div>
  );
};

export default TeacherMessages;
