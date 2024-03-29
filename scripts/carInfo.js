class CarInfo {
    static #baseUrl = "https://vpic.nhtsa.dot.gov/api";

    static async #getResult(url, page = 1) {
        let result = await fetch(this.#baseUrl + url + "?format=json&page=" + page);
        result = await result.json();
        return result.Results;
    }

    static async getManufacturers(page = 1) {
        return await this.#getResult("/vehicles/GetAllManufacturers", page);            
    }

    static async getMakes(page = 1) {
        return await this.#getResult("/vehicles/GetAllMakes", page);             
    }
    static async getVehicleTypesByMakeId(makeId) {
        return await this.#getResult("/vehicles/GetVehicleTypesForMakeId/" + makeId);
    }
    static async getModelsByMakeId(makeId) {
        return await this.#getResult("/vehicles/GetModelsForMakeId/" + makeId);
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
class Make {
    Make_ID;
    Make_Name;
}

export default CarInfo