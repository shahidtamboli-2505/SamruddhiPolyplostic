'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Menu, X, Search, ArrowRight, Play, Star, Quote,
  ShieldCheck, Factory, Truck, Sparkles, Cog, Leaf, FlaskConical, Utensils,
  ShoppingBag, Shirt, Plane, Pill, Car, PackageCheck, Ruler, BadgeCheck,
  Layers, Zap, Award, Clock, Users, Boxes, Mail, Phone, MapPin,
  Facebook, Instagram, Linkedin, ChevronUp, CheckCircle2, Plus, Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/* =========================================================
   DATA
   ========================================================= */
const HERO_SLIDES = [
  {
    img: '/images/factory/factory-exterior.jpg',
    eyebrow: 'Established 27 August 2024',
    title: 'Premium Plastic Packaging',
    highlight: 'Manufactured for the World',
    desc: 'Precision manufactured PP & LLDPE packaging products powered by modern machinery, virgin raw materials and complete customization for industrial and export requirements.',
  },
  {
    img: '/images/machines/pp-extruder-55mm-hd.png',
    eyebrow: 'PP & LLDPE Specialists',
    title: 'Industrial Grade Films',
    highlight: 'Crafted with Precision',
    desc: 'From 3-inch to 22-inch films, treatment rolls, sheets and custom flower sleeves — engineered on modern extrusion lines for uniform quality and export standards.',
  },
  {
    img: '/images/factory/factory-interior-2.jpg',
    eyebrow: 'Trusted by Exporters',
    title: 'Flower Packaging',
    highlight: 'Export Quality Sleeves',
    desc: 'Crystal-clear PP sleeves for Gerbera, Gypsophila, Orchid and Chrysanthemum — protecting freshness from farm to global market.',
  },
];

const FEATURES = [
  { icon: Leaf, title: '100% Virgin Raw Material', desc: 'Only prime PP & LLDPE film-grade granules, never recycled.' },
  { icon: Ruler, title: 'Custom Manufacturing', desc: 'Made-to-order sizes, thickness and printing to match your line.' },
  { icon: Cog, title: 'Modern Machinery', desc: 'Advanced extruders and precision cutters for consistent output.' },
  { icon: Truck, title: 'On-Time Delivery', desc: 'Streamlined production planning ensures reliable dispatch.' },
];

const WHY = [
  { icon: Award, title: 'Premium Quality', desc: 'Consistent thickness, clarity and strength on every batch.' },
  { icon: Factory, title: 'Modern Manufacturing', desc: 'State-of-the-art extrusion and cutting infrastructure.' },
  { icon: Ruler, title: 'Custom Sizes', desc: 'From 3" up to 22" — engineered to your exact specifications.' },
  { icon: Clock, title: 'Reliable Delivery', desc: 'Disciplined production planning and dispatch cycles.' },
  { icon: Users, title: 'Experienced Team', desc: 'Skilled operators, process engineers and quality staff.' },
  { icon: BadgeCheck, title: 'Competitive Pricing', desc: 'Direct-from-manufacturer rates without compromise.' },
  { icon: ShieldCheck, title: 'Quality Inspection', desc: 'Every roll tested for dimension, seal and strength.' },
  { icon: Sparkles, title: 'Customer Satisfaction', desc: 'Long-term partnerships built on trust and consistency.' },
];

const CATEGORIES = [
  { title: 'PP Products', tag: 'Polypropylene', img: '/images/products/pp-packing-bags.png', count: '7 Products' },
  { title: 'LD Products', tag: 'LLDPE', img: '/images/products/ld-packing-bags.png', count: '3 Products' },
  { title: 'Flower Packaging', tag: 'Export Grade', img: '/images/flower/pp-gypso-orchid-sleeves.png', count: '4 Products' },
  { title: 'Industrial Packaging', tag: 'Heavy Duty', img: 'https://images.pexels.com/photos/18541868/pexels-photo-18541868.jpeg?auto=compress&cs=tinysrgb&w=1200', count: 'Bulk & Custom' },
];

const PRODUCTS = [
  { name: 'PP Packing Bags', desc: 'High-strength 100% virgin PP bags — 51 microns — printed with your brand, ideal for industrial and retail packaging.', size: '3" – 22" · 51 Micron', apps: 'Industrial, Food, Chemical, Retail', img: '/images/products/pp-packing-bags.png' },
  { name: 'PP Treatment Rolls', desc: 'Smooth, uniform-thickness PP treatment rolls — 51 micron, 100% food grade, 100% recyclable — engineered for automatic packing lines.', size: '3" – 22" · 51 Micron', apps: 'Auto Packing, Food, Wrapping', img: '/images/products/pp-treatment-roll.png' },
  { name: 'LD Packing Bags', desc: 'Flexible 100% virgin LLDPE bags with strong heat seals, excellent transparency and moisture resistance — bulk-packed in bundles.', size: '4" – 20"', apps: 'Chemical, Food, General', img: '/images/products/ld-packing-bags.png' },
  { name: 'PP Gerbera Cover', desc: 'Crystal-clear PP sleeves precision-cut for Gerbera flowers — bundled and ready for export cold-chain use.', size: '4 × 3', apps: 'Flower Export, Retail Bouquets', img: '/images/flower/pp-gerbera-cover.png' },
  { name: 'PP Gypsophila / Orchid Sleeves', desc: 'Long crystal-clear PP flower sleeves with breather perforations — protect bloom quality during transportation and storage.', size: '20 × 25', apps: 'Gypsophila, Orchid Export', img: '/images/flower/pp-gypso-orchid-sleeves.png' },
  { name: 'PP Chrysanthemum (Shevanti) Sleeves', desc: 'Ventilated PP sleeves engineered specifically for Chrysanthemum / Shevanti with premium clarity and long-lasting protection.', size: '18 × 25', apps: 'Chrysanthemum, Shevanti Export', img: '/images/flower/pp-chrysanthemum-sleeves.png' },
];

