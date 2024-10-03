/**
 * La clase `Controlador` - Contexto, define la interfaz que es de interés para los clientes.
 * Se encarga de mantener y gestionar una referencia a una táctica concreta,
 * pero no sabe de qué tipo de táctica concreta se trata, solo que sigue la
 * interfaz `Estrategia`. Esto permite que el comportamiento del controlador sea
 * flexible y modificable en tiempo de ejecución.
 */
class Controlador {
    /**
     * @type {Estrategia} El controlador mantiene una referencia a uno de los objetos
     * de táctica (implementación de `Estrategia`). La clase concreta de la táctica
     * es desconocida para el controlador. Trabaja con cualquier táctica que siga
     * la interfaz definida.
     */
    private tactica: Estrategia;

    /**
     * El constructor normalmente acepta una táctica desde la inicialización.
     * De este modo, cuando se crea un objeto `Controlador`, ya tiene una táctica
     * para usar. Esto permite establecer una táctica desde el inicio.
     * @param tactica La táctica inicial que usará el controlador.
     */
    constructor(tactica: Estrategia) {
        this.tactica = tactica; // Se guarda la referencia de la táctica.
    }

    /**
     * El controlador permite reemplazar el objeto `Estrategia` en tiempo de ejecución
     * mediante este método. Este patrón es útil cuando se quiere cambiar
     * dinámicamente el comportamiento del controlador sin modificar su implementación.
     * @param tactica La nueva táctica que queremos que el controlador use.
     */
    public establecerTactica(tactica: Estrategia): void {
        this.tactica = tactica; // Actualizamos la táctica actual.
    }

    /**
     * Aquí es donde el controlador delega parte de su lógica a la táctica.
     * En lugar de implementar el algoritmo dentro del controlador, delega la
     * responsabilidad a la táctica concreta, lo que permite que el comportamiento
     * varíe sin modificar el controlador.
     */
    public ejecutarLogica(): void {
        // Antes de aplicar la táctica, podríamos tener otra lógica de negocio aquí.
        console.log('Controlador: Ordenando los datos usando la táctica (no sabemos cómo lo hará)');

        // El controlador no necesita saber cómo la táctica ordenará los datos.
        // Simplemente delega esta tarea a la táctica actual.
        const resultado = this.tactica.aplicarAlgoritmo(['x', 'y', 'z', 'w', 'v']); 

        // Imprimimos el resultado final, pero nuevamente, el controlador no necesita
        // saber los detalles internos de cómo se generó.
        console.log(resultado.join(','));

        // Luego podríamos tener más lógica de negocio aquí, si es necesario.
    }
}

/**
 * La interfaz `Estrategia` declara las operaciones que son comunes a todas las
 * versiones soportadas de algún algoritmo. En este caso, tiene un método
 * llamado `aplicarAlgoritmo` que toma un array de strings y devuelve un array ordenado.
 * Cualquier clase concreta que implemente esta interfaz deberá proporcionar su
 * propia versión del algoritmo.
 */
interface Estrategia {
    /**
     * El método `aplicarAlgoritmo` es la operación clave que implementarán las tácticas
     * concretas. Aquí no especificamos cómo se implementará, solo que aceptará
     * un array de strings y devolverá un array de strings.
     * @param datos Un array de strings que será procesado por la táctica.
     * @returns Un array de strings, posiblemente procesado (ordenado de alguna manera).
     */
    aplicarAlgoritmo(datos: string[]): string[];
}

/**
 * `TacticaConcretaOrdenAscendente` es una implementación concreta de la interfaz `Estrategia`.
 * En este caso, el algoritmo definido aquí ordena los datos en orden ascendente
 * utilizando el método `sort()` de JavaScript.
 */
class TacticaConcretaOrdenAscendente implements Estrategia {
    /**
     * Este método ordena los datos en orden ascendente (alfabético) usando el
     * método `sort()` de JavaScript.
     * @param datos Un array de strings a ordenar.
     * @returns El array de strings ordenado en orden ascendente.
     */
    public aplicarAlgoritmo(datos: string[]): string[] {
        return datos.sort(); // Usamos sort para ordenar los elementos.
    }
}

/**
 * `TacticaConcretaOrdenInverso` es otra implementación de la interfaz `Estrategia`, pero
 * a diferencia de `TacticaConcretaOrdenAscendente`, esta táctica invierte el orden de los
 * elementos en lugar de ordenarlos.
 */
class TacticaConcretaOrdenInverso implements Estrategia {
    /**
     * Este método invierte el orden de los datos usando el método `reverse()`
     * de JavaScript.
     * @param datos Un array de strings a invertir.
     * @returns El array de strings en orden inverso.
     */
    public aplicarAlgoritmo(datos: string[]): string[] {
        return datos.reverse(); // Usamos reverse para invertir el orden de los elementos.
    }
}

/**
 * Código cliente. Aquí el cliente es responsable de elegir una táctica concreta
 * y pasarla al controlador. Este código también muestra cómo podemos cambiar la
 * táctica en tiempo de ejecución, según las necesidades del cliente.
 */

// Creamos una instancia del controlador con la táctica inicial `TacticaConcretaOrdenAscendente`.
const controlador = new Controlador(new TacticaConcretaOrdenAscendente());

// Informamos al cliente que la táctica actual es la de orden ascendente.
console.log('Cliente: La táctica está configurada para ordenamiento normal.');
controlador.ejecutarLogica(); // Ejecutamos la lógica del controlador con esta táctica.

console.log(''); // Línea vacía para separar las salidas en consola.

// Ahora, el cliente decide cambiar la táctica a `TacticaConcretaOrdenInverso`, que invierte el orden.
console.log('Cliente: La táctica está configurada para ordenamiento inverso.');
controlador.establecerTactica(new TacticaConcretaOrdenInverso()); // Cambiamos la táctica.
controlador.ejecutarLogica(); // Ejecutamos nuevamente con la nueva táctica.
