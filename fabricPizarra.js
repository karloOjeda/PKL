//const canvasElement = document.getElementById('pizarra_canva');
const canvaskenzit = new fabric.Canvas('pizarra_canva', {
    selection: false,
    hoverCursor: 'pointer',
   container: document.getElementById('contenedor_sidebar_pizarra')
  });

  let history = [];
let historyIndex = -1;

function saveState() {
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(canvaskenzit.toJSON());
    historyIndex++;
    console.log('guardado');
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        canvaskenzit.loadFromJSON(history[historyIndex], canvaskenzit.renderAll.bind(canvaskenzit));
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        canvaskenzit.loadFromJSON(history[historyIndex], canvaskenzit.renderAll.bind(canvaskenzit));
    }
}

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
    const zoomO=canvaskenzit.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = zoomO;
    canvaskenzit.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });




// Función para agregar un cuadrado en la posición del clic
function agregarcuadrado() {
  // Agregar un evento de clic al canvas
  desactivarDibujo();
 
  
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Crear el cuadrado en la posición del clic
      var cuadrado = new fabric.Rect({
          width: 100,
          height: 100,
          stroke: colorVariable,
          strokeWidth: 2,
          fill: 'transparent',
          left: x - 50, // Centrar el cuadrado en el clic
          top: y - 50,  // Centrar el cuadrado en el clic
          erasable: false
      });

      // Agregar el cuadrado al canvas
      canvaskenzit.add(cuadrado);
      saveState(); // Guardar el estado después de agregar el cuadrado

      // Desactivar el evento de clic para evitar agregar múltiples cuadrados
      canvaskenzit.off('mouse:down');
  });
}

// Función para agregar un triángulo en la posición del clic
function agregartriangulo() {
  desactivarDibujo()
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Crear el triángulo en la posición del clic
      var triangulo = new fabric.Triangle({
          width: 100,  // Ancho del triángulo
          height: 100, // Altura del triángulo
          left: x - 50, // Centrar el triángulo en el clic
          top: y - 50,  // Centrar el triángulo en el clic
          stroke: colorVariable,
          strokeWidth: 2,
          fill: 'transparent',
          erasable: false
      });

      // Agregar el triángulo al canvas
      canvaskenzit.add(triangulo);
      saveState(); // Guardar el estado después de agregar el triángulo

      // Desactivar el evento de clic para evitar agregar múltiples triángulos
      canvaskenzit.off('mouse:down');
  });
}
// Función para agregar un círculo en la posición del clic
function agregarcirculo() {
  // Agregar un evento de clic al canvas
  desactivarDibujo()
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Crear el círculo en la posición del clic
      var circulo = new fabric.Circle({
          radius: 50, // Radio del círculo
          stroke: colorVariable,
          strokeWidth: 2,
          fill: 'transparent',
          left: x-50, // Posición X del clic
          top: y-50,  // Posición Y del clic
          erasable: false
      });

      // Agregar el círculo al canvas
      canvaskenzit.add(circulo);
      saveState(); // Guardar el estado después de agregar el círculo

      // Desactivar el evento de clic para evitar agregar múltiples círculos
      canvaskenzit.off('mouse:down');
  });
}
// Función para agregar un trapecio en la posición del clic
function agregarTrapecio() {
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Definir las dimensiones del trapecio
      const base1 = 100; // Longitud de la base superior
      const base2 = 150; // Longitud de la base inferior
      const height = 100; // Altura del trapecio

      // Crear la cadena de comandos SVG para el trapecio
      const pathData = `
          M ${x - base1 / 2} ${y} 
          L ${x + base1 / 2} ${y} 
          L ${x + base2 / 2} ${y + height} 
          L ${x - base2 / 2} ${y + height} 
          Z
      `;

      // Crear el trapecio como un objeto Path
      const trapecio = new fabric.Path(pathData, {
          fill: 'transparent', // Color de relleno
          stroke: colorVariable, // Color del borde
          strokeWidth: 2,
          selectable: true // Permitir que el trapecio sea seleccionable
      });

      // Agregar el trapecio al canvas
      canvaskenzit.add(trapecio);
      canvaskenzit.renderAll(); // Renderizar el canvas para mostrar el nuevo objeto
      saveState(); // Guardar el estado después de agregar el trapecio

      // Desactivar el evento de clic para evitar agregar múltiples trapecios
      canvaskenzit.off('mouse:down');
  });
}
// Función para agregar un semicírculo en la posición del clic
function agregarSemiCirculo() {
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Definir el radio del semicírculo
      const radio = 50; // Puedes ajustar este valor

      // Crear la cadena de comandos SVG para el semicírculo
      const pathData = `
          M ${x - radio} ${y} 
          A ${radio} ${radio} 0 0 1 ${x + radio} ${y} 
          L ${x + radio} ${y} 
          L ${x - radio} ${y} 
          Z
      `;

      // Crear el semicírculo como un objeto Path
      const semiCirculo = new fabric.Path(pathData, {
          fill: 'transparent', // Color de relleno
          stroke: colorVariable, // Color del borde
          strokeWidth: 2,
          selectable: true // Permitir que el semicírculo sea seleccionable
      });

      // Agregar el semicírculo al canvas
      canvaskenzit.add(semiCirculo);
      canvaskenzit.renderAll(); // Renderizar el canvas para mostrar el nuevo objeto
      saveState(); // Guardar el estado después de agregar el semicírculo

      // Desactivar el evento de clic para evitar agregar múltiples semicírculos
      canvaskenzit.off('mouse:down');
  });
}
// Función para agregar un triángulo rectángulo en la posición del clic
function agregarTrianguloRectangulo() {
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function(event) {
      // Obtener las coordenadas del clic
      const pointer = canvaskenzit.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;

      // Definir las dimensiones del triángulo rectángulo
      const base = 100; // Longitud de la base
      const altura = 100; // Altura del triángulo

      // Crear la cadena de comandos SVG para el triángulo rectángulo
      const pathData = `
          M ${x} ${y} 
          L ${x + base} ${y} 
          L ${x} ${y - altura} 
          Z
      `;

      // Crear el triángulo rectángulo como un objeto Path
      const trianguloRectangulo = new fabric.Path(pathData, {
          fill: 'transparent', // Color de relleno
          stroke: colorVariable, // Color del borde
          strokeWidth: 2,
          selectable: true // Permitir que el triángulo rectángulo sea seleccionable
      });

      // Agregar el triángulo rectángulo al canvas
      canvaskenzit.add(trianguloRectangulo);
      canvaskenzit.renderAll(); // Renderizar el canvas para mostrar el nuevo objeto
      saveState(); // Guardar el estado después de agregar el triángulo rectángulo

      // Desactivar el evento de clic para evitar agregar múltiples triángulos
      canvaskenzit.off('mouse:down');
  });
}
 // Función para agregar un rombo en la posición del clic
