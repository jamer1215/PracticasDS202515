/**
 * La interfaz base `Component` define las operaciones que pueden ser
 * modificadas por los decoradores.
 */
interface Comp {
    operation(): string;
}

/**
 * Los componentes concretos proporcionan implementaciones por defecto de las
 * operaciones. Puede haber varias variaciones de estas clases.
 */
class ConcreteComponente implements Comp {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * La clase base `Decorator` sigue la misma interfaz que los otros componentes.
 * El propósito principal de esta clase es definir la interfaz de envoltura
 * (wrapping) para todos los decoradores concretos. La implementación por
 * defecto del código de envoltura puede incluir un campo para almacenar un
 * componente envuelto y los medios para inicializarlo.
 */
class Decorator implements Comp {
    protected component: Comp; // Almacena el componente que va a decorar

    constructor(component: Comp) {
        this.component = component; // Inicializa el componente que va a ser decorado
    }

    /**
     * El decorador delega todo el trabajo al componente envuelto.
     */
    public operation(): string {
        return this.component.operation(); // Llama a la operación del componente original
    }
}

/**
 * Los decoradores concretos llaman al objeto envuelto y alteran su resultado
 * de alguna manera.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Los decoradores pueden llamar a la implementación de la operación del
     * padre en lugar de llamar directamente al objeto envuelto. Este enfoque
     * simplifica la extensión de clases decoradoras.
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`; // Modifica el resultado añadiendo un comportamiento extra
    }
}

/**
 * Los decoradores pueden ejecutar su comportamiento antes o después de la
 * llamada a un objeto envuelto.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`; // Modifica el resultado de forma adicional
    }
}

/**
 * El código del cliente trabaja con todos los objetos utilizando la interfaz
 * `Component`. De esta manera, puede mantenerse independiente de las clases
 * concretas de los componentes con los que trabaja.
 */
function clientCodigo(component: Comp) {
    // ...

    console.log(`RESULTADO: ${component.operation()}`);

    // ...
}

/**
 * De esta forma, el código del cliente puede manejar tanto componentes simples...
 */
let compSimple = new ConcreteComponente();
console.log('Cliente: Tengo un componente simple:');
clientCodigo(compSimple);
console.log('');

/**
 * ...como también componentes decorados.
 *
 * Nota cómo los decoradores pueden envolver no solo componentes simples, sino
 * también otros decoradores.
 */
const decorator1 = new ConcreteDecoratorA(compSimple); // Envuelve el componente simple en el decorador A
const decorator2 = new ConcreteDecoratorB(decorator1); // Envuelve el decorador A en el decorador B
console.log('Cliente: Ahora tengo un componente decorado:');
clientCodigo(decorator2); // El resultado se procesa a través de todos los decoradores
