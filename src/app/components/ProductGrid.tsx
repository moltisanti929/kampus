import type { Product } from '@/data/products'
import { Link } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import { useWishlist } from '@/hooks/useWishlist'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { toggle, isLiked } = useWishlist()

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Listings</h2>
        <Link to="/" className={styles.viewAll}>View all →</Link>
      </div>

      <div className={styles.grid}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            liked={isLiked(product.id)}
            onToggleLike={toggle}
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className={styles.empty}>
          <p>No listings found in this category yet.</p>
        </div>
      )}
    </section>
  )
}
