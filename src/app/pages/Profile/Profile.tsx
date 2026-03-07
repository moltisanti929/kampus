import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Package, Heart, Settings } from 'lucide-react'
import { Trash } from 'lucide-react'
import { ProductCard } from '@/app/components/ProductCard'
import { useListings } from '@/app/hooks/useListings'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
import styles from './Profile.module.css'

interface MockAccount {
  email: string
  name: string
  password: string
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
  const { user } = useAuth()
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
  const isOwnProfile = viewedEmail ? viewedEmail === user.email : viewedName === user.name
  const userListings = listings.filter((l) => {
    if (viewedEmail && l.sellerId) {
      return l.sellerId === viewedEmail
    }
    return l.seller === viewedName
  })
  const savedListings = listings.filter(l => likedIds.includes(l.id))

  useEffect(() => {
    // Ensure we never stay on Saved when navigating to another user's profile.
    if (!isOwnProfile) {
      setActiveTab('listings')
      setSelectMode(false)
      setSelected([])
    }
  }, [isOwnProfile])

  const profileData = {
    name: viewedName,
    initials: getInitials(viewedName),
    email: viewedEmail,
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
        </div>
      </div>

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
                userListings.map((p, i) => (
                  <div key={p.id} style={{ position: 'relative' }}>
                    <ProductCard
                      product={p}
                      liked={isLiked(p.id)}
                      onToggleLike={toggle}
                      style={{ animationDelay: `${i * 0.05}s` }}
                      selectable={selectMode}
                      selected={selected.includes(p.id)}
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
              savedListings.map((p, i) => (
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
    </div>
  )
}
