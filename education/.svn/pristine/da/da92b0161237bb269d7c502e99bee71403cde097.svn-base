import { request, config } from 'utils'

const { api } = config
const { course } = api

export async function query (params) {
  return request({
    url: course.list,
    method: 'get',
    data: params,
  })
}

export async function del (params) {
  return request({
    url: course.delete,
    method: 'delete',
    data: params,
  })
}

export async function state (params) {
  return request({
    url: course.updateState,
    method: 'patch',
    data: params,
  })
}
