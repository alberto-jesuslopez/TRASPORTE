// ================================
// TARIFAS DE TRANSPORTE
// ================================

let tarifas = [];

// Cargar el archivo JSON
fetch("tarifas.json")
    .then(response => response.json())
    .then(data => {

        tarifas = data;

        // Rellenar la lista de pueblos
        const lista = document.getElementById("listaDestinos");

        data.forEach(item => {

            const option = document.createElement("option");
            option.value = item.DESTINO;
            lista.appendChild(option);

        });

    })
    .catch(error => {

        console.error("Error cargando tarifas:", error);

        document.getElementById("resultado").innerHTML =
            "No se ha podido cargar el archivo de tarifas.";

    });


// ================================
// Buscar precio
// ================================

function buscarPrecio() {

    const destino = document
        .getElementById("destino")
        .value
        .trim()
        .toUpperCase();

    let tipo = document.getElementById("tipo").value;

    // Compatibilidad con el nombre de la columna del Excel
    if (tipo === "PESADO PARTICULAR") {
        tipo = "PESADO PARTICULAR ";
    }

    const resultado = document.getElementById("resultado");

    const tarifa = tarifas.find(item =>
        item.DESTINO.trim().toUpperCase() === destino
    );

    if (!tarifa) {

        resultado.style.color = "#dc3545";
        resultado.innerHTML = "❌ Destino no encontrado";

        return;
    }

    const precio = tarifa[tipo];

    if (precio === undefined || precio === null || precio === "") {

        resultado.style.color = "#dc3545";
        resultado.innerHTML = "❌ Tarifa no disponible";

        return;
    }

    resultado.style.color = "#198754";
    resultado.innerHTML = Number(precio).toFixed(2) + " €";

}
