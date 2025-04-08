'use client'
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import type { FormFieldType } from "@/types/login.type";
import Lottie from 'react-lottie';
import animationData from '@/statics/AnimationWarehouse.json';
import { HandleLogin } from "@/server/login.server";
import { useRouter } from "next/navigation";
function LoginViews() {
  const router = useRouter()
  const defaultOptions = {
    loop: true, // Animatsiya doimiy takrorlanadi
    autoplay: true, // Animatsiya avtomatik boshlanadi
    animationData: animationData, // Animatsiya faylini ulaymiz
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const onFinish: FormProps<FormFieldType>["onFinish"] = async (values) => {
    const {res_data,error}  = await HandleLogin(values);
    if (!error) {
      router.push('/')
    }
  };

  const onFinishFailed: FormProps<FormFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <div className="w-full h-full flex p-[20px] bg-white">
      <div className="flex-1 h-full login-bg-linear relative overflow-hidden rounded-[30px] flex-center flex-col">
        <div className="absolute z-1 bottom-0 left-0 w-[600px] h-[600px] border-[#D2D2D2] rounded-full border-[2px] rotate-45" style={{marginBottom:'-350px',marginLeft:'-250px'}}></div>
        <div className="absolute z-1 bottom-0 left-0 w-[650px] h-[600px] border-[#D2D2D2] rounded-full border-[2px] rotate-45" style={{marginBottom:'-400px',marginLeft:'-250px'}}></div>
        <div className="absolute z-100">
          <div className="w-[600px] rounded-[30px] bg-white p-[40px]">
          <Lottie options={defaultOptions} height={500} width={500} />
          </div>
          <div>
            <h1 className="text-[40px] font-[800]">Cubix</h1>
            <p className="text-[18px] font-[500]">The most popular Warehouse System is here.</p>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-white flex-center">
        <Form
          layout='vertical'
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="rounded-[30px] !min-w-[490px] !p-[30px] shadow-lg"
        >
          <div className="flex flex-col gap-[3px] mb-[10px]">
            <h1 className="text-[26px] font-bold text-[#333333]">Hello!</h1>
            <p className="text-[#333333] text-[18px] font-[400]">Sign in to Get Started</p>
          </div>
          <Form.Item<FormFieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FormFieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" className="!bg-[#BE202F]" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default LoginViews;
