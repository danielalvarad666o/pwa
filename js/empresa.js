document.addEventListener("DOMContentLoaded", () => {
    const configForm = document.getElementById("configForm");

    // Evento al enviar el formulario
    configForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        // Obtener los valores de los campos
        const nombreEmpresa = document.getElementById("nombreEmpresa").value;
        const direccionEmpresa = document.getElementById("direccionEmpresa").value;
        const ciudad = document.getElementById("ciudad").value;
        const estado = document.getElementById("estado").value;

        // Crear un objeto JSON con los datos
        const empresaData = {
            nombre: nombreEmpresa,
            direccion: direccionEmpresa,
            ciudad: ciudad,
            estado: estado
        };

        // Guardar el objeto JSON en localStorage
        localStorage.setItem("empresaConfig", JSON.stringify(empresaData));

        // Opcional: Confirmación de guardado
        alert("Datos guardados correctamente");

        // Cerrar el modal
        const modalElement = document.getElementById("configModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });
});
