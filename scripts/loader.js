//Sets loading animation on or off.
//Also sets classes for smooth transition.
export default function switchLoading(on) {
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