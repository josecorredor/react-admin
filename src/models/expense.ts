import { Classification } from "./classification";
import { Tx_type } from "./tx_type";
import { User } from "./user";
import { Week } from "./week";

export class Expense {
    

    constructor(
        public id_expenses:number = 0,
        public detail:string = '',
        public value:string = '',
        public classification = new Classification(),
        public week = new Week(),
        public user = new User(),
        public tx_type = new Tx_type(),
    ){
        
    }
}