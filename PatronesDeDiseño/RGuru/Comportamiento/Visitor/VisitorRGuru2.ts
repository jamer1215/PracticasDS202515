/**
 * La interfaz ComponentVisi2 declara un método `accept` que debe tomar la interfaz
 * base del visitante como argumento.
 */
interface ComponentVisi2 {
    accept(visitor: VisitorVisi2): void; // Acepta un visitante para realizar operaciones sobre el componente.
}

/**
 * Cada Componente Concreto debe implementar el método `accept` de manera que
 * llame al método del visitante correspondiente a la clase del componente.
 */
class ConcreteComponentAVisi2 implements ComponentVisi2 {
    /**
     * Observa que estamos llamando a `visitConcreteComponentAVisi2`, que coincide con
     * el nombre de la clase actual. De esta forma, hacemos que el visitante sepa
     * con qué clase de componente está trabajando.
     */
    public accept(visitor: VisitorVisi2): void {
        visitor.visitConcreteComponentAVisi2(this);
    }

    /**
     * Los Componentes Concretos pueden tener métodos especiales que no existen en
     * su clase o interfaz base. El visitante puede usar estos métodos ya que es
     * consciente de la clase concreta del componente.
     */
    public exclusiveMethodOfConcreteComponentAVisi2(): string {
        return 'A';
    }
}

class ConcreteComponentBVisi2 implements ComponentVisi2 {
    /**
     * Similar aquí: visitConcreteComponentBVisi2 => ConcreteComponentBVisi2
     */
    public accept(visitor: VisitorVisi2): void {
        visitor.visitConcreteComponentBVisi2(this);
    }

    public specialMethodOfConcreteComponentBVisi2(): string {
        return 'B';
    }
}

/**
 * La interfaz VisitorVisi2 declara un conjunto de métodos de visita que corresponden a
 * las clases de componentes. La firma de un método de visita permite al visitante
 * identificar la clase exacta del componente con el que está tratando.
 */
interface VisitorVisi2 {
    visitConcreteComponentAVisi2(element: ConcreteComponentAVisi2): void; // Visita el componente A

    visitConcreteComponentBVisi2(element: ConcreteComponentBVisi2): void; // Visita el componente B
}

/**
 * Los Visitantes Concretos implementan varias versiones del mismo algoritmo,
 * que pueden trabajar con todas las clases de componentes concretos.
 *
 * Puedes obtener el mayor beneficio del patrón Visitor cuando lo usas con una
 * estructura de objetos compleja, como un árbol Composite. En este caso, puede ser
 * útil almacenar un estado intermedio del algoritmo mientras se ejecutan los
 * métodos del visitante sobre varios objetos de la estructura.
 */
class ConcreteVisitor1Visi2 implements VisitorVisi2 {
    public visitConcreteComponentAVisi2(element: ConcreteComponentAVisi2): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentAVisi2()} + ConcreteVisitor1Visi2`);
    }

    public visitConcreteComponentBVisi2(element: ConcreteComponentBVisi2): void {
        console.log(`${element.specialMethodOfConcreteComponentBVisi2()} + ConcreteVisitor1Visi2`);
    }
}

class ConcreteVisitor2Visi2 implements VisitorVisi2 {
    public visitConcreteComponentAVisi2(element: ConcreteComponentAVisi2): void {
        console.log(`${element.exclusiveMethodOfConcreteComponentAVisi2()} + ConcreteVisitor2Visi2`);
    }

    public visitConcreteComponentBVisi2(element: ConcreteComponentBVisi2): void {
        console.log(`${element.specialMethodOfConcreteComponentBVisi2()} + ConcreteVisitor2Visi2`);
    }
}

/**
 * El código cliente puede ejecutar operaciones del visitante sobre cualquier
 * conjunto de elementos sin averiguar sus clases concretas. La operación `accept`
 * dirige una llamada a la operación adecuada en el objeto visitante.
 */
function clientCodeVisi2(componentsVisi2: ComponentVisi2[], visitorVisi2: VisitorVisi2) {
    // ...
    for (const e of componentsVisi2) {
        e.accept(visitorVisi2); // Llama al método `accept` en cada componente.
    }
    // ...
}

// Creamos algunos componentes concretos.
const componentsVisi2 = [
    new ConcreteComponentAVisi2(),
    new ConcreteComponentBVisi2(),
];

console.log('El código cliente funciona con todos los visitantes a través de la interfaz base VisitorVisi2:');
const visitor1Visi2 = new ConcreteVisitor1Visi2();
clientCodeVisi2(componentsVisi2, visitor1Visi2);
console.log('');

console.log('Permite que el mismo código cliente funcione con diferentes tipos de visitantes:');
const visitor2Visi2 = new ConcreteVisitor2Visi2();
clientCodeVisi2(componentsVisi2, visitor2Visi2);
