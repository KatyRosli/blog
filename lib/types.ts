import { ReactNode } from "react"

export type BlogDataResponse = {
    data: Array<BlogEntry>,
    meta: { pagination: { pageCount: number } }
}
export type BlogEntry = {
    id: string,
    attributes: {
        [x: string]: ReactNode
        id: string,
        title: string, 
        date: string,
        slug: string,
    }
}
