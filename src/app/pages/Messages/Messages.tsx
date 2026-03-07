import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MessageSquare, SendHorizontal, DollarSign, X } from 'lucide-react'
import { useListings } from '@/app/hooks/useListings'
import { useAuth } from '@/hooks/useAuth'
import styles from './Messages.module.css'

interface BaseMessage {
    id: number
    senderId: string
    senderName: string
    timestamp: number
}

interface TextMessage extends BaseMessage {
    kind: 'text'
    text: string
}

interface PriceOfferMessage extends BaseMessage {
    kind: 'price_offer'
    offerPrice: number
    commission: number
    totalAmount: number
}

interface PaymentMethodMessage extends BaseMessage {
    kind: 'payment_method'
    method: string
    commission: number
    totalAmount: number
}

type Message = TextMessage | PriceOfferMessage | PaymentMethodMessage

interface Conversation {
    id: string
    seller: string
    sellerId: string
    buyerId: string
    buyerName: string
    itemId: number
    itemTitle: string
    updatedAt: number
    messages: Message[]
}

const GLOBAL_STORAGE_KEY = 'kampus_messages_global'

const STARTER_CONVERSATIONS: Conversation[] = []

function getConversationId(itemId: number, userA: string, userB: string) {
    const [first, second] = [userA, userB].sort()
    return `${itemId}::${first}::${second}`
}

function getUserKey(user: ReturnType<typeof useAuth>['user']) {
    return user?.email || user?.id || user?.name || 'unknown'
}

function loadAllConversations() {
    try {
        const raw = localStorage.getItem(GLOBAL_STORAGE_KEY)
        if (!raw) return STARTER_CONVERSATIONS
        const parsed = JSON.parse(raw) as unknown
        if (!Array.isArray(parsed)) return STARTER_CONVERSATIONS

        // Normalize old formats from previous app versions.
        const normalized: Conversation[] = parsed
            .map((conversation): Conversation | null => {
                if (!conversation || typeof conversation !== 'object') return null

                const rawConversation = conversation as Partial<Conversation> & {
                    messages?: Array<Record<string, unknown>>
                }

                if (!Array.isArray(rawConversation.messages)) return null

                const seller = rawConversation.seller || 'Seller'
                const sellerId = rawConversation.sellerId || seller
                const buyerId = rawConversation.buyerId || 'unknown_buyer'
                const buyerName = rawConversation.buyerName || 'Buyer'
                const itemId = typeof rawConversation.itemId === 'number' ? rawConversation.itemId : 0
                const itemTitle = rawConversation.itemTitle || 'Listing'
                const updatedAt =
                    typeof rawConversation.updatedAt === 'number' ? rawConversation.updatedAt : Date.now()
                const id = rawConversation.id || getConversationId(itemId, sellerId, buyerId)

                const messages: Message[] = rawConversation.messages
                    .map((message, index): Message | null => {
                        if (!message || typeof message !== 'object') return null
                        const senderId = typeof message.senderId === 'string' ? message.senderId : buyerId
                        const senderName = typeof message.senderName === 'string' ? message.senderName : buyerName
                        const timestamp =
                            typeof message.timestamp === 'number' ? message.timestamp : Date.now() + index
                        const messageId = typeof message.id === 'number' ? message.id : timestamp + index

                                if (
                                    message.kind === 'price_offer' &&
                                    typeof (message as any).offerPrice === 'number' &&
                                    typeof (message as any).commission === 'number' &&
                                    typeof (message as any).totalAmount === 'number'
                                ) {
                                    return {
                                        id: messageId,
                                        kind: 'price_offer',
                                        senderId,
                                        senderName,
                                        timestamp,
                                        offerPrice: (message as any).offerPrice,
                                        commission: (message as any).commission,
                                        totalAmount: (message as any).totalAmount,
                                    }
                                }

                                if (
                                    message.kind === 'payment_method' &&
                                    typeof (message as any).method === 'string' &&
                                    typeof (message as any).commission === 'number' &&
                                    typeof (message as any).totalAmount === 'number'
                                ) {
                                    return {
                                        id: messageId,
                                        kind: 'payment_method',
                                        senderId,
                                        senderName,
                                        timestamp,
                                        method: (message as any).method,
                                        commission: (message as any).commission,
                                        totalAmount: (message as any).totalAmount,
                                    }
                                }

                        return {
                            id: messageId,
                            kind: 'text',
                            senderId,
                            senderName,
                            timestamp,
                            // message is a loose object from storage; cast to any to safely access fields
                            text: typeof (message as any).text === 'string' ? (message as any).text : '',
                        }
                    })
                    .filter((message): message is Message => message !== null)

                return {
                    id,
                    seller,
                    sellerId,
                    buyerId,
                    buyerName,
                    itemId,
                    itemTitle,
                    updatedAt,
                    messages,
                }
            })
            .filter((conversation): conversation is Conversation => conversation !== null)

        return normalized
    } catch {
        return STARTER_CONVERSATIONS
    }
}