const MACHINES = [
  {
    name: 'L.D Tubing Machine',
    img: '/images/machines/ld-tubing-machine.jpg',
    raw: 'LLDPE Virgin Film-Grade Granules',
    products: 'LD Packing Bags, Treatment Rolls, Liners',
    size: '4" to 20"',
    advantages: ['High Efficiency', 'Uniform Production', 'Smooth Finish', 'Reliable Performance'],
  },
  {
    name: 'P.P Packaging Extruder — 45 MM',
    img: '/images/machines/pp-extruder-45mm.jpg',
    raw: 'Polypropylene Virgin Film-Grade Granules',
    products: 'PP Packing Bags, Treatment Rolls, Sheets',
    size: '3" to 22"',
    advantages: ['Precision Extrusion', 'Consistent Thickness', 'High Production Quality'],
  },
  {
    name: 'P.P Packaging Extruder — 55 MM',
    img: '/images/machines/pp-extruder-55mm-hd.png',
    raw: 'Polypropylene Virgin Film-Grade Granules',
    products: 'High-volume PP films & rolls',
    size: '3" to 22"',
    advantages: ['Higher Capacity', 'Improved Efficiency', 'Continuous Manufacturing'],
  },
  {
    name: '28" Double Decker Cutting Machine',
    img: 'https://images.pexels.com/photos/9305407/pexels-photo-9305407.jpeg?auto=compress&cs=tinysrgb&w=1200',
    raw: 'Extruded PP / LDPE Films',
    products: 'Bags, Sleeves, Sheets — precision cut',
    size: 'Up to 28" width',
    advantages: ['Accurate Cutting', 'Smooth Edge Finish', 'High Speed', 'Consistent Output'],
  },
];

const INDUSTRIES = [
  { icon: Leaf, name: 'Agriculture', desc: 'Mulch films, seed bags, greenhouse covers.' },
  { icon: Sparkles, name: 'Flower Packaging', desc: 'Export-grade sleeves for cut-flower supply chains.' },
  { icon: Utensils, name: 'Food Processing', desc: 'Food-safe films and industrial pack bags.' },
  { icon: FlaskConical, name: 'Chemical Industry', desc: 'Leak-resistant liners and heavy-duty bags.' },
  { icon: Factory, name: 'Industrial Manufacturing', desc: 'Component packaging & protective wrapping.' },
  { icon: ShoppingBag, name: 'Retail Packaging', desc: 'Clear, printable bags for shelf appeal.' },
  { icon: Shirt, name: 'Textile Industry', desc: 'Garment covers and roll wrapping films.' },
  { icon: Plane, name: 'Export Packaging', desc: 'Sturdy sleeves & liners for global logistics.' },
  { icon: Pill, name: 'Pharmaceutical', desc: 'Clean-grade films for secondary packaging.' },
  { icon: Car, name: 'Automotive Parts', desc: 'Protective covers for component packaging.' },
];

const PROCESS = [
  { icon: Boxes, title: 'Raw Material Selection', desc: 'Virgin PP & LLDPE granules from trusted sources.' },
  { icon: Zap, title: 'Extrusion', desc: 'Precision extrusion at controlled temperature & pressure.' },
  { icon: Layers, title: 'Film Manufacturing', desc: 'Uniform thickness, clarity & strength.' },
  { icon: Cog, title: 'Cutting & Finishing', desc: 'Double-decker cutter delivers clean edges.' },
  { icon: ShieldCheck, title: 'Quality Inspection', desc: 'Dimension, seal & strength verification.' },
  { icon: PackageCheck, title: 'Packaging', desc: 'Neatly rolled, labelled & palletised.' },
  { icon: Truck, title: 'Dispatch', desc: 'Timely delivery — domestic & export.' },
];

const STATS = [
  { value: 2024, label: 'Established', suffix: '' },
  { value: 2, label: 'Tons / Day Capacity', suffix: 'T' },
  { value: 10, label: 'Skilled Team Members', suffix: '+' },
  { value: 10, label: 'Product Range', suffix: '+' },
  { value: 100, label: 'Customer Satisfaction', suffix: '%' },
];

