import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlinePaperAirplane } from 'react-icons/hi2';
import { useToast } from '../components/Toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending message
    setTimeout(() => {
      addToast('Message sent successfully! We will get back to you soon.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-50">Contact Us</h1>
        <p className="text-sm text-slate-400">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-[#111827]/80 p-6 sm:p-8 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
        >
          <h2 className="text-xl font-semibold text-slate-50 mb-6">Send us a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
                placeholder="How can we help?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 resize-none"
                placeholder="Tell us more about your question or feedback..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(168,85,247,0.55)] transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiOutlinePaperAirplane className="text-lg" />
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Contact Details Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Get in Touch</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  <HiOutlineEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</p>
                  <a 
                    href="mailto:iyra0367.becse24@chitkara.edu.in" 
                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    iyra0367.becse24@chitkara.edu.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <HiOutlineMapPin className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</p>
                  <p className="text-sm text-slate-300">Chitkara University</p>
                  <p className="text-xs text-slate-400">Punjab, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/15 text-pink-300">
                  <HiOutlinePhone className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Support</p>
                  <p className="text-sm text-slate-300">Available 24/7</p>
                  <p className="text-xs text-slate-400">Response within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <h3 className="text-lg font-semibold text-slate-50 mb-3">Quick Info</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <p>
                <span className="text-slate-300 font-medium">Developer:</span> Iyra Gupta
              </p>
              <p>
                <span className="text-slate-300 font-medium">Project:</span> NEXNOTE
              </p>
              <p>
                <span className="text-slate-300 font-medium">Version:</span> 2.0 (College Edition)
              </p>
              <p>
                <span className="text-slate-300 font-medium">Status:</span>{' '}
                <span className="text-green-400">Active Development</span>
              </p>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/90 to-slate-900/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            <h3 className="text-lg font-semibold text-slate-50 mb-3">Common Questions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-300 font-medium">How do I upload notes?</p>
                <p className="text-slate-400 text-xs mt-1">Login as a teacher and go to "Upload Notes" page.</p>
              </div>
              <div>
                <p className="text-slate-300 font-medium">Can I download notes offline?</p>
                <p className="text-slate-400 text-xs mt-1">Yes, click the download button on any note.</p>
              </div>
              <div>
                <p className="text-slate-300 font-medium">How do I report an issue?</p>
                <p className="text-slate-400 text-xs mt-1">Use the contact form above or email us directly.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