function agregarrombo() {
  desactivarDibujo()
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function (event) {
    // Obtener las coordenadas del clic
    const pointer = canvaskenzit.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;

    // Crear el rombo en la posición del clic
    var rombo = new fabric.Rect({
      width: 100,
      height: 100,
      stroke: colorVariable,
      strokeWidth: 2,
      fill: 'transparent',
      left: x, // Centrar el rombo en el clic
      top: y - 50,  // Centrar el rombo en el clic
      angle: 45,    // Rotar el rombo 45 grados para que se vea como un rombo
      erasable: false
    });

    // Agregar el rombo al canvas
    canvaskenzit.add(rombo);
    saveState(); // Guardar el estado después de agregar el rombo

    // Desactivar el evento de clic para evitar agregar múltiples rombos
    canvaskenzit.off('mouse:down');
  });
}
//////////////////////////////
let objetosDeFondo = [];

//funcion para poner el fndo cuadriculado pequeño
function crearFondoCuadriculadoPeque() {
  quitarFondo();
  const tamanoCuadrado = 20; // Tamaño del cuadrado del patrón
  const colorLinea = 'lightgray'; // Color de las líneas del patrón
  const grosorLinea = 1; // Grosor de las líneas del patrón

  for (let x = 0; x < canvaskenzit.getWidth(); x += tamanoCuadrado) {
    const lineaVertical = new fabric.Line([x, 0, x, canvaskenzit.getHeight()], {
      stroke: colorLinea,
      strokeWidth: grosorLinea,
      erasable: false,
      selectable: false,
      
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
  const colorLinea = 'lightgray'; // Color de las líneas del patrón
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
  const colorLinea = 'lightgray'; // Color de las líneas
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
  const colorLinea = 'lightgray'; // Color de las líneas
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
  const colorLinea = 'lightgray'; // Color de las líneas
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
  const colorLinea = 'lightgray'; // Color de las líneas
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
  cambiarPuntero("cursores/borrador.png");
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
  cambiarPuntero("cursores/boligrafo.png");
  
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
  desactivarDibujo();
  cambiarPuntero("cursores/pluma.png");
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
  desactivarDibujo()
  cambiarPuntero("cursores/resaltador.png");
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
  document.getElementById('noteArea').style.backgroundColor=color;
  
}
//funicon para agregar la nota adhesiva
function guardarNota() {
  // Obtener el texto de la nota
  const notaText = document.querySelector('.text-area').value;

  // Obtener el color seleccionado
  const colorSeleccionado = document.querySelector('.color-option.selected').style.backgroundColor;

  // Crear un cuadro de texto editable para la nota con un borde
  const notaTextBox = new fabric.Textbox(notaText, {
      fontSize: 25,
      fontFamily: 'Arial',
      fill: 'black', // Color del texto
      left: 100, // Posición X del cuadro de texto en el canvas
      top: 100, // Posición Y del cuadro de texto en el canvas
      width: 150, // Ancho del cuadro de texto
      editable: true, // Permite la edición del texto
      backgroundColor: colorSeleccionado, // Color de fondo del cuadro de texto
      textAlign:'center',
      originX:'center'
      
  });

  // Agregar el cuadro de texto al canvas
  canvaskenzit.add(notaTextBox);

  // Limpiar el área de texto
  document.querySelector('.text-area').value = '';
  document.getElementById('btncancelarnota').click();
}



function agregarTexto() {

  ///////////////////////////
  desactivarDibujo()
  // Agregar un evento de clic al canvas
  canvaskenzit.on('mouse:down', function (event) {
    // Obtener las coordenadas del clic
    const pointer = canvaskenzit.getPointer(event.e);
    const x = pointer.x;
    const y = pointer.y;

   // Obtener el texto de la nota
  const notaText = '';

  

  // Crear un nuevo objeto Textbox
  const textBox = new fabric.Textbox(notaText, {
      fill: 'black', // Color del texto
      fontSize: 24,
      left: x, // Posición inicial (puedes cambiar esto)
      top: y, // Posición inicial (puedes cambiar esto)
      width: 200, // Ancho del cuadro de texto
      editable: true // Permite la edición del texto
  });

  // Agregar el Textbox al canvas
  canvaskenzit.add(textBox);
  canvaskenzit.setActiveObject(textBox); // Seleccionar el objeto para edita
    // Desactivar el evento de clic para evitar agregar múltiples rombos
    canvaskenzit.off('mouse:down');
  });
  ///////////////////////
  
  



}




//funcion para cambiar el puntero de las herramientas
function cambiarPuntero(cursorUrl) {
  // Verificar si cursorUrl tiene un valor definido
  if (cursorUrl) {
      // Cambiar a una imagen personalizada
      canvaskenzit.freeDrawingCursor = `url("${cursorUrl}") 0 32, crosshair`;
  } else {
      // Establecer el cursor por defecto a crosshair
      canvaskenzit.freeDrawingCursor = 'crosshair';
  }
}
//funciones para deshacer y hacer
document.addEventListener('keydown', function(event) {
  // Verificar si se presiona Ctrl (o Cmd en Mac) y Z
  if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
    console.log('teclas presionadas')
      event.preventDefault(); // Prevenir la acción por defecto
      undo(); // Llamar a la función de deshacer
  }
  // Verificar si se presiona Ctrl (o Cmd en Mac) y Y
  else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
      event.preventDefault(); // Prevenir la acción por defecto
      redo(); // Llamar a la función de rehacer
  }
  // Verificar si se presiona Ctrl (o Cmd en Mac) y Shift y Z para rehacer
  else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') {
      event.preventDefault(); // Prevenir la acción por defecto
      redo(); // Llamar a la función de rehacer
  }
});



