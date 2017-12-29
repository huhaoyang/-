/* global window */
import axios from 'axios'
import lodash from 'lodash'
import md5 from 'js-md5'
import pathToRegexp from 'path-to-regexp'
import {removeStore} from '@/config/mUtils'
import {
  baseUrl,
  publicKey
} from './env'

axios.interceptors.response.use(
  response => {
    if((response.data.code && response.data.code==90002)){
      removeStore("usercode");
    }
    return response;
  });

const fetch = (options) => {

  let {
    method = 'get',
    data,
    url,
    id="",
    header={}
  } = options

  url = baseUrl + url;

  axios.defaults.withCredentials = true
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  const cloneData = lodash.cloneDeep(data)

  // try {
  //   let domin = ''
  //   if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
  //     domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
  //     url = url.slice(domin.length)
  //   }
  //   const match = pathToRegexp.parse(url)
  //   url = pathToRegexp.compile(url)(data)
  //   for (let item of match) {
  //     if (item instanceof Object && item.name in cloneData) {
  //       delete cloneData[item.name]
  //     }
  //   }
  //
  //   url = domin + url
  //
  // } catch (e) {
  //   console.log(e.message)
  // }

  data = convertObjectToFormData(cloneData,id,publicKey);

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        headers: header
      })
    case 'delete':
      return axios.delete(url, {
        headers: header
      })
    case 'post':
      return axios.post(url, data, {
        headers: header
      })
    case 'put':
      return axios.put(url, data, {
        headers: header
      })
    case 'patch':
      return axios.patch(url, data, {
        headers: header
      })
    default:
      return axios(options)
  }
}

function convertObjectToFormData(obj,id,key) {
  let arr = new Array();
  let i = 0;
  for(var attr in obj) {
    arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
    i++;
  }
  arr = arr.sort();
  let str = arr.join("&");
  let sign = md5(str + ((id) ? id:"") + key)

  return str+`&sign=${sign}`;
}

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSON'
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
