import { Search, User, Plus } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { ModalPanel } from '@/hooks/useModal'
import styles from './Navbar.module.css'

interface NavbarProps {
  onOpenModal: (panel: ModalPanel) => void
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    // Update URL with search parameter
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set('search', value)
    } else {
      newParams.delete('search')
    }

    // Navigate to home with search params
    navigate(`/?${newParams.toString()}`, { replace: true })
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Kampus<span className={styles.logoDot}>.</span>
        </Link>

        {/* Search */}
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search listings — books, gadgets, uniforms…"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnSell}`}
            onClick={() => {
              if (isLoggedIn) navigate('/create-listing')
              else onOpenModal('sell')
            }}
          >
            <Plus size={15} />
            Sell
          </button>
          {isLoggedIn ? (
            <>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => navigate('/profile')}>
                <User size={15} />
                Profile
              </button>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => { navigate('/'); setTimeout(logout, 0); }}>
                Sign Out
              </button>
            </>
          ) : (
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => onOpenModal('signin')}>
              <User size={15} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
