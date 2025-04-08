'use client'
import type { FormProps } from "antd";
import { Modal, Button, Form, Input } from 'antd';
import type { create_shop_form_type, props } from '@/types/shop.type';
import { CreateShop } from "@/server/shop.server";
import { MaskedInput } from 'antd-mask-input';
export default function CreateShopsModal({ modelValue, onChange }: props) {
  const onFinish: FormProps<create_shop_form_type>["onFinish"] = async (values) => {
    const { res_data, error } = await CreateShop(values);
    if (!error) {
      onChange(false);
    }
  };

  const onFinishFailed: FormProps<create_shop_form_type>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Rulesni alohida e'lon qilish
  const rules = {
    shopName: [
      { required: true, message: "Korxona nomini kiriting!" },
      { max: 100, message: "Korxona nomi 100 ta belgidan oshmasligi kerak!" },
      { pattern: /^[A-Za-z0-9 ]+$/, message: "Korxona nomi faqat harflar va raqamlardan iborat bo'lishi kerak!" }
    ],
    inn: [
      { required: true, message: "INN raqamini kiriting!" },
      // {
      //   type: 'number',
      //   message: "INN faqat raqam bo'lishi kerak!",
      //   trigger: 'change',  // `change` hodisasi bilan validatsiyani faollashtiramiz
      //   transform: (value: any) => {
      //     return String(value).replace(/\D/g, '');
      //   }
      // },
      // { pattern: /^[0-9]{9}$/, message: "INN raqami 9 raqamdan iborat bo'lishi kerak!"}
    ]
  };

  return (
    <Modal title="Korxona yaratish" open={modelValue} onCancel={() => onChange(false)} footer={null}>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full"
      >
        {/* Korxona nomini kiriting */}
        <Form.Item<create_shop_form_type>
          label="Korxona nomini kiriting"
          name="shopName"
          rules={rules.shopName}
        >
          <Input />
        </Form.Item>

        {/* INN raqamini kiriting */}
        <Form.Item<create_shop_form_type>
          label="Korxonaning INN raqamini kiriting"
          name="inn"
          rules={rules.inn}
        >
            <MaskedInput mask="000000" />
        </Form.Item>

        {/* Tugmalar */}
        <Form.Item label={null}>
          <div className="w-full flex gap-[10px] justify-end">
            <Button type="default" htmlType="button" onClick={() => onChange(false)}>
              Bekor qilish
            </Button>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
