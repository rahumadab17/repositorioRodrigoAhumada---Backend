const formLogin = document.getElementById('login')

formLogin?.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch('/api/sessions/login', {
      method: 'POST',
      body: formDataEncoded,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    if (res.ok) {
      
      window.location.href = '/products'
    } else {
      
      const data = await res.json(); 
      if (data.status === 'error') {
        if (data.message === 'Invalid email or password') {
          
          Swal.fire({
            title: "Fallo de inicio",
            icon: "error",
            color: "write",
            text: "Ingresar usuario y contraseña!"
          });
        } else if (data.message === 'Internal server error') {
          alert('Internal server error. Please try again later.'); 
        } else {
          console.log('Error desconocido:', data.message);
        }
      } else {
        console.log('La solicitud no fue exitosa. Código de respuesta:', res.status);
      }
    }
  } catch (err) {
    console.error('Error de red u otros errores inesperados:', err.message);
  }
});

