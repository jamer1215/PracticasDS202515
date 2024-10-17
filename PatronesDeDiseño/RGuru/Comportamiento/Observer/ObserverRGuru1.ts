import { Optional } from "../../../Optional";

// La clase notificadora base incluye código de gestión de suscripciones y métodos de notificación.
class EventManagerObs {
    // Mapa que asocia los tipos de eventos con sus respectivos listeners (suscriptores).
    private listeners: Map<string, EventListenerObs[]> = new Map();

    // Suscribe un nuevo listener a un tipo de evento específico.
    public subscribe(eventType: string, listener: EventListenerObs): void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []); // Si no hay listeners para este evento, crea una lista vacía.
        }
        this.listeners.get(eventType)!.push(listener); // Añade el listener a la lista.
    }

    // Elimina un listener de un tipo de evento específico.
    public unsubscribe(eventType: string, listener: EventListenerObs): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            // Filtra el listener específico para eliminarlo.
            this.listeners.set(
                eventType,
                listeners.filter(li => li !== listener)
            );
        }
    }

    // Notifica a todos los listeners suscritos a un evento con los datos correspondientes.
    public notify(eventType: string, data: string): void {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            for (const listener of listeners) {
                listener.update(data); // Llama al método update de cada listener.
            }
        }
    }
}

// La clase EditorObs contiene la lógica de negocio y utiliza el EventManagerObs para gestionar eventos.
// Puede notificar cambios a los suscriptores cuando se abren o guardan archivos.
class EditorObs {
    public events: EventManagerObs;
    private file: Optional<FileObs>=new Optional();

    constructor() {
        // Inicializa el gestor de eventos.
        this.events = new EventManagerObs();
    }

    // Método para abrir un archivo, notificando a los suscriptores que se ha abierto un archivo.
    public openFile(path: string): void {
        this.file = new Optional<FileObs>(new FileObs(path));
        this.events.notify("open", this.file.getValue().name);
    }

    // Método para guardar un archivo, notificando a los suscriptores que se ha guardado un archivo.
    public saveFile(): void {
        if (this.file.hasValue()) {
            console.log(`Guardando archivo: ${this.file.getValue().name}`);
            this.events.notify("save", this.file.getValue().name);
        }
    }
}

// Interfaz que define el método que deben implementar todos los listeners (suscriptores).
interface EventListenerObs {
    update(filename: string): void; // El método update se llama cuando ocurre un evento relevante.
}

// LoggingListenerObs implementa EventListenerObs y registra los eventos en un archivo de registro.
class LoggingListenerObs implements EventListenerObs {
    private log: FileObs;
    private message: string;

    constructor(logFilename: string, message: string) {
        this.log = new FileObs(logFilename);
        this.message = message;
    }

    // Actualiza el log con el nombre del archivo cuando ocurre un evento.
    public update(filename: string): void {
        console.log(`Escribiendo en log: ${this.message.replace('%s', filename)}`);
    }
}

// EmailAlertsListenerObs implementa EventListenerObs y envía alertas por correo electrónico.
class EmailAlertsListenerObs implements EventListenerObs {
    private email: string;
    private message: string;

    constructor(email: string, message: string) {
        this.email = email;
        this.message = message;
    }

    // Envía un email con el nombre del archivo cuando ocurre un evento.
    public update(filename: string): void {
        console.log(`Enviando correo a ${this.email}: ${this.message.replace('%s', filename)}`);
    }
}

// Simulación de la clase FileObs para manejar archivos.
// En un entorno de navegador, no se tiene acceso a archivos del sistema, por lo que aquí solo se simula.
class FileObs {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Clase ApplicationObs que configura los notificadores y suscriptores en tiempo de ejecución.
class ApplicationObs {
    public config(): void {
        const editor = new EditorObs();

        // Crea un listener para el registro de eventos.
        const logger = new LoggingListenerObs(
            "/path/to/log.txt",
            "Someone has opened the file: %s"
        );
        // Suscribe el listener al evento 'open'.
        editor.events.subscribe("open", logger);

        // Crea un listener para alertas por correo electrónico.
        const emailAlerts = new EmailAlertsListenerObs(
            "admin@example.com",
            "Someone has changed the file: %s"
        );
        // Suscribe el listener al evento 'save'.
        editor.events.subscribe("save", emailAlerts);

        // Simulación de operaciones de prueba.
        editor.openFile("example.txt"); // Debería notificar al LoggingListenerObs.
        editor.saveFile(); // Debería notificar al EmailAlertsListenerObs.
    }
}

// Prueba de la aplicación para configurar los suscriptores y ejecutar las notificaciones.
const appObs = new ApplicationObs();
appObs.config();
