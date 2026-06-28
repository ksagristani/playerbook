// ===== PLAYERBOOK v1.0 =====

let estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {
    partidos: 0,
    goles: 0,
    asistencias: 0,
    tiros: 0,
    amarillas: 0,
    rojas: 0
};

let partidos = JSON.parse(localStorage.getItem("partidos")) || [];

const modal = document.getElementById("modal");

const btnNuevo = document.getElementById("btnNuevo");
const btnGuardar = document.getElementById("guardar");
const btnCerrar = document.getElementById("cerrar");

btnNuevo.addEventListener("click", abrirModal);
btnCerrar.addEventListener("click", cerrarModal);
btnGuardar.addEventListener("click", guardarPartido);

actualizarPantalla();

function abrirModal() {
    modal.style.display = "flex";
}

function cerrarModal() {
    modal.style.display = "none";
}

function guardarPartido() {

    const rival = document.getElementById("rival").value.trim();
    const resultado = document.getElementById("resultado").value.trim();

    if (rival === "") {
        alert("Ingresá el rival.");
        return;
    }

    const partido = {
        fecha: new Date().toLocaleDateString(),
        rival,
        resultado,
        goles: Number(document.getElementById("golesPartido").value),
        asistencias: Number(document.getElementById("asistenciasPartido").value),
        tiros: Number(document.getElementById("tirosPartido").value),
        amarillas: Number(document.getElementById("amarillasPartido").value),
        rojas: Number(document.getElementById("rojasPartido").value)
    };

    partidos.unshift(partido);

    estadisticas.partidos++;
    estadisticas.goles += partido.goles;
    estadisticas.asistencias += partido.asistencias;
    estadisticas.tiros += Number(partido.tiros || 0);
    estadisticas.amarillas += partido.amarillas;
    estadisticas.rojas += partido.rojas;

    localStorage.setItem("estadisticas", JSON.stringify(estadisticas));
    localStorage.setItem("partidos", JSON.stringify(partidos));

    actualizarPantalla();

    limpiarFormulario();

    cerrarModal();
}

function actualizarPantalla() {

    document.getElementById("partidos").textContent = estadisticas.partidos;
    document.getElementById("goles").textContent = estadisticas.goles;
    document.getElementById("asistencias").textContent = estadisticas.asistencias;
    document.getElementById("tiros").textContent = estadisticas.tiros;
    document.getElementById("amarillas").textContent = estadisticas.amarillas;
    document.getElementById("rojas").textContent = estadisticas.rojas;

    mostrarHistorial();

}

function mostrarHistorial() {

    const lista = document.getElementById("listaPartidos");

    if (partidos.length === 0) {

        lista.innerHTML = '<div class="empty">Todavía no registraste partidos.</div>';
        return;

    }

    lista.innerHTML = "";

    partidos.forEach(partido => {

        lista.innerHTML += `

        <div class="partido">

            <h3>🆚 ${partido.rival}</h3>

            <p>📅 ${partido.fecha}</p>

            <p>🏆 ${partido.resultado}</p>

            <p>⚽ ${partido.goles} &nbsp;&nbsp; 🎯 ${partido.asistencias}</p>

        </div>

        `;

    });

}

function limpiarFormulario() {

    document.getElementById("rival").value = "";
    document.getElementById("resultado").value = "";

    document.getElementById("golesPartido").value = 0;
    document.getElementById("asistenciasPartido").value = 0;
    document.getElementById("tirosPartido").value = 0;
    document.getElementById("amarillasPartido").value = 0;
    document.getElementById("rojasPartido").value = 0;

}

// Cerrar modal haciendo clic fuera de la ventana

window.addEventListener("click", function(e){

    if(e.target === modal){

        cerrarModal();

    }

});