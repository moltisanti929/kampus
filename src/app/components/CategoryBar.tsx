import { CATEGORIES } from '@/data/products'
import { Link } from 'react-router-dom'
import styles from './CategoryBar.module.css'

interface CategoryBarProps {
  active: string
}

// we don't need an onChange prop anymore; each chip is an <a> that updates the
// search params. the parent can read the active category from `useSearchParams`.
export function CategoryBar({ active }: CategoryBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {CATEGORIES.map(({ label, icon }) => {
          const to = label === 'All' ? '/' : `/?category=${encodeURIComponent(label)}`

          return (
            <Link
              key={label}
              to={to}
              className={`${styles.chip} ${active === label ? styles.active : ''}`}
            >
              <span className={styles.icon}>{icon}</span>
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
