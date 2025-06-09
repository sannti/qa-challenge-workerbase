import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures.all";

test.beforeEach("Log in", async ({ loginPage }) => {
    await loginPage.login("santiago.oji@gmail.com", "Workerbase1!");
    await expect(loginPage.page).toHaveTitle("Find | WORKERBASE");
});


test("Create rule", async ({ functionPage }) => {
    await functionPage.navigateTo("6846aa1168b6039019cb3b62");
    await functionPage.selectTriggerType("Triggered when this function is called.");
    await functionPage.ruleName.fill("Test Rule" + Math.floor(Math.random() * 1000)); // Adding a random number to ensure uniqueness
    await functionPage.ruleDescription.fill("This is a test rule");
    await functionPage.continueButton.click();
    await functionPage.continueButton.click();
    await functionPage.selectAssigmentType("Workinstructions");
    await functionPage.selectWorkinstruction("Empty Work Instruction");
    await functionPage.taskHeadline.fill("Test Task Headline");
    await functionPage.taskTitle.fill("Test Task Title");
    await functionPage.taskDescription.fill("This is a test task description");
    await functionPage.taskPriority.fill("1");
    await functionPage.recipientType("caller").scrollIntoViewIfNeeded();
    await functionPage.recipientType("caller").click();
    await functionPage.saveButton.click();
    await expect(functionPage.page.getByText("Rule created")).toBeVisible({ timeout: 5000 });
});

test("Trigger workinstruction", async ({ page }) => {
    await page.goto("https://review-4197.review.workerbase.dev/projects/6846aa1168b6039019cb3b62/functions/6846aa49e87d175e18de9ccc/edit");
    await page.locator('li[class^="SidebarItem-module__sidebarItem"]', { hasText: 'Function' }).click();
    await page.locator('svg[data-testid="PlayArrowIcon"]').click();
    await expect(page.getByText("Function run successful")).toBeVisible({ timeout: 5000 });
});

