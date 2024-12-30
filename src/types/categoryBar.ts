export interface CategoryItem {
    id: number
    name: string
    link: string
    engName?: string
    isActive?: boolean
}

export interface CategoryBarConfig {
    categories: CategoryItem[]
}

