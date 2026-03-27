import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Ticket = {
    id: string
    title: string
    date: string
    location: string
    price: string
    type: 'event' | 'bus' | 'theater'
    status: 'active' | 'used' | 'expired'
    qrCode: string
}

interface AppState {
    tickets: Ticket[]
    user: { name: string, email: string }
    addTicket: (t: Omit<Ticket, 'id' | 'qrCode' | 'status'>) => void
    useTicket: (id: string) => void
    clearTickets: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            tickets: [
                {
                    id: 'TK-12345678',
                    title: 'Sunny Hill Festival',
                    date: 'Aug 1, 2024 • 14:00',
                    location: 'Gërmia Park',
                    price: '€50.00',
                    type: 'event',
                    status: 'active',
                    qrCode: 'https://example.com/verify/TK-12345678'
                }
            ],
            user: {
                name: 'John Doe',
                email: 'john@example.com'
            },
            addTicket: (ticket) => set((state) => {
                const id = `TK-${Math.floor(Math.random() * 100000000)}`
                return {
                    tickets: [{ ...ticket, id, qrCode: `https://example.com/verify/${id}`, status: 'active' }, ...state.tickets]
                }
            }),
            useTicket: (id) => set((state) => ({
                tickets: state.tickets.map(t => t.id === id ? { ...t, status: 'used' } : t)
            })),
            clearTickets: () => set({ tickets: [] })
        }),
        {
            name: 'kosova-pass-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
