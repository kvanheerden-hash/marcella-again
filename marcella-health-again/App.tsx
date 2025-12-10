
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from './components/QuantumScene';
import { ArrowDown, Menu, X, BookOpen, ShieldCheck, Factory, Globe, Star, Eye, Send } from 'lucide-react';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [formSubmitted, setFormSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitError(null);
  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const { error } = await supabase
    .from('Marcella Health Website contacts')
    .insert({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      company_name: formData.get('company_name'),
      position: formData.get('position'),
      message: formData.get('message'),
    });

  if (error) {
    console.error(error);
    setSubmitError('Something went wrong. Please try again.');
  } else {
    setFormSubmitted(true);
    form.reset();
  }

  setIsSubmitting(false);
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-marcella-primary selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-50/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Marcella%20logo.png" 
              alt="Marcella Health logo"
              className="w-10 h-10 drop-shadow-sm"
            />
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'} text-marcella-dark`}>
              MARCELLA HEALTH <span className="font-normal text-slate-500">2025</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Our Mission</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Our Products</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Our Promise</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Contact</a>
          </div>

          <button className="md:hidden text-marcella-dark p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-50 flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#science" onClick={scrollToSection('science')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">The Science</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Impact</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Authors</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-marcella-primary transition-colors cursor-pointer uppercase">Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay - Cool Tones */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.92)_0%,rgba(248,250,252,0.6)_50%,rgba(248,250,252,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-marcella-primary text-marcella-primary text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Trusted. • Tested. • Reliable.
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-marcella-dark drop-shadow-sm">
            Marcella Health <br/><span className="italic font-normal text-slate-600 text-3xl md:text-5xl block mt-4">Health Made Accessible</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-light leading-relaxed mb-12">
            We provide high-quality generic vitamins, supplements, and OTC medications so everyone can live healthier, happier lives.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-marcella-dark transition-colors cursor-pointer">
                <span>LEARN MORE</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-marcella-dark transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">Introduction</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-marcella-dark">Who We Are</h2>
              <div className="w-16 h-1 bg-marcella-primary mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                Marcella Health is a generics company dedicated to providing premium vitamins, supplements, and OTC medications at an affordable price. Our mission is to make quality healthcare accessible to all by focusing on transparency, safety, and affordability. We work closely with trusted global manufacturing partners, rigorous quality controls, and evidence-based formulations to ensure every product meets high standards for consistency and performance. By combining premium-grade generics with straightforward pricing and clear product information, we help individuals, healthcare providers, and partners make confident choices for better everyday health.
              </p>
            </div>
          </div>
        </section>

        {/* The Science: Surface Code */}
        <section id="science" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200">
                            <BookOpen size={14}/> What Drives Us
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-marcella-dark">Our mission</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                           We’re on a mission to deliver high-quality generic vitamins, supplements, and over-the-counter (OTC) medications all through a convenient online shopping experience coming soon. Every product we offer meets stringent quality and safety standards, and our commitment to quality and affordability is unwavering.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <motion.div 
                          className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] shadow-2xl"
                          style={{
                            background: "linear-gradient(145deg, #854DFF, #061551)"
                          }}
                          animate={{
                            borderRadius: [
                              "55% 45% 60% 40% / 40% 60% 40% 60%",
                              "45% 55% 50% 50% / 50% 50% 60% 40%",
                              "55% 45% 60% 40% / 40% 60% 40% 60%"
                            ]
                          }}
                          transition={{
                            duration: 8,
                            ease: "easeInOut",
                            repeat: Infinity
                          }}
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Product Catalog (Previously Impact) */}
        <section id="impact" className="py-24 bg-white border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">Catalog</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-marcella-dark">Our Products</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        High-quality generic formulations designed for effective relief and daily care.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Capsaicin Patch */}
                    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden p-8">
                             <img 
                                src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Capsaicin_J_01%20(1).png" 
                                alt="Capsaicin Patch packaging"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="p-6">
                             <div className="text-xs font-bold text-marcella-primary mb-2 tracking-wide uppercase">30 patches</div>
                             <h3 className="font-serif text-lg text-slate-800 mb-1">Capsaicin Patch</h3>
                             <p className="text-slate-500 text-sm">Capsaicin 0.025%</p>
                        </div>
                    </div>

                    {/* Lidocaine Patch */}
                    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden p-8">
                             <img 
                                src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Lidocain_F_03.png" 
                                alt="Lidocaine Patch packaging"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="p-6">
                             <div className="text-xs font-bold text-marcella-primary mb-2 tracking-wide uppercase">30 patches</div>
                             <h3 className="font-serif text-lg text-slate-800 mb-1">Lidocaine Patch</h3>
                             <p className="text-slate-500 text-sm">Lidocaine 4%</p>
                        </div>
                    </div>

                    {/* Menthol Patch */}
                    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden p-8">
                            <img 
                                src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Menthol_D_01%20(2).png" 
                                alt="Menthol Patch packaging"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="p-6">
                             <div className="text-xs font-bold text-marcella-primary mb-2 tracking-wide uppercase">30 patches</div>
                             <h3 className="font-serif text-lg text-slate-800 mb-1">Menthol Patch</h3>
                             <p className="text-slate-500 text-sm">Menthol 5%</p>
                        </div>
                    </div>

                    {/* Methyl Salicylate Cream */}
                    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-square bg-slate-50 flex items-center justify-center relative overflow-hidden p-8">
                            <img 
                                src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Methyl%20Salicylate_L_01.png" 
                                alt="Methyl Salicylate Cream packaging"
                                className="w-full h-full object-contain drop-shadow-sm"
                            />
                        </div>
                        <div className="p-6">
                             <div className="text-xs font-bold text-marcella-primary mb-2 tracking-wide uppercase">120g</div>
                             <h3 className="font-serif text-lg text-slate-800 mb-1">Methyl Salicylate Cream</h3>
                             <p className="text-slate-500 text-sm">Methyl Salicylate 25%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Results - Replaced with Quality Standards */}
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-marcella-dark">Excellence in Every Step</h2>
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16">
                   {/* Row 1 */}
                   <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="flex flex-col md:flex-row gap-8 items-start"
                   >
                        <div className="md:w-1/3">
                            <h3 className="font-serif text-2xl text-marcella-primary mb-2 flex items-center gap-3">
                                <ShieldCheck strokeWidth={1.5} className="w-7 h-7" />
                                Commitment to Quality
                            </h3>
                            <div className="h-1 w-12 bg-marcella-dark"></div>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Quality starts with rigorous testing. Every product undergoes multi-level checks to ensure it meets the highest standards of safety, purity, and effectiveness. From sourcing raw materials to final packaging, no step is overlooked.
                            </p>
                        </div>
                   </motion.div>

                   {/* Row 2 */}
                   <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="flex flex-col md:flex-row gap-8 items-start"
                   >
                        <div className="md:w-1/3">
                            <h3 className="font-serif text-2xl text-marcella-primary mb-2 flex items-center gap-3">
                                <Factory strokeWidth={1.5} className="w-7 h-7" />
                                Reliable Manufacturing
                            </h3>
                            <div className="h-1 w-12 bg-marcella-dark"></div>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our products are made in FDA-inspected, cGMP-compliant facilities. These advanced production environments ensure that every batch is consistent, safe, and effective. With strict in-process controls, you can trust the quality behind every item we deliver.
                            </p>
                        </div>
                   </motion.div>

                   {/* Row 3 */}
                   <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="flex flex-col md:flex-row gap-8 items-start"
                   >
                        <div className="md:w-1/3">
                            <h3 className="font-serif text-2xl text-marcella-primary mb-2 flex items-center gap-3">
                                <Globe strokeWidth={1.5} className="w-7 h-7" />
                                Global Expertise
                            </h3>
                            <div className="h-1 w-12 bg-marcella-dark"></div>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                We carefully source our ingredients from a trusted network of suppliers around the world. By working only with ethical and sustainable partners, we guarantee that our products are not only high-quality but also responsibly made.
                            </p>
                        </div>
                   </motion.div>
                </div>
            </div>
        </section>

        {/* Authors (Our Promise) */}
        <section id="authors" className="py-24 bg-slate-100 border-t border-slate-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">VALUES</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-marcella-dark">Our Promise</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Column 1 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-serif text-2xl text-marcella-dark mb-4 flex items-center justify-center gap-3">
                            <Star strokeWidth={1.5} className="w-7 h-7 text-marcella-primary" />
                            Premium Generic Solutions
                        </h3>
                        <div className="w-12 h-0.5 bg-marcella-primary mb-6 opacity-60"></div>
                        <p className="text-slate-600 leading-relaxed">
                            We specialize in offering carefully vetted generic formulations to ensure affordability without compromising quality.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-serif text-2xl text-marcella-dark mb-4 flex items-center justify-center gap-3">
                            <Globe strokeWidth={1.5} className="w-7 h-7 text-marcella-primary" />
                            Global Expertise
                        </h3>
                        <div className="w-12 h-0.5 bg-marcella-primary mb-6 opacity-60"></div>
                        <p className="text-slate-600 leading-relaxed">
                            Our worldwide network of manufacturing and sourcing partners ensures consistent excellence.
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <h3 className="font-serif text-2xl text-marcella-dark mb-4 flex items-center justify-center gap-3">
                            <Eye strokeWidth={1.5} className="w-7 h-7 text-marcella-primary" />
                            Vision for the Future
                        </h3>
                        <div className="w-12 h-0.5 bg-marcella-primary mb-6 opacity-60"></div>
                        <p className="text-slate-600 leading-relaxed">
                            We plan to bring our trusted generics to all channels that share our mission of making accessible, quality healthcare a reality for everyone.
                        </p>
                    </div>
                </div>
           </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-24 bg-white border-t border-slate-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                  <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-500 uppercase">Get In Touch</div>
                  <h2 className="font-serif text-4xl md:text-5xl mb-4 text-marcella-dark">Contact Us</h2>
                  <p className="text-slate-600">
                      Have questions about our products or partnership opportunities? We're here to help.
                  </p>
              </div>

              <div className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
                <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                            <input 
                                type="text" 
                                id="firstName"
                                name="first_name"
                                required 
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-marcella-primary focus:ring-2 focus:ring-marcella-primary/20 outline-none transition-all"
                                placeholder="Your First Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                            <input 
                                type="text" 
                                id="lastName"
                                name="last_name"
                                required 
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-marcella-primary focus:ring-2 focus:ring-marcella-primary/20 outline-none transition-all"
                                placeholder="Your Last Name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="company" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                            <input 
                                type="text" 
                                id="company" 
                                name="company_name" 
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-marcella-primary focus:ring-2 focus:ring-marcella-primary/20 outline-none transition-all"
                                placeholder="Your Company Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="position" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Position</label>
                            <input 
                                type="text" 
                                id="position" 
                                name="position"
                                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-marcella-primary focus:ring-2 focus:ring-marcella-primary/20 outline-none transition-all"
                                placeholder="Manager"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Message</label>
                        <textarea 
                            id="message" 
                            name="message"
                            rows={5} 
                            required 
                            className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-marcella-primary focus:ring-2 focus:ring-marcella-primary/20 outline-none transition-all resize-none"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <div className="flex flex-col items-center">
                        <button 
  type="submit"
  disabled={isSubmitting}
  className="px-10 py-4 bg-marcella-dark text-white font-medium tracking-wide rounded-full hover:bg-marcella-primary transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting ? 'Sending…' : 'Submit Inquiry'}
