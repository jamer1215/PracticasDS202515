// La interfaz 'GUIFactoryGe' declara un grupo de métodos que devuelven distintos productos abstractos. 
// Estos productos se denominan familia y están relacionados por un tema o concepto de alto nivel.
interface GUIFactoryGe<B, C> {
    createButton(): B; // Método para crear un botón (producto abstracto).
    createCheckbox(): C; // Método para crear un checkbox (producto abstracto).
}

// Las fábricas concretas implementan la interfaz 'GUIFactoryGe' y producen productos que pertenecen a una única variante.
class WinFactoryGe implements GUIFactoryGe<WinButtonGe, WinCheckboxGe> {
    public createButton(): WinButtonGe {
        return new WinButtonGe(); // Se instancia un botón concreto de Windows.
    }

    public createCheckbox(): WinCheckboxGe {
        return new WinCheckboxGe(); // Se instancia un checkbox concreto de Windows.
    }
}

class MacFactoryGe implements GUIFactoryGe<MacButtonGe, MacCheckboxGe> {
    public createButton(): MacButtonGe {
        return new MacButtonGe(); // Se instancia un botón concreto de macOS.
    }

    public createCheckbox(): MacCheckboxGe {
        return new MacCheckboxGe(); // Se instancia un checkbox concreto de macOS.
    }
}

// La interfaz 'ButtonGe' representa un producto abstracto de la familia.
interface ButtonGe {
    paint(): void; // Método que representa el comportamiento de renderización del botón.
}

// 'WinButtonGe' es un producto concreto que implementa la interfaz 'ButtonGe'.
class WinButtonGe implements ButtonGe {
    public paint(): void {
        console.log('Renderizando un botón estilo Windows'); // Comportamiento concreto para Windows.
    }
}

// 'MacButtonGe' es otra implementación concreta de la interfaz 'ButtonGe'.
class MacButtonGe implements ButtonGe {
    public paint(): void {
        console.log('Renderizando un botón estilo macOS'); // Comportamiento concreto para macOS.
    }
}

// La interfaz 'CheckboxGe' también es parte de la familia de productos.
interface CheckboxGe {
    paint(): void; // Método que representa el comportamiento de renderización del checkbox.
}

// 'WinCheckboxGe' es un producto concreto que implementa la interfaz 'CheckboxGe'.
class WinCheckboxGe implements CheckboxGe {
    public paint(): void {
        console.log('Renderizando un checkbox estilo Windows'); // Comportamiento concreto para Windows.
    }
}

// 'MacCheckboxGe' es otra implementación concreta de la interfaz 'CheckboxGe'.
class MacCheckboxGe implements CheckboxGe {
    public paint(): void {
        console.log('Renderizando un checkbox estilo macOS'); // Comportamiento concreto para macOS.
    }
}

// La clase 'ApplicGe' actúa como el cliente que utiliza las fábricas y productos.
class ApplicGe {
    private factory: GUIFactoryGe<ButtonGe, CheckboxGe>; // Se especifica la fábrica genérica.

    private button!: ButtonGe; // Se usa el operador ! para indicar que 'button' será inicializado antes de usarse.

    constructor(factory: GUIFactoryGe<ButtonGe, CheckboxGe>) {
        this.factory = factory; // Almacena la fábrica concreta.
    }

    public createUI(): void {
        this.button = this.factory.createButton(); // Usa la fábrica para crear un botón concreto.
    }

    public paint(): void {
        this.button.paint(); // Llama al método 'paint' del botón concreto.
    }
}

// La clase 'ApplicationConfiguratorGe' es responsable de la configuración de la aplicación.
class ApplicationConfiguratorGe {
    public static main(): void {
        const config = { OS: 'Mac' }; // Simulación de configuración.

        let factory: GUIFactoryGe<ButtonGe, CheckboxGe>; // Definición de la fábrica genérica.
        if (config.OS === 'Windows') {
            factory = new WinFactoryGe(); // Se elige la fábrica para productos Windows.
        } else if (config.OS === 'Mac') {
            factory = new MacFactoryGe(); // Se elige la fábrica para productos macOS.
        } else {
            throw new Error('Error! Sistema operativo desconocido.'); // Lanza una excepción si el SO no es reconocido.
        }

        const app = new ApplicGe(factory);
        app.createUI(); // Se crea la interfaz de usuario.
        app.paint(); // Se "pintan" (renderizan) los componentes gráficos.
    }
}

// Llamada al método principal para ejecutar la aplicación.
ApplicationConfiguratorGe.main(); // Ejecuta la configuración y la aplicación.
