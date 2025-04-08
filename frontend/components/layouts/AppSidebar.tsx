"use client";
import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Sider } = Layout;
function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width="268" theme="light" className="rounded-lg">
      <div className="demo-logo-vertical flex-center mt-[10px]" >
            <Image src={'/logo.svg'} width={50} height={50} alt="warehouse_logo"/>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="!mt-[15px]"
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link href="/">Home</Link>,
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: <Link href="/shops">Koroxonalar</Link>,
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: <Link href="/">Home</Link>,
          },
          {
            key: "4",
            icon: <UploadOutlined onClick={() => setCollapsed(!collapsed)} />,
            label: <Link href="/">Home</Link>,
          },
        ]}
      />
    </Sider>
  );
}
export default AppSidebar;
