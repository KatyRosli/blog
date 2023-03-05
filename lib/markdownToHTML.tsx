import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHTML(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export function replaceImageUrls(markdown: string) {
    return markdown.replace(/\/uploads\//g, `${process.env.STRAPI_URL}"/uploads/"`);
}