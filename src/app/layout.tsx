import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Neothera Skin Intelligence',
  description: 'Transform your skin health with AI-powered insights',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
