
//================= FETCH ================//

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {

    fetch('db.json')
        .then((response) => response.json())
        .then((data) => {

            baseDeDatos = data;
            renderBaseDatos();
            renderizarCarrito();
        })
        .catch((error) => {
            console.log(error);
        });
}

// Variables globales
const carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];

// RENDERIZAR PRODUCTOS 
function renderBaseDatos() {

    const $contenedor = document.getElementById('juanas');
    baseDeDatos.forEach((e) => {
        const div = document.createElement('div');
        div.classList.add('col-md-4')
        div.innerHTML = `
        <div class="cart item shadow mb-4" style="opacity:3">
            <h3 class="item-titulo text-center titulo pt-3">${e.nombre}</h3>
            <div class="container1">
                <img class="item-imagen img-fluid p-4" src="${e.imagen}">
                <div class="overlay">
                    <div class="text">
                        <img src=${e.imagen} class=" shopping-cart-image">
                        <h5>${e.nombre}</5>
                        <p class="semilla">precio</p>
                        <p>El precio es por 5 Semillas</p>
                        <p>Por la compra de 15 Semillas el envío es gratis.
                    </div>
                </div>
            </div>
            <div class="item-details text-center">
                <h3 class="item-titulo text-center titulo pt-3">$${e.precio}</h3>
                <button class="item-boton btn btn-success" onClick="agregarProductoAlCarrito(${e.id})">Agregar al carrito</button>
            </div>
        </div> `

        $contenedor.appendChild(div);

    })

}


// AGREGAR PRODUCTOS AL CARRITO DE COMPRAS
function agregarProductoAlCarrito(id) {

    let producto = baseDeDatos.find((e) => e.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }
    else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    console.log(carrito);

    alertaAgregarCarrito()
    renderizarCarrito();
    
    localStorage.carrito = JSON.stringify(carrito);

}

// RENDERIZAR EL CARRITO DE COMPRAS
function renderizarCarrito() {

    let $contenedorCarrito = document.querySelector('#carrito')

    localStorage.carrito = JSON.stringify(carrito)

    $contenedorCarrito.innerHTML = ""

    if(carrito.length > 0) {
        
        carrito.forEach( element => {
            $contenedorCarrito.innerHTML += `
            <div class="row shoppingCartItem">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <img src=${element.imagen} class="shopping-cart-image">
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate text-light ml-3 mb-0">${element.nombre}</h6>
                    </div>
                </div>
                <div class="col-2">
                    <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">$${element.precio}</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice ml-4">${element.cantidad}</p>
                        <button class="btn btn-danger buttonDelete" onclick="borradoDeProductos(${element.id})" type="button">X</button>
                    </div>
                </div>
            </div>
            `    
        })
    }

    sumarTotal();
}

function borradoDeProductos(id){

    let producto = baseDeDatos.find((e) => e.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id == id);

    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    }
    else {
        carrito.splice(carrito.indexOf(productoEnCarrito), 1);
    }

    localStorage.carrito = JSON.stringify(carrito)
    alertaEliminarCarrito()
    renderizarCarrito();
    sumarTotal();

}

function sumarTotal(){


    let total = 0;
    const $contenedorTotal = document.getElementById('totalFinal');

    carrito.forEach(element => {
        total += element.precio * element.cantidad
    })

    $contenedorTotal.innerHTML = `<p>Total: $${total}</p>`

    localStorage.carrito = JSON.stringify(carrito)
    $contenedorTotal.innerHTML = `TOTAL: ${total.toFixed(2)}$`
}

