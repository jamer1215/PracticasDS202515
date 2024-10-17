// La interfaz ShapeVisi declara un método `accept` que toma la interfaz Visitor como argumento.
// Este método permite que un objeto visitante interactúe con la estructura de clases.
interface ShapeVisi {
    move(x: number, y: number): void; // Mueve la forma en el eje X e Y.
    draw(): void; // Dibuja la forma en sus coordenadas actuales.
    accept(v: Visitor): void; // Acepta un visitante para que realice operaciones sobre el objeto.
}

// Cada clase de elemento concreto implementa el método `accept` de manera que invoca
// el método del visitante correspondiente a la clase del elemento.

// Clase DotVisi representa un punto en el plano.
class DotVisi implements ShapeVisi {
    constructor(public id: number, public x: number, public y: number) {}

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    draw(): void {
        console.log(`Dibujando un punto en (${this.x}, ${this.y})`);
    }

    // El método accept llama a `visitDot` en el visitante, pasándole este objeto como argumento.
    accept(v: Visitor): void {
        v.visitDot(this);
    }
}

// Clase CircleVisi representa un círculo.
class CircleVisi implements ShapeVisi {
    constructor(public id: number, public x: number, public y: number, public radius: number) {}

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    draw(): void {
        console.log(`Dibujando un círculo en (${this.x}, ${this.y}) con radio ${this.radius}`);
    }

    // El método accept llama a `visitCircle` en el visitante, pasándole este objeto como argumento.
    accept(v: Visitor): void {
        v.visitCircle(this);
    }
}

// Clase RectangleVisi representa un rectángulo.
class RectangleVisi implements ShapeVisi {
    constructor(public id: number, public x: number, public y: number, public width: number, public height: number) {}

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }

    draw(): void {
        console.log(`Dibujando un rectángulo en (${this.x}, ${this.y}) con ancho ${this.width} y alto ${this.height}`);
    }

    // El método accept llama a `visitRectangle` en el visitante, pasándole este objeto como argumento.
    accept(v: Visitor): void {
        v.visitRectangle(this);
    }
}

// Clase CompoundShape representa una forma compuesta de múltiples formas.
class CompoundShape implements ShapeVisi {
    private children: ShapeVisi[] = []; // Almacena los subcomponentes.

    constructor(public id: number) {}

    add(shape: ShapeVisi): void {
        this.children.push(shape);
    }

    move(x: number, y: number): void {
        for (const child of this.children) {
            child.move(x, y);
        }
    }

    draw(): void {
        console.log(`Dibujando una forma compuesta con ID ${this.id}`);
        for (const child of this.children) {
            child.draw();
        }
    }

    // El método accept llama a `visitCompoundShape` en el visitante, pasándole este objeto como argumento.
    accept(v: Visitor): void {
        v.visitCompoundShape(this);
    }
}

// La interfaz Visitor declara un grupo de métodos de visita que se corresponden con las clases de elementos.
// Permite que el visitante actúe sobre cada tipo de elemento.
interface Visitor {
    visitDot(d: DotVisi): void;
    visitCircle(c: CircleVisi): void;
    visitRectangle(r: RectangleVisi): void;
    visitCompoundShape(cs: CompoundShape): void;
}

// Clase XMLExportVisitor implementa el Visitor para exportar los elementos en formato XML.
class XMLExportVisitor implements Visitor {
    visitDot(d: DotVisi): void {
        console.log(`<dot id="${d.id}" x="${d.x}" y="${d.y}" />`);
    }

    visitCircle(c: CircleVisi): void {
        console.log(`<circle id="${c.id}" x="${c.x}" y="${c.y}" radius="${c.radius}" />`);
    }

    visitRectangle(r: RectangleVisi): void {
        console.log(`<rectangle id="${r.id}" x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" />`);
    }

    visitCompoundShape(cs: CompoundShape): void {
        console.log(`<compound_shape id="${cs.id}">`);
        // Aquí podríamos recorrer los hijos y exportarlos también.
        console.log(`</compound_shape>`);
    }
}

// Clase ApplicationVisi actúa como el cliente que ejecuta operaciones con el visitante en una colección de elementos.
class ApplicationVisi {
    private allShapes: ShapeVisi[] = []; // Lista de todas las formas.

    constructor() {
        // Se agregan algunas formas a la lista.
        const dot = new DotVisi(1, 10, 20);
        const circle = new CircleVisi(2, 15, 25, 10);
        const rectangle = new RectangleVisi(3, 30, 40, 50, 60);
        const compound = new CompoundShape(4);
        compound.add(dot);
        compound.add(circle);
        compound.add(rectangle);

        this.allShapes.push(dot, circle, rectangle, compound);
    }

    // Método para exportar todas las formas usando el visitante.
    export(): void {
        const exportVisitor = new XMLExportVisitor();
        for (const shape of this.allShapes) {
            shape.accept(exportVisitor);
        }
    }
}

// Ejemplo de uso
const appVisi = new ApplicationVisi();
appVisi.export();
