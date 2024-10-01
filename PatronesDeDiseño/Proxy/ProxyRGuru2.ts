/**
 * La interfaz Subject declara las operaciones comunes tanto para el RealSubject como para el Proxyy.
 * Mientras el cliente trabaje con RealSubject utilizando esta interfaz, podrás pasarle un proxyy
 * en lugar de un RealSubject.
 */
interface Subject {
    request(): void;
}

/**
 * RealSubject contiene la lógica de negocio principal. Usualmente, los RealSubjects son
 * capaces de hacer trabajos útiles que pueden ser muy lentos o sensibles, por ejemplo, 
 * corregir datos de entrada. Un Proxyy puede resolver estos problemas sin realizar cambios
 * en el código de RealSubject.
 */
class RealSubject implements Subject {
    public request(): void {
        // Lógica principal que maneja la solicitud
        console.log('RealSubject: Manejo de la solicitud.');
    }
}

/**
 * El Proxyy tiene una interfaz idéntica al RealSubject.
 */
class Proxyy implements Subject {
    // El Proxyy mantiene una referencia a un objeto de la clase RealSubject.
    private realSubject: RealSubject;

    /**
     * El Proxyy puede mantener una referencia a un objeto de la clase RealSubject. 
     * Esta referencia puede ser cargada bajo demanda (lazy-loading) o pasada directamente por el cliente.
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;  // Guarda el objeto RealSubject
    }

    /**
     * Las aplicaciones más comunes del patrón Proxyy son la carga diferida (lazy loading),
     * almacenamiento en caché, control de acceso, registro de acciones (logging), etc. 
     * Un Proxyy puede realizar una de estas tareas y luego, dependiendo del resultado,
     * delegar la ejecución al mismo método en el objeto RealSubject asociado.
     */
    public request(): void {
        // Verifica si tiene acceso antes de delegar la solicitud al RealSubject
        if (this.checkAccess()) {
            this.realSubject.request();  // Delegar la solicitud al RealSubject
            this.logAccess();  // Registrar la acción
        }
    }

    // Método privado para verificar el acceso antes de realizar la solicitud
    private checkAccess(): boolean {
        // Aquí se debería realizar una verificación real de acceso.
        console.log('Proxyy: Verificando acceso antes de realizar la solicitud.');

        return true;  // Permitir el acceso en este ejemplo
    }

    // Método privado para registrar la solicitud (por ejemplo, registrar la hora en que se hizo)
    private logAccess(): void {
        console.log('Proxyy: Registrando el momento de la solicitud.');
    }
}

/**
 * El código del cliente está diseñado para trabajar con todos los objetos (tanto sujetos reales como proxies)
 * a través de la interfaz Subject, con el fin de soportar tanto RealSubjects como Proxyys. En la vida real,
 * sin embargo, los clientes suelen trabajar directamente con RealSubjects. En este caso, para implementar
 * el patrón de manera más sencilla, puedes hacer que el proxyy herede de la clase de RealSubject.
 */
function clientCodeProxyy(subject: Subject) {
    // El cliente puede trabajar con cualquier objeto que implemente la interfaz Subject
    subject.request();  // Realiza la solicitud usando el objeto pasado (RealSubject o Proxyy)
}

// Ejemplo del cliente utilizando RealSubject directamente
console.log('Cliente: Ejecutando el código del cliente con un sujeto real:');
const realSubject = new RealSubject();  // Instancia del sujeto real
clientCodeProxyy(realSubject);  // El cliente usa el RealSubject

console.log('');

// Ejemplo del cliente utilizando un Proxyy
console.log('Cliente: Ejecutando el mismo código del cliente con un proxyy:');
const proxyy = new Proxyy(realSubject);  // Instancia del Proxyy que envuelve al RealSubject
clientCodeProxyy(proxyy);  // El cliente usa el Proxyy

