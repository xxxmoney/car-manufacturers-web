class CarInfo {
    static #baseUrl = "https://vpic.nhtsa.dot.gov/api";

    static async #getResult(url, page = 1) {
        let result = await fetch(this.#baseUrl + url + "?format=json&page=" + page);
        result = await result.json();
        return result.Results;
    }

    static async getManufacturers() {
        return await this.#getResult("/vehicles/GetAllManufacturers");
    }
}

class Result {
    Count;
    Message;
    SearchCriteria;
    Results;
}
class Manufacturer {
    Country;
    Mfr_CommonName;
    Mfr_ID;
    Mfr_Name;
    VehicleTypes;
}

export default CarInfo