const http = require('https')
const fetch = require('node-fetch')

const { PAPI_ENDPOINT, PAPI_CLIENT_ID, PAPI_CLIENT_SECRET, TODOAPP_HOST } = process.env


exports.buildLoginUrl = function buildLoginUrl() {
  const url = new URL(`${PAPI_ENDPOINT}/dialog/`)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', 'tasks')
  url.searchParams.append('client_id', PAPI_CLIENT_ID)
  url.searchParams.append('redirect_uri', `${TODOAPP_HOST}/auth/callback`)
  return url.toString()
}

exports.getPapiToken = function getPapiToken(code) {
  const body = new URLSearchParams()
  body.append('client_id', PAPI_CLIENT_ID)
  body.append('client_secret', PAPI_CLIENT_SECRET)
  body.append('grant_type', 'authorization_code')
  body.append('redirect_uri', `${TODOAPP_HOST}/auth/callback`)
  body.append('code', code)

  return fetch(`${PAPI_ENDPOINT}/auth/token`, {
    method: 'POST',
    body,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    },
  }).then(handleResponse)
}

exports.getPapiTasks = function getPapiTasksStream(token) {
  return fetch(`${PAPI_ENDPOINT}/v1/task`, {
    method: 'GET',
    headers: headers(token),
  }).then(handleResponse)
}

exports.postPapiTask = function postPapiTask(token, task) {
  return fetch(`${PAPI_ENDPOINT}/v1/task`, {
    method: 'POST',
    headers: headers(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(task)
  }).then(handleResponse)
}

exports.putPapiTask = function putPapiTask(token, pkey, task) {
  return fetch(`${PAPI_ENDPOINT}/v1/task/${pkey}`, {
    method: 'PUT',
    headers: headers(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(task)
  }).then(handleResponse)
}

exports.deletePapiTask = function deletePapiTask(token, pkey) {
  return fetch(`${PAPI_ENDPOINT}/v1/task/${pkey}`, {
    method: 'DELETE',
    headers: headers(token, { 'Content-Type': 'application/json' })
  }).then(handleResponse)
}


function headers(token, custom = {}) {
  return {
    'Host': new URL(PAPI_ENDPOINT).host,
    'Authorization': `Bearer ${token}`,
    'X-App-Secret': PAPI_CLIENT_SECRET,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
    ...custom,
  }
}

function handleResponse(res) {
  if (res.status < 300) return res.json()
  return res.text().then(err => {
    console.error(err)
    throw err
  })
}