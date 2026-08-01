import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="direct-collaboration"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 md:px-12 bg-[#080808] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Inquiries Header & Contact Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
              Direct Collaboration
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-widest text-white uppercase leading-tight">
              Let’s bring it to the screen
            </h2>
            <div className="w-16 h-[2px] bg-white/30 mt-5" />
          </div>

          <p className="text-neutral-300 text-base leading-relaxed font-light">
            Have a script that needs a visual identity, a brand story waiting to be told, or a creative project seeking a director’s touch? Let’s collaborate and breathe life into your vision. Available for freelance bookings, script consultations, and commercial set collaborations worldwide.
          </p>

          <div className="pt-6 border-t border-white/10 space-y-5">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-[#121212]">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Location</p>
                <p className="text-sm text-neutral-200 font-medium">Accra, Ghana (Worldwide Travel)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-[#121212]">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Direct Email</p>
                <a href="mailto:Abena_koblyn@gmail.com" className="text-sm text-neutral-200 hover:text-white transition-colors font-medium">
                  Abena_koblyn@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-[#121212]">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">Phone / WhatsApp</p>
                <a href="tel:0277233774" className="text-sm text-neutral-200 hover:text-white transition-colors font-medium">
                  +233 27 723 3774
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Collaboration Form */}
        <div className="lg:col-span-7 bg-[#121212]/60 border border-white/10 p-8 sm:p-12 relative shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-800 via-white/20 to-neutral-800" />

          <h3 className="text-xl font-serif tracking-widest text-white uppercase mb-2">
            Send a Project Inquiry
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-8">
            Direct message to Sarah Adjei’s studio
          </p>

          {submitted ? (
            <div className="p-8 border border-white/20 bg-[#181818] flex items-center space-x-5 animate-in fade-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-white flex-shrink-0" />
              <div>
                <p className="text-lg font-serif text-white uppercase tracking-wider">Inquiry Received</p>
                <p className="text-sm text-neutral-300 mt-1">
                  Thank you for reaching out. Sarah will review your project details and respond promptly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-[#181818] border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#181818] border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                  Inquiry Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#181818] border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="Directing Booking">Film Directing / Commercial Booking</option>
                  <option value="Script Consultation">Screenplay & Script Consultation</option>
                  <option value="Cinematography">Cinematography & Set Collaboration</option>
                  <option value="Press & Speaking">Press, Panel or Festival Inquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                  Project Brief / Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell Sarah about your script concept, filming timeline, location, budget scope..."
                  className="w-full bg-[#181818] border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span>Send Direct Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
