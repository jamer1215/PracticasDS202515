/**
 * La clase `Optional<T>` es una implementación genérica que encapsula un valor que puede
 * o no estar presente. Esta clase ayuda a manejar de forma segura valores opcionales
 * sin tener que preocuparse constantemente por valores `null` o `undefined`.
 * @template T - El tipo del valor que esta clase contendrá (si está presente).
 */
export class Optional<T> {
    // `value` es el valor encapsulado, que puede ser del tipo T o estar indefinido.
    private value: T | undefined;

    // `assigned` es un booleano que indica si se ha asignado un valor o no.
    private assigned: boolean;

    /**
     * El constructor inicializa la clase con un valor opcional.
     * Si se proporciona un valor en el constructor, `assigned` será `true`.
     * Si no se proporciona, `assigned` será `false` y `value` será `undefined`.
     * @param value - El valor opcional que se puede proporcionar al crear la instancia.
     */
    constructor(value?: T) {
        // Si se proporciona un valor, lo asignamos y establecemos `assigned` a `true`.
        if (value) {
            this.value = value;
            this.assigned = true;
        } else {
            // Si no se proporciona, `value` es `undefined` y `assigned` es `false`.
            this.value = undefined;
            this.assigned = false;
        }
    }

    /**
     * El método `hasValue()` indica si un valor ha sido asignado o no.
     * Esto es útil para verificar si hay un valor presente antes de intentar acceder a él.
     * @returns {boolean} - Devuelve `true` si se ha asignado un valor, `false` si no.
     */
    hasValue(): boolean {
        return this.assigned;  // Devuelve el estado de `assigned` para saber si hay valor.
    }

    /**
     * El método `getValue()` devuelve el valor si está presente. Si no se ha asignado un valor,
     * lanza un error para prevenir el acceso a un valor indefinido.
     * Esto fuerza al usuario a comprobar `hasValue()` antes de llamar a `getValue()`.
     * @throws {Error} Si el valor no está definido.
     * @returns {T} - El valor presente de tipo `T`.
     */
    getValue(): T {
        // Si no hay valor asignado, lanzamos una excepción.
        if (!this.assigned) {
            throw new Error("Valor indefinido");
        }
        // Si el valor está presente, devolvemos el valor.
        // El operador `!` le dice al compilador que estamos seguros de que `this.value` no es `undefined`.
        return <T>this.value;  // Se fuerza el tipo `T` porque sabemos que no es `undefined`.
    }
}
