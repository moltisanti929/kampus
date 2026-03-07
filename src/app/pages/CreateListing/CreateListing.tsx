import { useState } from 'react'
import { useListings } from '@/app/hooks/useListings'
import { useAuth } from '@/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X, Plus, Info } from 'lucide-react'
import { CATEGORIES, type Condition } from '@/data/products'
import styles from './CreateListing.module.css'

const CONDITIONS = ['New', 'Like New', 'Good', 'Used']

const MEETUP_OPTIONS = [
  'CIIT Campus lobby',
  'CIIT Library entrance',
  'Nearby convenience store',
  'To be arranged via chat',
]

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = () => reject(new Error('Failed to read image file.'))
    reader.readAsDataURL(file)
  })
}

export default function CreateListing() {
  const { addListing } = useListings()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [photos, setPhotos] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [description, setDesc] = useState('')
  const [meetup, setMeetup] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [selectedBoost, setSelectedBoost] = useState<'none' | '1d' | '3d' | '7d'>('none')

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return

    try {
      const urls = await Promise.all(files.map(fileToDataUrl))
      setPhotos(prev => [...prev, ...urls].slice(0, 5))
    } catch {
      alert('One or more images could not be processed. Please try again.')
    } finally {
      // Let users pick the same file again after a failed/successful upload.
      e.target.value = ''
    }
  }

  const removePhoto = (i: number) =>
    setPhotos(prev => prev.filter((_, idx) => idx !== i))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags(prev => [...prev, t])
      setTagInput('')
    }
  }

  const handleSubmit = () => {
    if (!title || !price || !category || !condition) {
      alert('Please fill in all required fields.')
      return
    }
    if (!user) {
      alert('You must be logged in to post a listing.')
      return
    }
    const newListing = {
      id: Date.now(),
      title,
      price: Number(price), // commission applied in addListing
      image: photos[0] || '',
      photos,
      category,
      seller: user.name,
      sellerId: user.id,
      condition: condition as Condition,
      description,
    }
    addListing(newListing)
    // If user chose a boost plan, route to payment to pay for the boost
    if (selectedBoost !== 'none') {
      const planMap: Record<string, number> = { '1d': 25, '3d': 60, '7d': 120 }
      const planDaysMap: Record<string, number> = { '1d': 1, '3d': 3, '7d': 7 }
      const params = new URLSearchParams({
        mode: 'boost',
        amount: String(planMap[selectedBoost]),
        boostDays: String(planDaysMap[selectedBoost] ?? 0),
        itemTitle: `Boost: ${title}`,
        seller: 'Kampus',
        listingId: String(newListing.id),
      })
      alert('Listing posted! Proceed to payment to activate boost.')
      navigate(`/payment?${params.toString()}`)
      return
    }

    alert('Listing posted!')
    navigate('/')
  }

  const isValid = title && price && category && condition

  return (
    <div className={styles.page}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Cancel
        </Link>
        <h1 className={styles.pageTitle}>Post a Listing</h1>
        <button
          className={`${styles.publishBtn} ${!isValid ? styles.publishBtnDisabled : ''}`}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Publish
        </button>
      </div>
      {/* Bottom area with boost options and publish button */}

      <div className={styles.layout}>

        {/* ── MAIN FORM ── */}
        <div className={styles.form}>

          {/* Photos */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Photos</h2>
              <span className={styles.sectionMeta}>{photos.length}/5 · First photo is the cover</span>
            </div>

            <div className={styles.photoGrid}>
              {photos.map((src, i) => (
                <div key={i} className={styles.photoItem}>
                  <img src={src} alt={`Photo ${i + 1}`} />
                  <button className={styles.removePhoto} onClick={() => removePhoto(i)}>
                    <X size={12} />
                  </button>
                  {i === 0 && <span className={styles.coverLabel}>Cover</span>}
                </div>
              ))}

              {photos.length < 5 && (
                <label className={styles.photoUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoAdd}
                    style={{ display: 'none' }}
                  />
                  <Upload size={22} />
                  <span>Add photo</span>
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className={styles.section}>
            <h2>Basic Info</h2>

            <div className={styles.field}>
              <label>Title <span className={styles.required}>*</span></label>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. TI-84 Calculator, Engineering Textbooks..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={80}
              />
              <span className={styles.charCount}>{title.length}/80</span>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label>Price (₱) <span className={styles.required}>*</span></label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  min={0}
                />
              </div>
              <div className={styles.field}>
                <label>Condition <span className={styles.required}>*</span></label>
                <div className={styles.conditionRow}>
                  {CONDITIONS.map(c => (
                    <button
                      key={c}
                      className={`${styles.conditionChip} ${condition === c ? styles.conditionActive : ''}`}
                      onClick={() => setCondition(c)}
                      type="button"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label>Category <span className={styles.required}>*</span></label>
              <div className={styles.categoryGrid}>
                {CATEGORIES.filter(c => c.label !== 'All').map(({ label, icon }) => (
                  <button
                    key={label}
                    className={`${styles.categoryChip} ${category === label ? styles.categoryActive : ''}`}
                    onClick={() => setCategory(label)}
                    type="button"
                  >
                    <span>{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={styles.section}>
            <h2>Description</h2>
            <div className={styles.field}>
              <label>Tell buyers about your item</label>
              <textarea
                className={styles.textarea}
                placeholder="Describe the item's condition, any flaws, accessories included, reason for selling..."
                value={description}
                onChange={e => setDesc(e.target.value)}
                maxLength={500}
                rows={5}
              />
              <span className={styles.charCount}>{description.length}/500</span>
            </div>
          </div>

          {/* Tags */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Tags</h2>
              <span className={styles.sectionMeta}>Up to 5 · helps buyers find your item</span>
            </div>
            <div className={styles.tagInputRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. laptop, gaming, books..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button className={styles.addTagBtn} onClick={addTag} type="button">
                <Plus size={16} />
              </button>
            </div>
            {tags.length > 0 && (
              <div className={styles.tagList}>
                {tags.map(t => (
                  <span key={t} className={styles.tag}>
                    {t}
                    <button onClick={() => setTags(prev => prev.filter(x => x !== t))}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Meetup */}
          <div className={styles.section}>
            <h2>Meetup Location</h2>
            <div className={styles.meetupOptions}>
              {MEETUP_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`${styles.meetupChip} ${meetup === opt ? styles.meetupActive : ''}`}
                  onClick={() => setMeetup(opt)}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Boost listing card */}
          <div className={styles.section}>
            <h2>Boost Listing</h2>
            <div className={styles.planList}>
              {[
                { id: '1d' as const, label: '1 day (24hr.)', amount: 25 },
                { id: '3d' as const, label: '3 days (72hr.)', amount: 60 },
                { id: '7d' as const, label: '7 days (168hr.)', amount: 120 },
              ].map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={`${styles.planBtn} ${selectedBoost === plan.id ? styles.planBtnActive : ''}`}
                  onClick={() => setSelectedBoost(plan.id)}
                >
                  <span>{plan.label}</span>
                  <strong>₱{plan.amount}</strong>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom publish button: left aligned with margin */}
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-start' }}>
            <button
              className={`${styles.publishBtn} ${!isValid ? styles.publishBtnDisabled : ''}`}
              onClick={handleSubmit}
              disabled={!isValid}
            >
              Publish
            </button>
          </div>

        </div>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>

          {/* Preview card */}
          <div className={styles.previewCard}>
            <h3>Preview</h3>
            <div className={styles.previewImage}>
              {photos[0]
                ? <img src={photos[0]} alt="Preview" />
                : <span>No photo yet</span>
              }
            </div>
            <div className={styles.previewBody}>
              <p className={styles.previewCat}>{category || 'Category'}</p>
              <p className={styles.previewTitle}>{title || 'Your listing title'}</p>
              <p className={styles.previewPrice}>{price ? `₱${Number(price).toLocaleString()}` : '₱0'}</p>
            </div>
          </div>

          {/* Tips */}
          <div className={styles.tips}>
            <h3><Info size={14} /> Listing tips</h3>
            <ul>
              <li>Clear, well-lit photos sell faster</li>
              <li>Be honest about the condition</li>
              <li>Price fairly — check similar listings first</li>
              <li>Respond to messages quickly</li>
              <li>Meet buyers in public spots on campus</li>
            </ul>
          </div>

        </aside>
      </div>
    </div>
  )
}
