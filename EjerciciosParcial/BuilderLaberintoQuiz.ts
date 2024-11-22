class Cuarto {
    id:number;
    nombre: string;
    puertas: Map<Lado, Puerta> = new Map(); //En que lado que puerta
    paredes: Map<Lado, Pared> = new Map();//En que lado que pared

    constructor(id:number,nombre: string) {
        this.id=id;
        this.nombre = nombre;
    }

    // Método para obtener el lado opuesto de cada lado.
    getLadoOpuesto(lado: Lado): Lado {
        switch (lado) {
            case Lado.Arriba: return Lado.Abajo;
            case Lado.Abajo: return Lado.Arriba;
            case Lado.Derecha: return Lado.Izquierda;
            case Lado.Izquierda: return Lado.Derecha;
            default: throw new Error("Lado no válido.");
        }
    }

//MOSCA: No confundir con que estoy ensuciando el elemento que tiene el producto del builder con los metodos add del builder
//esto simplemente para hacerlo mejor mas limpio, osea no hacer tanta linea en el builder y evito poner los .set en el builder puess
    addPuerta(lado: Lado, puerta: Puerta): void {
        this.puertas.set(lado, puerta);
    }

    addPared(lado: Lado, pared: Pared): void {
        this.paredes.set(lado, pared);
    }
}

