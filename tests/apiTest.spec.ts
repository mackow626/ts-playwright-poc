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


  test('request intercaption practicesoftwaretesting.com', async ({
    page,
  }) => {
    //Arrange
    const reservation = {
      current_page: 1,
      data: [
        {
          id: '01HARP72XM0AJK0GDA1QCKPAFC',
          name: 'Raczej zmieniony tekst',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra felis nec pellentesque feugiat. Donec faucibus arcu maximus, convallis nisl eu, placerat dolor. Morbi finibus neque nec tincidunt pharetra. Sed eget tortor malesuada, mollis enim id, condimentum nisi. In viverra quam at bibendum ultricies. Aliquam quis eros ex. Etiam at pretium massa, ut pharetra tortor. Sed vel metus sem. Suspendisse ac molestie turpis. Duis luctus justo massa, faucibus ornare eros elementum et. Vestibulum quis nisl vitae ante dapibus tempor auctor ut leo. Mauris consectetur et magna at ultricies. Proin a aliquet turpis.',
          stock: 11,
          price: 14.15,
          is_location_offer: 0,
          is_rental: 0,
          brand_id: '01HARP72X09S8AM6T0QSYRM6SJ',
          category_id: '01HARP72XATYAQQRENMNYE9HYC',
          product_image_id: '01HARP72XEM2PCA04J7A63QNCP',
          product_image: {
            id: '01HARP72XEM2PCA04J7A63QNCP',
            by_name: 'Helinton Fantin',
            by_url: 'https://unsplash.com/@fantin',
            source_name: 'Unsplash',
            source_url: 'https://unsplash.com/photos/W8BNwvOvW4M',
            file_name: 'pliers01.jpeg',
            title: 'Combination pliers',
          },
          category: {
            id: '01HARP72XATYAQQRENMNYE9HYC',
            name: 'Pliers',
            slug: 'pliers',
            parent_id: '01HARP72X7A964A0SZHBXMDB9J',
          },
          brand: {
            id: '01HARP72X09S8AM6T0QSYRM6SJ',
            name: 'Brand name 1',
            slug: 'brand-name-1',
          },
        },
      ],
      first_page_url: 'https://api.practicesoftwaretesting.com/products?page=1',
      from: 1,
      last_page: 3,
      per_page: 9,
      to: 9,
      total: 23,
    };

    //Act
    await page.route('**/products*', (route) => {
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
    });
    await page.goto('https://practicesoftwaretesting.com');

    //Assert
    const changedName = await page.getByText('Raczej zmieniony tekst');
    await expect(changedName.isVisible).toBeTruthy();
  });
});
