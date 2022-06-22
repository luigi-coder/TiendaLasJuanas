
function alertaAgregarCarrito() {
    Swal.fire ({
        background: "white",
        title:"Agregado correctamente al carrito",
        timer: 1000,
        toast: true,
        position: "center",
        icon: 'success',
        showConfirmButton: false,
        confirmButtonColor: "green"
    })
}

function alertaEliminarCarrito() {

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Elemento eliminado correctamente',
        showConfirmButton: false,
        timer: 1000
      })
}
