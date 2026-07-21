// ============================================
// TARIFAS DE TRANSPORTE
// Versión 4.0
// ============================================

let tarifas = [];

const destino = document.getElementById("destino");
const tipo = document.getElementById("tipo");
const resultado = document.getElementById("resultado");

// Normalizar texto
function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}

// Cargar tarifas
fetch("tarifas.json")
    .then(response => response.json())
    .then(datos => {

        tarifas = datos;

        // Añadir destinos al desplegable
        datos
            .sort((a, b) => a.DESTINO.localeCompare(b.DESTINO))
            .forEach(item => {

                const option = document.createElement("option");

                option.value = item.DESTINO;
                option.textContent = item.DESTINO;

                destino.appendChild(option);

            });

        // Activar Tom Select
        new TomSelect("#destino", {

            create: false,

            sortField: {
                field: "text",
                direction: "asc"
            },

            placeholder: "Buscar destino...",

            onChange: function () {

                buscarPrecio();

            }

        });

    });

function buscarPrecio() {

    if (destino.value === "") {

        resultado.innerHTML = "Selecciona un destino";
        resultado.style.color = "#666";
        return;

    }

    const pueblo = normalizar(destino.value);

    const fila = tarifas.find(item =>
        normalizar(item.DESTINO) === pueblo
    );

    if (!fila) {

        resultado.innerHTML = "Destino no encontrado";
        resultado.style.color = "#dc3545";
        return;

    }

    const precio = Number(fila[tipo.value]);

    resultado.innerHTML = `
        <div class="precio-card">

            <div class="precio-destino">${fila.DESTINO}</div>

            <div class="precio-tipo">${tipo.options[tipo.selectedIndex].text}</div>

            <div class="precio-total">${precio.toFixed(2)} €</div>

        </div>
    `;

    resultado.style.color = "#198754";

}

tipo.addEventListener("change", buscarPrecio);
