import { APIRequest, APIRequestContext } from "@playwright/test";
import User from "../models/user";
//import User from "../models/User";

export default class TodoApi {

    private request: APIRequestContext;

    constructor(request:APIRequestContext) {
        this.request = request;
    }

    async addTodo(user: User, item: string) {
        return await this.request.post('api/v1/tasks', {
            data: {
                isCompleted: false,
                item: item
            },
        headers: {
            Authorization: `Bearer ${user.getAccessToken()}`
        },
  });}
}