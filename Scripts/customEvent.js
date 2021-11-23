export default class CustomEvent {
    #handlers = [];

    addHanler(handler) {
        this.#handlers.push(handler);
    }
    dispatch() {
        this.#handlers.forEach(handler => {
            try {
                handler();
            } catch (error) {
                console.log(error);
            } 
        });
    }

}