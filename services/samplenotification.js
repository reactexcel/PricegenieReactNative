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
    	to: 'eBCnW2Fz1nA:APA91bFqXoMtal8hMvSmrWrzofvB2FrHLQjlD5aDLyPUqOcOugh56pgTH6ReMWGDvjl95OCGKhPsqdj1U3ZCoijJC_l180peouDcUx_w1bD-hMUzso6frRN13Ee3YaHdv_rcAK6xCrXz',
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
