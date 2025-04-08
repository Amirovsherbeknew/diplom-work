'use client'
import DefaultLayout from "@/layouts/default";
import LoginLayout from "@/layouts/login";
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  return (
    <QueryClientProvider client={queryClient}>
      {isLoginPage ? <LoginLayout>{children}</LoginLayout> : <DefaultLayout>{children}</DefaultLayout>}
    </QueryClientProvider>
  );
}
