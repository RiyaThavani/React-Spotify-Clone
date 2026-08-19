const ACCOUNTS_KEY = 'spotify-accounts'

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const getAccounts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY))
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

const saveAccounts = accounts => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function registerUser({ username, name, email, password }) {
  const cleanedUsername = username.trim()
  const cleanedName = name.trim()
  const cleanedEmail = email.trim().toLowerCase()
  const accounts = getAccounts()

  if (cleanedUsername.length < 3) {
    throw new Error('Username must be at least 3 characters.')
  }
  if (!/^[a-zA-Z0-9_]+$/.test(cleanedUsername)) {
    throw new Error('Username can only contain letters, numbers and underscores.')
  }
  if (cleanedName.length < 2) {
    throw new Error('Full name must be at least 2 characters.')
  }
  if (!isValidEmail(cleanedEmail)) {
    throw new Error('Enter a valid email address.')
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }
  if (accounts.some(account => (account.username || '').toLowerCase() === cleanedUsername.toLowerCase())) {
    throw new Error('This username is already taken.')
  }
  if (accounts.some(account => account.email === cleanedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const user = { username: cleanedUsername, name: cleanedName, email: cleanedEmail, avatar: null }
  accounts.push({ ...user, password })
  saveAccounts(accounts)
  return user
}

export function authenticateUser({ username, email, password }) {
  const cleanedUsername = username.trim().toLowerCase()
  const cleanedEmail = email.trim().toLowerCase()
  const accounts = getAccounts()

  const account =
    accounts.find(
      item =>
        (item.username || '').toLowerCase() === cleanedUsername &&
        item.email === cleanedEmail
    ) ||
    accounts.find(item => item.email === cleanedEmail && !item.username) ||
    accounts.find(
      item =>
        (item.username || '').toLowerCase() === cleanedUsername &&
        item.password === password
    )

  if (!account || account.password !== password) {
    throw new Error('Invalid username, email, or password.')
  }

  return {
    username: account.username || null,
    name: account.name,
    email: account.email,
    avatar: account.avatar || null,
  }
}