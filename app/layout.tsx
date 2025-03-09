import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LLM Chat Application',
  description: 'Chat with your favorite language models',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}