


const $$ColaNormal = function () {
  let Normales;
  const Load = () => {
    let fd = new FormData();
    fd.append("accion", "LOADNORMALES");
    let res = Post(fd);
      Normales = JSON.parse(res);
      JSON.parse(res);
  };
  const Save = () => {
    let fd = new FormData();
    fd.append("accion", "SAVENORMALES");
    fd.append("Data", JSON.stringify(Normales));
    let res = Post(fd);
    if (res !== "ok") alert(res);
    Normales = undefined;
  };
  this.Acolar = (pedido) => {
    Load();
    Normales.push(pedido);
    Save();
  };
  this.Desacolar = () => {
    Load();
    if (Normales.length === 0) throw "cola vacía";
    let aux = Normales.shift();
      Save();
      $crr.Acolar(aux);// duda aux es una array sin el primer elemento 
    return aux;
    };
  this.Count=() => {
        Load();
        let c = Normales.length;
        Normales = undefined;
        return c;

  }

};
const $cnorm = new $$ColaNormal();
