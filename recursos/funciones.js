window.addEventListener('load', iniciar);

function iniciar() {
    iniciarMenu();
    iniciarCalculadora();
    iniciarSelectorActividades();
    iniciarValidacionFormulario();
}

function iniciarMenu() {
    const botonesMenu = document.querySelectorAll('.boton-menu');

    botonesMenu.forEach(function (boton) {
        boton.addEventListener('click', function () {
            const navegacion = boton.parentElement.querySelector('nav');
            if (!navegacion) {
                return;
            }

            navegacion.classList.toggle('activo');
            boton.classList.toggle('activo');

            const estaAbierto = navegacion.classList.contains('activo');
            boton.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
        });
    });
}

const actividadesAcademia = {
    boxeo: {
        nombre: 'Boxeo recreativo',
        sede: 'Olivos',
        dias: 'Lunes y miércoles',
        horario: '7:30',
        precio1: 60000,
        precio2: 70000,
        alias: 'marcelobordiez'
    },
    kickMixtoManana: {
        nombre: 'Kick boxing mixto (turno mañana)',
        sede: 'Olivos',
        dias: 'Martes y jueves',
        horario: '11:30',
        precio1: 60000,
        precio2: 70000,
        alias: 'marcelobordiez'
    },
    kickMixtoNoche: {
        nombre: 'Kick boxing mixto (turno noche)',
        sede: 'Olivos',
        dias: 'Martes y jueves',
        horario: '20:00',
        precio1: 60000,
        precio2: 70000,
        alias: 'marcelobordiez'
    },
    kickFemenino: {
        nombre: 'Kick boxing femenino',
        sede: 'Olivos',
        dias: 'Martes y jueves',
        horario: '18:00',
        precio1: 50000,
        precio2: 55000,
        alias: 'bianca.bordiez.mp'
    },
    tkdKidsOlivos: {
        nombre: 'Taekwon-Do Kids',
        sede: 'Olivos',
        dias: 'Lunes y miércoles',
        horario: '17:15',
        precio1: 55000,
        precio2: 65000,
        alias: 'aldubor10.mp'
    },
    tkdInfantilesOlivos: {
        nombre: 'Taekwon-Do Infantiles',
        sede: 'Olivos',
        dias: 'Lunes y miércoles',
        horario: '18:00',
        precio1: 55000,
        precio2: 65000,
        alias: 'bianca.bordiez.mp'
    },
    tkdJuvenilesOlivos: {
        nombre: 'Taekwon-Do Juveniles',
        sede: 'Olivos',
        dias: 'Lunes y miércoles',
        horario: '19:00',
        precio1: 60000,
        precio2: 70000,
        alias: 'marcelobordiez'
    },
    tkdCompetidores: {
        nombre: 'Taekwon-Do Competidores',
        sede: 'Olivos',
        dias: 'Lunes y miércoles',
        horario: '20:00',
        precio1: 60000,
        precio2: 70000,
        alias: 'marcelobordiez'
    },
    tkdKidsMaschwitz: {
        nombre: 'Taekwon-Do Kids',
        sede: 'Ingeniero Maschwitz',
        dias: 'Martes y jueves',
        horario: '17:15',
        precio1: 55000,
        precio2: 65000,
        alias: 'aldubor10.mp'
    },
    tkdInfantilesMaschwitz: {
        nombre: 'Taekwon-Do Infantiles',
        sede: 'Ingeniero Maschwitz',
        dias: 'Martes y jueves',
        horario: '18:00',
        precio1: 55000,
        precio2: 65000,
        alias: 'aldubor10.mp'
    },
    tkdJuvenilesMaschwitz: {
        nombre: 'Taekwon-Do Juveniles',
        sede: 'Ingeniero Maschwitz',
        dias: 'Martes y jueves',
        horario: '19:30',
        precio1: 60000,
        precio2: 70000,
        alias: 'aldubor10.mp'
    }
};

function formatearPesos(valor) {
    return '$' + valor.toLocaleString('es-AR');
}

