import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MessageSquare, SendHorizontal } from 'lucide-react'
import styles from './Messages.module.css'

type Sender = 'me' | 'seller'

interface Message {
    id: number
    sender: Sender
    text: string
    timestamp: number
}

interface Conversation {
    id: string
    seller: string
    sellerId?: string
    itemId: number
    itemTitle: string
    updatedAt: number
    messages: Message[]
}

const STORAGE_KEY = 'kampus_messages'

const STARTER_CONVERSATIONS: Conversation[] = [
    {
        id: 'Sarah K.::1',
        seller: 'Sarah K.',
        itemId: 1,
        itemTitle: 'MacBook Pro 2021 - Excellent Condition',
        updatedAt: Date.now() - 60 * 60 * 1000,
        messages: [
            {
                id: Date.now() - 2,
                sender: 'seller',
                text: 'Hi! The MacBook is still available if you are interested.',
                timestamp: Date.now() - 60 * 60 * 1000,
            },
            {
                id: Date.now() - 1,
                sender: 'me',
                text: 'Great, can we meet on campus tomorrow afternoon?',
                timestamp: Date.now() - 50 * 60 * 1000,
            },
        ],
    },
]

function getConversationId(seller: string, itemId: number, sellerId?: string | null) {
    return `${sellerId || seller}::${itemId}`
}

function loadConversations() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return STARTER_CONVERSATIONS
        const parsed = JSON.parse(raw) as Conversation[]
        if (!Array.isArray(parsed)) return STARTER_CONVERSATIONS
        return parsed
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

export default function Messages() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [conversations, setConversations] = useState<Conversation[]>(loadConversations)
    const [activeConversationId, setActiveConversationId] = useState<string>(
        () => loadConversations()[0]?.id ?? ''
    )
    const [draft, setDraft] = useState('')

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
        } catch {
            // Ignore storage write failures in private mode or limited environments.
        }
    }, [conversations])

    useEffect(() => {
        const seller = searchParams.get('seller')
        const sellerId = searchParams.get('sellerId')
        const itemId = Number(searchParams.get('itemId'))
        const itemTitle = searchParams.get('itemTitle')

        if (!seller || Number.isNaN(itemId) || itemId <= 0 || !itemTitle) {
            return
        }

        const conversationId = getConversationId(seller, itemId, sellerId)

        setConversations((prev) => {
            const existing = prev.find((c) => c.id === conversationId)
            if (existing) return prev

            const starter: Conversation = {
                id: conversationId,
                seller,
                sellerId: sellerId || undefined,
                itemId,
                itemTitle,
                updatedAt: Date.now(),
                messages: [
                    {
                        id: Date.now(),
                        sender: 'me',
                        text: `Hi! Is \"${itemTitle}\" still available?`,
                        timestamp: Date.now(),
                    },
                ],
            }
            return [starter, ...prev]
        })

        setActiveConversationId(conversationId)
        navigate('/messages', { replace: true })
    }, [navigate, searchParams])

    const sortedConversations = useMemo(
        () => [...conversations].sort((a, b) => b.updatedAt - a.updatedAt),
        [conversations]
    )

    const activeConversation = sortedConversations.find((c) => c.id === activeConversationId)

    const handleSend = () => {
        const nextText = draft.trim()
        if (!nextText || !activeConversationId) return

        setConversations((prev) =>
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
                            sender: 'me',
                            text: nextText,
                            timestamp: now,
                        },
                    ],
                }
            })
        )
        setDraft('')
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

                    {sortedConversations.length === 0 ? (
                        <p className={styles.emptyState}>No conversations yet.</p>
                    ) : (
                        <div className={styles.threadList}>
                            {sortedConversations.map((conversation) => {
                                const lastMessage = conversation.messages[conversation.messages.length - 1]
                                const active = conversation.id === activeConversationId

                                return (
                                    <button
                                        key={conversation.id}
                                        className={`${styles.threadButton} ${active ? styles.threadButtonActive : ''}`}
                                        onClick={() => setActiveConversationId(conversation.id)}
                                    >
                                        <p className={styles.threadSeller}>{conversation.seller}</p>
                                        <p className={styles.threadItem}>{conversation.itemTitle}</p>
                                        <p className={styles.threadPreview}>{lastMessage?.text || 'Start the chat'}</p>
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
                                <p className={styles.chatSeller}>{activeConversation.seller}</p>
                                <p className={styles.chatItem}>{activeConversation.itemTitle}</p>
                            </header>

                            <div className={styles.messagesArea}>
                                {activeConversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`${styles.messageRow} ${message.sender === 'me' ? styles.messageMine : styles.messageSeller
                                            }`}
                                    >
                                        <div className={styles.messageBubble}>
                                            <p>{message.text}</p>
                                            <span>{formatTime(message.timestamp)}</span>
                                        </div>
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
                                <button onClick={handleSend} aria-label="Send message">
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
        </div>
    )
}
