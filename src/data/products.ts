export type Condition = "New" | "Like New" | "Good" | "Used";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  sellerId?: string;
  condition?: Condition;
  photos?: string[];
  description?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "MacBook Pro 2021 — Excellent Condition",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?q=80&w=3096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Furniture",
    seller: "Emma W.",
  },
  {
    id: 5,
    title: "North Face Backpack — 35L Capacity",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1549872178-96db16a53ca8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      "https://images.unsplash.com/photo-1589542425426-2460d8243b58?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  {
    id: 13,
    title: "Resume & Cover Letter Review",
    price: 500,
    image:
      "https://plus.unsplash.com/premium_photo-1661324492805-2db1c80e2e76?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Services",
    seller: "Alex M.",
  },
  {
    id: 14,
    title: "Online Tutoring – Math & Science",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80",
    category: "Services",
    seller: "Jamie R.",
  },
  {
    id: 15,
    title: "Logo Design & Branding",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1597587606035-b64422b50f82?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Services",
    seller: "Casey L.",
  },
  {
    id: 16,
    title: "Social Media Management",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?q=80&w=2900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Services",
    seller: "Riley T.",
  },
  {
    id: 17,
    title: "Proofreading & Editing Services",
    price: 250,
    image:
      "https://media.istockphoto.com/id/170044810/photo/text-correction-proofreader.webp?a=1&b=1&s=612x612&w=0&k=20&c=RJRn8ncJlZVdSCfsOmQa40OfU4bgpt6OatxMNwWjhkI=",
    category: "Services",
    seller: "Sam K.",
  },
  {
    id: 18,
    title: "Vintage Graphic Tee – Medium",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1759941279446-dea2722bca33?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmludGFnZSUyMGdyYXBoaWMlMjB0ZWV8ZW58MHx8MHx8fDA%3D",
    category: "Apparel",
    seller: "Mia P.",
  },
  {
    id: 19,
    title: "Black Leather Jacket",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1727524366429-27de8607d5f6?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Apparel",
    seller: "Leo V.",
  },
  {
    id: 20,
    title: "Custom Embroidered Hoodie",
    price: 800,
    image:
      "https://plus.unsplash.com/premium_photo-1765040757862-3d6c19855a86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZW1icm9pZGVyZWQlMjBob29kaWV8ZW58MHx8MHx8fDA%3D",
    category: "Apparel",
    seller: "Nora S.",
  },
  {
    id: 21,
    title: "Denim Shorts – Size S",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80",
    category: "Apparel",
    seller: "Kai J.",
  },
  {
    id: 22,
    title: "Classic White Sneakers",
    price: 900,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVuaW0lMjBzaG9ydHN8ZW58MHx8MHx8fDA%3D",
    category: "Apparel",
    seller: "Zoe R.",
  },
  {
    id: 23,
    title: "PS5 Controller – Midnight Black",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1642984061426-642d8ac2d088?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBwczUlMjBjb250cm9sbGVyfGVufDB8fDB8fHww",
    category: "Gaming",
    seller: "Ethan B.",
    condition: "New",
  },
  {
    id: 24,
    title: "Gaming Mouse – RGB",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
    category: "Gaming",
    seller: "Liam H.",
  },
  {
    id: 25,
    title: "Nintendo Switch Lite – Coral",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1621296679244-c4c26fdba11d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmludGVuZG8lMjBzd2l0Y2glMjBwaW5rfGVufDB8fDB8fHww",
    category: "Gaming",
    seller: "Ava K.",
    condition: "Used",
  },
  {
    id: 26,
    title: "Steam Gift Card – ₱1,000",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1729860648688-1488d541fc92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RlYW0lMjBnYW1lJTIwY2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Gaming",
    seller: "Noah W.",
  },
  {
    id: 27,
    title: "Gaming Headset – Surround Sound",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1677086813101-496781a0f327?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwaGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Gaming",
    seller: "Chloe F.",
  },
  {
    id: 28,
    title: "LEGO Star Wars Set",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1617663516011-cd60a0de811d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0YXIlMjB3YXJzJTIwbGVnb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Hobbies & Toys",
    seller: "Max D.",
    condition: "New",
  },
  {
    id: 29,
    title: "Puzzle 1,000 Pieces – Landscape",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1609058700004-608180fae6ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGppZ3NhdyUyMHB1enpsZSUyMGJveHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Hobbies & Toys",
    seller: "Lily C.",
  },
  {
    id: 30,
    title: "Sketching & Drawing Kit",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1639478700281-fd11ca9e7e1b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tldGNoaW5nJTIwa2l0fGVufDB8fDB8fHww",
    category: "Hobbies & Toys",
    seller: "Finn M.",
  },
  {
    id: 31,
    title: "RC Drone – Beginner Friendly",
    price: 3200,
    image:
      "https://plus.unsplash.com/premium_photo-1714618849685-89cad85746b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHJvbmV8ZW58MHx8MHx8fDA%3D",
    category: "Hobbies & Toys",
    seller: "Sophia R.",
  },
  {
    id: 32,
    title: "Board Game – Catan",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1769288361254-abb4783a6070?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Hobbies & Toys",
    seller: "Jack L.",
  },
  {
    id: 33,
    title: "Liquid Foundation – Shade Medium",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
    category: "Makeup",
    seller: "Emma T.",
  },
  {
    id: 34,
    title: "Eyeshadow Palette – 12 Colors",
    price: 750,
    image:
      "https://images.unsplash.com/photo-1768983224486-b4dcd179b4a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV5ZXNoYWRvdyUyMHBhbGV0dGV8ZW58MHx8MHx8fDA%3D",
    category: "Makeup",
    seller: "Chloe M.",
  },
  {
    id: 35,
    title: "Matte Lipstick Set – 5 Colors",
    price: 900,
    image:
      "https://images.unsplash.com/photo-1585519356004-2bd6527d9cbe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8NSUyMG1hdHRlJTIwbGlwc3RpY2t8ZW58MHx8MHx8fDA%3D",
    category: "Makeup",
    seller: "Zoe N.",
  },
  {
    id: 36,
    title: "Blush & Highlighter Duo",
    price: 500,
    image:
      "https://plus.unsplash.com/premium_photo-1726840825289-8de3e79e42d5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ymx1c2glMjBtYWtldXB8ZW58MHx8MHx8fDA%3D",
    category: "Makeup",
    seller: "Mia R.",
  },
  {
    id: 37,
    title: "Makeup Brushes Set – 10 Pieces",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
    category: "Makeup",
    seller: "Ava S.",
  },
  {
    id: 39,
    title: "Yoga Mat – Non Slip",
    price: 750,
    image:
      "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Health",
    seller: "Sarah K.",
  },
  {
    id: 40,
    title: "Reusable Water Bottle – 1L",
    price: 450,
    image:
      "https://plus.unsplash.com/premium_photo-1664527307281-faf42c09ac8f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmV1c2FibGUlMjB3YXRlciUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Health",
    seller: "Ethan F.",
  },
  {
    id: 41,
    title: "Resistance Bands Set – 5 Pieces",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Health",
    seller: "Mia J.",
  },
  {
    id: 42,
    title: "Aromatherapy Essential Oils Set",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXNzZW50aWFsJTIwb2lsc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Health",
    seller: "Noah P.",
  },
  {
    id: 43,
    title: "Homemade Banana Bread",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1569762404472-026308ba6b64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
    category: "Food & Drinks",
    seller: "Ella M.",
  },
  {
    id: 44,
    title: "Cold Brew Coffee – 500ml",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sZCUyMGJyZXd8ZW58MHx8MHx8fDA%3D",
    category: "Food & Drinks",
    seller: "Liam D.",
  },
  {
    id: 45,
    title: "Gourmet Cookies Pack – 12 pcs",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1624929101631-f35a320c521b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvdXJtZXQlMjBjb29raWVzJTIwcGFja3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Food & Drinks",
    seller: "Ava L.",
  },
  {
    id: 46,
    title: "Vegan Meal Box – Chicken Style",
    price: 400,
    image:
      "https://plus.unsplash.com/premium_photo-1719833625904-820b301fbf7b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnYW4lMjBtZWFsJTIwY2hpY2tlbiUyMGJveHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Food & Drinks",
    seller: "Zoe K.",
  },
  {
    id: 47,
    title: "Fruit Smoothie – Mixed Berries",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZWQlMjBiZXJyaWVzJTIwc21vb3RoaWV8ZW58MHx8MHx8fDA%3D",
    category: "Food & Drinks",
    seller: "Noah S.",
  },
  {
    id: 48,
    title: "Dog Chew Toys – 3pcs",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1601758003630-df669e4e825a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hldyUyMHRveXN8ZW58MHx8MHx8fDA%3D",
    category: "Pet Supplies",
    seller: "Lily H.",
  },
  {
    id: 49,
    title: "Cat Scratching Post – Medium",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwc2NyYXRjaGluZyUyMHBvc3R8ZW58MHx8MHx8fDA%3D",
    category: "Pet Supplies",
    seller: "Max T.",
  },
  {
    id: 50,
    title: "Pet Travel Bag – Small Dogs",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1661322506572-83e26fdfbcef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwdHJhdmVsJTIwYmFnfGVufDB8fDB8fHww",
    category: "Pet Supplies",
    seller: "Emma J.",
  },
  {
    id: 51,
    title: "Fish Tank Decorations – 10 pcs",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1633465091434-117f2bcffd9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaCUyMHRhbmslMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Pet Supplies",
    seller: "Leo F.",
  },
  {
    id: 52,
    title: "Dog Shampoo – 500ml",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1647002380358-fc70ed2f04e0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Pet Supplies",
    seller: "Ava H.",
  },
  {
    id: 53,
    title: "Old Textbooks – College Level",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80",
    category: "Free Items",
    seller: "Ethan K.",
    condition: "Used",
  },
  {
    id: 54,
    title: "Empty Glass Jars – 5 pcs",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1709176935857-b877f5ef55f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2xhc3MlMjBqYXJzfGVufDB8fDB8fHww",
    category: "Free Items",
    seller: "Mia L.",
  },
  {
    id: 55,
    title: "Handmade Greeting Cards",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1481011784351-b0227b9f4a80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZXRpbmclMjBjYXJkfGVufDB8fDB8fHww",
    category: "Free Items",
    seller: "Noah M.",
  },
  {
    id: 56,
    title: "Old Phone Case – Samsung",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1625641936123-59d5bcc1edb8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmUlMjBjYXNlJTIwc2Ftc3VuZ3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Free Items",
    seller: "Zoe P.",
  },
  {
    id: 57,
    title: "Plastic Plant Pots – 3 pcs",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1759773892997-12079c362fca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBsYW50JTIwcG90cyUyMHBsYXN0aWN8ZW58MHx8MHx8fDA%3D",
    category: "Free Items",
    seller: "Jack T.",
  },
  {
    id: 58,
    title: "Watercolor Paper Pad – A4",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1554757388-1029138cb2fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXJjb2xvciUyMHBhZCUyMHBhcGVyfGVufDB8fDB8fHww",
    category: "Art & Stationery",
    seller: "Lily M.",
  },
  {
    id: 59,
    title: "Set of Colored Pencils – 36 Colors",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1535340582796-799448c62e08?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb3JlZCUyMHBlbmNpbHMlMjAzNnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Art & Stationery",
    seller: "Max J.",
  },
  {
    id: 60,
    title: "Calligraphy Pen Set",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1653122662461-af601aac83f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbGxpZ3JhcGh5JTIwcGVufGVufDB8fDB8fHww",
    category: "Art & Stationery",
    seller: "Mia F.",
  },
  {
    id: 61,
    title: "Sketchbook – 100 Pages",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tldGNoYm9va3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Art & Stationery",
    seller: "Ethan P.",
  },
  {
    id: 62,
    title: "Canvas Panel – 8x10 inches",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1760794751749-6df8746cf42b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FudmFzJTIwcGFuZWx8ZW58MHx8MHx8fDA%3D",
    category: "Art & Stationery",
    seller: "Zoe H.",
  },
  {
    id: 63,
    title: "Portable Power Bank – 10,000mAh",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1594843665794-446ce915d840?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
    category: "Other",
    seller: "Ava M.",
  },
  {
    id: 64,
    title: "USB Flash Drive – 128GB",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1587145820098-23e484e69816?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNiJTIwZmxhc2glMjBkcml2ZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Other",
    seller: "Leo D.",
  },
  {
    id: 65,
    title: "Mini Projector – Home Use",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluaSUyMHByb2plY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Other",
    seller: "Mia N.",
  },
  {
    id: 66,
    title: "LED Desk Lamp – Adjustable Brightness",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1708513427809-728a7913fc9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
    category: "Other",
    seller: "Ethan L.",
  },
  {
    id: 67,
    title: "Travel Organizer Pouch – 5 Compartments",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1758398332771-0a79c5df74a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsJTIwb3JnYW5pemVyJTIwcG91Y2h8ZW58MHx8MHx8fDA%3D",
    category: "Other",
    seller: "Noah J.",
  },
  {
    id: 68,
    title: "Wireless Earbuds — Noise Cancelling",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
    category: "Electronics",
    seller: "Daniel R.",
  },
  {
    id: 69,
    title: "4K Monitor — 27inch",
    price: 349,
    image:
      "https://plus.unsplash.com/premium_photo-1664699099341-b7c4229a8d97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D",
    category: "Electronics",
    seller: "Priya S.",
  },
  {
    id: 70,
    title: "Portable Bluetooth Speaker",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnN8ZW58MHx8MHx8fDA%3D",
    category: "Electronics",
    seller: "Mark T.",
  },
  {
    id: 71,
    title: "External SSD — 1TB",
    price: 159,
    image:
      "https://plus.unsplash.com/premium_photo-1721133221361-4f2b2af3b6fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3NkfGVufDB8fDB8fHww",
    category: "Electronics",
    seller: "Lina K.",
  },
  {
    id: 72,
    title: "Milk and Honey — Poetry Book",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Books",
    seller: "Oliver G.",
    condition: "Good",
  },
  {
    id: 73,
    title: "Modern Physics Textbook",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
    category: "Books",
    seller: "Nadia H.",
  },
  {
    id: 74,
    title: "Graphic Design Fundamentals",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Books",
    seller: "Luis P.",
  },
  {
    id: 75,
    title: "Business Case Studies Collection",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    category: "Books",
    seller: "Hannah C.",
  },
  {
    id: 76,
    title: "Poetry Anthology — Contemporary",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    category: "Books",
    seller: "Ethan V.",
  },
  {
    id: 77,
    title: "Used English Literature Set",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1565022536102-f7645c84354a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5nbGlzaCUyMGJvb2tzfGVufDB8fDB8fHww",
    category: "Books",
    seller: "Maya L.",
  },
  {
    id: 78,
    title: "Ballpoint Pens — Pack of 50",
    price: 15,
    image:
      "https://plus.unsplash.com/premium_photo-1664105111034-33e24dc90a78?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVuc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "School Supplies",
    seller: "SchoolStore",
  },
  {
    id: 79,
    title: "A4 Notebooks — 5 Pack",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1601001435957-74f0958a93fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2tzfGVufDB8fDB8fHww",
    category: "School Supplies",
    seller: "Dana R.",
  },
  {
    id: 80,
    title: "Scientific Calculator — New",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NpZW50aWZpYyUyMGNhbGN1bGF0b3J8ZW58MHx8MHx8fDA%3D",
    category: "School Supplies",
    seller: "Anna B.",
  },
  {
    id: 81,
    title: "Geometry Set — Complete",
    price: 25,
    image:
      "https://media.istockphoto.com/id/182176138/photo/geometry-compass-ruler-and-red-pencil-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=QY982xWkx1vn6diR_KLNnuyb02jFy9sZnALhxGwi520=",
    category: "School Supplies",
    seller: "Kai J.",
  },
  {
    id: 82,
    title: "Highlighters — 12 Colors",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1586764635350-4f88a6a30a52?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhpZ2hsaWdodGVyc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "School Supplies",
    seller: "Lily C.",
  },
  {
    id: 83,
    title: "Index Cards — 200pcs",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1513710281312-7a43f9cdbfcc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kZXglMjBjYXJkc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "School Supplies",
    seller: "Max J.",
  },
  {
    id: 84,
    title: "USB-C Charging Cables — 3 Pack",
    price: 90,
    image:
      "https://plus.unsplash.com/premium_photo-1759282946954-d1fdec6198eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNiJTIwY2hhcmdpbmclMjBjYWJsZXN8ZW58MHx8MHx8fDA%3D",
    category: "School Supplies",
    seller: "Noah J.",
  },
  {
    id: 85,
    title: "Backpack — College Sized",
    price: 220,
    image:
      "https://plus.unsplash.com/premium_photo-1723649902660-66643962d57b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sbGVnZSUyMGJhY2twYWNrfGVufDB8fDB8fHww",
    category: "School Supplies",
    seller: "David L.",
  },
  {
    id: 86,
    title: "CIIT College NSTP/PE Uniform - Size M",
    price: 300,
    image:
      "https://ciitstore.myshopify.com/cdn/shop/files/PENSTP5.jpg?v=1702265002",
    category: "Uniforms",
    seller: "SchoolSupplyCo",
  },
  {
    id: 87,
    title: "CIIT College NSTP/PE Uniform - Size L",
    price: 1200,
    image:
      "https://ciitstore.myshopify.com/cdn/shop/files/PENSTP1.jpg?v=1702265002",
    category: "Uniforms",
    seller: "Leo V.",
  },
  {
    id: 88,
    title: "CIIT SHS PE Uniform - Size S",
    price: 250,
    image:
      "https://ciitstore.myshopify.com/cdn/shop/files/SHSShirt1.jpg?v=1702265878",
    category: "Uniforms",
    seller: "Nora S.",
  },
  {
    id: 89,
    title: "PE Shorts — Unisex",
    price: 180,
    image:
      "https://www.dans.ph/cdn/shop/files/Untitleddesign-2025-02-27T110430.370.png?v=1740626275&width=416",
    category: "Uniforms",
    seller: "Kai J.",
  },
  {
    id: 90,
    title: "Jogging Pants - Size L",
    price: 120,
    image:
      "https://img.lazcdn.com/g/p/9cbf1097b8e209f16a9a879eb383ec29.jpg_720x720q80.jpg",
    category: "Uniforms",
    seller: "Mia P.",
  },
  {
    id: 91,
    title: "CIIT SHS PE Jogging Pants - Size XL",
    price: 320,
    image:
      "https://ciitstore.myshopify.com/cdn/shop/files/Jogger1.jpg?v=1702265243",
    category: "Uniforms",
    seller: "Emma W.",
  },
  {
    id: 93,
    title: "Basketball — Official Size",
    price: 850,
    image:
      "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Sports",
    seller: "Chris H.",
  },
  {
    id: 94,
    title: "Running Shoes — Size 9",
    price: 1400,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Sports",
    seller: "Zoe R.",
  },
  {
    id: 95,
    title: "Tennis Racket — Lightweight",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1617883861744-13b534e3b928?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww",
    category: "Sports",
    seller: "John D.",
  },
  {
    id: 96,
    title: "Coffee Table — Oak Finish",
    price: 4200,
    image:
      "https://plus.unsplash.com/premium_photo-1711391585226-45a983eb8e70?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
    category: "Furniture",
    seller: "Tom S.",
  },
  {
    id: 97,
    title: "Bookshelf — 4 Tier",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1515542706656-8e6ef17a1521?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2tzaGVsZnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Furniture",
    seller: "Emma W.",
  },
  {
    id: 98,
    title: "Sunglasses — UV Protection",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Accessories",
    seller: "Zoe R.",
  },
  {
    id: 99,
    title: "Leather Belt — Brown",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGJlbHR8ZW58MHx8MHx8fDA%3D",
    category: "Accessories",
    seller: "David L.",
  },
  {
    id: 100,
    title: "Canvas Tote Bag",
    price: 220,
    image:
      "https://plus.unsplash.com/premium_photo-1681498856888-2f3552c0b189?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FudmFzJTIwdG90ZSUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Accessories",
    seller: "Mia P.",
  },
  {
    id: 101,
    title: "Ukulele — Soprano",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1621875833619-370c48ffa953?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWtlbGVsZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Musical Instruments",
    seller: "Lisa R.",
  },
  {
    id: 102,
    title: "Electric Guitar — Beginner",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1568193755668-aae18714a9f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D",
    category: "Musical Instruments",
    seller: "Jack L.",
  },
  {
    id: 103,
    title: "Keyboard — 61 Keys",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1523297554394-dc159677ffe1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBpYW5vJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
    category: "Musical Instruments",
    seller: "Ethan P.",
  },
  {
    id: 104,
    title: "Cushioned Sofa Pillow Set — 2pcs",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNvZmElMjBwaWxsb3d8ZW58MHx8MHx8fDA%3D",
    category: "Home",
    seller: "Tom S.",
  },
  {
    id: 105,
    title: "Wall Art Print — Abstract",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Home",
    seller: "Zoe H.",
  },
  {
    id: 106,
    title: "Bedside Lamp — Ceramic",
    price: 650,
    image:
      "https://plus.unsplash.com/premium_photo-1664194583989-96c9fa85de8f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVkc2lkZSUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
    category: "Home",
    seller: "Emma W.",
  },
  {
    id: 107,
    title: "Area Rug — 5x7 ft",
    price: 2600,
    image:
      "https://plus.unsplash.com/premium_photo-1675738774365-c542862be2d4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJ1Z3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Home",
    seller: "David L.",
  },
  {
    id: 108,
    title: "Stand Mixer — 5L",
    price: 9500,
    image:
      "https://plus.unsplash.com/premium_photo-1718186096324-474ac487bcc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhbmQlMjBtaXhlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Appliances",
    seller: "Jessica F.",
  },
  {
    id: 109,
    title: "Electric Kettle — 1.7L",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1738520420652-0c47cea3922b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3RyaWMlMjBrZXR0bGV8ZW58MHx8MHx8fDA%3D",
    category: "Appliances",
    seller: "Liam D.",
  },
  {
    id: 110,
    title: "Air Fryer — Compact",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1695089028114-ce28248f0ab9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZnJ5ZXJ8ZW58MHx8MHx8fDA%3D",
    category: "Appliances",
    seller: "Mia N.",
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
  { label: "Hobbies & Toys", icon: "🧩" },
  { label: "Makeup", icon: "💄" },
  { label: "Health", icon: "💊" },
  { label: "Food & Drinks", icon: "🍱" },
  { label: "Pet Supplies", icon: "🐾" },
  { label: "Free Items", icon: "🎁" },
  { label: "Art & Stationery", icon: "🖌️" },
  { label: "Other", icon: "🔧" },
];
