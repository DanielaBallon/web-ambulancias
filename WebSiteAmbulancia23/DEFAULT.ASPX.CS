using System;
using System.IO;


public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["accion"] != null)
        {
            switch (Request["accion"])
            {
                case "LOADUSERS":Load("usuarios");break;
                case "SAVEUSERS":Save("usuarios"); break;
                case "GUARDARIMAGEN":GuardarImagen(); break;
                case "LOADAMBULANCIAS":Load("ambulancias"); break;
                case "SAVEAMBULANCIAS":Save("ambulancias"); break;
                case "LOADPEDIDOS":Load("colapedidos"); break;
                case "SAVEPEDIDOS":Save("colapedidos"); break;
                case "LOADESTADOPEDIDOS":Load("listaestadopedidos"); break;
                case "SAVEESTADOPEDIDOS":Save("listaestadopedidos"); break;
                case "LOADNORMALES":Load("colanormal"); break;
                case "SAVENORMALES":Save("colanormal"); break;
                case "LOADPRIORIDADES": Load("colaprioritaria"); break;
                case "SAVEPRIORIDADES": Save("colaprioritaria"); break;
                case "LOADROUNDROBIN": Load("colaroundrobin"); break;
                case "SAVEROUNDROBIN": Save("colaroundrobin"); break;
                case "LOADCONDUCTORES": Load("listaconductores"); break;
                case "SAVECONDUCTORES": Save("listaconductores"); break;
                case "LOADCOLAAMBULANCIAS": Load("colaambulancias"); break;
                case "SAVECOLAAMBULANCIAS": Save("colaambulancias"); break;
                case "LOADFINALES": Load("listadatosfinales"); break;
                case "SAVEFINALES": Save("listadatosfinales"); break;


            }
        }
    }

    private void Load(string Data)
    {
        Response.Write(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "Datos\\" + Data + ".json"));
    }

    private void Save(string Data)
    {
        File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory + "Datos\\" + Data + ".json", Request["Data"]);
        Response.Write("ok");
    }
    private void GuardarImagen()
    {
        string ID = Request["ID"];
        string Path = AppDomain.CurrentDomain.BaseDirectory + "IMAGENES\\USUARIOS\\usuario" + ID + ".jpg";
        string Path1 = AppDomain.CurrentDomain.BaseDirectory + "IMAGENES\\USUARIOS\\usuario_" + ID + ".jpg";
        if (Request.Files[0].FileName != "")
        {
            if (File.Exists(Path)) { File.Delete(Path); Request.Files[0].SaveAs(Path1); }
            else if (File.Exists(Path1)) { File.Delete(Path1); Request.Files[0].SaveAs(Path); }
            else Request.Files[0].SaveAs(Path);
        }
        if (File.Exists(Path)) { Response.Write("imagenes/usuarios/usuario" + ID + ".jpg"); return; }
        if (File.Exists(Path1)) { Response.Write("imagenes/usuarios/usuario_" + ID + ".jpg"); return; }
        Response.Write("imagenes/usuarios/usuariodefault.jpg");


    }

}