import Router from './router.js'

window.onload = async function() {
    const main = document.querySelector("main");
    const router = new Router(main);
    router.onGoToPageStart.addHanler(() => switchLoading(true));
    router.onGoToPageFinish.addHanler(setActiveLink);
    router.onGoToPageFinish.addHanler(setTitle);
    router.onGoToPageFinish.addHanler(() => switchLoading(false));

    //Injects links into nav bar.
    injectLinksNav();

    //Loads first page.
    await router.goToPage(0);

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
                        await router.goToPage(this.index);
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

//Switches loading animation.
//It is also usable as directly setting on and off.
function switchLoading(on = null) {
    const loadingWrapper = document.querySelector(".loading-wrapper"); 
    const active = loadingWrapper.style.display == "none";

    if (active || on) {
        loadingWrapper.style.display = "block";
    }
    if(!active || !on) {
        loadingWrapper.style.display = "none";
    }
}

