import { MakesInjector } from '/scripts/carInfoInjector.js'
import CarInfo from '/scripts/carInfo.js'
import switchLoading from '/scripts/loader.js'

switchLoading(true);

const makes = await CarInfo.getMakes();
const injector = new MakesInjector(makes, document.querySelector("tbody"));

injector.inject();

switchLoading(false);

window.next = () => {
    injector.inject();
}
