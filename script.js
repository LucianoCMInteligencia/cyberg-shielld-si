function mostrarAlerta() {
  alert("Gracias por tu interés. Nos pondremos en contacto contigo pronto.");
}

document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('cookie-banner');
  const botonAceptar = document.getElementById('aceptar-cookies');

  if (banner && botonAceptar && !localStorage.getItem('cookiesAceptadas')) {
    banner.style.display = 'block';
    botonAceptar.addEventListener('click', function () {
      localStorage.setItem('cookiesAceptadas', 'true');
      banner.style.display = 'none';
    });
  }

  const form = document.getElementById('form-registro');
  const mensaje = document.getElementById('mensaje-confirmacion');

  if (form && mensaje) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const datos = {
        nombre: this.nombre.value,
        email: this.email.value,
        telefono: this.telefono.value,
        empresa: this.empresa.value,
        mensaje: this.mensaje.value
      };
      try {
        const res = await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (!res.ok) throw new Error('Solicitud fallida');
        mensaje.style.display = 'block';
        this.reset();
        setTimeout(() => {
          mensaje.style.display = 'none';
        }, 3500);
      } catch (err) {
        alert('Error al registrar usuario.');
      }
    });
  }
});