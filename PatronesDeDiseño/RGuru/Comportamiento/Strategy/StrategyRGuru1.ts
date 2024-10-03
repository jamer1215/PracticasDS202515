// La interfaz `Strategy` declara una operación común llamada `execute`
// que será implementada por diferentes estrategias concretas. Esta interfaz
// permite que las estrategias sean intercambiables entre sí en el contexto.
interface Strategy {
    // Este método será implementado por las estrategias concretas para ejecutar 
    // su respectivo algoritmo.
    execute(a: number, b: number): number;
}

// `ConcreteStrategyAdd` implementa la interfaz `Strategy` y define el algoritmo
// de la suma. Cuando el contexto use esta estrategia, sumará los dos números.
class ConcreteStrategyAdd implements Strategy {
    // Implementa el método `execute` para sumar dos números.
    execute(a: number, b: number): number {
        return a + b;
    }
}

// `ConcreteStrategySubtract` es otra implementación de la interfaz `Strategy`.
// Define el algoritmo de la resta. Cuando el contexto use esta estrategia, restará.
class ConcreteStrategySubtract implements Strategy {
    // Implementa el método `execute` para restar dos números.
    execute(a: number, b: number): number {
        return a - b;
    }
}

// `ConcreteStrategyMultiply` es una implementación más de la interfaz `Strategy`.
// Define el algoritmo de la multiplicación.
class ConcreteStrategyMultiply implements Strategy {
    // Implementa el método `execute` para multiplicar dos números.
    execute(a: number, b: number): number {
        return a * b;
    }
}

// La clase `Context` es donde interactúan las estrategias.
// El contexto mantiene una referencia a un objeto de tipo `Strategy`, pero no conoce
// la clase concreta que implementa esa estrategia. Esto lo hace flexible para poder
// cambiar de estrategia en tiempo de ejecución.
class Contexto {
    // Aquí almacenamos la estrategia actual que el contexto usará.
    private strategy!: Strategy;

    // El método `setStrategy` permite cambiar la estrategia del contexto.
    // Esto es útil porque el algoritmo puede variar según la estrategia elegida.
    public setStrategy(strategy: Strategy): void {
        this.strategy = strategy;
    }

    // Este método ejecuta la estrategia actual. En lugar de implementar el algoritmo
    // directamente, el contexto delega la tarea a la estrategia actual a través del
    // método `execute`. Esto permite que el algoritmo cambie dinámicamente.
    public executeStrategy(a: number, b: number): number {
        return this.strategy.execute(a, b);
    }
}

// La clase `ExampleApplication` actúa como el código cliente que utiliza el contexto
// y las estrategias. El cliente elige qué estrategia utilizar basándose en la entrada
// del usuario (por ejemplo, si quiere sumar, restar o multiplicar).
class ExampleApplication {
    // El método `main` es donde toda la lógica del cliente sucede.
    public static main(): void {
        // Crear una instancia del contexto.
        const context = new Contexto();

        // Leer el primer número (para simplificar, en un programa real se leería desde la entrada del usuario).
        const firstNumber = 10;

        // Leer el segundo número (idem al anterior).
        const secondNumber = 5;

        // Simulamos una entrada de acción del usuario (por ejemplo: "add" para sumar).
        let action = "add"; // Podría ser "subtract" o "multiply".

        // Dependiendo de la acción del usuario, configuramos la estrategia adecuada.
        if (action === "add") {
            // Si el usuario quiere sumar, utilizamos `ConcreteStrategyAdd`.
            context.setStrategy(new ConcreteStrategyAdd());
        }

        if (action === "subtract") {
            // Si el usuario quiere restar, utilizamos `ConcreteStrategySubtract`.
            context.setStrategy(new ConcreteStrategySubtract());
        }

        if (action === "multiply") {
            // Si el usuario quiere multiplicar, utilizamos `ConcreteStrategyMultiply`.
            context.setStrategy(new ConcreteStrategyMultiply());
        }

        // Ejecutamos la estrategia seleccionada.
        const result = context.executeStrategy(firstNumber, secondNumber);

        // Mostramos el resultado en consola.
        console.log(`Resultado: ${result}`);
    }
}

// Ejecutamos el método principal para ver cómo funciona todo.
ExampleApplication.main();
