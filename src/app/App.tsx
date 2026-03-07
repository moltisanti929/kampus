import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CategoryBar } from './components/CategoryBar'
import { ProductGrid } from './components/ProductGrid'
import { AuthModal } from './components/AuthModal'
import { Footer } from './components/Footer'
import { useModal } from '@/hooks/useModal'
import { PRODUCTS } from '@/data/products'
import ItemView from './pages/ItemView/ItemView'
import Profile from './pages/Profile/Profile'
import CreateListing from './pages/CreateListing/CreateListing'
import Messages from './pages/Messages/Messages'
import Payment from './pages/Payment/Payment'
import Proof from './pages/Payment/Proof'
import { AuthProvider } from '@/hooks/useAuth'
import { ListingsProvider, useListings } from './hooks/useListings'
import { RequireAuth } from './components/RequireAuth'

// ── Home page ─────────────────────────────────────────────

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All')
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All')
  }, [searchParams])

  const handleCategorySelect = (label: string) => {
    setActiveCategory(label)
    const next = new URLSearchParams(searchParams)
    if (label === 'All') {
      next.delete('category')
    } else {
      next.set('category', label)
    }
    setSearchParams(next)
  }

  const { listings } = useListings()
  // Merge demo PRODUCTS and user listings, with user listings overriding same IDs
  const byId = new Map<number, typeof PRODUCTS[number]>()
  for (const p of PRODUCTS) byId.set(p.id, p)
  for (const p of listings) byId.set(p.id, p)
  let allProducts = Array.from(byId.values())

  // Filter by category
  if (activeCategory !== 'All') {
    allProducts = allProducts.filter((p) => p.category === activeCategory)
  }
  // Filter by search query
  if (searchQuery) {
    allProducts = allProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  // Sort: boosted items first (recent boosts appear first), then by newest id
  try {
    const raw = localStorage.getItem('kampus_listing_boosts')
    const boosts = raw ? JSON.parse(raw) as Record<string, { expiresAt: number }> : {}
    const now = Date.now()
    allProducts.sort((a, b) => {
      const aBoost = boosts[String(a.id)] && boosts[String(a.id)].expiresAt > now ? boosts[String(a.id)].expiresAt : 0
      const bBoost = boosts[String(b.id)] && boosts[String(b.id)].expiresAt > now ? boosts[String(b.id)].expiresAt : 0
      if (aBoost && bBoost) return bBoost - aBoost
      if (aBoost) return -1
      if (bBoost) return 1
      return Number(b.id) - Number(a.id)
    })
  } catch {
    // ignore
  }
  return (
    <>
      <Hero />
      <CategoryBar active={activeCategory} onSelect={handleCategorySelect} />
      <ProductGrid products={allProducts} />
    </>
  )
}

// ── Root layout (navbar + footer wrap every page) ─────────
export default function App() {
  const modal = useModal()

  return (
    <AuthProvider>
      <ListingsProvider>
        <BrowserRouter>
          <Navbar onOpenModal={modal.open} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemView />} />
            <Route
              path="/profile"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/:profileKey"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/create-listing"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <CreateListing />
                </RequireAuth>
              }
            />
            <Route
              path="/messages"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <Messages />
                </RequireAuth>
              }
            />
            <Route
              path="/payment"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <Payment />
                </RequireAuth>
              }
            />
            <Route
              path="/payment/proof"
              element={
                <RequireAuth onUnauth={() => modal.open('signin')}>
                  <Proof />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
          <AuthModal
            isOpen={modal.isOpen}
            panel={modal.panel}
            onClose={modal.close}
            onSwitchPanel={modal.setPanel}
          />
        </BrowserRouter>
      </ListingsProvider>
    </AuthProvider>
  )
}
