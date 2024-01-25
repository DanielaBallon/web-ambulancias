var Users;
const ESTADOS = [
  "ADMINISTRADOR",
  "RECEPTOR",
  "DIRECTOR DE TRÁNSITO",
  "PACIENTE",
  "CONDUCTOR",
];
const $$USER = function () {
  this.Constructor = () => {
      return {
          ID: 0,
          Nombre: "anónimo",
          Dni: 0,
          Mail: "",
          Dirección: "",
          Telefono: "",
          Password: "",
          Rol: "ANONIMO",
          URL: "imagenes/usuarios/usuariodefault.jpg",
          Estado: ""
      }
  };
  this.Add = (u) => {
    Load();
    u.ID = Users.ID++;
    MailExists(u);
    DniExists(u);
    Users.Usuarios.push(u);
    Save();
  };
  this.Modify = (u) => {
    Load();
    DniExists(u);
    MailExists(u);
    for (var i = 0; i < Users.Usuarios.length; i++) {
      let user = Users.Usuarios[i];
      if (user.ID === u.ID) {
        Users.Usuarios[i] = u;
        Save();
        return;
      }
    }
    Users = undefined;
    throw "Error usuario no encontrado";
  };
  this.List = () => {
    Load();
    let aux = Users.Usuarios;
    Users = undefined;
    return aux;
  };
  this.Login = (u) => {
    Load();
    for (var i = 0; i < Users.Usuarios.length; i++) {
      let user = Users.Usuarios[i];
      if (user.Mail === u.Mail && user.Password === u.Password) {
        Users = undefined;
        return user;
      }
    }
    Users = undefined;
    throw "Error:datos ingresados incorrectos";
  };
  const MailExists = (u) => {
    for (var i = 0; i < Users.Usuarios.length; i++) {
      let user = Users.Usuarios[i];
      if (user.ID !== u.ID && user.Mail === u.Mail)
        throw "error existe otro usuario con el mismo mail";
    }
  };
  const DniExists = (u) => {
    for (var i = 0; i < Users.Usuarios.length; i++) {
      let user = Users.Usuarios[i];
      if (user.ID !== u.ID && user.Dni === u.Dni)
        throw "error existe otro usuario con el mismo Dni";
    }
  };
  const Load = () => {
    try {
      let fd = new FormData();
      fd.append("accion", "LOADUSERS");
      Users = JSON.parse(Post(fd));
    } catch (e) {
      alert(e);
    }
  };
  const Save = () => {
    let fd = new FormData();
    fd.append("accion", "SAVEUSERS");
    fd.append("Data", JSON.stringify(Users));
    let Res = Post(fd);
    if (Res !== "ok") {
      alert(Res);
      return false;
    }
    Users = undefined;
    //return false;
    };

   
 this.ListByRol = (Rol) => {
        Load();
        var aux = new Array();
        for (var i = 0; i < Users.Usuarios.length; i++) {
            let cond = Users.Usuarios[i];
            if (cond.Rol === Rol) aux.push(cond);
        }
        return aux;
    }
 this.ConducbyEstado = (Estado) => {
        Cons = this.ListByRol("CONDUCTOR");
        var aux = new Array();
        for (var i = 0; i < Cons.length; i++) {
            let cond = Cons[i];
            if (cond.Estado === Estado) aux.push(cond);
        }
        Cons = undefined;
        Save();// no se si va save
        return aux;


    }

//Sin implemetar
    this.Erase = (u) => { };
    this.Find = (u) => { };
};

const $u = new $$USER();
