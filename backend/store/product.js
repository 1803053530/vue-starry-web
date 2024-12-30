import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        productDetails: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchProductDetails(productId) {
            this.loading = true
            try {
                // Simulate API call
                const response = await fetch(`/api/products/${productId}`)
                const data = await response.json()
                this.productDetails = data
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        }
    }
})

