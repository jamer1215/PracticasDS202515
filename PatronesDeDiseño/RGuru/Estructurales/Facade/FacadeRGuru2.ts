/**
 * La clase Facade proporciona una interfaz simple a la lógica compleja de uno o
 * varios subsistemas. La fachada delega las solicitudes del cliente a los
 * objetos apropiados dentro del subsistema. La fachada también es responsable de
 * gestionar su ciclo de vida. Todo esto protege al cliente de la complejidad
 * no deseada del subsistema.
 */
class Facade {
    protected subsystem1: Subsystem1; // Referencia a Subsystem1.

    protected subsystem2: Subsystem2; // Referencia a Subsystem2.

    /**
     * Dependiendo de las necesidades de la aplicación, puedes proporcionar la fachada con
     * objetos de subsistemas existentes o hacer que la fachada los cree por su cuenta.
     */
    constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
        // Inicializa los subsistemas. Si no se proporcionan, se crean nuevas instancias.
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    /**
     * Los métodos de la fachada son accesos convenientes a la funcionalidad
     * sofisticada de los subsistemas. Sin embargo, los clientes obtienen solo una fracción
     * de las capacidades de un subsistema.
     */
    public operation(): string {
        let result = 'La fachada inicializa los subsistemas:\n';
        // Llama a la operación del subsistema 1.
        result += this.subsystem1.operation1();
        // Llama a la operación del subsistema 2.
        result += this.subsystem2.operation1();
        result += 'La fachada ordena a los subsistemas que realicen la acción:\n';
        // Llama a la operación N del subsistema 1.
        result += this.subsystem1.operationN();
        // Llama a la operación Z del subsistema 2.
        result += this.subsystem2.operationZ();

        return result; // Devuelve el resultado de las operaciones realizadas.
    }
}

/**
 * El Subsystem puede aceptar solicitudes tanto de la fachada como del cliente directamente.
 * En cualquier caso, para el subsistema, la fachada sigue siendo otro cliente, y no es
 * parte del subsistema.
 */
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: ¡Listo!\n'; // Mensaje indicando que el subsistema está listo.
    }

    // ...

    public operationN(): string {
        return 'Subsystem1: ¡Avanzar!\n'; // Mensaje indicando que el subsistema está listo para proceder.
    }
}

/**
 * Algunos facades pueden trabajar con múltiples subsistemas al mismo tiempo.
 */
class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: ¡Prepárate!\n'; // Mensaje de preparación del subsistema 2.
    }

    // ...

    public operationZ(): string {
        return 'Subsystem2: ¡Fuego!'; // Mensaje indicando que el subsistema 2 ha iniciado la acción.
    }
}

/**
 * El código del cliente trabaja con subsistemas complejos a través de una interfaz simple
 * proporcionada por la fachada. Cuando una fachada gestiona el ciclo de vida del subsistema,
 * el cliente puede ni siquiera saber de la existencia del subsistema. Este
 * enfoque te permite mantener la complejidad bajo control.
 */
function clientCodeFa(facade: Facade) {
    // Llama al método de operación de la fachada y muestra el resultado en la consola.
    console.log(facade.operation());
}

/**
 * El código del cliente puede tener algunos de los objetos del subsistema ya creados. En
 * este caso, puede ser conveniente inicializar la fachada con estos objetos
 * en lugar de dejar que la fachada cree nuevas instancias.
 */
const subsystem1 = new Subsystem1(); // Crea una instancia del subsistema 1.
const subsystem2 = new Subsystem2(); // Crea una instancia del subsistema 2.
const facade = new Facade(subsystem1, subsystem2); // Crea una fachada utilizando las instancias existentes.
clientCodeFa(facade); // Llama a la función clientCode para ejecutar la operación de la fachada.
