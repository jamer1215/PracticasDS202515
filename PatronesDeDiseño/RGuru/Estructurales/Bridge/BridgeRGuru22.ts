/**
 * La Abstracción define la interfaz para la parte de "control" de las dos jerarquías
 * de clase. Mantiene una referencia a un objeto de la jerarquía de Implementación
 * y delega todo el trabajo real a este objeto.
 */
class AbstractionBri {
    protected implementationBri: ImplementationBri; // Implementación a la que se delegan las operaciones

    constructor(implementationBri: ImplementationBri) {
        this.implementationBri = implementationBri; // Inicializa la implementación
    }

    // Realiza una operación utilizando la implementación concreta
    public operation(): string {
        const result = this.implementationBri.operationImplementation(); // Llama a la implementación concreta
        return `Abstracción: Operación base con:\n${result}`; // Devuelve un mensaje con el resultado de la implementación
    }
}

/**
 * Puedes extender la Abstracción sin cambiar las clases de Implementación.
 */
class ExtendedAbstractionBri extends AbstractionBri {
    // Sobrescribe la operación para proporcionar una versión extendida
    public operation(): string {
        const result = this.implementationBri.operationImplementation(); // Llama a la implementación concreta
        return `AbstracciónExtendida: Operación extendida con:\n${result}`; // Devuelve un mensaje indicando la operación extendida
    }
}

/**
 * La Implementación define la interfaz para todas las clases de implementación.
 * No tiene que coincidir con la interfaz de la Abstracción. De hecho, las dos
 * interfaces pueden ser completamente diferentes. Normalmente, la interfaz de 
 * Implementación solo proporciona operaciones primitivas, mientras que la Abstracción 
 * define operaciones de nivel superior basadas en esas primitivas.
 */
interface ImplementationBri {
    operationImplementation(): string; // Método que deben implementar las clases concretas de implementación
}

/**
 * Cada Implementación Concreta corresponde a una plataforma específica y
 * implementa la interfaz de Implementación utilizando la API de esa plataforma.
 */
class ConcreteImplementationABri implements ImplementationBri {
    public operationImplementation(): string {
        return 'ConcreteImplementationA: Aquí está el resultado en la plataforma A.'; // Resultado específico para la plataforma A
    }
}

class ConcreteImplementationBBri implements ImplementationBri {
    public operationImplementation(): string {
        return 'ConcreteImplementationB: Aquí está el resultado en la plataforma B.'; // Resultado específico para la plataforma B
    }
}

/**
 * Excepto por la fase de inicialización, donde un objeto de Abstracción se vincula
 * con un objeto específico de Implementación, el código del cliente solo debería
 * depender de la clase Abstracción. De esta manera, el código del cliente puede
 * soportar cualquier combinación de abstracción-implementación.
 */
function clientCodeBri(abstractionBri: AbstractionBri) {
    // Ejecución de la operación de la abstracción
    console.log(abstractionBri.operation()); // Imprime el resultado de la operación
}

/**
 * El código del cliente debería ser capaz de trabajar con cualquier combinación
 * de abstracción-implementación preconfigurada.
 */
let implementationBri = new ConcreteImplementationABri(); // Implementación concreta A
let abstractionBri = new AbstractionBri(implementationBri); // Abstracción utilizando la implementación A
clientCodeBri(abstractionBri); // Ejecuta el código del cliente con la abstracción

console.log('');

implementationBri = new ConcreteImplementationBBri(); // Cambia a la implementación concreta B
abstractionBri = new ExtendedAbstractionBri(implementationBri); // Abstracción extendida utilizando la implementación B
clientCodeBri(abstractionBri); // Ejecuta el código del cliente con la nueva combinación
