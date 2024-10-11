// La interfaz de colección debe declarar un método fábrica para
// producir iteradores. Puedes declarar varios métodos si hay
// distintos tipos de iteración disponibles en tu programa.
interface SocialNetwork {
    // Crea un iterador para los amigos de un perfil.
    createFriendsIterator(profileId: string): ProfileIterator;

    // Crea un iterador para los compañeros de trabajo de un perfil.
    createCoworkersIterator(profileId: string): ProfileIterator;
}

// Cada colección concreta está acoplada a un grupo de clases
// iteradoras concretas que devuelve, pero el cliente no lo
// está, ya que la firma de estos métodos devuelve interfaces
// iteradoras.
class Facebook implements SocialNetwork {
    // Implementa la creación de un iterador para los amigos.
    createFriendsIterator(profileId: string): ProfileIterator {
        return new FacebookIterator(this, profileId, "friends");
    }

    // Implementa la creación de un iterador para los compañeros de trabajo.
    createCoworkersIterator(profileId: string): ProfileIterator {
        return new FacebookIterator(this, profileId, "coworkers");
    }

    // Este método simula una petición de red para obtener perfiles sociales.
    socialGraphRequest(profileId: string, type: string): Profile[] {
        // Simulación de datos de perfil obtenidos desde la red.
        return [];
    }
}

// La interfaz común a todos los iteradores.
interface ProfileIterator {
    // Devuelve el siguiente perfil de la colección.
    getNext(): Profile;

    // Verifica si aún hay más elementos que iterar.
    hasMore(): boolean;
}

// La clase iteradora concreta.
class FacebookIterator implements ProfileIterator {
    private facebook: Facebook; // Referencia a la colección de Facebook.
    private profileId: string;  // El ID del perfil base para la iteración.
    private type: string;       // El tipo de iteración (amigos o compañeros).
    private currentPosition: number = 0; // Posición actual en la iteración.
    private cache: Profile[] | null = null; // Cache de los perfiles cargados.

    constructor(facebook: Facebook, profileId: string, type: string) {
        this.facebook = facebook;
        this.profileId = profileId;
        this.type = type;
    }

    // Inicializa la cache si aún no se ha cargado.
    private lazyInit() {
        if (this.cache === null) {
            this.cache = this.facebook.socialGraphRequest(this.profileId, this.type);
        }
    }

    // Devuelve el siguiente perfil en la lista si existe.
    getNext(): Profile {
        if (this.hasMore()) {
            const result = this.cache![this.currentPosition]; // Obtiene el perfil actual.
            this.currentPosition++; // Avanza la posición del iterador.
            return result;
        }
        throw new Error("No hay más elementos en la iteración.");
    }

    // Verifica si hay más elementos en la lista.
    hasMore(): boolean {
        this.lazyInit(); // Inicializa si es necesario.
        return this.currentPosition < this.cache!.length; // Comprueba si quedan elementos.
    }
}

// Definición de la clase `Profile` para ilustrar el uso de perfiles.
class Profile {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    getId(): string {
        return "some-id";
    }
}

// Aquí tienes otro truco útil: puedes pasar un iterador a una
// clase cliente en lugar de darle acceso a una colección
// completa. De esta forma, no expones la colección al cliente.
//
// Y hay otra ventaja: puedes cambiar la forma en la que el
// cliente trabaja con la colección durante el tiempo de
// ejecución pasándole un iterador diferente. Esto es posible
// porque el código cliente no está acoplado a clases iteradoras
// concretas.
class SocialSpammer {
    // Envía un mensaje de spam utilizando un iterador.
    send(iterator: ProfileIterator, message: string) {
        while (iterator.hasMore()) {
            const profile = iterator.getNext();
            console.log(`Enviando mensaje a: ${profile.getEmail()}`);
            // Aquí se enviaría el correo electrónico real.
        }
    }
}

// La clase Aplicación configura colecciones e iteradores y
// después los pasa al código cliente.
class Application {
    private network: SocialNetwork; // Referencia a la red social.
    private spammer: SocialSpammer; // Instancia del spammer.

    // Configura la aplicación dependiendo de la red social que se use.
    config() {
        // En este ejemplo, se selecciona Facebook o LinkedIn según el entorno.
        const workingWithFacebook = true;

        if (workingWithFacebook) {
            this.network = new Facebook();
        } else {
            this.network = new Facebook(); // Aquí debería ir una clase LinkedIn.
        }

        this.spammer = new SocialSpammer();
    }

    // Enviar spam a los amigos de un perfil.
    sendSpamToFriends(profile: Profile) {
        const iterator = this.network.createFriendsIterator(profile.getId());
        this.spammer.send(iterator, "Mensaje muy importante a tus amigos");
    }

    // Enviar spam a los compañeros de trabajo de un perfil.
    sendSpamToCoworkers(profile: Profile) {
        const iterator = this.network.createCoworkersIterator(profile.getId());
        this.spammer.send(iterator, "Mensaje muy importante a tus compañeros");
    }
}

// Ejecución de ejemplo
const app = new Application();
app.config();
const profile = new Profile("test@example.com");
app.sendSpamToFriends(profile);
app.sendSpamToCoworkers(profile);
