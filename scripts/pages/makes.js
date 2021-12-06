import { MakesInjector } from '/scripts/carInfoInjector.js'

const injector = new MakesInjector(document.querySelector("tbody"));

await injector.inject();

window.next = async () => {
    await injector.inject();
}
