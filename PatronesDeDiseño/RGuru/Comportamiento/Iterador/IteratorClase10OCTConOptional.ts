import { Optional } from "../../../Optional";  // Importamos la clase Optional creada anteriormente.

/**
 * Interface Iterador<T> define los métodos necesarios para recorrer una colección.
 * Esta interfaz sigue el patrón Iterator, el cual permite recorrer una colección
 * de elementos sin exponer su estructura interna.
 */
 export interface Iterador<T> {
    /**
     * Método que devuelve el siguiente elemento en la colección.
     * Si no hay más elementos, retorna `Optional.empty()`.
     */
    next(): Optional<T>;

    /**
     * Método que verifica si hay más elementos en la colección.
     * Devuelve `true` si hay más elementos, de lo contrario `false`.
     */
    hasNext(): boolean;
}

export interface Aggregate<T>{
    getIterator():Iterador<T>
}

/**
 * La clase ListNode<T> representa un nodo de una lista enlazada.
 * Cada nodo contiene un valor `data` y una referencia (`next`) al siguiente nodo en la lista.
 * Si `next` es un `Optional.empty()`, significa que este es el último nodo de la lista.
 */
class ListNode<T> {

    constructor(
        public next: Optional<ListNode<T>>,  // Usamos Optional para evitar valores `null`.
        public data: T                       // El valor que contiene este nodo.
    ) {}
}

/**
 * La clase ListIterator<T> implementa la interfaz Iterador<T>.
 * Es un iterador que recorre la lista enlazada de nodos.
 */
class ListIterator<T> implements Iterador<T> {
    /**
     * La variable `root` mantiene una referencia al nodo actual que está siendo iterado.
     * Al iniciar, `root` es el nodo raíz de la lista, y a medida que se llama a `next()`,
     * el iterador avanza al siguiente nodo.
     */
    constructor(
        private root: Optional<ListNode<T>>  // Usamos Optional para evitar valores `null`.
    ){}

    /**
     * Método `next()`:
     * Si hay más nodos en la lista (verificado con `hasNext()`), devuelve el valor del nodo actual
     * y avanza al siguiente nodo.
     * Si no hay más nodos, devuelve `Optional.empty()`.
     */
    next(): Optional<T> {
        if (this.hasNext()) {  // Si hay un nodo actual.
            const data = this.root.getValue().data;  // Obtiene el valor del nodo actual.
            this.root = this.root.getValue().next;  // Avanza al siguiente nodo en la lista.
            return new Optional<T>(data);  // Retorna el valor del nodo actual envuelto en `Optional`.
        } else {
            return new Optional<T>();  // Si no hay más nodos, retorna `Optional.empty()`.
        }
    }

    /**
     * Método `hasNext()`:
     * Verifica si hay más nodos en la lista (si el nodo actual no es un `Optional.empty()`).
     * Si `root` no es un `Optional.empty()`, significa que aún hay nodos por recorrer.
     */
    hasNext(): boolean {
        return this.root.hasValue();  // Si `root` tiene un valor, hay más elementos.
    }
}

/**
 * La clase ListAggregate<T> es un agregado que almacena una lista enlazada
 * y proporciona un método para obtener un iterador que recorrerá esa lista.
 */
class ListAggregate<T> implements Aggregate<T>{
    constructor(private rootList: ListNode<T>) {}

    /**
     * Método `getListIterator()`:
     * Devuelve una nueva instancia del iterador `ListIterator`, inicializado con el nodo raíz de la lista.
     */
    getIterator(): ListIterator<T> {
        return new ListIterator(new Optional(this.rootList));  // Crea un nuevo iterador para la lista.
    }
}

// Probemos el código:

// Creación de una lista enlazada de nodos.
// El nodo `node1` tiene valor 10 y es el último nodo, por lo que `next` es `Optional.empty()`.
const node1 = new ListNode(new Optional<ListNode<number>>(), 10);

// El nodo `node2` tiene valor 5 y su siguiente nodo es `node1`.
const node2 = new ListNode(new Optional(node1), 5);

// El nodo `lista` es el nodo raíz y tiene valor 15, y su siguiente nodo es `node2`.
const lista = new ListNode(new Optional(node2), 15);

// Creamos una instancia de ListAggregate con el nodo raíz `lista`.
const aggregate = new ListAggregate(lista);

// Obtenemos un iterador para recorrer la lista.
const iterador = aggregate.getIterator();

// Recorremos la lista usando el iterador.
// El método `next()` devuelve el valor del nodo actual y avanza al siguiente nodo.
console.log(iterador.next().getValue());  // Devuelve 15 (el valor del nodo raíz).
console.log(iterador.next().getValue());  // Devuelve 5 (el valor del segundo nodo).
console.log(iterador.next().getValue());  // Devuelve 10 (el valor del último nodo).
console.log(iterador.next().hasValue());  // Devuelve `false` porque ya no hay más nodos.

// Verificamos si hay más nodos usando `hasNext()`:
if (!iterador.hasNext()) {
    console.log("Llegó el fin!!!");  // Muestra este mensaje cuando no hay más nodos.
}
