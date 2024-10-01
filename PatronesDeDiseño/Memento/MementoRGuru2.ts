/**
 * El Originador contiene información importante que puede cambiar con el tiempo. 
 * También define un método para guardar el estado dentro de un memento y otro método 
 * para restaurar el estado a partir de él.
 */
class Originator {

    /**
     * Para simplificar, el estado del Originador se almacena dentro de 
     * una sola variable.
     */
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originador: Mi estado inicial es: ${state}`);
    }

    /**
     * La lógica de negocio del Originador puede afectar su estado interno. Por lo tanto, 
     * el cliente debe hacer una copia de seguridad del estado antes de lanzar métodos 
     * de la lógica de negocio mediante el método save().
     */
    public doSomething(): void {
        // Simula que el Originador realiza alguna acción importante
        console.log('Originador: Estoy haciendo algo importante.');

        // Cambia el estado del Originador a un nuevo valor aleatorio
        this.state = this.generateRandomString(30);
        console.log(`Originador: y mi estado ha cambiado a: ${this.state}`);
    }

    // Método privado para generar una cadena aleatoria de una longitud específica


    /**
     * Guarda el estado actual dentro de un memento.
     */   
    private generateRandomString(length: number = 10): string {
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

     // Crea un array de longitud 'length' y lo llena con caracteres aleatorios
        return Array.from({ length }, () => charSet.charAt(Math.floor(Math.random() * charSet.length))).join('');
    }
    public save(): Memento {
        // Retorna un nuevo objeto memento que contiene el estado actual
        return new ConcreteMemento(this.state);
    }

    /**
     * Restaura el estado del Originador desde un objeto memento.
     */
    public restore(memento: Memento): void {
        // Recupera el estado almacenado en el memento y lo restaura en el Originador
        this.state = memento.getState();
        console.log(`Originador: Mi estado ha cambiado a: ${this.state}`);
    }
}

/**
 * La interfaz Memento proporciona una forma de recuperar los metadatos del memento, 
 * como la fecha de creación o el nombre. Sin embargo, no expone el estado del Originador.
 */
interface Memento {
    // Método para obtener el estado almacenado en el memento
    getState(): string;

    // Método para obtener el nombre del memento
    getName(): string;

    // Método para obtener la fecha de creación del memento
    getDate(): string;
}

/**
 * El Memento Concreto contiene la infraestructura para almacenar el estado 
 * del Originador.
 */
class ConcreteMemento implements Memento {
    // Almacena el estado del Originador en este memento
    private state: string;

    // Almacena la fecha en la que se creó el memento
    private date: string;

    constructor(state: string) {
        this.state = state;

        // Asigna la fecha actual como la fecha de creación del memento
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * El Originador utiliza este método cuando restaura su estado.
     */
    public getState(): string {
        // Devuelve el estado almacenado
        return this.state;
    }

    /**
     * El resto de los métodos son utilizados por el cuidador para mostrar los metadatos.
     */
    public getName(): string {
        // Devuelve el nombre del memento, que incluye la fecha y una parte del estado
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }

    // Devuelve la fecha de creación del memento
    public getDate(): string {
        return this.date;
    }
}

/**
 * El Cuidador (Caretaker) no depende de la clase Memento Concreto. Por lo tanto, 
 * no tiene acceso al estado del Originador, almacenado dentro del memento. Trabaja 
 * con todos los mementos a través de la interfaz base Memento.
 */
class Caretaker {
    // Almacena una lista de mementos para mantener el historial
    private mementos: Memento[] = [];

    // Hace referencia al Originador cuya información va a respaldar
    private originator: Originator;

    constructor(originator: Originator) {
        this.originator = originator;
    }

    // Crea una copia de seguridad del estado del Originador
    public backup(): void {
        console.log('\nCuidador: Guardando el estado del Originador...');
        // Guarda el memento generado por el Originador
        this.mementos.push(this.originator.save());
    }

    // Deshace el último cambio, restaurando el último memento
    public undo(): void {
        // Verifica si hay mementos en la lista
        if (!this.mementos.length) {
            console.log('Cuidador: No hay estados para restaurar.');
            return; // Sale de la función si no hay mementos
        }
    
        // Recupera el último memento de la lista
        const memento = this.mementos.pop(); // pop() puede devolver undefined
    
        // Verifica que el memento no sea undefined
        if (memento) {
            console.log(`Cuidador: Restaurando estado a: ${memento.getName()}`);
            // Restaura el estado del Originador usando el memento
            this.originator.restore(memento);
        } else {
            console.log('Cuidador: Error al restaurar el estado, memento es undefined.');
        }
    }
    

    // Muestra la lista de todos los mementos almacenados
    public showHistory(): void {
        console.log('Cuidador: Aquí está la lista de mementos:');
        // Itera sobre los mementos y muestra su información
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

/**
 * Código del cliente.
 */
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);

// Crear copias de seguridad y hacer cambios en el estado del Originador
caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory(); // Muestra el historial de mementos

console.log('\nCliente: Ahora, vamos a deshacer cambios!\n');
caretaker.undo(); // Deshacer el último cambio

console.log('\nCliente: Una vez más!\n');
caretaker.undo(); // Deshacer otro cambio
