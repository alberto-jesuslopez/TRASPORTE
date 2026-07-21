let tarifas = [];

// Cargar el archivo de tarifas
fetch("tarifas.json")
    .then(res => res.json())
    .then(datos => {

        tarifas = datos;

        const lista = document.getElementById("listaDestinos");

        datos.forEach(item => {

            const option = document.createElement("option");
            option.value = item.DESTINO;
            lista.appendChild(option);

        });

    });

function buscarPrecio(){

    const destino = document
        .getElementById("destino")
        .value
        .trim()
        .toUpperCase();

    const tipo = document.getElementById("tipo").value;

    const resultado = document.getElementById("resultado");

    const tarifa = tarifas.find(t => t.DESTINO.toUpperCase() === destino);

    if(!tarifa){

        resultado.style.color = "#dc3545";
        resultado.innerHTML = "Destino no encontrado";
        return;

    }

    resultado.style.color = "#198754";
    resultado.innerHTML = tarifa[tipo].toFixed(2) + " €";

}
