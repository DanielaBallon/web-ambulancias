"use strict";
//clases
const $$Dom = function () {
  //Metodos
  this.ce = (nameElement) => {
    return document.createElement(nameElement);
  };
  this.ae = (parent, child) => {
    parent.appendChild(child);
  };
  this.re = (parent, element) => {
    parent.removeChild(element);
  };
  this.id = (id) => document.getElementById(id);
};
const $$DomControl = function () {
  this.addElement = (parent, nameElement) => {
    let ctr = $d.ce(nameElement);
    $d.ae(parent, ctr);
    return ctr;
  };
  this.addInput = (parent, type) => {
    let inp = $dc.addElement(parent, "input");
    inp.type = type;
    return inp;
  };
  this.div = (parent) => $dc.addElement(parent, "div");

  this.img = (parent, src) => {
    let img = $dc.addElement(parent, "img");
    img.src = src;
    return img;
  };
  this.h1 = (parent, innertext) => {
    let h = $dc.addElement(parent, "h1");
    h.innerText = innertext;
    return h;
  };
  this.h2 = (parent, innertext) => {
    let h = $dc.addElement(parent, "h2");
    h.innerText = innertext;
    return h;
  };
  this.h3 = (parent, innertext) => {
    let h = $dc.addElement(parent, "h3");
    h.innerText = innertext;
    return h;
  };
  this.h3 = (parent, innertext) => {
    let h = $dc.addElement(parent, "h4");
    h.innerText = innertext;
    return h;
  };
  this.label = (parent, innertext) => {
    let lab = $dc.addElement(parent, "label");
    lab.innerText = innertext;
    return lab;
  };
  this.form = (textlabel, textsubmit) => {
    let f = $dc.addElement(Section, "form");
    let header = $dc.div(f);
    header.className = "header";
    $dc.label(header, textlabel);
    let salir = $dc.img(header, "imagenes/salir.png");
    salir.onclick = HomeImg;
    let cform = $dc.div(f);
    cform.id = "Cform";
    cform.className = "cform";
    let foot = $dc.div(f);
    foot.id = "foot";
    let submit = $dc.addInput(foot, "submit");
    submit.className = "submit";
    submit.value = textsubmit;
    return f;
    };
  this.inputText = (textlabel) => {
        let lbl = $dc.label(Cform, textlabel);
        let inp = $dc.addInput(Cform, "text");
        inp.required = true;
        return inp;
    };



  this.Option = (select, text, value) => {
    let opt = $dc.addElement(select, "option");
    opt.innerText = text;
    opt.value = value;
  };
  //controles de form
  this.addSelect = (textlabel) => {
    let lbl = $dc.label(Cform, textlabel);
    return $dc.addElement(Cform, "select");
  };
  this.addText = (texlabel) => {
    let lbl = $dc.label(Cform, texlabel);
    let inp = $dc.addInput(Cform, "text");
    inp.required = true;
    return inp;
  };
  this.addNumber = (texlabel) => {
    let lbl = $dc.label(Cform, texlabel);
    let inp = $dc.addInput(Cform, "number");
    inp.required = true;
    return inp;
  };
  this.addMail = (texlabel) => {
    let lbl = $dc.label(Cform, texlabel);
    let inp = $dc.addInput(Cform, "email");
    inp.required = true;
    return inp;
  };
  this.addTel = (texlabel) => {
    let lbl = $dc.label(Cform, texlabel);
    let inp = $dc.addInput(Cform, "tel");
    inp.required = true;
    return inp;
  };
  this.addPassword = (texlabel) => {
    let lbl = $dc.label(Cform, texlabel);
    let inp = $dc.addInput(Cform, "password");
    inp.required = true;
    return inp;
  };
  this.addPasswordConfirm = () => {
    let pass = $dc.addPassword("contraseña");
    pass.placeholder = "Si no modifica contraseña no ingrese";
    pass.value = "";
    let lblconfirm = $dc.label(Cform, "confirmar contraseña");
    lblconfirm.style.display = "none";
    let confirm = $dc.addInput(Cform, "password");
    confirm.style.display = "none";
    confirm.required = false;
    pass.required = false;
    pass.onchange = () => {
      if (pass.value === "") {
        lblconfirm.style.display = "none";
        confirm.style.display = "none";
        confirm.value = "";
        confirm.required = false;
        confirm.setCustomValidity("");
        return;
      }
      lblconfirm.style.display = "block";
      confirm.style.display = "block";
      confirm.required = true;
    };
    confirm.onchange = () => {
      if (pass.value === confirm.value) confirm.setCustomValidity("");
      else confirm.setCustomValidity("NO COINCIDEN LAS CONTRASEÑAS");
    };
    return pass;
  };
  this.addTextDisabled = (textlabel) => {
    let inp = $dc.inputText(textlabel);
    inp.disabled = true;
    return inp;
    };
    this.addTextarea = (textlabel) => {
        $dc.label(cform, textlabel);
        let ta = $dc.addElement(Cform, "textarea");
        return ta;
    }
  this.addFile = (textlabel, name) => {
    let lbl = $dc.label(Cform, textlabel);
    let file = $dc.addInput(Cform, "file");
    file.name = name;
    file.required = false;
    return file;
  };
  this.addFileImg = (textlabel, name) => {
    const Change = function () {
      if (this.files.length === 0) return;
      if (this.files[0].type.match("image.*")) {
        this.setCustomValidity("");
      } else {
        this.setCustomValidity("No es un archivo de imagen".toUpperCase());
      }
    };
    let fileimg = $dc.addFile(textlabel, name);
    fileimg.onchange = Change;
    fileimg.required = false;
    return fileimg;
  };
  this.addFilePdf = (textlabel, name) => {
    const Change = () => {
      if (this.files.length === 0) return;
      let filename = this.files[0].name;
      let datos = filename.split(".");
      let extensión = datos[datos.length - 1];
      if (extensión === "pdf") {
        this.setCustomValidity("");
      } else {
        this.setCustomValidity("No es un archivo pdf".toUpperCase());
      }
    };

    let filepdf = $dc.addFile(textlabel, name);
    filepdf.onchange = Change;
    filepdf.required = false;
    return filepdf;
  };
  this.forgot = () => {
    let forg = $dc.div(Section);
    forg.className = "forgot";
    forg.innerText = "OLVIDé MI CONTRASEÑA";
    return forg;
  };
  this.doubleButton = (text1, text2) => {
    let d1 = $dc.div(Cform);
    let d2 = $dc.div(Cform);
    d1.innerHTML = text1;
    d2.innerHTML = text2;
    return [d1, d2];
  };
  this.switchbutton = (lbtext, text1, text2) => {
    this.label(Cform, lbtext);
    let lb0 = this.addElement(Cform, "div");
    $dc.label(lb0, text1);
    lb0.className = "togglelbl";
    let lab = $dc.label(lb0, "");
    $dc.label(lb0, text2);
    lab.className = "switch";
    let cb = $dc.addInput(lab, "checkbox");
    let span = $dc.addElement(lab, "span");
    span.className = "slider round";
    return cb;
  };
};
const $$DomNav = function () {
  this.clear = () => {
    Nav.innerHTML = "";
  };
  this.MakeButton = (text, event) => {
    let a = $dc.addElement(Nav, "a");
    a.innerText = text;
    a.onclick = event;
    return a;
  };
  this.MakeButtonYellow = (text, event) => {
    let a = $dn.MakeButton(text, event);
    a.style.color = "yellow";
    return a;
  };
  this.MakeButtonGreen = (text, event) => {
    let a = $dn.MakeButton(text, event);
    a.style.color = "#afa";
    return a;
  };
  this.MakeButtonRed = (text, event) => {
    let a = $dn.MakeButton(text, event);
    a.style.color = "#f99";
    return a;
  };
};
const $$DomTable = function () {
  let Title, Header, List, Frow;
  const addTable = () => {
    let Tabla = $d.id("Table");
    if (Tabla === null) {
      Tabla = $dc.addElement(Section, "table");
      Tabla.id = "Table";
    }
    Table.innerHTML = "";

    let caption = $dc.addElement(Table, "caption");
    caption.innerText = Title;

    let tr0 = $dc.addElement(Table, "tr");
    tr0.className = "thead";
    for (var i = 0; i < Header.length; i++) {
      Th(tr0, Header[i]);
    }
    MakeBody();
  };
  const MakeBody = () => {
    for (let index = 0; index < List.length; index++) {
      const object = List[index];

      const tr2 = Tr();
      const j = index % 2;
      if (j === 0) tr2.className = "par";
      else tr2.className = "impar";
      for (let i = 0; i < Header.length; i++) {
        Td(tr2);
      }
      Frow(tr2, object);
    }
  };
  const Tr = () => {
    return $dc.addElement(Table, "tr");
  };
  const Td = (tr) => {
    return $dc.addElement(tr, "td");
  };
  const Th = (tr, text) => {
    $dc.addElement(tr, "th").innerText = text;
  };
  this.Table = (title, header, list, frow) => {
    Title = title;
    Header = header;
    List = list;
    Frow = frow;
    addTable();
  };
  this.iconErase = (parent, evento) => {
    let img = $dc.img(parent, "imagenes/elim.png");
    img.onclick = evento;
    img.className = "icon";
    parent.style.backgroundColor = "#333";
    return img;
  };
  this.iconModify = (parent, evento) => {
    let img = $dc.img(parent, "imagenes/modificar.png");
    img.onclick = evento;
    img.className = "icon";
    parent.style.backgroundColor = "#333";
    return img;
  };
  this.iconPdf = (parent, evento) => {
    let img = $dc.img(parent, "imagenes/pdf.png");
    img.onclick = evento;
    img.className = "icon";
    parent.style.backgroundColor = "#333";
    return img;
  };
};

//instancias
const $d = new $$Dom(),
  $dc = new $$DomControl(),
  $dn = new $$DomNav(),
  $dt = new $$DomTable();
