export class User {
    id:number;
    name:string;
    username: string;
    password: string;
    email:string;
    address: string;
    account:string;
    status:string;
    balance:number;
    numOfChecks: number;
    userType:string;

    constructor(name: string,username:string, password:string, email:string, address:string, userType:string) {
        this.id = 0;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.account = "checking";
        this.status = "open";
        this.balance = 0.00;
        this.numOfChecks = 10;
    }
}
