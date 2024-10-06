//const canvasElement = document.getElementById('pizarra_canva');
const canvaskenzit = new fabric.Canvas('pizarra_canva', {
    selection: false,
    hoverCursor: 'pointer',
   container: document.getElementById('contenedor_sidebar_pizarra')
  });

  var colorVariable='#000000';

  var colorInput = document.getElementById('colorSeleccion');

colorInput.addEventListener('change', function() {
  colorVariable = colorInput.value;
  if (canvaskenzit.isDrawingMode) {
    canvaskenzit.freeDrawingBrush.color = colorVariable;
  }
  console.log('Nuevo color seleccionado:', colorVariable);
});

  //funcion para el zoom
  canvaskenzit.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvaskenzit.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvaskenzit.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });



//funcion para agregar un cuadrado
function agregarcuadrado(){
  
  var cuadrado = new fabric.Rect({
    width: 100, height: 100, fill:colorVariable, left: 100,
    erasable: false
  });
  canvaskenzit.add(cuadrado);
  
}

//funcion para agregar un triangulo
function agregartriangulo(){
 
  var triangulo = new fabric.Triangle({
    width: 100,
    height: 100,
    fill: colorVariable, 
    left: 100,
    erasable: false
  });
  canvaskenzit.add(triangulo);
  
}
//funcion para agregar un circulo
function agregarcirculo(){
  
  var circulo = new fabric.Circle({
    radius: 50, fill: colorVariable, left: 100,
    erasable: false
  })
  canvaskenzit.add(circulo);
}
//funcion para agregar un rombo
function agregarrombo(){
 
  
  var rombo = new fabric.Rect({
    width: 100, height: 100, fill: colorVariable, left: 100, angle:45,
    erasable: false
  });
  canvaskenzit.add(rombo);
  
}
//////////////////////////////
let objetosDeFondo = [];

//funcion para poner el fndo cuadriculado pequeño
function crearFondoCuadriculadoPeque() {
  quitarFondo();
  const tamanoCuadrado = 20; // Tamaño del cuadrado del patrón
  const colorLinea = 'gray'; // Color de las líneas del patrón
  const grosorLinea = 1; // Grosor de las líneas del patrón

  for (let x = 0; x < canvaskenzit.getWidth(); x += tamanoCuadrado) {
    const lineaVertical = new fabric.Line([x, 0, x, canvaskenzit.getHeight()], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaVertical);
    canvaskenzit.add(lineaVertical);
  }

  for (let y = 0; y < canvaskenzit.getHeight(); y += tamanoCuadrado) {
    const lineaHorizontal = new fabric.Line([0, y, canvaskenzit.getWidth(), y], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaHorizontal);
    canvaskenzit.add(lineaHorizontal);
  }
}
//funcion para poner el fndo cuadriculado grande
function crearFondoCuadriculadoGrande() {
  quitarFondo();
  const tamanoCuadrado = 40; // Tamaño del cuadrado del patrón
  const colorLinea = 'gray'; // Color de las líneas del patrón
  const grosorLinea = 1; // Grosor de las líneas del patrón

  for (let x = 0; x < canvaskenzit.getWidth(); x += tamanoCuadrado) {
    const lineaVertical = new fabric.Line([x, 0, x, canvaskenzit.getHeight()], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaVertical);
    canvaskenzit.add(lineaVertical);
  }

  for (let y = 0; y < canvaskenzit.getHeight(); y += tamanoCuadrado) {
    const lineaHorizontal = new fabric.Line([0, y, canvaskenzit.getWidth(), y], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaHorizontal);
    canvaskenzit.add(lineaHorizontal);
  }
}
//funcion para crear lineas horizontales pequeñas
function crearFondoLineasHorizontalesPeque() {
  quitarFondo();
  const tamanoLinea = 20; // Tamaño de la línea
  const colorLinea = 'gray'; // Color de las líneas
  const grosorLinea = 1; // Grosor de las líneas

  for (let y = 0; y < canvaskenzit.getHeight(); y += tamanoLinea) {
    const lineaHorizontal = new fabric.Line([0, y, canvaskenzit.getWidth(), y], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaHorizontal);
    canvaskenzit.add(lineaHorizontal);
  }
}
//funcion para crear lineas horizontales grandes
function crearFondoLineasHorizontalesGrandes() {
  quitarFondo();
  const tamanoLinea = 40; // Tamaño de la línea
  const colorLinea = 'gray'; // Color de las líneas
  const grosorLinea = 1; // Grosor de las líneas

  for (let y = 0; y < canvaskenzit.getHeight(); y += tamanoLinea) {
    const lineaHorizontal = new fabric.Line([0, y, canvaskenzit.getWidth(), y], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaHorizontal);
    canvaskenzit.add(lineaHorizontal);
  }
}
//funcion para crear lineas verticales pequeñas
function crearFondoLineasVerticalesPeque() {
  quitarFondo();
  const tamanoLinea = 20; // Tamaño de la línea
  const colorLinea = 'gray'; // Color de las líneas
  const grosorLinea = 1; // Grosor de las líneas

  for (let x = 0; x < canvaskenzit.getWidth(); x += tamanoLinea) {
    const lineaVertical = new fabric.Line([x, 0, x, canvaskenzit.getHeight()], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false // Agregar esta propiedad
    });
    objetosDeFondo.push(lineaVertical);
    canvaskenzit.add(lineaVertical);
  }
}
//funcion para crear lineas verticales grandes
function crearFondoLineasVerticalesGrande() {
  quitarFondo();
  const tamanoLinea = 40; // Tamaño de la línea
  const colorLinea = 'gray'; // Color de las líneas
  const grosorLinea = 1; // Grosor de las líneas

  for (let x = 0; x < canvaskenzit.getWidth(); x += tamanoLinea) {
    const lineaVertical = new fabric.Line([x, 0, x, canvaskenzit.getHeight()], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false 
    });
    objetosDeFondo.push(lineaVertical);
    canvaskenzit.add(lineaVertical);
  }
}
//funcion para sin fondo
function quitarFondo() {
  if (objetosDeFondo.length > 0) {
    objetosDeFondo.forEach(objeto => {
      canvaskenzit.remove(objeto);
    });
    objetosDeFondo = [];
  }
  canvaskenzit.setBackgroundColor('');
  canvaskenzit.renderAll();
}
//funcion para poner pantalla completa
function pantallaCompleta() {
  var canvas = document.getElementById('pizarra_canva');
  var elem = canvas;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  }
}
//funcion para la goma de borrar

