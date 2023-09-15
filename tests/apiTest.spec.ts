import {expect, request, test} from '@playwright/test';

const REPO = 'test-repo-1';
const USER = 'github-username';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({playwright}) => {
    apiContext = await request.newContext({
        baseURL: 'http://hotel-test.equalexperts.io',
        extraHTTPHeaders: {
            Accept: '*/*',
            // Add GitHub personal access token.
            'Authorization': `Basic YWRtaW46cGFzc3dvcmQxMjM=`,
        },
    });
});

test.afterAll(async ({}) => {
    // Dispose all responses.
    await apiContext.dispose();
});

test.only('delete all reservations', async ({page}) => {
    const newIssue = await apiContext.get(`/booking`);
    expect(newIssue.ok()).toBeTruthy();
    const json = newIssue.json();
    // json.query()
    // expect(json.string[0].bookingid).toContain("123")
    // var names = jp.query(cities, '$..name');
    const responseJson = JSON.parse(await newIssue.text());
    //  const body = JSON.parse( newIssue.body.toString());
    // // let list: MyObj = JSON.parse(await newIssue.json());
    console.log(responseJson.size);


    for (let i = 0; i < responseJson.length; i++) {
        const bookingid = responseJson[i].bookingid;
        console.log(bookingid);


        let apiResponse = await apiContext.delete(`/booking/${bookingid}`, {});
        expect(apiResponse.ok()).toBeTruthy();
    }
});