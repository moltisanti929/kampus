import { useRef, useEffect, useState } from 'react'
import { X, ShieldCheck, Info } from 'lucide-react'
import { useEmailValidation } from '@/hooks/useEmailValidation'
import { useAuth } from '@/hooks/useAuth'
import type { ModalPanel } from '@/hooks/useModal'
import styles from './AuthModal.module.css'

interface MockAccount {
  email: string
  name: string
  password: string
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
  course: 'BMMA - Animation' | 'BMMA - Graphic Design' | 'BMMA - Film' | 'BS - Entrep' | 'BSEMC' | 'BSCS' | 'BSIT'
}

const YEAR_OPTIONS: MockAccount['year'][] = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const COURSE_OPTIONS: MockAccount['course'][] = [
  'BMMA - Animation',
  'BMMA - Graphic Design',
  'BMMA - Film',
  'BS - Entrep',
  'BSEMC',
  'BSCS',
  'BSIT',
]

interface AuthModalProps {
  isOpen: boolean
  panel: ModalPanel
  onClose: () => void
  onSwitchPanel: (panel: ModalPanel) => void
}

// Mock accounts storage
const getMockAccounts = (): MockAccount[] => {
  try {
    const stored = localStorage.getItem('mock_accounts')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveMockAccount = (account: MockAccount) => {
  try {
    const accounts = getMockAccounts()
    if (!accounts.find(a => a.email === account.email)) {
      accounts.push(account)
      localStorage.setItem('mock_accounts', JSON.stringify(accounts))
    }
  } catch { }
}

const accountExists = (email: string): MockAccount | undefined => {
  return getMockAccounts().find(a => a.email === email)
}

function EmailHint({ state }: { state: 'idle' | 'valid' | 'invalid' }) {
  if (state === 'idle') return (
    <p className={styles.hint}>
      <Info size={12} /> Must be a @ciit.edu.ph address
    </p>
  )
  if (state === 'valid') return (
    <p className={`${styles.hint} ${styles.hintValid}`}>
      <ShieldCheck size={12} /> Verified CIIT student email ✓
    </p>
  )
  return (
    <p className={`${styles.hint} ${styles.hintInvalid}`}>
      <X size={12} /> Only @ciit.edu.ph emails are allowed
    </p>
  )
}

function CIITNote() {
  return (
    <div className={styles.ciitNote}>
      <ShieldCheck size={14} style={{ flexShrink: 0, marginTop: 1 }} />
      <span>
        Kampus is exclusively for verified CIIT students.
        Only <strong> @ciit.edu.ph </strong> email addresses are accepted.
      </span>
    </div>
  )
}

function SignInPanel({ onSwitch, onClose }: { onSwitch: (p: ModalPanel) => void; onClose: () => void }) {
  const email = useEmailValidation()
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const { login } = useAuth()

  const handleSubmit = () => {
    if (!email.isCIITEmail(emailVal)) {
      alert('Please enter a valid @ciit.edu.ph email address.')
      return
    }
    const account = accountExists(emailVal)
    if (!account) {
      alert('Account not found. Please sign up first.')
      return
    }
    if (!passwordVal.trim()) {
      alert('Please enter your password.')
      return
    }
    if (account.password !== passwordVal.trim()) {
      alert('Incorrect password. Please try again.')
      return
    }
    login({
      id: emailVal,
      name: account.name,
      email: emailVal,
      year: account.year,
      course: account.course,
    })
    onClose()
    alert('Welcome back! (Demo — backend coming soon.)')
  }

  return (
    <>
      <div className={styles.panelLogo}>Kampus<span>.</span></div>
      <p className={styles.panelSub}>Sign in with your CIIT student email to access the marketplace.</p>
      <h3 className={styles.panelTitle}>Welcome back 👋</h3>

      <div className={styles.formGroup}>
        <label>CIIT Student Email</label>
        <input
          className={`${styles.input} ${email.state === 'invalid' ? styles.inputError : ''}`}
          type="email"
          placeholder="yourname@ciit.edu.ph"
          value={emailVal}
          onChange={(e) => { setEmailVal(e.target.value); email.validate(e.target.value) }}
        />
        <EmailHint state={email.state} />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          className={styles.input}
          type="password"
          placeholder="••••••••"
          value={passwordVal}
          onChange={e => setPasswordVal(e.target.value)}
        />
      </div>

      <button className={styles.submitBtn} onClick={handleSubmit}>Sign In</button>

      <div className={styles.divider}>or</div>
      <p className={styles.switchText}>
        New to Kampus?{' '}
        <a onClick={() => onSwitch('signup')}>Create an account</a>
      </p>
      <CIITNote />
    </>
  )
}

function SignUpPanel({ onSwitch, onClose }: { onSwitch: (p: ModalPanel) => void; onClose: () => void }) {
  const email = useEmailValidation()
  const [nameVal, setNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [yearVal, setYearVal] = useState('')
  const [courseVal, setCourseVal] = useState('')

  const handleSubmit = () => {
    if (!nameVal.trim()) {
      alert('Please enter your full name.')
      return
    }
    if (!email.isCIITEmail(emailVal)) {
      alert('Only @ciit.edu.ph email addresses can register on Kampus.')
      return
    }
    if (accountExists(emailVal)) {
      alert('This email is already registered.')
      return
    }
    if (!passwordVal.trim()) {
      alert('Please enter a password.')
      return
    }
    if (!yearVal) {
      alert('Please select your year level.')
      return
    }
    if (!courseVal) {
      alert('Please select your course.')
      return
    }
    saveMockAccount({
      email: emailVal,
      name: nameVal.trim(),
      password: passwordVal.trim(),
      year: yearVal as MockAccount['year'],
      course: courseVal as MockAccount['course'],
    })
    alert('Account created! Please sign in with your email.')
    onSwitch('signin')
  }

  return (
    <>
      <div className={styles.panelLogo}>Kampus<span>.</span></div>
      <p className={styles.panelSub}>Join your fellow CIITizens on the campus marketplace.</p>
      <h3 className={styles.panelTitle}>Create account 🎓</h3>

      <div className={styles.formGroup}>
        <label>Full Name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Juan dela Cruz"
          value={nameVal}
          onChange={(e) => setNameVal(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>CIIT Student Email</label>
        <input
          className={`${styles.input} ${email.state === 'invalid' ? styles.inputError : ''}`}
          type="email"
          placeholder="yourname@ciit.edu.ph"
          value={emailVal}
          onChange={(e) => { setEmailVal(e.target.value); email.validate(e.target.value) }}
        />
        <EmailHint state={email.state} />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          className={styles.input}
          type="password"
          placeholder="Create a strong password"
          value={passwordVal}
          onChange={e => setPasswordVal(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Year Level</label>
        <select
          className={styles.input}
          value={yearVal}
          onChange={(e) => setYearVal(e.target.value)}
        >
          <option value="">Select your year</option>
          {YEAR_OPTIONS.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Course</label>
        <select
          className={styles.input}
          value={courseVal}
          onChange={(e) => setCourseVal(e.target.value)}
        >
          <option value="">Select your course</option>
          {COURSE_OPTIONS.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <button className={styles.submitBtn} onClick={handleSubmit}>Create Account</button>

      <div className={styles.divider}>or</div>
      <p className={styles.switchText}>
        Already have an account?{' '}
        <a onClick={() => onSwitch('signin')}>Sign in</a>
      </p>
      <CIITNote />
    </>
  )
}

function SellPanel({ onSwitch }: { onSwitch: (p: ModalPanel) => void }) {
  return (
    <>
      <div className={styles.panelLogo}>Kampus<span>.</span></div>
      <p className={styles.panelSub}>List something for sale on the campus marketplace.</p>
      <h3 className={styles.panelTitle}>Post a listing ✏️</h3>
      <div className={styles.sellGate}>
        <p>You need to be signed in to post a listing.</p>
        <a onClick={() => onSwitch('signin')}>Sign in to continue →</a>
      </div>
    </>
  )
}

export function AuthModal({ isOpen, panel, onClose, onSwitchPanel }: AuthModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <X size={14} strokeWidth={2.5} />
        </button>

        {panel === 'signin' && <SignInPanel onSwitch={onSwitchPanel} onClose={onClose} />}
        {panel === 'signup' && <SignUpPanel onSwitch={onSwitchPanel} onClose={onClose} />}
        {panel === 'sell' && <SellPanel onSwitch={onSwitchPanel} />}
      </div>
    </div>
  )
}
