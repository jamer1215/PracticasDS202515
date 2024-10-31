import { Optional } from "../../../Optional";

/**
 * La interfaz manejadora declara un método para ejecutar una solicitud.
 */
interface ComponentWithContextualHelpCoR1 {
    // El método `showHelp` se define para mostrar ayuda contextual.
    showHelp(): void;
}

/**
 * La clase base para componentes simples.
 */
abstract class ComponentCoR1 implements ComponentWithContextualHelpCoR1 {
    // Campo para almacenar el texto de ayuda que se mostrará.
    public tooltipText: Optional<string> = new Optional<string>();

    // El contenedor del componente actúa como el siguiente eslabón de la cadena de manejadores.
    public container: Optional<ContainerCoR1> = new Optional<ContainerCoR1>();

    // El componente muestra una pista si tiene un texto de ayuda asignado.
    // De lo contrario, reenvía la llamada al contenedor, si es que existe.
    showHelp(): void {
        if (this.tooltipText.hasValue()) {
            // Muestra la pista. Aquí, simula mostrando el texto de ayuda.
            console.log(`Ayuda: ${this.tooltipText.getValue()}`);
        } else if (this.container.hasValue()) {
            // Si el componente no tiene texto de ayuda, delega la solicitud al contenedor.
            this.container.getValue().showHelp();
        }
    }
}

/**
 * Los contenedores pueden contener componentes simples y otros contenedores como hijos.
 * Las relaciones de la cadena se establecen aquí. La clase hereda el comportamiento `showHelp` de su padre.
 */
abstract class ContainerCoR1 extends ComponentCoR1 {
    // Array para almacenar los componentes hijos.
    protected children: ComponentCoR1[] = [];

    // Método para agregar un componente hijo al contenedor.
    add(child: ComponentCoR1): void {
        this.children.push(child);
        child.container = new Optional<ContainerCoR1>(this); // Establece este contenedor como el padre del hijo agregado.
    }
}

/**
 * Los componentes primitivos pueden estar bien con la implementación de la ayuda por defecto...
 */
class ButtonCoR1 extends ComponentCoR1 {
    // La clase `ButtonCoR1` hereda el comportamiento predeterminado de `ComponentCoR1`.
    // Puede usar el método `showHelp` tal como está, o sobrescribirlo si es necesario.
}

/**
 * Pero los componentes complejos pueden sobrescribir la implementación por defecto.
 * Si no puede proporcionarse el texto de ayuda de una nueva forma, el componente siempre puede invocar la implementación base.
 */
class PanelCoR1 extends ContainerCoR1 {
    // Campo para almacenar un texto de ayuda específico para el panel.
    private modalHelpText: Optional<string> = new Optional<string>();

    constructor(modalHelpText?: string) {
        super();
        if (modalHelpText) {
            this.modalHelpText = new Optional<string>(modalHelpText);
        }
    }

    showHelp(): void {
        if (this.modalHelpText.hasValue()) {
            // Muestra una ventana modal con el texto de ayuda.
            console.log(`Ayuda del panel: ${this.modalHelpText.getValue()}`);
        } else {
            // Si no tiene ayuda específica, invoca la implementación de la clase base.
            super.showHelp();
        }
    }
}

/**
 * La clase `DialogCoR1` puede sobrescribir el método `showHelp` para proporcionar una implementación específica.
 */
class DialogCoR1 extends ContainerCoR1 {
    // Campo para almacenar la URL de una página de ayuda wiki.
    private wikiPageURL: Optional<string> = new Optional<string>();

    constructor(wikiPageURL?: string) {
        super();
        if (wikiPageURL) {
            this.wikiPageURL = new Optional<string>(wikiPageURL);
        }
    }

    showHelp(): void {
        if (this.wikiPageURL.hasValue()) {
            // Abre la página de ayuda wiki.
            console.log(`Abriendo la página de ayuda: ${this.wikiPageURL.getValue()}`);
        } else {
            // Si no tiene una URL específica, llama al método base.
            super.showHelp();
        }
    }
}

/**
 * Código cliente.
 */
class ApplicationCoR1 {
    private dialog: DialogCoR1;

    constructor() {
        this.dialog = new DialogCoR1("http://help.url.com");
        this.createUI(); // Configura la interfaz de usuario.
    }

    // Cada aplicación configura la cadena de forma diferente.
    createUI(): void {
        const panel = new PanelCoR1("Este panel hace...");
        const okButton = new ButtonCoR1();
        okButton.tooltipText = new Optional<string>("Este es un botón OK que...");

        const cancelButton = new ButtonCoR1();
        cancelButton.tooltipText = new Optional<string>("Este botón cancela la operación actual.");

        panel.add(okButton);
        panel.add(cancelButton);
        this.dialog.add(panel);
    }

    // Imagina lo que pasa aquí cuando se presiona la tecla F1.
    onF1KeyPress(): void {
        // Obtiene el componente bajo el cursor del ratón.
        const component = this.getComponentAtMouseCoords();
        if (component.hasValue()) {
            // Llama al método `showHelp` del componente para mostrar la ayuda.
            component.getValue().showHelp();
        }
    }

    // Método simulado para obtener el componente bajo el cursor del ratón.
    getComponentAtMouseCoords(): Optional<ComponentCoR1> {
        // En una aplicación real, esto identificaría el componente en las coordenadas del mouse.
        // Aquí se simula devolviendo el primer componente agregado al diálogo.
        return new Optional<ComponentCoR1>(this.dialog);
    }
}

// Prueba del código de la aplicación.
const app = new ApplicationCoR1();
app.onF1KeyPress(); // Simula presionar la tecla F1 para mostrar la ayuda.
