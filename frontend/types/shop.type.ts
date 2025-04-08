export interface props {
    modelValue:boolean,
    onChange:(modelValue:boolean)=> void;
}
export interface create_shop_form_type {
    shopName:string,
    inn:string
}