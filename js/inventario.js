const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
// Definición de la clase Producto
class Producto {
  constructor(name, cantidad, minimo, precio, descripcion, categoria) {
    this.name = name; // Cambié 'nombre' por 'name' para mantener consistencia
    this.cantidad = parseInt(cantidad);
    this.minimo = parseInt(minimo);
    this.precio = parseFloat(precio);
    this.descripcion = descripcion;
    this.categoria = categoria;
  }

  agregarStock(cantidad) {
    this.cantidad += cantidad;
    this.mostrarMensaje(`${cantidad} unidades de ${this.name} agregadas. Stock actual: ${this.cantidad}`);
  }

  quitarStock(cantidad) {
    if (this.cantidad >= cantidad) {
      this.cantidad -= cantidad;
      this.mostrarMensaje(`${cantidad} unidades de ${this.name} retiradas. Stock actual: ${this.cantidad}`);
    } else {
      this.mostrarMensaje(`No hay suficiente stock de ${this.name}. Stock actual: ${this.cantidad}`);
    }
  }

  verificarStock() {
    return this.cantidad < this.minimo;
  }

  mostrarMensaje(mensaje) {
    const divModal = document.querySelector(".modalProducto");
    if (divModal) {
      divModal.textContent = mensaje;
    } else {
      alert(mensaje); // En caso de que no exista el div, mostramos una alerta como respaldo
    }
  }
}

// Definición de la clase Inventario
class Inventario {
  constructor() {
    this.productos = productosLista; // Inicializa con productos desde localStorage
  }

  agregarProducto(producto) {
    this.productos.push(producto);
    this.actualizarLocalStorage(); // Guardar productos en localStorage
    this.mostrarMensaje(`${producto.name} ha sido añadido al inventario.`);
  }

  buscarProducto(nombre) {
    return this.productos.find(producto => producto.name === nombre);
  }

  mostrarInventario() {
    const inventarioDiv = document.querySelector("#inventario");
    inventarioDiv.innerHTML = ''; // Limpiar el contenido previo
    this.productos.forEach(producto => {
      inventarioDiv.innerHTML += `<p>Producto: ${producto.name}, Stock: ${producto.cantidad}, Precio: $${producto.precio}</p>`;
    });
  }

  verificarStockBajo() {
    const productosBajos = this.productos.filter(producto => producto.verificarStock());
    if (productosBajos.length > 0) {
      this.mostrarMensaje("Productos con stock bajo:");
      productosBajos.forEach(producto => this.mostrarMensaje(`- ${producto.name}: ${producto.cantidad} unidades`));
    } else {
      this.mostrarMensaje("No hay productos con stock bajo.");
    }
  }

  actualizarLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  mostrarMensaje(mensaje) {
    const divModal = document.querySelector(".modalInventario");
    if (divModal) {
      divModal.innerHTML += `<p>${mensaje}</p>`;
    } else {
      alert(mensaje); // Respaldo en caso de que no exista el div
    }
  }
}

// Definición de la clase Movimiento
class Movimiento {
  constructor(producto, cantidad, tipo) {
    this.producto = producto;
    this.cantidad = parseInt(cantidad);
    this.tipo = tipo;
    this.fecha = new Date();
  }

  registrarMovimiento() {
    if (this.tipo === "entrada") {
      this.producto.agregarStock(this.cantidad);
    } else if (this.tipo === "salida") {
      this.producto.quitarStock(this.cantidad);
    }
    this.mostrarMensaje(`Movimiento registrado: ${this.tipo} de ${this.cantidad} unidades de ${this.producto.name} el ${this.fecha}`);
  }

  mostrarMensaje(mensaje) {
    const divModal = document.querySelector(".modalMovimiento");
    if (divModal) {
      divModal.innerHTML += `<p>${mensaje}</p>`;
    } else {
      alert(mensaje); // Respaldo en caso de que no exista el div
    }
  }
}

// Crear el inventario desde localStorage o lista vacía
const inventario = new Inventario();

// Crear algunos productos de ejemplo
const tomate = new Producto("Tomate", 100, 20, 2, "Tomate fresco", "Verduras");
const queso = new Producto("Queso", 50, 10, 5, "Queso Cheddar", "Lácteos");

// Agregar productos al inventario
inventario.agregarProducto(tomate);
inventario.agregarProducto(queso);

// Mostrar el inventario inicial
inventario.mostrarInventario();

// Registrar una salida (uso de ingredientes)
const movimientoSalida = new Movimiento(tomate, 30, "salida");
movimientoSalida.registrarMovimiento();

// Mostrar el inventario después del uso
inventario.mostrarInventario();

// Verificar productos con stock bajo
inventario.verificarStockBajo();