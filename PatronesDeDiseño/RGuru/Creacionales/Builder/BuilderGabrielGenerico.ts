// Definimos una interfaz genérica para el ProductoGa
interface ProductGa<T> {
    partsGa: T[];
    addGa(partGa: T): void;
    showGa(): string;
}

// Implementación del ProductoGa
class ConcreteProductGa<T> implements ProductGa<T> {
    partsGa: T[] = [];

    addGa(partGa: T): void {
        this.partsGa.push(partGa);
    }

    showGa(): string {
        return this.partsGa.join(', ');
    }
}

// Definimos un BuilderGa genérico
interface BuilderGa<T> {
    createProductGa(): ProductGa<T>;
    buildPartAGa(productGa: ProductGa<T>): void;
    buildPartBGa(productGa: ProductGa<T>): void;
}

// Implementación del BuilderGa
class ConcreteBuilderGa<T> implements BuilderGa<T> {
    createProductGa(): ProductGa<T> {
        return new ConcreteProductGa<T>();
    }

    buildPartAGa(productGa: ProductGa<T>): void {
        productGa.addGa("Parte A" as T);
    }

    buildPartBGa(productGa: ProductGa<T>): void {
        productGa.addGa("Parte B" as T);
    }
}

// DirectorGa que utiliza el BuilderGa
class DirectorGa<T> {
    constructor(private builderGa: BuilderGa<T>) {}

    constructGa(): ProductGa<T> {
        const productGa = this.builderGa.createProductGa();
        this.builderGa.buildPartAGa(productGa);
        this.builderGa.buildPartBGa(productGa);
        return productGa;
    }
}

// Uso
const builderGa = new ConcreteBuilderGa<string>(); // Especificamos que el producto contendrá cadenas
const directorGa = new DirectorGa(builderGa);
const productGa = directorGa.constructGa();
console.log(productGa.showGa()); // 'Parte A, Parte B'
