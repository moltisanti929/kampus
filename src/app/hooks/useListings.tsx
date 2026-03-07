import { useState, createContext, useContext, ReactNode } from 'react'
import type { Product } from '@/data/products'
import { PRODUCTS } from '@/data/products'

interface ListingsContextType {
    listings: Product[]
    addListing: (listing: Product) => void
    deleteListing: (id: number) => void
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function ListingsProvider({ children }: { children: ReactNode }) {
    const [listings, setListings] = useState<Product[]>(() => {
        try {
            const stored = localStorage.getItem('user_listings')
            const userListings: Product[] = stored ? JSON.parse(stored) : []
            // Start from demo PRODUCTS but override by userListings when IDs match.
            // This prevents having the same product show multiple times across categories.
            const byId = new Map<number, Product>()
            for (const p of PRODUCTS) byId.set(p.id, p)
            for (const p of userListings) byId.set(p.id, p)
            return Array.from(byId.values())
        } catch {
            return PRODUCTS
        }
    })

    // Apply 10% commission automatically when adding listing.
    const applyCommission = (price: number) => {
        const commission = price * 0.1
        return Math.round((price + commission) * 100) / 100
    }

    const addListing = (listing: Product) => {
        setListings(prev => {
            // Ensure commission is applied and avoid duplicate IDs
            const withCommission = { ...listing, price: applyCommission(Number(listing.price)) }
            const filtered = prev.filter(l => l.id !== withCommission.id)
            const updated = [...filtered, withCommission]
            try { localStorage.setItem('user_listings', JSON.stringify(updated)) } catch { }
            return updated
        })
    }

    const deleteListing = (id: number) => {
        setListings(prev => {
            const updated = prev.filter(l => l.id !== id)
            try { localStorage.setItem('user_listings', JSON.stringify(updated)) } catch { }
            return updated
        })
    }

    return (
        <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>
            {children}
        </ListingsContext.Provider>
    )
}

export function useListings() {
    const ctx = useContext(ListingsContext)
    if (!ctx) throw new Error('useListings must be used within a ListingsProvider')
    return ctx
}
