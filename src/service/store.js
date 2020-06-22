/* eslint-disable require-jsdoc */
import store from '@/api/store-api.js'

async function AppletList (params, handleResult) {
  store.AppletList(params).then((res) => handleResult(res))
}

async function AddApplet (params, handleResult) {
  store.AddApplet(params).then((res) => handleResult(res))
}
async function updateApp (params, handleResult) {
  store.updateApp(params).then((res) => handleResult(res))
}
async function deleted (params, handleResult) {
  store.deleted(params).then((res) => handleResult(res))
}
async function migration (params, handleResult) {
  store.migration(params).then((res) => handleResult(res))
}
async function updateCopyright (params, handleResult) {
  store.updateCopyright(params).then((res) => handleResult(res))
}
async function payment (params, handleResult) {
  store.payment(params).then((res) => handleResult(res))
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
