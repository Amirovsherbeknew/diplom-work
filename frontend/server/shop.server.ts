'use client'
import axios_ from "@/plugins/axios";
import type {create_shop_form_type} from '@/types/shop.type'
export async function CreateShop(data: create_shop_form_type) {
    let res_data = null;
    let error = null;
    await axios_({
        url: "/shop/create-shop",
        method: "POST",
        data,
    })
    .then((res) => {
        if ([200,201].includes(res.status)) {
            res_data = res.data;
        }
    })
    .catch((err) => {
        error = err.response;
    });
  
    return { res_data, error };
  }
  