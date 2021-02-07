import {
  request
} from "../utils/request";


export const padLogin = data => request({
  url: '/hug_interview/loginCheck.htm',
  data,
  contentType: 'formdata',
  method: 'post'
}).then(res => res)
