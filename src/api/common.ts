import {apiGetData} from "@/api/commonApi";
import {toRaw} from "@vue/reactivity";

export const getData = (params) => {
    const navItems = apiGetData(params)
    return toRaw(navItems)
}