function Borrador() {
  console.log('borrador')
    //  same as `PencilBrush`
    canvaskenzit.freeDrawingBrush = new fabric.EraserBrush(canvaskenzit);
    canvaskenzit.isDrawingMode = true;
    
    //  optional
    canvaskenzit.freeDrawingBrush.width = 30;
    canvaskenzit.freeDrawingBrush.selectable=false;
    
   
  
}
//funcion para guardar el canvas
function guardarCanvas() {
  const nombreArchivoInput = document.getElementById('txt_titulo');
  const nombreArchivo = nombreArchivoInput.value.trim();

  if (nombreArchivo === '') {
    alert('Por favor, ingresa un nombre para el archivo');
  } else {
    var json = canvaskenzit.toJSON();
    var data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json));
    var blob = new Blob([data], {type: 'text/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}
//funcion para descargar el canvas en jpg
function descargarCanvasJPG() {
  const nombreArchivoInput = document.getElementById('txt_titulo');
  const nombreArchivo = nombreArchivoInput.value.trim();

  if (nombreArchivo === '') {
    alert('Por favor, ingresa un título para el archivo');
  } else {
    canvaskenzit.setBackgroundColor('white', canvaskenzit.renderAll.bind(canvaskenzit));
    canvaskenzit.renderAll();
    var dataURL = canvaskenzit.toDataURL({
      format: 'jpeg',
      quality: 1
    });
    var enlace = document.createElement('a');
    enlace.href = dataURL;
    enlace.download = nombreArchivo + '.jpg';
    enlace.click();
  }
}
//funcion para descargar el canvas en png

function descargarCanvasPNG() {
  const nombreArchivoInput = document.getElementById('txt_titulo');
  const nombreArchivo = nombreArchivoInput.value.trim();

  if (nombreArchivo === '') {
    alert('Por favor, ingresa un título para el archivo');
  } else {
    canvaskenzit.setBackgroundColor('white', canvaskenzit.renderAll.bind(canvaskenzit));
    canvaskenzit.renderAll();
    var dataURL = canvaskenzit.toDataURL({
      format: 'png',
      quality: 1
    });
    var enlace = document.createElement('a');
    enlace.href = dataURL;
    enlace.download = nombreArchivo + '.png';
    enlace.click();
  }
}
// validar los caracteres
function validarTitulo(titulo) {
  const regex = /^[a-zA-Z0-9\s]+$/;
  if (!regex.test(titulo)) {
    alert('Por favor, solo ingresa letras y números en el título');
    return false;
  }
  return true;
}
const nombreArchivoInput = document.getElementById('txt_titulo');
nombreArchivoInput.addEventListener('input', function() {
  const titulo = this.value.trim();
  if (!validarTitulo(titulo)) {
    this.value = '';
  }
});
///descargar en pdf

function uploadImage() {
    // Seleccionamos el input file
    var fileInput = document.getElementById('fileInput');
  
    // Simulamos un clic en el input file
    fileInput.click();
    fileInput.onchange = (evnt) => {
        const file = evnt.target.files[0];
        const url = URL.createObjectURL(file);
        const imgNode = new Image();
        imgNode.src = url;
        imgNode.onload = () => {
          const img = new fabric.Image(imgNode, {    
           
            opacity: 1,
            erasable:false
          });
          img.scale(0.2);
          canvaskenzit.add(img); // esta es la mágia
        };}
  }


//FUNCION PARA DIBUJAR

function dibujarBoligrafo(){
  desactivarDibujo();
  
  
  canvaskenzit.isDrawingMode=true;
  canvaskenzit.freeDrawingBrush = new fabric.PencilBrush(canvaskenzit);
  canvaskenzit.freeDrawingBrush.color=colorVariable;
  canvaskenzit.freeDrawingBrush.width=5;
 
  canvaskenzit.on('path:created', function(options) {
    var path = options.path;
    path.set('opacity', 1);
  });
 }

 //dibujar pluma
 function dibujarPluma(){
  
  canvaskenzit.isDrawingMode=true;
  canvaskenzit.freeDrawingBrush = new fabric.PencilBrush(canvaskenzit);
  canvaskenzit.freeDrawingBrush.color=colorVariable;
  canvaskenzit.freeDrawingBrush.width=2;
  canvaskenzit.on('path:created', function(options) {
    var path = options.path;
    path.set('opacity', 1);
  });
 }
//dibujar resaltador

function dibujarResaltador(){
  
  canvaskenzit.isDrawingMode = true;
  canvaskenzit.freeDrawingBrush = new fabric.PencilBrush(canvaskenzit);
  canvaskenzit.freeDrawingBrush.color = colorVariable;
  canvaskenzit.freeDrawingBrush.width = 26;

  // Configura la opacidad del objeto Path que se crea al dibujar
  canvaskenzit.freeDrawingBrush.strokeOpacityWhenMoving = 0.2;

  // Agrega un evento para crear un objeto Path con opacidad cuando se dibuja
  canvaskenzit.on('path:created', function(options) {
    var path = options.path;
    path.set('opacity', 0.5);
  });
}


 //funcion para desactivar el dibujo y seleccionar
 function desactivarDibujo(){
  canvaskenzit.isDrawingMode=false;
 }




//FUNCION PARA BORRAR TODO EL CONTENIDO DEL CANVAS
function borrarTodo(){
  canvaskenzit.clear();
}


/////////////////////////////////////////

// create a rect object
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';


fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24
});



