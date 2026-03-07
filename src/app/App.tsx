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
  let allProducts = [...PRODUCTS, ...listings]
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
