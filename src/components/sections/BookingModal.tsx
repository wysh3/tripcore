"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Calendar, Users, Send, ShieldCheck, Headphones, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { createEnquiry } from "@/app/actions/enquiry";
import { getPackageFormContext } from "@/app/actions/get-package-context";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export const BookingModal = ({ isOpen, onClose, defaultPackage }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packages, setPackages] = useState<{ id: string; title: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    message: ""
  });

  useEffect(() => {
    if (isOpen) {
      async function loadContext() {
        const { packages: pkgs } = await getPackageFormContext();
        setPackages(pkgs);
        if (defaultPackage) {
          setFormData(prev => ({ ...prev, destination: defaultPackage }));
        }
      }
      loadContext();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, defaultPackage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const result = await createEnquiry({
        ...formData,
        adults: parseInt(formData.adults),
        children: parseInt(formData.children),
        checkIn: formData.checkIn ? new Date(formData.checkIn) : undefined,
        checkOut: formData.checkOut ? new Date(formData.checkOut) : undefined,
      });

      if (result.success) {
        toast.success("Enquiry sent successfully! Our experts will contact you soon.");
        setFormData({
          name: "", email: "", phone: "", destination: "",
          checkIn: "", checkOut: "", adults: "2", children: "0", message: ""
        });
        onClose();
      } else {
        toast.error("Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 bg-white border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#b08d57] transition-all placeholder:text-black/30 font-jost";
  const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b08d57]";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-[95%] max-w-5xl h-[90vh] md:h-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Side: Form */}
            <div className="flex-1 p-8 md:p-12 bg-[#fdfaf5] overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tighter uppercase font-medium">
                    Book Your <br />
                    <span className="text-[#b08d57]">Journey.</span>
                  </h2>
                  <p className="text-black/50 text-sm max-w-sm font-jost leading-relaxed">
                    Tell us a few details and our travel experts will craft the perfect experience for you.
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className={iconCls} />
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange}
                      placeholder="Full Name" required className={inputCls}
                    />
                  </div>
                  <div className="relative">
                    <Mail className={iconCls} />
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      placeholder="Email Address" required className={inputCls}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className={iconCls} />
                  <div className="flex items-center pl-10 bg-white border border-black/5 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 border-r border-black/5 h-full py-3 bg-black/[0.02]">
                      <img src="https://flagcdn.com/in.svg" className="w-4 h-3 object-cover rounded-[1px]" alt="IN" />
                      <span className="text-[10px] font-bold text-black/40 tracking-wider">+91</span>
                    </div>
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      placeholder="Enter 10-digit number" className="flex-1 px-4 py-3 text-sm focus:outline-none placeholder:text-black/30 font-jost"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className={iconCls} />
                  <select 
                    name="destination" value={formData.destination} onChange={handleInputChange}
                    className={`${inputCls} appearance-none bg-white`}
                  >
                    <option value="">Select a package or destination</option>
                    {packages.map(p => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className={iconCls} />
                    <input 
                      type="date" name="checkIn" value={formData.checkIn} onChange={handleInputChange}
                      className={inputCls}
                    />
                  </div>
                  <div className="relative">
                    <Calendar className={iconCls} />
                    <input 
                      type="date" name="checkOut" value={formData.checkOut} onChange={handleInputChange}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Users className={iconCls} />
                    <select name="adults" value={formData.adults} onChange={handleInputChange} className={`${inputCls} appearance-none bg-white`}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Adults</option>)}
                    </select>
                  </div>
                  <div className="relative">
                    <Users className={iconCls} />
                    <select name="children" value={formData.children} onChange={handleInputChange} className={`${inputCls} appearance-none bg-white`}>
                      {[0,1,2,3,4].map(n => <option key={n} value={n}>{n} Children</option>)}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <textarea 
                    name="message" value={formData.message} onChange={handleInputChange}
                    placeholder="Tell us about your preferences (Optional)..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#b08d57] transition-all placeholder:text-black/30 font-jost resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#b08d57] hover:bg-[#96784a] text-white rounded-xl font-jost text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#b08d57]/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Send Enquiry"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-black/30 font-jost uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Your information is secure and strictly confidential.
                </div>
              </form>
            </div>

            {/* Right Side: Image & Features */}
            <div className="hidden md:flex w-[40%] relative bg-black flex-col justify-end p-12 overflow-hidden">
              <img 
                src="/images/rajasthan.png" 
                alt="Luxury Destination" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Close <X className="w-3.5 h-3.5" />
              </button>

              <div className="relative z-10 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Award className="w-5 h-5 text-[#b08d57]" />
                  </div>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-[0.15em] leading-tight">Best Price<br/>Guarantee</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <Headphones className="w-5 h-5 text-[#b08d57]" />
                  </div>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-[0.15em] leading-tight">24/7<br/>Support</p>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-[#b08d57]" />
                  </div>
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-[0.15em] leading-tight">100% Secure<br/>Booking</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
