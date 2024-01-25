const $$EstadoDePedido = function () {
  EstadoPedidos = undefined;
  const Load = () => {
    let fd = new FormData();
    fd.append("accion", "LOADESTADOPEDIDOS");
    let res = Post(fd);
    EstadoPedidos = JSON.parse(res);
  };
  const Save = () => {
    let fd = new FormData();
    fd.append("accion", "SAVEESTADOPEDIDOS");
    fd.append("Data", JSON.stringify(EstadoPedidos));
    let res = Post(fd);
    if (res !== "ok") alert(res);
    EstadoPedidos = undefined;
  };
  this.Find = (paciente) => {
    Load();
    for (var i = 0; i < EstadoPedidos.length; i++) {
      let ep = EstadoPedidos[i];
      if (ep.Paciente.ID === paciente.ID) {
        EstadoPedidos = undefined;
        return ep;
      }
    }
    EstadoPedidos = undefined;
    return undefined;
    };
    this.FindCond = (conductor) => {
        Load();
        for (var i = 0; i < EstadoPedidos.length; i++) {
            let ep = EstadoPedidos[i];
            if (ep.Conductor.ID === conductor.ID) {
                EstadoPedidos = undefined;
                return ep;
            }
        }
        EstadoPedidos = undefined;
        return undefined;
    };

  this.Add = (pedido) => {
      Load();
   
    EstadoPedidos.push(pedido);
    Save();
  };
  this.Modify = (pedido) => {
    Load();
    for (var i = 0; i < EstadoPedidos.length; i++) {
      if (EstadoPedidos[i].ID === pedido.ID) {
        EstadoPedidos[i] = pedido;
        Save();
        return;
      }
    }
    };

  this.Erase = (pedido) => {
    Load();
    let aux = new Array();
    for (var i = 0; i < EstadoPedidos.length; i++) {
      if (EstadoPedidos[i].ID != pedido.ID) aux.push(EstadoPedidos[i]);
    }
    EstadoPedidos = aux;
    Save();
    };
    this.Count = () => {
        Load();
        aux = EstadoPedidos.length;
        EstadoPedidos = undefined
        return aux
    }
    this.ListByEstado=(Estado)=>{
        Load();
        var aux = new Array();
        for (var i = 0; i < EstadoPedidos.length; i++) {
            let cond = EstadoPedidos[i];
            if (cond.Conductor && cond.Conductor.Estado === Estado) {
                aux.push(cond);
            }
        }
       return aux;

    };

};
const $estped = new $$EstadoDePedido();

// ESTOY EN ESTADO DE PEDIDO, SE ME BORRO TENGO QUE VOLVER A CARGAR