</button>
                      {submitError && (
  <p className="mt-4 text-sm text-red-600 text-center">
    {submitError}
  </p>
)}
                    </div>
                </form>

                {formSubmitted && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-8 pt-8 border-t border-slate-200 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-serif text-marcella-dark mb-2">Thank you for your query.</h3>
                        <p className="text-slate-600">It has been sent to our team and somebody will get back to you soon.</p>
                    </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-marcella-dark text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="text-center md:text-left w-full md:w-auto">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <div className="bg-white p-1.5 rounded-lg shadow-md">
                        <img 
                          src="https://cdn.jsdelivr.net/gh/kvanheerden-hash/resources/Marcella%20logo.png" 
                          alt="Marcella Health logo"
                          className="w-8 h-8"
                        />
                    </div>
                    <div className="text-white font-serif font-bold text-2xl">Marcella Health</div>
                </div>
                <p className="text-sm">Health Made Accessible.</p>
            </div>
            
            <div className="text-center md:text-right w-full md:w-auto text-sm space-y-2">
                <a href="mailto:info@marcellahealth.com" className="block hover:text-white transition-colors">info@marcellahealth.com</a>
                <p>Tel: 307-410-3813</p>
                <p>
                    1607 Capitol Ave, Suite 511<br />
                    Cheyenne, Wyoming 82001
                </p>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-slate-600 border-t border-slate-800 pt-8">
            &copy; {new Date().getFullYear()} Marcella Health. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
