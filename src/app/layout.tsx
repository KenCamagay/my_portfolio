import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { NavbarDemo } from '@/components/Navbar';
import Galaxy from '@/components/Galaxy';
import Hero from '@/components/Hero';
const inter = Inter({ subsets: ['latin'] });
import PageContainer from "@/components/PageContainer";
export const metadata = {
  title: 'My Portfolio',
  description: 'Showcasing my work',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={cn("bg-black text-white m-0 p-0", inter.className)}>
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
