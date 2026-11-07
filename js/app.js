document.addEventListener("DOMContentLoaded", () => {
    // 1. GESTIÓN DEL FORMULARIO DE NUEVA RESERVA (P02 y P02_error)
    const formReserva = document.getElementById("form-reserva");
    if (formReserva) {
        formReserva.addEventListener("submit", (e) => {
            e.preventDefault();

            const recurso = document.getElementById("recurso").value;
            const fecha = document.getElementById("fecha").value;
            const horaInicio = document.getElementById("hora-inicio").value;
            const horaFin = document.getElementById("hora-fin").value;

            // Simulación de validación de cruce de horario (según el documento: P02_error)
            // Supongamos que la Sala A en la fecha 2026-11-05 ya tiene una reserva de 10:00 a 11:00[span_1](start_span)[span_1](end_span)
            if (recurso === "sala-a" && fecha === "2026-11-05" && horaInicio === "10:30" && horaFin === "11:30") {
                const alertaError = document.getElementById("mensaje-error");
                if (alertaError) {
                    alertaError.style.display = "block";
                    alertaError.focus();
                }
                return; // Detiene el envío si hay conflicto
            }

            // Si es válido, guardamos en localStorage para simular el registro (ID 101)[span_2](start_span)[span_2](end_span)
            const nuevaReserva = {
                id: 101,
                recurso: recurso === "sala-a" ? "Sala A" : "Sala B",
                fecha: fecha,
                horaInicio: horaInicio,
                horaFin: horaFin,
                estado: "Activa"
            };

            localStorage.setItem("ultimaReserva", JSON.stringify(nuevaReserva));
            
            // Redirige a la pantalla de confirmación (P03)[span_3](start_span)[span_3](end_span)
            window.location.href = "confirmacion.html";
        });
    }

    // 2. GESTIÓN DE LA PANTALLA DE MIS RESERVAS (P04 y P04_vacio)[span_4](start_span)[span_4](end_span)
    const contenedorMisReservas = document.querySelector(".lista-tarjetas");
    if (contenedorMisReservas) {
        const reservaGuardada = JSON.parse(localStorage.getItem("ultimaReserva"));
        
        if (reservaGuardada) {
            contenedorMisReservas.innerHTML = `
                <article class="tarjeta-reserva">
                    <div class="info-reserva">
                        <span class="id-reserva">ID: ${reservaGuardada.id}</span>
                        <h3>${reservaGuardada.recurso}</h3>
                        <p>Fecha: ${reservaGuardada.fecha} | ${reservaGuardada.horaInicio} - ${reservaGuardada.horaFin}</p>
                        <span class="badge activa">${reservaGuardada.estado}</span>
                    </div>
                    <div class="acciones-tarjeta">
                        <a href="detalle.html" class="btn-secundario">Ver detalle</a>
                    </div>
                </article>
            `;
        } else {
            // Mostrar estado vacío si no hay registros (P04_vacio)[span_5](start_span)[span_5](end_span)
            contenedorMisReservas.innerHTML = `
                <div class="estado-vacio">
                    <p>Aún no tienes reservas. Consulta los espacios disponibles para crear la primera[span_6](start_span)[span_6](end_span).</p>
                    <a href="index.html" class="btn-primario" style="margin-top: 1rem;">Consultar disponibilidad</a>
                </div>
            `;
        }
    }

    // 3. GESTIÓN DE CANCELACIÓN EN DETALLE DE RESERVA (P05)[span_7](start_span)[span_7](end_span)
    const btnCancelar = document.querySelector(".btn-peligro");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
                localStorage.removeItem("ultimaReserva");
                alert("Reserva cancelada y actualizada exitosamente[span_8](start_span)[span_8](end_span).");
                window.location.href = "mis-reservas.html";
            }
        });
    }
});