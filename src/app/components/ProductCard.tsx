import { Heart, ArrowRight, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import type { Product } from '@/data/products'
import styles from './ProductCard.module.css'

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial,sans-serif" font-size="24">No image</text></svg>'
const BOOST_STORAGE_KEY = 'kampus_listing_boosts'

function getBoostDaysLeft(listingId: number) {
  try {
    const raw = localStorage.getItem(BOOST_STORAGE_KEY)
    if (!raw) return 0

    const parsed = JSON.parse(raw) as Record<string, { expiresAt?: number }>
    const boost = parsed[String(listingId)]
    if (!boost || typeof boost.expiresAt !== 'number') return 0

    const remainingMs = boost.expiresAt - Date.now()
    if (remainingMs <= 0) return 0

    const dayMs = 24 * 60 * 60 * 1000
    return Math.ceil(remainingMs / dayMs)
  } catch {
    return 0
  }
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget
  if (target.src !== FALLBACK_IMAGE) {
    target.src = FALLBACK_IMAGE
  }
}

interface ProductCardProps {
  product: Product
  liked: boolean
  onToggleLike: (id: number) => void
  style?: React.CSSProperties
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
  showBoost?: boolean
  onBoostClick?: (id: number) => void
}

const BADGE_CLASS: Record<string, string> = {
  'New': styles.badgeNew,
  'Like New': styles.badgeLikeNew,
  'Good': styles.badgeGood,
  'Used': styles.badgeUsed,
}

function formatPrice(price: number) {
  return '₱' + price.toLocaleString('en-PH', {
    minimumFractionDigits: price % 1 !== 0 ? 2 : 0,
  })
}

export function ProductCard({ product, liked, onToggleLike, style }: ProductCardProps) {
  const navigate = useNavigate()
  const { id, title, price, image, category, seller, condition } = product
  // Destructure new props
  const { selectable, selected, onSelect, showBoost, onBoostClick } = arguments[0]
  const boostDaysLeft = getBoostDaysLeft(id)
  const isBoosted = boostDaysLeft > 0
  const { user } = useAuth()
  const canSeeBoostDetails = Boolean(user && (user.email === product.sellerId || user.name === product.seller))

  const cardClass = `${styles.card}${isBoosted ? ' ' + styles.boosted : ''}${selected ? ' ' + styles.selected : ''}`

  if (selectable) {
    return (
      <div className={cardClass} style={style} onClick={onSelect}>
        {/* Image */}
        <div className={styles.imageWrap}>
          <img src={image} alt={title} loading="lazy" className={styles.image} onError={handleImageError} />
          {condition && (
            <span className={`${styles.badge} ${BADGE_CLASS[condition] ?? ''}`}>{condition}</span>
          )}
          <button
            className={`${styles.wishBtn} ${liked ? styles.liked : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleLike(id) }}
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={15} />
          </button>
          {isBoosted && (
            <span className={styles.boostIndicator} title="Boosted" aria-hidden>
              <TrendingUp size={14} color="#10b981" />
            </span>
          )}
        </div>
        {/* Body */}
        <div className={styles.body}>
          <span className={styles.category}>{category}</span>
          <p className={styles.title}>{title}</p>
          <p className={styles.seller}>by <span>{seller}</span></p>
          {isBoosted && canSeeBoostDetails && (
            <p className={styles.boostMeta}>
              Boosted {boostDaysLeft} day{boostDaysLeft === 1 ? '' : 's'} left
            </p>
          )}
          <div className={styles.footer}>
            <span className={styles.price}>{formatPrice(price)}</span>
            <div className={styles.actionGroup}>
              {showBoost && onBoostClick && (
                <button
                  type="button"
                  className={styles.boostActionBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    onBoostClick(id)
                  }}
                  aria-label="Boost posting"
                  title="Boost posting"
                >
                  <TrendingUp size={14} color="white" strokeWidth={2.5} />
                </button>
              )}
              <div className={styles.actionBtn} aria-label="View listing">
                <ArrowRight size={14} color="white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // Card navigation: only trigger if not clicking the heart button
  return (
    <div className={cardClass} style={style}>
      {/* Image */}
      <div className={styles.imageWrap}>
        <img src={image} alt={title} loading="lazy" className={styles.image} onError={handleImageError} />
        {condition && (
          <span className={`${styles.badge} ${BADGE_CLASS[condition] ?? ''}`}>{condition}</span>
        )}
        <button
          className={`${styles.wishBtn} ${liked ? styles.liked : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleLike(id) }}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} />
        </button>
        {isBoosted && (
          <span className={styles.boostIndicator} title="Boosted" aria-hidden>
            <TrendingUp size={14} color="#10b981" />
          </span>
        )}
      </div>
      {/* Body */}
      <div className={styles.body} onClick={() => navigate(`/item/${id}`)} style={{ cursor: 'pointer' }}>
        <span className={styles.category}>{category}</span>
        <p className={styles.title}>{title}</p>
        <p className={styles.seller}>by <span>{seller}</span></p>
        {isBoosted && canSeeBoostDetails && (
          <p className={styles.boostMeta}>
            Boosted {boostDaysLeft} day{boostDaysLeft === 1 ? '' : 's'} left
          </p>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <div className={styles.actionGroup}>
            {showBoost && onBoostClick && (
              <button
                type="button"
                className={styles.boostActionBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  onBoostClick(id)
                }}
                aria-label="Boost posting"
                title="Boost posting"
              >
                <TrendingUp size={14} color="white" strokeWidth={2.5} />
              </button>
            )}
            <div className={styles.actionBtn} aria-label="View listing">
              <ArrowRight size={14} color="white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
