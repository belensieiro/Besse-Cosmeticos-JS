const productos = [
  { id: 1, nombre: "Serum ACF Dadatina", precio: 2200 },
  { id: 2, nombre: "Tónico ACF Dadatina", precio: 3100 },
  { id: 3, nombre: "Contorno CeraVe", precio: 2670 },
  { id: 4, nombre: "Dermaglós 65FPS", precio: 2390 },
  { id: 5, nombre: "Hidratante Dermaglós", precio: 3300 },
  { id: 6, nombre: "Contorno Dermaglós", precio: 2310 },
  { id: 7, nombre: "Serum Dermaglós", precio: 2670 },
  { id: 8, nombre: "Serum Effaclar", precio: 6214 },
  { id: 9, nombre: "Limpiador Effaclar", precio: 4709 },
  { id: 10, nombre: "Eucerin 30FPS", precio: 4330 },
  { id: 11, nombre: "Agua Micelar Garnier", precio: 2170 },
  { id: 12, nombre: "Serum Revitalift", precio: 4590 },
  { id: 13, nombre: "Limpiador Revitalift", precio: 2615 },
  { id: 14, nombre: "Vitamina C La Rochey", precio: 6505 },
  { id: 15, nombre: "Rubor Extreme", precio: 2170 },
  { id: 16, nombre: "Labial Superstay", precio: 3010 },
  { id: 17, nombre: "Labial Vogue", precio: 1780 },
  { id: 18, nombre: "Base Vogue", precio: 2910 },
  { id: 19, nombre: "Set de Brochas", precio: 6299 },
  { id: 20, nombre: "Set de Brochas", precio: 4016 },
];

