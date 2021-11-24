import Router from './router.js'

window.onload = async function() {
    const main = document.querySelector("main");
    const router = new Router(main);
    router.onbeforegotopage.addHanler(() => switchLoading(true));
    router.ongotopage.addHanler(setActiveLink);
    router.ongotopage.addHanler(setTitle);
    router.ongotopage.addHanler(() => switchLoading(false));

    //Injects links into nav bar.
    injectLinksNav();
 
    //Loads first page.
    await router.goToPageIndex(0);

    //Injects buttons that 'work as links' into nav.
    function injectLinksNav() {
        const nav = document.querySelector("nav");

        if (router?.pages != null && router.pages.length > 0) {
            router.pages.forEach((page, index) => {
                const link = document.createElement("input");
                link.type = "button";
                link.value = page.name;
                link.index = index;
                link.onclick = async function() {
                    if (link.index != router.currentPageIndex) {
                        await router.goToPageIndex(this.index);
                    }
                }
        
                nav.append(link);
            });
        }
    }

    //Sets class to corresponding 'link'.
    function setActiveLink() {
        const pageIndex = router.currentPageIndex;
        const className = "link-active";
        const links = document.querySelectorAll("header nav input");

        links.forEach((link, index) => {
            if (index == pageIndex) {
                link.classList.add(className);
            }
            else {
                link.classList.remove(className);
            }
        });
    }

    //Sets title for current page.
    function setTitle() {
        const title = document.querySelector("title");
        title.text = router.currentPage.name;
    }
}

//Sets loading animation on or off.
//Also sets classes for smooth transition.
function switchLoading(on) {
    const loadingInnerWrapper = document.querySelector(".loading-inner-wrapper"); 
    const loadingInnerWrapperActive = "loading-inner-wrapper-active";
    const loadingInnerWrapperHidden = "loading-inner-wrapper-hidden";

    const loadingWrapper = document.querySelector(".loading-wrapper");
    const loadingWrapperActive = "loading-wrapper-active";
    const loadingWrapperHidden = "loading-wrapper-hidden";
    
    if (on) {        
        loadingInnerWrapper.classList.remove(loadingInnerWrapperHidden);
        loadingInnerWrapper.classList.add(loadingInnerWrapperActive);        

        loadingWrapper.classList.remove(loadingWrapperHidden);
        loadingWrapper.classList.add(loadingWrapperActive);
    }
    else {
        loadingInnerWrapper.classList.remove(loadingInnerWrapperActive);
        loadingInnerWrapper.classList.add(loadingInnerWrapperHidden);  

        loadingWrapper.classList.remove(loadingWrapperActive);
        loadingWrapper.classList.add(loadingWrapperHidden);
    }
}

