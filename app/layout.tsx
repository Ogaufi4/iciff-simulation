import type { Metadata } from 'next';
import './globals.css';
import './portals.css';
import './owner-details.css';

export const metadata: Metadata = {
  title: 'ICiFF Financial Intelligence Simulation Lab',
  description: 'A fictional financial-intelligence investigation training environment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
