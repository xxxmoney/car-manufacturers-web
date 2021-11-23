import PageInjector from "./pageInjector.js"
import CustomEvent from "./customEvent.js";

class Router {
    #injectElement;
    #currentPageIndex = 0;
    #pages = [];

    //Events that is dispatched in goToPage on start and finish.
    onGoToPageStart;
    onGoToPageFinish;

    constructor(injectElement) {
        this.#injectElement = injectElement;
        this.onGoToPageStart = new CustomEvent();
        this.onGoToPageFinish = new CustomEvent();

        this.#initPages();
    }

    //Initializes pages.
    #initPages() {
        this.#pages.push(new Page("Pages/home.html", "Home"));
        this.#pages.push(new Page("Pages/about.html", "About"));
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
    async goToPage(pageIndex) {
        this.onGoToPageStart.dispatch();

        this.#currentPageIndex = pageIndex;
        const page = this.currentPage;

        await PageInjector.injectPage(this.#injectElement, page.url);

        //await new Promise(resolve => setTimeout(resolve, 2000));

        this.onGoToPageFinish.dispatch();
    }
}

class Page {
    #url;
    #name;

    constructor(url, name) {
        this.#url = url;
        this.#name = name;
    }

    get url() {
        return this.#url;
    }
    get name() {
        return this.#name;
    }
}

export default Router
