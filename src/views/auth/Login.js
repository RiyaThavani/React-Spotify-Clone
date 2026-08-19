import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell, { AuthField } from './AuthShell'
import { setUser } from 'stores/auth'
import { authenticateUser } from 'services/authService'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  if (user) return null

  const update = key => event => {
    setForm(prev => ({ ...prev, [key]: event.target.value }))
    setError('')
    setFieldErrors({})
  }

  const validateFields = () => {
    const errors = {}
    if (!form.username.trim()) {
      errors.username = 'Username is required.'
    } else if (form.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username.trim())) {
      errors.username = 'Username can only contain letters, numbers and underscores.'
    }
    if (!form.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    if (!form.password) {
      errors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})

    if (!validateFields()) {
      setLoading(false)
      return
    }

    try {
      const loggedIn = authenticateUser({
        username: form.username,
        email: form.email,
        password: form.password,
      })
      dispatch(setUser(loggedIn))
    } catch (err) {
      setError(err.message)
      setFieldErrors({
        username: 'Incorrect username.',
        email: 'Incorrect email.',
        password: 'Incorrect password.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Log In"
      subtitle="Log in to keep listening"
      submitLabel={loading ? 'Logging In…' : 'Log In'}
      onSubmit={handleSubmit}
      onCancel={() => { setForm({ username: '', email: '', password: '' }); setError(''); setFieldErrors({}); setLoading(false) }}
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-white underline hover:text-primary">
            Sign Up
          </Link>
        </>
      }
    >
      {error && <p className="text-sm text-red-400">{error}</p>}
      <AuthField
        label="Username"
        type="text"
        autoComplete="username"
        placeholder="your_username"
        value={form.username}
        onChange={update('username')}
        error={fieldErrors.username}
      />
      <AuthField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={update('email')}
        error={fieldErrors.email}
      />
      <AuthField
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.password}
        onChange={update('password')}
        error={fieldErrors.password}
      />
    </AuthShell>
  )
}

export default Login