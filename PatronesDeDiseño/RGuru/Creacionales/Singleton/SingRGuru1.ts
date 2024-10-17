// La clase Database define el método `getInstance` que permite a los clientes
// acceder a la misma instancia de una conexión de la base de datos en todo el programa.
class Database {
    // El campo para almacenar la instancia singleton debe ser estático.
    private static instance: Database | null = null;

    // El constructor del singleton es privado para evitar la creación directa de instancias
    // usando el operador `new`.
    private constructor() {
        // Aquí podrías agregar algún código de inicialización, como la conexión
        // a un servidor de base de datos.
        console.log("Conexión a la base de datos establecida.");
    }

    // El método estático que controla el acceso a la instancia del singleton.
    public static getInstance(): Database {
        // Si la instancia no ha sido creada aún, la creamos.
        if (Database.instance === null) {
            // Utilizamos bloqueo para evitar problemas en un entorno multihilo.
            // En TypeScript, esto es solo conceptual, ya que no existe el soporte
            // directo para hilos. Es importante entender la intención.
            if (Database.instance === null) {
                Database.instance = new Database();
            }
        }
        // Devolvemos la instancia ya creada.
        return Database.instance;
    }

    // Método que representa la lógica de negocio que puede ejecutarse en la instancia.
    public query(sql: string): void {
        // Por ejemplo, todas las consultas a la base de datos de una aplicación
        // pasan por este método. Aquí podrías agregar lógica para la regulación
        // o el almacenamiento en caché.
        console.log(`Ejecutando consulta: ${sql}`);
    }
}

// Ejemplo de uso de la clase Database.
class ApplicationS {
    public static main(): void {
        // Obtiene la instancia de la base de datos y ejecuta una consulta.
        const foo = Database.getInstance();
        foo.query("SELECT * FROM users");

        // Obtiene la misma instancia de la base de datos y ejecuta otra consulta.
        const bar = Database.getInstance();
        bar.query("SELECT * FROM orders");

        // `foo` y `bar` contienen la misma instancia.
        console.log(foo === bar); // Debería imprimir `true`.
    }
}

// Llamamos al método main para probar el código.
ApplicationS.main();
