import Citas from './js/clases/Citas.js';
import UI from './js/clases/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';



const ui = new UI();
const administrarCitas = new Citas();
let editando = false;

/* OBJETO CON INFORMACION DE LA CITA */
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

/* AGREGA DATOS AL OBJETO CITA */
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

/* valida y agrega una nueva cita a la clase de citas */

export function nuevaCita(e) {
  e.preventDefault();

  /* EXTRAER LA INFORMACION DEL OBJETO CITA */

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  /* validar */
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("todos los campos son obligatorios", "error");

    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado Correctamente");

    /* PASAR EL OBJETO DE LA CITA A EDICION */

    administrarCitas.editarCita({ ...citaObj });

    /* regreesa el texto de boton al original */

    formulario.querySelector('button[type="submit"]').textContent =
      "Crear Cita";

    /* QUITA EL MODO EDICION */
    editando = false;

    /* PASAR EL OBJETO DE LA CITA A EDICION */
  } else {
    /* GENERAR UN ID UNICO */
    citaObj.id = Date.now();

    /* CREANDO UNA NUEVA CITA */
    administrarCitas.agregarCita({ ...citaObj });

    /* MENSAJE DE AGREGADO CORRECTAMENTE */
    ui.imprimirAlerta("Se agrego correctamente");
  }

  /* REINICIAR EL OBJETO PARA VALIDACION */

  reinicarObjeto();

  /* REINICIAR EL FORMULARIO */
  formulario.reset();

  /* MOSTRAR EL HTML DE LAS CITAS */
  ui.imprimirCitas(administrarCitas);
}



export function reinicarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

export function eliminarCita(id) {
  /* eliminar la cita */

  administrarCitas.eliminarCita(id);

  /* muestre un mensaje */

  ui.imprimirAlerta("la cita se elimino correctamente");

  /* refrescar las citas  */

  ui.imprimirCitas(administrarCitas);
}

/* CARGA LOS DATOS Y EL MODO EDICION */

export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  /* llenar los inputs */

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  /* LLENAR EL OBJETO */

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  /* CAMBIAR EL TEXTO DEL BOTON */

  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";

  editando = true;
}

