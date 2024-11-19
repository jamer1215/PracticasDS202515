// Interfaz abstracta para las fábricas.
interface AbstractFactory<T> {
    create(type: number): T;
}

// Fábrica concreta 1 que implementa la interfaz AbstractFactory.
class ConcreteFactory1 implements AbstractFactory<Item> {
    create(type: number): Item {
        if (type === 1) {
            return new ItemA(); // Crea un objeto de tipo ItemA.
        } else if (type === 2) {
            return new ItemB(); // Crea un objeto de tipo ItemB.
        } else {
            throw new Error('Unknown type in ConcreteFactory1: ' + type); // Manejo de errores si el tipo no es válido.
        }
    }
}

// Fábrica concreta 2 que implementa la interfaz AbstractFactory.
class ConcreteFactory2 implements AbstractFactory<Item> {
    create(type: number): Item {
        if (type === 3) {
            return new ItemC(); // Crea un objeto de tipo ItemC.
        } else if (type === 4) {
            return new ItemD(); // Crea un objeto de tipo ItemD.
        } else {
            throw new Error('Unknown type in ConcreteFactory2: ' + type); // Manejo de errores si el tipo no es válido.
        }
    }
}

// Interfaz abstracta para los productos.
interface Item {
    operation(): string; // Método que define la operación que los productos deben implementar.
}

// Clases concretas que implementan la interfaz Item.
class ItemA implements Item {
    operation(): string {
        return 'ItemA operation'; // Implementación de la operación para ItemA.
    }
}

class ItemB implements Item {
    operation(): string {
        return 'ItemB operation'; // Implementación de la operación para ItemB.
    }
}

class ItemC implements Item {
    operation(): string {
        return 'ItemC operation'; // Implementación de la operación para ItemC.
    }
}

class ItemD implements Item {
    operation(): string {
        return 'ItemD operation'; // Implementación de la operación para ItemD.
    }
}

// Código del cliente que utiliza las fábricas y los productos.
function clientCode(factory: AbstractFactory<Item>, type: number) {
    try {
        const item = factory.create(type); // Intenta crear un producto con el tipo proporcionado.
        console.log(item.operation()); // Imprime el resultado de la operación del producto.
    } catch (error) {
        console.error(error.message); // Manejo de errores para capturar cualquier excepción lanzada.
    }
}

// Ejemplo de uso de las fábricas concretas.
const factory1 = new ConcreteFactory1();
clientCode(factory1, 1); // Prueba con tipo '1', válido para ConcreteFactory1.
clientCode(factory1, 2); // Prueba con tipo '2', válido para ConcreteFactory1.
clientCode(factory1, 3); // Prueba con tipo '3', no válido para ConcreteFactory1, lanzará un error.

const factory2 = new ConcreteFactory2();
clientCode(factory2, 3); // Prueba con tipo '3', válido para ConcreteFactory2.
clientCode(factory2, 4); // Prueba con tipo '4', válido para ConcreteFactory2.
clientCode(factory2, 1); // Prueba con tipo '1', no válido para ConcreteFactory2, lanzará un error.
