import localFont from 'next/font/local';
import { Unbounded } from 'next/font/google';

export const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
}); 