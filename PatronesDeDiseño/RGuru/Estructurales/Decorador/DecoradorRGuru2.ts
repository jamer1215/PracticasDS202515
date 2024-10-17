// La interfaz de componente define operaciones que los decoradores pueden alterar.
interface DataSource {
    writeData(data: string): void;
    readData(): string;
}

// Los componentes concretos proporcionan implementaciones por defecto para las operaciones.
class FileDataSource implements DataSource {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    writeData(data: string): void {
        console.log(`Escribiendo datos en el archivo ${this.filename}: ${data}`);
        // Aquí se escribirían los datos en el archivo.
    }

    readData(): string {
        console.log(`Leyendo datos del archivo ${this.filename}`);
        // Aquí se leerían los datos del archivo.
        return "datos del archivo";
    }
}

// La clase decoradora base sigue la misma interfaz que los demás componentes.
// El principal propósito de esta clase es definir la interfaz de encapsulación para todos los decoradores concretos.
class DataSourceDecorator implements DataSource {
    protected wrappee: DataSource;

    constructor(source: DataSource) {
        this.wrappee = source;
    }

    // La decoradora base simplemente delega todo el trabajo al componente envuelto.
    writeData(data: string): void {
        this.wrappee.writeData(data);
    }

    // Los decoradores concretos pueden invocar la implementación padre de la operación.
    readData(): string {
        return this.wrappee.readData();
    }
}

// Los decoradores concretos deben invocar métodos en el objeto envuelto, pero pueden añadir algo de su parte al resultado.
class EncryptionDecorator extends DataSourceDecorator {
    writeData(data: string): void {
        const encryptedData = this.encrypt(data);
        console.log(`Escribiendo datos encriptados: ${encryptedData}`);
        super.writeData(encryptedData);
    }

    readData(): string {
        const data = super.readData();
        const decryptedData = this.decrypt(data);
        console.log(`Leyendo datos desencriptados: ${decryptedData}`);
        return decryptedData;
    }

    private encrypt(data: string): string {
        // Lógica de encriptación (simulación)
        return `encrypted(${data})`;
    }

    private decrypt(data: string): string {
        // Lógica de desencriptación (simulación)
        return data.replace("encrypted(", "").replace(")", "");
    }
}

class CompressionDecorator extends DataSourceDecorator {
    writeData(data: string): void {
        const compressedData = this.compress(data);
        console.log(`Escribiendo datos comprimidos: ${compressedData}`);
        super.writeData(compressedData);
    }

    readData(): string {
        const data = super.readData();
        const decompressedData = this.decompress(data);
        console.log(`Leyendo datos descomprimidos: ${decompressedData}`);
        return decompressedData;
    }

    private compress(data: string): string {
        // Lógica de compresión (simulación)
        return `compressed(${data})`;
    }

    private decompress(data: string): string {
        // Lógica de descompresión (simulación)
        return data.replace("compressed(", "").replace(")", "");
    }
}

// Ejemplo de uso en una aplicación
class ApplicationDe {
    dumbUsageExample(): void {
        let source: DataSource = new FileDataSource("somefile.dat");
        source.writeData("Datos importantes filedatasource");
        console.log("Archivo escrito sin formato.");

        source = new CompressionDecorator(source);
        source.writeData("Datos importantes compressiondecorator");
        console.log("Archivo escrito comprimido.");

        source = new EncryptionDecorator(source);
        source.writeData("Datos importantes encryptiondecorator");
        console.log("Archivo escrito comprimido y encriptado.");
    }
}

// Código cliente que utiliza una fuente externa de datos
class SalaryManager {
    private source: DataSource;

    constructor(source: DataSource) {
        this.source = source;
    }

    load(): string {
        return this.source.readData();
    }

    save(): void {
        this.source.writeData("Datos del salario");
    }
}

// Configurador de la aplicación que monta distintas pilas de decoradores
class ApplicationConfigurator {
    configurationExample(): void {
        let source: DataSource = new FileDataSource("salary.dat");

        const enabledEncryption = true;
        const enabledCompression = true;

        if (enabledEncryption) {
            source = new EncryptionDecorator(source);
        }

        if (enabledCompression) {
            source = new CompressionDecorator(source);
        }

        const logger = new SalaryManager(source);
        const salary = logger.load();
        console.log(`Datos cargados: ${salary}`);
    }
}

// Prueba de la aplicación
const appDe = new ApplicationDe();
appDe.dumbUsageExample();

const configurator = new ApplicationConfigurator();
configurator.configurationExample();
