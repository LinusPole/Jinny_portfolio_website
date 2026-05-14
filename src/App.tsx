import React, { useState, useEffect, FormEvent, useRef } from 'react';
import { Menu, X, Check, MapPin, Mail, Zap, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    emailjs.init("loQkpupJya09YdyPh");
  }, []);

  /**
   * toggleMobileMenu: Switches the mobile navigation visibility.
   * Sets the boolean state that controls the mobile slide-in menu and the hamburger icon state.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * handleNavLinkClick: Closes the mobile menu when a link is clicked.
   * This ensures a smooth transition when moving between sections on smaller devices.
   */
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

/**
    * handleSubmit: Processes the contact form data.
    * Prevents default page reload and sends email via EmailJS.
    */
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     
     if (!formRef.current) return;
     
     const serviceID = "service_jinny";
     const templateID = "template_q01x8co";
     
     emailjs.sendForm(serviceID, templateID, formRef.current)
       .then((response) => {
         console.log("SUCCESS!", response.status, response.text);
         alert("Thank you for your message! Jinny will get back to you shortly.");
         formRef.current?.reset();
       })
       .catch((error) => {
         console.error("FAILED...", error);
         alert("Oops! Something went wrong. Please try again later.");
       });
   };

  return (
    <div className="font-sans text-text-dark bg-bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center h-16">
          <a href="#" className="font-serif text-2xl font-bold text-primary">J.M.</a>
          
          <ul className="hidden md:flex gap-10">
{['Home', 'About', 'Services', 'Academics', 'Portfolio', 'Skills', 'Testimonials', 'Contact'].map((item) => (
               <li key={item}>
                 <a href={`#${item.toLowerCase()}`} className="font-medium hover:text-primary transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:height-[2px] after:bg-primary after:transition-all hover:after:w-full py-2">
                   {item}
                 </a>
               </li>
             ))}
          </ul>

          <div className="md:hidden cursor-pointer flex flex-col gap-1" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-20 left-0 w-full bg-white h-screen z-50 p-10 flex flex-col gap-6 text-center text-xl font-medium shadow-lg"
            >
{['Home', 'About', 'Services', 'Academics', 'Portfolio', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                 <a key={item} href={`#${item.toLowerCase()}`} onClick={handleNavLinkClick} className="hover:text-primary transition-colors">
                   {item}
                 </a>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-primary font-semibold flex items-center gap-2 mb-4">
                <Sparkles size={18} /> Hi, I'm Jinny your homework girly
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
                Your Academic <br/><span className="text-primary italic">Success Partner</span>
              </h1>
               <p className="text-lg text-text-light mb-8 max-w-lg">
                 Hello, I'm Jennifer. I do homework for college students: essays, quizzes, tests, labs, weekly discussions, Sophia courses, Aleks, Wiley, full online classes, and entire degree programs. 8 years of experience across math, chemistry, biology, English, history, anatomy, pathophysiology, statistics, calculus, algebra, and criminal justice.
               </p>
              <div className="flex gap-4 mb-12">
                <a href="#contact" className="btn btn-primary">Get Started</a>
                <a href="#portfolio" className="btn btn-secondary">View My Work</a>
              </div>
              <div className="flex gap-12 pt-8 border-t border-border">
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-primary">500+</span>
                  <span className="text-sm text-text-light">Projects Completed</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-primary">100%</span>
                  <span className="text-sm text-text-light">Success Rate</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-primary">8+</span>
                  <span className="text-sm text-text-light">Years Experience</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="image-placeholder bg-gradient-to-br from-blue-50 to-indigo-100 border-none shadow-xl">
                 <span className="placeholder-text font-serif text-2xl italic text-primary/40">Excellence in Writing</span>
                 <div className="placeholder-icon text-primary/20">👩‍🎓</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* About Section */}
        <section id="about" className="section-padding">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="section-tag">About Me</span>
              <h2 className="section-title text-4xl font-serif mt-2">Dedicated to Your <br/>Academic Excellence</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div className="image-placeholder secondary bg-indigo-50/50">
                  <span className="placeholder-text">About Image</span>
               </div>
               <div>
                  <h3 className="text-3xl font-serif mb-6">Meet Jennifer — "Jinny Your Homework Girly"</h3>
                  <p className="text-text-light text-lg mb-6 leading-relaxed">
                    Hello, I'm Jennifer, and I do homework for college students. I handle essays, quizzes, tests, labs, weekly discussions and replies, Sophia courses, Aleks, Wiley, full online classes, and even entire degree programs for students who want long-term assistance. I work across almost every subject, including math, chemistry, biology, history, English, anatomy and physiology, pathophysiology, fundamentals, health assessment, statistics, calculus, algebra, and criminal justice, with the only exceptions being medical billing and taxation.
                  </p>
                  <p className="text-text-light text-lg mb-8 leading-relaxed">
                    I have 8 years of experience, and my clients consistently graduate with GPAs over 3.9, with 99% of classes ending in an A grade. I respond to my clients immediately, I never allow an assignment to be submitted late, and I genuinely love the work I do. I also provide Turnitin AI and plagiarism reports to show that every assignment is original, authentic, and created from scratch for all assignments.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 font-medium">
                      <div className="highlight-icon"><Check size={14} /></div>
                      <span>100% Original Work</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium">
                      <div className="highlight-icon"><Check size={14} /></div>
                      <span>On-Time Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium">
                      <div className="highlight-icon"><Check size={14} /></div>
                      <span>Confidential Service</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium">
                      <div className="highlight-icon"><Check size={14} /></div>
                      <span>24/7 Availability</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
         </section>

       {/* Services Section */}
       <section id="services" className="section-padding bg-bg-light">
         <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <span className="section-tag">Services</span>
             <h2 className="section-title text-4xl font-serif mt-2">Homework Help <br/>Services</h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Service 1 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">📝</div>
               <h3 className="text-xl font-serif font-bold mb-3">Essay & Paper Writing</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>English & Literature</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>History & Criminal Justice</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Research & Analysis</li>
               </ul>
             </div>

             {/* Service 2 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">🧮</div>
               <h3 className="text-xl font-serif font-bold mb-3">Math & Sciences</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Algebra, Calculus, Statistics</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Chemistry & Biology Labs</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Anatomy & Physiology</li>
               </ul>
             </div>

             {/* Service 3 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">💻</div>
               <h3 className="text-xl font-serif font-bold mb-3">Online Classes</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Sophia Learning</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Aleks & WileyPLUS</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Complete Course Takeover</li>
               </ul>
             </div>

             {/* Service 4 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">🏥</div>
               <h3 className="text-xl font-serif font-bold mb-3">Nursing & Healthcare</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Pathophysiology</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Health Assessment</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Nursing Fundamentals</li>
               </ul>
             </div>

             {/* Service 5 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">📊</div>
               <h3 className="text-xl font-serif font-bold mb-3">Tests & Quizzes</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Timed Examinations</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Weekly Quizzes</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Midterms & Finals</li>
               </ul>
             </div>

             {/* Service 6 */}
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
               <div className="text-4xl mb-4">🎓</div>
               <h3 className="text-xl font-serif font-bold mb-3">Degree Completion</h3>
               <ul className="space-y-2 flex-grow">
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Full Program Management</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>All Subjects Covered</li>
                 <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Consistent Quality</li>
               </ul>
             </div>
           </div>
         </div>
       </section>

       {/* Portfolio Section */}
      <section id="portfolio" className="section-padding bg-bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title text-4xl font-serif mt-2">Recently Completed Assignments </h2>
            <p className="section-subtitle mt-4">A selection of completed projects showcasing expertise across various academic disciplines.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Nursing Samples */}
              <PortfolioCard 
                category="Nursing" 
                title="Nursing Work" 
                samples={[
                  { name: "Community Assessment and Plan of Care", link: "/files/nursing/Community Assessment and Plan of Care.docx" },
                  { name: "Nursing Process Paper – Osteosarcoma", link: "/files/nursing/Nursing process paper Osteosarcoma..-1.docx" },
                  { name: "Why do I want to become a nurse", link: "/files/nursing/Why do I want to become a nurse..docx" },
                  { name: "Community Assessment (Group Assignment)", link: "/files/nursing/Community Assessment and Plan of Care (Group Assignment).pptx" }
                ]}
              />

             {/* STEM & Health Sciences Samples */}
              <PortfolioCard 
                category="STEM & Health" 
                title="STEM & Health" 
                samples={[
                  { name: "AP4 Week 2 discussion", link: "/files/STEM & Health Sciences/AP4 Week 2 discussion.docx" },
                  { name: "FINAL_LABS_BIOS251_Online_Labs_Week_5_Integumentary_system_lab", link: "/files/STEM & Health Sciences/FINAL_LABS_BIOS251_Online_Labs_Week_5-Integumentary_system_lab.docx" },
                  { name: "Pathophysiology community Cafe wk 6", link: "/files/STEM & Health Sciences/Pathophysiology community Cafe wk 6.docx" },
                  { name: "RUA Pathophysiological Processes Assignment", link: "/files/STEM & Health Sciences/RUA Pathophysiological Processes Assignment.docx" }
                ]}
              />

             {/* Psychology Samples */}
              <PortfolioCard 
                category="Psychology" 
                title="Psychology" 
                samples={[
                  { name: "Issues in psychology", link: "/files/Psychology samples/Issues in psychology.docx" },
                  { name: "Pico (Eating Disorder)", link: "/files/Psychology samples/Pico (Eating Disorder).pptx" },
                  { name: "Schizophrenia", link: "/files/Psychology samples/Schizophrenia..docx" }
                ]}
              />

             {/* Business & Management Samples */}
              <PortfolioCard 
                category="Business" 
                title="Business & Management" 
                samples={[
                  { name: "Business 102 - Marketing Strategy Analysis", link: "/files/Business & Management/Business 102 - Assignment 1 Marketing Strategy Analysis.docx" },
                  { name: "Case Ratan Tata Ethical Leadership", link: "/files/Business & Management/Case Ratan Tata Ethical Leadership.docx" },
                  { name: "Managing resistance during digital transformation", link: "/files/Business & Management/Managing resistance during digital transformation (2).docx" },
                  { name: "Milestone Activity #1 325 Human Resource", link: "/files/Business & Management/Milestone Activity #1 325 Human Resource.docx" },
                  { name: "Module 1 - Assessment", link: "/files/Business & Management/Module 1 - Assessment.docx" }
                ]}
              />

            {/* Humanities Samples */}
            <PortfolioCard 
              category="Humanities" 
              title="Humanities" 
              samples={[
                { name: "Ethics and Civics Historical Analysis", link: "/files/humanities/HIST 1302 Ethics and Civics Historical Analysis.docx" },
                { name: "Liberal Revolutions Analysis", link: "/files/humanities/Primary Source Analysis Liberal Revolutions N.docx" },
                { name: "HIST 1302 Sources Worksheet", link: "/files/humanities/HIST 1302 Sources Worksheet.docx" },
                { name: "Week 8 History Assignment", link: "/files/humanities/Week 8 History Assignment.docx" }
              ]}
            />

            {/* Literature Samples */}
            <PortfolioCard 
              category="Literature" 
              title="Literature" 
              samples={[
                { name: "Argument Analysis Mini-Assignment", link: "/files/literature/Argument Analysis Mini-Assignment N.docx" },
                { name: "Lens Analysis Essay: Narrative Voice", link: "/files/literature/Lens analysis essay F.docx" },
                { name: "Week 5 Annotated Bibliography", link: "/files/literature/Week 5 Annotated Bibliography.docx" },
                { name: "Career Field Expository Essay", link: "/files/literature/Week 8 Assignment Major 2 Final - Career Field Expository Essay N.docx" }
              ]}
            />
          </div>

          <div className="portfolio-note mt-12 p-6 bg-white border border-border text-center rounded-lg text-text-light">
            <p><strong>Note:</strong> Additional work samples available upon request. Contact me to see specific examples related to your course needs.</p>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="section-padding bg-bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Academic Work Samples</span>
            <h2 className="section-title text-4xl font-serif mt-2">Demonstrated Academic Excellence</h2>
            <p className="section-subtitle mt-4">Samples of work completed for clients seeking degree assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bachelor's Level Samples */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-serif font-bold mb-3">Bachelor's Level Work</h3>
              <p className="text-text-light text-center flex-grow">
                Samples of essays, research papers, and assignments completed for Bachelor's degree clients
              </p>
              <div className="mt-6">
                <a href="#" className="btn btn-outline">View Samples</a>
              </div>
            </div>

            {/* Master's Level Samples */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-serif font-bold mb-3">Master's Level Work</h3>
              <p className="text-text-light text-center flex-grow">
                Samples of thesis chapters, literature reviews, and advanced projects for Master's degree clients
              </p>
              <div className="mt-6">
                <a href="#" className="btn btn-outline">View Samples</a>
              </div>
            </div>

            {/* PhD Level Samples */}
            <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-serif font-bold mb-3">PhD Level Work</h3>
              <p className="text-text-light text-center flex-grow">
                Samples of dissertation sections, research proposals, and academic publications for PhD candidates
              </p>
              <div className="mt-6">
                <a href="#" className="btn btn-outline">View Samples</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <span className="section-tag">Expertise</span>
              <h2 className="text-4xl font-serif mt-4 mb-8">Skills & Proficiencies</h2>
              <div className="flex flex-col gap-6">
                 {[  
                   { name: "Nursing & Healthcare", level: "100%" },  
                   { name: "STEM & Health Sciences", level: "100%" },  
                   { name: "Psychology & Behavioral Science", level: "100%" },  
                   { name: "Business & Management", level: "100%" },  
                   { name: "English & Literature", level: "100%" },  
                   { name: "Social Sciences", level: "100%" }  
                 ].map(skill => (  
                   <div key={skill.name} className="flex flex-col gap-2">  
                     <div className="flex justify-between font-semibold">  
                       <span>{skill.name}</span>  
                       <span>{skill.level}</span>  
                     </div>  
                     <div className="skill-bar"><div className="skill-progress" style={{ width: skill.level }}></div></div>  
                   </div>  
                 ))}
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col gap-10">
              <div>
                <h4 className="text-xl font-bold mb-6">Learning Platforms</h4>
                <div className="flex gap-3 flex-wrap">
                  {["Sophia Learning", "Aleks", "WileyPLUS", "Blackboard", "Canvas", "D2L"].map(platform => (
                    <span key={platform} className="skill-tag hover:border-primary hover:text-primary transition-all px-4 py-2 border rounded-full text-sm font-medium">{platform}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-6">Professional Services</h4>
                <div className="flex gap-3 flex-wrap">
                  {["Research", "Academic Writing", "Data Analysis", "Plagiarism Proofing", "Turnitin Reports", "Quick Turnaround"].map(skill => (
                    <span key={skill} className="skill-tag px-4 py-2 border rounded-full text-sm font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
       </section>

       {/* Testimonials Section */}
       <section id="testimonials" className="section-padding bg-bg-light">
         <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <span className="section-tag">Testimonials</span>
             <h2 className="section-title text-4xl font-serif mt-2">What Clients Say</h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col">
               <div className="text-xl mb-4">★★★★★</div>
               <p className="text-text-light mb-6 flex-grow">
                 "Jinny saved my semester! I was falling behind in my online statistics class and she stepped in and got me an A. Professional, fast, and the work was perfect. Highly recommend!"
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                   <span className="text-primary font-semibold">S</span>
                 </div>
                 <div>
                   <h4 className="font-bold">Sarah K.</h4>
                   <span className="text-sm text-text-light">Statistics Student</span>
                 </div>
               </div>
             </div>

             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col">
               <div className="text-xl mb-4">★★★★★</div>
               <p className="text-text-light mb-6 flex-grow">
                 "I used Jinny for my entire nursing program. She handled my pathophysiology and health assessment classes flawlessly. Because of her help, I graduated with honors. Truly a lifesaver!"
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                   <span className="text-primary font-semibold">M</span>
                 </div>
                 <div>
                   <h4 className="font-bold">Marcus T.</h4>
                   <span className="text-sm text-text-light">RN Graduate</span>
                 </div>
               </div>
             </div>

             <div className="bg-white border border-border rounded-xl p-8 hover:shadow-xl transition-shadow flex flex-col">
               <div className="text-xl mb-4">★★★★★</div>
               <p className="text-text-light mb-6 flex-grow">
                 "Working full-time while taking classes was impossible until I found Jennifer. She completed my entire Sophia Learning requirements in record time. Worth every penny!"
               </p>
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                   <span className="text-primary font-semibold">J</span>
                 </div>
                 <div>
                   <h4 className="font-bold">Jessica L.</h4>
                   <span className="text-sm text-text-light">Business Major</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Contact Section */}
      <section id="contact" className="section-padding bg-bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="section-tag bg-white/10 text-white">Get In Touch</span>
              <h2 className="text-4xl font-serif mt-4 leading-tight">Ready to Excel in Your Studies?</h2>
              <p className="text-lg text-text-muted mt-6 mb-12">Let's discuss how I can help you achieve your academic goals. Fast response time — usually within 1 hour.</p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg text-primary"><Mail /></div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <a href="mailto:toptutor809@gmail.com" className="text-text-muted hover:text-primary">toptutor809@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg text-primary"><Zap /></div>
                  <div>
                    <h4 className="font-bold">Response Time</h4>
                    <span className="text-text-muted">Within 30 Minutes</span>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-lg text-primary"><Globe /></div>
                   <div>
                    <h4 className="font-bold">Connect</h4>
                     <div className="flex flex-wrap gap-3 mt-2">
                        <a href="https://www.facebook.com/profile.php?id=61556287274735" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-md hover:bg-primary transition-all text-sm">
                          <span className="font-semibold">Facebook</span>
                          <span className="text-text-muted text-xs">@jinnyhomeworkgirly</span>
                        </a>
                        <a href="https://www.instagram.com/yourassigment_plug?igsh=MWlvYWh4bDlpZDE2bw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-md hover:bg-primary transition-all text-sm">
                          <span className="font-semibold">Instagram</span>
                          <span className="text-text-muted text-xs">@jinnyhomeworkgirly</span>
                        </a>
                        <a href="https://www.tiktok.com/@yourassignmenthelp_plug?_r=1&_t=ZS-968UuZPJsqC" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-md hover:bg-primary transition-all text-sm">
                          <span className="font-semibold">TikTok</span>
                          <span className="text-text-muted text-xs">@jinnyhomeworkgirly</span>
                        </a>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

<div className="bg-white p-10 rounded-xl shadow-2xl text-text-dark">
               <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                 <h3 className="text-2xl font-serif font-bold">Send a Message</h3>
                 <input type="text" name="user_name" placeholder="Your Name" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                 <input type="email" name="user_email" placeholder="Your Email" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                 <select name="service" defaultValue="" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white">
                   <option value="" disabled>Select Service Type</option>
                   <option value="Essay/Paper Writing">Essay/Paper Writing</option>
                   <option value="STEM & Health Sciences">STEM & Health Sciences</option>
                   <option value="Psychology Samples">Psychology Samples</option>
                   <option value="Business & Management">Business & Management</option>
                   <option value="Full Online Class">Full Online Class</option>
                   <option value="Get a Quote">Get a Quote</option>
                 </select>
                 <textarea name="message" rows={4} placeholder="Tell me about your project..." className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required></textarea>
                 <button type="submit" className="btn btn-primary w-full py-4 text-lg">Send Message</button>
               </form>
             </div>
          </div>
        </div>
      </section>

       <footer className="py-12 bg-[#020617] text-white border-t border-white/5 text-center">
         <div className="container mx-auto px-6">
           <p className="font-serif text-xl text-white mb-2">Jinny Your Homework Girly</p>
           <p className="mb-6">Your Academic Success Partner</p>
           <div className="flex justify-center gap-6 mb-8">
             <a href="https://facebook.com/jinnyhomeworkgirly" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors text-sm">Facebook</a>
             <a href="https://instagram.com/jinnyhomeworkgirly" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors text-sm">Instagram</a>
             <a href="https://tiktok.com/@jinnyhomeworkgirly" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors text-sm">TikTok</a>
             <a href="mailto:toptutor809@gmail.com" className="text-text-muted hover:text-white transition-colors text-sm">Email</a>
           </div>
<div className="flex justify-center gap-8 mb-8 border-b border-white/10 pb-8">
               <a href="#home" className="hover:text-white transition-colors">Home</a>
               <a href="#about" className="hover:text-white transition-colors">About</a>
               <a href="#academics" className="hover:text-white transition-colors">Academics</a>
               <a href="#services" className="hover:text-white transition-colors">Services</a>
               <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
               <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
             </div>
           <p className="text-sm text-text-muted">&copy; 2026 Jinny Your Homework Girly. All rights reserved.</p>
         </div>
       </footer>
    </div>
  );
}

function PortfolioCard({ category, title, samples }: { category: string, title: string, samples: { name: string, link: string }[] }) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="relative">
        <div className="portfolio-placeholder bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
           <span className="text-primary/20 italic font-serif text-lg">{title}</span>
        </div>
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
        <ul className="flex flex-col gap-3 flex-grow">
          {samples.map((sample, idx) => (
            <li key={idx} className="flex items-center gap-2 group">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors shrink-0"></div>
              <a 
                href={sample.link} 
                download 
                className="text-sm font-medium text-primary hover:underline transition-all"
              >
                {sample.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
