import { test as base } from '@playwright/test';
import FunctionPage from '../poc/functions/functionPage';
import LoginPage from '../poc/login/loginPage';

// Using this in that way to have one entry point
export const test = base.extend<{
    functionPage: FunctionPage;
    loginPage: LoginPage;
}>({
    functionPage: async ({ page }, use) => {
        await use(new FunctionPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});
