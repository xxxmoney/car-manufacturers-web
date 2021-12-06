import { ManufacturersInjector } from '/scripts/carInfoInjector.js'

const injector = new ManufacturersInjector(document.querySelector("tbody"));

await injector.inject();

window.next = async () => {
    await injector.inject();
}
