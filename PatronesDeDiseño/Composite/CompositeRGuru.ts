/**
 * La clase base `Component` declara operaciones comunes para objetos simples y 
 * complejos de una composición.
 */
abstract class Component {
    protected parent!: Component | null;

    /**
     * Opcionalmente, el `Component` base puede declarar una interfaz para 
     * establecer y acceder a un padre del componente en una estructura de árbol. 
     * También puede proporcionar alguna implementación predeterminada para estos métodos.
     */
    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    /**
     * En algunos casos, es beneficioso definir las operaciones de gestión de 
     * hijos directamente en la clase base `Component`. De este modo, no será 
     * necesario exponer ninguna clase concreta de componente al código cliente, 
     * incluso durante el ensamblaje del árbol de objetos. La desventaja es que 
     * estos métodos estarán vacíos para los componentes de nivel de hoja.
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    /**
     * Puedes proporcionar un método que permita al código cliente averiguar 
     * si un componente puede tener hijos.
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * El `Component` base puede implementar algún comportamiento predeterminado 
     * o dejarlo para las clases concretas (declarando el método que contiene el 
     * comportamiento como "abstracto").
     */
    public abstract operation(): string;
}

/**
 * La clase `Leaf` (Hoja) representa los objetos finales de una composición. 
 * Una hoja no puede tener hijos.
 *
 * Generalmente, son los objetos `Leaf` los que realizan el trabajo real, 
 * mientras que los objetos `Composite` solo delegan en sus subcomponentes.
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf'; // Devuelve la operación específica para la hoja
    }
}

/**
 * La clase `Composite` representa componentes complejos que pueden tener hijos.
 * Generalmente, los objetos `Composite` delegan el trabajo real a sus hijos y 
 * luego "suman" el resultado.
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * Un objeto `Composite` puede agregar o eliminar otros componentes 
     * (tanto simples como complejos) a o desde su lista de hijos.
     */
    public add(component: Component): void {
        this.children.push(component); // Agrega un componente a la lista de hijos
        component.setParent(this); // Establece este composite como padre del componente agregado
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1); // Elimina el componente de la lista de hijos

        component.setParent(null); // Establece el padre del componente eliminado como null
    }

    public isComposite(): boolean {
        return true; // Indica que este componente es un composite
    }

    /**
     * El `Composite` ejecuta su lógica principal de una manera particular. 
     * Recorre recursivamente a través de todos sus hijos, recopilando y 
     * sumando sus resultados. Dado que los hijos del composite pasan estas 
     * llamadas a sus propios hijos y así sucesivamente, se recorre todo 
     * el árbol de objetos.
     */
    public operation(): string {
        const results:String[] = [];
        for (const child of this.children) {
            results.push(child.operation()); // Recolecta los resultados de las operaciones de cada hijo
        }

        return `Branch(${results.join('+')})`; // Retorna la operación compuesta de todos los hijos
    }
}

/**
 * El código cliente trabaja con todos los componentes a través de la interfaz base.
 */
function clientCode(component: Component) {
    // Ejecuta la operación del componente y la muestra en consola
    console.log(`RESULT: ${component.operation()}`);
}

/**
 * De esta manera, el código cliente puede soportar componentes simples...
 */
const simple = new Leaf();
console.log('Cliente: Tengo un componente simple:');
clientCode(simple); // Muestra el resultado de la operación de la hoja simple
console.log('');

/**
 * ...así como composites complejos.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1); // Agrega la primera rama al árbol
tree.add(branch2); // Agrega la segunda rama al árbol
console.log('Cliente: Ahora tengo un árbol composite:');
clientCode(tree); // Muestra el resultado de la operación del árbol composite
console.log('');

/**
 * Gracias a que las operaciones de gestión de hijos se declaran en la clase 
 * base `Component`, el código cliente puede trabajar con cualquier componente, 
 * simple o complejo, sin depender de sus clases concretas.
 */
function clientCode2(component1: Component, component2: Component) {
    // Comprueba si el primer componente es un composite
    if (component1.isComposite()) {
        component1.add(component2); // Agrega el segundo componente al primero
    }
    // Muestra el resultado de la operación del primer componente
    console.log(`RESULT: ${component1.operation()}`);
}

console.log('Cliente: No necesito comprobar las clases de los componentes incluso al manejar el árbol:');
clientCode2(tree, simple); // Muestra el resultado después de agregar una hoja simple al árbol composite
