import z from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'nome obrigatório'),
    email: z.string().email('email inválido'),
    password: z
      .string()
      .min(8, 'mínimo 8 caracteres')
      .regex(/[A-Z]/, 'deve conter ao menos uma letra maiúscula')
      .regex(/[0-9]/, 'deve conter ao menos um número'),
    confirmPassword: z.string().min(1, 'confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'senhas não coincidem',
    path: ['confirmPassword'],
  })
