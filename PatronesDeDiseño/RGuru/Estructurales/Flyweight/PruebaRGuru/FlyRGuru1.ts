// La clase TreeType representa el estado compartido entre varios árboles (estado intrínseco).
// Por ejemplo, el nombre del árbol, su color y su textura.
// Este estado es constante y no depende de la posición de un árbol en particular.
class TreeType {
    constructor(
        public name: string, // El nombre del tipo de árbol, por ejemplo, "Pino" o "Abeto".
        public color: string, // El color del árbol, por ejemplo, "Verde" o "Verde Oscuro".
        public texture: string // La textura del árbol, por ejemplo, "Áspera" o "Suave".
    ) {}

    // Dibuja el árbol en el lienzo (canvas) en la posición especificada por x e y.
    // El método utiliza el contexto del canvas para configurar el color y dibujar un texto.
    public draw(canvas: HTMLCanvasElement, x: number, y: number): void {
        const context = canvas.getContext("2d"); // Obtiene el contexto 2D del canvas.
        if (context) {
            context.fillStyle = this.color; // Configura el color del texto.
            context.fillText(`Árbol: ${this.name}`, x, y); // Dibuja el nombre del árbol en la posición (x, y).
        }
        // Imprime en consola información sobre el árbol que se está dibujando.
        console.log(`Dibujando el árbol '${this.name}' en (${x}, ${y}) con color ${this.color} y textura ${this.texture}`);
    }
}

// La clase TreeFactory es una fábrica que se encarga de gestionar los objetos TreeType.
// Evita la creación de múltiples instancias de TreeType con las mismas propiedades,
// reutilizando las que ya existen.
class TreeFactory {
    private static treeTypes: Map<string, TreeType> = new Map(); // Mapa para almacenar TreeType compartidos.

    // Devuelve un TreeType existente o crea uno nuevo si no se ha creado previamente.
    public static getTreeType(name: string, color: string, texture: string): TreeType {
        const key = `${name}-${color}-${texture}`; // Crea una clave única combinando el nombre, color y textura.
        if (!this.treeTypes.has(key)) { // Verifica si el TreeType ya existe en el mapa.
            // Si no existe, lo crea y lo almacena en el mapa.
            this.treeTypes.set(key, new TreeType(name, color, texture));
            console.log(`Creando un nuevo TreeType para la clave: ${key}`);
        }
        // Devuelve el TreeType correspondiente a la clave.
        return this.treeTypes.get(key)!;
    }
}

// La clase Tree representa un árbol con estado extrínseco (específico).
// Cada objeto Tree tiene una posición en el espacio (x, y) y un tipo compartido (TreeType).
class Tree {
    constructor(
        public x: number, // Coordenada X del árbol en el lienzo.
        public y: number, // Coordenada Y del árbol en el lienzo.
        public type: TreeType // El tipo de árbol (estado intrínseco compartido).
    ) {}

    // Dibuja el árbol en el lienzo utilizando el tipo de árbol para las propiedades compartidas.
    public draw(canvas: HTMLCanvasElement): void {
        this.type.draw(canvas, this.x, this.y); // Llama al método draw del TreeType.
    }
}

// La clase Forest gestiona una colección de árboles.
// Es el cliente del patrón Flyweight que planta árboles y los dibuja en el lienzo.
class Forest {
    private trees: Tree[] = []; // Arreglo para almacenar los árboles en el bosque.

    // Planta un nuevo árbol en el bosque.
    // Utiliza la fábrica TreeFactory para compartir el estado intrínseco (TreeType).
    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        const type = TreeFactory.getTreeType(name, color, texture); // Obtiene el TreeType compartido.
        const tree = new Tree(x, y, type); // Crea un nuevo árbol con las coordenadas y el tipo.
        this.trees.push(tree); // Agrega el árbol al arreglo de árboles.
    }

    // Dibuja todos los árboles en el lienzo.
    public draw(canvas: HTMLCanvasElement): void {
        for (const tree of this.trees) { // Recorre cada árbol en el bosque.
            tree.draw(canvas); // Llama al método draw del árbol.
        }
    }
}

// Ejemplo de uso
const canvas = document.createElement("canvas"); // Crea un elemento <canvas>.
canvas.width = 800; // Ancho del lienzo.
canvas.height = 600; // Alto del lienzo.
document.body.appendChild(canvas); // Agrega el lienzo al cuerpo del documento.

const forest = new Forest(); // Crea un nuevo bosque.

// Planta varios árboles en el bosque con diferentes coordenadas y tipos.
forest.plantTree(100, 200, "Pino", "Verde", "Áspera");
forest.plantTree(200, 300, "Pino", "Verde", "Áspera");
forest.plantTree(300, 400, "Abeto", "Verde Oscuro", "Suave");
forest.plantTree(150, 250, "Abeto", "Verde Oscuro", "Suave");

// Dibuja todos los árboles en el lienzo.
forest.draw(canvas);

// Mensaje en consola para indicar que la ejecución fue exitosa.
console.log("Se han dibujado todos los árboles en el lienzo.");
