
const $$ColaRoundRobin = function () {
  let Cola;
  const Load = () => {
    var fd = new FormData();
    fd.append("accion", "LOADROUNDROBIN");

    let res = Post(fd);
    Cola = JSON.parse(res);
  };
  const Save = () => {
    var fd = new FormData();
    fd.append("accion", "SAVEROUNDROBIN");
    fd.append("Data", JSON.stringify(Cola));
    let res = Post(fd);
    if (res !== "ok") alert(res);
    Cola = undefined;
  };
  const RoundRobin = () => {
      Load();
      let l = Cola.length;
      Cola = undefined;
      if(l == 0)
      {
          $cprio.Desacolar();
          $cprio.Desacolar();
          $cprio.Desacolar();
          $cnorm.Desacolar();
      }
    
    };
  this.Count = () => {
        Load();
        let c = Cola.length;
        Cola = undefined;
        return c;

    }
  this.Top = () => {
        RoundRobin();
        Load();
        let pedido = Cola[0];
        Cola = undefined;
        return pedido;
    }
  this.Desacolar = () => {
        Load();
        const pedido = Cola.shift();
        Save();
        return pedido;
    }
  this.Acolar = (pedido) => {
        Load();
        Cola.push(pedido);
        Save();
    }
      /*const NormalExists = () => {
    for (var i = 0; i < Cola.length; i++) {
      if (Cola[i].Estado === "EN ESPERA DE AMBULANCIA") return true;
    }
    return false;
  };
  this.Desacolar = () => {
    Load();
    RoundRobin();
    if (Cola.length == 0) throw "no existe muinguna petición en espera";
    let peticion = Cola.shift();
    Save();
    return peticion;
    };*/
};

const $crr = new $$ColaRoundRobin();
