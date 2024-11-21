// Imagine a frontend developer tasked with creating a complex dashboard for a web application. The challenge is to allow users to customize their dashboard with various widgets such as charts, tables, and notifications. Each widget needs different settings such as data sources, display options, and refresh intervals. Managing all these options through a single constructor or multiple setters can become cumbersome and prone to mistakes.

import { Optional } from "../../../Optional"

// The Builder Pattern provides an elegant solution by using a DashboardBuilder class, developers can chain method calls to set properties for each widget, ensuring that all necessary configurations are applied before the dashboard is built. This approach not only makes the code more readable and maintainable but also allows for flexibility in creating different types of dashboards with varying complexities.

interface Widget {
    avaleable:boolean
}

class Chart implements Widget {
    elements: Widget[] = []; // Lista de widgets dentro del chart (relación de composición).

    constructor(public avaleable: boolean) {}

    addWidget(w: Widget) {
        this.elements.push(w); // Permite agregar widgets al chart.
    }
}

class Table implements Widget {
    elements: Widget[] = []; // Lista de widgets dentro de la table.

    constructor(public avaleable: boolean) {}

    addWidget(w: Widget) {
        this.elements.push(w); // Permite agregar widgets a la table.
    }
}

class Notification implements Widget{
    constructor(
    public avaleable: boolean
    ){}
}

class DashBoard implements Widget {
    charts: Map<string, Chart> = new Map<string, Chart>();
    tables: Map<string, Table> = new Map<string, Table>();

    constructor(public avaleable: boolean) {}

    addChartToTable(idChart: string, idTable: string): void {//Asocia un chart a una table específica.
        let chart = this.charts.get(idChart); // Busca el chart por ID.
        let table = this.tables.get(idTable); // Busca la table por ID.

        if (!chart || !table) return; // Si no existen, no hace nada.

        chart.addWidget(table); // Agrega la table al chart.
    }

    addChartToDashBoard(id: string, element: Chart) {
        this.charts.set(id, element); // Agrega un chart al dashboard.
    }

    addTableToDashBoard(id: string, element: Table) {
        this.tables.set(id, element); // Agrega una table al dashboard.
    }

    findChartById(id: string): Optional<Widget> {
        return new Optional(this.charts.get(id)); // Retorna el chart envuelto en un `Optional`.
    }

    findTablesById(id: string): Optional<Widget> {
        return new Optional(this.tables.get(id)); // Retorna la table envuelta en un `Optional`.
    }
}

//Builder

interface Builder <T>{
    element:T
    clear():void
    getResult():T//metodo build
}

class DashBoardBuilder implements Builder<DashBoard> {
    element: DashBoard;

    constructor() {
        this.element = new DashBoard(true); // Crea un dashboard vacío.
    }

    clear(): void {
        this.element = new DashBoard(true); // Resetea el dashboard.
    }

    getResult(): DashBoard {//Método build()
        let result = this.element;
        this.clear(); // Limpia el builder después de construir.
        return result;
    }

    addChartToDashBoard(id: string): DashBoardBuilder {
        this.element.addChartToDashBoard(id, new Chart(true));
        return this;
    }

    addTableToDashBoard(id: string): DashBoardBuilder {
        this.element.addTableToDashBoard(id, new Table(true));
        return this;
    }

    addChartToTable(idTable: string, idChart: string): DashBoardBuilder {
        this.element.addChartToTable(idChart, idTable);
        return this;
    }
}


//implementacion

let dashboard=new DashBoardBuilder()
    .addChartToDashBoard('1')
    .addChartToDashBoard('2')
    .addChartToDashBoard('3')
    .addChartToDashBoard('4')
    .addTableToDashBoard('1')
    .addChartToTable('1','1')
    .getResult()

console.log(dashboard)