// form context styles.

export const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '9px 12px',
  background: 'var(--color-bg-secondary)',
  border: `1px dashed ${hasError ? 'var(--color-danger)' : 'var(--color-border-default)'}`,
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  color: 'var(--color-text-primary)',
  outline: 'none',
  boxSizing: 'border-box',
})

export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  marginBottom: 6,
}

export const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--color-danger)',
  marginTop: 4,
  display: 'block',
}
