import { Role } from "./role";

export class User {
    

    constructor(
        public id_person:number = 0,
        public name:string = '',
        public last_name:string = '',
        public email:string = '',
        public celuphone:string = '',
        public address:string = '',
        public goal:string = '',
        public person_type: string = '',
        public active:string = '',
        public role = new Role(),
    ){
        
    }
    get namec() {
        return this.name + ' ' + this.last_name;
    }
}