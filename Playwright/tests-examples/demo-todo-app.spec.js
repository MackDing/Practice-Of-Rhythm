// @ts-check
const { test, expect } = require("@playwright/test");
const { TodoPage } = require("../page-objects/TodoPage");

const TODO_ITEMS = [
  "buy some cheese",
  "feed the cat",
  "book a doctors appointment",
];

test.describe("New Todo", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should allow me to add todo items", async ({ page }) => {
    await todoPage.addTodoItem(TODO_ITEMS[0]);
    await todoPage.checkAllTodoItemsText([TODO_ITEMS[0]]);

    await todoPage.addTodoItem(TODO_ITEMS[1]);
    await todoPage.checkAllTodoItemsText([TODO_ITEMS[0], TODO_ITEMS[1]]);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });

  test("should clear text input field when an item is added", async ({
    page,
  }) => {
    await todoPage.addTodoItem(TODO_ITEMS[0]);
    await expect(todoPage.newTodo).toBeEmpty();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });

  test("should append new items to the bottom of the list", async ({
    page,
  }) => {
    await todoPage.addMultipleTodoItems(TODO_ITEMS);

    await todoPage.checkTodoCount(3);
    await todoPage.checkAllTodoItemsText(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });
});

test.describe("Mark all as completed", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addMultipleTodoItems(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test.afterEach(async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should allow me to mark all items as completed", async ({ page }) => {
    await todoPage.toggleAll.check();

    await expect(todoPage.todoItems).toHaveClass([
      "completed",
      "completed",
      "completed",
    ]);
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  });

  test("should allow me to clear the complete state of all items", async ({
    page,
  }) => {
    await todoPage.toggleAll.check();
    await todoPage.toggleAll.uncheck();

    await expect(todoPage.todoItems).toHaveClass(["", "", ""]);
  });

  test("complete all checkbox should update state when items are completed / cleared", async ({
    page,
  }) => {
    await todoPage.toggleAll.check();
    await expect(todoPage.toggleAll).toBeChecked();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);

    const firstTodo = todoPage.todoItems.nth(0);
    await firstTodo.getByRole("checkbox").uncheck();
    await expect(todoPage.toggleAll).not.toBeChecked();

    await firstTodo.getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    await expect(todoPage.toggleAll).toBeChecked();
  });
});

test.describe("Item", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should allow me to mark items as complete", async ({ page }) => {
    await todoPage.addMultipleTodoItems(TODO_ITEMS.slice(0, 2));

    await todoPage.markItemAsComplete(0);
    await expect(todoPage.todoItems.nth(0)).toHaveClass("completed");
    await expect(todoPage.todoItems.nth(1)).not.toHaveClass("completed");

    await todoPage.markItemAsComplete(1);
    await expect(todoPage.todoItems.nth(0)).toHaveClass("completed");
    await expect(todoPage.todoItems.nth(1)).toHaveClass("completed");
  });

  test("should allow me to un-mark items as complete", async ({ page }) => {
    await todoPage.addMultipleTodoItems(TODO_ITEMS.slice(0, 2));

    const firstTodoCheckbox = todoPage.todoItems.nth(0).getByRole("checkbox");
    await firstTodoCheckbox.check();
    await expect(todoPage.todoItems.nth(0)).toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await firstTodoCheckbox.uncheck();
    await expect(todoPage.todoItems.nth(0)).not.toHaveClass("completed");
    await expect(todoPage.todoItems.nth(1)).not.toHaveClass("completed");
    await checkNumberOfCompletedTodosInLocalStorage(page, 0);
  });

  test("should allow me to edit an item", async ({ page }) => {
    await todoPage.addMultipleTodoItems(TODO_ITEMS);

    const secondTodo = todoPage.todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole("textbox", { name: "Edit" })).toHaveValue(
      TODO_ITEMS[1]
    );
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await secondTodo.getByRole("textbox", { name: "Edit" }).press("Enter");

    await todoPage.checkAllTodoItemsText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });
});

test.describe("Editing", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addMultipleTodoItems(TODO_ITEMS);
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should hide other controls when editing", async ({ page }) => {
    const todoItem = todoPage.todoItems.nth(1);
    await todoItem.dblclick();
    await expect(todoItem.getByRole("checkbox")).not.toBeVisible();
    await expect(
      todoItem.locator("label", {
        hasText: TODO_ITEMS[1],
      })
    ).not.toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 3);
  });

  test("should save edits on blur", async ({ page }) => {
    const secondTodo = todoPage.todoItems.nth(1);
    await secondTodo.dblclick();
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .dispatchEvent("blur");

    await todoPage.checkAllTodoItemsText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });

  test("should trim entered text", async ({ page }) => {
    const secondTodo = todoPage.todoItems.nth(1);
    await secondTodo.dblclick();
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .fill("    buy some sausages    ");
    await secondTodo.getByRole("textbox", { name: "Edit" }).press("Enter");

    await todoPage.checkAllTodoItemsText([
      TODO_ITEMS[0],
      "buy some sausages",
      TODO_ITEMS[2],
    ]);
    await checkTodosInLocalStorage(page, "buy some sausages");
  });

  test("should remove the item if an empty text string was entered", async ({
    page,
  }) => {
    const secondTodo = todoPage.todoItems.nth(1);
    await secondTodo.dblclick();
    await secondTodo.getByRole("textbox", { name: "Edit" }).fill("");
    await secondTodo.getByRole("textbox", { name: "Edit" }).press("Enter");

    await todoPage.checkAllTodoItemsText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should cancel edits on escape", async ({ page }) => {
    const secondTodo = todoPage.todoItems.nth(1);
    await secondTodo.dblclick();
    await secondTodo
      .getByRole("textbox", { name: "Edit" })
      .fill("buy some sausages");
    await secondTodo.getByRole("textbox", { name: "Edit" }).press("Escape");
    await todoPage.checkAllTodoItemsText(TODO_ITEMS);
  });
});

