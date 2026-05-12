import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const toggleMode = () => {
    setError('')
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (email == "admin@gmail.com" && password == "admin123") {
        navigation('/admin');
    } else {
        setError("You are not an admin");
    }
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={onSubmit} style={{ width: 360, padding: 24, border: '1px solid #eee', borderRadius: 12, background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{mode === 'login' ? 'Login' : 'Register'}</h2>
          <button type="button" onClick={toggleMode} style={{ background: 'transparent', border: 'none', color: '#ff7f50', cursor: 'pointer' }}>
            {mode === 'login' ? 'Create account' : 'Have an account? Login'}
          </button>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {mode === 'register' && (
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: 6 }}>Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input id="showPassword" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
          <label htmlFor="showPassword" style={{ cursor: 'pointer' }}>Show password</label>
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', background: '#ff7f50', color: '#fff', cursor: 'pointer' }}>
          {loading ? 'Please wait...' : 'Register/Login'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin


