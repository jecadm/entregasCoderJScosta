//El monto de la CUOTA Es un gasto fijo.
// Costo Financiero Total (CFT),  TASA de interés
// El plazo para devolverlo HASTA es iguala la cantidad de cuotas

//VARIABLES GLOBALES
let nomUser = "";
let monto = 0;
let tasa = 5;
let moneda = "Pesos";
const IVA = 21;
let cuotas = [1, 3, 6, 12, 24];
let cuotasa = [];
let cuotaSinIva = [];
let cuotasFinal = [];
let cuotasSelec = 0;
let totalC = [];
//Cada cuota está formada por tres partes:
// Una porción del capital a devolver.
// Intereses.
// Impuestos.

// SOLICITA MONTO PARA COTIZAR
monto = parseInt(
  prompt("Ingrese el monto del préstamos a solicitar: ".toLocaleUpperCase())
);
// PROXIMA ENTREGA SE CAMBIARÁ EL TRUE DEL WHILE POR UNA CONDICION, NO ES BUENA PRACTICA USAR BOLEANO AHI
while (true) {
  let num = monto;
  /*
!isNaN(num) = si es diferente
hasta que sea insertado un numero terminará el ciclo
*/
  if (!isNaN(num) && num != null && num != "") {
    alert(
      `Excelente monto, va a solicitar cotizacion por $${num}`.toLocaleUpperCase()
    );
    break;
  } else {
    monto = parseInt(
      prompt("Solo puede Ingresar Números: ".toLocaleUpperCase())
    );
    continue;
  }
}

// FUNCION RECORRE EL ARRAY DE TIPOS DE CUOTAS , DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA EL IVA MAS EL TASA
function recorreCuotas(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    let cantidadCuotas = arr[i];
    let pagoMes = monto / cantidadCuotas;
    rest = (pagoMes * tasa) / 100;
    pagoMes = pagoMes + rest;
    cuotasa.push(`
   En ${arr[i]} Cuotas = $${pagoMes} +IVA`);
    cuotaSinIva.push(pagoMes);
  }
}
// FUNCIÓN RECORRE EL ARRAY DE TIPOS DE CUOTAS , DIVIDE EL MONTO POR LA CUOTAS Y LES AGREGA EL IVA MÁS EL TASA

//LLAMANOS AL FOR Y LE PASAMOS EL PARÁMETRO DE CUOTAS
recorreCuotas(cuotas);

//MOSTRAMOS PARA VALIDACIÓN BORRAR LUEGO
console.log(cuotasa);
console.log(cuotaSinIva);
//MOSTRAMOS PARA VALIDACIÓN BORRAR LUEGO

//PARA SUMARLE EL IVA A LAS CUOTAS FUNCIÓN CREADA A PARTIR DE UNA CONST

const recorreCuotasIva = (arr) => {
  for (let i = 0; i <= arr.length - 1; i++) {
    let pagoxMes = arr[i];
    restFinal = (pagoxMes * IVA) / 100;
    pagoxMes = pagoxMes + restFinal;
    cuotasFinal.push(pagoxMes);
  }
};

//PARA SUMARLE EL IVA A LAS CUOTAS FUNCIÓN CREADA A PARTIR DE UNA CONST

//LLAMAMOS PARA SUMARLE EL IVA A LAS CUOTAS
recorreCuotasIva(cuotaSinIva);

//MOSTRAMOS PARA VALIDACIÓN BORRAR LUEGO
console.log(cuotasFinal);
//MOSTRAMOS PARA VALIDACIÓN BORRAR LUEGO

//SELECCIÓN DE CANTIDAD DE CUOTAS
cuotasSelec = Number(
  prompt(`Selecciones cantidad de cuotas ${cuotasa}: `.toLocaleUpperCase())
);
// PROXIMA ENTREGA SE CAMBIARA EL TRUE DEL WHILE POR UNA CONDICION, NO ES BUENA PRACTICA USAR BOLEANO AHI
while (true) {
  let num = cuotasSelec;
  /*
isNaN(num) =  es igual a
hasta que sea insertado un número terminará el ciclo */
  if (
    isNaN(num) ||
    num === 1 ||
    num === 3 ||
    num === 6 ||
    num === 12 ||
    num === 24
  ) {
    alert(
      `Excelente, va a solicitar cotizacion por "${num}" Cuotas`.toLocaleUpperCase()
    );
    break;
  } else {
    cuotasSelec = parseInt(
      prompt(
        `Solo puedes Seleccionar cantidad de cuotas en pantalla ${cuotasa}: `.toLocaleUpperCase()
      )
    );
    continue;
  }
}

let cuotasSuma = 0;

//SWITCH PARA PRESENTAR LOS RESULTADOS DEPENDIENDO DE LAS CUOTAS SELECCIONADAS.

switch (cuotasSelec) {
  //podría haber usado en los multiplicadores la variable cuotaSelec pero me gusto asi.

  case 1:
    alert(
      `Vas a pagar un total de $${
        cuotasFinal[0] * 1
      }.- en ${cuotasSelec} Cuotas de $${
        cuotasFinal[0]
      }.- Final `.toLocaleUpperCase()
    );

    break;
  case 3:
    alert(
      `Vas a pagar un total de $${
        cuotasFinal[1] * 3
      }.- en ${cuotasSelec} Cuotas de $${
        cuotasFinal[1]
      }.- Final`.toLocaleUpperCase()
    );
    break;
  case 6:
    alert(
      `Vas a pagar un total de $${
        cuotasFinal[2] * 6
      }.- en ${cuotasSelec} Cuotas de $${
        cuotasFinal[2]
      }.- Final`.toLocaleUpperCase()
    );
    break;
  case 12:
    alert(
      `Vas a pagar un total de $${
        cuotasFinal[3] * 12
      }.- en ${cuotasSelec} Cuotas de $${
        cuotasFinal[3]
      }.- Final`.toLocaleUpperCase()
    );
    break;
  case 24:
    alert(
      `Vas a pagar un total de $${
        cuotasFinal[4] * 24
      }.- en ${cuotasSelec} Cuotas de $${
        cuotasFinal[4]
      }.- Final`.toLocaleUpperCase()
    );
    break;
  default:
    cuotasSelec = alert(
      "No ha seleccionado nada: Si lo desea puede volver a intentar el proceso".toLocaleUpperCase()
    );
    break;
}
//SWITCH PARA PRESENTAR LOS RESULTADOS DEPENDIENDO DE LAS CUOTAS SELECCIONADAS.

//SOLICITAR NOMBRE PARA PERSONALIZAR EL PRESTAMO
nomUser = prompt("Ingrese su nombre: ");

//SOLICITAR NOMBRE PARA PERSONALIZAR EL PRESTAMO

//OBJETO PARA ARMAR EL PAQUETE ACEPTADO
function Prestamo() {
  this.nomUser = nomUser;
  this.montoSolicitado = monto;
  this.tasa = tasa;
  this.moneda = moneda;
  this.iva = IVA;
  this.cuotas = cuotasSelec;
  this.cuotasFinal = cuotasFinal;
}
//OBJETO PARA ARMAR EL PAQUETE ACEPTADO

// NUEVO OBJETO A PARTIR DEL USURIO Y EL PRESTAMO

const prestamo1 = new Prestamo(
  nomUser,
  monto,
  tasa,
  moneda,
  IVA,
  cuotasSelec,
  cuotasFinal
);

console.log(prestamo1);
alert(JSON.stringify(prestamo1));
