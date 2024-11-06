document.addEventListener("DOMContentLoaded", () => {
    // Cargar las monedas desde localStorage
    let monedas = JSON.parse(localStorage.getItem("monedas")) || [];

    // Buscar la moneda base
    const monedaBase = monedas.find(moneda => moneda.monedabase);

    if (monedaBase) {
        // Actualizar el contenido del div con la moneda base
        document.getElementById("moneda-seleccionada").innerHTML = `
            <div class="card-body d-flex align-items-center justify-content-around">
                <img src="img/banderas/${monedaBase.Img}.png" alt="${monedaBase.Img}" class="flag-icon">
                <span>🇲🇽</span>
                <div>
                    <p class="m-0">${monedaBase.Nombre}</p>
                </div>
                
            </div>
        `;
    } else {
        console.warn("No se encontró ninguna moneda base en el localStorage.");
    }
});