function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    })
}

function formatMoney(amount: number) {
    return `₱${amount.toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

function getMessagePreview(message?: Message) {
    if (!message) return 'Start the chat'
    if (message.kind === 'price_offer') return `Price offer: ${formatMoney(message.totalAmount)}`
    if (message.kind === 'payment_method') return `Payment: ${message.method}`
    return (message as TextMessage).text || 'Start the chat'
}

export default function Messages() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { listings } = useListings()
    const currentUserKey = useMemo(() => getUserKey(user), [user])
    const [allConversations, setAllConversations] = useState<Conversation[]>(loadAllConversations)
    const [activeConversationId, setActiveConversationId] = useState<string>('')
    const [draft, setDraft] = useState('')
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false)
    const [offerInput, setOfferInput] = useState('')

    const conversations = useMemo(
        () =>
            allConversations
                .filter(
                    (conversation) =>
                        conversation.buyerId === currentUserKey || conversation.sellerId === currentUserKey
                )
                .sort((a, b) => b.updatedAt - a.updatedAt),
        [allConversations, currentUserKey]
    )

    useEffect(() => {
        setAllConversations(loadAllConversations())
    }, [currentUserKey])

    useEffect(() => {
        setActiveConversationId((current) => {
            if (conversations.some((conversation) => conversation.id === current)) {
                return current
            }
            return conversations[0]?.id ?? ''
        })
        setDraft('')
        setIsPriceModalOpen(false)
        setOfferInput('')
    }, [conversations])

    useEffect(() => {
        try {
            localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(allConversations))
        } catch {
            // Ignore storage write failures in private mode or limited environments.
        }
    }, [allConversations])

    useEffect(() => {
        if (!user) return

        const seller = searchParams.get('seller')
        const sellerId = searchParams.get('sellerId')
        const itemId = Number(searchParams.get('itemId'))
        const itemTitle = searchParams.get('itemTitle')

    const paymentMethod = searchParams.get('paymentMethod')
    const cardLast4 = searchParams.get('cardLast4')

    if (!seller || Number.isNaN(itemId) || itemId <= 0 || !itemTitle) {
            return
        }

        const sellerParticipantId = sellerId || seller
        const buyerId = currentUserKey
        const conversationId = getConversationId(itemId, buyerId, sellerParticipantId)
        const autoMessage = `Hi! Is "${itemTitle}" still available?`

        setAllConversations((prev) => {
            const existing = prev.find((c) => c.id === conversationId)
            if (existing) return prev

            const now = Date.now()
            const starter: Conversation = {
                id: conversationId,
                seller,
                sellerId: sellerParticipantId,
                buyerId,
                buyerName: user.name,
                itemId,
                itemTitle,
                updatedAt: now,
                messages: [
                    {
                        id: now,
                        kind: 'text',
                        senderId: buyerId,
                        senderName: user.name,
                        text: autoMessage,
                        timestamp: now,
                    },
                ],
            }
            return [starter, ...prev]
        })

        // If a paymentMethod param was provided, append an informational message so seller knows how buyer paid
        if (paymentMethod) {
            const now = Date.now()
            const note =
                paymentMethod === 'cash'
                    ? `Buyer confirmed payment: Cash (will pay in person).`
                    : paymentMethod === 'card'
                    ? `Buyer confirmed payment: Card ending ••••${cardLast4 || 'XXXX'}.`
                    : `Buyer confirmed payment via ${paymentMethod}.`

            setAllConversations((prev) =>
                prev.map((conversation) => {
                    if (conversation.id !== conversationId) return conversation
                    return {
                        ...conversation,
                        updatedAt: now,
                        messages: [
                            ...conversation.messages,
                            {
                                id: now + 1,
                                kind: 'text',
                                senderId: buyerId,
                                senderName: user.name || 'Buyer',
                                text: note,
                                timestamp: now + 1,
                            },
                        ],
                    }
                })
            )
        }

        setActiveConversationId(conversationId)
        navigate('/messages', { replace: true })
    }, [currentUserKey, navigate, searchParams, user])

    const activeConversation = conversations.find((c) => c.id === activeConversationId)
    const activeItem = activeConversation
        ? listings.find((listing) => listing.id === activeConversation.itemId)
        : undefined

    const counterpartLabel = activeConversation
        ? activeConversation.sellerId === currentUserKey
            ? activeConversation.buyerName
            : activeConversation.seller
        : ''

    const isSellerInConversation =
        !!activeConversation && activeConversation.sellerId === currentUserKey
    const offerPrice = Number.parseFloat(offerInput)
    const isOfferValid = Number.isFinite(offerPrice) && offerPrice > 0
    const offerCommission = isOfferValid ? offerPrice * 0.1 : 0
    const offerTotal = isOfferValid ? offerPrice + offerCommission : 0

    const handleSend = () => {
        const nextText = draft.trim()
        if (!nextText || !activeConversationId) return

        setAllConversations((prev) =>
            prev.map((conversation) => {
                if (conversation.id !== activeConversationId) return conversation
                const now = Date.now()
                return {
                    ...conversation,
                    updatedAt: now,
                    messages: [
                        ...conversation.messages,
                        {
                            id: now,
                            kind: 'text',
                            senderId: currentUserKey,
                            senderName: user?.name || 'Student',
                            text: nextText,
                            timestamp: now,
                        },
                    ],
                }
            })
        )
        setDraft('')
    }

    const handleSendPriceOffer = () => {
        if (!activeConversation || !isSellerInConversation || !isOfferValid) return

        const now = Date.now()
        setAllConversations((prev) =>
            prev.map((conversation) => {
                if (conversation.id !== activeConversation.id) return conversation
                return {
                    ...conversation,
                    updatedAt: now,
                    messages: [
                        ...conversation.messages,
                        {
                            id: now,
                            kind: 'price_offer',
                            senderId: currentUserKey,
                            senderName: user?.name || 'Seller',
                            offerPrice,
                            commission: offerCommission,
                            totalAmount: offerTotal,
                            timestamp: now,
                        },
                    ],
                }
            })
        )

        setIsPriceModalOpen(false)
        setOfferInput('')
    }

    const handleOpenPayment = (offerMessage: PriceOfferMessage) => {
        if (!activeConversation) return

        const params = new URLSearchParams({
            amount: String(offerMessage.totalAmount),
            itemId: String(activeConversation.itemId),
            itemTitle: activeConversation.itemTitle,
            seller: activeConversation.seller,
            sellerId: activeConversation.sellerId,
            conversationId: activeConversation.id,
        })

        navigate(`/payment?${params.toString()}`)
    }

    return (
        <div className={styles.page}>
            <div className={styles.topBar}>
                <Link to="/" className={styles.backBtn}>
                    <ArrowLeft size={16} />
                    Back to listings
                </Link>
            </div>

            <div className={styles.shell}>
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <MessageSquare size={17} />
                        <h1>Messages</h1>
                    </div>

                    {conversations.length === 0 ? (
                        <p className={styles.emptyState}>No conversations yet.</p>
                    ) : (
                        <div className={styles.threadList}>
                            {conversations.map((conversation) => {
                                const lastMessage = conversation.messages[conversation.messages.length - 1]
                                const active = conversation.id === activeConversationId
                                const counterpart =
                                    conversation.sellerId === currentUserKey
                                        ? conversation.buyerName
                                        : conversation.seller

                                return (
                                    <button
                                        key={conversation.id}
                                        className={`${styles.threadButton} ${active ? styles.threadButtonActive : ''}`}
                                        onClick={() => setActiveConversationId(conversation.id)}
                                    >
                                        <p className={styles.threadSeller}>{counterpart}</p>
                                        <p className={styles.threadItem}>{conversation.itemTitle}</p>
                                        <p className={styles.threadPreview}>{getMessagePreview(lastMessage)}</p>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </aside>

                <section className={styles.chatPanel}>
                    {activeConversation ? (
                        <>
                            <header className={styles.chatHeader}>
                                <p className={styles.chatSeller}>{counterpartLabel}</p>
                                <p className={styles.chatItem}>{activeConversation.itemTitle}</p>
                            </header>

                            <div className={styles.itemCardWrap}>
                                <Link to={`/item/${activeConversation.itemId}`} className={styles.itemCard}>
                                    <div className={styles.itemCardImageWrap}>
                                        {activeItem?.image ? (
                                            <img
                                                src={activeItem.image}
                                                alt={activeConversation.itemTitle}
                                                className={styles.itemCardImage}
                                            />
                                        ) : (
                                            <div className={styles.itemCardImageFallback}>Listing</div>
                                        )}
                                    </div>
                                    <div className={styles.itemCardBody}>
                                        <p className={styles.itemCardLabel}>Listing</p>
                                        <p className={styles.itemCardTitle}>{activeConversation.itemTitle}</p>
                                        {activeItem?.price !== undefined && (
                                            <p className={styles.itemCardPrice}>₱{activeItem.price.toLocaleString('en-PH')}</p>
                                        )}
                                    </div>
                                </Link>
                            </div>

                            <div className={styles.messagesArea}>
                                {activeConversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`${styles.messageRow} ${message.senderId === currentUserKey ? styles.messageMine : styles.messageSeller
                                            }`}
                                    >
                                        {message.kind === 'price_offer' ? (
                                            <div className={`${styles.messageBubble} ${styles.offerBubble}`}>
                                                <p className={styles.offerHeader}>Price Offer</p>
                                                <div className={styles.offerReceipt}>
                                                    {activeConversation.buyerId === currentUserKey &&
                                                        message.senderId === activeConversation.sellerId ? (
                                                        <div className={`${styles.offerRow} ${styles.offerTotal}`}>
                                                            <span className={styles.offerLabel}>Total amount</span>
                                                            <span className={styles.offerValue}>{formatMoney(message.totalAmount)}</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className={styles.offerRow}>
                                                                <span className={styles.offerLabel}>Item price</span>
                                                                <span className={styles.offerValue}>{formatMoney(message.offerPrice)}</span>
                                                            </div>
                                                            <div className={styles.offerRow}>
                                                                <span className={styles.offerLabel}>10% commission</span>
                                                                <span className={styles.offerValue}>{formatMoney(message.commission)}</span>
                                                            </div>
                                                            <div className={`${styles.offerRow} ${styles.offerTotal}`}>
                                                                <span className={styles.offerLabel}>Total</span>
                                                                <span className={styles.offerValue}>{formatMoney(message.totalAmount)}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {activeConversation.buyerId === currentUserKey &&
                                                    message.senderId === activeConversation.sellerId ? (
                                                    <button
                                                        className={styles.payBtn}
                                                        onClick={() => handleOpenPayment(message)}
                                                    >
                                                        Pay
                                                    </button>
                                                ) : (
                                                    <p className={styles.offerMeta}>Awaiting buyer payment</p>
                                                )}

                                                <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                                            </div>
                                                ) : message.kind === 'payment_method' ? (
                                                    <div className={`${styles.messageBubble} ${styles.offerBubble}`}>
                                                        <p className={styles.offerHeader}>Payment Method</p>
                                                        <div className={styles.offerReceipt}>
                                                            <div className={styles.offerRow}>
                                                                <span className={styles.offerLabel}>Method</span>
                                                                <span className={styles.offerValue}>{(message as PaymentMethodMessage).method}</span>
                                                            </div>
                                                            <div className={`${styles.offerRow} ${styles.offerTotal}`}>
                                                                <span className={styles.offerLabel}>Total</span>
                                                                <span className={styles.offerValue}>{formatMoney((message as PaymentMethodMessage).totalAmount)}</span>
                                                            </div>
                                                        </div>
                                                        <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                                                    </div>
                                                ) : (
                                                    <div className={styles.messageBubble}>
                                                        <p>{(message as TextMessage).text}</p>
                                                        <span className={styles.messageTime}>{formatTime(message.timestamp)}</span>
                                                    </div>
                                                )}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.composer}>
                                <input
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    placeholder="Type your message..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSend()
                                    }}
                                />
                                {isSellerInConversation && (
                                    <button
                                        className={styles.priceBtn}
                                        onClick={() => setIsPriceModalOpen(true)}
                                        aria-label="Set offer price"
                                        title="Set offer price"
                                    >
                                        <DollarSign size={16} />
                                    </button>
                                )}
                                <button className={styles.sendBtn} onClick={handleSend} aria-label="Send message">
                                    <SendHorizontal size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.placeholder}>
                            Open a conversation from an item to start messaging a seller.
                        </div>
                    )}
                </section>
            </div>

            {isPriceModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsPriceModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Set Price Offer</h3>
                            <button
                                className={styles.modalClose}
                                onClick={() => setIsPriceModalOpen(false)}
                                aria-label="Close price modal"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <label className={styles.modalLabel}>Item price</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={offerInput}
                            onChange={(e) => setOfferInput(e.target.value)}
                            placeholder="Enter amount"
                            className={styles.modalInput}
                        />

                        <div className={styles.summaryBox}>
                            <div className={styles.summaryRow}>
                                <span>10% commission tax</span>
                                <span>{formatMoney(offerCommission)}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                                <span>Total amount</span>
                                <span>{formatMoney(offerTotal)}</span>
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setIsPriceModalOpen(false)}>
                                Cancel
                            </button>
                            <button className={styles.confirmBtn} onClick={handleSendPriceOffer} disabled={!isOfferValid}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
