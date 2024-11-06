document.addEventListener("DOMContentLoaded", async () => {
    const monedaSeleccionada = document.getElementById("moneda-seleccionada");
    const btnEstablecer = document.getElementById("btn-establecer");

    // Función para cargar las monedas del archivo JSON (solo si no está en localStorage)
    async function cargarMonedas() {
        try {
            const response = await fetch("moneda.json");
            const data = await response.json();
            localStorage.setItem("monedas", JSON.stringify(data)); // Guarda los datos iniciales en localStorage
            return data;
        } catch (error) {
            console.error("Error al cargar monedas:", error);
            return [];
        }
    }

    // Cargar las monedas desde localStorage o desde el archivo JSON inicial
    let monedas = JSON.parse(localStorage.getItem("monedas")) || await cargarMonedas();

    // Función para mostrar la moneda base actual
    function mostrarMonedaBase() {
        const monedaBase = monedas.find(moneda => moneda.monedabase);
        if (!monedaBase) return;

        monedaSeleccionada.innerHTML = `
            <div class="card-body d-flex align-items-center text-warning card  justify-content-around" style="background-color: black;">
                <img src="img/banderas/${monedaBase.Img}.png" alt="${monedaBase.Img}" class="flag-icon">
                <span>${monedaBase.Nombre}</span>
                
            </div>
        `;
    }

    // Mostrar moneda base al cargar la página
    mostrarMonedaBase();

    // Función para actualizar el JSON en el servidor
    async function actualizarMonedasEnServidor() {
        try {
            const response = await fetch('http://localhost/fincionPHP/actualizarMoneda.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(monedas)
            });
            const result = await response.json();
            if (result.status === "success") {
                console.log("Moneda base actualizada correctamente en el servidor.");
            } else {
                alert("Error al actualizar la moneda base en el servidor.");
            }
        } catch (error) {
            console.error("Error al guardar moneda base en el servidor:", error);
            alert("No se pudo guardar la nueva moneda base en el servidor.");
        }
    }

    // Cambiar moneda base al hacer clic en el botón
    btnEstablecer.addEventListener("click", () => {
        const nuevaMoneda = prompt("Escribe el nombre de la nueva moneda base (ej. mx, jp, gb, ca, ch)");

        if (nuevaMoneda) {
            // Resetear todas las monedas a monedabase: false
            monedas.forEach(moneda => moneda.monedabase = false);

            // Buscar la nueva moneda base
            const monedaBase = monedas.find(moneda => moneda.Img.toLowerCase() === nuevaMoneda.toLowerCase());

            if (monedaBase) {
                // Asignar la nueva moneda base
                monedaBase.monedabase = true;
                mostrarMonedaBase();

                // Guardar el cambio en localStorage
                localStorage.setItem("monedas", JSON.stringify(monedas));

                // Enviar el cambio al servidor para actualizar el JSON
                actualizarMonedasEnServidor();
            } else {
                alert("Moneda no encontrada.");
            }
        }
    });
});

