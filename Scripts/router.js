import PageInjector from "/scripts/pageInjector.js"
import CustomEvent from "/scripts/customEvent.js"

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
        this.#homePage = new Page("/pages/home.html", "/Home/", "Home Sweet Home", "/scripts/pages/home.js");
        this.#notFoundPage = new Page("/pages/notFound.html", "/NotFound/", "Not Found");
        this.#addPage(this.#homePage);
        this.#addPage(new Page("/pages/manufacturers.html", "/Manufacturers/", "Manufacturers", "/scripts/pages/manufacturers.js"));
        this.#addPage(new Page("/pages/makes.html", "/Makes/", "Makes", "/scripts/pages/makes.js"));
        this.#addPage(new Page("/pages/about.html", "/About/", "About"));
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

        const isScriptEmpty = page.scriptUrl != null;
        //Loads page's script (if there is any), otherwise removes script if present.
        if (isScriptEmpty) {
            PageInjector.injectScript(page.scriptUrl, this.ongotopage.dispatch);
        }
        else {
            PageInjector.unloadScript();
        }

        //Loading animation testing.
        //await new Promise(resolve => setTimeout(resolve, 1000));

        if (isScriptEmpty) {
            this.ongotopage.dispatch();
        }
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
    async goToHomePage() {
        await this.#goToPage(this.#homePage);
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
    #scriptUrl;

    constructor(url, routerUrl, name, scriptUrl = null) {
        this.#url = url;
        this.#routerUrl = routerUrl;
        this.#name = name;
        this.#scriptUrl = scriptUrl;
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
    get scriptUrl() {
        return this.#scriptUrl;
    }
}

export default Router
