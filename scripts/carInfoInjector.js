class CarInfoInjector {
    #COUNT = 10;
    #skip = 0;
    #arr;
    #createTr;
    #tbody;
      
    constructor(arr, tbody, createTr) {
        this.#arr = arr;
        this.#tbody = tbody;
        this.#createTr = createTr;
    }

    inject() {
        this.#skip += this.#COUNT;

        this.#arr.slice(this.#skip, this.#skip + this.#COUNT).forEach(item => {            
            this.#tbody.append(this.#createTr(item));
        });
    }
}

class ManufacturersInjector extends CarInfoInjector {
    constructor(arr, tbody) {   
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
        
        super(arr, tbody, createTr);
    }    
}
class MakesInjector extends CarInfoInjector {
    constructor(arr, tbody) {
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

        super(arr, tbody, createTr);
    }
}

export { ManufacturersInjector, MakesInjector }