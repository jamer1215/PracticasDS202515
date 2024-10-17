// Clase RoundHole (HoyoRedondo) con un método para verificar si una pieza encaja.
class RoundHole {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    // Devuelve el radio del agujero.
    getRadius(): number {
        return this.radius;
    }

    // Verifica si una pieza redonda encaja en el agujero.
    fits(peg: RoundPeg): boolean {
        return this.getRadius() >= peg.getRadius();
    }
}

// Clase RoundPeg (PiezaRedonda) con un método para obtener el radio.
class RoundPeg {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    // Devuelve el radio de la pieza.
    getRadius(): number {
        return this.radius;
    }
}

// Clase SquarePeg (PiezaCuadrada) que tiene un método para obtener la anchura.
class SquarePeg {
    private width: number;

    constructor(width: number) {
        this.width = width;
    }

    // Devuelve la anchura de la pieza cuadrada.
    getWidth(): number {
        return this.width;
    }
}

// Clase adaptadora que permite encajar piezas cuadradas en hoyos redondos.
// Extiende RoundPeg para que pueda actuar como una pieza redonda.
class SquarePegAdapter extends RoundPeg {
    private peg: SquarePeg;

    constructor(peg: SquarePeg) {
        // Llama al constructor de la clase base con un valor calculado para el radio.
        super(peg.getWidth() * Math.sqrt(2) / 2);
        this.peg = peg;
    }

    // El adaptador simula que es una pieza redonda con un radio equivalente.
    getRadius(): number {
        return this.peg.getWidth() * Math.sqrt(2) / 2;
    }
}

// Pruebas del código cliente.
const hole = new RoundHole(5);
const rpeg = new RoundPeg(5);
console.log(hole.fits(rpeg)); // verdadero, la pieza redonda encaja

const smallSqPeg = new SquarePeg(5);
const largeSqPeg = new SquarePeg(10);

// hole.fits(smallSqPeg); // Esto no compilará, ya que los tipos son incompatibles

// Usamos el adaptador para que la pieza cuadrada encaje en el hoyo redondo.
const smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
const largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);

console.log(hole.fits(smallSqPegAdapter)); // verdadero, la pieza cuadrada pequeña adaptada encaja
console.log(hole.fits(largeSqPegAdapter)); // falso, la pieza cuadrada grande adaptada no encaja
