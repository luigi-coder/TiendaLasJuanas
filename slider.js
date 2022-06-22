// jquery
$(document).ready(function() {
    var imgItems = $('.slider li').length; // capturamos todos los li
    var imgPosicion = 1; // le damos el valos 1, pq cuando la pagina se recargue siempre va a estar en uno la imagen
    for(i=1; i <= imgItems; i++) {
        $('.pagination').append('<li><span class="fa fa-circle"></span></li>'); // append sirve para agregar elementos html
    }
    //------------------------------
    
    $('.slider li').hide(); // ocultamos todos los slides
    $('.slider li:first').show(); // mostramos el primer slide
    $('.pagination li:first').css({'color':'orange'});// damos estilos al primer items de la pagination

    // ejecutamos todas las funciones
    $('.pagination li').click(pagination); // todos los li puntitos 
    $('.right span').click(nextSlider); // al darl click a la flecha avanzara en la foto
    $('.left span').click(prevSlider);

    // Creacion de las funciones =======================================
    function pagination() {
        var paginationPosition = $(this).index() + 1; // posicion de la pagina seleccionada
        
        $('.slider li').hide(); // al hacer click se van a ejecutar todos li
        $('.slider li:nth-child('+ paginationPosition +')').fadeIn()

        $('.pagination li').css({'color':'black'})
        $(this).css({'color':'orange'}) // estilos a los botones
        imgPosicion = paginationPosition
    }
    function nextSlider() {
        
        if(imgPosicion >= imgItems) { // cuando sea mayor igual a 4, saltara otra vez al uno
            imgPosicion = 1
            
        }else {
            imgPosicion++;//de los contrario seguira aumentando
        }
        
        $('.pagination li').css({'color':'black'})
        $('.pagination li:nth-child('+ imgPosicion+')').css({'color':'orange'})
        
        $('.slider li').hide(); // ocultar todos los slides
        $('.slider li:nth-child('+ imgPosicion +')').fadeIn()
    }
    function prevSlider() {
        
        if(imgPosicion <= 1) { // si es menor igual a uno se regresara a 4
            imgPosicion = imgItems
            
        }else {
            imgPosicion--;//de los contrario seguira restando
        }
        
        $('.pagination li').css({'color':'black'})
        $('.pagination li:nth-child('+ imgPosicion+')').css({'color':'orange'})
        
        $('.slider li').hide(); // ocultar todos los slides
        $('.slider li:nth-child('+ imgPosicion +')').fadeIn()
    }

});