// funcion para copiar un objeto
function Copy() {
	// clone what are you copying since you
	// may want copy and paste on different moment.
	// and you do not want the changes happened
	// later to reflect on the copy.
	canvaskenzit.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}
// Evento para detectar teclas presionadas
document.addEventListener('keydown', function(event) {
    // Verificar si se presiona Ctrl (o Cmd en Mac) y C
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault(); // Prevenir la acción por defecto (copiar al portapapeles)
        Copy(); // Llamar a la función de copiar
        console.log('Objeto copiado al portapapeles');
    }
});

// Función para pegar el objeto copiado
function Paste() {
  // Verificar si hay un objeto copiado en _clipboard
  if (!_clipboard) {
      console.log('No hay objeto copiado para pegar.');
      return; // No hacer nada si no hay objeto copiado
  }

  // Clonar el objeto copiado
  _clipboard.clone(function(clonedObj) {
      canvaskenzit.discardActiveObject(); // Deseleccionar cualquier objeto activo
      clonedObj.set({
          left: clonedObj.left + 10, // Mover un poco a la derecha
          top: clonedObj.top + 10, // Mover un poco hacia abajo
          evented: true,
      });
      canvaskenzit.add(clonedObj); // Agregar el objeto clonado al lienzo
      canvaskenzit.setActiveObject(clonedObj); // Seleccionar el objeto pegado
      canvaskenzit.requestRenderAll(); // Renderizar el lienzo

      // Vaciar el portapapeles después de pegar
      _clipboard = null; // O también puedes usar _clipboard = undefined;
      console.log('Objeto pegado y el portapapeles ha sido vaciado.');
  });
}

// Evento para detectar Ctrl + V para pegar
document.addEventListener('keydown', function(event) {
  // Verificar si se presiona Ctrl (o Cmd en Mac) y V
  if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      event.preventDefault(); // Prevenir la acción por defecto (pegar)
      Paste(); // Llamar a la función de pegar
      console.log('Intentando pegar el objeto en el lienzo');
  }
});