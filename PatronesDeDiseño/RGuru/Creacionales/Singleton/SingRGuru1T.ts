import { Optional } from "../../../Optional";

/**
 * La clase DatabaseGenerica define un método `getInstance` que permite a los clientes
 * acceder a la misma instancia de una conexión de la base de datos en todo el programa.
 */
class DatabaseGenerica {
    // El campo para almacenar la instancia singleton debe ser estático y no genérico.
    private static instance: Optional<DatabaseGenerica> = new Optional();

    // El constructor del singleton es privado para evitar la creación directa de instancias
    // usando el operador `new`.
    private constructor() {
        // Aquí podrías agregar algún código de inicialización, como la conexión
        // a un servidor de base de datos.
        console.log("Conexión a la base de datos establecida.");
    }

    // El método estático que controla el acceso a la instancia del singleton.
    public static getInstance(): DatabaseGenerica {
        // Si la instancia no ha sido creada aún, la creamos.
        if (!DatabaseGenerica.instance.hasValue()) {
            // Establecemos la instancia del Singleton en el Optional.
            DatabaseGenerica.instance = new Optional(new DatabaseGenerica());
        }
        // Devolvemos la instancia ya creada.
        return DatabaseGenerica.instance.getValue();
    }

    // Método que representa la lógica de negocio que puede ejecutarse en la instancia.
    public query(sql: string): void {
        // Por ejemplo, todas las consultas a la base de datos de una aplicación
        // pasan por este método. Aquí podrías agregar lógica para la regulación
        // o el almacenamiento en caché.
        console.log(`Ejecutando consulta: ${sql}`);
    }
}

// Ejemplo de uso de la clase DatabaseGenerica.
class ApplicationGenerica {
    public static main(): void {
        // Obtiene la instancia de la base de datos y ejecuta una consulta.
        const db1 = DatabaseGenerica.getInstance(); // Sin parámetros de tipo
        db1.query("SELECT * FROM users");

        // Obtiene la misma instancia de la base de datos y ejecuta otra consulta.
        const db2 = DatabaseGenerica.getInstance(); // La misma clase sin parámetros de tipo
        db2.query("SELECT * FROM orders");

        // `db1` y `db2` contienen la misma instancia.
        console.log(db1 === db2); // Debería imprimir `true`.
    }
}

// Llamamos al método main para probar el código.
ApplicationGenerica.main();
