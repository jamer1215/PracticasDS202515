// La "abstracción" define la interfaz para la parte de "control" de las dos jerarquías de clase.
// Mantiene una referencia a un objeto de la jerarquía de "implementación" y delega el trabajo real a este objeto.
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    // Cambia el estado de encendido/apagado del dispositivo.
    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    // Disminuye el volumen en 10 unidades.
    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 10);
    }

    // Aumenta el volumen en 10 unidades.
    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 10);
    }

    // Baja el canal en 1.
    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }

    // Sube el canal en 1.
    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }
}

// Puedes extender clases de la jerarquía de abstracción independientemente de las clases de dispositivo.
class AdvancedRemoteControl extends RemoteControl {
    // Mutea el dispositivo.
    mute(): void {
        this.device.setVolume(0);
    }
}

// La interfaz de "implementación" declara métodos comunes a todas las clases concretas de implementación.
interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

// Clase concreta de implementación para un Televisor.
class Tv implements Device {
    private enabled: boolean = false;
    private volume: number = 50;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("TV encendido");
    }

    disable(): void {
        this.enabled = false;
        console.log("TV apagado");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        this.volume = Math.max(0, Math.min(100, percent)); // Limita el volumen entre 0 y 100.
        console.log(`Volumen del TV ajustado a ${this.volume}`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`Canal del TV ajustado a ${this.channel}`);
    }
}

// Clase concreta de implementación para una Radio.
class Radio implements Device {
    private enabled: boolean = false;
    private volume: number = 30;
    private channel: number = 1;

    isEnabled(): boolean {
        return this.enabled;
    }

    enable(): void {
        this.enabled = true;
        console.log("Radio encendida");
    }

    disable(): void {
        this.enabled = false;
        console.log("Radio apagada");
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(percent: number): void {
        this.volume = Math.max(0, Math.min(100, percent));
        console.log(`Volumen de la Radio ajustado a ${this.volume}`);
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
        console.log(`Canal de la Radio ajustado a ${this.channel}`);
    }
}

// Ejemplos de uso.
const tv = new Tv();
const remote = new RemoteControl(tv);

remote.togglePower(); // Enciende el TV
remote.volumeUp();    // Aumenta el volumen del TV
remote.channelUp();   // Cambia al siguiente canal

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);

advancedRemote.togglePower(); // Enciende la Radio
advancedRemote.mute();        // Mutea la Radio
