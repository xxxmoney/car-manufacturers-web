import Router from '/scripts/router.js'
import switchLoading from '/scripts/loader.js'

window.onload = async function() {    
    //Router initialization.
    const main = document.querySelector("main");
    const router = new Router(main);
    router.onbeforegotopage.addHanler(() => switchLoading(true));
    router.ongotopage.addHanler(setActiveLink);
    router.ongotopage.addHanler(setTitle);
    router.ongotopage.addHanler(() => switchLoading(false));

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

window.goUp = () => {
    window.scrollTo(0, 0);
}
