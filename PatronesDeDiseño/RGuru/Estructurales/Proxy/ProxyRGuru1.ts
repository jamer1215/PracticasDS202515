// La interfaz de un servicio remoto.
interface ThirdPartyYouTubeLib {
    listVideos(): string[]; // Devuelve una lista de videos
    getVideoInfo(id: string): string; // Obtiene información de un video en específico
    downloadVideo(id: string): void; // Descarga el video dado un ID
}

// La implementación concreta de un conector de servicio. 
// Los métodos de esta clase simulan la interacción con YouTube.
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    listVideos(): string[] {
        // Envía una solicitud API a YouTube y obtiene una lista de videos.
        console.log("Solicitando lista de videos de YouTube...");
        return ["video1", "video2", "video3"];
    }

    getVideoInfo(id: string): string {
        // Obtiene metadatos de algún video de YouTube.
        console.log(`Obteniendo información del video con ID: ${id}`);
        return `Información del video ${id}`;
    }

    downloadVideo(id: string): void {
        // Descarga un archivo de video de YouTube.
        console.log(`Descargando video con ID: ${id}`);
    }
}

// Clase proxy que implementa la misma interfaz que ThirdPartyYouTubeClass
// y añade almacenamiento en caché para reducir solicitudes redundantes.
class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private service: ThirdPartyYouTubeLib;
    private listCache: string[] | null = null;
    private videoCache: { [key: string]: string } | null = null;// ejemplo:
    //  videoCache = {
    //     "video1": "Información del video 1",
    //     "video2": "Información del video 2"
    // };
    private needReset: boolean = false;

    constructor(service: ThirdPartyYouTubeLib) {
        this.service = service;
        this.videoCache = {};
    }

    // Si no hay caché o es necesario resetear, se solicita nuevamente la lista de videos.
    listVideos(): string[] {
        if (this.listCache === null || this.needReset) {
            console.log("Recuperando lista de videos del servicio.");
            this.listCache = this.service.listVideos();
        } else {
            console.log("Usando lista de videos desde la caché.");
        }
        return this.listCache;
    }

    // Si no hay caché o es necesario resetear, se solicita nuevamente la información del video.
    getVideoInfo(id: string): string {
        if (!this.videoCache![id] || this.needReset) {
            console.log(`Recuperando información del video ${id} del servicio.`);
            this.videoCache![id] = this.service.getVideoInfo(id);
        } else {
            console.log(`Usando información del video ${id} desde la caché.`);
        }
        return this.videoCache![id];
        // ! (Non-null Assertion Operator): Este es el operador de afirmación no nulo en TypeScript.
        //  Sirve para decirle al compilador que, aunque videoCache podría ser null 7
        // (como está declarado en private videoCache: { [key: string]: string } | null = null),
        //  en este punto del código estamos seguros de que no es null.
    }

    // Si no se encuentra el video descargado o es necesario resetear, se descarga el video.
    downloadVideo(id: string): void {
        // Método para verificar si el video ya ha sido descargado.
        const downloadExists = (id: string) => {
            console.log(`Verificando si el video ${id} ya está descargado.`);
            return false; // Aquí puedes implementar lógica para verificar la descarga.
        };

        if (!downloadExists(id) || this.needReset) {
            console.log(`Descargando video ${id} desde el servicio.`);
            this.service.downloadVideo(id);
        } else {
            console.log(`Video ${id} ya fue descargado.`);
        }
    }
}

// Clase que interactúa con el servicio o proxy para mostrar datos en la GUI.
class YouTubeManager {
    protected service: ThirdPartyYouTubeLib;

    constructor(service: ThirdPartyYouTubeLib) {
        this.service = service;
    }

    // Método para renderizar una página de video.
    renderVideoPage(id: string): void {
        const info = this.service.getVideoInfo(id);
        console.log(`Mostrando página de video: ${info}`);
    }

    // Método para renderizar una lista de videos en miniaturas.
    renderListPanel(): void {
        const list = this.service.listVideos();
        console.log("Mostrando lista de miniaturas de videos: ", list);
    }

    // Simula la interacción del usuario con la interfaz.
    reactOnUserInput(): void {
        this.renderVideoPage("video1");
        this.renderListPanel();
    }
}

// Clase principal que inicializa la aplicación.
class Application {
    init(): void {
        const aYouTubeService = new ThirdPartyYouTubeClass(); // Servicio original
        const aYouTubeProxy = new CachedYouTubeClass(aYouTubeService); // Proxy con caché
        const manager = new YouTubeManager(aYouTubeProxy); // Manager que usa el proxy
        manager.reactOnUserInput(); // Simula la interacción del usuario
    }
}

// Crear una instancia de la aplicación e iniciarla.
const app = new Application();
app.init();
