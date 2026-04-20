import { useState, useEffect } from 'react';
import { Search, Send, Paperclip, Smile, ChevronRight, CheckCheck, Check, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import MessagesRight from './MessagesRight';
import { getMessages, sendMessage } from '../../../services/messageService';
import { useAuth } from '../../../hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages();
        const data = res.data || res;
        setMessages(data);
        if (data.length > 0 && !selectedConv) {
          setSelectedConv(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedConv]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConv) return;
    const receiverId = selectedConv.sender_id === user.id ? selectedConv.receiver_id : selectedConv.sender_id;
    try {
      await sendMessage({ receiver_id: receiverId, content: messageText });
      setMessageText('');
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
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 px-1 sm:px-4 lg:px-0 scroll-smooth pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 min-w-0"
      >
        <div className="flex flex-col md:flex-row gap-4 bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden h-[600px]">
          <div className="md:w-72 w-full border-r border-gray-50 flex flex-col">
            <div className="p-5 border-b border-gray-50">
               <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">Conversations</h3>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {messages.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full text-left p-4 hover:bg-blue-50/50 transition-all ${selectedConv?.id === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                      {(conv.sender_id === user.id ? conv.receiver?.full_name : conv.sender?.full_name)?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-black text-gray-800 uppercase truncate">
                        {conv.sender_id === user.id ? conv.receiver?.full_name : conv.sender?.full_name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 truncate leading-tight">{conv.content}</p>
                    </div>
                  </div>
                </button>
              ))}
              {messages.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-xs italic">
                  No messages yet.
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-gray-50/30">
            {selectedConv ? (
              <>
                <div className="p-5 border-b bg-white border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                       {(selectedConv.sender_id === user.id ? selectedConv.receiver?.full_name : selectedConv.sender?.full_name)?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-800 text-sm uppercase tracking-tight">
                         {selectedConv.sender_id === user.id ? selectedConv.receiver?.full_name : selectedConv.sender?.full_name}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                   <div className={`flex justify-end items-end gap-2`}>
                      <div className="max-w-[75%] px-4 py-3 rounded-2xl text-xs font-bold leading-relaxed shadow-sm bg-blue-600 text-white rounded-br-sm">
                         {selectedConv.content}
                         <p className="text-[9px] mt-1 opacity-70 text-right">{new Date(selectedConv.created_at).toLocaleTimeString()}</p>
                      </div>
                   </div>
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-blue-300 transition-all"
                      />
                    </div>
                    <button onClick={handleSendMessage} className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-bold">
                 Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="lg:w-72 w-full">
        <MessagesRight />
      </div>
    </div>
  );
};

export default Messages;
