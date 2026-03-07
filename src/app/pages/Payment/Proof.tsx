import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import styles from './Payment.module.css'

function formatMoney(amount: number) {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function Proof() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [countdown, setCountdown] = useState(8)

  const conversationId = searchParams.get('conversationId')
  const method = searchParams.get('method') || ''
  const cardLast4 = searchParams.get('cardLast4')
  const amountRaw = Number(searchParams.get('amount'))
  const amount = Number.isFinite(amountRaw) && amountRaw > 0 ? amountRaw : 0

  const ref = useMemo(
    () => `KMP-${Date.now().toString(36).toUpperCase().slice(-8)}`,
    []
  )

  useEffect(() => {
    if (countdown <= 0) {
      if (conversationId) navigate(`/messages?conversationId=${encodeURIComponent(String(conversationId))}`)
      return
    }
    const t = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, conversationId, navigate])

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Proof of transaction</p>
          <h1>Transaction complete</h1>
        </header>

        <div className={styles.proofIcon}>
          <CheckCircle size={48} strokeWidth={1.5} color="#16a34a" />
        </div>

        <div className={styles.summary}>
          <p>
            <span>Method</span>
            <strong>{method}</strong>
          </p>
          {cardLast4 && (
            <p>
              <span>Card</span>
              <strong>•••• {cardLast4}</strong>
            </p>
          )}
          <p>
            <span>Amount</span>
            <strong>{amount > 0 ? formatMoney(amount) : 'Not specified'}</strong>
          </p>
          <p>
            <span>Status</span>
            <strong className={styles.statusPaid}>Paid</strong>
          </p>
          <p>
            <span>Reference</span>
            <strong className={styles.refCode}>{ref}</strong>
          </p>
        </div>

        <p className={styles.redirectNote}>
          Redirecting to chat in <strong>{countdown}s</strong>…
        </p>

        <div className={styles.actionRow}>
          <button
            className={styles.confirmBtn}
            onClick={() => conversationId && navigate(`/messages?conversationId=${encodeURIComponent(String(conversationId))}`)}
          >
            Go to chat now
          </button>
        </div>
      </section>
    </div>
  )
}