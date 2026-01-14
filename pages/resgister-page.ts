import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/user";
import UserApi from "../apis/user_api";
import config  from "../playwright.config";


export default class RegisterPage {

    private page: Page;
    private request?: APIRequestContext;
    private context?: BrowserContext;

    //constructor
    constructor(page:Page, request?:APIRequestContext, context?:BrowserContext) {
        this.page = page;
        this.request = request;
        this.context = context;
    }        

    //Elements
    private get firstNameInput() {
        return '[data-testid="first-name"]';
    }
    private get lastNameInput() {
        return '[data-testid="last-name"]';
    }
    private get emailInput() {
        return '[data-testid="email"]';
    }
    private get passwordInput() {
        return '[data-testid="password"]';
    }
    private get confirmPasswordInput() {
        return '[data-testid="confirm-password"]';
    }
    private get submitButton() {
        return '[data-testid="submit"]';
    }

    //Methods
    async load() {
        await this.page.goto('/signup');
    }

    async register(user:User) {
        await this.page.fill(this.firstNameInput, user.getFirstName());
        await this.page.fill(this.lastNameInput, user.getLastName());
        await this.page.fill(this.emailInput, user.getEmail());
        await this.page.fill(this.passwordInput, user.getPassword());
        await this.page.fill(this.confirmPasswordInput, user.getPassword());
        await this.page.click(this.submitButton);
    }

    
    async registerUsingAPI(user:User) {

        //Set Auth Cookies
        const response = await new UserApi(this.request!).register(user);
        const responseBody = await response.json();
        console.log(responseBody);
        const userID = responseBody.userID;
        const token = responseBody.access_token;
        const firstName = responseBody.firstName;
        user.setAccessToken(token);

            //Set Cookie in the browser context
            await this.context!.addCookies([{
                name: 'access_token',
                value: token,
                url: config.use?.baseURL,
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL,
            },
            {
                name: 'userID',
                value: userID,
                url: config.use?.baseURL,
            },

        ]);
    }

}