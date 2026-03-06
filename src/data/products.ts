export type Condition = "New" | "Like New" | "Good" | "Used";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  condition?: Condition;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "MacBook Pro 2021 — Excellent Condition",
    price: 1299.99,
    image:
      "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?w=600&q=80",
    category: "Electronics",
    seller: "Sarah K.",
    condition: "Like New",
  },
  {
    id: 2,
    title: "Engineering Textbook Bundle — Calc, Physics, Chem",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1755620500895-b693799658ee?w=600&q=80",
    category: "Books",
    seller: "Mike T.",
    condition: "Good",
  },
  {
    id: 3,
    title: "Mountain Bike — 21 Speed",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1763783337455-ad63a238b400?w=600&q=80",
    category: "Sports",
    seller: "John D.",
    condition: "Used",
  },
  {
    id: 4,
    title: "Ergonomic Office Chair — Adjustable",
    price: 125,
    image:
      "https://images.unsplash.com/photo-1762423992354-4a11c971bf91?w=600&q=80",
    category: "Furniture",
    seller: "Emma W.",
  },
  {
    id: 5,
    title: "North Face Backpack — 35L Capacity",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1770648037680-588368f4da49?w=600&q=80",
    category: "Accessories",
    seller: "David L.",
    condition: "Like New",
  },
  {
    id: 6,
    title: "Acoustic Guitar with Case",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1628887067605-5171efd812e3?w=600&q=80",
    category: "Musical Instruments",
    seller: "Lisa R.",
  },
  {
    id: 7,
    title: "Sony WH-1000XM4 Wireless Headphones",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1572119244337-bcb4aae995af?w=600&q=80",
    category: "Electronics",
    seller: "Alex M.",
    condition: "Like New",
  },
  {
    id: 8,
    title: "Canon EOS R6 Camera Body",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1579535984712-92fffbbaa266?w=600&q=80",
    category: "Electronics",
    seller: "Rachel P.",
  },
  {
    id: 9,
    title: "Professional Skateboard — Complete Setup",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1686435171260-3bff2e93ec59?w=600&q=80",
    category: "Sports",
    seller: "Chris H.",
    condition: "Good",
  },
  {
    id: 10,
    title: "TI-84 Plus Scientific Calculator",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1675242314995-034d11bac319?w=600&q=80",
    category: "School Supplies",
    seller: "Anna B.",
  },
  {
    id: 11,
    title: "Modern LED Desk Lamp — Dimmable",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1753109818483-9a1838b318b3?w=600&q=80",
    category: "Home",
    seller: "Tom S.",
    condition: "New",
  },
  {
    id: 12,
    title: "Nespresso Coffee Machine — Compact",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=600&q=80",
    category: "Appliances",
    seller: "Jessica F.",
    condition: "Like New",
  },
];

export const CATEGORIES = [
  { label: "All", icon: "🛍️" },
  { label: "Electronics", icon: "💻" },
  { label: "Books", icon: "📚" },
  { label: "School Supplies", icon: "✏️" },
  { label: "Uniforms", icon: "👔" },
  { label: "Sports", icon: "⚽" },
  { label: "Furniture", icon: "🪑" },
  { label: "Accessories", icon: "🎒" },
  { label: "Musical Instruments", icon: "🎸" },
  { label: "Home", icon: "🏠" },
  { label: "Appliances", icon: "☕" },
  { label: "Services", icon: "🛠️" },
  { label: "Apparel", icon: "👕" },
  { label: "Gaming", icon: "🎮" },
  { label: "Hobbies & Toys", icon: "🧸" },
  { label: "Makeup", icon: "💄" },
  { label: "Health", icon: "💊" },
  { label: "Food & Drinks", icon: "🍔" },
  { label: "Pet Supplies", icon: "🐶" },
  { label: "Free Items", icon: "🎁" },
  { label: "Art & Stationery", icon: "🖌️" },
  { label: "Other", icon: "📦" },
];
