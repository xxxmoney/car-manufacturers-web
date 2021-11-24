import PageInjector from "./pageInjector.js"
import CustomEvent from "./customEvent.js";

class Router {
    #injectElement;
    #currentPageIndex = 0;
    #pages = [];
    #notFoundPage;

    //Events that is dispatched in goToPage on start and finish.
    ongotopage;
    onbeforegotopage;

    constructor(injectElement) {
        this.#injectElement = injectElement;
        this.ongotopage = new CustomEvent();
        this.onbeforegotopage = new CustomEvent();

        this.#initPages();
    }

    //Initializes pages.
    #initPages() {
        this.#pages.push(new Page("/Pages/home.html", "/Home", "Home"));
        this.#pages.push(new Page("/Pages/about.html", "/About", "About"));
        this.#notFoundPage = new Page("/Pages/notFound.html", "/NotFound", "NotFound");
    }
    
    get currentPageIndex() {
        return this.#currentPageIndex;
    }
    get currentPage() {
        return this.pages[this.currentPageIndex];
    }
    get pages() {
        return this.#pages;
    }
    
    //Goes to certain page. PageIndex is index of page in pages array.
    async #goToPage(page) {
        this.onbeforegotopage.dispatch();

        await PageInjector.injectPage(this.#injectElement, page.url);
        window.history.pushState({}, null, window.location.origin + page.routerUrl);

        //Loading animation testing.
        //await new Promise(resolve => setTimeout(resolve, 1000));

        this.ongotopage.dispatch();
    }
    async goToPageIndex(pageIndex) {
        this.#currentPageIndex = pageIndex;
        const page = this.currentPage;

        await this.#goToPage(page);
    }
    async goToPageNotFound() {
        await this.#goToPage(this.#notFoundPage);
    }

    static goToUrlNoHistory(url) {
        window.location.replace(url);
    }
}

class Page {
    #url;
    #routerUrl;
    #name;

    constructor(url, routerUrl, name) {
        this.#url = url;
        this.#routerUrl = routerUrl;
        this.#name = name;
    }

    get url() {
        return this.#url;
    }
    get name() {
        return this.#name;
    }
    get routerUrl() {
        return this.#routerUrl;
    }
}

export default Router
