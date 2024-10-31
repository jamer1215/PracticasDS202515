/**
 * La clase SingletonSin2 define un getter `instancia` que permite a los clientes
 * acceder a la instancia única del singleton.
 */
class SingletonSin2 {
    // Campo estático para almacenar la instancia única de la clase.
    static #instancia: SingletonSin2;

    /**
     * El constructor del SingletonSin2 debe ser siempre privado para evitar
     * llamadas de construcción directas con el operador `new`.
     */
    private constructor() {
        // Constructor vacío para prevenir la creación de instancias externas.
    }

    /**
     * El getter estático que controla el acceso a la instancia del singleton.
     * 
     * Esta implementación permite extender la clase SingletonSin2 mientras se
     * mantiene una sola instancia de cada subclase.
     * 
     * @returns {SingletonSin2} - La instancia única de la clase.
     */
    public static get instancia(): SingletonSin2 {
        // Si la instancia aún no ha sido creada, se crea en este momento.
        if (!SingletonSin2.#instancia) {
            SingletonSin2.#instancia = new SingletonSin2();
        }

        // Devuelve la instancia única de la clase.
        return SingletonSin2.#instancia;
    }

    /**
     * Finalmente, cualquier singleton puede definir alguna lógica de negocio,
     * que puede ser ejecutada en su instancia.
     * 
     * Este método es un ejemplo de cómo se podría implementar la lógica de negocio.
     */
    public ejecutarLogicaNegocio(): void {
        // Aquí podrías implementar cualquier operación específica.
        console.log('Ejecutando alguna lógica de negocio...');
    }
}

/**
 * El código del cliente.
 * 
 * Esta función demuestra cómo se puede utilizar el patrón SingletonSin2.
 */
function codigoCliente(): void {
    // Obtiene la instancia del singleton mediante el getter `instancia`.
    const s1 = SingletonSin2.instancia;
    const s2 = SingletonSin2.instancia;

    // Compara las dos variables para verificar si apuntan a la misma instancia.
    if (s1 === s2) {
        console.log(
            'El patrón Singleton funciona, ambas variables contienen la misma instancia.'
        );
    } else {
        console.log('El patrón Singleton falló, las variables contienen diferentes instancias.');
    }
}

// Llama a la función para probar el código.
codigoCliente();