//CLASES//
class ProductoEnCarrito {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

//Obtengo los productos dentro del carrito
function obtenerProductos() {
  let productosAgregados = [];

  // Obtengo lo que hay en LS
  let productosLS = localStorage.getItem("productosCarrito");

  // Si hay algo (Lo que significa que no me devuelve null) lo parseo y lo asigno a la variable productos
  if (productosLS !== null) {
    // Parseo los objetos literales del JSON
    const productosJSON = JSON.parse(productosLS);

    // Recorro cada objeto literal e instancio un nuevo objeto de la clase Producto
    for (const productoJSON of productosJSON) {
      productosAgregados.push(new ProductoEnCarrito(productoJSON.id, productoJSON.nombre, productoJSON.precio));
    }
  }
  return productosAgregados;
}
const productosEnElCarrito = obtenerProductos();

var countCarrito;
function updateBasketCount() {
  if (JSON.parse(localStorage.getItem("productosCarrito")) != "[]") {
    countCarrito = JSON.parse(localStorage.getItem("productosCarrito")).length;
  } else {
    countCarrito = 0
  }
  document.getElementById("count-carrito").innerHTML = countCarrito;
}

function actualizarLS() {
  // Parseo array de objetos a JSON
  const listaDeProductosJSON = JSON.stringify(productosEnElCarrito);

  // Almaceno el JSON en LS
  localStorage.setItem("productosCarrito", listaDeProductosJSON);
}

function updateCountCarrito() {
  if (JSON.parse(localStorage.getItem("productosCarrito")) != null) {
    countCarrito = JSON.parse(localStorage.getItem("productosCarrito")).length;
  } else {
    countCarrito = 0
  }
  document.getElementById("count-carrito").innerHTML = countCarrito;
  alternMenu();
}

function alternMenu() {
  if (JSON.parse(localStorage.getItem("productosCarrito")) == "[]") {
    document.getElementById("subtotal").innerHTML = 0;
    document.getElementById("iva").innerHTML = 0;
    document.getElementById("totalCarrito").innerHTML = 0;

  }else{
    let total = 0;
    let valuearray = JSON.parse(localStorage.getItem("productosCarrito", "precio"));
    
    for (let i = 0; i < JSON.parse(localStorage.getItem("productosCarrito")).length; i++) {
      total += parseInt(JSON.stringify(valuearray[i].precio));
    }
    let iva = total * 0.21;
    let totalFinal = total + iva;

    document.getElementById("subtotal").innerHTML = "$"+ total;
    document.getElementById("iva").innerHTML = "$"+ iva;
    document.getElementById("totalCarrito").innerHTML = "$"+ totalFinal;
  }
}

function eliminarProducto(producto) {
  const indiceElementoAEliminar = productosEnElCarrito.findIndex((productoAEliminar) => {
    return productoAEliminar.nombre === producto.nombre;
  });

  productosEnElCarrito.splice(indiceElementoAEliminar, 1);
  notification("Has eliminado el producto del carrito.", "check");

  actualizarLS();
  updateCountCarrito();
  renderizarCarrito();
}

//PRODUCTOS//
const ContainerListaDeProductos = document.getElementById("productos");

//INDEX//
function renderizarListaDeProductos() {
  // Limpio el contenedor //
  ContainerListaDeProductos.innerHTML = "";

  // Recorro la lista de productos //
  for (const productoDeLista of productos) {
    // Crear div del producto //
    const div = document.createElement("div");
    div.setAttribute("class", "col-10 mb-5 col-md-3");
    
    const card = document.createElement("div");
    card.setAttribute("class", "card text-center")

    const conteinerImg = document.createElement("div");
    conteinerImg.setAttribute("class", "card m-4 container-img")

    // Creo la imagen del producto //
    const img = document.createElement("img");
    img.src = `../assets/productos/${productoDeLista.id}.jpg`;
    img.setAttribute("class", "img-card");
    img.setAttribute("alt", `imagen de producto ${productoDeLista.nombre}`);

    conteinerImg.append(img)

    const conteinerInfo = document.createElement("div");
    
    const nombre = document.createElement("h4");
    nombre.setAttribute("class", "card-title p-3 c-f")
    nombre.innerText = productoDeLista.nombre;

    const id = document.createElement("p");
    id.setAttribute("class", "text-center")
    id.innerText = `Código: ${productoDeLista.id}`; 

    // Creo el precio //
    const precio = document.createElement("p");
    precio.innerHTML = `<b>$ ${productoDeLista.precio}</b>`;

    // Creo el botón //
    const btnAgregarAlCarrito = document.createElement("button");
    btnAgregarAlCarrito.innerText = "Comprar";
    btnAgregarAlCarrito.setAttribute("class", "btn btn-danger btn-p btn-lg mb-4 mx-4 w-50 text-light");

    // Creo el evento para agregar el producto al carrito //
    btnAgregarAlCarrito.addEventListener("click", () => {
      // Agregar producto al carrito //
      agregarProductoAlCarrito(productoDeLista);
    });
    conteinerInfo.append(nombre, id, precio, btnAgregarAlCarrito);

    card.append(conteinerImg,conteinerInfo);

    // Agrego al div todos los elementos //
    div.append(card);

    // Agrego el div a la lista //
    ContainerListaDeProductos.append(div);
  }
}

function agregarProductoAlCarrito(productoAAgregar){
  productosEnElCarrito.push(new ProductoEnCarrito(productoAAgregar.id, productoAAgregar.nombre, productoAAgregar.precio))
  notification("Has añadido un nuevo producto", "check");
  actualizarLS();
  updateCountCarrito();
  renderizarCarrito();
}

/*Funcion de notificaciones customs*/
function notification(mesage, icon) {
  const notification = $(
    `<div class="notification fs-6">
    <i style="background-color:#EE58CD;" class="fa-solid fa-${icon}"></i>
    <span>${mesage}</span></div>`
  ).appendTo(`#notifications`);

  setTimeout(() => {
    notification.fadeOut(700);
  }, 3000);

  return notification;
}

let panel = document.getElementById("productosCarrito")

function renderizarCarrito(){
  panel.innerHTML="";
  console.log(obtenerProductos())
  if (obtenerProductos()!=""){
    console.log("test2")
    for(const productoCarrito of productosEnElCarrito){
      const div = document.createElement("div");
      div.setAttribute("class", "d-flex");
      div.setAttribute("style", "border-bottom: 1px solid rgba(0,0,0,0.105)")

      const img = document.createElement("img");
      img.src = `../assets/productos/${productoCarrito.id}.jpg`;
      img.setAttribute("style", "width: 65px;");
      img.setAttribute("alt", `imagen de producto ${productoCarrito.nombre}`);

      const conteinerInfo = document.createElement("div");
      conteinerInfo.setAttribute("class", "me-auto");
      
      const nombre = document.createElement("div");
      nombre.innerText = productoCarrito.nombre;

      const precio = document.createElement("div");
      precio.innerText= `$${productoCarrito.precio}`;

      const botonEliminarProducto = document.createElement("button");

      botonEliminarProducto.setAttribute("class", "btn");
      const i = document.createElement("i")
      i.setAttribute("class", "fa-solid fa-xmark")
      
      botonEliminarProducto.append(i);
      conteinerInfo.append(nombre, precio);
      div.append(img,conteinerInfo,botonEliminarProducto);
      panel.append(div)

    // Event Button eliminar
    botonEliminarProducto.addEventListener("click", () => {
      eliminarProducto(productoCarrito);
    });
    }
  }
}

renderizarCarrito()
updateBasketCount();
alternMenu()