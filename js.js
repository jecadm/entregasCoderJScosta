//VARIABLES GLOBALES YA SE QUE HYA VARIABLE QUE NO SE USAN AHORA Y MUCHOS ARRAY VACIOS SON ARA MAS ADELANTA LAS USO DE GUIA
let tipoDePreastamo = "";
let nomUser = "";
let tasa = 0;
let moneda = "Pesos";
const IVA = 21;
let cuotas = [1, 3, 6, 12, 24, 36];
let plazoSeleccionado = 0;
let totalC = [];
let cuotasSuma = 0;

//seleccion de elemento en html interaccion DOM
const tipoDePrestamo = document.querySelector("#paquete");

// funcion para traer los datos del archivo db.json.
const cargarTipoDePrestamos = () => {
  const fetchP = fetch("./db.json")
    .then((res) => res.json())

    .then((db) => {
      /* objetos array y metodos de arrays forEach */
      db.forEach((TDPrestamo) => {
        const option = document.createElement("option");

        option.innerHTML = `
      ${TDPrestamo.producto}
      
      `;
        /* option.setAttribute("value",TDPrestamo.id) */
        option.setAttribute("value", TDPrestamo.tasa);

        /* console.log(option );  */
        tipoDePrestamo.append(option);
      });
    });
};
// funcion para traer los datos del archivo json.

//llamar funcion
cargarTipoDePrestamos();

//DOM trae botones
let solicitud = document.querySelector(".simuladorContent");
let botoneraSimulador = document.querySelector("#botoneraSimulador");

// SOLICITA MONTO PARA COTIZAR
// DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA LA TASA, CREA EL OBJETO Y LO GUARDA EN LOCALSTORAGE

botoneraSimulador.addEventListener("click", function () {
  //DOM
  tasa = document.querySelector("#paquete").value;
  monto = document.querySelector("#monto_solicitado").value;
  plazoSeleccionado = document.querySelector("#plazo").value;

  //VALIDACION DE SELECCION TIPO DE PRESTAMO
  if (tipoDePrestamo.value === "") {
    Swal.fire({
      title: "error! Debe seleccionar un tipo de prestamo",

      text: "Debe completar todos los datos para solicitar el prestamo",

      icon: "error",

      confirmButtonText: "Volver al formulario",
    });
  }
  //VALIDACION DE SELECCION TIPO DE PRESTAMO

  //CALCULA
  let pagoMes = monto / plazoSeleccionado;
  rest = (pagoMes * tasa) / 100;
  pagoMes = pagoMes + rest;
  let detalleCuotas = document.querySelector("#detalleCuotas");
  detalleCuotas.innerHTML = `
    <div class="alert alert-black" roler="alert">
    <h2>De solicitar el credito usted devolveria el prestamo :</h2>
    <h4> 
    En ${plazoSeleccionado} Cuotas de $${pagoMes} .- Pesos
    </h4>
    </div>
    `;
  //CALCULA

  //OBJETO PARA ARMAR EL PAQUETE ACEPTADO
  function Prestamo() {
    this.montoSolicitado = monto;
    this.tasa = tasa;
    this.moneda = moneda;
    this.iva = IVA;
    this.cuotas = plazoSeleccionado;
    this.pagoPorMes = pagoMes;
  }
  //OBJETO PARA ARMAR EL PAQUETE ACEPTADO

  // NUEVO OBJETO A PARTIR DEL  EL PRESTAMO/PAQUETE

  const prestamo1 = new Prestamo(
    monto,
    tasa,
    moneda,
    IVA,
    plazoSeleccionado,
    pagoMes
  );
 

  //GUARDADO DEL OBJETO EN LOCAL STORAGE
  const prestamosOBJ = JSON.stringify(prestamo1);
  localStorage.setItem("prestamo1", prestamosOBJ);
 //GUARDADO DEL OBJETO EN LOCAL STORAGE

  //Monstar informcacion en html avanzada del prestamo
  info.innerHTML = `
    
      <div class="alert alert-dark" ">
      <h4>
            Detalles del préstamo a solicitar: 
      <lo>
      <li>Monto Solicitado = $${prestamo1.montoSolicitado}.-</li>
      <li>Tasa: ${prestamo1.tasa}%</li>
      
      <li>A pagar por mes cuotas de = ${prestamo1.pagoPorMes}.-</li>
      <li>Cantidad de cuotas: ${prestamo1.cuotas}</li>
      
      </lo>
      </h4>
      
      
      
      </div>
      
      
      `;
  //Monstar informcacion en html avanzada del prestamo
});

// DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA LA TASA, CREA EL OBJETO Y LO GUARDA EN LOCALSTORAGE

//RECUPERA LOS DATOS DEL LOCALSTORAGE PARA USARLOS
const prestamo1 = JSON.parse(localStorage.getItem("prestamo1"));

