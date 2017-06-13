const serverKey = 'AAAAoDVUotg:APA91bGSSsdmlLFx9ihoi3Kq7XMrYr24pMKfL93j4M9p7qNg8eWeqYWmp9HSfbUhaqjZxEC9uvrXQ6_Fgs5mKUcov2xNKHqkKxUNx9Bd7rjhYJ2g7472Z-DxkPLZYv4cny8wah4w1LON';

const FirebaseConstants = {
  key: serverKey,
};
export function sendData(type) {
  console.log('call');
  const body = {
    to: 'd-2T05qAQXM:APA91bHw0FCiOMSEM7Q2mg64THCGSORWujf0IzJS5fBQamon9mtaZKsCoDVZ40P3t5B_HdwcsP2YRD1U1tZn8MCoW3eCsrJ0AQu0PbiASjRc-9zcYkLMeVmPHscRzwx0CKZjHLbOjwYE',
    notification: {
      title: 'name',
      body: 'text',
      sound: 'default',
    },
    priority: 'high',
  };
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': parseInt(body.length),
    Authorization: `key=${FirebaseConstants.KEY}`,
  });
  return fetch('https://fcm.googleapis.com/fcm/send', { method: 'POST', headers, body })
    .then((response) => {
      console.log(response);
    })
    .catch(error => (error));
}
