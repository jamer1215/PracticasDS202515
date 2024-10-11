/**
 * La clase Creator declara el método fábrica que debe devolver un
 * objeto de la clase Product. Las subclases del Creator normalmente 
 * proporcionan la implementación de este método.
 */
abstract class Creator {
    /**
     * Nota que el Creator también puede proporcionar alguna implementación
     * por defecto del método fábrica.
     */
    public abstract factoryMethod(): Product;

    /**
     * También ten en cuenta que, a pesar de su nombre, la responsabilidad principal 
     * del Creator no es crear productos. Usualmente, contiene cierta lógica de negocio 
     * central que depende de objetos Product devueltos por el método fábrica. 
     * Las subclases pueden cambiar indirectamente esa lógica de negocio 
     * sobrescribiendo el método fábrica y devolviendo un tipo diferente de producto.
     */
    public someOperation(): string {
        // Llama al método fábrica para crear un objeto Product.
        const product = this.factoryMethod();
        // Ahora, usa el producto.
        return `Creator: El mismo código del creador ha funcionado con ${product.operation()}`;
    }
}

/**
 * Los Creadores Concretos sobrescriben el método fábrica para cambiar 
 * el tipo de producto resultante.
 */
class ConcreteCreator1 extends Creator {
    /**
     * Nota que la firma del método aún utiliza el tipo abstracto Product,
     * aunque el producto concreto es el que realmente se devuelve del método.
     * De esta forma, el Creator puede permanecer independiente de las clases
     * de productos concretos.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * La interfaz Product declara las operaciones que todos los productos
 * concretos deben implementar.
 */
interface Product {
    operation(): string;
}

/**
 * Los Productos Concretos proporcionan varias implementaciones de la interfaz Product.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Resultado de ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Resultado de ConcreteProduct2}';
    }
}

/**
 * El código cliente trabaja con una instancia de un creador concreto, aunque 
 * a través de su interfaz base. Mientras el cliente siga trabajando con el 
 * creador a través de la interfaz base, puedes pasarle cualquier subclase del creador.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Cliente: No estoy al tanto de la clase del creador, pero aun así funciona.');
    console.log(creator.someOperation());
    // ...
}

/**
 * La aplicación elige el tipo del creador dependiendo de la configuración o el entorno.
 */
console.log('App: Lanzada con ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Lanzada con ConcreteCreator2.');
clientCode(new ConcreteCreator2());
