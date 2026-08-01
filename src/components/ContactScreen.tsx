import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, RefreshCw, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from '@/components/ui/chat-bubble';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

export default function ContactScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Sarah Adjei's studio. I can answer your questions about Sarah's filmography, directing approach, screenplay consultations, rates, and worldwide availability. How can I assist your project today?",
      sender: 'bot',
      timestamp: 'JUST NOW',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsgId = Date.now();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, text, sender: 'user', timestamp: timeStr },
    ]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        "Thank you for reaching out! Sarah specializes in narrative cinema, commercial film directing, and script doctoring. You can also send a direct email to Abena_koblyn@gmail.com or call +233 27 723 3774 for urgent booking inquiries.";

      const lowerText = text.toLowerCase();
      if (
        lowerText.includes('style') ||
        lowerText.includes('directing') ||
        lowerText.includes('cinematography') ||
        lowerText.includes('aesthetic')
      ) {
        botResponse =
          "Sarah's signature visual style combines high-contrast monochrome texture, intimate camera proximity, and visceral character depth. She draws inspiration from African neorealism and classical film noir.";
      } else if (
        lowerText.includes('available') ||
        lowerText.includes('book') ||
        lowerText.includes('freelance') ||
        lowerText.includes('hire')
      ) {
        botResponse =
          "Yes! Sarah is currently accepting global film directing bookings, commercial production collaborations, and feature screenplay consultations. Her studio is based in Accra, Ghana, with active travel visas for North America and Europe.";
      } else if (
        lowerText.includes('script') ||
        lowerText.includes('write') ||
        lowerText.includes('screenplay') ||
        lowerText.includes('story')
      ) {
        botResponse =
          "Sarah provides comprehensive screenplay coverage, narrative structural reviews, and co-writing services. She focuses on sharp dialogue, emotional stakes, and culturally resonant story arcs.";
      } else if (
        lowerText.includes('location') ||
        lowerText.includes('where') ||
        lowerText.includes('accra') ||
        lowerText.includes('contact')
      ) {
        botResponse =
          "Sarah is based in Accra, Ghana. You can connect directly via email at Abena_koblyn@gmail.com, or phone at +233 27 723 3774.";
      } else if (
        lowerText.includes('rate') ||
        lowerText.includes('cost') ||
        lowerText.includes('budget') ||
        lowerText.includes('pricing')
      ) {
        botResponse =
          "Project budgets vary based on timeline, shoot locations, and deliverables. For customized rate cards or production proposals, please email your project brief to Abena_koblyn@gmail.com.";
      } else if (
        lowerText.includes('award') ||
        lowerText.includes('festival') ||
        lowerText.includes('film') ||
        lowerText.includes('work')
      ) {
        botResponse =
          "Sarah's film works have been featured across international festivals, highlighting raw storytelling and groundbreaking cinematography. Check out the Portfolio page to explore her featured films!";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared. I am ready for your next question regarding Sarah's filmmaking or consultations.",
        sender: 'bot',
        timestamp: 'JUST NOW',
      },
    ]);
  };

  const promptSuggestions = [
    "Tell me about Sarah's visual style",
    "Is Sarah available for international bookings?",
    "How do script consultations work?",
    "What are her primary contact details?",
    "Where can I see her latest film reel?",
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 md:px-12 min-h-[90vh] flex flex-col justify-center items-center">
      <div ref={containerRef} className="w-full max-w-4xl mx-auto space-y-6">

        {/* Top Minimalist Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full">
            <MessageSquare className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-medium">
              Sarah's Assistant
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif tracking-widest text-white uppercase">
            Contact & Consultation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            Instant insights on Sarah Adjei’s directing reel, screenplay reviews, schedule availability, and project inquiries.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-[#121212]/80 border border-white/10 rounded-lg shadow-2xl backdrop-blur-xl flex flex-col h-[650px] relative overflow-hidden">

          {/* Decorative Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-800 via-white/40 to-neutral-800" />

          {/* Chat Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#161616]/90 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                SA
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-wider text-white uppercase font-medium flex items-center gap-2">
                  <span>Sarah's Assistant</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AVAILABLE NOW</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={clearChat}
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/5 hover:border-white/20 bg-[#181818] cursor-pointer"
                title="Reset conversation"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline text-[10px]">Reset</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-neutral-800"
          >
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <ChatBubble key={msg.id} variant={isBot ? 'received' : 'sent'} className="group" children={undefined}>
                  <ChatBubbleAvatar
                    fallback={isBot ? 'SA' : 'YOU'}
                    className={
                      isBot
                        ? 'bg-neutral-800 border-white/20 text-white'
                        : 'bg-white border-white text-black font-semibold'
                    }
                  />
                  <div className="flex-1 max-w-[85%] sm:max-w-[78%]">
                    <ChatBubbleMessage
                      variant={isBot ? 'received' : 'sent'}
                      className={
                        isBot
                          ? 'bg-[#1a1a1a] border-white/10 text-neutral-200'
                          : 'bg-white text-black font-medium'
                      }
                    >
                      {msg.text}
                    </ChatBubbleMessage>

                    <div className="flex items-center justify-between mt-1 px-1">
                      {msg.timestamp && (
                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">
                          {msg.timestamp}
                        </span>
                      )}

                      {isBot && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="text-[10px] text-neutral-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-0.5 px-1 rounded hover:bg-white/5"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-[9px] text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </ChatBubble>
              );
            })}

            {isTyping && (
              <ChatBubble variant="received" children={undefined}>
                <ChatBubbleAvatar fallback="SA" className="bg-neutral-800 text-white" />
                <ChatBubbleMessage isLoading className="bg-[#1a1a1a]" />
              </ChatBubble>
            )}
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="px-6 py-2.5 bg-[#161616]/70 border-t border-white/5 overflow-x-auto scrollbar-none flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 flex-shrink-0 font-medium">
              Suggestions:
            </span>
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] uppercase tracking-wider px-3 py-1 bg-[#202020] hover:bg-white hover:text-black border border-white/10 hover:border-white transition-all text-neutral-300 rounded-full flex-shrink-0 cursor-pointer whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer Bar */}
          <div className="p-4 sm:p-5 bg-[#161616] border-t border-white/10">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputValue);
                }}
                placeholder="Ask Sarah's assistant about directing, scripts, rates, or bookings..."
                className="flex-1 bg-[#121212] border border-white/10 focus:border-white/40 rounded-md px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="px-5 py-3.5 bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-md flex items-center justify-center cursor-pointer font-semibold"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 text-[10px] uppercase tracking-wider text-neutral-500">
              <span>Direct inquiries: Abena_koblyn@gmail.com</span>
              <span className="hidden sm:inline">Tel: +233 27 723 3774</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
