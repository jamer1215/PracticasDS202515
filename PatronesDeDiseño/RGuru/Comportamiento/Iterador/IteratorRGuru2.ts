/**
 * Patrón de Diseño Iterador
 *
 * Intención: Permite recorrer los elementos de una colección sin exponer su
 * representación interna (lista, pila, árbol, etc.).
 */
interface Iterator<T> {
    // Devuelve el elemento actual.
    current(): T;

    // Devuelve el elemento actual y avanza al siguiente elemento.
    next(): T;

    // Devuelve la clave del elemento actual.
    key(): number;

    // Verifica si la posición actual es válida.
    valid(): boolean;

    // Rebobina el iterador al primer elemento.
    rewind(): void;
}

interface Aggregator {
    // Recupera un iterador externo.
    getIterator(): Iterator<string>;
}

/**
 * Los Iteradores Concretos implementan varios algoritmos de recorrido. Estas clases
 * almacenan la posición actual del recorrido en todo momento.
 */
class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection; // Referencia a la colección de palabras.

    /**
     * Almacena la posición actual del recorrido. Un iterador puede tener muchos
     * otros campos para almacenar el estado de la iteración, especialmente cuando
     * se supone que trabaja con un tipo particular de colección.
     */
    private position: number = 0; // Posición actual en la colección.

    /**
     * Esta variable indica la dirección del recorrido.
     */
    private reverse: boolean = false; // Indica si el recorrido es en orden inverso.

    // Constructor que inicializa el iterador con la colección y la dirección del recorrido.
    constructor(collection: WordsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        // Si el recorrido es inverso, empezamos desde el último elemento.
        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    // Rebobina el iterador al primer o último elemento según la dirección.
    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    // Devuelve el elemento actual de la colección.
    public current(): string {
        return this.collection.getItems()[this.position];
    }

    // Devuelve la posición actual.
    public key(): number {
        return this.position;
    }

    // Devuelve el siguiente elemento y avanza el iterador.
    public next(): string {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1; // Avanza en función de la dirección.
        return item;
    }

    // Verifica si la posición actual es válida.
    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0; // En recorrido inverso, la posición debe ser >= 0.
        }

        return this.position < this.collection.getCount(); // En orden normal, debe ser menor que el tamaño total.
    }
}

/**
 * Las Colecciones Concretas proporcionan uno o varios métodos para recuperar
 * instancias frescas de iteradores, compatibles con la clase de colección.
 */
class WordsCollection implements Aggregator {
    private items: string[] = []; // Arreglo de palabras.

    // Devuelve todos los elementos de la colección.
    public getItems(): string[] {
        return this.items;
    }

    // Devuelve la cantidad de elementos en la colección.
    public getCount(): number {
        return this.items.length;
    }

    // Añade un nuevo elemento a la colección.
    public addItem(item: string): void {
        this.items.push(item);
    }

    // Devuelve un iterador en orden alfabético.
    public getIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this);
    }

    // Devuelve un iterador en orden inverso.
    public getReverseIterator(): Iterator<string> {
        return new AlphabeticalOrderIterator(this, true);
    }
}

/**
 * El código cliente puede o no conocer las clases concretas de Iterador o de Colección,
 * dependiendo del nivel de indirecta que se quiera mantener en el programa.
 */
const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Recorrido en orden:');
while (iterator.valid()) {
    console.log(iterator.next()); // Imprime los elementos en orden.
}

console.log('');
console.log('Recorrido inverso:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
    console.log(reverseIterator.next()); // Imprime los elementos en orden inverso.
}
