import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell, { AuthField } from './AuthShell'
import { setUser } from 'stores/auth'
import { registerUser } from 'services/authService'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
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
    setFieldErrors(prev => ({ ...prev, [key]: '' }))
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
    if (!form.name.trim()) {
      errors.name = 'Full name is required.'
    } else if (form.name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters.'
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
    if (!form.confirm) {
      errors.confirm = 'Please confirm your password.'
    } else if (form.password !== form.confirm) {
      errors.confirm = 'Passwords do not match.'
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
      const newUser = registerUser({
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
      })
      dispatch(setUser(newUser))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Sign Up"
      subtitle="Start enjoying your music"
      submitLabel={loading ? 'Signing Up…' : 'Sign Up'}
      onSubmit={handleSubmit}
      onCancel={() => { setForm({ username: '', name: '', email: '', password: '', confirm: '' }); setError(''); setFieldErrors({}); setLoading(false) }}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-white underline hover:text-primary">
            Log In
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
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Your full name"
        value={form.name}
        onChange={update('name')}
        error={fieldErrors.name}
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
        autoComplete="new-password"
        placeholder="At least 6 characters"
        value={form.password}
        onChange={update('password')}
        error={fieldErrors.password}
      />
      <AuthField
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        value={form.confirm}
        onChange={update('confirm')}
        error={fieldErrors.confirm}
      />
    </AuthShell>
  )
}

export default Signup