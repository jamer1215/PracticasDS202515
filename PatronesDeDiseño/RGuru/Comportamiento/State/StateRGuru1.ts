// La clase AudioPlayerEst actúa como un contexto que mantiene una referencia al estado actual del reproductor.
// Este contexto delega las acciones a su estado actual, permitiendo que el comportamiento cambie dinámicamente
// en función del estado en el que se encuentre el reproductor.
class AudioPlayerEst {
    public state: StateEst; // Estado actual del reproductor de audio
    public UI: UserInterfaceEst; // Simulación de la interfaz de usuario del reproductor
    public volume: number; // Volumen actual del reproductor
    public playlist: string[]; // Lista de reproducción con las canciones
    public currentSong: number; // Índice de la canción que se está reproduciendo actualmente

    constructor() {
        // Asegurarse de que el reproductor comience en el estado Ready (listo para reproducir)
        this.state = new ReadyStatePlayerEst(this); // Estado inicial configurado correctamente
        this.volume = 50; // Se establece un volumen inicial
        this.playlist = ["Canción 1", "Canción 2", "Canción 3"]; // Lista de canciones de ejemplo
        this.currentSong = 0; // La primera canción de la lista es la que se selecciona inicialmente

        // Configuración de la interfaz de usuario y sus eventos
        // Se crean botones para simular la interfaz del reproductor
        this.UI = new UserInterfaceEst();
        // this.UI.lockButton.onClick(() => this.clickLock());
        //mosca con lo comentado anterior, cuando instancio la vaina inicia clickeando para bloquear entonces aja
        //como hago para que se cambie en tiempo de ejecucion? NOTA: OK LISTO ENTENDI JEJEJE
        this.UI.playButton.onClick(() => this.clickPlay());
        this.UI.nextButton.onClick(() => this.clickNext());
        this.UI.prevButton.onClick(() => this.clickPrevious());

        console.log("Estado inicial: ReadyStatePlayerEst"); // Mensaje para verificar el estado inicial
    }

    // Cambia el estado actual del reproductor a otro estado
    public changeState(state: StateEst): void {
        this.state = state;
    }

    // Métodos que delegan la ejecución al estado actual.
    // Cada método simplemente llama al método correspondiente en el objeto de estado actual.
    public clickLock(): void {
        this.state.clickLock();
    }

    public clickPlay(): void {
        this.state.clickPlay();
    }

    public clickNext(): void {
        this.state.clickNext();
    }

    public clickPrevious(): void {
        this.state.clickPrevious();
    }

    // Métodos adicionales que pueden ser llamados por los estados para controlar el reproductor.
    public startPlayback(): void {
        console.log("Reproducción iniciada: " + this.playlist[this.currentSong]);
    }

    public stopPlayback(): void {
        console.log("Reproducción detenida.");
    }

    public nextSong(): void {
        // Cambia a la siguiente canción en la lista de reproducción.
        this.currentSong = (this.currentSong + 1) % this.playlist.length;
        console.log("Siguiente canción: " + this.playlist[this.currentSong]);
    }

    public previousSong(): void {
        // Cambia a la canción anterior en la lista de reproducción.
        this.currentSong = (this.currentSong - 1 + this.playlist.length) % this.playlist.length;
        console.log("Canción anterior: " + this.playlist[this.currentSong]);
    }

    public fastForward(time: number): void {
        console.log(`Avance rápido de ${time} segundos.`);
    }

    public rewind(time: number): void {
        console.log(`Rebobinado de ${time} segundos.`);
    }
}

// La clase abstracta StateEst define la interfaz común para todos los estados del reproductor.
// Proporciona una referencia al objeto AudioPlayerEst (contexto) para permitir a los estados
// cambiar el estado actual del reproductor.
abstract class StateEst {
    protected player: AudioPlayerEst; // Referencia al contexto

    // El constructor recibe el contexto y lo guarda en una propiedad
    constructor(player: AudioPlayerEst) {
        this.player = player;
    }

    // Métodos abstractos que cada estado concreto deberá implementar
    abstract clickLock(): void;
    abstract clickPlay(): void;
    abstract clickNext(): void;
    abstract clickPrevious(): void;
}

// La clase LockedStateEst representa el estado en el que el reproductor está bloqueado.
// En este estado, todas las acciones del usuario son ignoradas excepto el desbloqueo.
class LockedStateEst extends StateEst {
    public clickLock(): void {
        // Si el reproductor está bloqueado y se hace clic en el botón de bloqueo,
        // el reproductor cambia a estado Ready o Playing dependiendo de si está reproduciendo una canción.
        if (this.player.currentSong >= 0) {
            console.log("Desbloqueando y cambiando a estado Playing.");
            this.player.changeState(new PlayingStateEst(this.player)); // Cambia a Playing
        } else {
            console.log("Desbloqueando y cambiando a estado Ready.");
            this.player.changeState(new ReadyStatePlayerEst(this.player)); // Cambia a Ready
        }
    }

