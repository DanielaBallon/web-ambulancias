const $$NAV = function () {
  this.Init = () => {
    switch (MainUser.Rol) {
      case "ANONIMO":
        Anonimo();
        break;
      case "ADMINISTRADOR":
        Administrador();
        break;
      case "PACIENTE":
        Paciente();
        break;
      case "RECEPTOR":
        Receptor();
            break;
      case "CONDUCTOR":
            Conductor();
            break;
        case "DIRECTOR DE TRANSITO":
            Director();
            
            break;
    }
  };
  const Anonimo = () => {
    $dn.clear();
    $dn.MakeButton("Portada", HomeImg);
    $dn.MakeButtonYellow("ingresar al sistema", $f.Login);
  };
  const Administrador = () => {
    $dn.clear();
    $dn.MakeButton("Portada", HomeImg);
    $dn.MakeButton("Perfil", $f.Perfil);
    $dn.MakeButtonYellow("ALta bajas modificaciones", AdmABM);
    $dn.MakeButtonYellow("listados de control", AdmListControls);
  };
  const AdmABM = () => {
      $dn.clear();
      Home();
    $dn.MakeButton("ABM Usuarios", $f.ABMUser);
    $dn.MakeButton("AM Ambulancias", $fa.AMAmbulancias);
    $dn.MakeButtonGreen("volver", Administrador);
  };
  const AdmListControls = () => {
      $dn.clear();
      Home();
      $dn.MakeButtonGreen("Estado de control", $f.EstadoActual);
      $dn.MakeButtonGreen("Listado de llegadas", $f.ListarLlegada );
        $dn.MakeButtonGreen("volver", Administrador);
    }; 
    const Director = () => {
        $dn.clear();
        $dn.MakeButton("Portada", HomeImg);
        $dn.MakeButton("Perfil", $f.Perfil);
        $dn.MakeButtonYellow("Enviar ambulancia al paciente", $fd.SendPedido);
        $dn.MakeButtonYellow("Control de conductores", ControlsCoductores);
    };
    const ControlsCoductores = () => {
        $dn.clear();
        Home();
        $dn.MakeButton("Modificar Estado", $fd.ModificarEstado) 
        $dn.MakeButtonGreen("volver", Director);
    };
  const Paciente = () => {
    $dn.clear();
    $dn.MakeButton("Portada", HomeImg);
    $dn.MakeButton("Perfil", $f.Perfil);
    $dn.MakeButton("Solicitud de Servicio", $fp.Solicitud);
    $dn.MakeButton("verificar Solicitud", $fp.VerSolicitud);
  };
  const Receptor = () => {
    $dn.clear();
    $dn.MakeButton("Portada", HomeImg);
    $dn.MakeButton("Perfil", $f.Perfil);
      $dn.MakeButton("Recepción de solicitudes", $fr.RecepSolic);
      $dn.MakeButton("Recepción de Ambulancias", $fr.Recepcion);
      
  };
  const Conductor = () => {
        $dn.clear();
        $dn.MakeButton("Portada", HomeImg);
        $dn.MakeButton("Perfil", $f.Perfil);
      $dn.MakeButton("Mensaje en viaje", $con.NotificacionViaje);
    };


};
const $n = new $$NAV();
