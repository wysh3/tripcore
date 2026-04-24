"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { createEnquiry } from "@/app/actions/enquiry";
import Link from "next/link";

export default function EnquiryPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitting(true);
    await createEnquiry(formData);
    setDone(true);
    setSubmitting(false);
  };

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans selection:bg-black selection:text-white">

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 px-10 md:px-20 overflow-hidden">
        {/* Ripple Background Pattern */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.08] pointer-events-none z-0">
          <img 
            src="/images/ripples.png" 
            alt="" 
            className="w-full h-full object-cover origin-top-right scale-125 mix-blend-multiply" 
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                Contact Us
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1.1] tracking-tight">
                We&apos;d Love to <br />
                Hear From You
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-lg leading-relaxed font-jost">
                Have a question, need help planning your trip, or want a 
                custom experience? Our team is here to help you 
                every step of the way.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-square">
                {/* REUSING BLOB MASK */}
                <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                  <defs>
                    <clipPath id="blob-mask-contact" clipPathUnits="objectBoundingBox">
                      <path d="M0.628509 0.00033666C0.647771 -0.000682815 0.665059 0.000708452 0.684051 0.0032247C0.747935 0.0112259 0.80844 0.0364403 0.859103 0.0761733C0.881688 0.0936358 0.90496 0.116146 0.922232 0.138798C0.954343 0.18093 0.979065 0.244271 0.97928 0.297547C0.979212 0.323228 0.974508 0.348686 0.965393 0.372694C0.957248 0.394419 0.945273 0.415455 0.93516 0.436355C0.920602 0.466456 0.907375 0.500425 0.903708 0.533824C0.897594 0.589424 0.92521 0.635777 0.932588 0.688901C0.93948 0.738498 0.929734 0.795435 0.898564 0.835779C0.876961 0.863729 0.849644 0.881196 0.816484 0.892948C0.776425 0.907143 0.736558 0.905083 0.695168 0.907374C0.664112 0.910122 0.63002 0.91336 0.59972 0.920926C0.533912 0.93736 0.478432 0.981998 0.411249 0.995262C0.401933 0.997101 0.392435 0.99832 0.383019 0.999493C0.381913 0.999595 0.380805 0.999674 0.379695 0.99973C0.329111 1.00216 0.286944 0.988323 0.249819 0.953795C0.194584 0.90242 0.175573 0.833167 0.133207 0.772055C0.109976 0.738537 0.0854802 0.718227 0.0602012 0.688511C0.0474593 0.673673 0.0363752 0.657487 0.0271462 0.640246C-0.0304489 0.531127 0.00645293 0.343781 0.110866 0.272569C0.169251 0.233777 0.243385 0.224396 0.309701 0.205259C0.384474 0.183682 0.422123 0.131837 0.471391 0.076263C0.512106 0.0303358 0.566429 0.00286475 0.628509 0.00033666Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div 
                  className="w-full h-full bg-[#e5e1da] overflow-hidden relative shadow-2xl shadow-black/10"
                  style={{ clipPath: "url(#blob-mask-contact)", transform: "translateZ(0) scale(1.1)" }}
                >
                  <img 
                    src="/images/enquiry-hero.png" 
                    alt="" 
                    className="w-full h-full object-cover scale-110"
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="px-10 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* LEFT: GET IN TOUCH */}
            <div className="lg:col-span-4 space-y-12">
              <h2 className="text-4xl font-serif text-gray-900">Get in Touch</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Visit Us</h4>
                    <p className="text-[11px] text-gray-400 font-jost leading-relaxed uppercase tracking-wider">
                      TripCore Travel Pvt. Ltd.<br />
                      123 Heritage Road, C-Scheme<br />
                      Jaipur, Rajasthan 302001, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Call Us</h4>
                    <p className="text-[11px] text-gray-400 font-jost leading-relaxed uppercase tracking-wider">
                      +91 98765 43210<br />
                      Mon — Sat, 9:00 AM — 7:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Email Us</h4>
                    <p className="text-[11px] text-gray-400 font-jost leading-relaxed uppercase tracking-wider">
                      hello@tripcore.com<br />
                      We aim to reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Business Hours</h4>
                    <p className="text-[11px] text-gray-400 font-jost leading-relaxed uppercase tracking-wider">
                      Monday — Saturday: 9:00 AM — 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SEND US A MESSAGE */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif text-gray-900">Send Us a Message</h2>
                <p className="text-gray-400 font-jost text-[10px] uppercase tracking-widest">
                  Fill out the form and our travel experts will get back to you shortly.
                </p>
              </div>

              {done ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2.5rem] p-20 text-center border border-black/5 shadow-2xl shadow-black/5"
                >
                  <div className="w-20 h-20 bg-[#f5f2ed] rounded-full flex items-center justify-center mx-auto mb-8">
                    <Send className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-3xl font-serif text-gray-900 mb-4">Message Sent!</h3>
                  <p className="text-gray-400 font-jost text-sm max-w-xs mx-auto mb-10">
                    Thank you for reaching out. One of our travel designers will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => { setDone(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-black/5 shadow-2xl shadow-black/5 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <input 
                        type="text" required placeholder="Your name"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#f5f2ed]/50 border border-black/5 px-8 py-5 rounded-2xl text-sm font-jost focus:outline-none focus:border-black/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input 
                        type="email" required placeholder="you@example.com"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#f5f2ed]/50 border border-black/5 px-8 py-5 rounded-2xl text-sm font-jost focus:outline-none focus:border-black/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                      <input 
                        type="text" placeholder="+91 00000 00000"
                        value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#f5f2ed]/50 border border-black/5 px-8 py-5 rounded-2xl text-sm font-jost focus:outline-none focus:border-black/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                      <input 
                        type="text" placeholder="How can we help you?"
                        value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-[#f5f2ed]/50 border border-black/5 px-8 py-5 rounded-2xl text-sm font-jost focus:outline-none focus:border-black/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                    <textarea 
                      rows={5} placeholder="Tell us about your travel plans, questions, or any special requests..."
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#f5f2ed]/50 border border-black/5 px-8 py-8 rounded-[2rem] text-sm font-jost focus:outline-none focus:border-black/20 resize-none"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                    <button 
                      type="submit" disabled={submitting}
                      className="w-full md:w-auto bg-black text-white px-12 py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f5f2ed] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="text-[9px] text-gray-400 font-jost uppercase tracking-widest leading-relaxed">
                        Your information is safe with us.<br />We respect your privacy.
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA: TALK TO SOMEONE */}
      <section className="px-10 md:px-20 py-40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16">
            <div className="hidden lg:block h-64 rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
              <img src="/images/enquiry-hero.png" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
                Prefer to talk to someone?
              </h2>
              <p className="text-xs text-gray-400 font-jost uppercase tracking-[0.2em]">
                Our travel specialists are just a call away.
              </p>
              <a 
                href="tel:+919876543210"
                className="inline-flex items-center gap-4 bg-white border border-black/5 px-12 py-6 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl shadow-black/5"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
            </div>

            <div className="hidden lg:block h-64 rounded-[3rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
              <img src="/images/enquiry-cta.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
