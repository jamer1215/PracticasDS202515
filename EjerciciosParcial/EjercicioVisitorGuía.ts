// Tarea 1) (4 puntos) Aplicar el patron Visitor2 para desarrollar la funcionalidad de encontrar el Item
// mas barato en un producto Product. 

import { Optional } from "../PatronesDeDiseño/Optional";

// 2) (4 puntos) Aplicando de nuevo el patron Visitor, desarrollar un nuevo visitador que se
// encargue de decrementar el precio de todos los vegetales en un producto con x unidades de
// vegetales.

interface VisitorVE{
    visitItem(i:ItemVE):void
    visitPaquete(pa:PaqueteVE):void
    visitCandy(ca:CandyVE):void
    visitVegetable(ve:VegetableVE):void

}

abstract class ProductVE{
    abstract accept(v:VisitorVE):void;
}

class PaqueteVE extends ProductVE{
    
    constructor (public productos:ProductVE[]){
        super();
        this.productos=productos;
    }
    accept(v: VisitorVE): void {//por qué en RGuru devuelve un void? Y en la sol. es Object?
       return v.visitPaquete(this);
    }

    addProducts(p:ProductVE):void{

        this.productos.push(p);

    }


    
}

class ItemVE extends ProductVE{
    
    constructor (public price:number){
        super();
        this.price=price;
    }
    accept(v: VisitorVE): void {//por qué en RGuru devuelve un void? Y en la sol. es Object?
       return v.visitItem(this);
    }


    
}



class CandyVE extends ItemVE{

    constructor(price:number){
        super(price);
    }
    
        //innecesario hacerlo porque por polimorfismo de subtipos es aceptable de la clase padre

    // accept(v:VisitorVE):void{

    //     v.visitCandy(this)

    // }
    
}

class VegetableVE extends ItemVE{
    constructor(price:number){
        super(price);
    }

    //innecesario hacerlo porque por polimorfismo de subtipos es aceptable de la clase padre

    // accept(v:VisitorVE):void{

    //     v.visitVegetable(this)

    // }
}

//EL VISITOR que busca el mas baratp:

class ProductsVisitor implements VisitorVE{

    //se inicializa en null
    private masBarato: Optional<ItemVE>=new Optional();//esto es lo que retornaré


    //a estos dos como la vaina es un visitor de obtener el más barato, lo mandamos pal item
    //imaginate un product con numerosos elementos como candys, vegetables (que son items pues)
    visitCandy(ca: CandyVE) {
        this.visitItem(ca)
    }
    visitVegetable(ve: VegetableVE) {
        this.visitItem(ve)
    }



    visitItem(i: ItemVE){

        // Si aún no hemos encontrado un ítem más barato (===null) o el ítem actual tiene un precio más bajo que masBarato
        if(!this.masBarato.hasValue()|| i.price < this.masBarato.getValue().price){

            this.masBarato=new Optional(i);



        }


        

    }


    visitPaquete(pa: PaqueteVE) {

        //vamos a aplicar el visit a todos los productos del paquete
        // y de ahi localizamos el más baratoooo
        for (let pro of pa.productos){
            pro.accept(this)
        }




    }

    getMasBarato():Optional<ItemVE>{
        return this.masBarato;
    }

}

//(4 puntos) Aplicando de nuevo el patron Visitor, desarrollar un nuevo visitador que se
// encargue de decrementar el precio de todos los vegetales en un producto con x unidades de
// vegetales.

class VegetalVisitor implements VisitorVE{

    private vegetalesDecrementados: VegetableVE[]= []

    constructor(public x: number, public porcentajeDescuento:number){
        this.x=x;
        this.porcentajeDescuento=porcentajeDescuento;
    }
    // private x: number;//unidad mínima - x, producto con x vegetales
    // private porcentajeDescuento: number;

    //"si"
    visitItem(i: ItemVE): void {

        this.visitVegetable;

        
        
    }

    //si
    visitPaquete(pa: PaqueteVE): void {

        const vegetalesArray = pa.productos.filter(pro=>pro instanceof VegetableVE);

        for (let ve of vegetalesArray){
            if(this.x>=vegetalesArray.length){
                //ve.accept(this);
                this.visitVegetable(ve)
                this.vegetalesDecrementados.push(ve)
            }
        }
        
    }
    //no
    visitCandy(ca: CandyVE): void {
        
    }

    //si
    visitVegetable(ve: VegetableVE): void {

        //al vegetal que paso por parámetro le decremento su precio en un N%
        ve.price=ve.price-(ve.price*this.porcentajeDescuento)/100


        
    }
    
    getVegetalesDecrementados():VegetableVE[]{
        return this.vegetalesDecrementados;
    }
    
}



// A probar esta mondá

const c1 = new CandyVE(10);
const c2 = new CandyVE(5);
const c3 = new CandyVE(3);
const v1 = new VegetableVE(8);
const fuego = new VegetableVE(1)
const vegetable2 = new VegetableVE(88);

const paquete = new PaqueteVE([c1, c2, c3, v1,fuego]);

const visitor = new ProductsVisitor();
paquete.accept(visitor); // Empezamos el recorrido visitando el paquete

const masBarato = visitor.getMasBarato();

    console.log(`El ítem más barato tiene un precio de: ${masBarato.getValue().price}`);


//(4 puntos) Aplicando de nuevo el patron Visitor, desarrollar un nuevo visitador que se
// encargue de decrementar el precio de todos los vegetales en un producto con x unidades de
// vegetales.
const visitorVege = new VegetalVisitor(8,50)
paquete.accept(visitorVege)

const vegetDecr=visitorVege.getVegetalesDecrementados();

console.log(`Array de los vegetales procesados:`);
vegetDecr.forEach(vegetal => {
    console.log(`Vegetal con precio decremetado: ${vegetal.price}`);
});

