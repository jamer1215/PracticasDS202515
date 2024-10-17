import { Optional } from "../PatronesDeDiseño/Optional";
import { Aggregate, Iterador } from "../PatronesDeDiseño/RGuru/Comportamiento/Iterador/IteratorClase10OCTConOptional";

// Interfaz Componente que define las operaciones básicas
interface Componente extends Aggregate<Componente> {
    calcularPrecio(): number;
    isComposite(): boolean;
}

// Clase Elemento que representa un componente hoja
class Elemento implements Componente {
    constructor(public precio: number) {}

    public isComposite(): boolean {
        return false; // No es un composite, es una hoja
    }

    calcularPrecio(): number {
        return this.precio;
    }

    // Un Elemento no tiene hijos, por lo tanto devuelve un iterador vacío
    getIterator(): Iterador<Componente> {
        return new IteratorCompos(this);
    }
}

// Clase Compositor que representa un conjunto de componentes
class Compositor implements Componente {
    private componentes: Componente[] = [];

    add(component: Componente): void {
        this.componentes.push(component);
    }

    remove(component: Componente): void {
        const index = this.componentes.indexOf(component);
        if (index !== -1) {
            this.componentes.splice(index, 1);
        }
    }

    calcularPrecio(): number {
        let precio = 0;

        for (let co of this.componentes){
            precio+=co.calcularPrecio();
        }

        return precio;//precio=me retorna la suma de los precios de la serie de componentes que este (this) composite tiene
    }

    isComposite(): boolean {
        return true;
    }

    // Devuelve un iterador para recorrer los componentes
    getIterator(): Iterador<Componente> {
        return new IteratorCompos(this);
    }
}

// Ajuste del Iterador para aceptar cualquier Componente
class IteratorCompos implements Iterador<Componente> {
    private index = 0;//elemento i del array, empieza en el primero
    private componentes: Componente[] = [];

    constructor(root: Componente) {
        // Si es un compositor, agregamos sus hijos. Si no, agregamos solo el elemento.
        if (root.isComposite()) {
            this.componentes = (root as Compositor)["componentes"];//lo del downcasting que explica Calonzo
        } else {
            this.componentes.push(root);
        }
    }

    next(): Optional<Componente> {
        if (this.hasNext()) {
            const component = this.componentes[this.index++];//i+=1
            return new Optional(component);
        }else{
            return new Optional();
        }
        
    }

    hasNext(): boolean {
        return this.index < this.componentes.length;
    }
}

// Clase Mapper para aplicar una función a los elementos de una colección
class Mapper<E, F> {
    map(collection: Aggregate<E>, f: (e: E) => F): F[] {
        const iterator = collection.getIterator();
        const result: F[] = [];

        while (iterator.hasNext()) {
            const optionalElement = iterator.next();
            if (optionalElement.hasValue()) {
                const transformedElement = f(optionalElement.getValue());
                result.push(transformedElement);
            }
        }

        return result;
    }
}

// Prueba del Código

const elemento1 = new Elemento(100);
const elemento2 = new Elemento(200);
const compositor = new Compositor();
compositor.add(elemento1);
compositor.add(elemento2);

//prueba de fuego propuesta por Fornari
const compositorfuego = new Compositor()
compositorfuego.add(compositor);

const mapper = new Mapper<Componente, number>();


// Mapeo para obtener los precios de los elementos
const precios = mapper.map(compositorfuego, (e) => e.calcularPrecio()*3);
console.log("Precios mapeados:", precios); // [300, 600]

//AHORA AÑADAMOS AL CODIGO UNA ESTRUCTURA DE GRAFO PARA COMPROBAR LA UTILIDAD DE APLICAR ITERATOR Y USAR EL MAPPER:

// Clase Nodo para el grafo, que representa un vértice del grafo
class Nodo {
    constructor(public valor: number, public vecinos: Nodo[] = []) {}

    // Método para agregar un vecino al nodo
    agregarVecino(nodo: Nodo): void {
        this.vecinos.push(nodo);
    }
}

// Clase Grafo que representa un conjunto de nodos
class Grafo implements Aggregate<Nodo> {
    private nodos: Nodo[] = [];

    // Método para agregar un nodo al grafo
    agregarNodo(nodo: Nodo): void {
        this.nodos.push(nodo);
    }

    // Método para obtener el iterador del grafo
    getIterator(): Iterador<Nodo> {
        return new GrafoIterator(this);
    }

    // Método para obtener todos los nodos del grafo
    getNodos(): Nodo[] {
        return this.nodos;
    }
}

// Iterador para recorrer los nodos del grafo
class GrafoIterator implements Iterador<Nodo> {
    private index = 0;
    private visitados: Set<Nodo> = new Set();
    private stack: Nodo[] = [];

    constructor(grafo: Grafo) {
        // Iniciamos el recorrido con todos los nodos iniciales en el grafo
        this.stack = [...grafo.getNodos()];
    }

    next(): Optional<Nodo> {
        while (this.stack.length > 0) {
            const nodoActual = this.stack.pop()!; // Extraemos el último nodo en la pila
            if (!this.visitados.has(nodoActual)) {
                this.visitados.add(nodoActual);
                // Agregamos los vecinos al stack para continuar el recorrido
                this.stack.push(...nodoActual.vecinos);
                return new Optional(nodoActual);
            }
        }
        return new Optional(); // Si no hay más nodos por recorrer, retornamos un Optional vacío
    }

    hasNext(): boolean {
        // Hay más nodos si la pila no está vacía
        return this.stack.length > 0;
    }
}

// Prueba del código

// Creación de nodos del grafo
const nodo1 = new Nodo(50);
const nodo2 = new Nodo(150);
const nodo3 = new Nodo(100);
nodo1.agregarVecino(nodo2); // nodo1 tiene como vecino a nodo2
nodo2.agregarVecino(nodo3); // nodo2 tiene como vecino a nodo3
nodo3.agregarVecino(nodo1); // nodo3 tiene como vecino a nodo1, creando un ciclo

// Creación del grafo y adición de nodos
const grafo = new Grafo();
grafo.agregarNodo(nodo1);
grafo.agregarNodo(nodo2);
grafo.agregarNodo(nodo3);

// Mapeo de los nodos para multiplicar sus valores por 3
const mapper2 = new Mapper<Nodo, number>();
const valoresMultiplicados = mapper2.map(grafo, (nodo) => nodo.valor * 3);
console.log("Valores mapeados del grafo:", valoresMultiplicados); // [150, 450, 300]
