/* Campos del formulario */
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

/* UI */
const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        
    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {
        /* crear el div */
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        /* agregar clase en base al tipo de error */
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        /* MENSAJE DE ERROR */
        divMensaje.textContent =  mensaje;

        /* AGREGAR AL DOM */
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        /* QUITAR LA ALERTA DESPUES DE 5 SEGUNDOS */

        setTimeout( () => {
            divMensaje.remove();
        }, 3000 );
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach( cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            /* SCRIPTING DE LOS ELEMENTOS DE LA CITA */
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;



            /* AGREGAR LOS PARRAFOS AL DIVCITA */
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            /* AGREGAR LAS CITAS AL HTML */
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild )
            
        }
    }

}

const ui = new UI();
const administrarCitas = new Citas();


/* REGISTRAR EVENTOS */
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

    formulario.addEventListener('submit', nuevaCita);
    
}

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
function datosCita(e) {
    citaObj [e.target.name] = e.target.value;

}

/* valida y agrega una nueva cita a la clase de citas */

function nuevaCita(e) {
    e.preventDefault();

    /* EXTRAER LA INFORMACION DEL OBJETO CITA */

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    /* validar */
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
       ui.imprimirAlerta('todos los campos son obligatorios', 'error');

        return;
        
    }

    /* GENERAR UN ID UNICO */
    citaObj.id = Date.now();

    /* CREANDO UNA NUEVA CITA */
    administrarCitas.agregarCita({...citaObj});

    /* REINICIAR EL OBJETO PARA VALIDACION */

    reinicarObjeto();

  /* REINICIAR EL FORMULARIO */
  formulario.reset();

}

/* MOSTRAR EL HTML DE LAS CITAS */
ui.imprimirCitas(administrarCitas);



function reinicarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
    
}