function iniciarCalculadora() {
    const calculadora = document.querySelector('#calculadora-cuota');
    if (!calculadora) {
        return;
    }

    const opciones = calculadora.querySelectorAll('input[name="actividades-cuota"]');
    const frecuencia = document.querySelector('#frecuencia');
    const medioPago = document.querySelector('#medio-pago');
    const resultado = document.querySelector('#resultado-cuota');
    const aliasContenedor = document.querySelector('#contenedor-alias');
    const aliasTexto = document.querySelector('#alias-pago');
    const copiarAlias = document.querySelector('#copiar-alias');
    const avisoAlias = document.querySelector('#aviso-alias');

    function actualizarCalculadora() {
        const seleccionadas = Array.from(opciones).filter(function (opcion) {
            return opcion.checked;
        });

        if (seleccionadas.length === 0) {
            resultado.textContent = 'Seleccioná al menos una actividad.';
            aliasContenedor.hidden = true;
            return;
        }

        const esPaseLibre = seleccionadas.length >= 2;
        let total;
        let alias;

        if (esPaseLibre) {
            total = 80000;
            alias = 'marcelobordiez';
        } else {
            const actividad = actividadesAcademia[seleccionadas[0].value];
            total = frecuencia.value === '2' ? actividad.precio2 : actividad.precio1;
            alias = actividad.alias;
        }

        resultado.textContent = formatearPesos(total) + ' por mes' +
            (esPaseLibre ? ' — Pase libre (2 o más actividades)' : '');

        if (medioPago.value === 'mercadopago') {
            aliasContenedor.hidden = false;
            aliasTexto.textContent = alias;
            avisoAlias.textContent = esPaseLibre
                ? 'Para el pase libre se utiliza siempre este alias.'
                : 'Alias de Mercado Pago correspondiente a la actividad seleccionada.';
        } else {
            aliasContenedor.hidden = true;
            avisoAlias.textContent = 'Pago en efectivo en la administración de la sede.';
        }

        frecuencia.disabled = esPaseLibre;
        if (esPaseLibre) {
            frecuencia.value = '2';
        }
    }

    opciones.forEach(function (opcion) {
        opcion.addEventListener('change', actualizarCalculadora);
    });
    frecuencia.addEventListener('change', actualizarCalculadora);
    medioPago.addEventListener('change', actualizarCalculadora);

    if (copiarAlias) {
        copiarAlias.addEventListener('click', async function () {
            try {
                await navigator.clipboard.writeText(aliasTexto.textContent);
                avisoAlias.textContent = 'Alias copiado.';
            } catch (error) {
                avisoAlias.textContent = 'No se pudo copiar automáticamente. Seleccioná y copiá el alias.';
            }
        });
    }

    actualizarCalculadora();
}

function iniciarSelectorActividades() {
    const selector = document.querySelector('#selector-actividad');
    if (!selector) {
        return;
    }

    const detalle = document.querySelector('#detalle-actividad');
    const reservar = document.querySelector('#reservar-actividad');

    function mostrarDetalle() {
        const actividad = actividadesAcademia[selector.value];

        if (!actividad) {
            detalle.textContent = 'Elegí una actividad para consultar los días, el horario y la sede.';
            reservar.removeAttribute('href');
            reservar.classList.add('boton-deshabilitado');
            return;
        }

        detalle.innerHTML = '<strong>' + actividad.nombre + '</strong><br>' +
            '<span>Sede:</span> ' + actividad.sede + '<br>' +
            '<span>Días:</span> ' + actividad.dias + '<br>' +
            '<span>Horario:</span> ' + actividad.horario + ' hs';
        reservar.href = 'contacto.html?actividad=' + encodeURIComponent(selector.value) +
            '&sede=' + encodeURIComponent(actividad.sede);
        reservar.classList.remove('boton-deshabilitado');
    }

    selector.addEventListener('change', mostrarDetalle);
    mostrarDetalle();
}

function iniciarValidacionFormulario() {
    const formulario = document.querySelector('.form-contacto');
    if (!formulario) {
        return;
    }

    const campos = formulario.querySelectorAll('input[required], select[required], textarea[required]');

    function validarCampo(campo) {
        const esValido = campo.checkValidity();
        campo.classList.toggle('campo-invalido', !esValido);
        campo.classList.toggle('campo-valido', esValido && campo.value.trim() !== '');
        campo.setAttribute('aria-invalid', esValido ? 'false' : 'true');
        return esValido;
    }

    campos.forEach(function (campo) {
        campo.addEventListener('input', function () {
            validarCampo(campo);
        });
        campo.addEventListener('change', function () {
            validarCampo(campo);
        });
        campo.addEventListener('blur', function () {
            validarCampo(campo);
        });
    });

    formulario.addEventListener('submit', function (evento) {
        let formularioValido = true;

        campos.forEach(function (campo) {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            evento.preventDefault();
        } else {
            // El formulario todavía no tiene un servidor que reciba los datos.
            // Evitamos que parezca que la solicitud se envió realmente.
            evento.preventDefault();
            alert('¡Formulario validado! Para recibir solicitudes reales, falta conectarlo a un servicio o servidor.');
        }
    });

    const parametros = new URLSearchParams(window.location.search);
    const actividad = parametros.get('actividad');
    const sede = parametros.get('sede');
    const campoActividad = document.querySelector('#actividad');
    const campoSede = document.querySelector('#sede');

    const equivalenciasActividad = {
        tkdKidsOlivos: 'tkd-kids',
        tkdKidsMaschwitz: 'tkd-kids',
        tkdInfantilesOlivos: 'tkd-infantiles',
        tkdInfantilesMaschwitz: 'tkd-infantiles',
        tkdJuvenilesOlivos: 'tkd-adultos',
        tkdJuvenilesMaschwitz: 'tkd-adultos',
        tkdCompetidores: 'tkd-adultos',
        kickFemenino: 'kick-femenino',
        kickMixtoManana: 'kick-mixto',
        kickMixtoNoche: 'kick-mixto',
        boxeo: 'boxeo'
    };

    if (actividad && campoActividad && equivalenciasActividad[actividad]) {
        campoActividad.value = equivalenciasActividad[actividad];
    }

    if (sede && campoSede) {
        campoSede.value = sede.toLowerCase().includes('olivos') ? 'olivos' : 'maschwitz';
    }
}
