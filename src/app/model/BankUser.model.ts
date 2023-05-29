export class BankUser
{
    constructor(
        public Id?:number,
        public  UserName?: string,
        public  Password?: string,
        public  Email?:string,
        public  Phone?:string,
        public  name?:string,
        public  AccountNo?:string,
        public  Balance?: string,
        public  creditCardPayment?:string,
        public loanPayment?:string,
        public creditDueDate?:string,
        public loanDueDate?:string
    ){}
}