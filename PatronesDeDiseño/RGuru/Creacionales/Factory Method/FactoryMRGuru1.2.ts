// Clase base del framework
abstract class FrameworkUI {
    // Método fábrica para crear botones
    abstract crearBoton(): Boton;

    // Lógica común del framework que usa los botones
    renderUI(): void {
        const boton = this.crearBoton();
        boton.render();
    }
}

// Componente estándar del framework
class BotonCuadrado implements Boton {
    render(): void {
        console.log("Renderizando un botón cuadrado");
    }
}

// Interfaz para el botón
interface Boton {
    render(): void;
}

// Subclase que extiende el comportamiento del framework
class UIConBotonesRedondos extends FrameworkUI {
    crearBoton(): Boton {
        return new BotonRedondo();
    }
}

// Componente personalizado del desarrollador
class BotonRedondo implements Boton {
    render(): void {
        console.log("Renderizando un botón redondo");
    }
}

// Uso de la subclase personalizada en lugar del framework base
let miAppUI = new UIConBotonesRedondos();
miAppUI.renderUI();  // Esto creará y renderizará un botón redondo

