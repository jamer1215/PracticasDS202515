interface INotifierService{
    execute():void
}

class NotifierService implements INotifierService{
    constructor(){}
    execute(): void {
        console.log(`Execution of notificationService`);
    }
}

class BaseDecorator implements INotifierService{
    
    private wrappee: INotifierService

    constructor(wrapee:INotifierService){
        this.wrappee=wrapee
    }
    
    execute(): void {
        this.wrappee.execute();
    }
}

class SmSNotifier extends BaseDecorator{
    constructor(wrapee:INotifierService){
        super(wrapee)
    }
    execute(): void {
        super.execute()
        this.sendSMS();
    }

    sendSMS():void{
        console.log(`Envio Notificacion de SMS`);
    }
}

class FacebookNotifier extends BaseDecorator{
    constructor(wrapee:INotifierService){
        super(wrapee)
    }

    execute(): void {
        super.execute()
        this.sendFacebookMessage();
    }

    sendFacebookMessage():void{
        console.log(`Envio Notificacion Facebook`);
    }
}


class SlackNotifier extends BaseDecorator{
    constructor(wrapee:INotifierService){
        super(wrapee)
    }
    execute(): void {
        super.execute()
        this.sendSlackMessage();
    }

    sendSlackMessage():void{
        console.log(`Envio Notificacion Slack`);
    }
}
//Implementacion - código cliente:

let notificationService=new SlackNotifier( //f(g(h(x)))
    new FacebookNotifier(
        new SmSNotifier(
            new NotifierService()
        )
    )
)
//NT: Esperado la salida en el siguiente orden
//1.ejecucion de notifier
//2.SmsNotifier
//3.FacebookNotifier
//4.SlackNotifier

notificationService.execute()

let secondNotifierService=new SmSNotifier(
    new FacebookNotifier(
        new SlackNotifier(
            new NotifierService()
        )
    )
)
console.log("")
//NT: Esperado la salida en el siguiente orden
//1.ejecucion de notifier
//2.SlackNotifier
//3.FacebookNotifier
//4.SmsNotifier

secondNotifierService.execute()