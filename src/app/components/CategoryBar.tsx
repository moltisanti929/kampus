import { CATEGORIES } from '@/data/products'
import styles from './CategoryBar.module.css'

interface CategoryBarProps {
  active: string
  onSelect: (label: string) => void
}

export function CategoryBar({ active, onSelect }: CategoryBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {CATEGORIES.map(({ label, icon }) => {
          return (
            <button
              key={label}
              type="button"
              className={`${styles.chip} ${active === label ? styles.active : ''}`}
              onClick={() => onSelect(label)}
            >
              <span className={styles.icon}>{icon}</span>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
