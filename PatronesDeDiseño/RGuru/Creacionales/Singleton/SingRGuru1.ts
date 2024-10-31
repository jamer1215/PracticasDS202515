// La clase Database define el método `getInstance` que permite a los clientes

import { Optional } from "../../../Optional";

// La clase DatabaseSin define el método `getInstance` que permite a los clientes
// acceder a la misma instancia de una conexión de la base de datos en todo el programa.
class DatabaseSin {
    // El campo para almacenar la instancia singleton debe ser estático.
    private static instance: Optional<DatabaseSin> = new Optional();

    // El constructor del singleton es privado para evitar la creación directa de instancias
    // usando el operador `new`.
    private constructor() {
        // Aquí podrías agregar algún código de inicialización, como la conexión
        // a un servidor de base de datos.
        console.log("Conexión a la base de datos establecida.");
    }

    // El método estático que controla el acceso a la instancia del singleton.
    public static getInstance(): DatabaseSin {
        // Si la instancia no ha sido creada aún, la creamos.
        if (!DatabaseSin.instance.hasValue()) {
            // Establecemos la instancia del Singleton en el Optional.
            DatabaseSin.instance=new Optional(new DatabaseSin());
        }
        // Devolvemos la instancia ya creada.
        return DatabaseSin.instance.getValue();
    }

    // Método que representa la lógica de negocio que puede ejecutarse en la instancia.
    public query(sql: string): void {
        // Por ejemplo, todas las consultas a la base de datos de una aplicación
        // pasan por este método. Aquí podrías agregar lógica para la regulación
        // o el almacenamiento en caché.
        console.log(`Ejecutando consulta: ${sql}`);
    }
}

// Ejemplo de uso de la clase DatabaseSin.
class ApplicationSin {
    public static main(): void {
        // Obtiene la instancia de la base de datos y ejecuta una consulta.
        const foo = DatabaseSin.getInstance();
        foo.query("SELECT * FROM users");

        // Obtiene la misma instancia de la base de datos y ejecuta otra consulta.
        const bar = DatabaseSin.getInstance();
        bar.query("SELECT * FROM orders");

        // `foo` y `bar` contienen la misma instancia.
        console.log(foo === bar); // Debería imprimir `true`.
    }
}

// Llamamos al método main para probar el código.
ApplicationSin.main();