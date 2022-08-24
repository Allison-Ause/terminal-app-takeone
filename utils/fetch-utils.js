const fetch = require('cross-fetch')
const cookie = require('cookie')

async function fetchRestaurants(userCookie) {
  const res = await fetch(`${process.env.API_URL}/api/v1/restaurants`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: cookie.serialize('session', userCookie.session),
    },
    credentials: 'include',
  })

  const data = await res.json()
  if (res.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
}

module.exports = { fetchRestaurants }
