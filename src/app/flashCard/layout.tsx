// src/app/signup/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flash Card Study',
};

export default function FlashCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}