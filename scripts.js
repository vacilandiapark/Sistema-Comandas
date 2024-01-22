// Objeto para almacenar los elementos en la canasta con su respectiva cantidad
const canasta = {};

// Función para agregar elementos a la canasta
function agregarItem(elemento) {
    let plato;

    if (elemento.querySelector('h1')) {
        // Si hay un h1 dentro del elemento, obtén su texto
        plato = elemento.querySelector('h1').textContent;
    } else {
        // Si no hay h1, utiliza el texto del elemento directamente
        plato = elemento.textContent;
    }

    // Verificar si el plato ya está en la canasta
    if (canasta.hasOwnProperty(plato)) {
        // Si está en la canasta, incrementar la cantidad
        canasta[plato]++;
    } else {
        // Si no está en la canasta, agregarlo con cantidad 1
        canasta[plato] = 1;
    }

    actualizarCanasta();
}

// Función para actualizar la lista de la canasta en la interfaz
// Función para actualizar la lista de la canasta en la interfaz
function actualizarCanasta() {
    const listaCanasta = document.getElementById('listaCanasta');
    listaCanasta.innerHTML = '';

    // Recorrer el objeto canasta y agregar elementos a la lista
    for (const [plato, cantidad] of Object.entries(canasta)) {
        // Excluir los elementos del formulario
        if (plato !== 'Numero de Boleta' && plato !== 'Nombre Cliente' && plato !== 'Notas') {
            const li = document.createElement('li');
            li.textContent = `(${cantidad}x) ${plato}`;
            listaCanasta.appendChild(li);
        }
    }
}


// Función para imprimir la canasta
function imprimirCanasta() {
    // Abre la ventana de impresión del navegador
    window.print();

    // Limpiar la canasta después de imprimir
    canasta.length = 0;
    actualizarCanasta();
}

function toggleContainer(categoria) {
    // Obtener el contenedor asociado a la categoría
    var contenedor = categoria.nextElementSibling;

    // Alternar la visibilidad del contenedor
    contenedor.style.display = (contenedor.style.display === 'none' || contenedor.style.display === '') ? 'grid' : 'none';
}

// Función para obtener la fecha y hora actual en formato (dd/mm/yy hh:mm:ss)
function obtenerFechaHora() {
    const ahora = new Date();
    const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return ahora.toLocaleString('es-ES', opciones);
}

// Función para actualizar la fecha y hora en el elemento HTML
function actualizarFechaHora() {
    const fechaHoraElemento = document.getElementById('fechaHora');
    fechaHoraElemento.textContent = obtenerFechaHora();
}

// Llamar a la función inicialmente para mostrar la fecha y hora actual
actualizarFechaHora();

// Configurar una actualización automática cada segundo (1000 milisegundos)
setInterval(actualizarFechaHora, 1000);

function actualizarCanastaFormulario() {
    // Obtener los valores del formulario
    const numeroBoleta = document.getElementById('numeroBoleta').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const notas = document.getElementById('notas').value;

    // Actualizar la canasta con los valores del formulario
    canasta['Numero de Boleta'] = numeroBoleta;
    canasta['Nombre Cliente'] = nombreCliente;
    canasta['Notas'] = notas;

    // Actualizar el contenido del contenedor con los datos del formulario
    const datosFormularioContainer = document.getElementById('datosFormulario');
    datosFormularioContainer.innerHTML = `
        <p><strong>NUMERO DE BOLETA:</strong> ${numeroBoleta}</p>
        <p><strong>NOMBRE CLIENTE:</strong> ${nombreCliente}</p>
        <p><strong>NOTAS:</strong> ${notas}</p>
    `;

    // Llamar a la función que actualiza la lista de la canasta
    actualizarCanasta();
}

function borrarDatos() {
    // Limpiar datos del formulario
    document.getElementById('numeroBoleta').value = '';
    document.getElementById('nombreCliente').value = '';
    document.getElementById('notas').value = '';

    // Limpiar datos de la canasta y el contenedor de datos del formulario
    canasta.length = 0;
    actualizarCanasta();

    // Limpiar contenido del contenedor de datos del formulario
    const datosFormularioContainer = document.getElementById('datosFormulario');
    datosFormularioContainer.innerHTML = '';

    // Limpiar contenido del contenedor de la lista de la canasta
    const listaCanasta = document.getElementById('listaCanasta');
    listaCanasta.innerHTML = '';

    // Recargar la página para restablecer todo
    location.reload();
}