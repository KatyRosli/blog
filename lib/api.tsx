export async function fetcher(url: string, options = {}) {
    let response;
    if (!options) {
        console.log('hii', url);
        response = await fetch(url);
    } else {
        console.log('byee', url);
        response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
}