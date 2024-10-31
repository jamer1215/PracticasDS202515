/**
 * La clase Target define la interfaz específica del dominio utilizada por
 * el código cliente. Es la interfaz que el cliente espera y puede utilizar.
 */
class Target {
    /**
     * Método que define el comportamiento predeterminado del Target.
     * @returns Un string que describe el comportamiento predeterminado.
     */
    public request(): string {
        return 'Target: El comportamiento predeterminado del target.';
    }
}

/**
 * La clase Adaptee contiene algún comportamiento útil, pero su interfaz es
 * incompatible con el código cliente existente. Necesita ser adaptada
 * antes de que el código cliente pueda usarla.
 */
class Adaptee {
    /**
     * Método específico que devuelve un comportamiento que el cliente no entiende.
     * @returns Un string con un comportamiento específico.
     */
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS'; // Comportamiento que será adaptado.
    }
}

/**
 * La clase Adapter hace que la interfaz de Adaptee sea compatible con la
 * interfaz de Target. Permite que el cliente use Adaptee a través de Target.
 */
class Adapter extends Target {
    private adaptee: Adaptee; // Referencia a una instancia de Adaptee.

    /**
     * Constructor que recibe una instancia de Adaptee.
     * @param adaptee - Instancia de la clase Adaptee que se va a adaptar.
     */
    constructor(adaptee: Adaptee) {
        super(); // Llama al constructor de la clase base Target.
        this.adaptee = adaptee; // Inicializa el adaptador con la instancia de Adaptee.
    }

    /**
     * Sobrescribe el método request para adaptarlo a la interfaz de Target.
     * Utiliza el método específico de Adaptee y transforma su resultado.
     * @returns Un string que representa el comportamiento adaptado.
     */
    public request(): string {
        // Invoca el método específico de Adaptee, invierte la cadena y la adapta.
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRADUCIDO) ${result}`; // Devuelve el resultado adaptado.
    }
}

/**
 * El código cliente admite todas las clases que siguen la interfaz Target.
 * Funciona independientemente de la implementación específica de Target.
 * @param target - Un objeto que implementa la interfaz Target.
 */
function clientCode(target: Target) {
    console.log(target.request()); // Llama al método request del objeto target.
}

// Código de cliente que demuestra el uso de Target.
console.log('Cliente: Puedo trabajar perfectamente con los objetos Target:');
const target = new Target(); // Crea una instancia de Target.
clientCode(target); // Llama al código cliente con la instancia de Target.

console.log('');

// Código de cliente que demuestra el uso de Adaptee.
const adaptee = new Adaptee(); // Crea una instancia de Adaptee.
console.log('Cliente: La clase Adaptee tiene una interfaz extraña. Mira, no la entiendo:');
console.log(`Adaptee: ${adaptee.specificRequest()}`); // Muestra el resultado del método específico de Adaptee.

console.log('');

// Código de cliente que demuestra el uso de Adapter.
console.log('Cliente: Pero puedo trabajar con ella a través del Adapter:');
const adapter = new Adapter(adaptee); // Crea un adaptador que envuelve la instancia de Adaptee.
clientCode(adapter); // Llama al código cliente con el adaptador.
