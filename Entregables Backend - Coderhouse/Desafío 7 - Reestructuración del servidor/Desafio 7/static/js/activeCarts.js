const rutaFetch = 'http://localhost:8080/api/carts'
const rutaFetchNewCart = 'http://localhost:8080/api/carts'

document.getElementById('newCart').addEventListener('click', newCart)

loadCarts()

function loadCarts() {

    fetch(rutaFetch)
        .then(resp => resp.json())
        .then(data => {
            const targetDOM = document.getElementById('listaCarts')
            targetDOM.addEventListener('click', selectCart)
            targetDOM.innerHTML = ''

            if (data.length > 0) {
                for (elem of data) {
                    const newElement = document.createElement('tr')
                    newElement.innerHTML = `
                <th scope="row" style="vertical-align: middle;">${elem._id}</th>
                <td style="vertical-align: middle;">Subtotal products: ${elem.cart.length}</td>
                <td style="vertical-align: middle;">
                <input type="radio" class="btn-check" name="options-outlined" id=${elem._id} autocomplete="off">
                <label class="btn btn-outline-success" for="success-outlined" id=${elem._id}>Continuar</label>
                </td>
                `
                    targetDOM.appendChild(newElement)
                }
            } else {
                targetDOM.innerHTML = `
                <div class="alert alert-success" role="alert">
                    No hay carts activos. Crea uno nuevo!
                </div>
                `
            }
            console.log(data)
        })
}


function selectCart(e) {
    if (e.target.id != '') {
        console.log(e.target.id)
        localStorage.setItem('cart', JSON.stringify(e.target.id))
        window.location = '/products'
    }
}

function newCart(e) {
    fetch(rutaFetchNewCart, {
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(data => {
            const newID = data._id
            console.log(newID)
            localStorage.setItem('cart', JSON.stringify(newID))
            window.location = '/products'
        })

}

const buttonLogout = document.getElementById('logout')

buttonLogout?.addEventListener('click', async event => {
  event.preventDefault() 

  try {
    const res = await fetch(
      '/api/sessions/logout',
      {
        method: 'POST',
      },
    )
    if (res.ok) {
      window.location.href = '/login'
    } else {
      console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
    }

  } catch (err) {
    console.log(err.message)
  }
})