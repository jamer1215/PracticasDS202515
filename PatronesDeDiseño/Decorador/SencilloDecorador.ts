interface Message {
    send(): string;
}

class SimpleMessage implements Message {
    send(): string {
        return 'Mensaje básico';
    }
}

class EncryptedMessageDecorator implements Message {
    constructor(private message: Message) {}

    send(): string {
        return `Mensaje encriptado: ${this.message.send()}`;
    }
}

class CompressedMessageDecorator implements Message {
    constructor(private message: Message) {}

    send(): string {
        return `Mensaje comprimido: ${this.message.send()}`;
    }
}

// Cliente
function clientCodee(message: Message) {
    console.log(message.send());
}

// Uso en el cliente
const simpleMessage = new SimpleMessage();
clientCodee(simpleMessage);  // Salida: Mensaje básico

const encryptedMessage = new EncryptedMessageDecorator(simpleMessage);
clientCodee(encryptedMessage);  // Salida: Mensaje encriptado: Mensaje básico

const compressedEncryptedMessage = new CompressedMessageDecorator(encryptedMessage);
clientCodee(compressedEncryptedMessage);  // Salida: Mensaje comprimido: Mensaje encriptado: Mensaje básico
