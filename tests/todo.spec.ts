import {test,expect} from "@playwright/test";
import User from "../models/user";
import TodoPage from "../pages/todo-page";
import RegisterPage from "../pages/resgister-page";
import NewTodoPage from "../pages/new-todo-page";

test('user should be able to add a todo item', async ({ page, request, context }) => {

    //Register Using API
    const user = new User();
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingAPI(user);
      
    const newTodoPage = new NewTodoPage(page,request, context);
    await newTodoPage.load();
    const todoName = 'Playwright Course';
    await newTodoPage.addNewTodo(todoName);


    const todoPage = new TodoPage(page);
    const todoText = await todoPage.todoItemTextByIndex(0);
    expect(todoText).toBe(todoName);
});

test('user should be able to delete a todo item', async ({ page ,  request, context }) => {

//    //Register Using API
    const user = new User();

    console.log(user);

    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingAPI(user);

    const newTodoPage = new NewTodoPage(page, request, context);
    await newTodoPage.load();
    const todoName = 'Playwright Course';
    await newTodoPage.addNewTodoUsingAPI(user, todoName);


    const todoPage = new TodoPage(page);
    await todoPage.load();
    await todoPage.deleteTodoByIndex(0);

    await expect(todoPage.noTodosMessage).toBeVisible();

});