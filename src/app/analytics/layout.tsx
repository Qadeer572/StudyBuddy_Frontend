// src/app/signup/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}