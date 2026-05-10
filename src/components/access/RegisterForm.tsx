import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { errorStyle, inputStyle, labelStyle } from '../../styles/inputStyle'
import { registerSchema } from '../../schemas/registerSchema'
import type z from 'zod'

type FormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const authRegister = useAuthStore((s) => s.register)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: FormData) {
    setFormError(null)
    try {
      await authRegister({ name: data.name, email: data.email, password: data.password })
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
        Cadastro
      </h1>
      <p
        style={{
          fontSize: 13,
          color: 'var(--color-text-muted)',
          margin: '0 0 24px',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Crie sua conta para começar a usar.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <div>
          <label style={labelStyle}>nome</label>
          <input
            type="text"
            placeholder="seu nome"
            {...register('name')}
            style={inputStyle(!!errors.name)}
          />
          {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
        </div>

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
              placeholder="mín. 8 caracteres"
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

        <div>
          <label style={labelStyle}>confirmar senha</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••••••"
              {...register('confirmPassword')}
              style={{ ...inputStyle(!!errors.confirmPassword), padding: '9px 36px 9px 12px' }}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
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
              {showConfirm ? 'ocultar' : 'ver'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span style={errorStyle}>{errors.confirmPassword.message}</span>
          )}
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
          criar conta →
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
          já tem conta?{' '}
          <span
            style={{
              color: 'var(--color-primary)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={onSwitchToLogin}
          >
            entrar
          </span>
        </span>
      </div>
    </>
  )
}
