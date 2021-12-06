function getScrollHeight() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}
function scrollToHeight(height) {
    window.scrollTo(0, height);
}

//Sets loading animation on or off.
export default function switchLoading(on) {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");

    const loadingInnerWrapper = document.querySelector(".loading-inner-wrapper"); 
    const loadingInnerWrapperActive = "loading-inner-wrapper-active";
    const loadingInnerWrapperHidden = "loading-inner-wrapper-hidden";

    const loadingWrapper = document.querySelector(".loading-wrapper");
    const loadingWrapperActive = "loading-wrapper-active";
    const loadingWrapperHidden = "loading-wrapper-hidden";

    if (on) {        
        window.localStorage.setItem("scrollH", getScrollHeight());
        scrollToHeight(0);
        body.style.overflowY = "hidden";
        footer.style.visibility = "hidden";
        loadingInnerWrapper.classList.remove(loadingInnerWrapperHidden);
        loadingInnerWrapper.classList.add(loadingInnerWrapperActive);        

        loadingWrapper.classList.remove(loadingWrapperHidden);
        loadingWrapper.classList.add(loadingWrapperActive);
    }
    else {
        body.style.overflowY = "scroll";
        footer.style.visibility = "visible";
        scrollToHeight(window.localStorage.getItem("scrollH"));
        loadingInnerWrapper.classList.remove(loadingInnerWrapperActive);
        loadingInnerWrapper.classList.add(loadingInnerWrapperHidden);  

        loadingWrapper.classList.remove(loadingWrapperActive);
        loadingWrapper.classList.add(loadingWrapperHidden);
    }
}