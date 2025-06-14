
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Planner',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
    </main>
  );
}