let options = {
  labels: {
    success: "Notificación",
  },
  position: "bottom-left",
};

let notifier = new AWN(options);
options.labels = {
  success: "Notificación",
};

const productos = [];

//CLASES//
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

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

let countCarrito;
function updateBasketCount() {
  if (JSON.parse(localStorage.getItem("productosCarrito")) != "[]") {
    countCarrito = JSON.parse(localStorage.getItem("productosCarrito")).length;
  } else {
    countCarrito = 0;
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
    countCarrito = 0;
  }
  document.getElementById("count-carrito").innerHTML = countCarrito;
  alternMenu();
}

function alternMenu() {
  if (JSON.parse(localStorage.getItem("productosCarrito")).length == 0) {
    document.getElementById("buyInfo").style.display = "none";
    document.getElementById("noProductos").style.display = "flex";
    console.log("no hay productos");
  } else {
    document.getElementById("buyInfo").style.display = "flex";
    document.getElementById("noProductos").style.display = "none";
    let total = 0;
    let valuearray = JSON.parse(localStorage.getItem("productosCarrito", "precio"));

    for (let i = 0; i < JSON.parse(localStorage.getItem("productosCarrito")).length; i++) {
      total += parseInt(JSON.stringify(valuearray[i].precio));
    }
    let iva = total * 0.21;
    let totalFinal = total + iva;

    document.getElementById("subtotal").innerHTML = "$" + total.toFixed(2);
    document.getElementById("iva").innerHTML = "$" + iva.toFixed(2);
    document.getElementById("totalCarrito").innerHTML = "$" + totalFinal.toFixed(2);
  }
}

function eliminarProducto(producto) {
  const indiceElementoAEliminar = productosEnElCarrito.findIndex((productoAEliminar) => {
    return productoAEliminar.nombre === producto.nombre;
  });

  productosEnElCarrito.splice(indiceElementoAEliminar, 1);
  notifier.success("Has eliminado un producto");

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
    div.setAttribute("class", "producto col-10 mb-5 col-md-3");

    const card = document.createElement("div");
    card.setAttribute("class", "card text-center");

    const conteinerImg = document.createElement("div");
    conteinerImg.setAttribute("class", "card m-4 container-img");

    // Creo la imagen del producto //
    const img = document.createElement("img");
    img.src = `./assets/productos/${productoDeLista.id}.jpg`;
    img.setAttribute("class", "img-card");
    img.setAttribute("alt", `imagen de producto ${productoDeLista.nombre}`);

    conteinerImg.append(img);

    const conteinerInfo = document.createElement("div");

    const nombre = document.createElement("h4");
    nombre.setAttribute("class", "card-title p-3 c-f");
    nombre.innerText = productoDeLista.nombre;

    const id = document.createElement("p");
    id.setAttribute("class", "text-center");
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

    card.append(conteinerImg, conteinerInfo);

    // Agrego al div todos los elementos //
    div.append(card);

    // Agrego el div a la lista //
    ContainerListaDeProductos.append(div);
  }
}

function agregarProductoAlCarrito(productoAAgregar) {
  productosEnElCarrito.push(new ProductoEnCarrito(productoAAgregar.id, productoAAgregar.nombre, productoAAgregar.precio));
  notifier.success("Has añadido un nuevo producto");
  actualizarLS();
  updateCountCarrito();
  renderizarCarrito();
}

let panel = document.getElementById("productosCarrito");

function renderizarCarrito() {
  panel.innerHTML = "";
  console.log(obtenerProductos());
  if (obtenerProductos() != "") {
    for (const productoCarrito of productosEnElCarrito) {
      const div = document.createElement("div");
      div.setAttribute("class", "d-flex");
      div.setAttribute("style", "border-bottom: 1px solid rgba(0,0,0,0.105)");

      const img = document.createElement("img");
      img.src = `./assets/productos/${productoCarrito.id}.jpg`;
      img.setAttribute("style", "width: 65px;");
      img.setAttribute("alt", `imagen de producto ${productoCarrito.nombre}`);

      const conteinerInfo = document.createElement("div");
      conteinerInfo.setAttribute("class", "me-auto");

      const nombre = document.createElement("div");
      nombre.innerText = productoCarrito.nombre;

      const precio = document.createElement("div");
      precio.innerText = `$${productoCarrito.precio}`;

      const botonEliminarProducto = document.createElement("button");

      botonEliminarProducto.setAttribute("class", "btn");
      const i = document.createElement("i");
      i.setAttribute("class", "fa-solid fa-xmark");

      botonEliminarProducto.append(i);
      conteinerInfo.append(nombre, precio);
      div.append(img, conteinerInfo, botonEliminarProducto);
      panel.append(div);

      // Event Button eliminar
      botonEliminarProducto.addEventListener("click", () => {
        eliminarProducto(productoCarrito);
      });
    }
  }
}

function obtenerProductosDelJSON() {
  fetch("./json/productos.json")
    .then((response) => {
      return response.json();
    })
    .then((productosJSON) => {
      for (const productoJSON of productosJSON) {
        productos.push(new Producto(productoJSON.id, productoJSON.nombre, productoJSON.precio));
      }
      renderizarListaDeProductos();
    });
}

let input = document.getElementById("inputSearchProducts");

function filterCosmeticos() {
  let Productos, Producto, a, i, txtValue;
  Productos = document.getElementById("productos");
  Producto = Productos.getElementsByClassName("producto");

  for (i = 0; i < Producto.length; i++) {
    a = Producto[i].getElementsByTagName("div")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
      Producto[i].style.display = "";
    } else {
      Producto[i].style.display = "none";
    }
  }
}

function clearSearch() {
  input.value = "";
  filterCosmeticos();
}

document.getElementById("inputSearchProducts").addEventListener("keyup", () => {
  filterCosmeticos();
});

document.getElementById("clearSearch").addEventListener("click", () => {
  clearSearch();
});

document.getElementById("finalizarCompra").addEventListener("click", () => {
  notifier.success("Compra exitosa");
});

document.getElementById("cancelarCompra").addEventListener("click", () => {
  notifier.success("Has cancelado tu compra");
});

document.getElementById("openModalMenu").addEventListener("click", () => {
  let detalle = ""
  let total = 0

  const detallar = (nombre, precio) => {
    return "Nombre: " + nombre + "\nPrecio: $" + precio + "\nCantidad: x1" + "\n =====================\n";
  };

  let body = document.getElementById("modal-body");
  let valuearray = JSON.parse(localStorage.getItem("productosCarrito"));
  for (let i = 0; i < JSON.parse(localStorage.getItem("productosCarrito")).length; i++) {
    total += parseInt(JSON.stringify(valuearray[i].precio));
    detalle += detallar(JSON.stringify(valuearray[i].nombre), JSON.stringify(valuearray[i].precio))
  }

  body.innerText = detalle 
});

obtenerProductosDelJSON();
renderizarCarrito();
updateBasketCount();
alternMenu();
