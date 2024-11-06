document.addEventListener("DOMContentLoaded", () => {
    let monedas = JSON.parse(localStorage.getItem("monedas")) || [];
    const monedaDeCambio = monedas.find(moneda => moneda.monedadeCambio);

    // Verificar si se encontró la moneda de cambio
    if (monedaDeCambio) {
        const valorCompra = monedaDeCambio.valor; // Obtener el valor de compra
        const valorVenta = monedaDeCambio.venta; // Obtener el valor de venta

        // Mostrar los valores de compra y venta en el contenedor de resultados
        document.getElementById('total').innerHTML = `
            <p>Valor de compra: $${valorCompra}</p>
            <p>Valor de venta: $${valorVenta}</p>
             <p>************************************</p>
        `;

        // Evento para el botón de comprar
        document.getElementById('btnComprar').addEventListener('click', () => {
            const cantidad = parseFloat(document.getElementById('cantidad').value);
            if (cantidad > 0) {
                const total = cantidad * valorCompra;
                document.getElementById('total').innerHTML = `
                    <p>Valor de compra: $${valorCompra}</p>
                    <p>Valor de venta: $${valorVenta}</p>
                    <p>************************************</p>
                    <p>Total compra: $${total.toFixed(2)}</p>
                `;
            } else {
                alert("Por favor, ingresa una cantidad válida.");
            }
        });

        // Evento para el botón de vender
        document.getElementById('btnVender').addEventListener('click', () => {
            const cantidad = parseFloat(document.getElementById('cantidad').value);
            if (cantidad > 0) {
                const total = cantidad * valorVenta;
                document.getElementById('total').innerHTML = `
                    <p>Valor de compra: $${valorCompra}</p>
                    <p>Valor de venta: $${valorVenta}</p>
                    <p>************************************</p>
                    <p>Total venta: $${total.toFixed(2)}</p>
                `;
            } else {
                alert("Por favor, ingresa una cantidad válida.");
            }
        });
    } else {
        console.warn("No se encontró ninguna moneda de cambio en el localStorage.");
    }
});
