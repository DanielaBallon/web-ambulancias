const $$FORM = function () {
    this.Login = () => {
        const Submit = () => {
            let user = $u.Constructor();
            user.Mail = mail.value;
            user.Password = pass.value;
            try {
                MainUser = $u.Login(user);
                HomeImg();
                MakeLogout();
            } catch (e) {
                alert(e);
            }
            return false;
        };
        Home();
        const f = $dc.form("ingresar al sistema", "ingresar");
        f.className = "w40 top3";
        f.onsubmit = Submit;
        const mail = $dc.addMail("mail");
        const pass = $dc.addPassword("contraseña");
    };

    this.Perfil = () => {
        const Submit = () => {
            try {
                let fd = new FormData(f);
                fd.append("ID", MainUser.ID);
                fd.append("accion", "GUARDARIMAGEN");
                var Res = Post(fd);
                MainUser.URL = Res;
                MainUser.Telefono = Tel.value;
                MainUser.Direccion = Dir.value;
                if (pass.value !== "") MainUser.Password = pass.value;
                $u.Modify(MainUser);
                MakeLogout();
                HomeImg();
            } catch (e) {
                alert(e);
            }
            return false;
        };
        Home();
        const f = $dc.form("Perfil de " + MainUser.Nombre, "modificar");
        f.className = "w40 top3";
        f.onsubmit = Submit;
        const Tel = $dc.addTel("teléfono");
        Tel.value = MainUser.Telefono;
        const Dir = $dc.addText("dirección");
        Dir.value = MainUser.Direccion;
        const pass = $dc.addPasswordConfirm();
        $dc.addFileImg("foto", "foto");
    };
    this.ABMUser = () => {
        const Submit = () => {
            try {
                var usu = $u.Constructor();
                usu.Nombre = Nombre.value;
                usu.Dni = Dni.value;
                usu.Mail = Mail.value;
                usu.Password = Dni.value;
                usu.Rol = RolesPosibles.value;
                $u.Add(usu);
                Listar();
                f.reset();
            } catch (e) {
                alert(e);
            }
            return false;
        };
        const Listar = () => {
            const List = $u.List();
            const Header = ["Nombre", "Dni", "mail", "rol", "modificar"];
            const Frow = (tr, usu) => {
                tr.childNodes[0].innerText = usu.Nombre;
                tr.childNodes[1].innerText = usu.Dni;
                tr.childNodes[2].innerText = usu.Mail;
                tr.childNodes[3].innerText = usu.Rol;
                $dt.iconModify(tr.childNodes[4], () => {
                    ModifyUser(usu);
                });
            };

            $dt.Table("usuarios", Header, List, Frow);
        };
        Home();
        const f = $dc.form("alta usuarios", "agregar");
        f.className = "w60 top3";
        f.onsubmit = Submit;
        const Nombre = $dc.addText("Nombre");
        const Dni = $dc.addNumber("Dni");
        const Mail = $dc.addMail("mail");
        const RolesPosibles = $dc.addSelect("Roles posibles");
        for (var i = 0; i < ESTADOS.length; i++) {
            $dc.Option(RolesPosibles, ESTADOS[i], ESTADOS[i]);
        }
        Listar();
    };
    const ModifyUser = (usu) => {
        const Submit = () => {
            try {
                usu.Nombre = Nombre.value;
                usu.Dni = Dni.value;
                usu.Mail = Mail.value;
                usu.Password = Dni.value;
                usu.Rol = RolesPosibles.value;
                $u.Modify(usu);
                $f.ABMUser();
                f.reset();
            } catch (e) {
                alert(e);
            }
            return false;
        };
        Home();
        const f = $dc.form("modificar usuarios", "modificar");
        f.className = "w60 top3";
        f.onsubmit = Submit;
        const Nombre = $dc.addText("Nombre");
        const Dni = $dc.addNumber("Dni");
        const Mail = $dc.addMail("mail");
        const RolesPosibles = $dc.addSelect("Roles posibles");
        for (var i = 0; i < ESTADOS.length; i++) {
            $dc.Option(RolesPosibles, ESTADOS[i], ESTADOS[i]);
        }
        Nombre.value = usu.Nombre;
        Dni.value = usu.Dni;
        Mail.value = usu.Mail;
        RolesPosibles.value = usu.Rol;
    };
    this.EstadoActual = () => {
        const Submit = () => {
            HomeImg();return false;
        }
        Home();
        const f = $dc.form("Estado de cada movimiento", "Salir");
        f.className = "w60";
        $dc.addTextDisabled("cola pedidos").value = $cp.Count() + "Pedidos";
        $dc.addTextDisabled("cola normal").value = $cnorm.Count() + "Pedidos";
        $dc.addTextDisabled("cola prioritaria").value = $cprio.Count() + "Pedidos";
        $dc.addTextDisabled("cola de salida").value = $crr.Count() + "Pedidos";
        $dc.addTextDisabled("ambulancias en espera").value = $ca.Count() + "Pedidos";
        $dc.addTextDisabled("ambulancias en viaje").value = $estped.Count() + "Pedidos";
        $dc.addTextDisabled("lista de llegadas").value = $fin.Count() + "Pedidos";
        f.onsubmit = Submit;
    }
    this.ListarLlegada = () => {
        let X, Y;
        const Submit = () => {
            try {
                x = parseInt(X.value);
                y = parseInt(Y.value);
                Listar(x, y);
                $f.ListarLlegada;
            }
            catch (e) {
                alert(e);
            }
            return false;
        };
        const Listar = (X, Y) => {
            
            List = $fin.List();
            const SubList = List.slice(X-1, Y)
            const Header = ["Paciente", "Conductor", "Sin atención", "En cola", "En transporte", "Tiempo total", "Comentario"];
            const Frow = (tr, ped) => {
                tr.childNodes[0].innerText = ped.Paciente.Nombre;
                tr.childNodes[1].innerText = ped.Conductor.Nombre;
                tr.childNodes[2].innerText = ped.TiempoDePedido;
                tr.childNodes[3].innerText = ped.TiempoDeCola;
                tr.childNodes[4].innerText = ped.TiempoDeViaje;
                tr.childNodes[5].innerText = ped.TiempoDePedido + ped.TiempoDeCola + ped.TiempoDeViaje;
                $dt.iconModify(tr.childNodes[6], () => {
                    if (ped.Comentario !== "") {
                        alert(ped.Comentario);
                    } else {
                        alert("no hay comentarios");

                    }
                });
            };

            $dt.Table("Historial de pedidos", Header, SubList, Frow);
            
        };

        Home();
        const f = $dc.form("Receoción de ambulancias", "Buscar");
        f.className = "w60 top3";
        f.onsubmit = Submit;
        CantLlegadas = $dc.addTextDisabled("Cantidad de llegadas").value = $fin.Count();
        X = $dc.addNumber("Desde");
        Y = $dc.addNumber("Hasta");
        let Listacompleta = $fin.List();
        if (Listacompleta = undefined || Listacompleta.Count === 0) {
            alert("No hay historial de ambulancias")
            return
        };
    }
}
const $$FAMB = function () {
  this.AMAmbulancias = () => {
    const Submit = () => {
      try {
        let amb = $amb.Contructor();
        amb.Nombre = Nombre.value;
        amb.Marca = Marca.value;
        amb.Modelo = Modelo.value;
        amb.Patente = Patente.value;
        amb.Estado = SelectEstado.value;
        amb.Historial.push(new Date() + " " + Historial.value);
          $amb.Add(amb);
          $ca.Acolar(amb);
        f.reset();
        ListAmbulancias();
      } catch (e) {
        alert(e);
      }
      return false;
    };

    const ListAmbulancias = () => {
      let amb = $amb.Contructor();
      amb.Estado = SelectEstado.value;
      const List = $amb.List(amb);
      const Header = [
        "Nombre",
        "modelo",
        "marca",
        "patente",
        "estado",
        "modificar",
      ];
      const Frow = (tr, a) => {
        tr.childNodes[0].innerText = a.Nombre;
        tr.childNodes[1].innerText = a.Modelo;
        tr.childNodes[2].innerText = a.Marca;
        tr.childNodes[3].innerText = a.Patente;
        tr.childNodes[4].innerText = a.Estado;
        $dt.iconModify(tr.childNodes[5], () => {
          Modify(a);
        });
      };
      $dt.Table("ambulancias con estado=" + amb.Estado, Header, List, Frow);
    };
    Home();
    const f = $dc.form("Alta ambulancias", "agregar");
    f.className = "w80 top3";
    f.onsubmit = Submit;
    const Nombre = $dc.addText("nombre");
    const Modelo = $dc.addText("modelo");
    const Marca = $dc.addText("Marca");
    const Patente = $dc.addText("patente");
    const SelectEstado = $dc.addSelect("estado");
      for (var i = 0; i < ESTADOSAMB.length; i++) {
          $dc.Option(SelectEstado, ESTADOSAMB[i], ESTADOSAMB[i]);
    }
    const Historial = $dc.addText("Historial");
    ListAmbulancias();
    SelectEstado.onchange = ListAmbulancias;
  };
  const Modify = (amb) => {
    const Submit = () => {
      amb.Nombre = Nombre.value;
      amb.Marca = Marca.value;
      amb.Modelo = Modelo.value;
      amb.Patente = Patente.value;
      amb.Estado = SelectEstado.value;
      if (Historial.value !== "")
        amb.Historial.push(new Date() + " " + Historial.value);

      try {
        $amb.Modify(amb);
        Modify(amb);
      } catch (e) {
        alert(e);
      }
      return false;
    };
    const ListHistorial = () => {
      const ListAux = amb.Historial;
      var List = new Array();
      for (var i = 0; i < ListAux.length; i++) {
        List.push({ pos: i, valor: ListAux[i] });
      }
      const Header = ["Historial", "modificar"];
      const Frow = (tr, Hist) => {
        tr.childNodes[0].innerHTML = Hist.valor;
        $dt.iconModify(tr.childNodes[1], () => {
          ModifyHistorial(amb, Hist);
        });
      };
      $dt.Table("Historial", Header, List, Frow);
    };
    Home();
    const f = $dc.form("modificar ambulancia " + amb.Nombre, "modificar");
    f.className = "w80 top3";
    f.onsubmit = Submit;
    const Nombre = $dc.addText("nombre");
    Nombre.value = amb.Nombre;
    const Modelo = $dc.addText("modelo");
    Modelo.value = amb.Modelo;
    const Marca = $dc.addText("Marca");
    Marca.value = amb.Marca;
    const Patente = $dc.addText("patente");
    Patente.value = amb.Patente;
    const SelectEstado = $dc.addSelect("estado");
      for (var i = 0; i < ESTADOSAMB.length; i++) {
          $dc.Option(SelectEstado, ESTADOSAMB[i], ESTADOSAMB[i]);
    }
    SelectEstado.value = amb.Estado;
    const Historial = $dc.addText("agregar Historial");
    Historial.required = false;
    Historial.placeholder = "si no desea agregar no ingrese ningún dato";
    ListHistorial();
  };
  const ModifyHistorial = (amb, Hist) => {
    const Submit = () => {
      amb.Historial[Hist.pos] = H.value;
      $amb.Modify(amb);
      Modify(amb);
      return false;
    };
    Home();
    const f = $dc.form("modificar historial de " + amb.Nombre, "modificar");
    const H = $dc.addText("historial[" + Hist.pos + "]");
    H.value = Hist.valor;
    f.className = "w80 top3";
    f.onsubmit = Submit;
  };
};
const $$FORMPACIENTE = function () {
  this.Solicitud = () => {
    const Submit = () => {
      let pedido = $cp.Constructor();
      pedido.Paciente = MainUser;
      pedido.Problema = SelectEstado.value;
      pedido.TipoProblema = SelectTipo.value;
      pedido.Direccion = Lugar.value;
      $cp.Acolar(pedido);
      $estped.Add(pedido);
      alert("se ha ingresado su pedido");
      HomeImg();
      return false;
    };
    const MakeEstado = () => {
      var Tipo;
      SelectEstado.innerHTML = "";
      let tipo = SelectTipo.value;
      switch (tipo) {
        case "ACCIDENTE":
          Tipo = PROBLEMAS1;
          break;
        case "PÉRDIDA DE CONOCIMIENTO":
          Tipo = PROBLEMAS2;
          break;
        case "DOLOR AGUDO":
          Tipo = PROBLEMAS3;
          break;
        case "DIFICULTAD PARA RESPIRAR":
          Tipo = PROBLEMAS4;
          break;
        case "FIEBRE":
          Tipo = PROBLEMAS5;
          break;
        case "ASISTENCIA A SERVICIO PROGRAMADO":
          Tipo = PROBLEMAS6;
          break;
      }
      for (var i = 0; i < Tipo.length; i++) {
        $dc.Option(SelectEstado, Tipo[i], Tipo[i]);
      }
    };
    Home();
    if ($estped.Find(MainUser) !== undefined) {
      alert("ya  tiene un pedido en proceso");
      $fp.VerSolicitud();
      return;
    }
    const f = $dc.form("solicitud de ambulancia ", "solicitar");
    f.className = "w80 top3";
    f.onsubmit = Submit;
    const SelectTipo = $dc.addSelect("tipo de problema");

    for (var i = 0; i < PROBLEMAS.length; i++) {
      $dc.Option(SelectTipo, PROBLEMAS[i], PROBLEMAS[i]);
    }
    const SelectEstado = $dc.addSelect("Estado el paciente");
    MakeEstado();
    SelectTipo.onchange = MakeEstado;
    const Lugar = $dc.addText("especifique exactamente lugar donde ir");
    };

  this.VerSolicitud = () => {
    Home();
    let Estado = $estped.Find(MainUser);
    if (Estado === undefined) {
      alert("No se encuentra un pedido suyo en el sistema");
      HomeImg();
    }
    let div = $dc.div(Section);
    div.className = "div1";
    $dc.h1(
      div,
      "Estado de la solicitud N° " +
        Estado.ID +
        " del paciente: " +
        MainUser.Nombre +
        " ,se encuentra en " +
        Estado.Estado
    );
    $dc.h1(
      div,
      "el tiempo transcurrido desde el estado inicial hasta ahora es de: " +
        DifDeTiempo(Estado.TiempoDePedido)
    );
  };
};
const $$RECEPTOR = function () {
    const Finalizar = (pedido) => {
        pedido.TiempoDeLlegada = new Date().getTime();
        $ca.Acolar(pedido.Ambulancia); 
        pedido.Conductor.Estado = "EN ESPERA";
        $u.Modify(pedido.Conductor)
        $fin.Add(pedido); //fin donde esta implenetado, falta implementar ListadoFinales
        $estped.Erase(pedido);
        this.Recepcion();
    }
    this.Recepcion = () => {
        const List = $estped.ListByEstado("EN VIAJE");
        if (List.length === 0) {
            HomeImg();
            alert("no hay ninguna ambulancia que esperar");
            return;
        }
        Home();
        $dc.h1(Section, "ingreso de ambulancias")
        const Header = ["Patente", "Paciente", "Conductor", "ingresar"];
        const Frow = (tr, ped) => {
            tr.childNodes[0].innerText = ped.Ambulancia.Patente;
            tr.childNodes[1].innerText = ped.Paciente.Nombre;
            tr.childNodes[2].innerText = ped.Conductor.Nombre;
            $dt.iconModify(tr.childNodes[3], () => {
                Finalizar(ped);
            });
            
            // me gustaria saber si es con prioridad
            // el ingresar solo lo ingresa a la cola de listado fianles
           
        }
        $dt.Table("Lista de ambulancias", Header, List, Frow);
     






    };
    this.RecepSolic = () => {
        Home();
        try {
            let pedido = $cp.Top();
            let div = $dc.div(Section);
            div.className = "div1";
            $dc.h1(div, "paciente: " + pedido.Paciente.Nombre);
            $dc.h2(div, "Afección: " + pedido.TipoProblema + " " + pedido.Problema);
            $dc.h2(div, "lugar: " + pedido.Direccion);
            let bt1 = $dc.addElement(div, "button");
            bt1.innerText = "enviar a cola normal";
            let bt2 = $dc.addElement(div, "button");
            bt2.innerText = "enviar a cola prioritaria";
            bt1.className = "boton";
            bt2.className = "boton";
            bt1.onclick = () => {
                pedido = $cp.Desacolar();
                pedido.TipoDeCola = "En Espera de ambulancia";
                pedido.TiempoDeCola = new Date().getTime();
                pedido.Estado = "EN ESPERA DE AMBULANCIA";
                $cnorm.Acolar(pedido);
                $estped.Modify(pedido);
                $fr.RecepSolic();
            };
            bt2.onclick = () => {
                pedido = $cp.Desacolar();
                pedido.TipoDeCola = "En Espera prioritaria de ambulancia";
                pedido.TiempoDeCola = new Date().getTime();
                pedido.Estado = "EN ESPERA PRIORITARIA DE AMBULANCIA";
                $cprio.Acolar(pedido);
                $estped.Modify(pedido);
                $fr.RecepSolic();
            };


        } catch (e) {
            alert(e);
            HomeImg();
        }
    };
}
const $$DIRECTOR = function () {
    this.SendPedido = () => {
        let Mensaje, pedido, conductor;
        const ListaCond = $u.ConducbyEstado("EN ESPERA"); //$Cond.ListByEstado("EN ESPERA"); // ListaCond= $u.ConducbyEstado(EN ESPERA)
        const Submit = () => {
            $crr.Desacolar();
            $ca.Desacolar();
            console.log("Valor del conductor.value:", conductor.value);
            let i = parseInt(conductor.value)
            let cond = ListaCond[i];
            pedido.Conductor = cond;
            cond.Estado = "EN VIAJE";
            // $Cond.Modify(cond);
            $u.Modify(cond)
            $estped.Modify(pedido);
            HomeImg();
            this.SendPedido();
         

        };
        
        const EsPosible = () => {
            Mensaje = "";
            if ($cnorm.Count() === 0 &&
                $cprio.Count() === 0 &&
                $crr.Count() === 0) {
                Mensaje = "No hay pacientes que soliciten atención";
            }

            if ($ca.Count() === 0) {
                if (Mensaje !== "") Mensaje += " y ";
                Mensaje += "no hay ambulancias disponibles";
            }

            if (ListaCond.length === 0) {
                if (Mensaje !== "") Mensaje += " y ";
                Mensaje += "No hay conductores de ambulancias disponibles";
            }

            if (Mensaje !== "") {
                alert(Mensaje + " en este momento...");
                return false;
                }

                
            const MakeConductor = () => {
                conductor.innerHTML = "";
                for (var i = 0; i < ListaCond.length; i++) {
                    $dc.Option(conductor, ListaCond[i].Nombre, i);

                }

            }
            Home();
            pedido = $crr.Top(); //carga las 3 colas

            const ambulancia = $ca.Top();
            
            pedido.Ambulancia = ambulancia;
            pedido.Estado = "Salió la ambulancias";
            pedido.TiempoDeViaje = new Date().getTime();
            const f = $dc.form("Servicio de ambulancias", "enviar");
            f.className = "w60";
            f.onsubmit = Submit;
            $dc.addTextDisabled("Paciente").value = pedido.Paciente.Nombre;
            $dc.addTextDisabled("ir a").value = pedido.Direccion;
            $dc.addTextDisabled("Problema").value = pedido.Problema;
            $dc.addTextDisabled("Tipo de problema").value = pedido.TipoProblema
            $dc.addTextDisabled("Patente Ambulanca").value = ambulancia.Patente;
            conductor = $dc.addSelect("Conductor de ambulancia");
            MakeConductor();
            console.log("Valor del conductor.value:", conductor.value);
           
        };
        EsPosible();
    } //1:23
    this.ModificarEstado = () => {
        Home()
        $dc.h1(Section, "Modificar los estados de los conductores")
        const List = $u.ListByRol("CONDUCTOR");
        const Header = ["Nombre", "Dni", "mail", "modificar"];
        const Frow = (tr, usu) => {
            tr.childNodes[0].innerText = usu.Nombre;
            tr.childNodes[1].innerText = usu.Dni;
            tr.childNodes[2].innerText = usu.Estado;
            $dt.iconModify(tr.childNodes[3], () => {
                ModifyEstado(usu);
            });
        };

        $dt.Table("usuarios", Header, List, Frow);


    };
    const ModifyEstado = (usu) => {
        const Submit = () => {
            try {
                
                usu.Estado = EstadosPosibles.value;
                $u.Modify(usu);
                f.reset();
                $fd.ModificarEstado();
            } catch (e) {
                alert(e);
            }
            return false;
        };
        Home();
        const f = $dc.form("modificar Estado", "modificar");
        f.className = "w60 top3";
        f.onsubmit = Submit;
        const Nombre = $dc.addText("Nombre");
        const Dni = $dc.addNumber("Dni");
        const EstadosPosibles = $dc.addSelect("Estados Posibles");
        for (var i = 0; i < ESTADOSCON.length; i++) {
            $dc.Option(EstadosPosibles, ESTADOSCON[i], ESTADOSCON[i]);
        }
        Nombre.value = usu.Nombre;
        Dni.value = usu.Dni;
        EstadosPosibles.value = usu.Estado;
    };
   
};
const $$CONDUCTOR = function () {
    this.NotificacionViaje = () => {
        
        
        let pedido = $estped.FindCond(MainUser);
        if (pedido === undefined) {
            alert("No se encuentra un pedido suyo en el sistema");
            HomeImg();
        } else {
            Home();
            const Submit = () => {
                try {
                    pedido.Comentario = Comentario.value;
                    $estped.Modify(pedido)
                    alert("Se agrego comentario");

                } catch (e) {
                    alert(e)
                }
                return false;
            };
            const f = $dc.form("Notificación de viaje", "Agregar");
            f.className = "w60";
            f.onsubmit = Submit;
            $dc.addTextDisabled("Paciente").value = pedido.Paciente.Nombre;
            $dc.addTextDisabled("ir a").value = pedido.Direccion;
            $dc.addTextDisabled("Problema").value = pedido.Problema;
            $dc.addTextDisabled("Tipo de problema").value = pedido.TipoProblema
            $dc.addTextDisabled("Patente Ambulanca").value = pedido.Ambulancia.Patente;
            const Comentario = $dc.addText("Comentarios")
            Comentario.className = "Comentario"
            Comentario.value = pedido.Comentario;
            f.onsubmit = Submit;}

        
 
    }
}

const $con = new $$CONDUCTOR();
const $f = new $$FORM();
const $fa = new $$FAMB();
const $fp = new $$FORMPACIENTE();
const $fr = new $$RECEPTOR();
const $fd = new $$DIRECTOR();


