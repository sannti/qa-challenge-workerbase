import { test, expect } from "@playwright/test";

test.beforeEach("Log in", async ({ page }) => {
    await page.goto("https://review-4197.review.workerbase.dev/login");
    await page.locator('input[name="email"]').fill("santiago.oji@gmail.com");
    await page.locator('input[name="password"]').fill("Workerbase1!");
    await page.getByRole("button", { name: "Sign In with E-mail" }).click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveTitle("Find | WORKERBASE");
});


test("Create rule", async ({ page }) => {
    await page.goto("https://review-4197.review.workerbase.dev/projects/6843fdf868b6039019cb249b/rules/create");
    await page.locator("li", { hasText: "Triggered when this function is called." }).scrollIntoViewIfNeeded();
    await page.locator("li", { hasText: "Triggered when this function is called." }).click();
    await page.locator('input[name="name"]').fill("Test Rule");
    await page.locator('textarea[name="description"]').fill("This is a test rule");
    await page.locator("button", { hasText: "Continue" }).click();
    await page.locator("button", { hasText: "Continue" }).click();
    await page.locator("li", { hasText: "Workinstructions" }).scrollIntoViewIfNeeded();
    await page.locator("li", { hasText: "Workinstructions" }).click();

    const label = page.locator('label[for="workinstruction-id"]');

    // Find the closest input with id starting with "react-select-"
    const input = label.locator('xpath=following::input[starts-with(@id, "react-select-")][1]');
    await input.click();
    await page.getByText("Empty Work Instruction").click();

    await page.locator('input[name="task-headline"]').fill("Test Task Headline");
    await page.locator('input[name="task-title"]').fill("Test Task Title");
    await page.locator('textarea[name="task-description"]').fill("This is a test task description");
    await page.locator('input[name="task-priority"]').fill("3");
    await page.locator('label[for="caller"]').click();
    await page.getByRole("button", { name: "Save" }).click();
});

test("Trigger workinstruction", async ({ page }) => {
    await page.goto("https://review-4197.review.workerbase.dev/projects/6843fdf868b6039019cb249b/functions/68443956e87d175e18de97ee/edit");
    // await page.locator("a", { hasText: "Function" }).click();
    await page.locator('li[class^="SidebarItem-module__sidebarItem"]', { hasText: 'Function' }).click();

    await page.locator('svg[data-testid="PlayArrowIcon"]').click();
    expect(await page.getByText("Function run successful")).toBeVisible();
});

