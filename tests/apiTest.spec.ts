import { test, expect } from '@playwright/test';

const REPO = 'test-repo-1';
const USER = 'github-username';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'http://hotel-test.equalexperts.io',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: '*/*',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      //Authorization: `token ${process.env.API_TOKEN}`,
    },
  });
});

test.afterAll(async ({}) => {
  // Dispose all responses.
  await apiContext.dispose();
});

export interface MyObj {
  bookingid: string
}

test.only('last created issue should be first in the list', async ({ page }) => {
  const newIssue = await apiContext.get(`/booking`);
  expect(newIssue.ok()).toBeTruthy();
  const json = newIssue.json();
  expect(json).toContain("123")
  //  const responseJson = JSON.parse(await newIssue.text());
  //  const body = JSON.parse( newIssue.body.toString());
  // // let list: MyObj = JSON.parse(await newIssue.json());
  // console.log( responseJson);
  // console.log( await newIssue.text());
  // let obj: { string: MyObj[] } = JSON.parse(newIssue.body.toString());
  // console.log('obj');




});


export async function getUsers(): Promise<MyObj[]> {
  const request = await fetch('users.json')
  const data = await request.json()
  return data
}