import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DSB - in beautiful',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}