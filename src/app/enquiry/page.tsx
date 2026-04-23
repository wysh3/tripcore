"use client";

import { useState } from "react";
import { createEnquiry } from "@/app/actions/enquiry";
import { createCarRental } from "@/app/actions/car-rental";

export default function EnquiryPage() {
  const [tab, setTab] = useState<"enquiry" | "car-rental">("enquiry");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [rental, setRental] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    pickupDrop: "",
    startDate: "",
    endDate: "",
    adults: "1",
    children: "0",
    carType: "Sedan",
    driverLang: "English",
    tripType: "Round Trip",
  });

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiry.name || !enquiry.email) return;
    setSubmitting(true);
    await createEnquiry(enquiry);
    setDone(true);
    setSubmitting(false);
  };

  const handleRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rental.fullName || !rental.startDate || !rental.endDate) return;
    setSubmitting(true);
    await createCarRental(rental);
    setDone(true);
    setSubmitting(false);
  };

  const inputCls =
    "w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black/30 text-black/80 placeholder:text-black/30";
  const labelCls = "block text-[10px] uppercase tracking-widest text-black/40 mb-1.5 font-semibold";

  return (
    <main className="bg-[#f5f2ed] min-h-screen font-sans flex items-center justify-center py-24 px-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-black/90 mb-3">
          Get in Touch
        </h1>
        <p className="text-black/40 text-sm mb-10">
          Tell us about your dream journey or book a private car.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/60 p-1 rounded-full mb-10 w-fit border border-black/5">
          {(["enquiry", "car-rental"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setDone(false); }}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                tab === t ? "bg-black text-white shadow" : "text-black/40 hover:text-black"
              }`}
            >
              {t === "enquiry" ? "General Enquiry" : "Car Rental"}
            </button>
          ))}
        </div>

        {done ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-black/5 shadow-sm">
            <p className="text-3xl font-serif text-black/90 mb-3">Thank you!</p>
            <p className="text-black/40 text-sm">
              Your {tab === "enquiry" ? "enquiry" : "car rental request"} has been received.
              We'll reach out to you shortly.
            </p>
            <button
              onClick={() => { setDone(false); setEnquiry({ name: "", email: "", phone: "", message: "" }); }}
              className="mt-8 text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              Submit another →
            </button>
          </div>
        ) : tab === "enquiry" ? (
          <form onSubmit={handleEnquiry} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} placeholder="Your name" value={enquiry.name}
                  onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} required />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" className={inputCls} placeholder="your@email.com" value={enquiry.email}
                  onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input className={inputCls} placeholder="+91 9999999999" value={enquiry.phone}
                onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Message</label>
              <textarea rows={4} className={inputCls} placeholder="Tell us about your dream trip..."
                value={enquiry.message}
                onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })} />
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-black text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
              {submitting ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRental} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} value={rental.fullName}
                  onChange={(e) => setRental({ ...rental, fullName: e.target.value })} required />
              </div>
              <div>
                <label className={labelCls}>WhatsApp Number *</label>
                <input className={inputCls} value={rental.whatsapp}
                  onChange={(e) => setRental({ ...rental, whatsapp: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" className={inputCls} value={rental.email}
                onChange={(e) => setRental({ ...rental, email: e.target.value })} required />
            </div>
            <div>
              <label className={labelCls}>Pickup & Drop Location *</label>
              <input className={inputCls} placeholder="e.g. Airport to Hotel" value={rental.pickupDrop}
                onChange={(e) => setRental({ ...rental, pickupDrop: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Start Date *</label>
                <input type="date" className={inputCls} value={rental.startDate}
                  onChange={(e) => setRental({ ...rental, startDate: e.target.value })} required />
              </div>
              <div>
                <label className={labelCls}>End Date *</label>
                <input type="date" className={inputCls} value={rental.endDate}
                  onChange={(e) => setRental({ ...rental, endDate: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Car Type</label>
                <select className={inputCls} value={rental.carType}
                  onChange={(e) => setRental({ ...rental, carType: e.target.value })}>
                  {["Sedan", "SUV / Innova", "Tempo Traveller", "Luxury Car"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Driver Language</label>
                <select className={inputCls} value={rental.driverLang}
                  onChange={(e) => setRental({ ...rental, driverLang: e.target.value })}>
                  {["English", "Spanish", "Hindi"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Trip Type</label>
                <select className={inputCls} value={rental.tripType}
                  onChange={(e) => setRental({ ...rental, tripType: e.target.value })}>
                  {["One Way", "Round Trip", "Multi-City Tour"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Adults</label>
                <input type="number" min="1" className={inputCls} value={rental.adults}
                  onChange={(e) => setRental({ ...rental, adults: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Children</label>
                <input type="number" min="0" className={inputCls} value={rental.children}
                  onChange={(e) => setRental({ ...rental, children: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-black text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
              {submitting ? "Submitting..." : "Request Car Rental"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
