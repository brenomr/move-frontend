const joinUrl = (baseURL: string, ...relativeURLs: string[]) =>
    (relativeURLs && relativeURLs.length > 0)
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURLs.map(relativeURL => relativeURL.replace(/^\/+/, '')).join('/')
        : baseURL;

export default joinUrl