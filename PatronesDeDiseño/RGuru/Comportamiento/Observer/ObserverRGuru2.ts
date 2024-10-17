/**
 * La interfaz SubjectR2 declara un conjunto de métodos para gestionar suscriptores.
 */
interface SubjectR2 {
    // Adjunta un observador al sujeto.
    attach(observer: ObserverR2): void;

    // Desvincula un observador del sujeto.
    detach(observer: ObserverR2): void;

    // Notifica a todos los observadores sobre un evento.
    notify(): void;
}

/**
 * El SubjectR2 posee un estado importante y notifica a los observadores cuando el estado cambia.
 */
class ConcreteSubjectR2 implements SubjectR2 {
    /**
     * @type {number} Por simplicidad, el estado del SubjectR2, esencial para todos los suscriptores, se almacena en esta variable.
     */
    public state: number=0;

    /**
     * @type {ObserverR2[]} Lista de suscriptores. En la vida real, la lista de suscriptores puede almacenarse de forma más completa (clasificada por tipo de evento, etc.).
     */
    private observers: ObserverR2[] = [];

    /**
     * Métodos para la gestión de suscripciones.
     */
    public attach(observer: ObserverR2): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('SubjectR2: El observador ya ha sido adjuntado.');
        }

        console.log('SubjectR2: Se adjuntó un observador.');
        this.observers.push(observer);
    }

    public detach(observer: ObserverR2): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('SubjectR2: Observador inexistente.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('SubjectR2: Se ha desvinculado un observador.');
    }

    /**
     * Activa una actualización en cada suscriptor.
     */
    public notify(): void {
        console.log('SubjectR2: Notificando a los observadores...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    /**
     * Normalmente, la lógica de suscripción es solo una fracción de lo que un SubjectR2 realmente puede hacer.
     * Los SubjectR2 suelen contener alguna lógica de negocio importante, que activa un método de notificación
     * cada vez que algo importante está a punto de suceder (o después de que suceda).
     */
    public someBusinessLogic(): void {
        console.log('\nSubjectR2: Estoy haciendo algo importante.');
        this.state = Math.floor(Math.random() * (10 + 1));

        console.log(`SubjectR2: Mi estado acaba de cambiar a: ${this.state}`);
        this.notify(); // Notifica a los observadores sobre el cambio de estado.
    }
}

/**
 * La interfaz ObserverR2 declara el método de actualización, utilizado por los sujetos.
 */
interface ObserverR2 {
    // Recibe actualizaciones del sujeto.
    update(subject: SubjectR2): void;
}

/**
 * Los observadores concretos reaccionan a las actualizaciones emitidas por el SubjectR2 al que están vinculados.
 */
class ConcreteObserverAR2 implements ObserverR2 {
    public update(subject: SubjectR2): void {
        // Verifica si el sujeto es una instancia de ConcreteSubjectR2 y si su estado es menor que 3.
        if (subject instanceof ConcreteSubjectR2 && subject.state < 3) {
            console.log('ConcreteObserverAR2: Reaccionó al evento.');
        }
    }
}

class ConcreteObserverBR2 implements ObserverR2 {
    public update(subject: SubjectR2): void {
        // Verifica si el sujeto es una instancia de ConcreteSubjectR2 y si su estado es 0 o mayor o igual a 2.
        if (subject instanceof ConcreteSubjectR2 && (subject.state === 0 || subject.state >= 2)) {
            console.log('ConcreteObserverBR2: Reaccionó al evento.');
        }
    }
}

/**
 * Código del cliente.
 */

// Crea una instancia de ConcreteSubjectR2.
const subjectR2 = new ConcreteSubjectR2();

// Crea un observador de tipo ConcreteObserverAR2 y lo adjunta al sujeto.
const observer1R2 = new ConcreteObserverAR2();
subjectR2.attach(observer1R2);

// Crea un observador de tipo ConcreteObserverBR2 y lo adjunta al sujeto.
const observer2R2 = new ConcreteObserverBR2();
subjectR2.attach(observer2R2);

// Ejecuta alguna lógica de negocio que podría cambiar el estado del sujeto y notificar a los observadores.
subjectR2.someBusinessLogic();
subjectR2.someBusinessLogic();

// Desvincula al segundo observador.
subjectR2.detach(observer2R2);

// Ejecuta nuevamente la lógica de negocio para observar el comportamiento con un solo observador.
subjectR2.someBusinessLogic();
