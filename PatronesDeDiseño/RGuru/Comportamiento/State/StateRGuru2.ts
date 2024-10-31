/**
 * El Contexto define la interfaz de interés para los clientes. También mantiene una
 * referencia a una instancia de una subclase de Estado, que representa el estado actual
 * del Contexto.
 */
class Context {
    /**
     * @type {State} Una referencia al estado actual del Contexto.
     */
    private state!: State; // Usamos el operador de afirmación no nula para indicar que 'state' se inicializará en el constructor.

    constructor(state: State) {
        // Inicializa el contexto con un estado dado y realiza la transición al mismo.
        this.transitionTo(state);
    }

    /**
     * El Contexto permite cambiar el objeto Estado en tiempo de ejecución.
     */
    public transitionTo(state: State): void {
        // Informa sobre la transición al nuevo estado.
        console.log(`Contexto: Transición a ${(<any>state).constructor.name}.`);
        this.state = state; // Cambia al nuevo estado.
        this.state.setContext(this); // Establece el contexto en el nuevo estado.
    }

    /**
     * El Contexto delega parte de su comportamiento al objeto Estado actual.
     */
    public request1(): void {
        this.state.handle1(); // Llama al método handle1 del estado actual.
    }

    public request2(): void {
        this.state.handle2(); // Llama al método handle2 del estado actual.
    }
}

/**
 * La clase base Estado declara métodos que todos los Estados Concretos deben
 * implementar y también proporciona una referencia de retorno al objeto Contexto,
 * asociado con el Estado. Esta referencia puede ser utilizada por los Estados para
 * transitar el Contexto a otro Estado.
 */
abstract class State {
    protected context!: Context; // Usamos el operador de afirmación no nula para indicar que 'context' se inicializará en 'setContext'.

    public setContext(context: Context) {
        this.context = context; // Establece el contexto para el estado.
    }

    // Métodos abstractos que los estados concretos deben implementar.
    public abstract handle1(): void;
    public abstract handle2(): void;
}

/**
 * Los Estados Concretos implementan varios comportamientos, asociados con un estado del
 * Contexto.
 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA maneja request1.');
        console.log('ConcreteStateA quiere cambiar el estado del contexto.');
        // Cambia al estado ConcreteStateB.
        this.context.transitionTo(new ConcreteStateB());
    }

    public handle2(): void {
        console.log('ConcreteStateA maneja request2.');
    }
}

class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB maneja request1.');
    }

    public handle2(): void {
        console.log('ConcreteStateB maneja request2.');
        console.log('ConcreteStateB quiere cambiar el estado del contexto.');
        // Cambia al estado ConcreteStateA.
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * Código del cliente.
 */
const context = new Context(new ConcreteStateA()); // Inicializa el contexto en ConcreteStateA.
context.request1(); // Llama a request1, lo que cambiará a ConcreteStateB.
context.request2(); // Llama a request2 en ConcreteStateB, lo que cambiará de nuevo a ConcreteStateA.
