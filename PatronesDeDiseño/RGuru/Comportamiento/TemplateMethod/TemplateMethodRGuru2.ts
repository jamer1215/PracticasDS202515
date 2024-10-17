/**
 * La clase abstracta define un método plantilla que contiene el esqueleto
 * de algún algoritmo, compuesto por llamadas a (generalmente) operaciones
 * primitivas abstractas.
 *
 * Las subclases concretas deben implementar estas operaciones, pero deben
 * dejar el método plantilla intacto.
 */
abstract class AbstractClass {
    /**
     * El método plantilla define el esqueleto de un algoritmo.
     * A través de este método, se establece un flujo de ejecución
     * fijo para un proceso, donde algunas partes pueden ser personalizadas
     * por las subclases, pero la estructura general permanece inalterada.
     */
    public templateMethod(): void {
        this.baseOperation1();       // Operación fija: No se puede modificar en subclases.
        this.requiredOperations1();  // Operación abstracta: Obligatoria para que las subclases la implementen.
        this.baseOperation2();       // Operación fija: No se puede modificar en subclases.
        this.hook1();                // Gancho: Opcional de sobrescribir en subclases.
        this.requiredOperation2();   // Operación abstracta: Obligatoria para que las subclases la implementen.
        this.baseOperation3();       // Operación fija: No se puede modificar en subclases.
        this.hook2();                // Gancho: Opcional de sobrescribir en subclases.
    }

    /**
     * Estas operaciones ya tienen una implementación.
     * Las subclases no deben sobrescribirlas, ya que representan
     * partes fijas del algoritmo.
     */
    protected baseOperation1(): void {
        console.log('AbstractClass dice: Estoy haciendo la mayor parte del trabajo');
    }

    protected baseOperation2(): void {
        console.log('AbstractClass dice: Permito que las subclases sobrescriban algunas operaciones');
    }

    protected baseOperation3(): void {
        console.log('AbstractClass dice: Pero sigo haciendo la mayor parte del trabajo');
    }

    /**
     * Estas operaciones deben ser implementadas en las subclases.
     * Las subclases concretas definen estos métodos para personalizar
     * partes del algoritmo, según su propia lógica.
     */
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    /**
     * Estos son "ganchos" (hooks). Las subclases pueden sobrescribirlos, pero no es obligatorio
     * ya que los hooks ya tienen una implementación predeterminada (vacía).
     * Los hooks ofrecen puntos de extensión adicionales en lugares críticos del algoritmo.
     */
    protected hook1(): void { }

    protected hook2(): void { }
}

/**
 * Las clases concretas deben implementar todas las operaciones abstractas de la clase base.
 * También pueden sobrescribir algunas operaciones con una implementación predeterminada si es necesario.
 */
class ConcreteClass1 extends AbstractClass {
    // Implementación específica de la operación abstracta 1.
    protected requiredOperations1(): void {
        console.log('ConcreteClass1 dice: Implementé la Operación 1');
    }

    // Implementación específica de la operación abstracta 2.
    protected requiredOperation2(): void {
        console.log('ConcreteClass1 dice: Implementé la Operación 2');
    }
}

/**
 * Generalmente, las clases concretas solo sobrescriben una fracción de las
 * operaciones de la clase base. No es obligatorio sobrescribir todos los métodos,
 * especialmente los hooks.
 */
class ConcreteClass2 extends AbstractClass {
    // Implementación específica de la operación abstracta 1.
    protected requiredOperations1(): void {
        console.log('ConcreteClass2 dice: Implementé la Operación 1');
    }

    // Implementación específica de la operación abstracta 2.
    protected requiredOperation2(): void {
        console.log('ConcreteClass2 dice: Implementé la Operación 2');
    }

    // Esta clase sobrescribe el hook opcional 1.
    protected hook1(): void {
        console.log('ConcreteClass2 dice: Sobrescribí el Hook 1');
    }
}

/**
 * El código cliente llama al método plantilla para ejecutar el algoritmo.
 * El código cliente no necesita conocer la clase concreta del objeto con el que trabaja,
 * siempre que funcione a través de la interfaz de la clase base.
 */
function clientCodeTM(abstractClass: AbstractClass) {
    // ...
    abstractClass.templateMethod();  // Se llama al método plantilla, ejecutando el algoritmo.
    // ...
}

console.log('El mismo código cliente puede trabajar con diferentes subclases:');
clientCodeTM(new ConcreteClass1());  // Usando ConcreteClass1.
console.log('');

console.log('El mismo código cliente puede trabajar con diferentes subclases:');
clientCodeTM(new ConcreteClass2());  // Usando ConcreteClass2.
