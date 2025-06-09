import { Locator, Page } from '@playwright/test';

export default class FunctionPage {
    page: Page;
    triggerType: (description: RegExp | string) => Locator;
    ruleName: Locator;
    ruleDescription: Locator;
    continueButton: Locator;
    assigmentType: (assigmentName: RegExp | string) => Locator;
    workinstructionLabel: Locator;
    workinstructionSelect: Locator;
    taskHeadline: Locator;
    taskTitle: Locator;
    taskDescription: Locator;
    taskPriority: Locator;
    recipientType: (recipientType: RegExp | string) => Locator;
    saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.triggerType = (description: RegExp | string) => this.page.locator('li', { hasText: description });
        this.assigmentType = (workinstructionName: RegExp | string) => this.page.locator('li', { hasText: workinstructionName });
        this.continueButton = this.page.locator('button', { hasText: 'Continue' });
        this.ruleDescription = this.page.locator('textarea[name="description"]');
        this.ruleName = this.page.locator('input[name="name"]');
        this.workinstructionLabel = this.page.locator('label[for="workinstruction-id"]');
        this.workinstructionSelect = this.workinstructionLabel.locator('xpath=following::input[starts-with(@id, "react-select-")][1]');
        this.taskHeadline = this.page.locator('input[name="task-headline"]');
        this.taskTitle = this.page.locator('input[name="task-title"]');
        this.taskDescription = this.page.locator('textarea[name="task-description"]');
        this.taskPriority = this.page.locator('input[name="task-priority"]');
        this.recipientType = (recipientType: RegExp | string) => this.page.locator('li', { hasText: recipientType });
        this.saveButton = this.page.locator('button', { hasText: 'Save' });
    }

    async navigateTo(projectId: string,) {
        let url = `https://review-4197.review.workerbase.dev/projects/${this.projectId}/rules/create`; // TODO: Parametrise domain
        await this.page.goto(url);
    }

    async selectAssigmentType(assigmentName: RegExp | string) {
        await this.assigmentType(assigmentName).scrollIntoViewIfNeeded();
        await this.assigmentType(assigmentName).click();
    }


    async selectTriggerType(description: RegExp | string) {
        await this.triggerType(description).scrollIntoViewIfNeeded();
        await this.triggerType(description).click();
    }

    async selectWorkinstruction(workinstructionName: RegExp | string) {
        await this.workinstructionSelect.click();
        await this.page.getByText(workinstructionName).click();
    }
}
