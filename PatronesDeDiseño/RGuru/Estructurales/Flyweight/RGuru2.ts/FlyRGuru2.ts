/**
 * El Flyweight almacena una porción común del estado (también llamado estado
 * intrínseco) que pertenece a múltiples entidades comerciales reales. El Flyweight acepta
 * el resto del estado (estado extrínseco, único para cada entidad) a través de los
 * parámetros de su método.
 */
class FlyweightFly2 {
    // Estado compartido, que es común a múltiples entidades
    private sharedState: any;

    // Constructor que inicializa el estado compartido
    constructor(sharedState: any) {
        this.sharedState = sharedState; // Asigna el estado compartido a la propiedad
    }

    // Método que realiza una operación utilizando el estado compartido y único
    public operation(uniqueState: string[]): void {
        // Convierte los estados en cadenas JSON para su visualización
        const s = JSON.stringify(this.sharedState); // Estado compartido en formato JSON
        const u = JSON.stringify(uniqueState); // Estado único en formato JSON
        // Muestra el estado compartido y único en la consola
        console.log(`Flyweight: Mostrando estado compartido (${s}) y único (${u}).`);
    }
}

/**
 * La fábrica de Flyweight crea y gestiona los objetos Flyweight. Se asegura
 * de que los flyweights se compartan correctamente. Cuando el cliente solicita un flyweight,
 * la fábrica devuelve una instancia existente o crea una nueva, si aún no existe.
 */
class FlyweightFactoryFly2 {
    // Objeto que almacena los flyweights utilizando una clave única
    private flyweights: { [key: string]: FlyweightFly2 } = {};

    // Constructor que inicializa los flyweights con un estado predefinido
    constructor(initialFlyweights: string[][]) {
        // Itera sobre los estados iniciales para crear flyweights
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new FlyweightFly2(state);
        }
    }

    /**
     * Devuelve un hash de cadena de un Flyweight para un estado dado.
     */
    private getKey(state: string[]): string {
        return state.join('_'); // Crea una clave única uniendo los elementos del estado
    }

    /**
     * Devuelve un Flyweight existente con un estado dado o crea uno nuevo.
     */
    public getFlyweight(sharedState: string[]): FlyweightFly2 {
        const key = this.getKey(sharedState); // Obtiene la clave para el estado compartido

        // Si no existe un flyweight para esa clave, se crea uno nuevo
        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: No se encontró un flyweight, creando uno nuevo.');
            this.flyweights[key] = new FlyweightFly2(sharedState);
        } else {
            console.log('FlyweightFactory: Reutilizando flyweight existente.');
        }

        // Retorna el flyweight correspondiente a la clave
        return this.flyweights[key];
    }

    // Método para listar todos los flyweights existentes
    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length; // Cuenta la cantidad de flyweights
        console.log(`\nFlyweightFactory: Tengo ${count} flyweights:`);
        // Muestra cada clave de flyweight en la consola
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

/**
 * El código del cliente generalmente crea un conjunto de flyweights pre-poblados en la
 * etapa de inicialización de la aplicación.
 */
const factory = new FlyweightFactoryFly2([
    ['Chevrolet', 'Camaro2018', 'rosa'],
    ['Mercedes Benz', 'C300', 'negro'],
    ['Mercedes Benz', 'C500', 'rojo'],
    ['BMW', 'M5', 'rojo'],
    ['BMW', 'X6', 'blanco'],
    // ...
]);

// Lista los flyweights creados en la consola
factory.listFlyweights();

// Función para agregar un coche a la base de datos policial
function addCarToPoliceDatabase(
    ff: FlyweightFactoryFly2, plates: string, owner: string,
    brand: string, model: string, color: string,
) {
    console.log('\nCliente: Agregando un coche a la base de datos.');
    // Obtiene o crea un flyweight utilizando las propiedades del coche
    const flyweight = ff.getFlyweight([brand, model, color]);

    // El código del cliente almacena o calcula el estado extrínseco y lo pasa
    // a los métodos del flyweight.
    flyweight.operation([plates, owner]); // Ejecuta la operación con el estado único
}

// Agrega coches a la base de datos usando la función definida anteriormente
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'rojo');
addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'rojo');

// Lista los flyweights después de agregar los coches
factory.listFlyweights();
