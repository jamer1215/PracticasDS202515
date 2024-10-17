// La clase abstracta define un método plantilla que contiene el esqueleto 
// de un algoritmo compuesto por llamadas, normalmente a operaciones primitivas abstractas. 
// Las subclases concretas implementan estas operaciones, pero dejan el propio método plantilla intacto.
class Car {
    // Un coche puede tener un GPS, una computadora de navegación y cierto número de asientos.
    // Los distintos modelos de coches (deportivo, SUV, descapotable) pueden tener distintas características.
    seats!: number;
    engine!: string;
    tripComputer!: boolean;
    gps!: boolean;
}

class Manual {
    // Cada coche debe contar con un manual de usuario que se corresponda con la configuración 
    // del coche y explique todas sus características.
    description: string = '';
}

// La interfaz del constructor especifica métodos para crear las distintas partes de los productos.
interface Builder {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(hasComputer: boolean): void;
    setGPS(hasGPS: boolean): void;
}

// El constructor concreto para crear coches sigue la interfaz `Builder` y 
// proporciona implementaciones específicas para los pasos de construcción.
class CarBuilder implements Builder {
    private car: Car= new Car(); // Inicializamos la propiedad aquí.

    constructor() {
        this.reset();
    }

    // El método `reset` se encarga de limpiar el objeto en construcción.
    reset(): void {
        this.car = new Car(); // Inicia un nuevo coche.
    }

    // Establece la cantidad de asientos del coche.
    setSeats(seats: number): void {
        this.car.seats = seats;
    }

    // Instala un motor específico.
    setEngine(engine: string): void {
        this.car.engine = engine;
    }

    // Instala una computadora de navegación.
    setTripComputer(hasComputer: boolean): void {
        this.car.tripComputer = hasComputer;
    }

    // Instala un GPS.
    setGPS(hasGPS: boolean): void {
        this.car.gps = hasGPS;
    }

    // Devuelve el coche terminado y resetea el constructor para crear uno nuevo.
    getProduct(): Car {
        const product = this.car;
        this.reset();
        return product;
    }
}

// El constructor concreto para crear manuales de usuario sigue la misma interfaz `Builder` 
// pero construye un producto distinto, en este caso un `Manual`.
class CarManualBuilder implements Builder {
    private manual: Manual = new Manual(); // Inicializamos la propiedad aquí.

    constructor() {
        this.reset();
    }

    reset(): void {
        this.manual = new Manual(); // Inicia un nuevo manual.
    }

    setSeats(seats: number): void {
        this.manual.description += `Este coche tiene ${seats} asientos.\n`;
    }

    setEngine(engine: string): void {
        this.manual.description += `El coche está equipado con un motor ${engine}.\n`;
    }

    setTripComputer(hasComputer: boolean): void {
        this.manual.description += hasComputer ? "Tiene computadora de navegación.\n" : "No tiene computadora de navegación.\n";
    }

    setGPS(hasGPS: boolean): void {
        this.manual.description += hasGPS ? "Tiene GPS.\n" : "No tiene GPS.\n";
    }

    // Devuelve el manual terminado y resetea el constructor para crear uno nuevo.
    getProduct(): Manual {
        const product = this.manual;
        this.reset();
        return product;
    }
}

// El director se encarga de ejecutar los pasos de construcción en un orden particular.
// Permite la creación de productos complejos siguiendo un conjunto de pasos definidos.
class Director {
    // Construye un coche deportivo.
    constructSportsCar(builder: Builder): void {
        builder.reset();
        builder.setSeats(2);
        builder.setEngine("Motor deportivo");
        builder.setTripComputer(true);
        builder.setGPS(true);
    }

    // Podríamos añadir más métodos como este para construir otros tipos de vehículos.
    constructSUV(builder: Builder): void {
        builder.reset();
        builder.setSeats(5);
        builder.setEngine("Motor SUV");
        builder.setTripComputer(false);
        builder.setGPS(true);
    }
}

// El código cliente que utiliza el patrón Builder.
class AplicacionBuilder {
    makeCar(): void {
        const director = new Director();

        // Creación de un coche utilizando `CarBuilder`.
        const carBuilder = new CarBuilder();
        director.constructSportsCar(carBuilder);
        const car = carBuilder.getProduct();
        console.log("Coche deportivo creado:", car);

        // Creación de un manual para el coche utilizando `CarManualBuilder`.
        const manualBuilder = new CarManualBuilder();
        director.constructSportsCar(manualBuilder);
        const manual = manualBuilder.getProduct();
        console.log("Manual del coche deportivo:\n", manual.description);
    }
}

// Ejecuta la aplicación.
const appli = new AplicacionBuilder();
appli.makeCar();
