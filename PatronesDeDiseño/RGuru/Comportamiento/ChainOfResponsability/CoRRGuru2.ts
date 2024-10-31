import { Optional } from "../../../Optional";

/**
 * La interfaz Handler (Manejador) declara un método para construir la cadena de manejadores.
 * También declara un método para ejecutar una solicitud.
 */
interface HandlerCoR2<Request = string, Result = string> {
    // Configura el siguiente manejador en la cadena.
    // Request = string: Esto indica que el tipo genérico Request se usa para representar el tipo de la solicitud 
    // que se manejará. Si no se especifica un tipo al usar la interfaz, el tipo por defecto será string.
    setNext(handler: HandlerCoR2<Request, Result>): HandlerCoR2<Request, Result>;

    // Maneja la solicitud dada.
    handle(request: Request): Optional<Result>;
}

/**
 * El comportamiento por defecto de la cadena puede ser implementado dentro de una clase manejadora base.
 */
abstract class AbstractHandlerCoR2 implements HandlerCoR2 {
    private nextHandler: Optional<HandlerCoR2> = new Optional(); // Uso de Optional para el siguiente manejador.

    // Método para configurar el siguiente manejador en la cadena.
    public setNext(handler: HandlerCoR2): HandlerCoR2 {
        this.nextHandler = new Optional(handler);
        // Devolviendo el manejador desde aquí nos permitirá encadenar los manejadores
        // de manera conveniente, como por ejemplo:
        // mono.setNext(ardilla).setNext(perro);
        return handler;
    }

    // Método para manejar la solicitud.
    public handle(request: string): Optional<string> {
        // Si hay un siguiente manejador en la cadena, delega la solicitud a él.
        if (this.nextHandler.hasValue()) {
            return this.nextHandler.getValue().handle(request);
        }

        // Si no hay un siguiente manejador, retorna un Optional vacío.
        return new Optional<string>();
    }
}

/**
 * Todos los manejadores concretos manejan una solicitud o la pasan al siguiente manejador en la cadena.
 */
class MonkeyHandlerCoR2 extends AbstractHandlerCoR2 {
    // El método handle intenta manejar la solicitud si coincide con "Banana".
    public handle(request: string): Optional<string> {
        if (request === 'Banana') {
            return new Optional(`Monkey: Me comeré la ${request}.`);
        }
        // Si no coincide, llama al manejador base para pasar la solicitud al siguiente en la cadena.
        return super.handle(request);
    }
}

class SquirrelHandlerCoR2 extends AbstractHandlerCoR2 {
    // El método handle intenta manejar la solicitud si coincide con "Nut".
    public handle(request: string): Optional<string> {
        if (request === 'Nut') {
            return new Optional(`Squirrel: Me comeré la ${request}.`);
        }
        // Si no coincide, llama al manejador base para pasar la solicitud al siguiente en la cadena.
        return super.handle(request);
    }
}

class DogHandlerCoR2 extends AbstractHandlerCoR2 {
    // El método handle intenta manejar la solicitud si coincide con "MeatBall".
    public handle(request: string): Optional<string> {
        if (request === 'MeatBall') {
            return new Optional(`Dog: Me comeré la ${request}.`);
        }
        // Si no coincide, llama al manejador base para pasar la solicitud al siguiente en la cadena.
        return super.handle(request);
    }
}

/**
 * El código cliente normalmente está diseñado para trabajar con un solo manejador.
 * En la mayoría de los casos, ni siquiera sabe que el manejador es parte de una cadena.
 */
function clientCodeCoR2(handler: HandlerCoR2) {
    const foods = ['Nut', 'Banana', 'Cup of coffee'];

    for (const food of foods) {
        console.log(`Cliente: ¿Quién quiere una ${food}?`);

        const result = handler.handle(food);
        if (result.hasValue()) {
            console.log(`  ${result.getValue()}`);
        } else {
            console.log(`  La ${food} quedó intacta.`);
        }
    }
}

/**
 * La otra parte del código cliente construye la cadena real.
 */
const monkeyCoR2 = new MonkeyHandlerCoR2();
const squirrelCoR2 = new SquirrelHandlerCoR2();
const dogCoR2 = new DogHandlerCoR2();

// Configura la cadena: Mono > Ardilla > Perro.
monkeyCoR2.setNext(squirrelCoR2).setNext(dogCoR2);


/**
 * El cliente debería poder enviar una solicitud a cualquier manejador, no solo al primero de la cadena.
 */
console.log('Cadena: Mono > Ardilla > Perro\n');
clientCodeCoR2(monkeyCoR2);
console.log('');

console.log('Subcadena: Ardilla > Perro\n');
clientCodeCoR2(squirrelCoR2);
