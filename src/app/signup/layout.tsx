// src/app/signup/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - StudyBuddy',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}