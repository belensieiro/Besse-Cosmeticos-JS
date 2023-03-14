let respuesta= ""
let precio= 0;
let total= 0;

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