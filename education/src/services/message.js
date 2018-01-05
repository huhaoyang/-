import { request, config } from 'utils'

const { api } = config
const { message } = api

export async function query (params) {
  return request({
    url: message,
    method: 'get',
    data: params,
  })
}
