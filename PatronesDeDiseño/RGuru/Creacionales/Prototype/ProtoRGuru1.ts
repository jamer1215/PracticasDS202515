// Clase abstracta base para el prototipo.
abstract class Shape {
    // Campos comunes a todas las formas.
    public x: number;
    public y: number;
    public color: string;

    // Constructor que puede ser usado para inicializar con valores o para copiar un objeto fuente.
    constructor(source?: Shape) {
        if (source) {
            // Si se proporciona un objeto fuente, copiamos sus valores.
            this.x = source.x;
            this.y = source.y;
            this.color = source.color;
        } else {
            // Si no se proporciona un objeto fuente, inicializamos con valores por defecto.
            this.x = 0;
            this.y = 0;
            this.color = "";
        }
    }

    // Método abstracto de clonación que será implementado por las subclases.
    abstract clone(): Shape;
}

// Clase concreta Rectangle que extiende de Shape.
class Rectangle extends Shape {
    public width: number;
    public height: number;

    // Constructor que puede ser usado para inicializar o para copiar un objeto fuente.
    constructor(source?: Rectangle) {
        super(source); // Llamada al constructor de la clase base.
        if (source) {
            this.width = source.width;
            this.height = source.height;
        } else {
            this.width = 0;
            this.height = 0;
        }
    }

    // Implementación del método de clonación.
    clone(): Shape {
        return new Rectangle(this); // Crea una nueva instancia con los mismos valores.
    }
}

// Clase concreta Circle que extiende de Shape.
class Circle extends Shape {
    public radius: number;

    // Constructor que puede ser usado para inicializar o para copiar un objeto fuente.
    constructor(source?: Circle) {
        super(source);
        if (source) {
            this.radius = source.radius;
        } else {
            this.radius = 0;
        }
    }

    // Implementación del método de clonación.
    clone(): Shape {
        return new Circle(this);
    }
}

// Clase Application que actúa como cliente.
class ApplicationPro {
    public shapes: Shape[] = []; // Almacena las formas.

    constructor() {
        // Crear un objeto Circle.
        const circle = new Circle();
        circle.x = 10;
        circle.y = 10;
        circle.radius = 20;
        this.shapes.push(circle); // Agregar el círculo a la lista.

        // Clonar el objeto Circle.
        const anotherCircle = circle.clone();
        this.shapes.push(anotherCircle); // Agregar la copia del círculo.

        // Crear un objeto Rectangle.
        const rectangle = new Rectangle();
        rectangle.width = 10;
        rectangle.height = 20;
        this.shapes.push(rectangle); // Agregar el rectángulo a la lista.
    }

    // Método de lógica de negocio para clonar la lista de formas.
    businessLogic(): void {
        const shapesCopy: Shape[] = []; // Lista para almacenar las copias.

        // Iterar sobre la lista de formas y clonar cada una.
        for (const shape of this.shapes) {
            shapesCopy.push(shape.clone());
        }

        // Ahora, shapesCopy contiene copias exactas de los objetos en shapes.
        console.log("Copias de las formas:", shapesCopy);
    }
}

// Ejemplo de uso.
const apppro = new ApplicationPro();
apppro.businessLogic();
