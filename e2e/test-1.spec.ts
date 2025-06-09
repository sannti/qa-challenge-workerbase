import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures.all";

test.beforeEach("Log in", async ({ loginPage }) => {
    await loginPage.login("santiago.oji@gmail.com", "Workerbase1!");
    await expect(loginPage).toHaveTitle("Find | WORKERBASE");
});


test("Create rule", async ({ functionPage }) => {
    await functionPage.navigateTo("6843fdf868b6039019cb249b");
    await functionPage.selectTriggerType("Triggered when this function is called.");
    await functionPage.ruleName.fill("Test Rule");
    await functionPage.ruleDescription.fill("This is a test rule");
    await functionPage.continueButton.click();
    await functionPage.continueButton.click();
    await functionPage.selectAssigmentType("Workinstructions");
    await functionPage.selectWorkinstruction("Empty Work Instruction");
    await functionPage.taskHeadline.fill("Test Task Headline");
    await functionPage.taskTitle.fill("Test Task Title");
    await functionPage.taskDescription.fill("This is a test task description");
    await functionPage.taskPriority.fill("3");
    await functionPage.recipientType("Caller").click();
    await functionPage.saveButton.click();
});

test("Trigger workinstruction", async ({ page }) => {
    await page.goto("https://review-4197.review.workerbase.dev/projects/6843fdf868b6039019cb249b/functions/68443956e87d175e18de97ee/edit");
    // await page.locator("a", { hasText: "Function" }).click();
    await page.locator('li[class^="SidebarItem-module__sidebarItem"]', { hasText: 'Function' }).click();

    await page.locator('svg[data-testid="PlayArrowIcon"]').click();
    expect(await page.getByText("Function run successful")).toBeVisible();
});

