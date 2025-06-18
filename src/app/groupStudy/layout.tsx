// src/app/signup/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Study',
};

export default function GroupStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}