import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
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
import { RequireAuth } from './components/RequireAuth'

// ── Home page ─────────────────────────────────────────────

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <>
      <Hero />
      <CategoryBar active={activeCategory} />
      <ProductGrid products={filteredProducts} />
    </>
  )
}

// ── Root layout (navbar + footer wrap every page) ─────────
export default function App() {
  const modal = useModal()

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
