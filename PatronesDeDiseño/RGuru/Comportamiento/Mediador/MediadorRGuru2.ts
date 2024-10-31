/**
 * La interfaz Mediator declara un método utilizado por los componentes para
 * notificar al mediador sobre varios eventos. El mediador puede reaccionar
 * a estos eventos y pasar la ejecución a otros componentes.
 */
interface MediatorMe2 {
    notify(sender: object, event: string): void;
}

/**
 * Los Mediadores Concretos implementan el comportamiento cooperativo 
 * coordinando varios componentes.
 */
class ConcreteMediatorMe2 implements MediatorMe2 {
    private component1: Component1Me2; // Referencia al primer componente
    private component2: Component2Me2; // Referencia al segundo componente

    constructor(c1: Component1Me2, c2: Component2Me2) {
        // Almacena referencias a los componentes y configura el mediador en ellos.
        this.component1 = c1;
        this.component1.setMediator(this); // Establece el mediador para el componente 1
        this.component2 = c2;
        this.component2.setMediator(this); // Establece el mediador para el componente 2
    }

    // Notifica al mediador sobre un evento y permite que tome decisiones.
    public notify(sender: object, event: string): void {
        if (event === 'A') {
            console.log('El Mediador reacciona a A y desencadena las siguientes operaciones:');
            this.component2.doC(); // Llama al método doC del componente 2
        }

        if (event === 'D') {
            console.log('El Mediador reacciona a D y desencadena las siguientes operaciones:');
            this.component1.doB(); // Llama al método doB del componente 1
            this.component2.doC(); // Llama al método doC del componente 2
        }
    }
}

/**
 * El Componente Base proporciona la funcionalidad básica para almacenar
 * una instancia del mediador dentro de los objetos de los componentes.
 */
class BaseComponentMe2 {
    protected mediator: MediatorMe2; // El mediador que coordina este componente

    constructor(mediator?: MediatorMe2) {
        // Inicializa el mediador si se proporciona uno
        this.mediator = mediator!;
    }

    // Establece el mediador para el componente
    public setMediator(mediator: MediatorMe2): void {
        this.mediator = mediator;
    }
}

/**
 * Los Componentes Concretos implementan varias funcionalidades. No dependen
 * de otros componentes ni de ninguna clase de mediador concreto.
 */
class Component1Me2 extends BaseComponentMe2 {
    // Método que realiza la acción A
    public doA(): void {
        console.log('El Componente 1 ejecuta A.');
        this.mediator.notify(this, 'A'); // Notifica al mediador sobre el evento "A"
    }

    // Método que realiza la acción B
    public doB(): void {
        console.log('El Componente 1 ejecuta B.');
        this.mediator.notify(this, 'B'); // Notifica al mediador sobre el evento "B"
    }
}

class Component2Me2 extends BaseComponentMe2 {
    // Método que realiza la acción C
    public doC(): void {
        console.log('El Componente 2 ejecuta C.');
        this.mediator.notify(this, 'C'); // Notifica al mediador sobre el evento "C"
    }

    // Método que realiza la acción D
    public doD(): void {
        console.log('El Componente 2 ejecuta D.');
        this.mediator.notify(this, 'D'); // Notifica al mediador sobre el evento "D"
    }
}

/**
 * Código del cliente.
 * 
 * En este caso, se crean instancias de los componentes y el mediador.
 * Luego, se disparan operaciones en los componentes que son manejadas
 * por el mediador para coordinar las acciones.
 */
const c1 = new Component1Me2(); // Crear instancia del Componente 1
const c2 = new Component2Me2(); // Crear instancia del Componente 2
const mediator = new ConcreteMediatorMe2(c1, c2); // Crear el mediador y vincularlo con los componentes

console.log('El cliente dispara la operación A.');
c1.doA(); // El cliente inicia la operación A en el Componente 1

console.log('');
console.log('El cliente dispara la operación D.');
c2.doD(); // El cliente inicia la operación D en el Componente 2
