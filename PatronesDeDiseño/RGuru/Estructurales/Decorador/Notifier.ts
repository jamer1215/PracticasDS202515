// Interfaz base para el Notificador, que define el método 'send'
interface Notifier {
    send(message: string): void;
}

// Clase concreta que implementa el Notificador básico, por ejemplo, el que envía correos
class EmailNotifier implements Notifier {
    send(message: string): void {
        console.log(`Sending email with message: ${message}`);
    }
}

// Clase decoradora base que sigue la misma interfaz que el Notificador. 
// Esta clase almacena un Notificador y delega la llamada al método 'send'.
class NotifierDecorator implements Notifier {
    protected wrappee: Notifier;

    constructor(notifier: Notifier) {
        this.wrappee = notifier;
    }

    send(message: string): void {
        this.wrappee.send(message);
    }
}

// Un decorador concreto que agrega funcionalidad para enviar notificaciones por SMS.
class SMSNotifierDecorator extends NotifierDecorator {
    constructor(notifier: Notifier) {
        super(notifier);
    }

    send(message: string): void {
        super.send(message); // Llama al método 'send' del Notificador que está decorando
        this.sendSMS(message); // Agrega la funcionalidad específica de SMS
    }

    private sendSMS(message: string): void {
        console.log(`Sending SMS with message: ${message}`);
    }
}

// Otro decorador concreto que agrega funcionalidad para enviar notificaciones por Slack.
class SlackNotifierDecorator extends NotifierDecorator {
    constructor(notifier: Notifier) {
        super(notifier);
    }

    send(message: string): void {
        super.send(message); // Llama al método 'send' del Notificador decorado
        this.sendSlackMessage(message); // Agrega la funcionalidad específica de Slack
    }

    private sendSlackMessage(message: string): void {
        console.log(`Sending Slack message: ${message}`);
    }
}

// Otro decorador concreto que agrega funcionalidad para enviar notificaciones por Facebook.
class FacebookNotifierDecorator extends NotifierDecorator {
    constructor(notifier: Notifier) {
        super(notifier);
    }

    send(message: string): void {
        super.send(message); // Llama al método 'send' del Notificador decorado
        this.sendFacebookMessage(message); // Agrega la funcionalidad específica de Facebook
    }

    private sendFacebookMessage(message: string): void {
        console.log(`Sending Facebook message: ${message}`);
    }
}

// Código del cliente que utiliza el patrón Decorator para enviar notificaciones por varios canales.
function clientCodeNo(notifier: Notifier) {
    notifier.send('Hello, this is a notification!');
}

// Escenario 1: Uso del Notificador simple (solo por email).
console.log('--- Email Notifier ---');
const emailNotifier = new EmailNotifier();
clientCodeNo(emailNotifier);

console.log('\n');

// Escenario 2: Agregando la funcionalidad de SMS usando el decorador.
console.log('--- Email + SMS Notifier ---');
const smsNotifier = new SMSNotifierDecorator(emailNotifier);
clientCodeNo(smsNotifier);

console.log('\n');

// Escenario 3: Agregando la funcionalidad de Slack encima del SMS y Email.
console.log('--- Email + SMS + Slack Notifier ---');
const slackNotifier = new SlackNotifierDecorator(smsNotifier);
clientCodeNo(slackNotifier);

console.log('\n');

// Escenario 4: Agregando también la funcionalidad de Facebook.
console.log('--- Email + SMS + Slack + Facebook Notifier ---');
const facebookNotifier = new FacebookNotifierDecorator(slackNotifier);
clientCodeNo(facebookNotifier);
