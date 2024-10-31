/**
 * La clase RoundHole representa un agujero redondo que puede contener
 * piezas redondas. Proporciona métodos para obtener el radio del agujero
 * y verificar si una pieza redonda puede encajar en él.
 */
class RoundHole {
    private radius: number; // Almacena el radio del agujero redondo.

    constructor(radius: number) {
        this.radius = radius; // Inicializa el radio del agujero con el valor proporcionado.
    }

    /**
     * Devuelve el radio del agujero.
     */
    public getRadius(): number {
        return this.radius; // Retorna el radio del agujero.
    }

    /**
     * Verifica si la pieza redonda (peg) puede encajar en el agujero.
     * @param peg - La pieza redonda que se quiere insertar.
     * @returns true si la pieza encaja, false en caso contrario.
     */
    public fits(peg: RoundPeg): boolean {
        return this.getRadius() >= peg.getRadius(); // Compara el radio del agujero con el de la pieza.
    }
}

/**
 * La clase RoundPeg representa una pieza redonda. Proporciona métodos
 * para obtener su radio.
 */
class RoundPeg {
    private radius: number; // Almacena el radio de la pieza redonda.

    constructor(radius: number) {
        this.radius = radius; // Inicializa el radio de la pieza redonda.
    }

    /**
     * Devuelve el radio de la pieza.
     */
    public getRadius(): number {
        return this.radius; // Retorna el radio de la pieza redonda.
    }
}

/**
 * La clase SquarePeg representa una pieza cuadrada. Proporciona métodos
 * para obtener su anchura.
 */
class SquarePeg {
    private width: number; // Almacena la anchura de la pieza cuadrada.

    constructor(width: number) {
        this.width = width; // Inicializa la anchura de la pieza cuadrada.
    }

    /**
     * Devuelve la anchura de la pieza cuadrada.
     */
    public getWidth(): number {
        return this.width; // Retorna la anchura de la pieza cuadrada.
    }
}

/**
 * La clase SquarePegAdapter actúa como un adaptador que permite
 * a las piezas cuadradas encajar en los agujeros redondos. 
 * Extiende la clase RoundPeg para poder ser tratada como una pieza redonda.
 */
class SquarePegAdapter extends RoundPeg {
    private peg: SquarePeg; // Contiene una instancia de la clase SquarePeg.

    constructor(peg: SquarePeg) {
        super(peg.getWidth() * Math.sqrt(2) / 2); // Calcula el "radio" del adaptador usando la anchura de la pieza cuadrada.
        this.peg = peg; // Inicializa el adaptador con la pieza cuadrada proporcionada.
    }

    /**
     * Simula que es una pieza redonda, devolviendo un "radio" que
     * puede albergar la pieza cuadrada que el adaptador envuelve.
     */
    public getRadius(): number {
        return this.peg.getWidth() * Math.sqrt(2) / 2; // Calcula el radio efectivo de la pieza cuadrada.
    }
}

// Código cliente que utiliza las clases definidas arriba.
const hole = new RoundHole(5); // Crea un agujero redondo con un radio de 5.
const rpeg = new RoundPeg(5); // Crea una pieza redonda con un radio de 5.
console.log(hole.fits(rpeg)); // Muestra 'true' porque la pieza redonda encaja en el agujero.

const small_sqpeg = new SquarePeg(5); // Crea una pieza cuadrada con una anchura de 5.
const large_sqpeg = new SquarePeg(10); // Crea una pieza cuadrada con una anchura de 10.
// hole.fits(small_sqpeg); // Esto no compila (tipos incompatibles), porque 'small_sqpeg' no es una instancia de 'RoundPeg'.

const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg); // Crea un adaptador para la pieza cuadrada pequeña.
const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg); // Crea un adaptador para la pieza cuadrada grande.
console.log(hole.fits(small_sqpeg_adapter)); // Muestra 'true' porque el adaptador permite que la pieza cuadrada encaje.
console.log(hole.fits(large_sqpeg_adapter)); // Muestra 'false' porque el adaptador de la pieza cuadrada grande no encaja.
