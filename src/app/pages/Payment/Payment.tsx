import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CreditCard, QrCode, Wallet } from 'lucide-react'
import qrPlaceholder from '@/assets/qrph-placeholder.svg'
import { useAuth } from '@/hooks/useAuth'
import styles from './Payment.module.css'

type PaymentMethod = 'cash' | 'card' | 'qrph'

const WALLET_STORAGE_KEY = 'kampus_wallet_balances'
const BOOST_STORAGE_KEY = 'kampus_listing_boosts'

function formatMoney(amount: number) {
    return `₱${amount.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

const PAYMENT_METHODS: Array<{
    id: PaymentMethod
    label: string
    subtitle: string
    icon: typeof Wallet
}> = [
        {
            id: 'cash',
            label: 'Cash',
            subtitle: 'Pay in person during meetup',
            icon: Wallet,
        },
        {
            id: 'card',
            label: 'Debit / Credit Card',
            subtitle: 'Visa, Mastercard, and more',
            icon: CreditCard,
        },
        {
            id: 'qrph',
            label: 'QRPH',
            subtitle: 'Scan and pay via local e-wallet app',
            icon: QrCode,
        },
    ]

export default function Payment() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const isTopUpMode = mode === 'topup'
    const isBoostMode = mode === 'boost'
    const requiresOnlineMethods = isTopUpMode || isBoostMode
    const showBackButton = isTopUpMode
    const itemTitle =
        searchParams.get('itemTitle') ||
        (isTopUpMode ? 'K-Wallet Top-up' : isBoostMode ? 'Listing boost' : 'Listing')
    const seller = requiresOnlineMethods ? 'Kampus' : searchParams.get('seller') || 'Seller'
    const amountRaw = Number(searchParams.get('amount'))
    const amount = Number.isFinite(amountRaw) && amountRaw > 0 ? amountRaw : 0
    const listingIdRaw = Number(searchParams.get('listingId'))
    const boostDaysRaw = Number(searchParams.get('boostDays'))

    const availableMethods = useMemo(
        () =>
            requiresOnlineMethods
                ? PAYMENT_METHODS.filter((method) => method.id === 'card' || method.id === 'qrph')
                : PAYMENT_METHODS,
        [requiresOnlineMethods]
    )

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(requiresOnlineMethods ? 'card' : 'cash')
    const [cardType, setCardType] = useState('Visa')
    const [cardName, setCardName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const [confirmSuccess, setConfirmSuccess] = useState('')

    useEffect(() => {
        if (availableMethods.some((method) => method.id === selectedMethod)) return
        const fallback = availableMethods[0]?.id
        if (fallback) {
            setSelectedMethod(fallback)
        }
    }, [availableMethods, selectedMethod])

    const selectedLabel = useMemo(
        () => availableMethods.find((method) => method.id === selectedMethod)?.label || availableMethods[0]?.label || '',
        [availableMethods, selectedMethod]
    )

    const handleConfirm = () => {
        setConfirmError('')
        setConfirmSuccess('')

        if (selectedMethod !== 'qrph') {
            setConfirmError('Devtool Confirm currently works only for QRPH.')
            return
        }

        if (isTopUpMode) {
            if (!user) {
                setConfirmError('You must be logged in to top up K-Wallet.')
                return
            }
            if (amount <= 0) {
                setConfirmError('Invalid top-up amount.')
                return
            }

            try {
                const raw = localStorage.getItem(WALLET_STORAGE_KEY)
                const balances = raw ? (JSON.parse(raw) as Record<string, number>) : {}
                const current = typeof balances[user.email] === 'number' ? balances[user.email] : 0
                balances[user.email] = current + amount
                localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(balances))
            } catch {
                setConfirmError('Could not update K-Wallet balance.')
                return
            }

            setConfirmSuccess(`Added ${formatMoney(amount)} to your K-Wallet.`)
            navigate('/profile')
            return
        }

        if (isBoostMode) {
            if (!Number.isFinite(listingIdRaw) || listingIdRaw <= 0) {
                setConfirmError('Invalid listing target for boost.')
                return
            }

            const boostDays = Number.isFinite(boostDaysRaw) && boostDaysRaw > 0 ? boostDaysRaw : 1
            const dayMs = 24 * 60 * 60 * 1000

            try {
                const raw = localStorage.getItem(BOOST_STORAGE_KEY)
                const boosts = raw
                    ? (JSON.parse(raw) as Record<string, { expiresAt: number; amount: number; planDays: number; paidAt: number; method: string }>)
                    : {}

                const key = String(listingIdRaw)
                const current = boosts[key]
                const now = Date.now()
                const startsAt = current && current.expiresAt > now ? current.expiresAt : now
                const expiresAt = startsAt + boostDays * dayMs

                boosts[key] = {
                    expiresAt,
                    amount,
                    planDays: boostDays,
                    paidAt: now,
                    method: 'qrph',
                }

                localStorage.setItem(BOOST_STORAGE_KEY, JSON.stringify(boosts))
            } catch {
                setConfirmError('Could not apply listing boost.')
                return
            }

            setConfirmSuccess(`Boost activated for ${boostDays} day${boostDays === 1 ? '' : 's'}.`)
            navigate('/profile')
            return
        }

        setConfirmSuccess('QRPH payment confirmed (devtool).')
    }

    return (
        <div className={styles.page}>
            {showBackButton && (
                <div className={styles.topBar}>
                    <Link to="/profile" className={styles.backBtn}>
                        <ArrowLeft size={16} />
                        Back to profile
                    </Link>
                </div>
            )}

            <section className={styles.card}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>Payment</p>
                    <h1>Choose payment method</h1>
                </header>

                <div className={styles.summary}>
                    <p>
                        <span>Item</span>
                        <strong>{itemTitle}</strong>
                    </p>
                    <p>
                        <span>Seller</span>
                        <strong>{seller}</strong>
                    </p>
                    <p>
                        <span>Total Amount</span>
                        <strong>{amount > 0 ? formatMoney(amount) : 'Not specified'}</strong>
                    </p>
                </div>

                <div className={styles.methods}>
                    {availableMethods.map((method) => {
                        const Icon = method.icon
                        const isActive = selectedMethod === method.id
                        return (
                            <button
                                type="button"
                                key={method.id}
                                className={`${styles.methodBtn} ${isActive ? styles.methodBtnActive : ''}`}
                                onClick={() => setSelectedMethod(method.id)}
                            >
                                <span className={styles.methodIcon}>
                                    <Icon size={18} />
                                </span>
                                <span className={styles.methodText}>
                                    <strong>{method.label}</strong>
                                    <small>{method.subtitle}</small>
                                </span>
                            </button>
                        )
                    })}
                </div>

                {selectedMethod === 'card' && (
                    <div className={styles.dropdownPanel}>
                        <p className={styles.dropdownTitle}>Card details</p>
                        <div className={styles.fieldGrid}>
                            <label className={styles.field}>
                                Card type
                                <select value={cardType} onChange={(event) => setCardType(event.target.value)}>
                                    <option value="Visa">Visa</option>
                                    <option value="Mastercard">Mastercard</option>
                                    <option value="JCB">JCB</option>
                                    <option value="AMEX">American Express</option>
                                </select>
                            </label>
                            <label className={styles.field}>
                                Name on card
                                <input
                                    type="text"
                                    value={cardName}
                                    onChange={(event) => setCardName(event.target.value)}
                                    placeholder="Juan Dela Cruz"
                                />
                            </label>
                            <label className={styles.fieldWide}>
                                Card number
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(event) => setCardNumber(event.target.value)}
                                    placeholder="1234 5678 9012 3456"
                                />
                            </label>
                            <label className={styles.field}>
                                Expiry
                                <input
                                    type="text"
                                    value={cardExpiry}
                                    onChange={(event) => setCardExpiry(event.target.value)}
                                    placeholder="MM/YY"
                                />
                            </label>
                            <label className={styles.field}>
                                CVV
                                <input
                                    type="password"
                                    value={cardCvv}
                                    onChange={(event) => setCardCvv(event.target.value)}
                                    placeholder="123"
                                />
                            </label>
                        </div>
                    </div>
                )}

                {selectedMethod === 'qrph' && (
                    <div className={styles.dropdownPanel}>
                        <p className={styles.dropdownTitle}>QRPH placeholder</p>
                        <img src={qrPlaceholder} alt="QRPH placeholder" className={styles.qrImage} />
                    </div>
                )}

                <div className={styles.footerNote}>
                    Selected method: <strong>{selectedLabel}</strong>
                </div>

                <div className={styles.actionRow}>
                    <button type="button" className={styles.confirmBtn} onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>

                {confirmError && <p className={styles.confirmError}>{confirmError}</p>}
                {confirmSuccess && <p className={styles.confirmSuccess}>{confirmSuccess}</p>}
            </section>
        </div>
    )
}
