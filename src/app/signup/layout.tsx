
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'signup - StudyBuddy',
};

export default function signupLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}