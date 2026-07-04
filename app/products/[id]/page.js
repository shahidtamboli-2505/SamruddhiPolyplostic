import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#005BAC] font-semibold">Product Details</p>
            <h1 className="mt-3 text-4xl font-display font-bold text-slate-950">{product.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-600 text-base leading-relaxed">{product.desc}</p>
          </div>
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <a href="/" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Back to Home</a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white hover:bg-gradient-brand/90">Inquiry</a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
            <img src={product.img} alt={product.name} className="w-full h-[420px] object-cover" />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950 mb-4">Product Specifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Size</p>
                  <p className="text-base font-semibold text-slate-900">{product.size}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Applications</p>
                  <p className="text-base font-semibold text-slate-900">{product.apps}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950 mb-4">Detailed Description</h2>
              <ul className="space-y-3">
                {product.details.map((detail) => (
                  <li key={detail} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">{detail}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-[#005BAC] to-[#00A86B] p-8 text-white shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Need a custom quote?</h2>
              <p className="max-w-2xl text-sm leading-relaxed mb-6">Contact our sales team for tailored sizes, printing, and order volumes. We support both export and domestic packaging requirements.</p>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#005BAC] hover:bg-slate-100">Request Quote <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
