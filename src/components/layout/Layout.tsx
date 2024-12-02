import { ReactNode } from 'react';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}