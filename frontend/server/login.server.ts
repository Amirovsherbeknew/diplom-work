'use client'
// @ts-ignore
import Cookies from "js-cookie";
import axios_ from "@/plugins/axios";
import type { FormFieldType } from "@/types/login.type";
export async function HandleLogin(data: FormFieldType) {
    let res_data = null;
    let error = null;
    await axios_({
        url: "/auth/login",
        method: "POST",
        data:{...data,shop:'global'},
    })
    .then((res) => {
        if ([200,201].includes(res.status)) {
            res_data = res.data;
            const token = res_data?.token
            Cookies.set("access_token", token, {
                expires: 7, // 7 kun saqlanadi
            });
        }
    })
    .catch((err) => {
        error = err.response;
    });
  
    return { res_data, error };
  }
  