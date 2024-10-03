// Definimos la clase AudioPlayer que actúa como el contexto. Esta clase gestiona el estado del reproductor y delega
// las acciones a los diferentes estados a través de los métodos como clickPlay(), clickLock(), etc.
class AudioPlayer {
    // El campo 'state' es el que mantiene el estado actual del reproductor. Es de tipo 'State', que es la clase abstracta de estado.
    private state: State;
    
    // Algunos campos adicionales como UI, volume, playlist, y currentSong para manejar la interfaz y los datos del reproductor.
    private UI: any;
    private volume: number;
    private playlist: string[];
    private currentSong: string;

    constructor() {
        // Inicialmente, el estado del reproductor es 'ReadyState', indicando que está listo para reproducir música.
        this.state = new ReadyStatee(this);

        // Aquí se simula una interfaz de usuario (UI). Asignamos los métodos click a los botones de la UI.
        this.UI = {
            lockButton: { onClick: this.clickLock.bind(this) },
            playButton: { onClick: this.clickPlay.bind(this) },
            nextButton: { onClick: this.clickNext.bind(this) },
            prevButton: { onClick: this.clickPrevious.bind(this) }
        };
    }

    // Este método permite cambiar el estado del reproductor, es decir, actualizar el objeto 'state'.
    public changeState(state: State): void {
        this.state = state;
    }

    // Métodos que delegan la funcionalidad al estado actual del reproductor.
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

    // Métodos de servicio del reproductor. Estos serán invocados por los estados concretos cuando se requiera.
    public startPlayback(): void {
        console.log("Starting playback");
    }

    public stopPlayback(): void {
        console.log("Stopping playback");
    }

    public nextSong(): void {
        console.log("Next song");
    }

    public previousSong(): void {
        console.log("Previous song");
    }

    public fastForward(time: number): void {
        console.log(`Fast forwarding ${time} seconds`);
    }

    public rewind(time: number): void {
        console.log(`Rewinding ${time} seconds`);
    }
}

// Clase abstracta State. Define los métodos que deben ser implementados por las subclases concretas de estado.
// También tiene una referencia al contexto (AudioPlayer) que permite que los estados interactúen con el reproductor.
abstract class State {
    protected player: AudioPlayer;

    // Constructor que recibe el reproductor como argumento.
    constructor(player: AudioPlayer) {
        this.player = player;
    }

    // Métodos abstractos que deben ser implementados por las clases concretas.
    abstract clickLock(): void;
    abstract clickPlay(): void;
    abstract clickNext(): void;
    abstract clickPrevious(): void;
}

// Estado concreto: LockedState. Este estado representa cuando el reproductor está bloqueado.
// En este estado, no se pueden usar las funciones de reproducción, avanzar o retroceder.
class LockedState extends State {
    
    // Al hacer clic en el botón de bloqueo, si el reproductor está reproduciendo, cambia a "PlayingState".
    // Si no está reproduciendo, cambia a "ReadyState".
    public clickLock(): void {
        if (this.player.startPlayback()) {
            this.player.changeState(new PlayingState(this.player));
        } else {
            this.player.changeState(new ReadyStatee(this.player));
        }
    }

    // En el estado bloqueado, no se permite ninguna otra interacción.
    public clickPlay(): void {
        // Bloqueado, no hace nada.
    }

    public clickNext(): void {
        // Bloqueado, no hace nada.
    }

    public clickPrevious(): void {
        // Bloqueado, no hace nada.
    }
}

// Estado concreto: ReadyState. Representa cuando el reproductor está listo para reproducir música.
// En este estado, las acciones como avanzar o retroceder entre canciones están habilitadas.
class ReadyStatee extends State {

    // Al hacer clic en el botón de bloqueo, cambia al estado bloqueado.
    public clickLock(): void {
        this.player.changeState(new LockedState(this.player));
    }

    // Al hacer clic en el botón de reproducción, comienza a reproducir música y cambia al estado "PlayingState".
    public clickPlay(): void {
        this.player.startPlayback();
        this.player.changeState(new PlayingState(this.player));
    }

    // Al hacer clic en el botón de "siguiente", se avanza a la siguiente canción.
    public clickNext(): void {
        this.player.nextSong();
    }

    // Al hacer clic en el botón de "anterior", se retrocede a la canción anterior.
    public clickPrevious(): void {
        this.player.previousSong();
    }
}

// Estado concreto: PlayingState. Representa cuando el reproductor está reproduciendo música.
// En este estado, puedes pausar la reproducción, avanzar rápidamente, o retroceder.
class PlayingState extends State {

    // Al hacer clic en el botón de bloqueo, cambia al estado bloqueado.
    public clickLock(): void {
        this.player.changeState(new LockedState(this.player));
    }

    // Al hacer clic en el botón de reproducción, detiene la música y cambia al estado "ReadyState".
    public clickPlay(): void {
        this.player.stopPlayback();
        this.player.changeState(new ReadyStatee(this.player));
    }

    // Si es un doble clic, avanza a la siguiente canción; si no, hace un avance rápido de 5 segundos.
    public clickNext(): void {
        if (this.isDoubleClick()) {
            this.player.nextSong();
        } else {
            this.player.fastForward(5);
        }
    }

    // Si es un doble clic, retrocede a la canción anterior; si no, rebobina 5 segundos.
    public clickPrevious(): void {
        if (this.isDoubleClick()) {
            this.player.previousSong();
        } else {
            this.player.rewind(5);
        }
    }

    // Método auxiliar que simula la detección de un doble clic.
    private isDoubleClick(): boolean {
        // Aquí podrías agregar lógica real para detectar un doble clic.
        return Math.random() > 0.5;
    }
}

// Ejemplo de uso:

const player = new AudioPlayer();

// Simulamos algunas acciones en el reproductor:
player.clickPlay();     // Inicia la reproducción.
player.clickNext();     // Avanza a la siguiente canción o avanza 5 segundos.
player.clickLock();     // Bloquea el reproductor.
player.clickPlay();     // Intenta reproducir, pero está bloqueado.
player.clickLock();     // Desbloquea el reproductor.
player.clickPlay();     // Detiene la reproducción.
