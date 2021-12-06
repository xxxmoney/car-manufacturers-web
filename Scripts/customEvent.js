export default class CustomEvent {
    handlers = [];

    addHanler(handler) {
        if (this.handlers == null) {
            this.handlers = [];
        }
        this.handlers.push(handler);
    }
    dispatch() {
        if (this.handlers != null) {
            this.handlers.forEach(handler => {
                try {
                    handler();
                } catch (error) {
                    console.log(error);
                } 
            });
        }
    }

}