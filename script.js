// =======================================
// TARIFAS DE TRANSPORTE v5.0
// =======================================

let tarifas = [];

let tomDestino = null;

const selectDestino = document.getElementById("destino");
const selectTipo = document.getElementById("tipo");

const resultado = document.getElementById("resultado");

// ==========================
// Normalizar texto
// ==========================

function normalizar(texto){

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .trim()
        .toUpperCase();

}

// ==========================
// Cargar JSON
// ==========================

fetch("tarifas.json")

.then(response => response.json())

.then(datos => {

    tarifas = datos.sort((a,b)=>
        a.DESTINO.localeCompare(b.DESTINO,"es")
    );

    tarifas.forEach(item=>{

        const option=document.createElement("option");

        option.value=item.DESTINO;

        option.textContent=item.DESTINO;

        selectDestino.appendChild(option);

    });

    tomDestino = new TomSelect("#destino",{

        create:false,

        maxOptions:15,

        placeholder:"Buscar destino...",

        allowEmptyOption:true

    });

    tomDestino.on("change",mostrarTarifa);

})

.catch(error=>{

    console.error(error);

    resultado.innerHTML="<div class='precio'>ERROR</div>";

});

// ==========================
// Cambio transporte
// ==========================

selectTipo.addEventListener("change",mostrarTarifa);

// ==========================
// Mostrar tarifa
// ==========================

function mostrarTarifa(){

    const destino = tomDestino.getValue();

    if(destino===""){

        resultado.innerHTML=`

            <div class="precio">-- €</div>

            <div class="destino">
                Seleccione un destino
            </div>

            <div class="vehiculo"></div>

        `;

        return;

    }

    const fila = tarifas.find(item=>

        normalizar(item.DESTINO)===normalizar(destino)

    );

    if(!fila){

        resultado.innerHTML=`

            <div class="precio">-- €</div>

            <div class="destino">
                Destino no encontrado
            </div>

        `;

        return;

    }

    const tipo = selectTipo.value;

    let precio = Number(fila[tipo]);

    // Redondear SOLO Pesado Particular
    if(tipo==="PESADO PARTICULAR"){

        precio=Math.round(precio);

    }

    resultado.innerHTML=`

        <div class="precio">

            ${precio.toLocaleString("es-ES")} €

        </div>

        <div class="destino">

            ${fila.DESTINO}

        </div>

        <div class="vehiculo">

            ${selectTipo.options[selectTipo.selectedIndex].text}

        </div>

    `;

}
