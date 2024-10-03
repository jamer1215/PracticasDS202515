// La clase EventManager gestiona las suscripciones y notificaciones
// a diferentes tipos de eventos.
class EventManager {
    // Mapa que contiene los listeners asociados a tipos de eventos.
    private listeners: Map<string, EventListener[]> = new Map();

    // El método subscribe permite agregar un listener para un tipo de evento específico.
    subscribe(eventType: string, listener: EventListener): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)?.push(listener);
    }

    // El método unsubscribe permite eliminar un listener para un tipo de evento específico.
    unsubscribe(eventType: string, listener: EventListener): void {
        const listenersForEvent = this.listeners.get(eventType);
        if (listenersForEvent) {
            const index = listenersForEvent.indexOf(listener);
            if (index !== -1) {
                listenersForEvent.splice(index, 1);
            }
        }
    }

    // El método notify notifica a todos los listeners asociados a un evento
    // que ha ocurrido el evento, pasándoles la data correspondiente.
    notify(eventType: string, data: string): void {
        const listenersForEvent = this.listeners.get(eventType);
        if (listenersForEvent) {
            for (const listener of listenersForEvent) {
                listener.update(data);
            }
        }
    }
}

// El notificador concreto contiene lógica de negocio real, de interés para algunos suscriptores.
// Podemos derivar esta clase de la notificadora base, pero esto no siempre es posible en el mundo real
// porque puede que la notificadora concreta sea ya una subclase. En este caso, puedes modificar la
// lógica de la suscripción con composición, como hicimos aquí.
class Editore {
    // La clase Editor tiene un EventManager que gestiona sus eventos.
    public events: EventManager;
    private file: File | null = null;

    // El constructor inicializa el EventManager.
    constructor() {
        this.events = new EventManager();
    }

    // Este método abre un archivo y notifica a los listeners interesados en el evento "open".
    openFile(path: string): void {
        this.file = new File(path);
        this.events.notify("open", this.file.name);
    }

    // Este método guarda el archivo y notifica a los listeners interesados en el evento "save".
    saveFile(): void {
        if (this.file) {
            this.file.le(path);
        this.events.notify("open", this.file.name);
      }
   }

    // Este método guarda el archivo y notifica a los listeners interesados en el evento "save".
    saveFile(): void {
        if (this.file) {
            this.file.write(`File saved: ${this.file.name}`);
            this.events.notify("save", this.file.name);
        }
    }
}

// Aquí está la interfaz suscriptora. Si tu lenguaje de programación soporta tipos funcionales,
// puedes sustituir toda la jerarquía suscriptora por un grupo de funciones.
interface EventListener {
    // Este método debe ser implementado por cualquier clase que desee recibir notificaciones.
    update(data: string): void;
}

// Los suscriptores concretos reaccionan a las actualizaciones emitidas por el notificador al que están unidos.
// LoggingListener registra eventos en un archivo de log.
class LoggingListener implements EventListener {
    private log: File;
    private message: string;

    // El constructor inicializa el archivo de log y el mensaje que será usado cuando ocurra el evento.
    constructor(logFilename: string, message: string) {
        this.log = new File(logFilename);
        this.message = message;
    }

    // El método update es llamado cuando se produce un evento y registra el evento en el archivo de log.
    update(filename: string): void {
        // Escribe el mensaje en el log, reemplazando el placeholder '%s' con el nombre del archivo.
        this.log.write(this.message.replace('%s', filename));
    }
}

// EmailAlertsListener envía correos electrónicos cuando se notifica un evento.
class EmailAlertsListener implements EventListener {
    private email: string;
    private message: string;

    // El constructor inicializa la dirección de email y el mensaje que será enviado cuando ocurra el evento.
    constructor(email: string, message: string) {
        this.email = email;
        this.message = message;
    }

    // El método update es llamado cuando se produce un evento y envía un email con los detalles del evento.
    update(filename: string): void {
        // Simulación del envío de un correo electrónico, reemplazando el placeholder '%s' con el nombre del archivo.
        console.log(`Enviando correo a ${this.email}: ${this.message.replace('%s', filename)}`);
    }
}

// Una aplicación puede configurar notificadores y suscriptores durante el tiempo de ejecución.
// Clase principal Application para configurar los listeners.
class Applicacion {
    // Método de configuración que crea un Editor y lo asocia a los listeners necesarios.
    config() {
        const editor = new Editore();

        // Logger que registra cuando se abre un archivo.
        const logger = new LoggingListener(
            "/path/to/log.txt",
            "Someone has opened the file: %s"
        );
        editor.events.subscribe("open", logger);

        // Listener que envía un correo electrónico cuando se guarda un archivo.
        const emailAlerts = new EmailAlertsListener(
            "admin@example.com",
            "Someone has changed the file: %s"
        );
        editor.events.subscribe("save", emailAlerts);
    }
}

// Clase File simulada para los propósitos de este ejemplo.
// En un escenario real, esto sería una clase que representa un archivo del sistema.
class File {
    public name: string;

    // El constructor toma el nombre del archivo como argumento.
    constructor(name: string) {
        this.name = name;
    }

    // El método write simula escribir datos en el archivo.
    write(data: string): void {
        console.log(`Writing to file: ${this.name}, data: ${data}`);
    }
}