const GALLERY = [
  '/images/factory/factory-exterior.jpg',
  '/images/factory/factory-interior-1.jpg',
  '/images/factory/factory-interior-2.jpg',
  '/images/machines/ld-tubing-machine.jpg',
  '/images/machines/pp-extruder-45mm.jpg',
  '/images/machines/pp-extruder-55mm-hd.png',
  '/images/products/pp-packing-bags.png',
  '/images/products/pp-treatment-roll.png',
  '/images/products/ld-packing-bags.png',
  '/images/flower/pp-gerbera-cover.png',
  '/images/flower/pp-gypso-orchid-sleeves.png',
  '/images/flower/pp-chrysanthemum-sleeves.png',
];

const TESTIMONIALS = [
  { name: 'Rajesh Kulkarni', company: 'Sunrise Floral Exports', country: 'India → Netherlands', rating: 5, quote: 'Their PP Gerbera covers helped us reduce transit damage dramatically. Consistent clarity every shipment.' },
  { name: 'Anita Deshmukh', company: 'Green Valley Agri', country: 'India', rating: 5, quote: 'On-time deliveries and beautiful custom sizes. Samruddhi Polyplast has become a strategic supplier for us.' },
  { name: 'Mohammed Aslam', company: 'Al-Noor Industries', country: 'UAE', rating: 5, quote: 'Export-grade quality at competitive rates. The team is responsive and quality is remarkably uniform.' },
  { name: 'Priya Sharma', company: 'Bloomcraft Florists', country: 'India', rating: 5, quote: 'Crystal-clear sleeves that make our bouquets look premium. Highly recommend for flower packaging.' },
];

const FAQS = [
  { q: 'What products do you manufacture?', a: 'We manufacture PP Packing Bags, PP Treatment Rolls, PP Sheets, LD Packing Bags, LD Treatment Rolls, LD Liners and specialised flower packaging sleeves for Gerbera, Gypsophila, Orchid and Chrysanthemum.' },
  { q: 'Can products be customized?', a: 'Yes. Every product can be customised in size, thickness, GSM, print and colour to suit your application. Our team supports MOQ discussions for new SKUs.' },
  { q: 'What raw material do you use?', a: 'Only 100% virgin PP and LLDPE film-grade granules from reputed suppliers. We never use recycled material for quality-critical films.' },
  { q: 'Do you supply bulk orders?', a: 'Absolutely. With 2 tons / day capacity and structured production planning, we handle both regular contract volumes and bulk one-time orders.' },
  { q: 'Do you manufacture flower packaging?', a: 'Yes — flower packaging is one of our specialities. Gerbera 4×3, Gypsophila 20×25, Orchid 20×25 and Chrysanthemum 18×25 sleeves are all available.' },
  { q: 'What are your available sizes?', a: 'PP products: 3" to 22". LD products: 4" to 20". Custom sizes fully available on request.' },
  { q: 'Can I request custom printing?', a: 'Yes, single & multi-colour printing is available on select films — please share artwork and quantity for a quotation.' },
  { q: 'How can I contact your sales team?', a: 'Write to sales@samruddhipolyplast.com or fill the inquiry form on this page. Our team responds within one business day.' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Machinery', href: '#machinery' },
  { label: 'Industries', href: '#industries' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

/* ============ HELPERS ============ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }),
};

function SectionHeading({ eyebrow, title, sub, center = true, light = false }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
      className={center ? 'text-center max-w-3xl mx-auto mb-14' : 'max-w-3xl mb-14'}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${light ? 'bg-white/10 text-white/80 border border-white/20' : 'bg-[#005BAC]/10 text-[#005BAC] border border-[#005BAC]/20'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]"></span>{eyebrow}
        </div>
      )}
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] ${light ? 'text-white' : 'text-[#0A1929]'}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-slate-600'}`}>{sub}</p>}
    </motion.div>
  );
}

function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (t) => {
      const p = Math.min((t - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ============ NAVBAR ============ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-20">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center premium-shadow group-hover:scale-105 transition-transform duration-500 ring-1 ring-slate-200/60">
            <img src="/images/logo/samruddhi-logo.png" alt="Samruddhi Polyplast" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`font-display font-extrabold text-lg tracking-tight ${scrolled ? 'text-[#0A1929]' : 'text-white'}`}>
              Samruddhi<span className="text-[#00A86B]"> Polyplast</span>
            </div>
            <div className={`text-[10px] font-medium tracking-[0.25em] uppercase ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>PP · LLDPE · Flower Packaging</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${scrolled ? 'text-slate-700 hover:text-[#005BAC] hover:bg-[#005BAC]/5' : 'text-white/85 hover:text-white hover:bg-white/10'}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button className={`w-10 h-10 rounded-full grid place-items-center transition-all ${scrolled ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-white'}`}>
            <Search className="w-4 h-4" />
          </button>
          <a href="#contact">
            <Button className="rounded-full bg-gradient-brand hover:opacity-90 h-11 px-6 font-semibold text-white shadow-lg shadow-[#005BAC]/25">
              Get a Quote <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className={`lg:hidden w-10 h-10 grid place-items-center rounded-full ${scrolled ? 'bg-slate-100 text-slate-800' : 'bg-white/15 text-white'}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden">
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 px-3 rounded-lg text-slate-700 hover:bg-slate-100 font-medium">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 rounded-full bg-gradient-brand text-white h-11">Get a Quote</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============ HERO ============ */
function Hero() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 30 });
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!embla) return;
    const on = () => setIdx(embla.selectedScrollSnap());
    embla.on('select', on);
    const t = setInterval(() => embla.scrollNext(), 6000);
    return () => { embla.off('select', on); clearInterval(t); };
  }, [embla]);
  return (
    <section id="home" className="relative h-screen min-h-[720px] w-full overflow-hidden bg-[#0A1929]">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className="embla__slide relative flex-[0_0_100%] h-full">
              <motion.img key={idx === i ? 'in' + i : 'out' + i} src={s.img} alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.15 }} animate={{ scale: idx === i ? 1 : 1.15 }} transition={{ duration: 8, ease: 'linear' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929]/85 via-[#003F7A]/70 to-[#0A1929]/85"></div>
              <div className="absolute inset-0 grid-bg opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="floating-blob w-[500px] h-[500px] bg-[#005BAC] top-[-100px] right-[-100px]"></div>
      <div className="floating-blob w-[400px] h-[400px] bg-[#00A86B] bottom-[-100px] left-[-100px]"></div>
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 lg:px-8 flex flex-col justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-white/90 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse"></span>{HERO_SLIDES[idx].eyebrow}
            </div>
            <h1 className="font-display text-white text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[0.95]">
              {HERO_SLIDES[idx].title}<br />
              <span className="bg-gradient-to-r from-[#7FC7FF] via-white to-[#7FFFB8] bg-clip-text text-transparent">{HERO_SLIDES[idx].highlight}</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">{HERO_SLIDES[idx].desc}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#products">
                <Button className="h-14 px-8 rounded-full bg-white text-[#005BAC] hover:bg-white/90 font-semibold text-base shadow-2xl group">
                  Explore Products <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="h-14 px-8 rounded-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold text-base backdrop-blur">Request a Quote</Button>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-10 left-5 lg:left-8 flex items-center gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => embla && embla.scrollTo(i)} className="group">
              <div className={`h-1 rounded-full transition-all ${idx === i ? 'w-14 bg-white' : 'w-6 bg-white/40 group-hover:bg-white/70'}`}></div>
            </button>
          ))}
        </div>
        <div className="hidden lg:flex absolute right-8 bottom-10 gap-6 glass-dark rounded-2xl px-8 py-5 text-white">
          <div><div className="text-3xl font-display font-bold">2T</div><div className="text-xs uppercase tracking-widest text-white/60">Daily Capacity</div></div>
          <div className="w-px bg-white/20"></div>
          <div><div className="text-3xl font-display font-bold">51μ</div><div className="text-xs uppercase tracking-widest text-white/60">Food Grade Film</div></div>
          <div className="w-px bg-white/20"></div>
          <div><div className="text-3xl font-display font-bold">100%</div><div className="text-xs uppercase tracking-widest text-white/60">Virgin Material</div></div>
        </div>
      </div>
    </section>
  );
}

