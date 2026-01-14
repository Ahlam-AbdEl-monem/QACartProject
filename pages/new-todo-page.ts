import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import user from "../models/user";
import UserApi from "../apis/user_api";
import User from "../models/user";
import TodoApi from "../apis/todo_api";

export default class NewTodoPage {

private page: Page; 
private request:  APIRequestContext;
private context:  BrowserContext;

  constructor(page: Page, request: APIRequestContext, context:  BrowserContext) {
        this.page = page;
        this.request = request;
        this.context = context;
    }
    async load() {
        await this.page.goto('/todo/new');
    }

    get newTodoInput() {
        return '[data-testid="new-todo"]';
    }
    get submitNewTaskButton() {
        return '[data-testid="submit-newTask"]';
    }
  
    async addNewTodo(todoText: string) {
        await this.page.fill(this.newTodoInput, todoText);
        await this.page.click(this.submitNewTaskButton);
}

async addNewTodoUsingAPI(user: User, todoName: string) {
   await new TodoApi(this.request).addTodo(user, todoName);
}
}