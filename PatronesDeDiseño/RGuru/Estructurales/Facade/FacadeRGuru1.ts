/**
 * La clase VideoFile representa un archivo de video. Esta clase
 * se usa como contenedor para los datos del video que se
 * convertirán.
 */
class VideoFile {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename; // Guarda el nombre del archivo.
    }

    public getFilename(): string {
        return this.filename; // Devuelve el nombre del archivo.
    }
}

/**
 * La clase OggCompressionCodec representa un codec de compresión
 * Ogg. Es parte del sistema de codificación de video.
 */
class OggCompressionCodec {
    public getCodecType(): string {
        return 'ogg'; // Tipo de codec.
    }
}

/**
 * La clase MPEG4CompressionCodec representa un codec de compresión
 * MPEG4. Es parte del sistema de codificación de video.
 */
class MPEG4CompressionCodec {
    public getCodecType(): string {
        return 'mp4'; // Tipo de codec.
    }
}

/**
 * La clase CodecFactory se encarga de crear y devolver el codec
 * correcto basado en el archivo de video proporcionado.
 */
class CodecFactory {
    public extract(file: VideoFile): OggCompressionCodec | MPEG4CompressionCodec {
        // Lógica simplificada para determinar el codec
        if (file.getFilename().endsWith('.ogg')) {
            return new OggCompressionCodec(); // Retorna codec Ogg.
        } else {
            return new MPEG4CompressionCodec(); // Retorna codec MPEG4.
        }
    }
}

/**
 * La clase BitrateReader se encarga de leer el archivo de video
 * y su codec, así como convertir el contenido del buffer.
 */
class BitrateReader {
    public static read(filename: string, codec: OggCompressionCodec | MPEG4CompressionCodec): string {
        // Simula la lectura de un archivo de video y devuelve un buffer
        return `Buffer de video de ${filename} usando codec ${codec.getCodecType()}`;
    }

    public static convert(buffer: string, codec: OggCompressionCodec | MPEG4CompressionCodec): string {
        // Simula la conversión del buffer a un formato deseado
        return `Video convertido usando codec ${codec.getCodecType()}: ${buffer}`;
    }
}

/**
 * La clase AudioMixer se encarga de mezclar el audio del video.
 */
class AudioMixer {
    public fix(result: string): string {
        // Simula la corrección y mezcla de audio
        return `Audio corregido y mezclado: ${result}`;
    }
}

/**
 * La clase VideoConverter actúa como una fachada para ocultar la
 * complejidad del framework de conversión de video detrás de
 * una interfaz simple.
 */
class VideoConverter {
    public convert(filename: string, format: string): VideoFile {
        // Crea un nuevo archivo de video a partir del nombre proporcionado.
        const file = new VideoFile(filename);

        // Extrae el codec del archivo usando la fábrica de codecs.
        const sourceCodec = new CodecFactory().extract(file);

        // Determina el codec de destino basado en el formato deseado.
        let destinationCodec;
        if (format === "mp4") {
            destinationCodec = new MPEG4CompressionCodec();
        } else {
            destinationCodec = new OggCompressionCodec();
        }

        // Lee el archivo de video y obtiene un buffer.
        const buffer = BitrateReader.read(filename, sourceCodec);

        // Convierte el buffer al codec de destino.
        let result = BitrateReader.convert(buffer, destinationCodec);

        // Mezcla el audio del resultado convertido.
        result = new AudioMixer().fix(result);

        // Devuelve un nuevo archivo de video que contiene el resultado final.
        return new VideoFile(result);
    }
}

/**
 * La clase Application es el punto de entrada para la
 * ejecución del programa. Utiliza la clase VideoConverter
 * para convertir videos sin preocuparse por las complejidades
 * del framework.
 */
class Application {
    public main() {
        // Crea un convertidor de video.
        const convertor = new VideoConverter();

        // Convierte un archivo de video Ogg a MP4.
        const mp4 = convertor.convert("funny-cats-video.ogg", "mp4");

        // Simula el guardado del archivo convertido.
        console.log(`Video guardado como: ${mp4.getFilename()}`); // Muestra el nombre del archivo guardado.
    }
}

// Ejecución de la aplicación.
const app = new Application();
app.main(); // Inicia la conversión de video.
