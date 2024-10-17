import { Optional } from "../../../Optional";  // Importamos la clase Optional según lo visto en clases (programado aparte)

// Interfaz Iterador define los métodos necesarios para recorrer una colección
interface Iterador<T> {
    next(): Optional<T>;  // Devuelve el siguiente elemento (en caso de tenerlo - Optional súper útil!)
    hasNext(): boolean;  // Verifica si hay más elementos
}

// Nodo de una Lista
class ListNode<T> {
    constructor(
        public next: Optional<ListNode<T>>,// Referencia al siguiente nodo (agregación recursiva)
        public data: T// Valor del nodo
    ) {}
}

// Iterador concreto que recorre el
class ListIterator<T> implements Iterador<T> {
    constructor(private root: Optional<ListNode<T>>) {}  // Nodo actual a iterar - raíz

    next(): Optional<T> {
        if (this.hasNext()) {
            const data = this.root.getValue().data;
            this.root = this.root.getValue().next;  // Avanza al siguiente nodo
            return new Optional<T>(data);
        } else {
            return new Optional<T>();
        }
    }

    hasNext(): boolean {
        return this.root.hasValue();  // Verifica si hay más elementos
    }
}

// Clase abstracta que define el método plantilla (Template Method)
//Definición base del Agregado - Patrón Iterator
abstract class ListAggregate<T> {

    // Método plantilla para obtener un iterador, delega la creación a subclases!
    //todo agregado retorna un iterador (eso es ley)
    getAnIterator(): Iterador<T> {
        return this.createIterator();
    }

    protected abstract createIterator(): Iterador<T>;  // Método abstracto (cada agregado crea un iterador particular)
}

// Clase concreta que implementa el algoritmo específico
//es un agregado que almacena una Lista y crea un iterador particular (ListIterator en este caso)
class ConcreteListAggregate<T> extends ListAggregate<T> {
    constructor(private rootList: ListNode<T>){
        super();
    }
     createIterator(): ListIterator<T> {
        return new ListIterator(new Optional(this.rootList));  // Crea el iterador
    }
}

// Pruebas del código:

//Se me hace más comodo hacerlo así:
const node1 = new ListNode(new Optional<ListNode<number>>(), 10);  // Nodo final
const node2 = new ListNode(new Optional(node1), 5);  // Nodo intermedio
const lista = new ListNode(new Optional(node2), 15);  // Nodo raíz

const aggregate = new ConcreteListAggregate(lista);  // Instancia de ConcreteListAggregate
const iterador = aggregate.getAnIterator();  // Obtenemos el iterador (para este caso se crea el ListIterator)

// Recorremos la lista
console.log(iterador.next().getValue());  // Devuelve 15
console.log(iterador.next().getValue());  // Devuelve 5
console.log(iterador.next().getValue());  // Devuelve 10
console.log(iterador.next().hasValue());  // Devuelve false (no hay más nodos)

if (!iterador.hasNext()) {
    console.log("Llegó el fin!!!");
}
