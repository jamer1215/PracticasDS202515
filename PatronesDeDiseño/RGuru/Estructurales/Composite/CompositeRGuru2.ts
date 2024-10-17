// La interfaz Graphic declara operaciones comunes para objetos simples y complejos de una composición.
interface Graphic {
    move(x: number, y: number): void;
    draw(): void;
}

// La clase Dot representa objetos finales de una composición (hojas). 
// Un objeto hoja no puede tener subcomponentes. Normalmente, son los objetos hoja los que hacen el trabajo real.
class Dot implements Graphic {
    protected x: number;
    protected y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number): void {
        this.x += x;
        this.y += y;
        console.log(`Moviendo el punto a (${this.x}, ${this.y})`);
    }

    draw(): void {
        console.log(`Dibujando un punto en (${this.x}, ${this.y})`);
    }
}

// La clase Circle extiende Dot para representar un círculo.
class CircleC extends Dot {
    private radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }

    draw(): void {
        console.log(`Dibujando un círculo en (${this.x}, ${this.y}) con radio ${this.radius}`);
    }
}

// La clase CompoundGraphic representa componentes complejos que pueden tener hijos.
// Los objetos compuestos delegan el trabajo real a sus subcomponentes.
class CompoundGraphic implements Graphic {
    private children: Graphic[] = [];

    add(child: Graphic): void {
        this.children.push(child);
        console.log("Añadiendo un componente.");
    }

    remove(child: Graphic): void {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            console.log("Eliminando un componente.");
        }
    }

    move(x: number, y: number): void {
        console.log(`Moviendo el componente compuesto a (${x}, ${y})`);
        for (const child of this.children) {
            child.move(x, y);
        }
    }

    draw(): void {
        console.log("Dibujando un componente compuesto:");
        for (const child of this.children) {
            child.draw();
        }
        console.log("Dibujo del componente compuesto completado.");
    }
}

// La clase ImageEditor actúa como el cliente que trabaja con todos los componentes a través de su interfaz base.
class ImageEditor {
    private all: CompoundGraphic;

    constructor() {
        this.all = new CompoundGraphic();
    }

    load(): void {
        this.all.add(new Dot(1, 2));
        this.all.add(new CircleC(5, 3, 10));
        console.log("Componentes cargados en el editor.");
    }

    groupSelected(components: Graphic[]): void {
        const group = new CompoundGraphic();
        for (const component of components) {
            group.add(component);
            this.all.remove(component);
        }
        this.all.add(group);
        console.log("Componentes seleccionados agrupados.");
        this.all.draw(); // Dibuja todos los componentes.
    }
}

// Prueba del código
const editor = new ImageEditor();
editor.load();
const dot = new Dot(10, 20);
const circlec = new CircleC(15, 25, 30);
editor.groupSelected([dot, circlec]);
