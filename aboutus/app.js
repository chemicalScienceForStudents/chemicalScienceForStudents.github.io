// Click en menú de hamburguesa
// Función que agrega la clase "responsive" a la barra de navegación, desplegando los
// elementos al hacer click en el botón de hamburguesa
function desplegarElementosNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }

    var y = document.getElementById("hamburguesa");
    if(y.className === "hamburguesa"){
        y.className += " hide";
    }else{
        y.className = "hamburguesa";
    }
  }




// Click en botón "Regresar"
// Funcion que permite regresar a la posición incial de la página al hacer click sobre el
// botón "Regresar"
let topScrollBtn = document.getElementById("scroll-top-btn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topScrollBtn.style.display = "block";
  } else {
    topScrollBtn.style.display = "none";
  }
}
function scrollBack() {
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //Chrome, Firefox, IE and Opera
}


// Click en botones de navegación
// La función acepta un parámetro Id al cual la vista se moverá al momento de hacer click 
// en el botón.

function scrollToElement(elemento){
  document.getElementById(elemento).scrollIntoView();
}


