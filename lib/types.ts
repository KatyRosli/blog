export type BlogDataResponse = {
    data: [],
    meta: { pagination: { pageCount: number } }
}
export type BlogEntry = {
    attributes: {
        id: string,
        title: string, 
        date: string,
        slug: string
    }
}