import { ReactNode } from "react"

export type BlogDataResponse = {
    data: [],
    meta: { pagination: { pageCount: number } }
}
export type BlogEntry = {
    attributes: {
        [x: string]: ReactNode
        id: string,
        title: string, 
        date: string,
        slug: string
    }
}