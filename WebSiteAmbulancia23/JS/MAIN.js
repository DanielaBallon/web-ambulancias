"use strict";
let MainUser, Rol;
const Home = () => {
  Section.innerHTML = "";
};
const HomeImg = () => {
  Home();
  $dc.img(Section, "Imagenes/ambulancias.jpg").className = "Portada";
};
const MakeLogout = () => {
  if (MainUser === undefined) MainUser = $u.Constructor();

  NombreUsuario.innerHTML = MainUser.Nombre;
  ImgMainUser.src = MainUser.URL;
  RolMainUser.innerHTML = MainUser.Rol;
  $n.Init();
};

const CBChange = () => {
  if (CheckBox.checked) {
    Over.style.backgroundColor = "#000";
    Over.style.color = "#fff";
  } else {
    Over.style.backgroundColor = "rgba(230, 200, 150, 0.84)";
    Over.style.color = "#000";
  }
};
const Post = (Data) => {
  const req = new XMLHttpRequest();
  let res;
  const Change = () => {
    if (req.readyState === 4 && req.status === 200) res = req.responseText;
  };
  req.onreadystatechange = Change;

  req.open("POST", "Default.aspx", false);

  req.send(Data);
  return res;
};
const DifDeTiempo = (t1) => {
  let t = new Date().getTime() - t1;
  let seg = parseInt(Math.fround(t / 1000));
  let minutos = parseInt(Math.floor(seg / 60));
  seg = seg - 60 * minutos;
  let r = minutos + " minutos " + seg + " segundos";
  return r;
};
const ConvertirHora=(milisegundos) => {
    const totalSegundos = Math.floor(milisegundos / 1000);

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    // Formatear los componentes de la hora para asegurarse de que siempre tengan dos dígitos
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

    // Construir la cadena de tiempo en el formato deseado
    const horaFormateada = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;

    return horaFormateada;
}
const OnLoad = () => {
  //eventos
  CheckBox.onchange = CBChange;
  Salir.onclick = () => {
    HomeImg();
    MainUser = undefined;
    MakeLogout();
  };
  //pantalla inicial
  HomeImg();
  MakeLogout();
};
window.onload = OnLoad;
