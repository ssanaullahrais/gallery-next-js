import '@/app/globals.css';
import { Inter } from 'next/font/google';
import Header from './Header';
import HeroSection from './Hero';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next.js App',
  description: 'Created with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
       
        <Header />
        <HeroSection />

        <main className="min-h-screen">
          <div className="w-full mx-auto px-4 py-4">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}