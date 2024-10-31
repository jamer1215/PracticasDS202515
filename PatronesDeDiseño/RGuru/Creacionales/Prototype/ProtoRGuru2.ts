/**
 * La clase de ejemplo que tiene capacidad de clonación. Veremos cómo se
 * clonarán los valores de los campos con diferentes tipos.
 */
class Prototype {
    public primitive: any; // Campo de tipo primitivo
    public component: object; // Componente de tipo objeto
    public circularReference: ComponentWithBackReference; // Referencia circular

    constructor() {
        // Inicializa las propiedades con valores predeterminados
        this.primitive = null; // O un valor predeterminado que tenga sentido
        this.component = {}; // Un objeto vacío como valor predeterminado
        this.circularReference = new ComponentWithBackReference(this); // Inicializa con una instancia
    }

    // Método que clona el objeto actual
    public clone(): this {
        // Crea un nuevo objeto clon utilizando el objeto actual como prototipo
        const clone = Object.create(this);

        // Clona el componente, creando una copia del objeto original
        clone.component = Object.create(this.component);

        // Clonar un objeto que tiene un objeto anidado con referencia circular
        // requiere un tratamiento especial. Después de que la clonación se haya
        // completado, el objeto anidado debe apuntar al objeto clonado, en
        // lugar del objeto original. El operador de propagación puede ser útil
        // para este caso.
        clone.circularReference = {
            ...this.circularReference, // Clona las propiedades de la referencia circular
            prototype: { ...this }, // Asigna el prototipo al objeto clonado
        };

        return clone; // Retorna el objeto clonado
    }
}

/**
 * Clase que tiene una referencia de vuelta al objeto Prototype.
 */
class ComponentWithBackReference {
    public prototype; // Referencia al prototipo

    // Constructor que inicializa la referencia al prototipo
    constructor(prototype: Prototype) {
        this.prototype = prototype; // Establece la referencia al objeto Prototype
    }
}

/**
 * Código del cliente que utiliza las clases Prototype y ComponentWithBackReference.
 */
function clientCodeProto() {
    // Crea una nueva instancia de Prototype
    const p1 = new Prototype();
    p1.primitive = 245; // Asigna un valor primitivo
    p1.component = new Date(); // Asigna un componente (en este caso, una fecha)
    p1.circularReference = new ComponentWithBackReference(p1); // Asigna la referencia circular

    // Clona el objeto p1
    const p2 = p1.clone();

    // Verifica si el campo primitivo ha sido copiado correctamente
    if (p1.primitive === p2.primitive) {
        console.log('¡Los valores de los campos primitivos se han trasladado a un clon. Yay!');
    } else {
        console.log('¡Los valores de los campos primitivos no se han copiado. Booo!');
    }

    // Verifica si el componente simple ha sido clonado
    if (p1.component === p2.component) {
        console.log('¡El componente simple no ha sido clonado. Booo!');
    } else {
        console.log('¡El componente simple ha sido clonado. Yay!');
    }

    // Verifica si la referencia circular ha sido clonada
    if (p1.circularReference === p2.circularReference) {
        console.log('¡El componente con referencia circular no ha sido clonado. Booo!');
    } else {
        console.log('¡El componente con referencia circular ha sido clonado. Yay!');
    }

    // Verifica si la referencia circular sigue apuntando al objeto original
    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('¡El componente con referencia circular está vinculado al objeto original. Booo!');
    } else {
        console.log('¡El componente con referencia circular está vinculado al clon. Yay!');
    }
}

// Ejecuta el código del cliente
clientCodeProto();
