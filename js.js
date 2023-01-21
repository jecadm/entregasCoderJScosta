//VARIABLES GLOBALES YA SE QUE HYA VARIABLE QUE NO SE USAN AHORA Y MUCHOS ARRAY VACIOS SON ARA MAS ADELANTA LAS USO DE GUIA
let tipoDePreastamo = "";
let nomUser = "";
/* let monto = 0; */
let tasa = 0;
let moneda = "Pesos";
const IVA = 21;
let cuotas = [1, 3, 6, 12, 24, 36];
let cuotasa = [];
let cuotaSinIva = [];
let cuotasFinal = [];
let plazoSeleccionado = 0;
let totalC = [];
/* let paquete = ""; */
let cuotasSuma = 0;


//seleccion de elemento en html interaccion DOM
const tipoDePrestamo = document.querySelector("#paquete");




// funcion para traer los datos del archivo db.json.
const cargarTipoDePrestamos = ()=>{
  
 

 const fetchP =  fetch("./db.json")
 .then((res) => res.json())

   .then((db) => {

    /* objetos array y metodos de arrays forEach */
    db.forEach(TDPrestamo => {
      
      const option = document.createElement("option");
      
      
      option.innerHTML = `
      ${TDPrestamo.producto}
      
      `
      /* option.setAttribute("value",TDPrestamo.id) */ 
      option.setAttribute("value",TDPrestamo.tasa) 
       ;
       
       /* console.log(option );  */
       tipoDePrestamo.append(option);
       
       
      }); 
    });
  
    
  };
  // funcion para traer los datos del archivo json.
  
  //llamar funcion
  cargarTipoDePrestamos()
  
  // SOLICITA MONTO PARA COTIZAR
  
  //DOM
  let solicitud = document.querySelector(".simuladorContent");
  let botoneraSimulador = document.querySelector("#botoneraSimulador");
  
  // DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA LA TASA, CREA EL OBJETO Y LO GUARDA EN LOCALSTORAGE
  
  botoneraSimulador.addEventListener("click", function () {
    //DOM
    tasa = document.querySelector("#paquete").value; 
    monto = document.querySelector("#monto_solicitado").value;
    plazoSeleccionado = document.querySelector("#plazo").value;
    
    
    
    
    /* let cantidadCuotas = plazoSeleccionado; */
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
    // NUEVO OBJETO A PARTIR DEL  EL PRESTAMO/PAQUETE
    
    //GUARDADO DEL OBJETO EN LOCAL STORAGE
    const prestamosOBJ = JSON.stringify(prestamo1);
    localStorage.setItem("prestamo1", prestamosOBJ);




  });
  
  // DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA LA TASA, CREA EL OBJETO Y LO GUARDA EN LOCALSTORAGE
  
  //RECUPERA LOS DATOS DEL LOCALSTORAGE PARA USARLOS
  const prestamo1 = JSON.parse(localStorage.getItem("prestamo1"));
  
  //MUESTRA EN EL NAV EL ULTIMO MONTO GUARDADO EN LOCAL STORAGE
  ultimoMontoSolicitado = document.querySelector("#ultimoMontoSolicitado");
  
  ultimoMontoSolicitado.innerHTML = `
  
  <div class="alert alert-dark" ">
  <h6>
  Ùltimo monto solicitado ${prestamo1.montoSolicitado}
  </h6>
  </div>
  `;
  //MUESTRA EN EL NAV EL ULTIMO MONTO GUARDADO EN LOCAL STORAGE
  
  //VARIABLES PARA EN SUBMIT
  let nomUserF = document.querySelector("#nameClient");
  let emailClient = document.querySelector("#emailClient");
  let infoNombre = document.querySelector(".infoNombre");
let infoEmail = document.querySelector(".infoEmail");

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
  if (emailClient.value === "") {
    infoEmail.innerHTML = `
    
    <div class="alert alert-danger" role="alert">
    <h5>
    Debes poner un correo valido
    </h5>
    
    
    </div>
    
    
    `;
  }
});

let formularioClient = document.querySelector("#formularioClient");
let info = document.querySelector(".info");

//monstrar formulario

const printInfo = formularioClient.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML = `
  
  <div class="alert alert-dark" ">
  <h4>
  Excelente ${nomUserF.value} los datos se enviaron correctamente.
  Datos del préstamo: 
  <lo>
  <li>Monto Solicitado = $${prestamo1.montoSolicitado}.-</li>
  <li>Tasa: ${prestamo1.tasa}%</li>
  
  <li>A pagar por mes cuotas de = ${prestamo1.pagoPorMes}.-</li>
  <li>Cantidad de cuotas: ${prestamo1.cuotas}</li>
  
  </lo>
  </h4>
  
  
  
  </div>
  
  
  `;
});

//BOTON PARA RECARGAR LA PAGINA PARA PODER SOLICITAR OTRO CALCULO
let refresh = document.querySelector("#refresh");
refresh.addEventListener("click", (_) => {
  location.reload();
});

//LLAMANDO A LAS FUNCIONES