import { Optional } from "../../../Optional";

//! Definición de la interfaz IWidgetGe que establece los atributos de un WidgetGe
interface IWidgetGe {
    footerGe: boolean;   // Determina si el widget tiene pie de página (footer)
    headerGe: boolean;   // Determina si el widget tiene encabezado (header)
    comboGe: string[];   // Lista de elementos 'combo' asociados con el widget
}

//! Clase base WidgetGe que implementa IWidgetGe
class WidgetGe implements IWidgetGe {
    footerGe: boolean = false;   // Se inicializa sin footer por defecto
    headerGe: boolean = false;   // Se inicializa sin header por defecto
    comboGe: string[] = [];      // Se inicializa sin elementos en combo por defecto
    
    constructor() {}           // Constructor vacío, los valores se definen con el BuilderGe
}

//! Clase BuilderWidgetGe genérica para construir instancias de cualquier clase que extienda WidgetGe
class BuilderWidgetGe<T extends IWidgetGe> {
    constructor(
        private widgetGe: Optional<T>    // Se recibe una instancia de un objeto de tipo T - hereda WidgetGe
    ) {}

    addFooterGe(): BuilderWidgetGe<T> {
        if (this.widgetGe.hasValue()) {
            this.widgetGe.getValue().footerGe = true; // Activa el footer en el widget
        }
        return this;                      // Retorna el builder para continuar el encadenamiento
    }

    addHeaderGe(): BuilderWidgetGe<T> {
        if (this.widgetGe.hasValue()) {
            this.widgetGe.getValue().headerGe = true; // Activa el header en el widget
        }
        return this;
    }

    addComboGe(number: number): BuilderWidgetGe<T> {
        if (this.widgetGe.hasValue()) {
            // Agrega elementos "comboGe X" a la lista combo del widget
            for (let i = 0; i < number; i++) {
                this.widgetGe.getValue().comboGe.push(`comboGe ${i}`);
            }
        }
        return this;  // Retorna el builder para continuar el encadenamiento
    }

    buildGe(): T {
        if (!this.widgetGe.hasValue()) {
            throw new Error("WidgetGe no ha sido inicializado");
        }
        let wg = this.widgetGe.getValue(); // Obtiene la instancia actual de widgetGe
        this.widgetGe = new Optional<T>(); // Reinicia el builder con un Optional vacío
        return wg;                         // Retorna la instancia final construida
    }
}

//! Ejemplo de una subclase de WidgetGe que podría tener más atributos o métodos
class AdvancedWidgetGe extends WidgetGe {
    specialFeatureGe: string = "Característica especial de AdvancedWidgetGe";

    constructor() {
        super(); // Llama al constructor de la clase base WidgetGe
    }
}

// Uso de BuilderWidgetGe para crear una instancia de AdvancedWidgetGe
const advancedWidgetBuilderGe = new BuilderWidgetGe(new Optional(new AdvancedWidgetGe()));
const advancedWidgetGe = advancedWidgetBuilderGe
    .addComboGe(3)
    .addFooterGe()
    .addHeaderGe()
    .buildGe();

console.log(advancedWidgetGe);
