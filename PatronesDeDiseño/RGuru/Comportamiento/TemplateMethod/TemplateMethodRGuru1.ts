// La clase abstracta define un método plantilla que contiene el esqueleto 
// de un algoritmo compuesto por llamadas, normalmente a operaciones primitivas abstractas. 
// Las subclases concretas implementan estas operaciones, pero dejan el propio método plantilla intacto.
abstract class GameAI {

    // El método plantilla define el esqueleto de un algoritmo. 
    // Este método asegura que cada turno del juego siga una secuencia específica.
    public turn(): void {
        this.collectResources();  // Recolecta recursos antes de construir estructuras o unidades.
        this.buildStructures();    // Llama al método para construir estructuras específicas del tipo de jugador.
        this.buildUnits();         // Llama al método para construir unidades específicas del tipo de jugador.
        this.attack();             // Ejecuta la lógica de ataque.
    }

    // Algunos de los pasos se pueden implementar directamente en la clase base. 
    // Aquí se define una lógica por defecto para la recolección de recursos.
    public collectResources(): void {
        // En un juego, las estructuras construidas por el jugador recopilan recursos.
        for (const s of this.buildStructures()) {
            s.collect(); // Recolecta recursos de cada estructura.
        }
    }

    // Algunos pasos del algoritmo se definen como abstractos, para que las subclases los implementen.
    // Cada tipo de jugador (Orcos, Monstruos, etc.) puede construir estructuras de manera diferente.
    abstract buildStructures(): Structure[];

    // El mismo principio se aplica a la construcción de unidades.
    abstract buildUnits(): void;

    // El ataque también sigue un método plantilla, donde primero se verifica la existencia de un enemigo cercano.
    // Si no hay enemigos cerca, se envían exploradores. De lo contrario, se envían guerreros.
    public attack(): void {
        const enemy = this.closestEnemy(); // Verifica si hay un enemigo cercano.
        if (enemy === null) {
            this.sendScouts(this.mapCenter()); // Si no hay enemigos, enviamos exploradores al centro del mapa.
        } else {
            this.sendWarriors(enemy.position); // Si hay un enemigo, enviamos guerreros a su posición.
        }
    }

    // Métodos abstractos que cada subclase concreta debe implementar, 
    // definiendo cómo se enviarán los exploradores y guerreros.
    abstract sendScouts(position: string): void;
    abstract sendWarriors(position: string): void;

    // Métodos adicionales que podrían estar definidos en esta clase abstracta
    // dependiendo del juego, como la detección de enemigos o la obtención del centro del mapa.
    abstract closestEnemy(): any;
    abstract mapCenter(): string;

    // Un campo opcional que representaría las estructuras construidas por la IA.
    // En este caso, para mantener la simplicidad del ejemplo, lo dejamos comentado.
    // protected builtStructures: Structure[]; // Asumimos que esta lista de estructuras está definida.
}

// Las clases concretas deben implementar todas las operaciones abstractas de la clase base, 
// pero no deben sobrescribir el propio método plantilla.
class OrcsAI extends GameAI {

    // Implementación de cómo los Orcos construyen sus estructuras.
    public buildStructures(): Structure[] {
        if (this.haveResources()) {
            console.log('Orcos construyen: Granjas, Cuarteles y Fortaleza');
            // Lógica para construir estructuras en orden.
            return [new Structure('Granja'), new Structure('Cuartel'), new Structure('Fortaleza')]; // Retorna estructuras construidas.
        }
        return []; // Si no hay recursos, retorna un array vacío.
    }

    // Implementación de cómo los Orcos construyen sus unidades.
    public buildUnits(): void {
        if (this.havePlentyResources()) {
            if (this.noScouts()) {
                console.log('Orcos crean peón para exploración');
                // Lógica para crear peones exploradores.
            } else {
                console.log('Orcos crean soldado para combate');
                // Lógica para crear soldados guerreros.
            }
        }
    }

    // Implementación de cómo los Orcos envían exploradores a una posición específica.
    public sendScouts(position: string): void {
        if (this.scouts.length > 0) {
            console.log(`Orcos envían exploradores a ${position}`);
            // Lógica para enviar exploradores.
        }
    }

    // Implementación de cómo los Orcos envían guerreros a una posición.
    public sendWarriors(position: string): void {
        if (this.warriors.length > 5) {
            console.log(`Orcos envían guerreros a ${position}`);
            // Lógica para enviar guerreros.
        }
    }

    // Métodos adicionales que simulan tener recursos, exploradores, guerreros, etc.
    private haveResources(): boolean {
        return true; // Simulación de tener recursos.
    }

    private havePlentyResources(): boolean {
        return true; // Simulación de tener muchos recursos.
    }

    private noScouts(): boolean {
        return this.scouts.length === 0; // Verifica si no hay exploradores.
    }

    // Simulamos las listas de exploradores y guerreros.
    private scouts = [];
    private warriors = [];

    // Implementación de métodos abstractos adicionales para detectar enemigos y obtener el centro del mapa.
    public closestEnemy(): any {
        return null; // Supongamos que no hay enemigos cercanos en este ejemplo.
    }

    public mapCenter(): string {
        return "Centro del mapa"; // Retorna una cadena que representa el centro del mapa.
    }
}

// Las subclases también pueden sobrescribir algunas operaciones con una implementación por defecto.
class MonstersAI extends GameAI {

    // Los monstruos no recolectan recursos, por lo que sobrescribimos este método con una implementación vacía.
    public collectResources(): void {
        console.log('Los monstruos no recopilan recursos.');
    }

    // Los monstruos no construyen estructuras.
    public buildStructures(): void {
        console.log('Los monstruos no construyen estructuras.');
    }

    // Los monstruos no crean unidades.
    public buildUnits(): void {
        console.log('Los monstruos no crean unidades.');
    }

    // Implementación de cómo los monstruos envían exploradores (si lo hicieran).
    public sendScouts(position: string): void {
        console.log(`Los monstruos envían exploradores a ${position}`);
    }

    // Implementación de cómo los monstruos envían guerreros.
    public sendWarriors(position: string): void {
        console.log(`Los monstruos envían guerreros a ${position}`);
    }

    public closestEnemy(): any {
        return null; // Supongamos que no hay enemigos cercanos.
    }

    public mapCenter(): string {
        return "Centro del mapa"; // Retorna una cadena que representa el centro del mapa.
    }
}

// Pruebas del código:

// Creamos instancias de OrcsAI y MonstersAI.
const orcAI = new OrcsAI();
orcAI.turn(); // Simula un turno de los Orcos, ejecutando la secuencia de acciones.

const monsterAI = new MonstersAI();
monsterAI.turn(); // Simula un turno de los Monstruos, ejecutando la secuencia de acciones.
