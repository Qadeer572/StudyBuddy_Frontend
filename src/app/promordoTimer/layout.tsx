
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promordo Timer - StudyBuddy',
};

export default function PromordoTimer({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}