test.describe("Counter", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should display the current number of todo items", async ({ page }) => {
    await todoPage.addTodoItem(TODO_ITEMS[0]);
    await todoPage.checkTodoCount(1);

    await todoPage.addTodoItem(TODO_ITEMS[1]);
    await todoPage.checkTodoCount(2);

    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe("Clear completed button", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addMultipleTodoItems(TODO_ITEMS);
  });

  test("should display the correct text", async ({ page }) => {
    await todoPage.markItemAsComplete(0);
    await todoPage.checkClearCompletedButtonVisibility(true);
  });

  test("should remove completed items when clicked", async ({ page }) => {
    await todoPage.markItemAsComplete(1);
    await todoPage.clearCompletedButton.click();
    await todoPage.checkAllTodoItemsText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should be hidden when there are no items that are completed", async ({
    page,
  }) => {
    await todoPage.markItemAsComplete(0);
    await todoPage.clearCompletedButton.click();
    await todoPage.checkClearCompletedButtonVisibility(false);
  });
});

test.describe("Persistence", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test("should persist its data", async ({ page }) => {
    await todoPage.addMultipleTodoItems(TODO_ITEMS.slice(0, 2));

    const firstTodoCheck = todoPage.todoItems.nth(0).getByRole("checkbox");
    await firstTodoCheck.check();
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoPage.todoItems).toHaveClass(["completed", ""]);

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await page.reload();
    await expect(todoPage.todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(firstTodoCheck).toBeChecked();
    await expect(todoPage.todoItems).toHaveClass(["completed", ""]);
  });
});

test.describe("Routing", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addMultipleTodoItems(TODO_ITEMS);
    await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
  });

  test("should allow me to display active items", async ({ page }) => {
    await todoPage.todoItems.nth(1).getByRole("checkbox").check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Active" }).click();
    await expect(todoPage.todoItems).toHaveCount(2);
    await todoPage.checkAllTodoItemsText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test("should respect the back button", async ({ page }) => {
    await todoPage.todoItems.nth(1).getByRole("checkbox").check();

    await checkNumberOfCompletedTodosInLocalStorage(page, 1);

    await test.step("Showing all items", async () => {
      await page.getByRole("link", { name: "All" }).click();
      await expect(todoPage.todoItems).toHaveCount(3);
    });

    await test.step("Showing active items", async () => {
      await page.getByRole("link", { name: "Active" }).click();
    });

    await test.step("Showing completed items", async () => {
      await page.getByRole("link", { name: "Completed" }).click();
    });

    await expect(todoPage.todoItems).toHaveCount(1);
    await page.goBack();
    await expect(todoPage.todoItems).toHaveCount(2);
    await page.goBack();
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test("should allow me to display completed items", async ({ page }) => {
    await todoPage.todoItems.nth(1).getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Completed" }).click();
    await expect(todoPage.todoItems).toHaveCount(1);
  });

  test("should allow me to display all items", async ({ page }) => {
    await todoPage.todoItems.nth(1).getByRole("checkbox").check();
    await checkNumberOfCompletedTodosInLocalStorage(page, 1);
    await page.getByRole("link", { name: "Active" }).click();
    await page.getByRole("link", { name: "Completed" }).click();
    await page.getByRole("link", { name: "All" }).click();
    await expect(todoPage.todoItems).toHaveCount(3);
  });

  test("should highlight the currently applied filter", async ({ page }) => {
    await expect(page.getByRole("link", { name: "All" })).toHaveClass(
      "selected"
    );

    const activeLink = page.getByRole("link", { name: "Active" });
    const completedLink = page.getByRole("link", { name: "Completed" });
    await activeLink.click();

    await expect(activeLink).toHaveClass("selected");
    await completedLink.click();
    await expect(completedLink).toHaveClass("selected");
  });
});

async function createDefaultTodos(page) {
  const todoPage = new TodoPage(page);
  await todoPage.addMultipleTodoItems(TODO_ITEMS);
}

async function checkNumberOfTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["react-todos"]).length === e;
  }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(page, expected) {
  return await page.waitForFunction((e) => {
    return (
      JSON.parse(localStorage["react-todos"]).filter((i) => i.completed)
        .length === e
    );
  }, expected);
}

async function checkTodosInLocalStorage(page, title) {
  return await page.waitForFunction((t) => {
    return JSON.parse(localStorage["react-todos"])
      .map((i) => i.title)
      .includes(t);
  }, title);
}
