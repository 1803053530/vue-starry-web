import { ref } from 'vue'
import type { CategoryBarConfig } from '../types/categoryBar'
import {getData} from "@/api/common";

export function useCategoryData() {
    const categoryConfig = ref<CategoryBarConfig>({})
    getData({t:4}).then(res=>{
        categoryConfig.value.categories = res.categories
    })
    const fetchCategoryData = async () => {
        try {
            // In real application, replace with actual API call
            // const response = await fetch('/api/categories')
            // categoryConfig.value = await response.json()
            return categoryConfig.value
        } catch (error) {
            console.error('Failed to fetch category data:', error)
            return categoryConfig.value
        }
    }

    return {
        categoryConfig,
        fetchCategoryData
    }
}

