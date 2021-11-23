export default class PageInjector {
    //Gets page's content.
    static async #getPage(url) {
        const result = await fetch(url);
        return await result.text();
    }
    
    //Injects page's content into element's content.
    static async injectPage(element, url) {
        element.innerHTML = await this.#getPage(url);
    }
}