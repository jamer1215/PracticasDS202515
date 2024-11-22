class CuerpoCorreo {
    direccionCorreo: string;
    mensaje: string;

    constructor(direccionCorreo: string, mensaje: string) {
        this.direccionCorreo = direccionCorreo;
        this.mensaje = mensaje;
    }
}


interface IAction{
    execute(c:CuerpoCorreo):boolean
}

class MailService implements IAction{
    execute(c: CuerpoCorreo): boolean {
        let sent:boolean
        console.log(`Logica para tratar de enviarle al ${c.direccionCorreo} el mensaje ${c.mensaje}`)
        //logica para que el sent opte por true(enviado con exito) or false(error)
        //digamos que por algo si retorna true
        sent=true;
        return sent
    }
    
}

abstract class BaseDecorator implements IAction{
    constructor(private wrappee: IAction){
        this.wrappee=wrappee;
    }
    execute(c: CuerpoCorreo): boolean {
        return this.wrappee.execute(c);
    }
}

class LogDecorator extends BaseDecorator{
    log(data:string):void{

        console.log(`Registrando un log por el envio del correo cuya data es: ${data}`)
    }

    execute(c:CuerpoCorreo):boolean{
        let check = super.execute(c)

        if(check){
            this.log(JSON.stringify(c))
        }

        return check
    }
}

// Código cliente

const mailService = new MailService();
const loggedMailService = new LogDecorator(mailService);
const cuerpoCorreo = new CuerpoCorreo(
    "usuario@ejemplo.com",
    "Hola, este es un mensaje de prueba."
);

const resultado = loggedMailService.execute(cuerpoCorreo);

if (resultado) {
    console.log("El correo fue enviado exitosamente.");
} else {
    console.log("Ocurrió un error al enviar el correo.");
}