// Array para almacenar los elementos en la canasta
const canasta = [];

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

    canasta.push(plato);
    actualizarCanasta();
}

// Función para actualizar la lista de la canasta en la interfaz
function actualizarCanasta() {
    const listaCanasta = document.getElementById('listaCanasta');
    listaCanasta.innerHTML = '';
    canasta.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaCanasta.appendChild(li);
    });
}

// Función para imprimir la canasta
function imprimirCanasta() {
    // Abre la ventana de impresión del navegador
    window.print();

    // Limpiar la canasta después de imprimir
    canasta.length = 0;
    actualizarCanasta();
}