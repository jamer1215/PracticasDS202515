// La clase "Dialog" declara el método fábrica abstracto que debe devolver
// un objeto de una clase de producto. Las subclases proporcionan la implementación.
abstract class Dialog {
    // Este es el método fábrica, que las subclases deben implementar.
    // Retorna un objeto que sigue la interfaz Button.
    abstract createButton(): Button;

    // Este método contiene lógica de negocio que utiliza los objetos de producto
    // creados por el método fábrica.
    render(): void {
        // Invoca el método fábrica para obtener un producto (botón).
        const okButton: Button = this.createButton();
        // Vincula el evento onClick del botón.
        okButton.onClick(this.closeDialog);
        // Renderiza el botón.
        okButton.render();
    }

    // Este sería un ejemplo de un método que se invoca al hacer clic en el botón.
    closeDialog(): void {
        console.log("Cerrando el diálogo...");
    }
}

// Las subclases concretas sobrescriben el método fábrica para devolver un
// producto específico (en este caso, un botón de Windows).
class WindowsDialog extends Dialog {
    // Devuelve un objeto WindowsButton, que implementa la interfaz Button.
    createButton(): Button {
        return new WindowsButton();
    }
}

// Otra subclase que devuelve un producto diferente (un botón HTML).
class WebDialog extends Dialog {
    // Devuelve un objeto HTMLButton.
    createButton(): Button {
        return new HTMLButton();
    }
}

// La interfaz Button declara las operaciones que deben implementar los productos concretos.
interface Button {
    // Método para renderizar el botón.
    render(): void;

    // Método para asociar el evento onClick.
    onClick(action: () => void): void;
}

// Clase concreta que implementa un botón con estilo Windows.
class WindowsButton implements Button {
    // Representa la renderización de un botón en estilo Windows.
    render(): void {
        console.log("Renderizando un botón estilo Windows.");
    }

    // Vincula el evento onClick del sistema operativo nativo.
    onClick(action: () => void): void {
        console.log("Asociando un evento clic nativo de Windows.");
        action(); // Simula el evento clic.
    }
}

// Clase concreta que implementa un botón en HTML.
class HTMLButton implements Button {
    // Devuelve una representación HTML del botón.
    render(): void {
        console.log("Renderizando un botón en HTML.");
    }

    // Vincula un evento clic en el navegador web.
    onClick(action: () => void): void {
        console.log("Asociando un evento clic del navegador.");
        action(); // Simula el evento clic.
    }
}

// Clase principal que gestiona la aplicación.
class Application {
    private dialog!: Dialog;//estoy asegurándome de que dialog va a ser instanciado en algun puntoooo

    // Este método elige el tipo de creador (fábrica) dependiendo del entorno.
    initialize(): void {
        const config = { OS: "Windows" }; // Simulamos una configuración.

        if (config.OS === "Windows") {
            this.dialog = new WindowsDialog();
        } else if (config.OS === "Web") {
            this.dialog = new WebDialog();
        } else {
            throw new Error("Error! Sistema operativo desconocido.");
        }
    }

    // El método principal ejecuta la lógica de la aplicación.
    main(): void {
        this.initialize(); // Inicializa el tipo de fábrica (diálogo).
        this.dialog.render(); // Renderiza el botón usando la fábrica creada.
    }
}

// Ejecución de la aplicación
const app = new Application();
app.main();
