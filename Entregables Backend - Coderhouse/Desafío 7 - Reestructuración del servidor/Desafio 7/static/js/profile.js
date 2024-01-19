fetch('http://localhost:8080/api/sessions/current')
    .then(resp => resp.json())
    .then(data => {
    console.log(data)
    document.getElementById('nombre').value= data.nombre
    document.getElementById('apellido').value= data.apellido
    document.getElementById('email').value= data.email              
})

const buttonLogout = document.getElementById('logout')

buttonLogout?.addEventListener('click', async event => {
  event.preventDefault()

  // @ts-ignore
  //const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch(
      '/api/sessions/logout',
      {
        method: 'POST',
      },
    )

    // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
    if (res.ok) {
      // Redirigir a la nueva página
      window.location.href = '/login'
    } else {
      // Manejar otros casos si es necesario
      console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
    }

  } catch (err) {
    console.log(err.message)
  }
})
