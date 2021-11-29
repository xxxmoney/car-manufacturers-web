import CarInfo from "/scripts/carInfo.js"

class CarInfoInjector {
    #manufacturers;
    #makes;

    async initialize() {
        this.#manufacturers = await CarInfo.getManufacturers();
        this.#makes = await CarInfo.getMakes();
    }

    injectManufacturers(tbody) {
        this.#manufacturers.forEach(manufacturer => {
            const tr = document.createElement("tr");
            const name = document.createElement("td")
            name.textContent = manufacturer.Mfr_CommonName;
            const country = document.createElement("td");
            country.textContent = manufacturer.Country;

            tr.append(name);
            tr.append(country);
        });
    }


}

export default CarInfoInjector