    public clickPlay(): void {
        // No se puede reproducir cuando el reproductor está bloqueado
        console.log("El reproductor está bloqueado, no se puede reproducir.");
    }

    public clickNext(): void {
        // No se puede avanzar a la siguiente canción cuando está bloqueado
        console.log("El reproductor está bloqueado, no se puede avanzar.");
    }

    public clickPrevious(): void {
        // No se puede retroceder a la canción anterior cuando está bloqueado
        console.log("El reproductor está bloqueado, no se puede retroceder.");
    }
}

// La clase ReadyStatePlayerEst representa el estado en el que el reproductor está listo para comenzar a reproducir.
class ReadyStatePlayerEst extends StateEst {
    public clickLock(): void {
        // Al hacer clic en el botón de bloqueo, el reproductor cambia a estado Locked
        this.player.changeState(new LockedStateEst(this.player));
        console.log("Reproductor bloqueado.");
    }

    public clickPlay(): void {
        // Al hacer clic en el botón de reproducción, comienza la reproducción y cambia a Playing
        this.player.startPlayback();
        this.player.changeState(new PlayingStateEst(this.player));
    }

    public clickNext(): void {
        // En estado Ready, se puede avanzar a la siguiente canción
        this.player.nextSong();
    }

    public clickPrevious(): void {
        // En estado Ready, se puede retroceder a la canción anterior
        this.player.previousSong();
    }
}

// La clase PlayingStateEst representa el estado en el que el reproductor está reproduciendo una canción.
class PlayingStateEst extends StateEst {
    public clickLock(): void {
        // Al hacer clic en el botón de bloqueo, el reproductor se bloquea
        this.player.changeState(new LockedStateEst(this.player));
        console.log("Reproductor bloqueado.");
    }

    public clickPlay(): void {
        // Al hacer clic en el botón de reproducción mientras está en Playing, se detiene la reproducción y cambia a Ready
        this.player.stopPlayback();
        this.player.changeState(new ReadyStatePlayerEst(this.player));
    }

    public clickNext(): void {
        // En Playing, al hacer clic en el botón de siguiente, se cambia a la siguiente canción
        console.log("Avanzando a la siguiente canción.");
        this.player.nextSong();
    }

    public clickPrevious(): void {
        // En Playing, al hacer clic en el botón de anterior, se cambia a la canción anterior
        console.log("Retrocediendo a la canción anterior.");
        this.player.previousSong();
    }
}

// La clase UserInterfaceEst simula la interfaz de usuario para el reproductor de audio.
// Cada botón tiene un método onClick para simular la interacción del usuario.
class UserInterfaceEst {
    public lockButton: ButtonEst = new ButtonEst(); // Botón para bloquear/desbloquear
    public playButton: ButtonEst = new ButtonEst(); // Botón para reproducir/detener
    public nextButton: ButtonEst = new ButtonEst(); // Botón para avanzar a la siguiente canción
    public prevButton: ButtonEst = new ButtonEst(); // Botón para retroceder a la canción anterior
}

// La clase ButtonEst simula un botón de la interfaz gráfica de usuario.
// El método onClick recibe una función callback que se ejecuta al simular el clic en el botón.
class ButtonEst {
    public onClick(callback: () => void): void {
        // En una implementación real, esto registraría el callback para cuando el botón sea presionado.
        callback(); // Llamada simulada al callback.
    }
}

// Código para simular el uso del reproductor de audio
const playerEst = new AudioPlayerEst();

console.log("=== Caso de Prueba 1: Reproducción de Audio ===");
playerEst.clickPlay(); // Inicia la reproducción

console.log("\n=== Caso de Prueba 2: Avanzar a la Siguiente Canción ===");
playerEst.clickNext(); // Cambia a la siguiente canción

console.log("\n=== Caso de Prueba 3: Pausar y Volver a Estado Ready ===");
playerEst.clickPlay(); // Pausa la reproducción

console.log("\n=== Caso de Prueba 4: Bloquear el Reproductor ===");
playerEst.clickLock(); // Bloquea el reproductor

console.log("\n=== Caso de Prueba 5: Intentar Reproducir en Estado Bloqueado ===");
playerEst.clickPlay(); // No hace nada, ya que está bloqueado

console.log("\n=== Caso de Prueba 6 JMA: Presionemos el boton lock pa ver qlq ===");
playerEst.clickLock(); // Bloquea el reproductor

