import Router from '/scripts/router.js'
import CarInfoInjector from '/scripts/carInfoInjector.js'

window.onload = async function() {    
    //Router initialization.
    const main = document.querySelector("main");
    const router = new Router(main);
    router.onbeforegotopage.addHanler(() => switchLoading(true));
    router.ongotopage.addHanler(setActiveLink);
    router.ongotopage.addHanler(setTitle);
    router.ongotopage.addHanler(() => switchLoading(false));

    //WIP
    //CarInfoInjector initialization.
    const carInfoInjector = new CarInfoInjector();

    //Injects links into nav bar.
    injectLinksNav();
    
    //Checks whether there is a query param present.
    const search = window.location.search;
    if (search == null || search == "") {
        await router.goToHomePage();
    }
    else {
        //Gets router url from query param.
        const params = new URLSearchParams(search);
        const redirectUrl = params.get("redirect");
        await router.goToPageRouterUrl(redirectUrl);
    }    

    //Injects buttons that 'work as links' into nav.
    function injectLinksNav() {
        const nav = document.querySelector("nav");

        if (router?.pages != null && router.pages.length > 0) {
            router.pages.forEach(page => {
                const link = document.createElement("input");
                link.type = "button";
                link.value = page.name;
                link.pageId = page.id;
                link.onclick = async function() {
                    if (link.pageId != router.currentPageId) {
                        await router.goToPageId(page.id);
                    }
                }
        
                nav.append(link);
            });
        }
    }

    //Sets class to corresponding 'link'.
    function setActiveLink() {
        const pageIndex = router.currentPageId;
        const className = "link-active";
        const links = document.querySelectorAll("header nav input");

        links.forEach(link => {
            if (link.pageId == pageIndex) {
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

