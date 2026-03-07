import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Package, Heart, Settings, Wallet, Plus, X } from 'lucide-react'
import { Trash } from 'lucide-react'
import { ProductCard } from '@/app/components/ProductCard'
import { useListings } from '@/app/hooks/useListings'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
import styles from './Profile.module.css'

const WALLET_STORAGE_KEY = 'kampus_wallet_balances'

const BOOST_PLANS = [
  { id: '1d', label: '1 day (24hr.)', amount: 25 },
  { id: '3d', label: '3 days (72hr.)', amount: 60 },
  { id: '7d', label: '7 days (168hr.)', amount: 120 },
] as const

type BoostPlanId = (typeof BOOST_PLANS)[number]['id']

interface MockAccount {
  email: string
  name: string
  password: string
  year?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
  course?: 'BMMA - Animation' | 'BMMA - Graphic Design' | 'BMMA - Film' | 'BS - Entrep' | 'BSEMC' | 'BSCS' | 'BSIT'
}

const getMockAccounts = (): MockAccount[] => {
  try {
    const stored = localStorage.getItem('mock_accounts')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

type Tab = 'listings' | 'saved'

export default function Profile() {
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [walletBalance, setWalletBalance] = useState(0)
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpError, setTopUpError] = useState('')
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawError, setWithdrawError] = useState('')
  const [walletActionError, setWalletActionError] = useState('')
  const [isBoostOpen, setIsBoostOpen] = useState(false)
  const [boostTarget, setBoostTarget] = useState<{ id: number; title: string } | null>(null)
  const [selectedBoostPlan, setSelectedBoostPlan] = useState<BoostPlanId | ''>('')
  const [boostError, setBoostError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  const { profileKey } = useParams()
  const { listings, deleteListing } = useListings()
  const [activeTab, setActiveTab] = useState<Tab>('listings')
  const { isLiked, toggle, likedIds } = useWishlist()

  if (!user) {
    return <div className={styles.page}>Not logged in</div>
  }

  const key = profileKey ? decodeURIComponent(profileKey) : user.id
  const accounts = getMockAccounts()
  const accountById = accounts.find(a => a.email === key)
  const accountByName = accounts.find(a => a.name === key)
  const viewedAccount = accountById ?? accountByName
  const viewedName = viewedAccount?.name ?? (key === user.id ? user.name : key)
  const viewedEmail = viewedAccount?.email ?? (key === user.id ? user.email : undefined)
  const viewedYear = viewedAccount?.year ?? (key === user.id ? user.year : undefined)
  const viewedCourse = viewedAccount?.course ?? (key === user.id ? user.course : undefined)
  const isOwnProfile = viewedEmail ? viewedEmail === user.email : viewedName === user.name
  const userListings = listings.filter((l) => {
    if (viewedEmail && l.sellerId) {
      return l.sellerId === viewedEmail
    }
    return l.seller === viewedName
  })
  const savedListings = listings.filter(l => likedIds.includes(l.id))

  // Helper: sort by boost then recency
  const sortByBoostThenNew = (arr: typeof listings) => {
    try {
      const raw = localStorage.getItem('kampus_listing_boosts')
      const boosts = raw ? JSON.parse(raw) as Record<string, { expiresAt: number }> : {}
      const now = Date.now()
      return [...arr].sort((a, b) => {
        const aBoost = boosts[String(a.id)] && boosts[String(a.id)].expiresAt > now ? boosts[String(a.id)].expiresAt : 0
        const bBoost = boosts[String(b.id)] && boosts[String(b.id)].expiresAt > now ? boosts[String(b.id)].expiresAt : 0
        if (aBoost && bBoost) return bBoost - aBoost
        if (aBoost) return -1
        if (bBoost) return 1
        return Number(b.id) - Number(a.id)
      })
    } catch { return arr }
  }

  useEffect(() => {
    // Ensure we never stay on Saved when navigating to another user's profile.
    if (!isOwnProfile) {
      setActiveTab('listings')
      setSelectMode(false)
      setSelected([])
    }
  }, [isOwnProfile])

  useEffect(() => {
    if (!isOwnProfile) return

    try {
      const raw = localStorage.getItem(WALLET_STORAGE_KEY)
      const balances = raw ? (JSON.parse(raw) as Record<string, number>) : {}
      const nextBalance = balances[user.email]
      setWalletBalance(typeof nextBalance === 'number' && Number.isFinite(nextBalance) ? nextBalance : 0)
    } catch {
      setWalletBalance(0)
    }
  }, [isOwnProfile, user.email])

  const handleTopUpPay = () => {
    const amount = Number(topUpAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setTopUpError('Please enter an amount greater than 0.')
      return
    }

    const params = new URLSearchParams({
      mode: 'topup',
      amount: String(amount),
      itemTitle: 'K-Wallet Top-up',
      seller: 'Kampus',
      sellerId: 'kampus',
    })

    setTopUpError('')
    setIsTopUpOpen(false)
    setTopUpAmount('')
    navigate(`/payment?${params.toString()}`)
  }

  const handleBoostPay = () => {
    if (!boostTarget) return
    if (!selectedBoostPlan) {
      setBoostError('Please choose a boost plan.')
      return
    }

    const selectedPlan = BOOST_PLANS.find((plan) => plan.id === selectedBoostPlan)
    if (!selectedPlan) {
      setBoostError('Please choose a valid boost plan.')
      return
    }

    const params = new URLSearchParams({
      mode: 'boost',
      amount: String(selectedPlan.amount),
      boostDays: String(Number.parseInt(selectedPlan.id, 10)),
      itemTitle: `Boost: ${boostTarget.title} (${selectedPlan.label})`,
      seller: 'Kampus',
      sellerId: 'kampus',
      listingId: String(boostTarget.id),
    })

    setBoostError('')
    setIsBoostOpen(false)
    setSelectedBoostPlan('')
    setBoostTarget(null)
    navigate(`/payment?${params.toString()}`)
  }

  const handleOpenWithdraw = () => {
    if (walletBalance < 200) {
      setWalletActionError('Minimum wallet balance of ₱200 is required before withdrawing.')
      return
    }

    setWalletActionError('')
    setWithdrawError('')
    setWithdrawAmount('')
    setIsWithdrawOpen(true)
  }

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setWithdrawError('Please enter an amount greater than 0.')
      return
    }
    if (amount > walletBalance) {
      setWithdrawError('You cannot withdraw more than your current balance.')
      return
    }

    const nextBalance = walletBalance - amount
    try {
      const raw = localStorage.getItem(WALLET_STORAGE_KEY)
      const balances = raw ? (JSON.parse(raw) as Record<string, number>) : {}
      balances[user.email] = nextBalance
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(balances))
    } catch {
      setWithdrawError('Could not process withdraw. Please try again.')
      return
    }

    setWalletBalance(nextBalance)
    setIsWithdrawOpen(false)
    setWithdrawAmount('')
    setWithdrawError('')
  }

  const profileData = {
    name: viewedName,
    initials: getInitials(viewedName),
    email: viewedEmail,
    year: viewedYear,
    course: viewedCourse,
  }

  return (
    <div className={styles.page}>

      {/* Back nav */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to listings
        </Link>
        {isOwnProfile && (
          <button className={styles.settingsBtn}>
            <Settings size={16} />
            Settings
          </button>
        )}
      </div>

      {/* Profile header */}
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{profileData.initials}</div>
          {isOwnProfile && (
            <button className={styles.editAvatarBtn}>Edit</button>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{profileData.name}</h1>
            <span className={styles.profileStat}>{userListings.length} listing{userListings.length !== 1 ? 's' : ''}</span>
          </div>
          {profileData.email && (
            <p className={styles.email}>{profileData.email}</p>
          )}
          {(profileData.year || profileData.course) && (
            <div className={styles.metaRow}>
              {profileData.year && <span>{profileData.year}</span>}
              {profileData.course && <span>{profileData.course}</span>}
            </div>
          )}
        </div>
      </div>

      {isOwnProfile && (
        <section className={styles.walletCard}>
          <div className={styles.walletInfo}>
            <span className={styles.walletIconWrap}>
              <Wallet size={16} />
            </span>
            <div>
              <p className={styles.walletLabel}>K-Wallet</p>
              <p className={styles.walletAmount}>₱{walletBalance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className={styles.walletControls}>
            <div className={styles.walletActions}>
              <button
                type="button"
                className={styles.topUpTrigger}
                onClick={() => {
                  setWalletActionError('')
                  setTopUpError('')
                  setTopUpAmount('')
                  setIsTopUpOpen(true)
                }}
              >
                <Plus size={14} />
                Top up
              </button>
              <button type="button" className={styles.withdrawBtn} onClick={handleOpenWithdraw}>
                Withdraw
              </button>
            </div>
            {walletActionError && <p className={styles.walletActionError}>{walletActionError}</p>}
          </div>
        </section>
      )}

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'listings' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          <Package size={15} />
          {isOwnProfile ? 'My Listings' : 'Listings'}
        </button>
        {isOwnProfile && (
          <button
            className={`${styles.tab} ${activeTab === 'saved' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart size={15} />
            Saved
          </button>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'listings' && (
          <>
            {isOwnProfile && (
              <div className={styles.newListingBanner} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <p>Got something to sell?</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Link to="/create-listing" className={styles.newListingBtn}>+ Post a listing</Link>
                    {!selectMode ? (
                      <button
                        className={styles.trashBtn}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fff', border: '1px solid #eee', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}
                        onClick={() => setSelectMode(true)}
                      >
                        <Trash size={18} color="#e53935" />
                      </button>
                    ) : (
                      <button
                        className={styles.deleteBtn}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: 'pointer' }}
                        onClick={() => {
                          if (selected.length === 0) {
                            setSelectMode(false)
                            return
                          }
                          if (window.confirm('Are you sure you want to delete these items?')) {
                            selected.forEach(id => deleteListing(id))
                            setSelected([])
                            setSelectMode(false)
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className={styles.grid}>
              {userListings.length > 0 ? (
                sortByBoostThenNew(userListings).map((p, i) => (
                  <div key={p.id} style={{ position: 'relative' }}>
                    <ProductCard
                      product={p}
                      liked={isLiked(p.id)}
                      onToggleLike={toggle}
                      style={{ animationDelay: `${i * 0.05}s` }}
                      selectable={selectMode}
                      selected={selected.includes(p.id)}
                      showBoost={isOwnProfile && !selectMode}
                      onBoostClick={() => {
                        setBoostTarget({ id: p.id, title: p.title })
                        setSelectedBoostPlan('')
                        setBoostError('')
                        setIsBoostOpen(true)
                      }}
                      onSelect={() => {
                        if (selected.includes(p.id)) {
                          setSelected(prev => prev.filter(id => id !== p.id))
                        } else {
                          setSelected(prev => [...prev, p.id])
                        }
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.empty}>
                  <Package size={32} strokeWidth={1.5} />
                  <p>No listings yet.</p>
                  {isOwnProfile ? <Link to="/create-listing">Post a listing</Link> : <Link to="/">Browse listings</Link>}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'saved' && (
          <div className={styles.grid}>
            {savedListings.length > 0 ? (
              sortByBoostThenNew(savedListings).map((p, i) => (
                <div key={p.id} style={{ position: 'relative' }}>
                  <ProductCard
                    product={p}
                    liked={isLiked(p.id)}
                    onToggleLike={toggle}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  />
                </div>
              ))
            ) : (
              <div className={styles.empty}>
                <Heart size={32} strokeWidth={1.5} />
                <p>No saved listings yet.</p>
                <Link to="/">Browse listings</Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isTopUpOpen && (
        <div className={styles.topUpOverlay} onClick={() => setIsTopUpOpen(false)}>
          <div className={styles.topUpModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.topUpHeader}>
              <h3>Top up K-Wallet</h3>
              <button
                type="button"
                className={styles.topUpClose}
                onClick={() => setIsTopUpOpen(false)}
                aria-label="Close top-up modal"
              >
                <X size={14} />
              </button>
            </div>

            <label className={styles.topUpField}>
              Amount
              <input
                type="number"
                min="0"
                step="0.01"
                value={topUpAmount}
                onChange={(event) => {
                  setTopUpAmount(event.target.value)
                  if (topUpError) setTopUpError('')
                }}
                placeholder="Enter amount"
              />
            </label>

            {topUpError && <p className={styles.topUpError}>{topUpError}</p>}

            <div className={styles.topUpActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setIsTopUpOpen(false)
                  setTopUpError('')
                }}
              >
                Cancel
              </button>
              <button type="button" className={styles.payBtn} onClick={handleTopUpPay}>
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {isBoostOpen && boostTarget && (
        <div
          className={styles.topUpOverlay}
          onClick={() => {
            setIsBoostOpen(false)
            setBoostError('')
          }}
        >
          <div className={styles.topUpModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.topUpHeader}>
              <h3>Boost posting</h3>
              <button
                type="button"
                className={styles.topUpClose}
                onClick={() => {
                  setIsBoostOpen(false)
                  setBoostError('')
                }}
                aria-label="Close boost modal"
              >
                <X size={14} />
              </button>
            </div>

            <p className={styles.boostTarget}>{boostTarget.title}</p>

            <div className={styles.planList}>
              {BOOST_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={`${styles.planBtn} ${selectedBoostPlan === plan.id ? styles.planBtnActive : ''}`}
                  onClick={() => {
                    setSelectedBoostPlan(plan.id)
                    if (boostError) setBoostError('')
                  }}
                >
                  <span>{plan.label}</span>
                  <strong>₱{plan.amount}</strong>
                </button>
              ))}
            </div>

            {boostError && <p className={styles.topUpError}>{boostError}</p>}

            <div className={styles.topUpActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setIsBoostOpen(false)
                  setBoostError('')
                }}
              >
                Cancel
              </button>
              <button type="button" className={styles.payBtn} onClick={handleBoostPay}>
                Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {isWithdrawOpen && (
        <div
          className={styles.topUpOverlay}
          onClick={() => {
            setIsWithdrawOpen(false)
            setWithdrawError('')
          }}
        >
          <div className={styles.topUpModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.topUpHeader}>
              <h3>Withdraw from K-Wallet</h3>
              <button
                type="button"
                className={styles.topUpClose}
                onClick={() => {
                  setIsWithdrawOpen(false)
                  setWithdrawError('')
                }}
                aria-label="Close withdraw modal"
              >
                <X size={14} />
              </button>
            </div>

            <label className={styles.topUpField}>
              Amount
              <input
                type="number"
                min="0"
                step="0.01"
                value={withdrawAmount}
                onChange={(event) => {
                  setWithdrawAmount(event.target.value)
                  if (withdrawError) setWithdrawError('')
                }}
                placeholder="Enter amount"
              />
            </label>

            {withdrawError && <p className={styles.topUpError}>{withdrawError}</p>}

            <div className={styles.topUpActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setIsWithdrawOpen(false)
                  setWithdrawError('')
                }}
              >
                Cancel
              </button>
              <button type="button" className={styles.payBtn} onClick={handleWithdraw}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
