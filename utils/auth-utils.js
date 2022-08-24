const fetch = require('cross-fetch')
const cookie = require('cookie')

async function signUp(email, password) {
  const res = await fetch(`${process.env.API_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  const cookieInfo = cookie.parse(res.headers.raw()['set-cookie'][0])
  const user = await res.json()
  return [cookieInfo, user]
}

async function signIn(email, password) {
  const res = await fetch(`${process.env.API_URL}/api/v1/users/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  const cookieInfo = cookie.parse(res.headers.raw()['set-cookie'][0])
  const user = await res.json()
  return [cookieInfo, user]
}

module.exports = { signUp, signIn }
