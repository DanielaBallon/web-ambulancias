
const ESTADOSAMB = ["ACTIVO", "EN REPARACIÓN", "DESCARTADO"];
const $$Ambulancias = function () {
    let Ambs;
  this.Contructor = () => {
    return {
      ID: 0,
      Modelo: "",
      Nombre: "",
      Marca: "",
      Patente: "",
      Estado: "ACTIVO",
      Historial: [],
    };
  };
  const Load = () => {
        var fd = new FormData();
        fd.append("accion", "LOADAMBULANCIAS");
        let Res = Post(fd);
        try {
            Ambs = JSON.parse(Res);
        } catch (e) {
            alert(e);
    }
};
  const Save = () => {
    var fd = new FormData();
    fd.append("accion", "SAVEAMBULANCIAS");
    fd.append("Data", JSON.stringify(Ambs));
    let Res = Post(fd);
    if (Res !== "ok") alert(Res);
    Ambs = undefined;
};

  this.Add = (a) => {
    Load();
    a.ID = Ambs.ID++;
    PatenteExists(a);
    NombreExists(a);
    Ambs.Ambulancias.push(a);
    Save();

    };
  /*this.AddCola =() => {
      Load();
      //aux=this.ListByEstado("ACTIVO")
      $ca.Acolar(Ambs);
      Ambs = undefined;

    }*/
  this.Modify = (a) => {
    Load();
    PatenteExists(a);
    NombreExists(a);
    for (var i = 0; i < Ambs.Ambulancias.length; i++) {
      let amb = Ambs.Ambulancias[i];
      if (amb.ID === a.ID) {
        Ambs.Ambulancias[i] = a;
        Save();
        return;
      }
    }
    Ambs = undefined;
    throw "Error no se encontró la ambulancia";
  };
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
  this.List = () => {
        Load();
        let aux = Ambs.Ambulancias;
        Ambs = undefined;
        return aux;
    }
  this.ListByEstado = (a) => {
        Load();
        var aux = new Array();
        for (var i = 0; i < Ambs.Ambulancias.length; i++) {
            let amb = Ambs.Ambulancias[i];
            if (amb.Estado === a) aux.push(amb);
        }
        Ambs = undefined;
        return aux;
    }

  
  const PatenteExists = (a) => {
    for (var i = 0; i < Ambs.Ambulancias.length; i++) {
      let amb = Ambs.Ambulancias[i];
      if (amb.ID !== a.ID && amb.Patente === a.Patente)
        throw "Error existe otra ambulancia con la misma patente";
    }
  };
  const NombreExists = (a) => {
    for (var i = 0; i < Ambs.Ambulancias.length; i++) {
      let amb = Ambs.Ambulancias[i];
      if (amb.ID !== a.ID && amb.Nombre === a.Nombre)
        throw "Error existe otra ambulancia con el mismo nombre";
    }
    };
    
};

const $amb = new $$Ambulancias();
