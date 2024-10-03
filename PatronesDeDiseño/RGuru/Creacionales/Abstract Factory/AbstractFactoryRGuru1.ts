// La interfaz 'GUIFactory' declara un grupo de métodos que devuelven distintos productos abstractos. 
// Estos productos se denominan familia y están relacionados por un tema o concepto de alto nivel.
// Por ejemplo, en este caso, una familia de productos podría consistir en botones y checkboxes.
// Cada familia tiene múltiples variantes, como la variante Windows o macOS.
// Normalmente, los productos de una familia pueden colaborar entre sí. Una familia de productos 
// puede tener muchas variantes, pero los productos de una variante son incompatibles con los productos de otra.
interface GUIFactory {
    createButton(): Button; // Método para crear un botón (producto abstracto).
    createCheckbox(): Checkbox; // Método para crear un checkbox (producto abstracto).
}

// Las fábricas concretas implementan la interfaz 'GUIFactory' y producen productos que pertenecen a una única variante.
// Cada fábrica garantiza que los productos creados (botón, checkbox, etc.) sean compatibles entre sí dentro de esa variante.
// Por ejemplo, 'WinFactory' crea botones y checkboxes con estilo Windows.
class WinFactory implements GUIFactory {
    // Este método crea un botón con estilo Windows.
    public createButton(): Button {
        return new WinButton(); // Se instancia un botón concreto de Windows.
    }

    // Este método crea un checkbox con estilo Windows.
    public createCheckbox(): Checkbox {
        return new WinCheckbox(); // Se instancia un checkbox concreto de Windows.
    }
}

// La 'MacFactory' también implementa la interfaz 'GUIFactory', pero produce productos de la variante macOS.
// Garantiza que los botones y checkboxes sean compatibles entre sí dentro del estilo macOS.
class MacFactory implements GUIFactory {
    // Método para crear un botón con estilo macOS.
    public createButton(): Button {
        return new MacButton(); // Se instancia un botón concreto de macOS.
    }

    // Método para crear un checkbox con estilo macOS.
    public createCheckbox(): Checkbox {
        return new MacCheckbox(); // Se instancia un checkbox concreto de macOS.
    }
}

// La interfaz 'Button' representa un producto abstracto de la familia.
// Todas las variantes de productos deben implementar esta interfaz.
interface Button {
    paint(): void; // Método que representa el comportamiento de renderización del botón.
}

// 'WinButton' es un producto concreto que implementa la interfaz 'Button'.
// Representa un botón que sigue las convenciones de diseño de Windows.
class WinButton implements Button {
    public paint(): void {
        console.log('Renderizando un botón estilo Windows'); // Comportamiento concreto para Windows.
    }
}

// 'MacButton' es otra implementación concreta de la interfaz 'Button'.
// Representa un botón que sigue las convenciones de diseño de macOS.
class MacButton implements Button {
    public paint(): void {
        console.log('Renderizando un botón estilo macOS'); // Comportamiento concreto para macOS.
    }
}

// La interfaz 'Checkbox' también es parte de la familia de productos.
// Define un comportamiento abstracto para los checkboxes, que será implementado por productos concretos.
interface Checkbox {
    paint(): void; // Método que representa el comportamiento de renderización del checkbox.
}

// 'WinCheckbox' es un producto concreto que implementa la interfaz 'Checkbox'.
// Representa una casilla de verificación con el estilo visual de Windows.
class WinCheckbox implements Checkbox {
    public paint(): void {
        console.log('Renderizando un checkbox estilo Windows'); // Comportamiento concreto para Windows.
    }
}

// 'MacCheckbox' es otra implementación concreta de la interfaz 'Checkbox'.
// Representa una casilla de verificación con el estilo visual de macOS.
class MacCheckbox implements Checkbox {
    public paint(): void {
        console.log('Renderizando un checkbox estilo macOS'); // Comportamiento concreto para macOS.
    }
}

// La clase 'Application' actúa como el cliente que utiliza las fábricas y productos.
// No tiene conocimiento de las implementaciones concretas de los productos ni de las fábricas.
// Trabaja únicamente con tipos abstractos como 'GUIFactory', 'Button' y 'Checkbox'.
// Esto permite cambiar fácilmente entre fábricas y productos en tiempo de ejecución.
class Application {
    // 'factory' es la referencia a la fábrica abstracta que produce los componentes gráficos (botón, checkbox).
    private factory: GUIFactory;

    // 'button' es el producto concreto que será instanciado por la fábrica.
    private button!: Button;//! --> es decirle explícitamente a TypeScript que confías en que la propiedad button 
    //será asignada antes de ser utilizada, usando el operador !.
    //Esto le dice a TypeScript que ignore el hecho de que button no se inicializa en el constructor, porque 
    //garantizas que será asignado antes de su uso.

    // El constructor recibe una fábrica concreta y la asigna a la propiedad 'factory'.
    // Esto permite que 'Application' utilice los productos creados por esa fábrica.
    constructor(factory: GUIFactory) {
        this.factory = factory; // Almacena la fábrica concreta.
    }

    // Método para crear la interfaz de usuario.
    // Este método utiliza la fábrica para crear el botón necesario para la UI.
    public createUI(): void {
        this.button = this.factory.createButton(); // Usa la fábrica para crear un botón concreto.
    }

    // Método para renderizar (pintar) los elementos de la interfaz.
    // Este método delega la tarea de "pintar" al producto concreto (el botón en este caso).
    public paint(): void {
        this.button.paint(); // Llama al método 'paint' del botón concreto.
    }
}

// La clase 'ApplicationConfigurator' es responsable de la configuración de la aplicación.
// Dependiendo del sistema operativo configurado, selecciona la fábrica correcta (Windows o macOS) y la pasa a la aplicación.
class ApplicationConfigurator {
    public static main(): void {
        // Aquí simulamos la lectura de un archivo de configuración de la aplicación.
        const config = { OS: 'Windows' }; // Esta configuración es simulada. En la práctica, se leería desde un archivo real.

        // Dependiendo del sistema operativo, se crea una fábrica correspondiente.
        let factory: GUIFactory;
        if (config.OS === 'Windows') {
            factory = new WinFactory(); // Se elige la fábrica para productos Windows.
        } else if (config.OS === 'Mac') {
            factory = new MacFactory(); // Se elige la fábrica para productos macOS.
        } else {
            throw new Error('Error! Sistema operativo desconocido.'); // Lanza una excepción si el SO no es reconocido.
        }

        // Se crea la aplicación y se pasa la fábrica seleccionada.
        const app = new Application(factory);
        app.createUI(); // Se crea la interfaz de usuario.
        app.paint(); // Se "pintan" (renderizan) los componentes gráficos.
    }
}

// Llamada al método principal para ejecutar la aplicación.
ApplicationConfigurator.main(); // Ejecuta la configuración y la aplicación.
