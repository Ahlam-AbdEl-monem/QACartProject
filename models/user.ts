import { faker } from "@faker-js/faker";

export default class User {

    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private userID: string = "";
    private access_token: string = "";

    constructor(){
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.email = faker.internet.email();
        this.password = 'Password123!';
    }

    getFirstName(): string {
        return this.firstName;
    }   
    getLastName(): string {
        return this.lastName;
    }
    getEmail(): string {
        return this.email;
    }   
    getPassword(): string {
        return this.password;
    }
   getAccessToken(): string {
        return this.access_token;
    }
    setAccessToken(token: string): void {
        this.access_token = token;
    }

  
}