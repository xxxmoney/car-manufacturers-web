import { ManufacturersInjector } from '/scripts/carInfoInjector.js'
import CarInfo from '/scripts/carInfo.js'
import switchLoading from '/scripts/loader.js'

switchLoading(true);

const manufacturers = await CarInfo.getManufacturers();
const injector = new ManufacturersInjector(manufacturers, document.querySelector("tbody"));

injector.inject();

switchLoading(false);

window.next = () => {
    injector.inject();
}
