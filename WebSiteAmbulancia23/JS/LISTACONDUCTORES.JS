const ESTADOSCON = ["EN CASA", "EN ESPERA", "EN VIAJE", "INACTIVO"];
const $$ListaConductores = function () {
    let Conductores;
    
    const Load = () => {
        var fd = new FormData();
        fd.append("accion", "LOADCONDUCTORES");
        let Res = Post(fd);
        try {
            Conductores = JSON.parse(Res);
        } catch (e) {
            alert(e);
        }
    };
    const Save = () => {
        var fd = new FormData();
        fd.append("accion", "SAVECONDUCTORES");
        fd.append("Data", JSON.stringify(Conductores));//ver
        let Res = Post(fd);
        if (Res !== "ok") alert(Res);
        Conductores = undefined;
    };

    this.ListByEstado = (Estado) => {
        Load();
        var aux = new Array();
        for (var i = 0; i < Conductores.length; i++) {
            let cond = Conductores[i];
            if (cond.Estado === Estado) aux.push(cond);
        }
        Conductores = undefined;
        Save();
        return aux;
    }
    
    this.Add = (cond) => {
        Load();
        Conductores.push(cond);
        Save();
    };
    this.List = () => {
        Load();
        let aux = Conductores;
        Conductores = undefined;
        return aux;
    }
    
    this.Modify = (cond) => {
        Load();
        for (var i = 0; i < Conductores.length; i++) {
            if (Conductores[i].ID === cond.ID) {
                Conductores[i] = cond;
                Save();
                return;
            }
        }

    };
    
//falta implementar
    this.find = (a) => {
        Load();
        for (var i = 0; i < Ambs.Ambulancias.length; i++) {
            let amb = Ambs.Ambulancias[i];
            if (amb.ID === a.ID && amb.Patente === a.Patente) {
                Ambs = undefined;
                return amb;
            }
        }
        Ambs = undefined;
        throw "Error no se pudo encontrar la ambulancia buscada";
    };      


};

const $Cond = new $$ListaConductores();