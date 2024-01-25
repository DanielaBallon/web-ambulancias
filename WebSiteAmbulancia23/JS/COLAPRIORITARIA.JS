
const $$ColaPrioridad = function () {
    let Prioridades;
    const Load = () => {
        let fd = new FormData();
        fd.append("accion", "LOADPRIORIDADES");
        let res = Post(fd);
        Prioridades = JSON.parse(res);
    };
    const Save = () => {
        let fd = new FormData();
        fd.append("accion", "SAVEPRIORIDADES");
        fd.append("Data", JSON.stringify(Prioridades));
        let res = Post(fd);
        if (res !== "ok") alert(res);
        Prioridades = undefined;
    };
    this.Acolar = (pedido) => {
        Load();
        Prioridades.push(pedido);
        Save();
    };
    this.Desacolar = () => {
        Load();
        if (Prioridades.length === 0) return false;//throw "cola vacía";
        let aux = Prioridades.shift();
        Save();
        $crr.Acolar(aux);
        return aux;
    };
    this.Count = () => {
        Load();
        let c = Prioridades.length;
        Prioridades = undefined;
        return c;
    }
};
const $cprio = new $$ColaPrioridad();