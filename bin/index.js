#!usr/bin/env node
require('dotenv').config()
const chalk = require('chalk')
const prompt = require('prompt-sync')()
const fetch = require('cross-fetch')
const cookie = require('cookie')
const { signUp, signIn } = require('../utils/auth-utils')
const { fetchRestaurants } = require('../utils/fetch-utils')

let cookieInfo = ''

async function loadPrompts() {
  console.log(
    chalk.underline.yellow("You must be hungry. Let's find you a restaurant!"),
  )
}

async function userPrompts() {
  const userExists = prompt('Do you have an account? (yes/no) ')
  if (userExists === 'yes') {
    const email = prompt(chalk.magenta('Enter email:'))
    const password = prompt.hide(
      chalk.magenta(
        "Enter password — and don't fret — it will be hidden (even from you!):",
      ),
    )
    const [cookieInfo, user] = await signIn(email, password)
    console.log(chalk.blue(`Welcome back, ${user.email}`))
  } else if (userExists === 'no') {
    const email = prompt(chalk.magenta('Enter email:'))
    const password = prompt.hide(
      chalk.magenta('Create spookily invisible password:'),
    )
    const [cookieInfo, user] = await signUp(email, password)
    console.log(chalk.blue(`Welcome to the party, ${user.email}`))
    return [cookieInfo, user]
  }
}

async function restaurantPrompts(cookieInfo) {
  const data = await fetchRestaurants(cookieInfo)

  console.log(chalk.underline.yellow('Here are some restaurants!'))
  console.log(data)
}

loadPrompts()
userPrompts()
restaurantPrompts(cookieInfo)
