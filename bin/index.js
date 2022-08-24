#!usr/bin/env node
require('dotenv').config()
const chalk = require('chalk')
const prompt = require('prompt-sync')()
const fetch = require('cross-fetch')
const cookie = require('cookie')
const { loadUser } = require('../utils/auth-utils')
const { fetchRestaurants } = require('../utils/fetch-utils')

async function loadPrompts() {
  console.log(
    chalk.underline.yellow("You must be hungry. Let's find you a restaurant!"),
  )
  console.log(chalk.cyan('Login to your account:'))
  const email = prompt(chalk.magenta('Enter email:'))
  const password = prompt.hide(
    chalk.magenta(
      "Enter password — and don't fret — it will be hidden (even from you!):",
    ),
  )

  const [cookieInfo, user] = await loadUser(email, password)

  console.log(chalk.blue(`Welcome back, ${user.email}`))

  const data = await fetchRestaurants(cookieInfo)

  console.log(chalk.underline.yellow('Here are some restaurants!'))
  console.log(data)
}

loadPrompts()
