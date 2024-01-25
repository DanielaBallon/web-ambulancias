
const $$ColaAmbulancias = function () {
    let Ambulancias;
    const Save = () => {
        const fd = new FormData();
        fd.append("accion", "SAVECOLAAMBULANCIAS");
        fd.append("Data", JSON.stringify(Ambulancias));
        const res = Post(fd);
        
        if (res !== "ok") alert(res);
        Ambulancias = undefined;
    };

    const Load = () => {
        let fd = new FormData();
        fd.append("accion", "LOADCOLAAMBULANCIAS");
        let res = Post(fd);
        Ambulancias = JSON.parse(res);
    }
    this.Count = () => {
        Load();
        let aux = Ambulancias.length;
        Ambulancias = undefined;
        return aux

    }

   /* this.Acolar = (ambulancia) => {
        if (Array.isArray(ambulancia.Ambulancias)) {
            // Si ambulancia es un objeto con un array de Ambulancias
            ambulancia.Ambulancias.forEach((amb) => {
                if (amb.Estado === "ACTIVO") {
                    Load();
                    Ambulancias.push(amb); // al final del array
                    Save();
                }
            });
        } else {
            // Si ambulancia no es un objeto con un array, trata como un objeto individual
            if (ambulancia.Estado === "ACTIVO") {
                Load();
                Ambulancias.push(ambulancia); // al final del array
                Save();
            }
        }
        return false;
    }
    */
    this.Acolar = (ambulancia) => {

        if (ambulancia.Estado === "ACTIVO") {
            Load();
            Ambulancias.push(ambulancia) // al final del array
            Save();
        }
        return false;

    };
    
    this.Top = () => {
        Load();
        const pedido = Ambulancias[0];
        Ambulancias = undefined;
        return pedido;

}
    this.Desacolar = () => {
        Load();
        if (Ambulancias.length === 0) {
            Ambulancias = undefined;
            throw "no se encuentra ninguna ambulancias en espera"
        }
        let aux = Ambulancias.shift(); // elimina el primer elemento del array el primero ingreso por push
        Save();
        return aux; 
    }
    
};



const $ca = new $$ColaAmbulancias();
