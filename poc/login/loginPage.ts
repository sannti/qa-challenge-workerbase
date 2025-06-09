import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    page: Page;
    emailInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.signInButton = this.page.getByRole('button', { name: 'Sign In with E-mail' });

    }

    async login(email: string, password: string) {
        await this.page.goto('https://review-4197.review.workerbase.dev/login'); // TODO: Paramterize URL
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForTimeout(2000); // Adjust timeout as necessary
    }
}
