const formReset = document.getElementById('reset')

formReset?.addEventListener('submit', async event => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formReset))

  try {
    const res = await fetch(
      '/api/users/resetpassword',
      {
        method:'POST',
        body: formDataEncoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      },
    )
     // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
     if (res.ok) {
      // Redirigir a la nueva página
      //
        Swal.fire({
          title: "contraseña actualizada!",
          icon: "success",
          color: "write"
        });
        window.location.href = '/login'
    } else {
      // Manejar otros casos si es necesario
      console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
    }

  } catch (err) {
    console.log(err.message)
  }
})