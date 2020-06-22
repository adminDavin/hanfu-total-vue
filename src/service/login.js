/* eslint-disable require-jsdoc */
import log from '@/api/login-api.js'

async function login (params, handleResult) {
  log.login(params).then((res) => handleResult(res))
}

async function token (params, handleResult) {
  log.token(params).then((res) => handleResult(res))
}
async function code (params, handleResult) {
  log.code(params).then((res) => handleResult(res))
}
export default {
  login: login,
  token: token,
  code: code
}
