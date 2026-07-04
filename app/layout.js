import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Samruddhi Polyplast | Premium PP & LLDPE Plastic Packaging Manufacturer',
  description:
    'Samruddhi Polyplast is a modern Indian manufacturer of premium PP and LLDPE packaging products for industrial, agriculture, food, chemical and flower export industries. Custom sizes, export quality, on-time delivery.',
  keywords: [
    'PP packaging bags', 'LLDPE packaging', 'flower packaging manufacturer',
    'plastic packaging India', 'gerbera sleeves', 'orchid sleeves', 'PP sheets',
    'industrial packaging', 'Samruddhi Polyplast', 'polypropylene manufacturer',
  ],
  icons: {
    icon: '/images/logo/samruddhi-logo.png',
    apple: '/images/logo/samruddhi-logo.png',
  },
  openGraph: {
    title: 'Samruddhi Polyplast | Premium PP & LLDPE Packaging',
    description: 'Premium PP & LLDPE plastic packaging solutions manufactured for industries worldwide.',
    type: 'website',
    images: ['/images/logo/samruddhi-logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
