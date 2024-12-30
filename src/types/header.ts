export interface NavItem {
    id: number
    title: string
    link: string
    isActive?: boolean
}

export interface HeaderConfig {
    logo: {
        url: string
        alt: string
    }
    navItems: NavItem[]
    searchPlaceholder: string
    downloadButton: {
        text: string
        link: string
    }
}

