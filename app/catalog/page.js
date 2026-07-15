'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/* =========================================================
   CATALOG DATA
   ========================================================= */
const DEPARTMENTS = [
  {
    name: 'Production Department',
    head: 'Production Team Lead',
    role: 'Production Head',
    color: '#005BAC',
    desc: 'Operates modern extrusion lines (45mm & 55mm PP extruders, LD tubing machine) and 28" double-decker cutting machine.',
    responsibilities: ['Extrusion line operation', 'Film quality control', 'Production scheduling', 'Machine maintenance'],
    capacity: '2 Tons/Day',

  },
  {
    name: 'Quality Assurance',
    head: 'QA Team Lead',
    role: 'Quality Inspector',
    color: '#00A86B',
    desc: 'Rigorous quality inspection — dimensional accuracy, seal strength, clarity, thickness uniformity and finish quality.',
    responsibilities: ['Raw material inspection', 'In-process quality checks', 'Dimensional verification', 'Final product inspection'],
    capacity: '100% Inspection',

  },
  {
    name: 'Sales & Customer Relations',
    head: 'Sales Team',
    role: 'Business Development',
    color: '#005BAC',
    desc: 'Works closely with customers for custom size specifications, printing needs and order tailoring for domestic & export.',
    responsibilities: ['Customer requirement analysis', 'Custom order specs', 'Quotation management', 'After-sales support'],
    capacity: 'Pan-India + Export',

  },
  {
    name: 'Logistics & Dispatch',
    head: 'Dispatch Team',
    role: 'Logistics Coordinator',
    color: '#00A86B',
    desc: 'On-time delivery of every order — products neatly rolled, labelled and palletised for domestic & export shipment.',
    responsibilities: ['Order packing & labelling', 'Transporter coordination', 'Delivery tracking', 'Export documentation'],
    capacity: 'Domestic & Export',

  },
];

/* =========================================================
   PDF DOWNLOAD HANDLER
   ========================================================= */