//VARIABLES PARA EN SUBMIT
let nomUserF = document.querySelector("#nameClient");
let emailClient = document.querySelector("#emailClient");
let infoNombre = document.querySelector(".infoNombre");
let infoEmail = document.querySelector(".infoEmail");
let formularioClient = document.querySelector("#formularioClient");
let info = document.querySelector(".info");

//monstrar formulario Y Validaciones


nomUserF.addEventListener("input", function () {
  //VERIFICA QUE NO HAYA CAMPOS VACIOS Y SI LO HAY MUESTRA EL MENSAJE DEBAJO DEL INPUT
  if (nomUserF.value === "") {
    infoNombre.innerHTML = `
    
      <div class="alert alert-danger" role="alert">
      <h5>
      Debes poner un Nombre
      </h5>
      
      
      </div>
      
      
      `;
  }
});
emailClient.addEventListener("input", function () {
  //VERIFICA QUE NO HAYA CAMPOS VACIOS Y SI LO HAY MUESTRA EL MENSAJE DEBAJO DEL INPUT
  if (nomUserF.value === "") {
    infoNombre.innerHTML = `
    
      <div class="alert alert-danger" role="alert">
      <h5>
      Debes poner un un Email Correcto
      </h5>
      
      
      </div>
      
      
      `;
  }
});
//accion de enviar la informacion

const printInfo = formularioClient.addEventListener("submit", function (e) {
  e.preventDefault();
  if (emailClient.value === "" || nomUserF.value === "") {
    Swal.fire({
      title: "error! Faltan Datos en el formulario",

      text: "Debe completar todos los datos para solicitar el prestamo",

      icon: "error",

      confirmButtonText: "Volver al formulario",
    });
  } else {
    const fecha = new Date();

    //OBJETO PARA ARMAR EL PAQUETE a ENVIAR
    function PrestamoParaEnviar() {
      this.montoSolicitado = monto;
      this.tasa = tasa;
      this.moneda = moneda;
      this.iva = IVA;
      this.cuotas = plazoSeleccionado;
      this.nomUserF = nomUserF;
      this.emailClient = emailClient;
      this.fecha = fecha;
    }
    //OBJETO PARA ARMAR EL PAQUETE a ENVIAR
    // NUEVO OBJETO A PARTIR DEL  EL PRESTAMO/PAQUETE

    const PrestamoParaEnviar1 = new PrestamoParaEnviar(
      monto,
      tasa,
      moneda,
      IVA,
      plazoSeleccionado,
      nomUserF,
      emailClient,
      fecha
    );
    // NUEVO OBJETO A PARTIR DEL  EL PRESTAMO/PAQUETE
    const prestamosEnviado = JSON.stringify(PrestamoParaEnviar1);
    localStorage.setItem("PrestamoParaEnviar1", prestamosEnviado);

    Swal.fire({
      title: "success",

      text: "Exelenet, la solicitud fue enviada",

      icon: "success",

      showDenyButton: true,
      /* showCancelButton: true, */
      denyButtonText: "Volver al Sitio",
      confirmButtonText: "Calcular otro prestamo",
    }).then((result) => {
      /* recarga el sitio */
      if (result.isConfirmed) {
        location.reload();
      } else if (result.isDenied) {
        Swal.fire(
          "Si lo deseas puedes presionar el boton Celeste para calcular otro prestamo"
        );
      }
    });
    info.innerHTML = `
    
    <div class="alert alert-dark" ">
    <h4>
    Excelente <span><strong>${nomUserF.value.toUpperCase()}</strong></span> los datos se enviaron correctamente.
    Datos del préstamo: 
    <lo>
    <li>Monto Solicitado = $${PrestamoParaEnviar1.montoSolicitado}.-</li>
    <li>Tasa: ${PrestamoParaEnviar1.tasa}%</li>
    <li>A pagar por mes cuotas de = ${prestamo1.pagoPorMes}.-</li>
    <li>Cantidad de cuotas: ${PrestamoParaEnviar1.cuotas}</li>
    <li>Contacto: ${PrestamoParaEnviar1.emailClient}</li>
    
    </lo>
    </h4>
    
    
    
    </div>
    
    
    `;
  }
});

//RECUPERA LOS DATOS DEL LOCALSTORAGE PARA USARLOS
const PrestamoParaEnviar1 = JSON.parse(
  localStorage.getItem("PrestamoParaEnviar1")
);

//MUESTRA EN EL NAV EL ULTIMO MONTO GUARDADO EN LOCAL STORAGE
ultimoMontoSolicitado = document.querySelector("#ultimoMontoSolicitado");

ultimoMontoSolicitado.innerHTML = `
  <div>
  <p>si ya solicitaste o Calculaste un monto, deberia aparecer aquí abajo "sacado de storage"</p>
  </div>
  <div class="alert alert-dark" ">
  <h6>
  Ùltimo monto Solicitado $ ${PrestamoParaEnviar1.montoSolicitado}.-
  </h6>
  <p> ${PrestamoParaEnviar1.fecha}</p>
  </div>
  
  `;
//MUESTRA EN EL NAV EL ULTIMO MONTO GUARDADO EN LOCAL STORAGE
