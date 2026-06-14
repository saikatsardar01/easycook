'use client'
import { useState } from 'react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <>
      
      <main className="min-h-screen bg-paper font-sans pb-24">
        
        {/* HERO SECTION */}
        <div className="bg-stone-900 text-stone-300 py-20 px-6 rounded-b-[3rem] shadow-soft mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">Support & Feedback</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              We'd love to hear from you.
            </h1>
            <p className="text-lg opacity-80 max-w-xl mx-auto">
              Have a question about a recipe? Found a bug? Or just want to say hello? 
              Our kitchen door is always open.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Contact Info & FAQ */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Email Card */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mb-6">
                  ✉️
                </div>
                <h3 className="font-display font-bold text-2xl text-stone-800 mb-2">Email Us</h3>
                <p className="text-stone-500 mb-6">
                  For general inquiries, recipe corrections, or partnership opportunities.
                </p>
                <a href="mailto:support@easycook.in" className="text-xl font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
                  support@easycook.in
                </a>
              </div>

              {/* Quick FAQ */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-200">
                <h3 className="font-display font-bold text-xl text-stone-800 mb-6">Common Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-stone-700 mb-1">How do I submit a recipe?</h4>
                    <p className="text-stone-500 text-sm">You can submit your own dishes using our <a href="/submit" className="text-emerald-600 underline">Submit Page</a>.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-700 mb-1">Is EasyCook free?</h4>
                    <p className="text-stone-500 text-sm">Yes! easycook.in is completely free to use for everyone.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-700 mb-1">Found a mistake?</h4>
                    <p className="text-stone-500 text-sm">Please let us know via the form. Mention the recipe name.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-soft border border-stone-200 h-full">
                
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6">
                      ✅
                    </div>
                    <h3 className="font-display font-bold text-3xl text-stone-800 mb-4">Message Sent!</h3>
                    <p className="text-stone-500 max-w-md">
                      Thank you for reaching out. We read every message and will get back to you as soon as possible.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-8 text-stone-900 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="font-display font-bold text-3xl text-stone-800 mb-8">Send a Message</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-bold text-stone-700 ml-1">Your Name</label>
                        <input 
                          type="text" 
                          id="name"
                          required
                          className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-bold text-stone-700 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-bold text-stone-700 ml-1">Subject</label>
                      <select 
                        id="subject"
                        className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Report a Bug</option>
                        <option>Recipe Correction</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="font-bold text-stone-700 ml-1">Message</label>
                      <textarea 
                        id="message"
                        required
                        rows={6}
                        className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium resize-none"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-stone-900 hover:bg-black text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}