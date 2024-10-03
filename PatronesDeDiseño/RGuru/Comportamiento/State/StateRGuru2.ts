/**
 * El Contexto define la interfaz de interés para los clientes. 
 * También mantiene una referencia a una instancia de una subclase de Estado, 
 * que representa el estado actual del Contexto.
 */
class Context {
    /**
     * @type {State} Una referencia al estado actual del Contexto.
     */
    private state?: Estado; // Aquí almacenamos el estado actual. Se hace opcional.

    constructor(state: Estado) {
        this.transitionTo(state); // Al crear el contexto, lo inicializamos con un estado.
    }

    /**
     * El Contexto permite cambiar el objeto State en tiempo de ejecución.
     */
    public transitionTo(state: Estado): void {
        console.log(`Contexto: Transición a ${(<any>state).constructor.name}.`); // Mostramos en consola la transición.
        this.state = state; // Actualizamos el estado actual del contexto.
        this.state.setContext(this); // Notificamos al nuevo estado sobre el contexto actual.
    }

    /**
     * El Contexto delega parte de su comportamiento al objeto State actual.
     */
    public request1(): void {
        this.state?.handle1(); // Llamamos al método handle1 del estado actual, usando encadenamiento opcional.
    }

    public request2(): void {
        this.state?.handle2(); // Llamamos al método handle2 del estado actual, usando encadenamiento opcional.
    }
}

/**
 * La clase base State declara métodos que todos los estados concretos deben
 * implementar y también proporciona una referencia inversa al objeto Contexto,
 * asociado con el Estado. Esta referencia inversa puede ser utilizada por los
 * estados para transitar el Contexto a otro Estado.
 */
abstract class Estado {
    protected context?: Context; // Se hace opcional.

    public setContext(context: Context) {
        this.context = context; // Establecemos el contexto actual.
    }

    public abstract handle1(): void; // Método abstracto a implementar por los estados concretos.
    
    public abstract handle2(): void; // Otro método abstracto a implementar.
}

/**
 * Los Estados Concretos implementan varios comportamientos, 
 * asociados con un estado del Contexto.
 */
class ConcreteStateA extends Estado {
    clickLock(): void {
        throw new Error("Method not implemented.");
    }
    clickPlay(): void {
        throw new Error("Method not implemented.");
    }
    clickNext(): void {
        throw new Error("Method not implemented.");
    }
    clickPrevious(): void {
        throw new Error("Method not implemented.");
    }
    public handle1(): void {
        console.log('ConcreteStateA maneja request1.'); // Mensaje indicando que el estado A maneja la solicitud 1.
        console.log('ConcreteStateA quiere cambiar el estado del contexto.'); // Mensaje indicando que quiere cambiar el estado.
        // Cambiamos el estado del contexto a ConcreteStateB.
        this.context?.transitionTo(new ConcreteStateB()); 
    }

    public handle2(): void {
        console.log('ConcreteStateA maneja request2.'); // Mensaje indicando que el estado A maneja la solicitud 2.
    }
}

class ConcreteStateB extends Estado {
    public handle1(): void {
        console.log('ConcreteStateB maneja request1.'); // Mensaje indicando que el estado B maneja la solicitud 1.
    }

    public handle2(): void {
        console.log('ConcreteStateB maneja request2.'); // Mensaje indicando que el estado B maneja la solicitud 2.
        console.log('ConcreteStateB quiere cambiar el estado del contexto.'); // Mensaje indicando que quiere cambiar el estado.
        // Cambiamos el estado del contexto a ConcreteStateA.
        this.context?.transitionTo(new ConcreteStateA()); 
    }
}

/**
 * El código del cliente.
 * Aquí se crea una instancia del contexto con el estado inicial ConcreteStateA.
 */
const context = new Context(new ConcreteStateA()); 
context.request1(); // Realizamos la solicitud 1, que provocará un cambio de estado.
context.request2(); // Realizamos la solicitud 2, que puede o no cambiar el estado.
