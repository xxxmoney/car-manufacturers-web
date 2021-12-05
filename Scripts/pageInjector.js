export default class PageInjector {
    //Represent Id for script tag per injected page.
    static #SCRIPT_ID = "pageScript";

    //Gets page's content.
    static async #getPage(url) {
        const result = await fetch(url);
        return await result.text();
    }    
    //Injects page's content into element's content.
    static async injectPage(element, url) {
        element.innerHTML = await this.#getPage(url);
    }

    //Injects scripts at the end of body.
    //If script with SCRIPT_ID exists, it is replaced.
    static injectScript(scriptUrl) {
        const body = document.querySelector("body");

        this.unloadScript();
        
        const script = document.createElement("script");
        script.id = this.#SCRIPT_ID;
        //Ensures that module scripts are reloaded.
        script.src = scriptUrl + "?n=" + Math.floor(Math.random() * Math.pow(10, 5));
        script.type = "module";
        script.setAttribute("async", "")

        body.appendChild(script);
    }
    //Removes script with SCRIPT_ID if present.
    static unloadScript() {
        const script = document.querySelector("#" + this.#SCRIPT_ID);

        if (script != null) {
            script.remove();
        }
    }
}