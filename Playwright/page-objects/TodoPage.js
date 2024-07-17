// @ts-check
const { expect } = require("@playwright/test");

exports.TodoPage = class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTodo = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-item");
    this.todoCount = page.getByTestId("todo-count");
    this.toggleAll = page.getByLabel("Mark all as complete");
    this.clearCompletedButton = page.getByRole("button", {
      name: "Clear completed",
    });
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc");
  }

  async addTodoItem(item) {
    await this.newTodo.fill(item);
    await this.newTodo.press("Enter");
  }

  async addMultipleTodoItems(items) {
    for (const item of items) {
      await this.addTodoItem(item);
    }
  }

  async markItemAsComplete(index) {
    await this.todoItems.nth(index).getByRole("checkbox").check();
  }

  async unmarkItemAsComplete(index) {
    await this.todoItems.nth(index).getByRole("checkbox").uncheck();
  }

  async checkTodoCount(expectedCount) {
    await expect(this.todoCount).toContainText(expectedCount.toString());
  }

  async checkTodoItemText(index, expectedText) {
    await expect(this.todoItems.nth(index)).toHaveText(expectedText);
  }

  async checkAllTodoItemsText(expectedTexts) {
    await expect(this.todoItems).toHaveText(expectedTexts);
  }

  async checkClearCompletedButtonVisibility(visible) {
    if (visible) {
      await expect(this.clearCompletedButton).toBeVisible();
    } else {
      await expect(this.clearCompletedButton).toBeHidden();
    }
  }
};
