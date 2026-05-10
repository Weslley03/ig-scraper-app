import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { errorStyle, inputStyle, labelStyle } from '../../styles/inputStyle'
import { loginSchema } from '../../schemas/loginSchema'
import type z from 'zod'

type FormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const authLogin = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: FormData) {
    setFormError(null)
    try {
      await authLogin(data)
      navigate('/analyze')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro desconhecido.')
    }
  }

  return (
    <>
      <h1
        style={{
          fontSize: 18,
          fontWeight: 600,
          margin: '0 0 6px',
          color: 'var(--color-text-primary)',
        }}
      >
        Entrar
      </h1>
      <p
        style={{
          fontSize: 13,
          color: 'var(--color-text-muted)',
          margin: '0 0 24px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Entre com seu email e senha para continuar.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <div>
          <label style={labelStyle}>email</label>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            style={inputStyle(!!errors.email)}
          />
          {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
        </div>

        <div>
          <label style={labelStyle}>senha</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              {...register('password')}
              style={{ ...inputStyle(!!errors.password), padding: '9px 36px 9px 12px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'var(--color-text-muted)',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1,
                opacity: 0.6,
              }}
            >
              {showPassword ? 'ocultar' : 'ver'}
            </button>
          </div>
          {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
        </div>

        {formError && <span style={errorStyle}>{formError}</span>}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '9px 16px',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '.05em',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: 4,
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          acessar →
        </button>
      </form>

      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px dashed var(--color-border-default)',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--color-text-muted)',
          }}
        >
          não tem conta?{' '}
          <span
            style={{
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={onSwitchToRegister}
          >
            cadastre-se
          </span>
        </span>
      </div>
    </>
  )
}
