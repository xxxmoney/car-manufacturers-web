import CarInfo from '/scripts/carInfo.js'
import switchLoading from '/scripts/loader.js'

class CarInfoInjector {
    #currentPage = 0;
    #COUNT = 50;
    #skip = 0;
    #arr = [];
    #tbody;
    #createTr;
    #getArr;
      
    constructor(tbody, createTr, getArr) {
        this.#tbody = tbody;
        this.#createTr = createTr;
        this.#getArr = getArr;
    }

    async inject() {
        switchLoading(true);

        this.#skip += this.#COUNT;

        if (this.#skip + this.#COUNT >= this.#arr.length) {
            this.#currentPage++;
            this.#arr = this.#arr.concat(await this.#getArr(this.#currentPage));
        }

        this.#arr.slice(this.#skip, this.#skip + this.#COUNT).forEach(item => {            
            this.#tbody.append(this.#createTr(item));
        });

        switchLoading(false);
    }
}

class ManufacturersInjector extends CarInfoInjector {
    constructor(tbody) {   
        function createTr(manufacturer) {
            const tr = document.createElement("tr");     
            
            const id = document.createElement("td");
            id.textContent = manufacturer.Mfr_ID;
            const name = document.createElement("td")
            name.textContent = manufacturer.Mfr_CommonName;
            if (name.textContent == "") {
                name.textContent = manufacturer.Mfr_Name;
            }
            const country = document.createElement("td");
            country.textContent = manufacturer.Country;
            tr.append(id);
            tr.append(name);
            tr.append(country);
    
            return tr;
        }
        async function getArr(page) {
            return await CarInfo.getManufacturers(page);
        }
        
        super(tbody, createTr, getArr);
    }    
}
class MakesInjector extends CarInfoInjector {
    constructor(tbody) {
        function createTr(make) {
            const tr = document.createElement("tr");
            
            const id = document.createElement("td");
            id.textContent = make.Make_ID;
            const name = document.createElement("td");
            name.textContent = make.Make_Name;
            tr.append(id);
            tr.append(name);
    
            return tr;
        }
        async function getArr(page) {
            return await CarInfo.getMakes(page);
        }

        super(tbody, createTr, getArr);
    }
}

export { ManufacturersInjector, MakesInjector }