async function downloadPDF() {
  const { default: jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');
  
  const pages = document.querySelectorAll('.catalog-page');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const canvas = await html2canvas(page, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: 1123,
      windowWidth: 794,
      windowHeight: 1123,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save('Samruddhi-Polyplast-Catalog-2026.pdf');
}

/* =========================================================
   REUSABLE: PAGE HEADER
   ========================================================= */
function PageHeader({ label }) {
  return (
    <div style={{ background: 'linear-gradient(90deg, #005BAC, #003F7A)', padding: '18px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ backgroundImage: 'url(/images/logo/samruddhi-logo.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '32px', height: '32px', borderRadius: '6px', background: 'white', padding: '2px' }} />
        <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>Samruddhi Polyplast</span>
      </div>
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function PageFooter({ num, total = 4 }) {
  return (
    <div style={{ padding: '12px 50px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
      <span style={{ fontSize: '10px', color: '#94a3b8' }}>© 2026 Samruddhi Polyplast · samruddhipolyplast.com</span>
      <span style={{ fontSize: '10px', color: '#94a3b8' }}>Page {num} of {total}</span>
    </div>
  );
}

/* =========================================================
   CATALOG PAGE COMPONENT
   ========================================================= */
export default function CatalogPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPDF();
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-200">
        <div className="max-w-[850px] mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-[#005BAC] transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Website
          </Link>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="rounded-full bg-gradient-to-r from-[#005BAC] to-[#003F7A] hover:opacity-90 text-white font-semibold h-12 px-8 shadow-lg shadow-[#005BAC]/25"
            >
              {downloading ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Catalog PDF
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Catalog Preview */}
      <div className="max-w-[850px] mx-auto px-4 py-8 space-y-8">

        {/* ███████████████████████████████████████████████████████████
            PAGE 1: COVER — Factory Images + Company Overview
           ███████████████████████████████████████████████████████████ */}
        <div className="catalog-page bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '794px', height: '1123px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {/* Cover Hero — Full-width factory image */}
          <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/factory/factory-exterior.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,25,41,0.88) 0%, rgba(0,63,122,0.75) 50%, rgba(0,91,172,0.65) 100%)', zIndex: 1 }}></div>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(0,168,107,0.15)', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(0,91,172,0.2)', zIndex: 2 }}></div>

            <div style={{ position: 'absolute', inset: 0, padding: '44px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'white', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                  <div style={{ backgroundImage: 'url(/images/logo/samruddhi-logo.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '100%' }} />
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>Samruddhi <span style={{ color: '#00A86B' }}>Polyplast</span></div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600' }}>PP · LLDPE · Flower Packaging</div>
                </div>
              </div>
              <div style={{ color: 'rgba(127,255,184,0.9)', fontSize: '12px', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px' }}>Product Catalog 2026</div>
              <h1 style={{ color: 'white', fontSize: '44px', fontWeight: '800', lineHeight: '1.05', marginBottom: '10px', maxWidth: '500px' }}>
                Premium Plastic Packaging <span style={{ color: '#7FFFB8' }}>Solutions</span>
              </h1>
              <div style={{ color: 'white', fontSize: '15px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                &quot;Reliable Packaging For Every Industry&quot;
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.6', maxWidth: '460px' }}>
                Precision manufactured PP & LLDPE packaging products powered by modern machinery, virgin raw materials and complete customization.
              </p>
            </div>
          </div>

          {/* Factory Interior Image Collage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px', height: '180px' }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ backgroundImage: 'url(/images/factory/factory-interior-1-hd.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,25,41,0.7) 0%, transparent 50%)' }}></div>
              <div style={{ position: 'absolute', bottom: '12px', left: '16px', color: 'white' }}>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Production Floor</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Modern Extrusion Lines</div>
              </div>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ backgroundImage: 'url(/images/factory/factory-interior-2-hd.png)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,25,41,0.7) 0%, transparent 50%)' }}></div>
              <div style={{ position: 'absolute', bottom: '12px', left: '16px', color: 'white' }}>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Manufacturing Area</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Skilled Craftsmanship</div>
              </div>
            </div>
          </div>

          {/* Cover Bottom Content */}
          <div style={{ padding: '28px 50px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '2024', label: 'Established', color: '#005BAC' },
                { value: '2T', label: 'Daily Capacity', color: '#00A86B' },
                { value: '10+', label: 'Products', color: '#005BAC' },
                { value: '100%', label: 'Virgin Material', color: '#00A86B' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '16px 8px', borderRadius: '12px', background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                  <div style={{ fontSize: '26px', fontWeight: '800', color: s.color, marginBottom: '2px' }}>{s.value}</div>
                  <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* USPs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '24px' }}>
              {['100% Virgin Raw Materials', 'Custom Manufacturing', 'Modern Extrusion Lines', 'Export Quality Standards', 'On-Time Delivery', 'Competitive Pricing'].map((usp, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00A86B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#0A1929' }}>{usp}</span>
                </div>
              ))}
            </div>

            {/* Contact Strip */}
            <div style={{ background: 'linear-gradient(90deg, #0A1929, #003F7A)', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FFFB8" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>+91 95296 23383</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FFFB8" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>sales@samruddhipolyplast.com</span>
                </div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>Made in India 🇮🇳</div>
            </div>
          </div>
          <PageFooter num={1} />
        </div>

        {/* ███████████████████████████████████████████████████████████
            PAGE 2: PRODUCTS — Product Grid with Images
           ███████████████████████████████████████████████████████████ */}
        <div className="catalog-page bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '794px', height: '1123px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <PageHeader label="Product Range" />

          <div style={{ padding: '28px 50px', flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#005BAC', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '6px' }}>Our Products</div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0A1929', lineHeight: '1.1', marginBottom: '6px' }}>Complete Product Range</h2>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>From industrial films to export-quality flower sleeves — engineered for Consistency quality, strength and customised packaging.</p>
            </div>

            {/* PP Products Row */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '10px', color: '#005BAC', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#005BAC' }}></div>
                Polypropylene (PP) Products
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { name: 'PP Packing Bags', size: '3" – 22" · 51μ', apps: 'Industrial, Food, Chemical', img: '/images/products/pp-packing-bags.png' },
                  { name: 'PP Treatment Rolls', size: '3" – 22" · 51μ', apps: 'In plastic printing industries', img: '/images/products/pp-treatment-roll.jpg' },
                  { name: 'PP Sheets', size: 'Custom sizes', apps: 'Packaging, Lamination', img: '/images/products/pp-packing-bags.png' },
                ].map((p, i) => (
                  <div key={i} style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ height: '110px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                      <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#005BAC', color: 'white', fontSize: '8px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>PP</div>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '3px' }}>{p.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Size: {p.size}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Apps: {p.apps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LD Products Row */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '10px', color: '#00A86B', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#00A86B' }}></div>
                LLDPE (LD) Products
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { name: 'LD Packing Bags', size: '4" – 20"', apps: 'Chemical, Food, General', img: '/images/products/ld-packing-bags.png' },
                  { name: 'LD Treatment Rolls', size: '4" – 20"', apps: 'Wrapping, Auto Packing', img: '/images/products/ld-packing-bags.png' },
                  { name: 'LD Liners', size: 'Custom sizes', apps: 'Industrial Lining', img: '/images/products/ld-packing-bags.png' },
                ].map((p, i) => (
                  <div key={i} style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ height: '110px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                      <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#00A86B', color: 'white', fontSize: '8px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>LLDPE</div>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '3px' }}>{p.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Size: {p.size}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Apps: {p.apps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flower Products Row */}
            <div>
              <div style={{ fontSize: '10px', color: '#E91E63', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '2px', background: '#E91E63' }}></div>
                Flower Packaging — Export Grade
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {[
                  { name: 'PP Gerbera Cover', size: '4 × 3', apps: 'For protection for flower', img: '/images/flower/pp-gerbera-cover.png' },
                  { name: 'PP Gypsophila / Orchid Sleeves', size: '20 × 25', apps: 'Gypsophila, Orchid Export', img: '/images/flower/pp-gypso-orchid-sleeves.png' },
                  { name: 'PP Chrysanthemum Sleeves', size: '18 × 25', apps: 'Chrysanthemum Export', img: '/images/flower/pp-chrysanthemum-sleeves.png' },
                ].map((p, i) => (
                  <div key={i} style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ height: '110px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                      <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#E91E63', color: 'white', fontSize: '8px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px' }}>FLOWER</div>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '3px' }}>{p.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>Size: {p.size}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Apps: {p.apps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All products are 100% virgin */}
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: 'linear-gradient(90deg, #f0f7ff, #f0fdf4)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A86B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#0A1929' }}>All products manufactured using 100% virgin raw materials — </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>PP Film-Grade & LLDPE Film-Grade granules. Custom sizes, thickness & printing available.</span>
              </div>
            </div>
          </div>

          <PageFooter num={2} />
        </div>

        {/* ███████████████████████████████████████████████████████████
            PAGE 3: MACHINERY + DEPARTMENTS — Machine Images + Dept Info
           ███████████████████████████████████████████████████████████ */}
        <div className="catalog-page bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '794px', height: '1123px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <PageHeader label="Machinery & Departments" />

          <div style={{ padding: '24px 50px', flex: 1 }}>
            {/* Machinery Section */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ color: '#005BAC', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '6px' }}>Manufacturing Infrastructure</div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1929', lineHeight: '1.1', marginBottom: '12px' }}>Our Machinery</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { name: 'L.D Tubing Machine', output: 'LD Bags, Rolls, Liners', range: '4" – 20"', img: '/images/machines/ld-tubing-machine-hd.png' },
                  { name: 'PP Extruder — 45 MM', output: 'PP Bags, Rolls, Sheets', range: '3" – 22"', img: '/images/machines/pp-extruder-45mm-hd.png' },
                  { name: 'PP Extruder — 55 MM', output: 'High-volume PP films', range: '3" – 22"', img: '/images/machines/pp-extruder-55mm-hd.png' },
                  { name: '28" Double Decker Cutter', output: 'Bags, Sleeves, Sheets', range: 'Up to 28" width', img: '/images/machines/cutting-machine-28-double-decker.png' },
                ].map((m, i) => (
                  <div key={i} style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', background: '#fafbfc' }}>
                    <div style={{ height: '105px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ backgroundImage: `url(${m.img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,25,41,0.6) 0%, transparent 40%)' }}></div>
                      <div style={{ position: 'absolute', top: '6px', left: '6px', background: 'linear-gradient(135deg, #005BAC, #003F7A)', color: 'white', fontSize: '9px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>MACHINE {String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '4px' }}>{m.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.5' }}>
                        <strong style={{ color: '#475569' }}>Output:</strong> {m.output}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>
                        <strong style={{ color: '#475569' }}>Range:</strong> {m.range}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Flow */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ color: '#00A86B', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '6px' }}>7-Step Manufacturing Process</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px', background: 'linear-gradient(90deg, #f0f7ff, #f0fdf4)', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                {['Raw Material', 'Extrusion', 'Film Mfg.', 'Cutting', 'QA Check', 'Packing', 'Dispatch'].map((step, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #005BAC, #00A86B)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '10px', margin: '0 auto 4px' }}>{i + 1}</div>
                    <div style={{ fontSize: '8px', fontWeight: '600', color: '#0A1929' }}>{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments Section */}
            <div>
              <div style={{ color: '#005BAC', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Organisation Structure</div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0A1929', lineHeight: '1.1', marginBottom: '8px' }}>Our Departments</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                {DEPARTMENTS.map((dept, i) => (
                  <div key={i} style={{ padding: '10px 12px 10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: dept.color }}></div>
                    <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '2px' }}>{dept.name}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '6px' }}>{dept.head} — {dept.role}</div>
                    <p style={{ fontSize: '9px', color: '#64748b', lineHeight: '1.5', marginBottom: '8px' }}>{dept.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '8px' }}>
                      {dept.responsibilities.map((r, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#00A86B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          <span style={{ fontSize: '9px', color: '#475569' }}>{r}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ flex: 1, padding: '5px 6px', borderRadius: '6px', background: `${dept.color}08`, textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: dept.color }}>{dept.capacity}</div>
                        <div style={{ fontSize: '7px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Capacity</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Org Summary */}
              <div style={{ padding: '14px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #0A1929, #003F7A)', color: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {[
                  { val: '10+', label: 'Team Members' },
                  { val: '4', label: 'Departments' },
                  { val: '3', label: 'Shifts/Day' },
                  { val: '24/7', label: 'Monitoring' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#7FFFB8' }}>{s.val}</div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter num={3} />
        </div>

        {/* ███████████████████████████████████████████████████████████
            PAGE 4: INDUSTRIES + CONTACT
           ███████████████████████████████████████████████████████████ */}
        <div className="catalog-page bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: '794px', height: '1123px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          <PageHeader label="Industries & Contact" />

          <div style={{ padding: '24px 50px', flex: 1 }}>
            {/* Industries */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#005BAC', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Industries We Serve</div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0A1929', lineHeight: '1.1', marginBottom: '10px' }}>Trusted Across 10+ Industries</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { name: 'Agriculture', icon: '🌿' },
                  { name: 'Flower Export', icon: '🌸' },
                  { name: 'Food Processing', icon: '🍽️' },
                  { name: 'Chemical', icon: '🧪' },
                  { name: 'Industrial', icon: '🏭' },
                  { name: 'Retail', icon: '🛍️' },
                  { name: 'Textile', icon: '👔' },
                  { name: 'Export', icon: '✈️' },
                  { name: 'Pharma', icon: '💊' },
                  { name: 'Automotive', icon: '🚗' },
                  { name: 'Electronics & Telecom', icon: '⚡' },
                ].map((ind, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '12px 6px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '20px', marginBottom: '3px' }}>{ind.icon}</div>
                    <div style={{ fontSize: '9px', fontWeight: '700', color: '#0A1929' }}>{ind.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#00A86B', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Why Choose Us</div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0A1929', marginBottom: '10px' }}>Our Commitments</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { title: 'Premium Quality', desc: 'Consistent thickness, clarity and strength on every batch.' },
                  { title: 'Modern Machinery', desc: 'State-of-the-art extrusion and cutting infrastructure.' },
                  { title: 'Custom Sizes', desc: 'From 3" to 22" — engineered to your exact specifications.' },
                  { title: 'Reliable Delivery', desc: 'Disciplined production planning and dispatch cycles.' },
                  { title: 'Experienced Team', desc: 'Skilled operators, engineers and quality staff.' },
                  { title: 'Competitive Pricing', desc: 'Direct-from-manufacturer rates without compromise.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', padding: '10px', borderRadius: '8px', background: '#f0f7ff', border: '1px solid #e0efff' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #005BAC, #00A86B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0A1929', marginBottom: '2px' }}>{item.title}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.4' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Gallery Strip */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#005BAC', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '6px' }}>Product Showcase</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', gap: '6px', height: '65px' }}>
                {[
                  '/images/products/pp-packing-bags.png',
                  '/images/products/pp-treatment-roll.jpg',
                  '/images/products/ld-packing-bags.png',
                  '/images/flower/pp-gerbera-cover.png',
                  '/images/flower/pp-gypso-orchid-sleeves.png',
                  '/images/flower/pp-chrysanthemum-sleeves.png',
                ].map((img, i) => (
                  <div key={i} style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <div style={{ background: 'linear-gradient(135deg, #0A1929, #003F7A)', padding: '16px 24px', color: 'white' }}>
                <div style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', color: '#7FFFB8', marginBottom: '4px' }}>Get In Touch</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>Let&apos;s Talk Packaging</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</div>
                    <div style={{ fontSize: '15px', fontWeight: '700' }}>+91 95296 23383</div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '700' }}>sales@samruddhipolyplast.com</div>
                  </div>
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Factory Address</div>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>A/p: Yelur, Pune–Bangalore Highway, Near Hotel Sai International, Taluka: Walwa, District: Sangli, Maharashtra – 415 411, India</div>
                  </div>
                </div>

                {/* Social Links Formatted for PDF */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginRight: '6px' }}>Follow Us On:</div>
                  {[
                    { icon: Instagram, label: '@2024_samruddhi_polyplast', href: 'https://www.instagram.com/2024_smaruddhi_polypalst' },
                    { icon: Facebook, label: 'Samruddhi Polyplast', href: 'https://www.facebook.com/share/18BaKdBiUd/' },
                    { icon: Linkedin, label: 'Samruddhi Polyplast', href: 'https://www.linkedin.com/in/satvasheel-patil-91a983153' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', padding: '5px 8px', borderRadius: '6px' }}>
                      <s.icon style={{ width: '12px', height: '12px', color: 'white' }} />
                      <span style={{ color: 'white', fontSize: '9px', fontWeight: '600' }}>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div style={{ background: '#00A86B', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>Ready to get started? Contact us today!</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ padding: '4px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '10px', fontWeight: '600' }}>Wed – Mon</div>
                  <div style={{ padding: '4px 12px', borderRadius: '4px', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '10px', fontWeight: '600' }}>8 AM – 8 PM</div>
                </div>
              </div>
            </div>
          </div>

          <PageFooter num={4} />
        </div>

      </div>
    </div>
  );
}
