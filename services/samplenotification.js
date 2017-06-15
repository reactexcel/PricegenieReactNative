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
    	to: 'cdwl9YdAClA:APA91bGJ1ZpDl2Gz0XAwdPm_K2mzKP0gAv_xIK4AFY_MIHUyRG6ZyJSeTBZOJWSsnC1WpooY-9yd91NeqTImcndRy5Oc0sAZlTeNEp4gXbcL489o1NMOMcpsEiYSlVo33qy6gMQo8top',
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
      id: '123',
      name: 'pricegenie',
      image: 'url',
      text: 'description',
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
