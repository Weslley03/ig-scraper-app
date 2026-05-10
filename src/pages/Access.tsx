import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrowserWindow from '../components/BrowserWindow'
import LoginForm from '../components/access/LoginForm'
import RegisterForm from '../components/access/RegisterForm'

type Mode = 'login' | 'register'

export default function Access() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <BrowserWindow url="ig-comments-analyzer.app/access" maxWidth={440}>
        <div style={{ padding: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 32,
              justifyContent: 'center',
            }}
          >
            <div
              style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--color-primary)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              ig·comments·analyzer
            </span>
          </div>

          {mode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} />
          )}

          <div
            style={{
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              ← voltar para o início
            </span>
          </div>
        </div>
      </BrowserWindow>
    </div>
  )
}
