import { expect, request, test } from '@playwright/test';

test.describe('Reservation api tests', () => {
  let apiContext;
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'http://hotel-test.equalexperts.io',
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
      },
    });
  });

  test.afterAll(async ({}) => {
    await apiContext.dispose();
  });

  test('create reservation with random name', async () => {
    //Arrange
    let name = Math.random().toString().substr(2, 5);

    //Act
    const newIssue1 = await apiContext.post(`/booking`, {
      data: {
        firstname: name,
        lastname: name,
        totalprice: '33',
        depositpaid: 'true',
        bookingdates: { checkin: '2023-09-11', checkout: '2023-09-22' },
      },
    });
    const responseJson = JSON.parse(await newIssue1.text());

    //Assert
    expect(newIssue1.ok()).toBeTruthy();
    expect(await responseJson.booking.firstname).toEqual(name);
    expect(await responseJson.booking.lastname).toEqual(name);
  });

  test('delete all reservations', async () => {
    //Act
    let allReservationResponse = await apiContext.get(`/booking`);
    expect(allReservationResponse.ok()).toBeTruthy();
    let responseJson = JSON.parse(await allReservationResponse.text());

    let idsOfReservationsBeforeDeletion: string[] = [];

    for (const item of responseJson) {
      let apiResponse = await apiContext.delete(
        `/booking/${item.bookingid}`,
        {},
      );
      idsOfReservationsBeforeDeletion.push(item.bookingid);
      expect(apiResponse.ok()).toBeTruthy();
    }

    //Assert
    const allReservationResponseAfterDelete = await apiContext.get(`/booking`);
    let responseJsonAfterDelete = JSON.parse(
      await allReservationResponseAfterDelete.text(),
    );
    expect(responseJsonAfterDelete).not.toContain(responseJson);

    for (const item of responseJsonAfterDelete) {
      expect(idsOfReservationsBeforeDeletion).not.toContain(item.booking);
    }
  });

  test('get single reseration', async () => {
    //Arrange
    let name = Math.random().toString().substr(2, 5);
    const newReservation = await apiContext.post(`/booking`, {
      data: {
        firstname: name,
        lastname: name,
        totalprice: '33',
        depositpaid: 'true',
        bookingdates: { checkin: '2023-09-11', checkout: '2023-09-22' },
      },
    });
    const responseJson = JSON.parse(await newReservation.text());
    const reservationId = responseJson.bookingid;

    //Act
    const singleReservation = await apiContext.get(`/booking/${reservationId}`);
    const singleReservationJson = JSON.parse(await singleReservation.text());

    //Assert
    expect(singleReservation.ok()).toBeTruthy();
    expect(await singleReservationJson.firstname).toEqual(name);
    expect(await singleReservationJson.lastname).toEqual(name);
  });
});
