// Define a Prototype interface with a clone method
interface Prototype<T> {
    clone(): T;
}

// Create a concrete class that implements the Prototype interface
class ConcretePrototype implements Prototype<ConcretePrototype> {
    public field: string;

    constructor(field: string) {
        this.field = field;
    }

    // Implement the clone method
    public clone(): ConcretePrototype {
        return new ConcretePrototype(this.field);
    }
}

// Usage example
const original = new ConcretePrototype("Original");
const copy = original.clone();

console.log(original.field); // Output: Original
console.log(copy.field);