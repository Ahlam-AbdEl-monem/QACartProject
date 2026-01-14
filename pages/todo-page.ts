import { Page } from "@playwright/test";

export default class TodoPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async load() {
        await this.page.goto('/todo');
    }
    private get welcomeMessage() {
        return "[data-testid='welcome']"; 
    }
    private get todoDelete() {
        return '[data-testid="delete"]';
    }
    get noTodosMessage() {
        return this.page.getByTestId('no-todos');
    }

    async getWelcomeMessage() {
        return this.page.locator(this.welcomeMessage);
    }

      async todoItemTextByIndex(index: number) {
        return this.page.locator('[data-testid="todo-item"]').nth(index).innerText();
    }

    async deleteTodoByIndex(index: number){
            await this.page.locator(this.todoDelete).nth(index).click();
    }



}