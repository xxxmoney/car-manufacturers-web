import PageInjector from "/Scripts/pageInjector.js"
import CustomEvent from "/Scripts/customEvent.js"

class Router {
    #injectElement;
    #currentPageId = 0;
    #pages = [];
    #notFoundPage;
    #homePage;

    //Events that is dispatched in goToPage on start and finish.
    ongotopage;
    onbeforegotopage;

    constructor(injectElement) {
        this.#injectElement = injectElement;
        this.ongotopage = new CustomEvent();
        this.onbeforegotopage = new CustomEvent();

        this.#initPages();
    }

    //Adds a new page to pages (also assigns id to page).
    #addPage(page) {
        page.id = this.#pages.length;
        this.#pages.push(page);
    }
    //Initializes pages.
    #initPages() {
        this.#homePage = new Page("/Pages/home.html", "/Home/", "Home");
        this.#notFoundPage = new Page("/Pages/notFound.html", "/NotFound/", "Not Found");
        this.#addPage(this.#homePage);
        this.#addPage(new Page("/Pages/about.html", "/About/", "About"));
    }    
    
    get currentPageId() {
        return this.#currentPageId;
    }
    get currentPage() {
        return this.pages[this.currentPageId];
    }
    get pages() {
        return this.#pages;
    }

    //Goes to certain page. PageIndex is index of page in pages array.
    async #goToPage(page) {
        this.onbeforegotopage.dispatch();

        if (page == null) {
            page = this.#notFoundPage;
        }

        this.#currentPageId = page.id;
        await PageInjector.injectPage(this.#injectElement, page.url);
        window.history.pushState({}, null, window.location.origin + page.routerUrl);

        //Loading animation testing.
        //await new Promise(resolve => setTimeout(resolve, 1000));

        this.ongotopage.dispatch();
    }
    async goToPageId(pageId) {
        const page = this.pages.find(x => x.id == pageId)

        await this.#goToPage(page);
    }
    async goToPageRouterUrl(routerUrl) {
        const page = this.pages.find(x => x.routerUrl == routerUrl);
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
    id;
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
