// Clase abstracta Product
abstract class ProductTS {
    abstract accept(v: VisitorTS): any;
}

// Clase Item que representa un producto con un precio
class ItemTS extends ProductTS {
    constructor(public price: number) {
        super();
    }

    accept(v: VisitorTS): any {
        return v.visitItem(this);
    }
}

// Clase Candy que extiende de Item
class CandyTS extends ItemTS {
    constructor(price: number) {
        super(price);
    }
}

// Clase Vegetable que extiende de Item
class VegetableTS extends ItemTS {
    constructor(price: number) {
        super(price);
    }
}

// Clase Package que contiene una lista de productos
class PackageTS extends ProductTS {
    public products: ProductTS[] = [];

    add(p: ProductTS): void {
        this.products.push(p);
    }

    accept(v: VisitorTS): any {
        const results: any[] = [];
        for (const product of this.products) {
            results.push(product.accept(v));
        }
        return v.visitPackage(this, results);
    }
}

// Clase abstracta Visitor
abstract class VisitorTS {
    abstract visitPackage(p: PackageTS, results: any[]): any;
    abstract visitItem(p: ItemTS): any;
    abstract visitCandy(p: CandyTS): any;
    abstract visitVegetable(p: VegetableTS): any;
}

// Clase CheaperVisitor que encuentra el ítem más barato
class CheaperVisitorTS extends VisitorTS {
    visitPackage(p: PackageTS, results: any[]): ItemTS | null {
        let minPrice = Infinity;
        let cheapestItem: ItemTS | null = null;

        for (const result of results) {
            const item = result as ItemTS;
            if (item.price < minPrice) {
                minPrice = item.price;
                cheapestItem = item;
            }
        }

        return cheapestItem;
    }

    visitItem(p: ItemTS): ItemTS {
        return p;
    }

    visitCandy(p: CandyTS): ItemTS {
        return p;
    }

    visitVegetable(p: VegetableTS): ItemTS {
        return p;
    }
}

// Clase principal para probar el patrón Visitor
class PruebaVisitorTS {
    public static main(): void {
        const c1 = new CandyTS(10);
        const c2 = new CandyTS(5);
        const c3 = new CandyTS(3);
        const candies = new PackageTS();
        candies.add(c1);
        candies.add(c2);
        candies.add(c3);

        const v1 = new VegetableTS(100);
        const p1 = new PackageTS();
        p1.add(candies);
        p1.add(v1);

        const cheaperVisitor = new CheaperVisitorTS();
        const it = p1.accept(cheaperVisitor) as ItemTS;

        console.log(`El precio del ítem más barato es: ${it.price}`);
    }
}

// Ejecutar el código de prueba
PruebaVisitorTS.main();
