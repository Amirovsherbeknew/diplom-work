import { AntdRegistry } from '@ant-design/nextjs-registry';
function LoginLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className='w-full h-svh'>
      <AntdRegistry>{children}</AntdRegistry>
    </div>
}
export default LoginLayout;