/* ============ MARQUEE ============ */
function Marquee() {
  const items = ['Polypropylene (PP)', 'LLDPE', 'Flower Packaging', 'Industrial Films', 'Custom Manufacturing', 'Export Quality', 'Virgin Granules', 'Precision Extrusion'];
  return (
    <div className="bg-[#0A1929] text-white py-5 overflow-hidden border-y border-white/10">
      <div className="flex marquee-track w-max gap-14 whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-6 text-sm md:text-base font-medium tracking-widest uppercase text-white/70">
            <Sparkles className="w-4 h-4 text-[#00A86B]" /> {it}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FEATURES ============ */
function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={i} variants={fadeUp}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 card-lift overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-brand-soft group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand grid place-items-center mb-6 group-hover:rotate-6 transition-transform">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-[#0A1929]">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="floating-blob w-[500px] h-[500px] bg-[#005BAC] top-0 right-[-200px]"></div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="relative">
            <div className="relative rounded-3xl overflow-hidden premium-shadow">
              <img src="/images/factory/factory-exterior.jpg" alt="Samruddhi Polyplast Factory" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -left-6 lg:-left-10 bg-white rounded-2xl p-6 premium-shadow max-w-[240px] animated-border">
              <div className="text-4xl font-display font-extrabold text-gradient-brand">2024</div>
              <div className="text-slate-600 text-sm font-medium mt-1">Year of Establishment · Made in India</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#0A1929] text-white rounded-2xl p-6 premium-shadow max-w-[240px]">
              <PackageCheck className="w-8 h-8 text-[#00A86B] mb-2" />
              <div className="text-2xl font-display font-bold">2 Tons</div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">Daily Production</div>
            </div>
          </motion.div>
          <div>
            <SectionHeading eyebrow="About the Company" center={false}
              title={<>A modern manufacturer engineered for <span className="text-gradient-brand">global standards</span>.</>}
              sub="Samruddhi Polyplast was established on 27 August 2024 with a singular vision — to build a dependable, quality-first packaging brand for Indian industry and global export markets. We specialise in Polypropylene (PP) and LLDPE films for industrial packaging and the demanding flower export segment." />
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['PP Manufacturing', 'LLDPE Manufacturing', 'Industrial Packaging', 'Flower Packaging'].map((t, i) => (
                <motion.div key={t} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0" />
                  <span className="font-medium text-slate-800 text-sm">{t}</span>
                </motion.div>
              ))}
            </div>
            <a href="#products">
              <Button className="rounded-full bg-gradient-brand text-white font-semibold h-12 px-7">
                Discover Our Products <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ WHY US ============ */
function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Why Choose Us" title={<>Built on <span className="text-gradient-brand">quality, precision & trust</span></>} sub="Eight non-negotiable principles that guide every roll, sheet and sleeve we manufacture." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map((w, i) => (
            <motion.div key={w.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i} variants={fadeUp}
              className="group relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 card-lift overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-brand-soft group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-[#005BAC]/10 grid place-items-center mb-4 group-hover:bg-gradient-brand transition-all">
                  <w.icon className="w-6 h-6 text-[#005BAC] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-display font-bold text-lg mb-1.5 text-[#0A1929]">{w.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCTS ============ */
function Products() {
  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Our Products" title={<>Packaging <span className="text-gradient-brand">crafted for every industry</span></>} sub="From industrial films to export-quality flower sleeves — engineered for consistency, clarity and strength." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CATEGORIES.map((c, i) => (
            <motion.a href="#products-grid" key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="group relative rounded-2xl overflow-hidden h-72 block premium-shadow">
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/95 via-[#0A1929]/40 to-transparent"></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="text-xs uppercase tracking-widest text-[#7FFFB8] font-semibold mb-1">{c.tag}</div>
                <h3 className="font-display font-bold text-2xl mb-1">{c.title}</h3>
                <div className="text-white/70 text-sm">{c.count}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#7FFFB8]">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        <div id="products-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i} variants={fadeUp}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden card-lift">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#005BAC] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Custom Available
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-display font-bold text-xl text-[#0A1929] mb-2">{p.name}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Sizes</div>
                    <div className="text-sm font-semibold text-[#0A1929]">{p.size}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Applications</div>
                    <div className="text-sm font-semibold text-[#0A1929] line-clamp-1">{p.apps}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-full border-slate-300 text-slate-700 hover:bg-slate-50">Read More</Button>
                  <a href="#contact" className="flex-1"><Button className="w-full rounded-full bg-gradient-brand text-white">Inquire</Button></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ MACHINERY ============ */
function Machinery() {
  return (
    <section id="machinery" className="py-24 bg-[#0A1929] text-white relative overflow-hidden noise-overlay">
      <div className="floating-blob w-[500px] h-[500px] bg-[#005BAC] top-0 left-[-200px] opacity-40"></div>
      <div className="floating-blob w-[400px] h-[400px] bg-[#00A86B] bottom-0 right-[-100px] opacity-30"></div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <SectionHeading light eyebrow="Modern Machinery" title={<>Precision engineered <span className="text-gradient-brand">manufacturing lines</span></>} sub="Advanced extrusion and cutting infrastructure delivering uniform quality, high output and reliability at scale." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MACHINES.map((m, i) => (
            <motion.div key={m.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} custom={i} variants={fadeUp}
              className="group glass-dark rounded-2xl overflow-hidden hover:border-[#00A86B]/40 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#00A86B] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Machine 0{i+1}</div>
              </div>
              <div className="p-7">
                <h3 className="font-display font-bold text-2xl mb-4">{m.name}</h3>
                <div className="space-y-2.5 text-sm mb-5">
                  <div className="flex gap-3"><div className="text-white/50 uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">Raw Material</div><div className="text-white/90 font-medium">{m.raw}</div></div>
                  <div className="flex gap-3"><div className="text-white/50 uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">Products</div><div className="text-white/90 font-medium">{m.products}</div></div>
                  <div className="flex gap-3"><div className="text-white/50 uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">Size Range</div><div className="text-white/90 font-medium">{m.size}</div></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {m.advantages.map(a => <span key={a} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">{a}</span>)}
                </div>
                <a href="#contact"><Button variant="outline" className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">Request Machine Details <ArrowRight className="w-4 h-4 ml-1" /></Button></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ INDUSTRIES ============ */
function Industries() {
  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Industries We Serve" title={<>Trusted across <span className="text-gradient-brand">10+ industries</span></>} sub="Reliable packaging partners for agriculture, flower export, food, chemical, retail, textile, pharma and more." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div key={ind.name} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i} variants={fadeUp}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 card-lift text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-[#005BAC]/10 group-hover:bg-white/20 mx-auto grid place-items-center mb-3 transition-colors">
                  <ind.icon className="w-7 h-7 text-[#005BAC] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-display font-bold text-[#0A1929] group-hover:text-white text-base mb-1 transition-colors">{ind.name}</h4>
                <p className="text-xs text-slate-600 group-hover:text-white/80 leading-relaxed transition-colors">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FLOWER SECTION ============ */
function FlowerSection() {
  const bullets = ['Fresh Flower Protection', 'Export Quality Sleeves', 'Moisture Resistant', 'Light Weight', 'Crystal Clear Finish', 'Customized Sizes', 'Premium Appearance'];
  const varieties = [
    { name: 'Gerbera Cover', size: '4 × 3' },
    { name: 'Gypsophila Sleeves', size: '20 × 25' },
    { name: 'Orchid Sleeves', size: '20 × 25' },
    { name: 'Chrysanthemum Sleeves', size: '18 × 25' },
  ];
  return (
    <section className="py-24 bg-gradient-to-br from-[#f0f7ff] to-white relative overflow-hidden">
      <div className="floating-blob w-[400px] h-[400px] bg-[#00A86B] top-0 right-0"></div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 bg-[#00A86B]/10 text-[#00A86B] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Flower Packaging Specialisation
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-[#0A1929] mb-6">
              Export-ready sleeves that keep your <span className="text-gradient-brand">flowers picture-perfect</span>.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Purpose-built PP flower sleeves in crystal-clear finishes — designed for the demands of cold-chain flower export. From Gerbera and Gypsophila to Orchid and Chrysanthemum, we deliver protection, presentation and shelf-life in every sleeve.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {bullets.map(b => (
                <div key={b} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#00A86B]/15 grid place-items-center shrink-0"><CheckCircle2 className="w-4 h-4 text-[#00A86B]" /></div>
                  <span className="text-slate-700 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 premium-shadow">
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Available Varieties</div>
              <div className="grid grid-cols-2 gap-3">
                {varieties.map(v => (
                  <div key={v.name} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <span className="text-sm font-semibold text-[#0A1929]">{v.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-brand text-white font-bold">{v.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/flower/pp-gerbera-cover.png" alt="PP Gerbera Cover" className="rounded-2xl h-72 w-full object-cover premium-shadow mt-8" />
              <img src="/images/flower/pp-gypso-orchid-sleeves.png" alt="PP Gypsophila / Orchid Sleeves" className="rounded-2xl h-72 w-full object-cover premium-shadow" />
              <img src="/images/flower/pp-chrysanthemum-sleeves.png" alt="PP Chrysanthemum Sleeves" className="rounded-2xl h-72 w-full object-cover premium-shadow" />
              <img src="/images/products/pp-treatment-roll.png" alt="PP Treatment Roll" className="rounded-2xl h-72 w-full object-cover premium-shadow mt-[-40px]" />
            </div>
            <div className="absolute -bottom-4 left-6 bg-[#0A1929] text-white rounded-2xl px-6 py-4 premium-shadow">
              <div className="font-display font-bold text-2xl">Export Grade</div>
              <div className="text-white/60 text-xs uppercase tracking-widest">Cold-Chain Ready</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============ PROCESS ============ */
function Process() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Manufacturing Process" title={<>From raw granule to <span className="text-gradient-brand">finished packaging</span></>} sub="A disciplined 7-step production flow engineered for consistency, quality and on-time delivery." />
        <div className="relative">
          <div className="hidden md:block absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#005BAC]/30 to-transparent"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i} variants={fadeUp} className="relative text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-20 blur-lg"></div>
                  <div className="relative w-24 h-24 rounded-full bg-white border-2 border-[#005BAC]/20 grid place-items-center premium-shadow">
                    <p.icon className="w-9 h-9 text-[#005BAC]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-brand text-white text-xs font-bold grid place-items-center border-2 border-white">{i+1}</div>
                </div>
                <h4 className="font-display font-bold text-[#0A1929] text-sm mb-1">{p.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ STATS ============ */
function Stats() {
  return (
    <section className="py-24 bg-gradient-brand text-white relative overflow-hidden noise-overlay">
      <div className="floating-blob w-[500px] h-[500px] bg-[#00A86B] top-[-100px] left-[-200px] opacity-40"></div>
      <div className="floating-blob w-[500px] h-[500px] bg-white bottom-[-200px] right-[-200px] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <SectionHeading light eyebrow="By The Numbers" title={<>Growing every day since <span className="text-[#7FFFB8]">2024</span></>} sub="A young company with world-class ambitions — measured by capacity, consistency and customer trust." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={i} variants={fadeUp}
              className="text-center glass rounded-2xl p-8">
              <div className="font-display text-5xl md:text-6xl font-extrabold mb-2 text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/70 text-sm uppercase tracking-widest font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ GALLERY ============ */
function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Factory Gallery" title={<>Inside <span className="text-gradient-brand">Samruddhi Polyplast</span></>} sub="A closer look at our production floor, machinery, products and infrastructure." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {GALLERY.map((g, i) => (
            <motion.button key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i} variants={fadeUp}
              onClick={() => setActive(g)}
              className={`group relative rounded-2xl overflow-hidden premium-shadow ${i === 0 || i === 4 ? 'row-span-2' : ''} ${i === 2 ? 'md:col-span-2' : ''}`}>
              <img src={g} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/95 grid place-items-center backdrop-blur">
                  <Plus className="w-6 h-6 text-[#005BAC]" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-black/90 grid place-items-center p-4 backdrop-blur">
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={active} className="max-w-full max-h-full rounded-2xl" alt="" />
            <button className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center" onClick={() => setActive(null)}><X className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ VIDEO ============ */
function VideoSection() {
  const [play, setPlay] = useState(false);
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Inside The Factory" title={<>See our manufacturing <span className="text-gradient-brand">in motion</span></>} sub="Take a closer look at our production facility, machinery and premium packaging solutions." />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative rounded-3xl overflow-hidden premium-shadow">
          {!play ? (
            <>
              <img src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1920&q=80" alt="" className="w-full h-[480px] md:h-[600px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/80 via-[#0A1929]/30 to-transparent"></div>
              <div className="absolute inset-0 grid place-items-center">
                <button onClick={() => setPlay(true)} className="relative">
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white grid place-items-center shadow-2xl hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-[#005BAC] ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-xs uppercase tracking-widest text-[#7FFFB8] font-semibold mb-2">Watch · 2 mins</div>
                <h3 className="font-display font-bold text-3xl md:text-4xl">Inside Samruddhi Polyplast</h3>
              </div>
            </>
          ) : (
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Samruddhi Polyplast" className="w-full h-[480px] md:h-[600px]" allow="autoplay; encrypted-media" allowFullScreen />
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Client Testimonials" title={<>Trusted by <span className="text-gradient-brand">exporters & industries</span></>} sub="Long-term partnerships built on consistency, transparency and premium quality." />
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="h-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 card-lift">
                  <Quote className="w-9 h-9 text-[#005BAC]/20 mb-4" />
                  <p className="text-slate-700 leading-relaxed mb-6 min-h-[110px]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, k) => (<Star key={k} className="w-4 h-4 text-amber-400 fill-amber-400" />))}
                  </div>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-brand text-white grid place-items-center font-bold text-lg font-display">{t.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
                    <div>
                      <div className="font-semibold text-[#0A1929]">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.company} · {t.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <SectionHeading eyebrow="Frequently Asked" title={<>Answers to <span className="text-gradient-brand">common questions</span></>} />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div key={f.q} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className={`bg-white rounded-2xl border ${open === i ? 'border-[#005BAC]/30 premium-shadow' : 'border-slate-200'} overflow-hidden transition-all`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                <span className="font-display font-semibold text-[#0A1929] text-base md:text-lg">{f.q}</span>
                <div className={`w-9 h-9 rounded-full shrink-0 grid place-items-center transition-all ${open === i ? 'bg-gradient-brand text-white' : 'bg-slate-100 text-[#005BAC]'}`}>
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', company: '', country: '', phone: '', email: '', product: '', message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) { toast.error('Please enter your name and email.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const j = await res.json();
      if (j.ok) {
        toast.success('Inquiry sent! Our sales team will contact you within one business day.');
        setForm({ fullName: '', company: '', country: '', phone: '', email: '', product: '', message: '' });
      } else { toast.error('Could not send inquiry. Please try again.'); }
    } catch { toast.error('Network error. Please try again.'); }
    finally { setLoading(false); }
  };
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative rounded-3xl overflow-hidden bg-gradient-brand p-10 md:p-16 mb-16 noise-overlay">
          <div className="floating-blob w-[400px] h-[400px] bg-white bottom-[-200px] right-[-100px] opacity-15"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center text-white">
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">Looking for a reliable plastic packaging partner?</h3>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">Let&apos;s build a long-term relationship — premium packaging products, tailored to your industry, delivered on time.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#inquiry-form"><Button className="h-14 px-8 rounded-full bg-white text-[#005BAC] hover:bg-white/90 font-semibold">Request Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></a>
              <a href="mailto:sales@samruddhipolyplast.com"><Button variant="outline" className="h-14 px-8 rounded-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white font-semibold">Contact Sales</Button></a>
            </div>
          </div>
        </motion.div>

        <SectionHeading eyebrow="Get in Touch" title={<>Let&apos;s <span className="text-gradient-brand">talk packaging</span></>} sub="Share your requirement and our sales team will respond within one business day." />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0A1929] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="floating-blob w-[300px] h-[300px] bg-[#005BAC] top-[-100px] right-[-100px] opacity-40"></div>
            <div className="relative">
              <h4 className="font-display font-bold text-2xl mb-8">Samruddhi Polyplast</h4>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: 'Email', value: <a href="mailto:sales@samruddhipolyplast.com" className="font-medium hover:text-[#7FFFB8]">sales@samruddhipolyplast.com</a> },
                  { icon: Phone, label: 'Phone / Customer Care', value: <a href="tel:+919421752747" className="font-medium hover:text-[#7FFFB8]">+91 94217 52747</a> },
                  { icon: MapPin, label: 'Factory Address', value: <span className="font-medium">A/Po Yelur, G.No. 1439,<br/>Tal. Walva, Dist. Sangli,<br/>Maharashtra – 415 409, India</span> },
                  { icon: Clock, label: 'Working Hours', value: <span className="font-medium">Mon – Sat · 9:00 AM – 6:00 PM</span> },
                ].map((it, k) => (
                  <div key={k} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center shrink-0"><it.icon className="w-5 h-5 text-[#7FFFB8]" /></div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-widest">{it.label}</div>
                      {it.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-3">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/satvasheel-patil-91a983153' },
                  { icon: Facebook, href: 'https://www.facebook.com/share/18BaKdBiUd/' },
                  { icon: Instagram, href: 'https://www.instagram.com/2024_smaruddhi_polypalst' },
                  { icon: Mail, href: 'mailto:sales@samruddhipolyplast.com' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-brand grid place-items-center transition-all">
                    <s.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form id="inquiry-form" onSubmit={submit} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 premium-shadow">
            <h4 className="font-display font-bold text-2xl mb-6 text-[#0A1929]">Send an Inquiry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input value={form.fullName} onChange={set('fullName')} placeholder="Full Name *" className="h-12 rounded-xl" />
              <Input value={form.company} onChange={set('company')} placeholder="Company Name" className="h-12 rounded-xl" />
              <Input value={form.country} onChange={set('country')} placeholder="Country" className="h-12 rounded-xl" />
              <Input value={form.phone} onChange={set('phone')} placeholder="Phone" className="h-12 rounded-xl" />
              <Input value={form.email} onChange={set('email')} type="email" placeholder="Email *" className="h-12 rounded-xl md:col-span-2" />
              <Input value={form.product} onChange={set('product')} placeholder="Product Interested In (e.g. PP Gerbera Cover)" className="h-12 rounded-xl md:col-span-2" />
              <Textarea value={form.message} onChange={set('message')} placeholder="Tell us about your requirement — sizes, quantity, timeline..." className="min-h-[130px] rounded-xl md:col-span-2" />
            </div>
            <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A86B]" /> We respect your privacy. Details are used only to respond to your inquiry.
            </div>
            <Button disabled={loading} type="submit" className="mt-6 rounded-full bg-gradient-brand text-white font-semibold w-full md:w-auto h-13 px-8">
              {loading ? 'Sending...' : (<>Send Inquiry <ArrowRight className="w-4 h-4 ml-2" /></>)}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="bg-[#050f1c] text-white pt-20 pb-8 relative overflow-hidden noise-overlay">
      <div className="floating-blob w-[600px] h-[600px] bg-[#005BAC] top-[-300px] right-[-200px] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white p-1 grid place-items-center ring-1 ring-white/20">
                <img src="/images/logo/samruddhi-logo.png" alt="Samruddhi Polyplast" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-display font-extrabold text-lg">Samruddhi <span className="text-[#00A86B]">Polyplast</span></div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">PP · LLDPE Specialists</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">Premium PP & LLDPE plastic packaging solutions manufactured for industries worldwide. Custom sizes. Export quality. On-time delivery.</p>
            <div className="flex gap-2.5">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/satvasheel-patil-91a983153' },
                { icon: Facebook, href: 'https://www.facebook.com/share/18BaKdBiUd/' },
                { icon: Instagram, href: 'https://www.instagram.com/2024_smaruddhi_polypalst' },
                { icon: Mail, href: 'mailto:sales@samruddhipolyplast.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-brand grid place-items-center transition-all">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-display font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h5>
            <ul className="space-y-2.5 text-sm text-white/60">
              {['Home', 'About', 'Products', 'Machinery', 'Industries', 'Gallery', 'Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-[#7FFFB8] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-display font-bold mb-5 text-sm uppercase tracking-widest">Products</h5>
            <ul className="space-y-2.5 text-sm text-white/60">
              {['PP Packing Bags', 'PP Treatment Rolls', 'PP Sheets', 'LD Packing Bags', 'LD Liners', 'Flower Packaging'].map(l => (
                <li key={l}><a href="#products" className="hover:text-[#7FFFB8] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-display font-bold mb-5 text-sm uppercase tracking-widest">Contact</h5>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex gap-2.5"><Mail className="w-4 h-4 shrink-0 mt-0.5 text-[#7FFFB8]" /><a href="mailto:sales@samruddhipolyplast.com" className="hover:text-white">sales@samruddhipolyplast.com</a></li>
              <li className="flex gap-2.5"><Phone className="w-4 h-4 shrink-0 mt-0.5 text-[#7FFFB8]" /><a href="tel:+919421752747" className="hover:text-white">+91 94217 52747</a></li>
              <li className="flex gap-2.5"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#7FFFB8]" />A/Po Yelur, Tal. Walva, Dist. Sangli, Maharashtra – 415 409</li>
              <li className="flex gap-2.5"><Clock className="w-4 h-4 shrink-0 mt-0.5 text-[#7FFFB8]" />Mon – Sat · 9 AM – 6 PM</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div>© 2026 Samruddhi Polyplast. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
          </div>
          <div>Designed with <span className="text-[#00A86B]">♥</span> for Industrial Excellence.</div>
        </div>
      </div>
    </footer>
  );
}

/* ============ SCROLL TOP ============ */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-gradient-brand text-white grid place-items-center premium-shadow hover:scale-110 transition-transform">
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============ MAIN ============ */
function App() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <About />
      <WhyUs />
      <Products />
      <Machinery />
      <Industries />
      <FlowerSection />
      <Process />
      <Stats />
      <Gallery />
      <VideoSection />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollTop />
    </main>
  );
}

export default App;
