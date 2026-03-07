import { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  year?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
  course?: 'BMMA - Animation' | 'BMMA - Graphic Design' | 'BMMA - Film' | 'BS - Entrep' | 'BSEMC' | 'BSCS' | 'BSIT'
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('isLoggedIn') === 'true'
    } catch {
      return false
    }
  })

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (newUser: User) => {
    setIsLoggedIn(true)
    setUser(newUser)
    try {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(newUser))
    } catch { }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    try {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
    } catch { }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
