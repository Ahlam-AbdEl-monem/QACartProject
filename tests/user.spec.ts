import test, { expect } from "@playwright/test";
import User from "../models/user";
import RegisterPage from "../pages/resgister-page";
import TodoPage from "../pages/todo-page";

test('user should be able to register to the todo website', async ({ page }) => {
    const user = new User();
    const registerPage = new RegisterPage(page);
    await registerPage.load();
    await registerPage.register(user);


    const todoPage = new TodoPage(page);
    const welcomeMessage = await todoPage.getWelcomeMessage();
    await expect(welcomeMessage).toBeVisible();
  });