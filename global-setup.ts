import {expect, test} from "@playwright/test";
import {LoginPage} from "./pages/login.page";
import {loginData} from "./test-data/login.data";
import {PulpitPage} from "./pages/pulpit.page";

test("login", async ({page}) => {
    await page.goto('https://demo-bank.vercel.app/');
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.login, loginData.password);
    await expect(new PulpitPage(page).userNameLabel).toHaveText(
        'Jan Demobankowy',
    );

    console.log(await page.context().storageState());
    await page.context().storageState({path: "./LoginAuth.json"});
})