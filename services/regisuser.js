import axios from 'axios';

export function setuserinfo(info, id, name, userEmail, gender, device_id) {
  return new Promise((resolve, reject) => {
    axios.get(`${CONF.baseURL + info}&id=${id}&name=${name}&email=${userEmail}&gender=${gender}&device_id=${device_id}`).then((val) => {
      resolve(val);
    }, (error) => {
      reject({ error });
    });
  });
}
export function setuserkey(device_id, user_key, fcm_reg_id) {
  return new Promise((resolve, reject) => {
    axios.get(`${ADDUSER.baseURL + device_id}&user_key=${user_key}&gcm_reg_id=${fcm_reg_id}`).then((val) => {
      resolve(val);
    }, (error) => {
      reject({ error });
    });
  });
}
