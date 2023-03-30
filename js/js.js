let respuesta= ""
let precio= 0;
let total= 0;
let productosHtml=""

const productos = [
        {id: 1, nombre: "Serum ACF Dadatina", precio: 2200},
        {id: 2, nombre: "Tónico ACF Dadatina", precio: 3100},
        {id: 3, nombre: "Contorno CeraVe", precio: 2670},
        {id: 4, nombre: "Dermaglós 65FPS", precio: 2390},
        {id: 5, nombre: "Hidratante Dermaglós", precio: 3300},
        {id: 6, nombre: "Contorno Dermaglós", precio: 2310},
        {id: 7, nombre: "Serum Dermaglós", precio: 2670},
        {id: 8, nombre: "Serum Effaclar", precio: 6214},
        {id: 9, nombre: "Limpiador Effaclar", precio: 4709},
        {id: 10, nombre: "Eucerin 30FPS", precio: 4330},
        {id: 11, nombre: "Agua Micelar Garnier", precio: 2170},
        {id: 12, nombre: "Serum Revitalift", precio: 4590},
        {id: 13, nombre: "Limpiador Revitalift", precio: 2615},
        {id: 14, nombre: "Vitamina C La Rochey", precio: 6505},
        {id: 15, nombre: "Rubor Extreme", precio: 2170},
        {id: 16, nombre: "Labial Superstay", precio: 3010},
        {id: 17, nombre: "Labial Vogue", precio: 1780},
        {id: 18, nombre: "Base Vogue", precio: 2910},
        {id: 19, nombre: "Set de Brochas", precio: 6299},
        {id: 20, nombre: "Set de Brochas", precio: 4016} 
];

for(const producto of productos){
        productosHtml += `<div class="col-10 mb-5 col-md-3">`
        productosHtml += `<div class="card text-center">`
        productosHtml += `<div class="card m-4 container-img">`
        productosHtml += `<img class="img-card" src="assets/productos/${producto.id}.jpg" alt="imagen de producto" /></div>`
        productosHtml += `<div><h4 class="card-title p-3 c-f">${producto.nombre}</h4>`
        productosHtml += `<p class="id text-center">Código: ${producto.id}</p>`
        productosHtml += `<p><b>$ ${producto.precio}</b></p>`
        productosHtml += `<a href="#" class="btn btn-danger btn-p btn-lg mb-4 mx-4 w-50 text-light sala-img">Comprar</a></div></div></div>`        
}

document.getElementById("productos").innerHTML = productosHtml


























do{
    let codigo = Number(prompt("Ingrese el código del producto para añadirlo al carrito:\n(Número del 1 al 20)"))
    
    switch (codigo){
        case 1:
                precio=2200
                break;

        case 2:
                precio=3100
                break;

        case 3:
                precio=2670
                break; 

        case 4:
                precio=2390
                break;

        case 5:
                precio=3300
                break;

        case 6:
                precio=2310
                break;

        case 7:
                precio=2670
                break;
    
        case 8:
                precio=6214
                break;
    
         case 9:
                precio=4709
                break; 
    
        case 10:
                precio=4330
                break;
    
        case 11:
                precio=2170
                break;
    
        case 12:
                precio=4590
                break;

        case 13:
                precio=2615
                break;

        case 14:
                precio=6505
                break;

        case 15:
                precio=2170
                break; 

        case 16:
                precio=3010
                break;

        case 17:
                precio=1780
                break;

        case 18:
                precio=2910
                break;

        case 19:
                precio=6299
                break;
    
        case 20:
                precio=4016
                break;  

        default:
                alert("Usted ingresó un código inválido.")                                                 
    }

    total= total + precio
    alert ("$"+ total)    

    respuesta = prompt("Ingrese ''ESC'' para salir u otra tecla para continuar añadiendo productos").toUpperCase()   
}while(respuesta != "ESC")

renderizado(total)

function renderizado(total){
        const soloIVA = total*0.21
        const conIVA = total*1.21
        const conDescuento = conIVA*0.9

        if(conIVA >= 4000){
                alert(
                "El detalle de su compra es: \n"+
                "\nTotal: $"+total+
                "\nIVA: $"+ soloIVA+
                "\nTotal con IVA: $"+conIVA+
                "\nTotal con Descuento: $"+ conDescuento)
        }else
                alert(
                "El detalle de su compra es: \n"+
                "\nTotal: $"+total+
                "\nIVA: $"+ soloIVA+
                "\nTotal con IVA: $"+conIVA)
        }