import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Heart, Shield, Globe, Code2, Smartphone, Monitor, 
  Cpu, Database, ArrowRight, CheckCircle2, Leaf, 
  Play, Calendar, Zap, AlertTriangle, 
  Check, Moon, Sun, Wrench, Server, Users, ArrowUpRight,
  Code, Layout, Search, Rocket, ArrowLeft,
  Linkedin, Github, ExternalLink, ChevronDown, Sparkles,
  Star, BarChart3, MousePointer, Mail, Menu, X,
  Phone, FileSearch, PenTool, PackageCheck, Headphones, 
  MessageSquare, Clock, FileCheck, Handshake, TrendingUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import emailjs from '@emailjs/browser';
import omarImg from '../assets/omar_linkedin.jpeg';
import yahyaImg from '../assets/yahya_linkedin.jpeg';
import abdelhamidImg from '../assets/abdelhamid_linkedin.jpeg';

// --- DICTIONNAIRE MULTILINGUE COMPLET ---
const dict = {
  en: {
    nav: { services: "Services", process: "Process", journey: "Journey", team: "Team", contact: "Contact", book: "Book a Call" },
    hero: { badge: "Trusted IT Consulting", title: "IT Expertise for", desc: "Design your web, mobile, and AI platforms with a team that puts ethics, transparency, and humanity at the core of the code.", cta: "Start a Project" },
    compare: { title: "The Approach That Makes a Difference", legacyTitle: "Legacy Agencies", iwTitle: "IslamWare Method", legacy1: "Vendor Lock-in technologies.", legacy2: "Opaque billing & explosive costs.", legacy3: "No alignment with ethical values.", iw1: "100% Transparent & Open-Source.", iw2: "Frugal architecture: max performance.", iw3: "Human-centric, ethical support." },
    services: { title: "Our Expertise", titleJSX: true, desc: "From initial idea to complex system restructuring.", web: "Web & Mobile Apps", webDesc: "Highly scalable SaaS, native apps, and accessible portals.", ai: "Data & Ethical AI", aiDesc: "Predictive models and local LLMs without compromising privacy.", iot: "IoT & Embedded", iotDesc: "Connected field solutions.", desktop: "Desktop & Internal", desktopDesc: "Robust business software.", rescue: "System holding you back? (Rescue)", rescueDesc: "We audit obscure legacy code, fix security flaws, and migrate to modern architectures.", audit: "Free Audit" },
    process: { title: "Design with Conscience", desc: "Our methodology integrates ethics from the very first handshake.", 
      steps: [
        { title: "Discovery & Audit", desc: "Deep analysis of your needs, technical constraints, and ethical objectives." },
        { title: "Clean Architecture", desc: "Designing a robust, scalable, and low-carbon footprint system blueprint." },
        { title: "Iterative Development", desc: "Transparent agile coding, rigorous testing, and continuous delivery." },
        { title: "Deployment & Scaling", desc: "Secure launch, proactive monitoring, and long-term maintenance." }
      ]
    },
    team: { badge: "The Architects", title: "Minds Behind the Mission", desc: "No egocentric rockstars. Just senior, discreet, and passionate engineers united by strict work ethics.", roles: ["Lead Architect", "Head of AI", "SecOps & Privacy"] },
    footer: { build: "Let's build together.", buildDesc: "Discuss your vision and let's make it real.", email: "Leave your email", btn: "Send", success: "Message received! We'll reply within 24h.", links: { prod: "Products", comp: "Company", legal: "Legal", terms: "Terms of Service", privacy: "Privacy Policy" } }
  },
  ar: {
    nav: { services: "خدماتنا", process: "منهجيتنا", journey: "الرحلة", team: "فريقنا", contact: "تواصل", book: "احجز مكالمة" },
    hero: { badge: "استشارات تقنية موثوقة", title: "خبرة تقنية من أجل", desc: "صمم منصات الويب والموبايل والذكاء الاصطناعي مع فريق يضع الأخلاق والشفافية والإنسانية في صميم الكود.", cta: "ابدأ مشروعك" },
    compare: { title: "النهج الذي يصنع الفارق", legacyTitle: "الوكالات التقليدية", iwTitle: "منهجية إسلام وير", legacy1: "تقنيات تحتكر العميل وتمنعه من التغيير.", legacy2: "فواتير غامضة وتكاليف صيانة باهظة.", legacy3: "عدم التوافق مع القيم الأخلاقية.", iw1: "شفافية 100٪ وملكيتك للكود.", iw2: "بنية تحتية اقتصادية: أداء عالٍ وبصمة أقل.", iw3: "دعم صادق يركز على الإنسان وقيمك." },
    services: { title: "مجالات خبرتنا", desc: "من الفكرة الأولية إلى إعادة هيكلة الأنظمة المعقدة.", web: "تطبيقات الويب والموبايل", webDesc: "تطوير منصات البرمجيات كخدمة وتطبيقات أصلية قابلة للتوسع.", ai: "البيانات والذكاء الاصطناعي", aiDesc: "نماذج تنبؤية وذكاء اصطناعي محلي يحمي الخصوصية.", iot: "إنترنت الأشياء", iotDesc: "حلول متصلة للميدان.", desktop: "برمجيات سطح المكتب", desktopDesc: "برمجيات أعمال قوية ومستقرة.", rescue: "هل نظامك الحالي يعيقك؟ (إنقاذ)", rescueDesc: "نقوم بتدقيق الأكواد القديمة، إصلاح الثغرات الأمنية، ونقل النظام إلى بنية حديثة.", audit: "تدقيق مجاني" },
    process: { title: "تصميم بوعي", desc: "منهجيتنا تدمج الأخلاقيات منذ اللحظة الأولى للتعاون.", 
      steps: [
        { title: "الاكتشاف والتدقيق", desc: "تحليل عميق لاحتياجاتك والقيود الفنية والأهداف الأخلاقية." },
        { title: "بنية تحتية نظيفة", desc: "تصميم مخطط نظام قوي وقابل للتطوير ذو بصمة كربونية منخفضة." },
        { title: "تطوير تدريجي", desc: "برمجة رشيقة وشفافة، اختبارات صارمة، وتسليم مستمر." },
        { title: "النشر والتوسع", desc: "إطلاق آمن، مراقبة استباقية، وصيانة طويلة الأمد." }
      ]
    },
    team: { badge: "المهندسون", title: "العقول وراء المهمة", desc: "لا نجوم مغرورين. فقط مهندسون كبار شغوفون يجمعهم أخلاقيات عمل صارمة.", roles: ["مهندس معماري رئيسي", "رئيس الذكاء الاصطناعي", "أمن المعلومات والخصوصية"] },
    footer: { build: "لنبنِ معاً.", buildDesc: "لنناقش رؤيتك وكيفية تحقيقها تقنياً.", email: "اترك بريدك الإلكتروني", btn: "إرسال", success: "تم الاستلام! سنرد خلال ٢٤ ساعة.", links: { prod: "منتجاتنا", comp: "الشركة", legal: "قانوني", terms: "شروط الخدمة", privacy: "سياسة الخصوصية" } }
  }
};
const webTechStack = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Flutter'];
const aiTechStack = ['Python', 'PyTorch', 'LangChain', 'Llama', 'Hugging Face'];

// Animated counter component for stats bar
function StatItem({ value, suffix, prefix, label, icon: Icon, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || value == null) return;
    let start = 0;
    const duration = 2200;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 100 }}
      className="flex flex-col items-center gap-2 py-4 px-2 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
        <Icon className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
      </div>
      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none tabular-nums">
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-center">{label}</div>
    </motion.div>
  );
}

