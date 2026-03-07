import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, ShieldCheck, MapPin, Tag, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { useListings } from '@/app/hooks/useListings'
import { ProductCard } from '@/app/components/ProductCard'
import { useWishlist } from '@/hooks/useWishlist'
import { useAuth } from '@/hooks/useAuth'
import styles from './ItemView.module.css'

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial,sans-serif" font-size="24">No image</text></svg>'

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget
  if (target.src !== FALLBACK_IMAGE) {
    target.src = FALLBACK_IMAGE
  }
}

export default function ItemView() {
  const { user } = useAuth()
  // Helper for posted time
  function getPostedTime(ts: number) {
    const now = Date.now()
    const diff = now - ts
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (mins > 0) return `${mins} minute${mins > 1 ? 's' : ''} ago`
    return 'just now'
  }
  const { id } = useParams()
  const { listings } = useListings()
  const allProducts = [...PRODUCTS, ...listings]
  const product = allProducts.find(p => p.id === Number(id)) ?? allProducts[0]
  const similar = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const sellerListings = allProducts.filter((l) => {
    if (product.sellerId) {
      return l.sellerId === product.sellerId
    }
    return l.seller === product.seller
  })

  const { toggle, isLiked } = useWishlist()
  const [activeImg, setActiveImg] = useState(0)

  // Support multiple images if available, otherwise show single image
  let images: string[] = []
  if (Array.isArray(product.photos) && product.photos.length > 0) {
    images = product.photos
  } else if (product.image) {
    images = [product.image]
  }

  return (
    <div className={styles.page}>

      {/* Back nav */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to listings
        </Link>
      </div>

      <div className={styles.layout}>

        {/* ── LEFT: Image Gallery ── */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={images[activeImg]} alt={product.title} onError={handleImageError} />

            {images.length > 1 && (
              <>
                <button className={`${styles.imgNav} ${styles.imgNavLeft}`} onClick={() => setActiveImg(i => Math.max(0, i - 1))}>
                  <ChevronLeft size={18} />
                </button>
                <button className={`${styles.imgNav} ${styles.imgNavRight}`} onClick={() => setActiveImg(i => Math.min(images.length - 1, i + 1))}>
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {product.condition && (
              <span className={styles.conditionBadge}>{product.condition}</span>
            )}
          </div>

          <div className={styles.thumbnails}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`View ${i + 1}`} onError={handleImageError} />
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div className={styles.details}>

          <Link to={`/?category=${encodeURIComponent(product.category)}`} className={styles.category}>
            <Tag size={12} />
            {product.category}
          </Link>

          <h1 className={styles.title}>{product.title}</h1>

          <p className={styles.price}>₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: product.price % 1 !== 0 ? 2 : 0 })}</p>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Only show 'Message Seller' if logged-in user is NOT the seller */}
            {user && user.name !== product.seller && (
              <button className={styles.btnContact}>
                <MessageCircle size={17} />
                Message Seller
              </button>
            )}
            <button
              className={`${styles.btnWish} ${isLiked(product.id) ? styles.btnWishActive : ''}`}
              onClick={() => toggle(product.id)}
            >
              <Heart size={17} />
            </button>
            <button className={styles.btnShare}>
              <Share2 size={17} />
            </button>
          </div>

          {/* Description */}
          <div className={styles.section}>
            <h3>Description</h3>
            <p>{product.description || ''}</p>
          </div>

          {/* Details */}
          <div className={styles.section}>
            <h3>Details</h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Condition</span>
                <span className={styles.detailValue}>{product.condition ?? 'Not specified'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Category</span>
                <span className={styles.detailValue}>{product.category}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Listed by</span>
                <span className={styles.detailValue}>{product.seller}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Posted</span>
                <span className={styles.detailValue}>{product.id > 1000000000000 ? getPostedTime(product.id) : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Meetup */}
          <div className={styles.meetup}>
            <MapPin size={15} />
            <div>
              <p className={styles.meetupTitle}>Preferred meetup</p>
              <p className={styles.meetupSub}>CIIT Campus lobby or nearby area</p>
            </div>
          </div>

          {/* Seller card */}
          <div className={styles.sellerCard}>
            <div className={styles.sellerAvatar}>
              {product.seller.charAt(0)}
            </div>
            <div className={styles.sellerInfo}>
              <p className={styles.sellerName}>{product.seller}</p>
              <p className={styles.sellerMeta}>CIIT Student · {sellerListings.length} active listing{sellerListings.length !== 1 ? 's' : ''}</p>
            </div>
            <Link to={`/profile/${encodeURIComponent(product.sellerId ?? product.seller)}`} className={styles.sellerViewBtn}>View Profile</Link>
          </div>

          {/* Safety note */}
          <div className={styles.safetyNote}>
            <ShieldCheck size={14} />
            <p>Always meet in a safe, public spot on campus. Never send payment before seeing the item.</p>
          </div>

        </div>
      </div>

      {/* Similar listings */}
      {similar.length > 0 && (
        <div className={styles.similar}>
          <div className={styles.similarHeader}>
            <h2>Similar listings</h2>
            <Link to="/" className={styles.viewAll}>View all →</Link>
          </div>
          <div className={styles.similarGrid}>
            {similar.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                liked={isLiked(p.id)}
                onToggleLike={toggle}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