function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore();
}


//funcion para cambie el color de textarea
function cambiarColor(element, color) {
  // Remueve la clase 'selected' de todos los elementos
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => option.classList.remove('selected'));

  // Añade la clase 'selected' al elemento actual
  element.classList.add('selected');

  document.querySelector('.note-area').style.backgroundColor = color;
}
//funicon para agregar la nota adhesiva
function guardarNota() {
  // Obtener el texto de la nota
  const notaText = document.querySelector('.text-area ').value;

  // Obtener el color seleccionado
  const colorSeleccionado = document.querySelector('.color-option.selected').style.backgroundColor;
///////////////////////////////////

  // Crear el rectángulo de la nota adhesiva
  const notaRect = new fabric.Rect({
    width: 150,
    height: 100,
    fill: colorSeleccionado,
    rx: 10, // radio de curvatura para darle un aspecto redondeado
    ry: 0,
    stroke: 'black',
    strokeWidth: 2
  });

  // Crear el texto de la nota adhesiva
  const notaTextObject = new fabric.Text(notaText, {
    fontSize: 18,
    fontFamily: 'Arial',
    fill: 'black',
    left: 10,
    top: 10
  });

  // Agrupar el rectángulo y el texto en un grupo
  const notaAdhesiva = new fabric.Group([notaRect, notaTextObject], {
    left: 100,
    top: 100,
    erasable:false
  });

  // Agregar la nota adhesiva al canvas
  canvaskenzit.add(notaAdhesiva);

/////////////////////////////////
  // Limpiar el área de texto
  document.querySelector('.note-area').value = '';

}

//funcion para agregar el texto
function AgregarText() {
  // Obtener el texto de la nota
  const notaText = document.querySelector('.note-area').value;
 
  const textColor = colorVariable;
  const text = new fabric.Text(notaText, {
    fill: textColor,
    fontSize: 24,
    left: 100,
    top: 100
  });

  canvaskenzit.add(text);
/////////////////////////////////
  // Limpiar el área de texto
  document.querySelector('.note-area').value = '';

}