/* eslint-disable require-jsdoc */
import Axios from 'axios'
// 添加
function AddApplet (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('domain', params.domain)
  fd.append('expireTime', params.expireTime)
  fd.append('isPerpetual', params.isPerpetual)
  fd.append('name', params.name)
  fd.append('phone', params.phone)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/AddApplet', fd)
}
// 编辑
function updateApp (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('bossId', params.bossId)
  // fd.append('domain', params.domain)
  fd.append('expireTime', params.expireTime)
  fd.append('isPerpetual', params.isPerpetual)
  fd.append('name', params.name)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/updateApp', fd)
}
function AppletList (params) {
  return Axios.get('/api/api/user/hf-auth/AppletList', { params })
}

function deleted (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('bossId', params.bossId)
  fd.append('isDeleted', params.isDeleted)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/deleted', fd)
}

function migration (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('bossId', params.bossId)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/migration', fd)
}
function updateCopyright (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('Copyright', params.Copyright)
  fd.append('bossId', params.bossId)
  fd.append('multipartFile', params.multipartFile)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/updateCopyright', fd)
}
function payment (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('appid', params.appid)
  fd.append('payKey', params.payKey)
  fd.append('lastModifier', params.lastModifier)
  fd.append('mchid', params.mchid)
  fd.append('miniappid', params.miniappid)
  fd.append('publicappid', params.publicappid)
  fd.append('userId', params.userId)
  // fd.append('id', params.id)
  fd.append('bossId', params.bossId)
  return Axios.post('/api/api/cart/PayBoss/payment', fd)
}
export default {
  AppletList: AppletList,
  AddApplet: AddApplet,
  updateApp: updateApp,
  deleted: deleted,
  migration: migration,
  updateCopyright: updateCopyright,
  payment: payment
}
