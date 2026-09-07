import type { Metadata } from 'next';
import { sitePath } from '@/lib/site-path';
import './globals.css';
export const metadata: Metadata = {
 title: 'Brandon Luo | Electrical Engineering & Avionics',
 description: 'Electrical engineering at Georgia Tech. PCB design, avionics, and embedded control systems, with experience at BETA Technologies and SpaceX.',
 icons: { icon: sitePath('/favicon.svg') }
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}

