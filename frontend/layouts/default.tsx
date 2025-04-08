import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppSidebar from '@/components/layouts/AppSidebar';
import AppHeaders from '@/components/layouts/AppHeader';
function DefaultLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className='w-full h-svh flex gap-[16px] p-[10px]'>
        <AppSidebar/>
        <main className='flex-1 overflow-auto relative flex flex-col gap-[20px]'>
            <AppHeaders/>
            <AntdRegistry>{children}</AntdRegistry>
        </main>
    </div>
}
export default DefaultLayout;