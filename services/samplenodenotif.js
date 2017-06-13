const FCM = require('fcm-node');

const serverKey = 'AAAA5WiUqnQ:APA91bFNWSBD-46GQZxEyfXsBpDZMtEbMU_iT9dROafMfeQmXLC7HmdDrUqVZ0e2b5bX2SvV7fflMSoiyUnK_syuulYXCH9SLLgYHA8Wf3G09vO0chE-Iql8prxLqb8rPL7YCgbyUrEE';
// var serverKey = 'AAAAPJQ1C2M:APA91bF81ZKAZgl_QW7a76zz28FHiQ-dJUgtO554ffolzKZjVj0tCULUkdbSIKeY9Famq0OYf20SLkqoAXeCtFYy0w5Q1FQUrJt0fk-n5QnCf8cXB74W0BFyl7ympqOMwuc9fegQHLVN';
const fcm = new FCM(serverKey);

const message = { // this may vary according to the message type (single recipient, multicast, topic, et cetera)
    // to: 'dH5db8lz2D4:APA91bEKwcoZLGE-GRf5Rb6fxK-8mogctlBi5S0AULkxO0O3vSCOzZWfBxskc_BJCGdnutiHl2eZE_qsFXSDmR7bF9CFuUhGLXi4krkukdUwEUIPLzS_h-EXAAGStWMAUGI3y7tWXMsM',
    // to: "dHuXdU8UmFQ:APA91bGUrY88vNKu67L17IJKbDRs5QRKXs2qfb4rtDOGonok5PQ0ZFiNKiSWJdDPc267J4qoksShE8_-VA30d8TReDTBxmPI7RLE0l_emulQVbs6nv8m7LLmVm2O5nUMTb--fu2ZxfFB",
  to: 'fqjSVXuzqsI:APA91bEQN2FEkPzJ0-rD8lso2z64IdZN9ffl2XIgCisxm0i718t8MK06Ka4UEPkvGoBByz9laS2Wru4fFXVxnTlUch6TX0ldYin38PnapfwfoU0oaBYx__eG2LpgZa1Vzc4w6p8yokHO',
  collapse_key: 'your_collapse_key',
  notification: {
    title: 'Title of your push notification',
    body: 'Body of your\u000A push notification',
    click_action: 'FCM_PLUGIN_ACTIVITY',
    color: '#f95b2c',
    icon: 'myicon',
    sound: 'default',
    badge: 1,

  },

  data: {  // you can send only notification or only data(or include both)
    product_id: '58a293952e834f267d0ab732',
    my_another_key: 'my another value',
  },
};

fcm.send(message, (err, response) => {
  if (err) {
    console.log('Something has gone wrong!', err);
  } else {
    console.log('Successfully sent with response: ', response);
  }
});
