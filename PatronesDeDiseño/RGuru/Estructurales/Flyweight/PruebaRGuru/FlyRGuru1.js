"use strict";
// La clase Flyweight contiene una parte del estado de un árbol que es compartida entre varios árboles.
// Por ejemplo, la textura y el color son propiedades compartidas, pero las coordenadas no.
class TreeType {
    constructor(name, color, texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }
    // Dibuja el árbol en un lienzo con las coordenadas X e Y.
    draw(canvas, x, y) {
        const context = canvas.getContext("2d");
        if (context) {
            context.fillStyle = this.color;
            context.fillText(`Árbol: ${this.name}`, x, y);
        }
        console.log(`Dibujando el árbol '${this.name}' en (${x}, ${y}) con color ${this.color} y textura ${this.texture}`);
    }
}
// La fábrica Flyweight mantiene un registro de los TreeType ya creados para reutilizarlos.
class TreeFactory {
    static getTreeType(name, color, texture) {
        const key = `${name}-${color}-${texture}`;
        if (!this.treeTypes.has(key)) {
            this.treeTypes.set(key, new TreeType(name, color, texture));
            console.log(`Creando un nuevo TreeType para la clave: ${key}`);
        }
        return this.treeTypes.get(key);
    }
}
TreeFactory.treeTypes = new Map();
// La clase Tree contiene el estado extrínseco de un árbol, como las coordenadas.
class Tree {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
    // Dibuja el árbol en el lienzo utilizando el TreeType.
    draw(canvas) {
        this.type.draw(canvas, this.x, this.y);
    }
}
// La clase Forest es el cliente del patrón Flyweight, que mantiene una colección de árboles.
class Forest {
    constructor() {
        this.trees = [];
    }
    // Planta un nuevo árbol utilizando el patrón Flyweight para compartir el estado intrínseco.
    plantTree(x, y, name, color, texture) {
        const type = TreeFactory.getTreeType(name, color, texture);
        const tree = new Tree(x, y, type);
        this.trees.push(tree);
    }
    // Dibuja todos los árboles en el lienzo.
    draw(canvas) {
        for (const tree of this.trees) {
            tree.draw(canvas);
        }
    }
}
// Ejemplo de uso
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const forest = new Forest();
forest.plantTree(100, 200, "Pino", "Verde", "Áspera");
forest.plantTree(200, 300, "Pino", "Verde", "Áspera");
forest.plantTree(300, 400, "Abeto", "Verde Oscuro", "Suave");
forest.plantTree(150, 250, "Abeto", "Verde Oscuro", "Suave");
// Dibuja todos los árboles en el lienzo.
forest.draw(canvas);
