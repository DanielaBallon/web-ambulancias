//CONSTANTES DE PEDIDOS********************
const PROBLEMAS = [
    "ACCIDENTE",
    "PÉRDIDA DE CONOCIMIENTO",
    "DOLOR AGUDO",
    "DIFICULTAD PARA RESPIRAR",
    "FIEBRE",
    "ASISTENCIA A SERVICIO PROGRAMADO",
];
const PROBLEMAS1 = [
    "aturdimiento",
    "heridas leves",
    "huesos rotos",
    "paralizado",
    "sangrante",
];
const PROBLEMAS2 = ["con golpes", "fracturas", "fallas respiratorias"];
const PROBLEMAS3 = ["cabeza", "pecho", "vientre", "extremidades"];
const PROBLEMAS4 = ["leve", "aguda"];
const PROBLEMAS5 = ["baja", "con dolores leves", "con dolores agudos"];
const PROBLEMAS6 = ["traumatología", "diálisis", "tomografía"];
const $$ColaPedidos = function () {
    var Pedidos = undefined;
    this.Constructor = () => {
        return {
            ID: 0,
            Paciente: undefined,
            Problema: undefined,
            Dirección: undefined,
            TipoProblema: undefined,
            TiempoDePedido: undefined,
            TipoDeCola: undefined,
            TiempoDecola: undefined,
            TiempoDeViaje: undefined,
            Conductor: undefined,
            Comentario: "",
            Estado: "EN PEDIDO INICIAL",
        };
    };
    this.Acolar = (pedido) => {
        Load();
        pedido.ID = Pedidos.ID++;
        pedido.TiempoDePedido = new Date().getTime();
        Pedidos.Pedidos.push(pedido); 
        Save();
    };
    this.Top = () => {
        Load();
        if (Pedidos.Pedidos.length === 0) {
            throw "No existe ningún pedido";
        }
        let res = Pedidos.Pedidos[0];
        Pedidos = undefined;
        return res;
    };
    this.Desacolar = () => {
        Load();
        if (Pedidos.Pedidos.length === 0) {
            throw "No existe ningún pedido";
        }
        let res = Pedidos.Pedidos.shift();
        Save();
        return res;
    };
    const Load = () => {
        let fd = new FormData();
        fd.append("accion", "LOADPEDIDOS");
        let res = Post(fd);
        Pedidos = JSON.parse(res);
    };
    const Save = () => {
        let fd = new FormData();
        fd.append("accion", "SAVEPEDIDOS");
        fd.append("Data", JSON.stringify(Pedidos));
        let res = Post(fd); // realiza la solicitud al servidor
        if (res !== "ok") {
            alert(res);
        }
        Pedidos = undefined;
    };
    this.IsEmpty = () => {
        Load();
        return Pedidos.Pedidos.length === 0; //porque la cola pedido tiene ID y el segundo es pedidos 
    }
    this.Count = () => {
        Load();
        P = Pedidos.Pedidos.length;
        Pedidos = undefined;
        return P
    };
};
const $cp = new $$ColaPedidos();