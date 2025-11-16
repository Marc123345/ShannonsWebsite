import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  brandName?: string;
  primaryColor?: string;
}

export function Chatbot({ brandName = 'H2H Marketing', primaryColor = '#a855f7' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && messages.length === 0) {
      setTimeout(() => {
        addMessage('assistant', `Hi there! 👋 Welcome to ${brandName}. I'm here to help you learn more about our services, answer questions, or connect you with our team. What can I help you with today?`);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const addMessage = (role: 'user' | 'assistant' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return `We offer a comprehensive range of marketing services:\n\n• Brand Strategy & Identity\n• Content Marketing & Storytelling\n• Social Media Management\n• SEO & Digital Advertising\n• Analytics & Data Insights\n• Creative Design\n• Customer Experience Design\n\nWould you like to know more about any specific service?`;
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return `Our pricing is tailored to each client's unique needs and goals. We offer flexible packages and custom solutions.\n\nTypically, our projects range from:\n• Small projects: $5,000 - $15,000\n• Medium campaigns: $15,000 - $50,000\n• Enterprise solutions: $50,000+\n\nWould you like to schedule a consultation to discuss your specific needs?`;
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return `I'd be happy to connect you with our team!\n\n📧 Email: hello@agency.com\n📞 Phone: +1 (234) 567-890\n📍 Location: Remote & Global\n\nYou can also fill out our contact form on the website, and we typically respond within 24 hours. Would you like me to help you with anything else?`;
    }

    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
      return `We've worked with amazing brands across various industries! Check out our portfolio section on the website to see our featured projects including:\n\n• Lumina Tech - Revolutionary SaaS platform\n• Urban Pulse - Viral campaign with 5M+ engagement\n• Zen Wellness - Holistic brand identity\n\nAnd many more! Would you like to discuss how we can help with your project?`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! 😊 Great to hear from you. I'm here to help you discover how ${brandName} can transform your brand. What would you like to know about?`;
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return `You're very welcome! 🙌 Is there anything else I can help you with today?`;
    }

    if (lowerMessage.includes('help') || lowerMessage === '?') {
      return `I can help you with:\n\n💼 Our Services & Solutions\n💰 Pricing & Packages\n📱 Contact Information\n🎨 Portfolio & Case Studies\n⏱️ Process & Timeline\n🤝 Getting Started\n\nJust ask me anything, or type keywords like "services", "pricing", "contact", etc.`;
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return `Project timelines vary based on scope:\n\n• Brand Identity: 4-6 weeks\n• Website Design: 6-10 weeks\n• Marketing Campaign: 8-12 weeks\n• Ongoing Services: Monthly retainers\n\nWe work efficiently while ensuring quality. Want to discuss your timeline needs?`;
    }

    return `That's a great question! While I'm here to provide quick answers, our team can give you detailed insights.\n\nHere's what I can help with right now:\n• Information about our services\n• Pricing guidance\n• Portfolio examples\n• Contact details\n\nOr feel free to ask me something else, and I'll do my best to help! 💜`;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);

    setIsTyping(true);
    setTimeout(async () => {
      const response = await getAIResponse(userMessage);
      setIsTyping(false);
      addMessage('assistant', response);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-pink rounded-full flex items-center justify-center shadow-glow-purple hover:scale-110 transition-all duration-300">
            <MessageCircle className="text-white" size={28} strokeWidth={2.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-pink rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-6 right-6 w-80'
          : 'bottom-6 right-6 w-[90vw] sm:w-96 h-[600px] max-h-[80vh]'
      }`}
    >
      <div className="relative h-full flex flex-col overflow-hidden shadow-2xl group">
        <span className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-black/95 to-black/95 backdrop-blur-xl" />
        <span className="absolute inset-0 border-2 border-brand-purple/30 rounded-2xl" />
        <span className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-brand-purple/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-pink rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{brandName} Assistant</h3>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-purple/50 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-brand-purple to-brand-pink text-white rounded-br-none'
                          : 'bg-neutral-800/80 text-neutral-100 rounded-bl-none border border-neutral-700/50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-neutral-800/80 text-neutral-100 p-3 rounded-2xl rounded-bl-none border border-neutral-700/50">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-brand-purple/20">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-purple transition-colors"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className="bg-gradient-to-br from-brand-purple to-brand-pink text-white p-3 rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300 shadow-glow-subtle"
                    aria-label="Send message"
                  >
                    <Send size={18} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-center">
                  Powered by AI • Instant responses
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Chatbot;
