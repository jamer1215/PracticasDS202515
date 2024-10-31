// La interfaz Mediator declara un método utilizado por los
// componentes para notificar al mediador sobre varios eventos.
// El mediador puede reaccionar a estos eventos y pasar la
// ejecución a otros componentes.
interface MediatorMe1 {
    notify(sender: ComponentMe1, event: string): void;
}

// La clase concreta Mediator. La red entrecruzada de
// conexiones entre componentes individuales se ha desenredado y
// se ha colocado dentro del mediador.
class AuthenticationDialogMe1 implements MediatorMe1 {
    public title: string; // Título del diálogo
    public loginOrRegisterChkBx: CheckboxMe1; // Checkbox para seleccionar entre login o registro
    public loginUsername: TextboxMe1; // Campo de texto para el nombre de usuario de inicio de sesión
    public loginPassword: TextboxMe1; // Campo de texto para la contraseña de inicio de sesión
    public registrationUsername: TextboxMe1; // Campo de texto para el nombre de usuario de registro
    public registrationPassword: TextboxMe1; // Campo de texto para la contraseña de registro
    public registrationEmail: TextboxMe1; // Campo de texto para el correo electrónico de registro
    public okBtn: ButtonMe1; // Botón para confirmar la acción
    public cancelBtn: ButtonMe1; // Botón para cancelar la acción

    constructor() {
        // Crea todos los objetos del componente y pasa el
        // mediador actual a sus constructores para establecer
        // vínculos.
        
        this.title = "Log in"; // Inicializa el título del diálogo
        this.loginOrRegisterChkBx = new CheckboxMe1(this);
        this.loginUsername = new TextboxMe1(this);
        this.loginPassword = new TextboxMe1(this);
        this.registrationUsername = new TextboxMe1(this);
        this.registrationPassword = new TextboxMe1(this);
        this.registrationEmail = new TextboxMe1(this);
        this.okBtn = new ButtonMe1(this);
        this.cancelBtn = new ButtonMe1(this);
    }

    // Cuando sucede algo con un componente, notifica al
    // mediador, que al recibir la notificación, puede hacer
    // algo por su cuenta o pasar la solicitud a otro
    // componente.
    public notify(sender: ComponentMe1, event: string): void {
        if (sender === this.loginOrRegisterChkBx && event === "check") {
            if (this.loginOrRegisterChkBx.checked) {
                this.title = "Log in";
                // 1. Muestra los componentes del formulario de
                // inicio de sesión.
                // 2. Esconde los componentes del formulario de
                // registro.
            } else {
                this.title = "Register";
                // 1. Muestra los componentes del formulario de
                // registro.
                // 2. Esconde los componentes del formulario de
                // inicio de sesión.
            }
        }

        if (sender === this.okBtn && event === "click") {
            if (this.loginOrRegisterChkBx.checked) {
                // Intenta encontrar un usuario utilizando las
                // credenciales de inicio de sesión.
                const found = false; // Placeholder para la lógica de búsqueda
                if (!found) {
                    // Muestra un mensaje de error sobre el
                    // campo de inicio de sesión.
                    console.log("Error mi pana en el campo de inicio de sesión - not found")
                }
            } else {
                // 1. Crea una cuenta de usuario utilizando
                // información de los campos de registro.
                // 2. Ingresa a ese usuario.
                // ...
                console.log("Creando usuario con la info de los campos de registro - yes found")
            }
        }
    }
}

// Los componentes se comunican con un mediador utilizando la
// interfaz mediadora. Gracias a ello, puedes utilizar los
// mismos componentes en otros contextos vinculándolos con
// diferentes objetos mediadores.
class ComponentMe1 {
    protected dialog: MediatorMe1; // Mediador que gestiona la comunicación

    constructor(dialog: MediatorMe1) {
        this.dialog = dialog; // Establece el mediador
    }

    public click(): void {
        this.dialog.notify(this, "click"); // Notifica al mediador sobre un clic
    }

    public keypress(): void {
        this.dialog.notify(this, "keypress"); // Notifica al mediador sobre una pulsación de tecla
    }
}

// Los componentes concretos no hablan entre sí. Sólo tienen un
// canal de comunicación, que es el envío de notificaciones al
// mediador.
class ButtonMe1 extends ComponentMe1 {
    constructor(dialog: MediatorMe1) {
        super(dialog);
    }
}

class TextboxMe1 extends ComponentMe1 {
    constructor(dialog: MediatorMe1) {
        super(dialog);
    }
}

class CheckboxMe1 extends ComponentMe1 {
    public checked: boolean; // Propiedad para indicar si el checkbox está marcado

    constructor(dialog: MediatorMe1) {
        super(dialog);
        this.checked = false; // Inicializa el estado del checkbox
    }

    public check(): void {
        this.checked = !this.checked; // Alterna el estado del checkbox
        this.dialog.notify(this, "check"); // Notifica al mediador sobre un cambio en el checkbox
    }
}

// Crear instancias para probar el comportamiento del código
function testCases() {
    // Caso de Prueba 1: Verificar el cambio de título al marcar el checkbox
    console.log("Caso de Prueba 1: Verificar el cambio de título al marcar el checkbox");
    const authDialog = new AuthenticationDialogMe1();
    authDialog.loginOrRegisterChkBx.check(); // Alternar el estado del checkbox
    authDialog.notify(authDialog.loginOrRegisterChkBx, "check");
    console.log(`Título esperado: "Register"`);
    console.log(`Título actual: "${authDialog['title']}"`);
    console.log("---------------------------------------------------");

    // Caso de Prueba 2: Intentar iniciar sesión con credenciales incorrectas
    console.log("Caso de Prueba 2: Intentar iniciar sesión con credenciales incorrectas");
    authDialog.loginOrRegisterChkBx.checked = true; // Asegurarse de que el checkbox esté en "Log in"
    authDialog.notify(authDialog.okBtn, "click");
    console.log(`Se esperaba un mensaje de error: No se encontró el usuario`);
    // Como el código no tiene lógica de búsqueda real, se simula el comportamiento
    console.log("---------------------------------------------------");

    // Caso de Prueba 3: Verificar el alternar del estado del checkbox
    console.log("Caso de Prueba 3: Alternar el estado del checkbox");
    const checkbox = new CheckboxMe1(authDialog);
    console.log(`Estado inicial: ${checkbox.checked ? "Marcado" : "No marcado"}`);
    checkbox.check();
    console.log(`Estado después de un toggle: ${checkbox.checked ? "Marcado" : "No marcado"}`);
    checkbox.check();
    console.log(`Estado después de dos toggles: ${checkbox.checked ? "Marcado" : "No marcado"}`);
    console.log("---------------------------------------------------");

    // Caso de Prueba 4: Verificar la notificación del mediador al hacer clic en un botón
    console.log("Caso de Prueba 4: Notificar al mediador desde el botón");
    const button = new ButtonMe1(authDialog);
    console.log("Se espera que el mediador reciba una notificación al hacer clic en el botón.");
    button.click(); // Debe notificar al mediador
    console.log("---------------------------------------------------");
}

// Ejecutar los casos de prueba
testCases();
