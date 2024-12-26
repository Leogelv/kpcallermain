import { unbounded } from './fonts';
import './globals.css';

export const metadata = {
  title: 'AI Voice Chat',
  description: 'Have a natural conversation with an AI assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0F0F0F" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