class Puerta {
    id: number;//minimamente las puertas deben tener alguna propiedad que las IDentifiquen! lo mismo con paredes y cuartos!
    nombre: string;//con id es suficiente, algo que lo identifique! solo pongo el nombre para verlo en el console.log

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Pared {
    id: number;
    nombre: string;

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Laberinto {
    cuartos: Map<number, Cuarto> = new Map();  // Sólo mantenemos los cuartos

    constructor() {}
}

enum Lado {
    Arriba = "Arriba",
    Abajo = "Abajo",
    Derecha = "Derecha",
    Izquierda = "Izquierda",
}

class LaberintoBuilder {
    private laberinto: Laberinto = new Laberinto();

    reset(): void {
        this.laberinto = new Laberinto();
    }

    addCuarto(idCuarto: number): LaberintoBuilder {
        if (this.laberinto.cuartos.has(idCuarto)) {
            throw new Error(`El cuarto con ID ${idCuarto} ya existe.`);
        }
        const nuevoCuarto = new Cuarto(idCuarto,`Cuarto-${idCuarto}`);
        this.laberinto.cuartos.set(idCuarto, nuevoCuarto);
        return this;
    }

    addPuerta(idCuarto: number, lado: Lado, idPuerta: number): LaberintoBuilder {
        const cuarto = this.laberinto.cuartos.get(idCuarto);
        if (!cuarto) {
            throw new Error(`El cuarto con ID ${idCuarto} no existe.`);
        }

        // Validar que no haya ya una puerta en ese lado del cuarto
        if (cuarto.puertas.has(lado)) {
            throw new Error(`Ya hay una puerta en el lado ${lado} del cuarto con ID ${idCuarto}.`);
        }

        // Verificar que exista una pared en el lado donde queremos poner la puerta
        if (!cuarto.paredes.has(lado)) {
            throw new Error(`ERROR añadiendo puerta de id ${idPuerta}:No existe una pared en el lado ${lado} del cuarto con ID ${idCuarto}.`);
        }

        //Acá empieza algo de pinga, no solo es ver si el lado a añadir la puerta tiene pared, sino que tambien en ese lado haya un cuarto
        //acaso voy a poner una puerta en una pared y detrás de la pared no haya cuarto???
        const ladoOpuesto = cuarto.getLadoOpuesto(lado);
        let cuartoVecinoEncontrado = false;

        for (let [idVecino, vecino] of this.laberinto.cuartos) {
            if (idVecino !== idCuarto //como el cuarto esta en el map de cuartos de laberinto, evitamos que se compare con el id del
            //cuarto al que quiera añadirle la puerta! esto es indispensable!
            && 
            vecino.paredes.has(ladoOpuesto)) {   //¿tiene ese cuarto vecino una pared en el lado opuesto - pertinente en el que quiero yo añadir la puerta?
                cuartoVecinoEncontrado = true;//si la respuesta es si, entonces es cierto que en ese lado donde quiero añadir puerta hay vecino!
                break;//este break es con el fin de que el for se detenga cuando encuentre el cuarto - condicion de finalizacion!
            }
        }
        //MOSCA: es importante que en el lado haya un cuarto, sino imaginate vas a poner una puerta a una pared donde no tienes nada detrás?
        if (!cuartoVecinoEncontrado) {
            throw new Error(`No existe otro cuarto conectado en el lado ${lado} del cuarto con ID ${idCuarto}.`);
        }

        //en el mundo ideal sin problemas... A CREAR LA PUERTA!

        let puerta = new Puerta(idPuerta, `Puerta-${idPuerta}-${lado}`);

        // Asociamos la puerta al cuarto en el lado correspondiente
        cuarto.addPuerta(lado, puerta);
        return this;
    }

    addPared(idCuarto: number, lado: Lado, idPared: number): LaberintoBuilder {
        const cuarto = this.laberinto.cuartos.get(idCuarto);
        if (!cuarto) {
            throw new Error(`El cuarto con ID ${idCuarto} no existe.`);
        }

        let pared = new Pared(idPared, `Pared-${idPared}-${lado}`);

        // Validar si ya existe una pared en el mismo lado
        if (cuarto.paredes.has(lado)) {
            throw new Error(`El cuarto con ID ${idCuarto} ya tiene una pared en el lado ${lado}.`);
        }

        // Asociamos la pared al cuarto en el lado correspondiente
        cuarto.addPared(lado, pared);
        return this;
    }

    build(): Laberinto {
        const laberintoConstruido = this.laberinto;
        this.reset();
        return laberintoConstruido;
    }
}

class Main {
    static crearLaberinto(): void {
        const builder = new LaberintoBuilder();
        //cuartos
        builder.addCuarto(1)
            .addCuarto(2)
            .addCuarto(3)
            .addCuarto(4)
            //Paredes:
            .addPared(1, Lado.Arriba, 1)
            .addPared(1, Lado.Abajo, 2)
            .addPared(1, Lado.Izquierda, 3)
            .addPared(1, Lado.Derecha, 4)
            .addPared(2, Lado.Arriba, 5)
            .addPared(2,Lado.Izquierda,6)//lado izq
            .addPared(2, Lado.Derecha, 7)
            .addPared(3, Lado.Izquierda, 8)
            .addPared(3, Lado.Arriba, 9)
            .addPared(3,Lado.Abajo,10)//
            .addPared(4, Lado.Arriba, 11)//
            .addPared(4, Lado.Derecha, 12)
            //puertas
            .addPuerta(1, Lado.Derecha, 1)
            .addPuerta(1, Lado.Abajo, 2)
            .addPuerta(2, Lado.Izquierda, 1)
            .addPuerta(2, Lado.Derecha, 3)
            .addPuerta(3, Lado.Izquierda, 2)
            .addPuerta(3, Lado.Abajo, 4)
            .addPuerta(4, Lado.Arriba, 3);

        const laberinto = builder.build();
        Main.imprimirLaberinto(laberinto);
    }

    static imprimirLaberinto(laberinto: Laberinto): void {
       // console.log(laberinto)//OJO, asi lo tenia antes y le pedi a la IA que imprima el laberinto mas bonito unicamente para temas de prueba y estética!
      
       //magia de la IA - temas de estética: 
       console.log("Laberinto:");

        // Iteramos sobre los cuartos y sus relaciones
        for (let [idCuarto, cuarto] of laberinto.cuartos) {
            console.log(`\n${cuarto.nombre}:`);

            // Imprimir las puertas asociadas al cuarto
            if (cuarto.puertas.size > 0) {
                console.log("  Puertas:");
                cuarto.puertas.forEach((puerta, lado) => {
                    console.log(`    Lado ${lado}: ${puerta.nombre}`);
                });
            } else {
                console.log("  Sin puertas.");
            }

            // Imprimir las paredes asociadas al cuarto
            if (cuarto.paredes.size > 0) {
                console.log("  Paredes:");
                cuarto.paredes.forEach((pared, lado) => {
                    console.log(`    Lado ${lado}: ${pared.nombre}`);
                });
            } else {
                console.log("  Sin paredes.");
            }
        }
    }
}

// Llamar al método para crear el laberinto e imprimirlo
Main.crearLaberinto();