export default function IslamWareLandingPro() {
  const { darkMode: isDark, toggleTheme } = useTheme();
  const [lang, setLang] = useState('en'); 
  const t = dict[lang];

  const [formStep, setFormStep] = useState('initial');
  const [email, setEmail] = useState('');
  const formRef = useRef(null);
  const [compareMode, setCompareMode] = useState('islamware'); 
  const [activeProcess, setActiveProcess] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePipeline, setActivePipeline] = useState(0);

  // Counter animation hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    useEffect(() => {
      if (!isInView) return;
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, [isInView, end, duration]);
    return [count, ref];
  };

  // RTL/LTR Body Direction for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // --- HERO ANIMATION LOGIC ---
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const phrases = lang === 'en' 
    ? ["Tech for Good", "Ethical AI", "Solidarity Software", "Positive Impact"]
    : ["التكنولوجيا للخير", "ذكاء أخلاقي", "برمجيات التضامن", "أثر إيجابي"];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTextIndex(p => (p + 1) % phrases.length), 3000);
    return () => clearInterval(interval);
  }, [lang, phrases.length]);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };
  // Process Icons mapping
  const processIcons = [Search, Layout, Code, Rocket];

  // Process Animations (Advanced Visuals)
  const renderProcessAnimation = (index) => {
    switch (index) {
      case 0: // Discovery (Radar/Nodes)
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-3/4 h-3/4 rounded-full border border-emerald-500/30 border-t-emerald-500 border-r-emerald-500" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/20" />
            <Search className="absolute w-8 h-8 text-emerald-500" />
          </div>
        );
      case 1: // Architecture (Wireframes)
        return (
          <div className="flex flex-col gap-2 p-6 w-full h-full justify-center">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-4 bg-emerald-500/20 rounded" />
            <div className="flex gap-2 h-16">
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="w-1/3 bg-emerald-500/40 rounded" />
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ delay: 0.2 }} className="w-2/3 bg-emerald-500/20 rounded" />
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ delay: 0.4 }} className="h-4 bg-emerald-500/60 rounded mt-2" />
          </div>
        );
      case 2: // Development (Code)
        return (
          <div className="p-6 w-full h-full flex flex-col justify-center items-start overflow-hidden">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="font-mono text-emerald-500 text-sm mb-2">const build = async () ={'>'} {'{'}</motion.div>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-slate-400 text-sm ml-4 mb-2">await core.compile();</motion.div>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="font-mono text-emerald-400 text-sm ml-4 mb-2">return impact.positive();</motion.div>
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="font-mono text-emerald-500 text-sm">{'}'}</motion.div>
          </div>
        );
      case 3: // Deployment (Launch)
        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: [50, -10, 0], opacity: 1 }} transition={{ duration: 1 }} className="z-10">
                <Rocket className="w-16 h-16 text-emerald-500" />
             </motion.div>
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-20 h-20 bg-emerald-500/20 rounded-full blur-xl" />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* 1. NAVBAR (SaaS Style + Lang Toggle + Mobile Menu) */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex ml-4 items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-slate-900 dark:text-white">Islam</span>
              <span className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">Ware</span>
            </span>
          </div>
          
          {/* Centered Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 ml-14 text-sm font-semibold text-slate-600 dark:text-slate-300">
             <a href="#services" className="hover:text-emerald-500 transition-colors">{t.nav.services}</a>
             <a href="#process" className="hover:text-emerald-500 transition-colors">{t.nav.process}</a>
             <a href="#pipeline" className="hover:text-emerald-500 transition-colors">{t.nav.journey}</a>
             <a href="#team" className="hover:text-emerald-500 transition-colors">{t.nav.team}</a>
             <a href="#footer" className="hover:text-emerald-500 transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center mr-3 gap-2 sm:gap-3">
            {/* Lang Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-full p-0.5 sm:p-1 border border-slate-200 dark:border-slate-800">
               <button onClick={() => setLang('en')} className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-500' : 'text-slate-500'}`}>EN</button>
               <button onClick={() => setLang('ar')} className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all ${lang === 'ar' ? 'bg-white dark:bg-slate-800 shadow-sm text-emerald-500' : 'text-slate-500'}`}>AR</button>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <a href="#footer" className="hidden lg:flex bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-500/20">
              {t.nav.book}
            </a>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-3">
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 hover:text-emerald-500 transition-colors">{t.nav.services}</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 hover:text-emerald-500 transition-colors">{t.nav.process}</a>
                <a href="#pipeline" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 hover:text-emerald-500 transition-colors">{t.nav.journey}</a>
                <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 hover:text-emerald-500 transition-colors">{t.nav.team}</a>
                <a href="#footer" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 hover:text-emerald-500 transition-colors">{t.nav.contact}</a>
                <a href="#footer" onClick={() => setMobileMenuOpen(false)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold text-center shadow-lg shadow-emerald-500/20">
                  {t.nav.book}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION (Neon & Interactive) */}
      <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-[100dvh] flex flex-col justify-center pt-16 sm:pt-20 pb-8 sm:pb-16 overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mask-gradient-to-b" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-teal-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal"
             style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.15), transparent 60%)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center pointer-events-none flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/30 backdrop-blur-sm mb-6 sm:mb-8 shadow-xl pointer-events-auto mx-auto">
            <span className="flex h-2 w-2 relative"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-emerald-500"></span></span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{t.hero.badge}</span>
          </motion.div>

          <div className="relative h-[140px] sm:h-[180px] md:h-[200px] mb-4 sm:mb-6 flex flex-col items-center justify-center">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-800 dark:text-white tracking-tighter leading-none mb-2">
                {t.hero.title}
              </motion.h1>
              <div className="h-[60px] sm:h-[80px] md:h-[100px] relative w-full flex justify-center items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                      <motion.span 
                          key={textIndex} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "backOut" }}
                          className="absolute text-3xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500"
                          style={{ filter: isDark ? "drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))" : "none" }}
                      >
                          {phrases[textIndex]}
                      </motion.span>
                  </AnimatePresence>
              </div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            {t.hero.desc}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pointer-events-auto px-4 sm:px-0">
            <a href='#footer' className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:scale-105 text-white rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group">
              {t.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href='#services' className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2">
              {t.nav.services} <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center mt-4 sm:mt-8">
          <motion.a href="#services" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600 hover:text-emerald-500 transition-colors cursor-pointer">
            <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* SOCIAL PROOF / STATS BAR */}
      <section className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            <StatItem value={10} suffix="+" prefix="" label={lang === 'ar' ? 'مشروع منجز' : 'Projects Shipped'} icon={Rocket} index={0} />
            <StatItem value={99} suffix="%" prefix="" label={lang === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'} icon={Star} index={1} />
            <StatItem value={100} suffix="%" prefix="" label={lang === 'ar' ? 'شفافية كاملة' : 'Code Transparency'} icon={Shield} index={2} />
            <StatItem value={24} suffix="/7" prefix="" label={lang === 'ar' ? 'دعم مستمر' : 'Support Available'} icon={Zap} index={3} />
          </div>
        </div>
      </section>

      {/* 3. SaaS COMPARISON: INTERACTIVE TOGGLE */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px] transition-colors duration-700 ${
            compareMode === 'legacy' ? 'bg-red-500/5 dark:bg-red-500/10' : 'bg-emerald-500/5 dark:bg-emerald-500/10'
          }`} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">{lang === 'ar' ? 'لماذا إسلام وير؟' : 'Why IslamWare?'}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white">{lang === 'ar' ? <>النهج الذي يصنع <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">الفارق</span></> : <>The Approach That Makes a <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">Difference</span></>}</motion.h2>
            
            {/* SaaS Toggle Switch */}
            <div className="inline-flex items-center p-1.5 bg-slate-200/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-300 dark:border-slate-700 relative z-20 shadow-lg">
               <button 
                 onClick={() => setCompareMode('legacy')}
                 className={`relative px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${compareMode === 'legacy' ? 'text-red-700 dark:text-red-300' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 {compareMode === 'legacy' && <motion.div layoutId="compareBg" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-red-200 dark:border-red-900/50 -z-10" />}
                 <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> {t.compare.legacyTitle}</span>
               </button>
               <button 
                 onClick={() => setCompareMode('islamware')}
                 className={`relative px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${compareMode === 'islamware' ? 'text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 {compareMode === 'islamware' && <motion.div layoutId="compareBg" className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/30 -z-10" />}
                 <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> {t.compare.iwTitle}</span>
               </button>
            </div>
          </div>

          {/* Dynamic Content Card */}
          <div className={`relative rounded-3xl overflow-hidden bg-white dark:bg-slate-950 shadow-2xl min-h-[440px] transition-all duration-700 ${
            compareMode === 'legacy' 
              ? 'border border-red-200/50 dark:border-red-900/30 shadow-red-500/5' 
              : 'border border-emerald-200/50 dark:border-emerald-900/30 shadow-emerald-500/10'
          }`}>
             <AnimatePresence mode="wait">
               {compareMode === 'legacy' ? (
                    <motion.div key="legacy" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }} className="p-8 sm:p-10 grid md:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 text-red-500 font-bold bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                              <AlertTriangle className="w-4 h-4 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"/> 
                              <span className="drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">{lang === 'ar' ? 'مخاطر عالية' : 'High Risks'}</span>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200">{lang === 'ar' ? 'الصندوق الأسود التقني' : 'The Tech "Black Box"'}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{lang === 'ar' ? 'الوكالات التقليدية تقدم حلولاً مغلقة تبقيك رهيناً لها.' : 'Legacy agencies deliver closed solutions that keep you locked in forever.'}</p>
                            
                            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                              {[t.compare.legacy1, t.compare.legacy2, t.compare.legacy3].map((item, idx) => (
                                <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className="flex gap-3 items-start">
                                  <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                                    <X className="w-3 h-3 text-red-500" />
                                  </div>
                                  <span className="text-sm sm:text-base">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                        </div>
                        
                        {/* Legacy Terminal Mockup */}
                        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                          {/* Terminal header */}
                          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs text-slate-500 font-mono ml-2">system-monitor.log</span>
                          </div>
                          {/* Terminal body */}
                          <div className="p-5 font-mono text-xs space-y-3">
                            <div className="flex gap-2"><span className="text-red-500">ERR</span><span className="text-slate-500">{lang === 'ar' ? 'خطأ 500: تجاوز الميزانية' : 'Error 500: Budget Exceeded'}</span></div>
                            <div className="flex gap-2"><span className="text-red-500">ERR</span><span className="text-slate-500">{lang === 'ar' ? 'انتهاك أمني: بيانات مكشوفة' : 'Security breach: Data exposed'}</span></div>
                            <div className="flex gap-2"><span className="text-yellow-500">WRN</span><span className="text-slate-500">{lang === 'ar' ? 'وقت التوقف: ١٢ ساعة' : 'Downtime: 12h unresolved'}</span></div>
                            <div className="flex gap-2"><span className="text-red-500">ERR</span><span className="text-slate-500">{lang === 'ar' ? 'اعتماد على مورد واحد' : 'Vendor lock-in detected'}</span></div>
                            <div className="h-px bg-slate-800 my-2" />
                            {/* Metric bars */}
                            <div className="space-y-2 pt-1">
                              <div><span className="text-slate-600 w-20 inline-block">{lang === 'ar' ? 'الأداء' : 'Uptime'}</span><span className="text-red-500 ml-2">62%</span><div className="w-full h-1.5 bg-slate-800 rounded-full mt-1"><div className="w-[62%] h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" /></div></div>
                              <div><span className="text-slate-600 w-20 inline-block">{lang === 'ar' ? 'الأمان' : 'Security'}</span><span className="text-yellow-500 ml-2">41%</span><div className="w-full h-1.5 bg-slate-800 rounded-full mt-1"><div className="w-[41%] h-full bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.6)]" /></div></div>
                              <div><span className="text-slate-600 w-20 inline-block">{lang === 'ar' ? 'الشفافية' : 'Transp.'}</span><span className="text-red-500 ml-2">18%</span><div className="w-full h-1.5 bg-slate-800 rounded-full mt-1"><div className="w-[18%] h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" /></div></div>
                            </div>
                          </div>
                        </div>
                    </motion.div>
                    ) : (
                  <motion.div key="islamware" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="p-8 sm:p-10 grid md:grid-cols-2 gap-8 lg:gap-12 items-center h-full relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
                     <div className="space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full text-sm border border-emerald-200 dark:border-emerald-800 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                          <Shield className="w-4 h-4 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"/> 
                          <span>{lang === 'ar' ? 'شفافية 100%' : '100% Transparent'}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{lang === 'ar' ? 'تطوير أخلاقي ومتقن' : 'Ethical & Controlled Development'}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{lang === 'ar' ? 'تقنية شفافة بالكامل مع ملكية كاملة للكود والبيانات.' : 'Fully transparent tech with complete ownership of your code and data.'}</p>
                        <ul className="space-y-4 text-slate-600 dark:text-slate-300 font-medium">
                          {[t.compare.iw1, t.compare.iw2, t.compare.iw3].map((item, idx) => (
                            <motion.li key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className="flex gap-3 items-start">
                              <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-emerald-500" />
                              </div>
                              <span className="text-sm sm:text-base">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                     </div>

                     {/* IslamWare Dashboard Mockup */}
                     <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 shadow-xl dark:shadow-[0_0_40px_rgba(16,185,129,0.1)] relative z-10 overflow-hidden">
                        {/* Dashboard header */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-b border-emerald-100 dark:border-emerald-900/50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            <span className="font-bold text-sm text-slate-800 dark:text-emerald-100">{lang === 'ar' ? 'صحة المشروع' : 'Project Health'}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-500 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">{lang === 'ar' ? 'متصل' : 'Live'}</span>
                        </div>
                        
                        {/* KPI Grid */}
                        <div className="grid grid-cols-3 gap-px bg-slate-100 dark:bg-slate-800 border-b border-emerald-100 dark:border-emerald-900/50">
                          {[
                            { label: lang === 'ar' ? 'وقت التشغيل' : 'Uptime', val: '99.9%', color: 'text-emerald-500' },
                            { label: lang === 'ar' ? 'النشر' : 'Deploys', val: '142', color: 'text-teal-500' },
                            { label: lang === 'ar' ? 'مشاكل' : 'Issues', val: '0', color: 'text-emerald-500' }
                          ].map((kpi, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-3 text-center">
                              <div className={`text-lg font-black ${kpi.color}`}>{kpi.val}</div>
                              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{kpi.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Progress Bars */}
                        <div className="p-5 space-y-4">
                          {[
                            { label: lang === 'ar' ? 'الأداء' : 'Performance', pct: '99%', w: '99%' },
                            { label: lang === 'ar' ? 'الشفافية' : 'Transparency', pct: '100%', w: '100%' },
                            { label: lang === 'ar' ? 'الأمان' : 'Security', pct: '98%', w: '98%' }
                          ].map((metric, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-sm mb-1.5">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">{metric.label}</span>
                                <span className="text-emerald-500 font-bold">{metric.pct}</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: metric.w }} transition={{ duration: 1.2, delay: 0.3 + idx * 0.15, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                              </div>
                            </div>
                          ))}
                          
                          {/* Security badges */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {[
                              lang === 'ar' ? 'كود مفتوح' : 'Open Source',
                              lang === 'ar' ? 'تشفير كامل' : 'E2E Encrypted',
                              lang === 'ar' ? 'GDPR' : 'GDPR Ready'
                            ].map((badge, idx) => (
                              <span key={idx} className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                     </div>
                  </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-24 bg-white dark:bg-slate-950 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-16 md:flex justify-between items-end">
             <div>
               <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 drop-shadow-sm">{lang === 'ar' ? <>مجالات <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">خبرتنا</span></> : <>Our <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">Expertise</span></>}</motion.h2>
               <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl">{t.services.desc}</p>
             </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]">
             
             {/* WEB & MOBILE (Large Card with Infinite Tech Scroll) */}
             <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/30 transition-colors" />
                
                <Globe className="w-10 h-10 text-emerald-500 mb-6 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] transition-all duration-300" />
                
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{t.services.web}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-1">{t.services.webDesc}</p>
                
                {/* Infinite Scrolling Tech Marquee */}
                <div className="relative flex overflow-x-hidden w-full group/marquee">
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10" />
                  
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }} 
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex gap-3 whitespace-nowrap px-4"
                  >
                    {/* Doubling the array for seamless infinite scroll */}
                    {[...webTechStack, ...webTechStack].map((tech, idx) => (
                      <span key={idx} className="text-xs font-mono px-3 py-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm group-hover/marquee:border-emerald-500/30 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
             </motion.div>

             {/* AI & DATA (Animated Neural Nodes) */}
             <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 border border-emerald-800 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] relative overflow-hidden text-white transition-all duration-500 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYwNSIvPjwvc3ZnPg==')] opacity-20" />
                
                {/* Animated Background Nodes */}
                <div className="absolute right-4 top-4 w-32 h-32 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-2 right-6 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,1)]" />
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} className="absolute bottom-6 right-12 w-4 h-4 bg-teal-300 rounded-full shadow-[0_0_20px_rgba(94,234,212,1)]" />
                  <div className="absolute top-3 right-7 w-px h-16 bg-emerald-400/50 rotate-45" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                   <div>
                      <Cpu className="w-8 h-8 text-emerald-400 mb-4 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all" />
                      <h3 className="text-xl font-bold mb-2 drop-shadow-md">{t.services.ai}</h3>
                      <p className="text-emerald-100/70 text-sm mb-4">{t.services.aiDesc}</p>
                   </div>
                   <div className="flex gap-2 flex-wrap">
                      {aiTechStack.map(tech => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-200">
                          {tech}
                        </span>
                      ))}
                   </div>
                </div>
             </motion.div>

             {/* IOT (Floating Tech Tags) */}
             <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col justify-between group transition-all duration-300 relative overflow-hidden">
                <Monitor className="w-8 h-8 text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all" />
                <div className="relative z-10">
                   <h3 className="text-lg font-bold dark:text-white mb-1">{t.services.iot}</h3>
                   <p className="text-sm text-slate-500 mb-3">{t.services.iotDesc}</p>
                   <div className="flex gap-2">
                     {['Rust', 'C++', 'MQTT'].map((t, i) => (
                        <motion.span key={t} animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 + i, ease: "easeInOut" }} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-500 border border-transparent transition-colors">
                          {t}
                        </motion.span>
                     ))}
                   </div>
                </div>
             </motion.div>

             {/* DESKTOP (Floating Tech Tags) */}
             <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col justify-between group transition-all duration-300">
                <Server className="w-8 h-8 text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all" />
                <div>
                   <h3 className="text-lg font-bold dark:text-white mb-1">{t.services.desktop}</h3>
                   <p className="text-sm text-slate-500 mb-3">{t.services.desktopDesc}</p>
                   <div className="flex gap-2">
                     {['Tauri', 'Electron', 'C#'].map((t, i) => (
                        <motion.span key={t} animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5 + i, ease: "easeInOut" }} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-500 border border-transparent transition-colors">
                          {t}
                        </motion.span>
                     ))}
                   </div>
                </div>
             </motion.div>

             {/* SYSTEM RESCUE (Scanner Animation) - Wide Bottom Card */}
             <motion.div whileHover={{ scale: 0.99 }} className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1 bg-white dark:bg-slate-950 rounded-3xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 justify-between hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500 cursor-pointer group overflow-hidden relative">
                
                {/* Scanner Line Effect on Hover */}
                <motion.div 
                  initial={{ left: '-100%' }}
                  whileInView={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100" 
                />

                <div className="flex items-center gap-6 relative z-10">
                   <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-500">
                      <Wrench className="w-8 h-8 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{t.services.rescue}</h3>
                      <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-sm">{t.services.rescueDesc}</p>
                      
                      <div className="mt-3 flex gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded group-hover:hidden transition-all">{lang === 'ar' ? 'مخاطر عالية' : 'High Risk'}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded hidden group-hover:inline-block shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all">{t.services.audit}</span>
                      </div>
                   </div>
                </div>
                
                <button className="relative z-10 flex-shrink-0 px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-full group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center gap-2">
                   {t.services.audit} <ArrowUpRight className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                </button>
             </motion.div>
          </div>
       </div>
    </section>
      
{/* 5. ENHANCED PROCESS SECTION */}
<section id="process" className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 overflow-hidden relative transition-colors">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* --- La Timeline à gauche --- */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                {lang === 'ar' ? <>تصميم <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">بوعي</span></> : <>Design with <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">Conscience</span></>}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                {t.process.desc}
              </p>
              
              <div className="space-y-6 relative">
                {/* Ligne verticale de la timeline. Positionnée exactement au centre de l'icône */}
                <div className="absolute left-[27px] top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-800 -z-0 hidden sm:block" />

                {t.process.steps.map((step, idx) => {
                  const Icon = processIcons[idx];
                  const isActive = activeProcess === idx;
                  
                  return (
                  <div key={idx} onClick={() => setActiveProcess(idx)} className="relative z-10 flex gap-6 group cursor-pointer">
                    
                    {/* Conteneur de l'icône de la timeline */}
                    <div className="relative flex-shrink-0 hidden sm:block mt-1">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500 border ${
                        isActive 
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 group-hover:border-emerald-500/30 group-hover:text-emerald-500/70'
                      }`}>
                        <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}`} />
                      </div>
                      
                      {/* Aura brillante derrière l'icône active */}
                      {isActive && <div className="absolute top-6/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500/40 rounded-full blur-md -z-10" />}
                    </div>

                    {/* Carte de contenu (Titre + Description + Mini UI) */}
                    <div className={`flex-1 p-6 rounded-2xl transition-all duration-500 border relative overflow-hidden ${
                      isActive 
                      ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-400/50 dark:border-emerald-500/30 shadow-lg' 
                      : 'bg-white dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center gap-3 mb-2 relative z-10">
                         {/* Icône mobile uniquement */}
                         <div className={`sm:hidden w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                            <Icon className="w-4 h-4" />
                         </div>
                         
                         <h4 className={`text-xl font-bold transition-all duration-300 ${
                           isActive 
                           ? 'text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.2)]' 
                           : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                         }`}>
                           {step.title}
                         </h4>
                      </div>

                      {/* Contenu extensible */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 pr-4">
                              {step.desc}
                            </p>

                            {/* Mini Illustration SaaS Néon
                            <div className="h-16 w-full max-w-sm rounded-lg bg-white/80 dark:bg-slate-950/80 border border-emerald-500/20 flex items-center p-3 gap-4 relative overflow-hidden shadow-inner">
                               <div className="absolute top-1/2 -left-6 w-12 h-12 bg-emerald-500/30 rounded-full blur-xl -translate-y-1/2 pointer-events-none" />
                               <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30">
                                 {idx === 0 && <Search className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                                 {idx === 1 && <Layout className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                                 {idx === 2 && <Code className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                                 {idx === 3 && <Rocket className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
                               </div>
                               <div className="flex-1 space-y-2 opacity-90">
                                  <div className="flex justify-between items-center mb-1">
                                     <div className="h-1.5 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                     <div className="text-[9px] font-mono text-emerald-500 font-bold tracking-widest animate-pulse">ACTIVE</div>
                                  </div>
                                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                     <motion.div initial={{ width: 0 }} animate={{ width: idx === 3 ? '100%' : '65%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] rounded-full relative" />
                                  </div>
                               </div>
                            </div> */}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* --- Visuels à droite --- */}
            <div className="sticky top-24 h-[400px] lg:h-[500px] bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex items-center justify-center overflow-hidden group">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
               <AnimatePresence mode="wait">
                 <motion.div key={activeProcess} initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-sm aspect-square bg-white dark:bg-slate-900 rounded-full border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_0_60px_rgba(16,185,129,0.25)]">
                    {renderProcessAnimation(activeProcess)}
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 6. TEAM SECTION — The Founding Team */}
      {/* ========================================= */}
      <section id="team" className="py-24 sm:py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              {lang === 'ar' ? 'الفريق المؤسس' : 'The Founding Team'}
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              {lang === 'ar' ? <><span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">العقول</span> وراء المهمة</> : <>Meet the <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">Founders</span></>}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              {lang === 'ar' 
                ? 'ثلاثة مؤسسين يجمعهم شغف التكنولوجيا الأخلاقية والابتكار المسؤول وبناء برمجيات تخدم الإنسانية.'
                : 'Three co-founders united by a shared passion for ethical technology, transparent engineering, and building software that serves humanity.'}
            </p>
          </motion.div>

          {/* Founder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              { 
                name: "Omar Ignammas",
                role: "CTO & Co-Founder",
                roleAr: "الرئيس التنفيذي والمؤسس المشارك",
                bio: "Software Engineer and GenAI Developer.",
                bioAr: "مهندس برمجيات ومطور ذكاء اصطناعي توليدي.",
                expertise: ["Architecture", "AI / ML", "Tech Mentorship"],
                expertiseAr: ["الهندسة المعمارية", "الذكاء الاصطناعي", "التدريب التقني"],
                linkedin: "https://www.linkedin.com/in/omar-ignammas-26b62b239",
                email: "omar.ignammas2003@gmail.com",
                initial: "OI",
                img: omarImg,
                gradient: "from-emerald-500 to-teal-600"
              },
              { 
                name: "Yahya Kaddouri",
                role: "CEO & Co-Founder",
                roleAr: "مدير العمليات والمؤسس المشارك",
                bio: "Data Scientist and AI/ML Researcher.",
                bioAr: "عالم بيانات وباحث في الذكاء الاصطناعي وتعلم الآلة.",
                expertise: ["Strategy", "Business Dev", "Product Vision"],
                expertiseAr:["الاستراتيجية", "تطوير الأعمال", "رؤية المنتج"],
                linkedin: "https://www.linkedin.com/in/yahyakaddouri/",
                email: "kaddouriyahya20@gmail.com",
                initial: "YK",
                img: yahyaImg,
                gradient: "from-teal-500 to-cyan-600"
              },
              { 
                name: "Abdelhamid Hachimi-Allaoui",
                role: "COO & Co-Founder",
                roleAr: "المدير التقني والمؤسس المشارك",
                bio: "Software Engineer and IOT Systems Developer.",
                bioAr: "مهندس برمجيات وتطبيقات محمولة ومطور أنظمة إنترنت الأشياء (IoT).",
                expertise: ["Operations", "Agile Delivery", "Client Success"],
                expertiseAr: ["العمليات", "التسليم الرشيق", "نجاح العملاء"],
                linkedin: "https://www.linkedin.com/in/abdelhamid-hachimi-alaoui-b45288243/",
                email: "abdelhamid.hachimi-alaoui@uit.ac.ma",
                initial: "AH",
                img: abdelhamidImg,
                gradient: "from-emerald-600 to-green-700"
              }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] transition-all duration-500">
                  
                  {/* Gradient header band */}
                  <div className={`h-28 sm:h-32 bg-gradient-to-br ${member.gradient} relative overflow-hidden`}>
                    {/* Animated pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    {/* Shine effect on hover */}
                    <motion.div animate={{ x: ['-150%', '250%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }} className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12" />
                    
                    {/* Role badge on header */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        {lang === 'ar' ? member.roleAr?.split(' ')[0] : member.role.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Avatar */}
                  <div className="flex justify-center -mt-14 sm:-mt-16 relative z-10">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden group-hover:border-emerald-400 dark:group-hover:border-emerald-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-500">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 pt-4 text-center">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                      {lang === 'ar' ? member.roleAr : member.role}
                    </span>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                      {lang === 'ar' ? member.bioAr : member.bio}
                    </p>
                    
                    {/* Expertise tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {(lang === 'ar' ? member.expertiseAr : member.expertise).map((skill, j) => (
                        <motion.span 
                          key={j} 
                          initial={{ opacity: 0, scale: 0.8 }} 
                          whileInView={{ opacity: 1, scale: 1 }} 
                          viewport={{ once: true }} 
                          transition={{ delay: i * 0.1 + j * 0.05 }}
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a href={member.linkedin} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-500 transition-colors group/link px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                        <Linkedin className="w-4 h-4" />
                        <span className="text-xs font-medium">LinkedIn</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                      <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-500 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs font-medium">Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement Under Team */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 sm:mt-20">
            <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-teal-950/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 p-8 sm:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {lang === 'ar' ? 'مهمتنا' : 'Our Mission'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 max-w-3xl mx-auto leading-tight">
                  {lang === 'ar' 
                    ? '"نؤمن أن التكنولوجيا يجب أن تخدم الإنسان أولاً — بشفافية واحترام وأخلاق."'
                    : '"We believe technology should serve people first — with transparency, respect, and unwavering ethics."'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                  {lang === 'ar'
                    ? '— الفريق المؤسس لإسلام وير'
                    : '— The Founding Team at IslamWare'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 7. CLIENT JOURNEY PIPELINE — SaaS Style  */}
      {/* ========================================= */}
      <section id="pipeline" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5 overflow-hidden relative transition-colors">
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
              <TrendingUp className="w-4 h-4" />
              {lang === 'ar' ? 'رحلة العميل' : 'How We Work'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              {lang === 'ar' ? <>من الفكرة إلى <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">الإطلاق</span></> : <>From First Call to <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]">Launch</span></>}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              {lang === 'ar'
                ? 'عملية شفافة ومحددة بوضوح تضمن لك الرؤية الكاملة في كل مرحلة.'
                : 'A transparent, clearly defined pipeline that gives you total visibility at every stage of your project.'}
            </p>
          </motion.div>

          {/* ===== DESKTOP PIPELINE (horizontal) ===== */}
          <div className="hidden lg:block mb-16">
            {/* Progress connector bar */}
            <div className="relative max-w-5xl mx-auto mb-12">
              <div className="absolute top-7 left-[10%] right-[10%] h-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0" />
              <motion.div 
                className="absolute top-7 left-[10%] h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)] z-0"
                initial={{ width: '0%' }}
                whileInView={{ width: `${(activePipeline / 5) * 80}%` }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Step dots */}
              <div className="relative flex justify-between px-[5%]">
                {[
                  { icon: Phone, label: lang === 'ar' ? 'مكالمة اكتشاف' : 'Discovery Call', labelShort: lang === 'ar' ? 'المكالمة' : 'Call' },
                  { icon: FileSearch, label: lang === 'ar' ? 'تدقيق وتحليل' : 'Audit & Analysis', labelShort: lang === 'ar' ? 'التدقيق' : 'Audit' },
                  { icon: PenTool, label: lang === 'ar' ? 'الاقتراح والعقد' : 'Proposal & Contract', labelShort: lang === 'ar' ? 'الاقتراح' : 'Proposal' },
                  { icon: Code, label: lang === 'ar' ? 'تطوير MVP' : 'MVP Development', labelShort: lang === 'ar' ? 'التطوير' : 'MVP' },
                  { icon: PackageCheck, label: lang === 'ar' ? 'الاختبار والتسليم' : 'QA & Delivery', labelShort: lang === 'ar' ? 'التسليم' : 'QA' },
                  { icon: Rocket, label: lang === 'ar' ? 'الإطلاق والدعم' : 'Launch & Support', labelShort: lang === 'ar' ? 'الإطلاق' : 'Launch' }
                ].map((step, idx) => {
                  const StepIcon = step.icon;
                  const isActive = activePipeline === idx;
                  const isPast = idx < activePipeline;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActivePipeline(idx)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-3 group cursor-pointer relative"
                    >
                      {/* Step node */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 relative z-10 ${
                        isActive 
                          ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.6)] scale-110' 
                          : isPast
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 dark:text-emerald-400'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 group-hover:border-emerald-300 group-hover:text-emerald-500'
                      }`}>
                        {isPast && !isActive ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <StepIcon className={`w-6 h-6 transition-all ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} />
                        )}
                      </div>

                      {/* Step label */}
                      <span className={`text-xs font-bold tracking-wide transition-colors whitespace-nowrap ${
                        isActive ? 'text-emerald-600 dark:text-emerald-400' : isPast ? 'text-emerald-500/70' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}>
                        {step.labelShort}
                      </span>

                      {/* Step number badge */}
                      <span className={`absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center transition-all ${
                        isActive 
                          ? 'bg-emerald-600 text-white shadow-lg' 
                          : isPast 
                            ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== MOBILE PIPELINE (vertical stepper) ===== */}
          <div className="lg:hidden mb-10">
            <div className="flex overflow-x-auto gap-2 pb-4 px-1 scrollbar-hide">
              {[
                { icon: Phone, label: lang === 'ar' ? 'المكالمة' : 'Call' },
                { icon: FileSearch, label: lang === 'ar' ? 'التدقيق' : 'Audit' },
                { icon: PenTool, label: lang === 'ar' ? 'الاقتراح' : 'Proposal' },
                { icon: Code, label: lang === 'ar' ? 'MVP' : 'MVP' },
                { icon: PackageCheck, label: lang === 'ar' ? 'التسليم' : 'QA' },
                { icon: Rocket, label: lang === 'ar' ? 'الإطلاق' : 'Launch' }
              ].map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = activePipeline === idx;
                const isPast = idx < activePipeline;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePipeline(idx)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all text-xs font-bold ${
                      isActive 
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' 
                        : isPast
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    <StepIcon className="w-3.5 h-3.5" />
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== DETAIL CARD (animated) ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePipeline}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              {[
                {
                  title: lang === 'ar' ? 'مكالمة اكتشاف مجانية' : 'Free Discovery Call',
                  subtitle: lang === 'ar' ? '30 دقيقة • مجانًا • بدون التزام' : '30 min · Free · No strings attached',
                  desc: lang === 'ar' 
                    ? 'نبدأ بمكالمة قصيرة لفهم رؤيتك وتحدياتك التقنية وأهدافك. نستمع أكثر مما نتحدث — ونقيّم بصدق ما إذا كنا الشريك المناسب لمشروعك.'
                    : "We start with a quick call to understand your vision, technical challenges, and goals. We listen more than we talk — and honestly assess if we're the right partner for your project.",
                  bullets: lang === 'ar'
                    ? ['فهم عميق لاحتياجاتك', 'تقييم أولي للجدوى', 'لا التزامات — شفافية تامة']
                    : ['Deep understanding of your needs', 'Initial feasibility assessment', 'Zero commitment — full transparency'],
                  duration: lang === 'ar' ? '30 دقيقة' : '30 min',
                  icon: Phone,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/50">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'مكالمة فيديو مجدولة' : 'Video Call Scheduled'}</div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Google Meet · 30 min</div>
                        </div>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      </div>
                      <div className="flex gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
                          <div key={d} className={`flex-1 text-center py-2 rounded-lg text-xs font-bold ${i === 2 ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{d}</div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  title: lang === 'ar' ? 'التدقيق والتحليل العميق' : 'Deep Audit & Analysis',
                  subtitle: lang === 'ar' ? '3-5 أيام • تحليل شامل' : '3–5 days · Comprehensive analysis',
                  desc: lang === 'ar'
                    ? 'نحلل بنيتك التقنية الحالية (إن وجدت)، نحدد نقاط الألم، ونضع خريطة واضحة للحل. تحصل على تقرير مفصل بدون مصطلحات غامضة.'
                    : "We analyze your existing tech stack (if any), identify pain points, and map out a clear solution blueprint. You receive a detailed report with zero jargon.",
                  bullets: lang === 'ar'
                    ? ['تحليل تقني للبنية الحالية', 'تحديد المخاطر والفرص', 'تقرير واضح مع التوصيات']
                    : ['Technical stack analysis', 'Risk & opportunity mapping', 'Clear report with recommendations'],
                  duration: lang === 'ar' ? '3-5 أيام' : '3–5 days',
                  icon: FileSearch,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                        <span>{lang === 'ar' ? 'تقدم التدقيق' : 'Audit Progress'}</span>
                        <span className="text-emerald-500">87%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '87%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      </div>
                      {[{ l: lang === 'ar' ? 'الأمان' : 'Security', v: 92, c: 'emerald' }, { l: lang === 'ar' ? 'الأداء' : 'Performance', v: 78, c: 'teal' }, { l: lang === 'ar' ? 'قابلية التوسع' : 'Scalability', v: 85, c: 'cyan' }].map(bar => (
                        <div key={bar.l} className="flex items-center gap-3">
                          <span className="text-[11px] text-slate-500 w-20 text-right">{bar.l}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${bar.v}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-emerald-500 rounded-full" />
                          </div>
                          <span className="text-[11px] font-bold text-emerald-500 w-8">{bar.v}%</span>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  title: lang === 'ar' ? 'الاقتراح التقني والعقد' : 'Proposal & Agreement',
                  subtitle: lang === 'ar' ? 'يوم واحد • شفافية كاملة' : '1 day · Full transparency',
                  desc: lang === 'ar'
                    ? 'نقدم اقتراحًا تقنيًا واضحًا مع التكلفة المفصلة والجدول الزمني. لا مفاجآت. تحصل على عقد واضح يحمي حقوقك وملكيتك للكود.'
                    : "We deliver a crystal-clear technical proposal with itemized costs and timeline. No surprises. You get a fair contract that protects your rights and code ownership.",
                  bullets: lang === 'ar'
                    ? ['تفصيل التكنولوجيا والتكلفة', 'جدول زمني واقعي', 'ملكية الكود لك 100%']
                    : ['Detailed tech & cost breakdown', 'Realistic timeline', '100% code ownership is yours'],
                  duration: lang === 'ar' ? 'يوم واحد' : '1 day',
                  icon: PenTool,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'ملخص الاقتراح' : 'Proposal Summary'}</span>
                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">v2.0</span>
                      </div>
                      {[
                        { l: lang === 'ar' ? 'تطوير الواجهة' : 'Frontend Dev', p: '40%' },
                        { l: lang === 'ar' ? 'البنية الخلفية' : 'Backend & API', p: '35%' },
                        { l: lang === 'ar' ? 'الاختبار والنشر' : 'QA & Deploy', p: '25%' }
                      ].map(item => (
                        <div key={item.l} className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{item.l}</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{item.p}</span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'ملكية الكود' : 'Code Ownership'}</span>
                        <div className="flex items-center gap-1 text-emerald-500"><Check className="w-4 h-4" /><span className="text-xs font-bold">100%</span></div>
                      </div>
                    </div>
                  )
                },
                {
                  title: lang === 'ar' ? 'تطوير MVP' : 'MVP Development',
                  subtitle: lang === 'ar' ? '4-8 أسابيع • تطوير رشيق' : '4–8 weeks · Agile sprints',
                  desc: lang === 'ar'
                    ? 'نبني المنتج الأولي في سبرينتات أسبوعية. تحصل على تحديثات مرئية كل أسبوع وتشارك في كل قرار تقني عبر لوحة مشروع حية.'
                    : "We build your MVP in weekly sprints. You get visual updates every week and participate in every technical decision through a live project board.",
                  bullets: lang === 'ar'
                    ? ['سبرينتات أسبوعية شفافة', 'لوحة مشروع حية', 'عروض تجريبية منتظمة']
                    : ['Transparent weekly sprints', 'Live project dashboard', 'Regular demo sessions'],
                  duration: lang === 'ar' ? '4-8 أسابيع' : '4–8 weeks',
                  icon: Code,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">{lang === 'ar' ? 'سبرينت 3' : 'Sprint 3'}</div>
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-[10px] font-mono text-emerald-500">{lang === 'ar' ? '● مباشر' : '● LIVE'}</motion.div>
                      </div>
                      {[
                        { t: lang === 'ar' ? 'مصادقة المستخدم' : 'User Auth Flow', s: 'done' },
                        { t: lang === 'ar' ? 'لوحة التحكم (API)' : 'Dashboard API', s: 'progress' },
                        { t: lang === 'ar' ? 'نظام الدفع' : 'Payment Gateway', s: 'todo' }
                      ].map(task => (
                        <div key={task.t} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                            task.s === 'done' ? 'bg-emerald-500 text-white' : task.s === 'progress' ? 'border-2 border-emerald-500 bg-emerald-500/10' : 'border-2 border-slate-300 dark:border-slate-600'
                          }`}>
                            {task.s === 'done' && <Check className="w-3 h-3" />}
                            {task.s === 'progress' && <motion.div animate={{ scale: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-emerald-500 rounded-full" />}
                          </div>
                          <span className={`text-xs font-medium ${task.s === 'done' ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{task.t}</span>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  title: lang === 'ar' ? 'الاختبار وضمان الجودة' : 'QA & Quality Assurance',
                  subtitle: lang === 'ar' ? '1-2 أسبوع • اختبار صارم' : '1–2 weeks · Rigorous testing',
                  desc: lang === 'ar'
                    ? 'اختبارات شاملة — من الوحدات إلى الأداء والأمان. لا نطلق شيئًا لم نتأكد من جودته. تحصل على تقرير الاختبار الكامل.'
                    : "Comprehensive testing — from unit tests to performance and security audits. We don't ship anything we haven't verified ourselves. Full test report delivered.",
                  bullets: lang === 'ar'
                    ? ['اختبار شامل للوحدات والتكامل', 'تدقيق أمني كامل', 'اختبارات الأداء تحت الضغط']
                    : ['Unit & integration testing', 'Full security audit', 'Load & stress testing'],
                  duration: lang === 'ar' ? '1-2 أسبوع' : '1–2 weeks',
                  icon: PackageCheck,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { n: '248', l: lang === 'ar' ? 'اختبار ناجح' : 'Tests Passed', c: 'text-emerald-500' },
                          { n: '0', l: lang === 'ar' ? 'حرج' : 'Critical', c: 'text-emerald-500' },
                          { n: 'A+', l: lang === 'ar' ? 'الأمان' : 'Security', c: 'text-emerald-500' }
                        ].map(stat => (
                          <div key={stat.l} className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className={`text-lg font-black ${stat.c}`}>{stat.n}</div>
                            <div className="text-[10px] text-slate-400">{stat.l}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{lang === 'ar' ? 'جميع الاختبارات ناجحة — جاهز للنشر' : 'All tests passing — ready for deploy'}</span>
                      </div>
                    </div>
                  )
                },
                {
                  title: lang === 'ar' ? 'الإطلاق والدعم المستمر' : 'Launch & Ongoing Support',
                  subtitle: lang === 'ar' ? 'مستمر • شراكة طويلة الأمد' : 'Ongoing · Long-term partnership',
                  desc: lang === 'ar'
                    ? 'نشر آمن على بنيتك التحتية مع مراقبة استباقية. نبقى معك كشريك تقني — صيانة، تحديثات، وتوسيع حسب النمو.'
                    : "Secure deployment to your infrastructure with proactive monitoring. We stay by your side as a technical partner — maintenance, updates, and scaling as you grow.",
                  bullets: lang === 'ar'
                    ? ['نشر آمن مع مراقبة 24/7', 'صيانة وتحديثات مستمرة', 'توسيع مع نمو أعمالك']
                    : ['Secure deploy with 24/7 monitoring', 'Ongoing maintenance & updates', 'Scale as your business grows'],
                  duration: lang === 'ar' ? 'مستمر' : 'Ongoing',
                  icon: Rocket,
                  accentColor: 'emerald',
                  mockup: (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                        <div className="flex items-center gap-2">
                          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{lang === 'ar' ? 'النظام يعمل' : 'System Online'}</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-500">99.99%</span>
                      </div>
                      <div className="flex gap-1 h-12 items-end">
                        {[40, 65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 88].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t opacity-80"
                          />
                        ))}
                      </div>
                      <div className="text-[10px] text-center text-slate-400">{lang === 'ar' ? 'مراقبة الأداء — آخر 12 ساعة' : 'Performance monitoring — last 12h'}</div>
                    </div>
                  )
                }
              ][activePipeline] && (() => {
                const step = [
                  { title: lang === 'ar' ? 'مكالمة اكتشاف مجانية' : 'Free Discovery Call', subtitle: lang === 'ar' ? '30 دقيقة • مجانًا • بدون التزام' : '30 min · Free · No strings attached', desc: lang === 'ar' ? 'نبدأ بمكالمة قصيرة لفهم رؤيتك وتحدياتك التقنية وأهدافك. نستمع أكثر مما نتحدث — ونقيّم بصدق ما إذا كنا الشريك المناسب لمشروعك.' : "We start with a quick call to understand your vision, technical challenges, and goals. We listen more than we talk — and honestly assess if we're the right partner.", bullets: lang === 'ar' ? ['فهم عميق لاحتياجاتك', 'تقييم أولي للجدوى', 'لا التزامات — شفافية تامة'] : ['Deep understanding of your needs', 'Initial feasibility assessment', 'Zero commitment — full transparency'], duration: lang === 'ar' ? '30 دقيقة' : '30 min', icon: Phone },
                  { title: lang === 'ar' ? 'التدقيق والتحليل العميق' : 'Deep Audit & Analysis', subtitle: lang === 'ar' ? '3-5 أيام • تحليل شامل' : '3–5 days · Comprehensive analysis', desc: lang === 'ar' ? 'نحلل بنيتك التقنية الحالية، نحدد نقاط الألم، ونضع خريطة واضحة للحل.' : "We analyze your existing tech stack, identify pain points, and map out a clear solution blueprint. You get a detailed report.", bullets: lang === 'ar' ? ['تحليل تقني للبنية الحالية', 'تحديد المخاطر والفرص', 'تقرير واضح مع التوصيات'] : ['Technical stack analysis', 'Risk & opportunity mapping', 'Clear report with recommendations'], duration: lang === 'ar' ? '3-5 أيام' : '3–5 days', icon: FileSearch },
                  { title: lang === 'ar' ? 'الاقتراح التقني والعقد' : 'Proposal & Agreement', subtitle: lang === 'ar' ? 'يوم واحد • شفافية كاملة' : '1 day · Full transparency', desc: lang === 'ar' ? 'نقدم اقتراحًا تقنيًا واضحًا مع التكلفة المفصلة والجدول الزمني. لا مفاجآت.' : "We deliver a crystal-clear technical proposal with itemized costs and timeline. No surprises. Your code ownership is guaranteed.", bullets: lang === 'ar' ? ['تفصيل التكنولوجيا والتكلفة', 'جدول زمني واقعي', 'ملكية الكود لك 100%'] : ['Detailed tech & cost breakdown', 'Realistic timeline', '100% code ownership is yours'], duration: lang === 'ar' ? 'يوم واحد' : '1 day', icon: PenTool },
                  { title: lang === 'ar' ? 'تطوير MVP' : 'MVP Development', subtitle: lang === 'ar' ? '4-8 أسابيع • تطوير رشيق' : '4–8 weeks · Agile sprints', desc: lang === 'ar' ? 'نبني المنتج الأولي في سبرينتات أسبوعية مع تحديثات مرئية ولوحة مشروع حية.' : "We build your MVP in weekly sprints. You get visual updates every week and participate in every decision through a live project board.", bullets: lang === 'ar' ? ['سبرينتات أسبوعية شفافة', 'لوحة مشروع حية', 'عروض تجريبية منتظمة'] : ['Transparent weekly sprints', 'Live project dashboard', 'Regular demo sessions'], duration: lang === 'ar' ? '4-8 أسابيع' : '4–8 weeks', icon: Code },
                  { title: lang === 'ar' ? 'الاختبار وضمان الجودة' : 'QA & Quality Assurance', subtitle: lang === 'ar' ? '1-2 أسبوع • اختبار صارم' : '1–2 weeks · Rigorous testing', desc: lang === 'ar' ? 'اختبارات شاملة من الوحدات إلى الأداء والأمان. تقرير اختبار كامل مسلّم.' : "Comprehensive testing — unit tests to performance and security audits. Full test report delivered.", bullets: lang === 'ar' ? ['اختبار شامل للوحدات والتكامل', 'تدقيق أمني كامل', 'اختبارات الأداء تحت الضغط'] : ['Unit & integration testing', 'Full security audit', 'Load & stress testing'], duration: lang === 'ar' ? '1-2 أسبوع' : '1–2 weeks', icon: PackageCheck },
                  { title: lang === 'ar' ? 'الإطلاق والدعم المستمر' : 'Launch & Ongoing Support', subtitle: lang === 'ar' ? 'مستمر • شراكة طويلة الأمد' : 'Ongoing · Long-term partnership', desc: lang === 'ar' ? 'نشر آمن مع مراقبة استباقية. نبقى معك كشريك تقني.' : "Secure deployment with proactive monitoring. We stay by your side as a long-term technical partner.", bullets: lang === 'ar' ? ['نشر آمن مع مراقبة 24/7', 'صيانة وتحديثات مستمرة', 'توسيع مع نمو أعمالك'] : ['Secure deploy with 24/7 monitoring', 'Ongoing maintenance & updates', 'Scale as your business grows'], duration: lang === 'ar' ? 'مستمر' : 'Ongoing', icon: Rocket }
                ][activePipeline];
                const StepIcon = step.icon;
                
                // Inline mockups for each step
                const mockups = [
                  // 0: Discovery Call mockup
                  <div key="m0" className="space-y-3">
                    <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900/50">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div>
                      <div className="flex-1"><div className="text-sm font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'مكالمة فيديو' : 'Video Call Scheduled'}</div><div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Google Meet · 30 min</div></div>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                    <div className="flex gap-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (<div key={d} className={`flex-1 text-center py-2 rounded-lg text-xs font-bold ${i === 2 ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{d}</div>))}</div>
                  </div>,
                  // 1: Audit mockup
                  <div key="m1" className="space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400"><span>{lang === 'ar' ? 'تقدم التدقيق' : 'Audit Progress'}</span><span className="text-emerald-500">87%</span></div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '87%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" /></div>
                    {[{ l: lang === 'ar' ? 'الأمان' : 'Security', v: 92 }, { l: lang === 'ar' ? 'الأداء' : 'Performance', v: 78 }, { l: lang === 'ar' ? 'التوسع' : 'Scalability', v: 85 }].map(b => (<div key={b.l} className="flex items-center gap-3"><span className="text-[11px] text-slate-500 w-20 text-right">{b.l}</span><div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-emerald-500 rounded-full" /></div><span className="text-[11px] font-bold text-emerald-500 w-8">{b.v}%</span></div>))}
                  </div>,
                  // 2: Proposal mockup
                  <div key="m2" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3"><span className="text-sm font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'ملخص الاقتراح' : 'Proposal Summary'}</span><span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">v2.0</span></div>
                    {[{ l: 'Frontend', p: '40%' }, { l: 'Backend & API', p: '35%' }, { l: 'QA & Deploy', p: '25%' }].map(item => (<div key={item.l} className="flex items-center justify-between"><span className="text-xs text-slate-500">{item.l}</span><span className="text-xs font-bold text-slate-900 dark:text-white">{item.p}</span></div>))}
                    <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between"><span className="text-xs font-bold text-slate-900 dark:text-white">{lang === 'ar' ? 'ملكية الكود' : 'Code Ownership'}</span><div className="flex items-center gap-1 text-emerald-500"><Check className="w-4 h-4" /><span className="text-xs font-bold">100%</span></div></div>
                  </div>,
                  // 3: MVP mockup
                  <div key="m3" className="space-y-2.5">
                    <div className="flex items-center gap-2 mb-3"><div className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">Sprint 3</div><motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-[10px] font-mono text-emerald-500">● LIVE</motion.div></div>
                    {[{ t: 'User Auth', s: 'done' }, { t: 'Dashboard API', s: 'progress' }, { t: 'Payments', s: 'todo' }].map(task => (<div key={task.t} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${task.s === 'done' ? 'bg-emerald-500 text-white' : task.s === 'progress' ? 'border-2 border-emerald-500 bg-emerald-500/10' : 'border-2 border-slate-300 dark:border-slate-600'}`}>{task.s === 'done' && <Check className="w-3 h-3" />}{task.s === 'progress' && <motion.div animate={{ scale: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-emerald-500 rounded-full" />}</div><span className={`text-xs font-medium ${task.s === 'done' ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-300'}`}>{task.t}</span></div>))}
                  </div>,
                  // 4: QA mockup
                  <div key="m4" className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">{[{ n: '248', l: 'Passed' }, { n: '0', l: 'Critical' }, { n: 'A+', l: 'Security' }].map(s => (<div key={s.l} className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"><div className="text-lg font-black text-emerald-500">{s.n}</div><div className="text-[10px] text-slate-400">{s.l}</div></div>))}</div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{lang === 'ar' ? 'جاهز للنشر' : 'All tests passing — ready to deploy'}</span></div>
                  </div>,
                  // 5: Launch mockup
                  <div key="m5" className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                      <div className="flex items-center gap-2"><motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /><span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">System Online</span></div>
                      <span className="text-xs font-mono text-emerald-500">99.99%</span>
                    </div>
                    <div className="flex gap-1 h-12 items-end">{[40, 65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 88].map((h, i) => (<motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t opacity-80" />))}</div>
                    <div className="text-[10px] text-center text-slate-400">{lang === 'ar' ? 'مراقبة الأداء' : 'Performance monitoring — last 12h'}</div>
                  </div>
                ];
                
                return (
                  <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-start">
                    {/* Left: Content */}
                    <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                      {/* Step badge */}
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                          <StepIcon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{step.title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{step.subtitle}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-3 mb-6">
                        {step.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: bi * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA for first step */}
                      {activePipeline === 0 && (
                        <a href="#footer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 group">
                          {lang === 'ar' ? 'احجز مكالمتك المجانية' : 'Book Your Free Call'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}

                      {/* Navigation arrows */}
                      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                        <button 
                          onClick={() => setActivePipeline(Math.max(0, activePipeline - 1))} 
                          disabled={activePipeline === 0}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> {lang === 'ar' ? 'السابق' : 'Previous'}
                        </button>
                        <div className="flex-1 flex justify-center gap-1.5">
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <button key={i} onClick={() => setActivePipeline(i)} className={`w-2 h-2 rounded-full transition-all ${i === activePipeline ? 'bg-emerald-500 w-6' : i < activePipeline ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          ))}
                        </div>
                        <button 
                          onClick={() => setActivePipeline(Math.min(5, activePipeline + 1))} 
                          disabled={activePipeline === 5}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          {lang === 'ar' ? 'التالي' : 'Next'} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Right: Live Mockup */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                      {/* Fake window chrome */}
                      <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <div className="flex-1 mx-3 h-5 bg-slate-50 dark:bg-slate-800 rounded flex items-center justify-center">
                          <span className="text-[9px] font-mono text-slate-400">IslamWare Pipeline</span>
                        </div>
                      </div>
                      {mockups[activePipeline]}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16 sm:mt-20">
            <a href="#footer" className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:scale-105 text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-xl shadow-emerald-500/25 group">
              {lang === 'ar' ? 'ابدأ رحلتك معنا' : 'Start Your Journey Today'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-slate-400 mt-3">{lang === 'ar' ? 'مكالمة أولى مجانية • بدون التزام' : 'Free first call · No obligation · No strings attached'}</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER — Professional SaaS Footer */}
      <footer id="footer" className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
        {/* Giant brand watermark */}
        <div className="relative pt-8 sm:pt-11 pb-8 sm:pb-12 text-center z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[250px] bg-emerald-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
          <h2 className="text-[40px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-black tracking-tighter leading-none select-none relative" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 50%)' }}>
            <span className="text-slate-300 dark:text-slate-500/40">Islam</span>
            <span className="text-emerald-400 dark:text-emerald-600 dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">Ware</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 relative z-20">
          {/* Interactive Contact Form */}
          <div className="max-w-2xl mx-auto mb-12 sm:mb-20">
            <motion.div layout className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl dark:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <AnimatePresence mode="wait">
                {formStep === 'initial' && (
                  <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="text-center sm:text-left">
                       <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">{t.footer.build}</h4>
                       <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">{t.footer.buildDesc}</p>
                    </div>
                    <button onClick={() => setFormStep('input')} className="flex-shrink-0 flex items-center gap-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-900 dark:text-white px-5 sm:px-6 py-3 rounded-full border border-emerald-200 dark:border-emerald-800 transition-all group hover:border-emerald-400 hover:shadow-lg">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"><Calendar className="w-4 h-4 text-white" /></div>
                       <span className="font-medium text-emerald-600 dark:text-emerald-400 text-sm">{t.nav.book}</span>
                    </button>
                  </motion.div>
                )}
                {formStep === 'input' && (
                  <motion.form ref={formRef} key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} onSubmit={(e) => { e.preventDefault(); if(email) { emailjs.sendForm('service_35ip1n8', 'template_9phl1ci', formRef.current, { publicKey: 'AmMaHgQLxq3JZIxdu' }).then(() => { console.log('SUCCESS!'); }, (error) => { console.log('FAILED...', error.text); }); setFormStep('success'); e.target.reset(); } }} className="flex flex-col gap-4">
                    <div className="text-center mb-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{lang === 'ar' ? 'دعنا نتواصل' : "Let's Connect"}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{lang === 'ar' ? 'لديك فكرة أو مشروع؟ تحدث إلينا!' : 'Have an idea or project in mind? Let\'s talk!'}</p>
                    </div>
                    <input 
                      autoFocus 
                      type="text" 
                      name="user_name" 
                      placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Your Name'}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm" 
                      required 
                    />
                    <input 
                      type="email" 
                      name="user_email" 
                      placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your Email'}
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm" 
                      required 
                    />
                    <textarea 
                      name="message" 
                      rows={4}
                      placeholder={lang === 'ar' ? 'رسالتك ...' : 'Your Message ...'}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm resize-none" 
                      required 
                    />
                    <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group">
                      {lang === 'ar' ? 'إرسال' : 'Get in Touch'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                )}
                {formStep === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-14 h-14 bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{lang === 'ar' ? 'تم الاستلام!' : 'Message received!'}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{t.footer.success}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 sm:mb-16 px-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-black text-sm text-slate-900 dark:text-white">IslamWare</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'ar' ? 'التكنولوجيا الأخلاقية لعالم أفضل.' : 'Ethical technology for a better world.'}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">{t.footer.links.prod}</h5>
              <ul className="space-y-2">
                <li><a href="#services" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.nav.services}</a></li>
                <li><a href="#process" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.nav.process}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">{t.footer.links.comp}</h5>
              <ul className="space-y-2">
                <li><a href="#team" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.nav.team}</a></li>
                <li><a href="#footer" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.nav.book}</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">{t.footer.links.legal}</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.footer.links.terms}</a></li>
                <li><a href="#" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors">{t.footer.links.privacy}</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs border-t border-slate-200 dark:border-white/5 pt-6 sm:pt-8">
             <span>© {new Date().getFullYear()} IslamWare. {lang === 'ar' ? 'التكنولوجيا للخير.' : 'Tech for Good.'}</span>
             <div className="flex items-center gap-4">
               <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin className="w-4 h-4" /></a>
               <a href="#" className="hover:text-emerald-500 transition-colors"><Github className="w-4 h-4" /></a>
               <a href="mailto:contact@islamware.com" className="hover:text-emerald-500 transition-colors"><Mail className="w-4 h-4" /></a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


// --- LOGO COMPONENT WITH NEON EFFECT ---
const IslamWareLogo = () => (
  <div className="relative flex items-center shrink-0">
    <svg className="absolute -left-4 w-12 h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M60,10 A40,40 0 1,0 60,90 A28,28 0 1,1 60,10 Z" fill="currentColor"/>
    </svg>
    <span className="text-xl md:text-2xl font-black tracking-widest text-emerald-600 dark:text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] z-10 pl-6 uppercase">
      Islamware
    </span>
  </div>
);
