// La clase TreeTypeCons representa el tipo de árbol con propiedades compartidas.
class TreeTypeCons {
    constructor(
        // Nombre del tipo de árbol
        public name: string,
        // Color del árbol
        public color: string,
        // Textura del árbol
        public texture: string
    ) {}

    // Método para "dibujar" el árbol imprimiendo información en la consola.
    public draw(x: number, y: number): void {
        console.log(`Dibujando el árbol '${this.name}' en (${x}, ${y}) con color ${this.color} y textura ${this.texture}`);
    }
}

// La clase TreeFactoryCons actúa como una fábrica que mantiene un registro de los TreeTypeCons ya creados.
class TreeFactoryCons {
    // Mapa que almacena los tipos de árbol creados, utilizando una clave única.
    private static treeTypes: Map<string, TreeTypeCons> = new Map();

    // Método para obtener o crear un TreeTypeCons.
    public static getTreeType(name: string, color: string, texture: string): TreeTypeCons {
        // Creamos una clave única para cada tipo de árbol basado en sus propiedades.
        const key = `${name}-${color}-${texture}`;
        
        // Si no existe un TreeTypeCons para esa clave, creamos uno nuevo.
        if (!this.treeTypes.has(key)) {
            this.treeTypes.set(key, new TreeTypeCons(name, color, texture));
            console.log(`Creando un nuevo TreeTypeCons para la clave: ${key}`);
        }
        
        // Retornamos el TreeTypeCons correspondiente a la clave.
        return this.treeTypes.get(key)!; // El operador '!' asegura que nunca retornará undefined.
    }
}

// La clase TreeCons representa un árbol individual y su estado extrínseco, como las coordenadas.
class TreeCons {
    constructor(
        // Coordenada X del árbol
        public x: number,
        // Coordenada Y del árbol
        public y: number,
        // Tipo de árbol, que incluye propiedades compartidas
        public type: TreeTypeCons
    ) {}

    // Método para dibujar el árbol usando su tipo.
    public draw(): void {
        this.type.draw(this.x, this.y); // Llama al método draw del TreeTypeCons.
    }
}

// La clase ForestCons actúa como el cliente del patrón Flyweight, manteniendo una colección de árboles.
class ForestCons {
    // Arreglo para almacenar todos los árboles plantados en el bosque.
    private trees: TreeCons[] = [];

    // Método para plantar un nuevo árbol en el bosque.
    public plantTree(x: number, y: number, name: string, color: string, texture: string): void {
        // Obtenemos o creamos el tipo de árbol usando la fábrica.
        const type = TreeFactoryCons.getTreeType(name, color, texture);
        
        // Creamos una nueva instancia de TreeCons usando las coordenadas y el tipo de árbol.
        const tree = new TreeCons(x, y, type);
        
        // Agregamos el árbol a la colección de árboles del bosque.
        this.trees.push(tree);
    }

    // Método para dibujar todos los árboles en el bosque.
    public draw(): void {
        // Iteramos sobre cada árbol y llamamos a su método draw.
        for (const tree of this.trees) {
            tree.draw(); // Dibuja cada árbol.
        }
    }
}

// Ejemplo de uso de las clases definidas
const forestCons = new ForestCons(); // Creamos una nueva instancia de ForestCons.

// Plantamos varios árboles en el bosque con diferentes propiedades.
forestCons.plantTree(100, 200, "Pino", "Verde", "Áspera");
forestCons.plantTree(200, 300, "Pino", "Verde", "Áspera");
forestCons.plantTree(300, 400, "Abeto", "Verde Oscuro", "Suave");
forestCons.plantTree(150, 250, "Abeto", "Verde Oscuro", "Suave");

// Dibuja todos los árboles en el bosque, imprimiendo la información en la consola.
forestCons.draw();

// Mensaje en consola para indicar que la ejecución fue exitosa.
console.log("Se han dibujado todos los árboles.");
