const FirebaseConstants = {
  KEY: 'AIzaSyDc-fjqk-bEhWV-Ream--VyNUzfr51R6xE',
};

const API_URL = 'https://fcm.googleapis.com/fcm/send';

class FirebaseClient {

  constructor() {
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification() {
    const body = {
    	to: 'ep8X44FF0r0:APA91bEY3y9b6d_BE4SCPTnJ-sbVSdwwjGvCWtbl1xq_mbBXwgFqtafUkp0tt-_CVl5bgROPtc2NskExJYWDKBZUax56o_-xQSwziixg8j9dOHDRCtriJYGsV02fp3yKsETteKLdYqcu',
      content_available: true,
      notification: {
    		title: 'price genie',
    		body: 'This is a notification from price genie.',
    		sound: 'default',
        icon: 'ic_notif',
    		click_action: 'fcm.ACTION.HELLO',
    	},
      data: {
    		title: 'PriceGenie',
    		body: {
      id: '5940cb71a4266e615e6243ed',
    },
    		click_action: 'fcm.ACTION.HELLO',
    		remote: true,
    	},
    	priority: 'high',
    };

    this._send(JSON.stringify(body), 'notification');
  }

  _send(body, type) {
  	const headers = new Headers({
  		'Content-Type': 'application/json',
  		'Content-Length': parseInt(body.length),
    Authorization: `key=${FirebaseConstants.KEY}`,
  	});

  	fetch(API_URL, { method: 'POST', headers, body })
  		.then(response => console.log(`Send ${type} response`, response))
  		.catch(error => console.log(`Error sending ${type}`, error));
  }

}

const firebaseClient = new FirebaseClient();
export default firebaseClient;
