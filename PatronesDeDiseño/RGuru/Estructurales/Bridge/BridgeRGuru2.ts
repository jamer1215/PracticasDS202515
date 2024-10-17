// La "abstracción" define la interfaz para la parte de
// "control" de las dos jerarquías de clase. Mantiene una
// referencia a un objeto de la jerarquía de "implementación" y
// delega todo el trabajo real a este objeto.
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Puedes extender clases de la jerarquía de abstracción
// independientemente de las clases de dispositivo.
class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        this.device.setVolume(0);
    }
}

// La interfaz de "implementación" declara métodos comunes a
// todas las clases concretas de implementación. No tiene por
// qué coincidir con la interfaz de la abstracción. De hecho,
// las dos interfaces pueden ser completamente diferentes.
// Normalmente, la interfaz de implementación únicamente
// proporciona operaciones primitivas, mientras que la
// abstracción define operaciones de más alto nivel con base en
// las primitivas.
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Todos los dispositivos siguen la misma interfaz.
class Tv implements Device {
    private enabled: boolean = false;
    private volume: number = 50;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("TV encendida.");
    }

    disable(): void {
        this.enabled = false;
        console.log("TV apagada.");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        // La función asegura que el volumen esté en el rango de 0 a 100.
        // Si el valor es menor a 0, se establece en 0; si es mayor a 100, se establece en 100.
        this.volume = Math.max(0, Math.min(100, percent));
        console.log(`Volumen de la TV ajustado a ${this.volume}.`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`Canal de la TV ajustado a ${this.channel}.`);
    }
}

class Radio implements Device {
    private enabled: boolean = false;
    private volume: number = 30;
    private channel: number = 101;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("Radio encendida.");
    }

    disable(): void {
        this.enabled = false;
        console.log("Radio apagada.");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        this.volume = Math.max(0, Math.min(100, percent));
        console.log(`Volumen de la radio ajustado a ${this.volume}.`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`Canal de la radio ajustado a ${this.channel}.`);
    }
}

// En algún lugar del código cliente.
const tv = new Tv();
let remote: RemoteControl = new RemoteControl(tv);
remote.togglePower(); // Enciende la TV

const radio = new Radio();
remote = new AdvancedRemoteControl(radio);
remote.togglePower(); // Enciende la radio
(remote as AdvancedRemoteControl).mute(); // Silencia la radio
