// Clase base que representa el servicio de Correo
abstract class Correo {
    abstract crearTransporte(tipo: string): Transporte; // Método fábrica abstracto

    // Método que simula el envío del correo utilizando el transporte creado
    enviarCorreo(tipo: string): void {
        const transporte = this.crearTransporte(tipo);
        console.log(`Enviando correo utilizando ${transporte.obtenerTipo()}`);
    }
}

// Clases de Transporte
abstract class Transporte {
    abstract obtenerTipo(): string;
}

class Avion extends Transporte {
    obtenerTipo(): string {
        return 'Avión';
    }
}

class Camion extends Transporte {
    obtenerTipo(): string {
        return 'Camión';
    }
}

class Tren extends Transporte {
    obtenerTipo(): string {
        return 'Tren';
    }
}

// Subclase concreta CorreoAéreo
class CorreoAereo extends Correo {
    crearTransporte(tipo: string): Transporte {
        // Solo se permite el transporte por Avión en CorreoAéreo
        return new Avion();
    }
}

// Subclase concreta CorreoTerrestre
class CorreoTerrestre extends Correo {
    crearTransporte(tipo: string): Transporte {
        // Dependiendo del argumento, se crea un Camión o un Tren
        if (tipo === 'camion') {
            return new Camion();
        } else if (tipo === 'tren') {
            return new Tren();
        } else {
            throw new Error('Tipo de transporte no válido');
        }
    }
}

// Código cliente
function cliente(correo: Correo, tipoTransporte: string) {
    correo.enviarCorreo(tipoTransporte);
}

// Uso de las clases
const correoAereo = new CorreoAereo();
cliente(correoAereo, 'avion'); // Resultado: Enviando correo utilizando Avión

const correoTerrestre = new CorreoTerrestre();
cliente(correoTerrestre, 'camion'); // Resultado: Enviando correo utilizando Camión
cliente(correoTerrestre, 'tren');   // Resultado: Enviando correo utilizando Tren
