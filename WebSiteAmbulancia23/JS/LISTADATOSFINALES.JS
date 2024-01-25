const $$ListaDatosFinales = function () {
    DatosFinales = undefined;
    const Load = () => {
        let fd = new FormData();
        fd.append("accion", "LOADFINALES");
        let res = Post(fd);
        DatosFinales = JSON.parse(res);
    };
    const Save = () => {
        let fd = new FormData();
        fd.append("accion", "SAVEFINALES");
        fd.append("Data", JSON.stringify(DatosFinales));
        let res = Post(fd);
        if (res !== "ok") alert(res);
        DatosFinales = undefined;
    };
   
    this.Add = (pedido) => {
        Load();

        DatosFinales.push(pedido);
        Save();
    };
    this.List = () => {
        Load();
        let aux = DatosFinales;
        DatosFinales = undefined;
        return aux;
    }
   /* this.ListTram = (Desde,Hasta) => {
        Load();
          

        // Filtrar las recepciones de ambulancias desde Desde hasta Hasta
        let filteredRecepciones = DatosFinales.slice(Desde-1, Hasta );
        DatosFinales = undefined;
        return filteredRecepciones;

    }*/
    this.Count = () => {
        Load();
        let c = DatosFinales.length;
        DatosFinales = undefined;
        return c;
    }
};
const $fin = new $$ListaDatosFinales();

