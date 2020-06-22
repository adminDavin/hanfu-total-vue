/* eslint-disable require-jsdoc */
import Axios from 'axios'

function AddSass (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('password', params.password)
  fd.append('accountCode', params.accountCode)
  fd.append('accountType', params.accountType)
  fd.append('sumUniApp', params.sumUniApp)
  fd.append('sumMiniProgram', params.sumMiniProgram)
  fd.append('sumWeb', params.sumWeb)
  fd.append('lastModifier', params.lastModifier)
  fd.append('accountAttribute', params.accountAttribute)
  fd.append('valid', params.valid)
  fd.append('username', params.username)
  return Axios.post('/api/api/user/hf-auth/AddSass', fd)
}

function SassMessage (id) {
  console.log(id)
  return Axios.get('/api/api/user/hf-auth/SassMessage?accountId=' + id)
}

function SassList (params) {
  console.log(params)
  return Axios.get('/api/api/user/hf-auth/SassList', { params })
}

function updatePhone (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('authKey', params.authKey)
  fd.append('passwd', params.passwd)
  return Axios.post('/api/api/user/hf-auth/updatePhone', fd)
}

function deletedSass (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('AccountId', params.AccountId)
  fd.append('isDeleted', params.isDeleted)
  return Axios.post('/api/api/user/hf-auth/deletedSass', fd)
}
export default {
  AddSass: AddSass,
  SassMessage: SassMessage,
  updatePhone: updatePhone,
  SassList: SassList,
  deletedSass: deletedSass
}
