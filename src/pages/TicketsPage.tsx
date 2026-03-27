import { QrCode, BusFront, Ticket as TicketIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import QRCode from 'react-qr-code'
import { useStore } from '../store/useStore'

export default function TicketsPage() {
    const { tickets } = useStore()
    const activeTickets = tickets.filter(t => t.status === 'active')
    const nextTrip = activeTickets[0]
    const upcomingTrips = activeTickets.slice(1)

    return (
        <div className="flex flex-col h-full bg-[#1F2232]">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
                <button className="flex-1 py-4 text-sm font-bold border-b-2 border-yellow-500 text-yellow-500">
                    Active
                </button>
                <button className="flex-1 py-4 text-sm font-bold text-gray-500 hover:text-gray-300 transition-colors">
                    Past
                </button>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-24">
                {activeTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center pt-20 text-gray-500 space-y-4">
                        <TicketIcon className="w-16 h-16 opacity-50" />
                        <p>No active tickets found.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Next Trip</h2>

                        {/* Main Ticket */}
                        {nextTrip && (
                            <div className="bg-[#1A1D2D] rounded-3xl border border-yellow-500/20 shadow-2xl overflow-hidden relative">

                                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[#1F2232] rounded-full"></div>
                                <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#1F2232] rounded-full"></div>

                                {/* Header section */}
                                <div className="p-6 border-b border-gray-800 border-dashed">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white leading-tight">{nextTrip.title}</h3>
                                            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                                <span>KosovoPass</span> <span className="w-1 h-1 bg-gray-600 rounded-full"></span> <span>{nextTrip.type}</span>
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 flex items-center justify-center text-yellow-500 shadow-inner">
                                            {nextTrip.type === 'bus' ? <BusFront className="w-6 h-6" /> : <TicketIcon className="w-6 h-6" />}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Date & Time</span>
                                            <span className="text-white font-medium text-sm">{nextTrip.date}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Location</span>
                                            <span className="text-white font-medium text-sm">{nextTrip.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Price</span>
                                            <span className="text-white font-medium text-sm">{nextTrip.price}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Status</span>
                                            <span className="text-white font-medium text-sm capitalize">{nextTrip.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* QR Section */}
                                <div className="p-8 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1A1D2D] to-[#161825]">
                                    <div className="bg-white p-4 rounded-xl shadow-xl">
                                        <QRCode value={nextTrip.qrCode} size={160} />
                                    </div>
                                    <p className="text-gray-500 font-mono text-xs tracking-[0.3em] mt-6">{nextTrip.id}</p>

                                    <Button className="w-full mt-6 bg-[#2A2D40] hover:bg-[#32364c] text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all border border-gray-700">
                                        Add to Apple Wallet
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Upcoming List */}
                        {upcomingTrips.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Upcoming Tickets</h2>
                                <div className="space-y-4">
                                    {upcomingTrips.map((ticket) => (
                                        <div key={ticket.id} className="bg-[#1A1D2D] p-3 rounded-2xl flex items-center gap-4 border border-gray-800 shadow-sm hover:border-gray-700 transition-colors cursor-pointer group">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-gray-800/50">
                                                {ticket.type === 'bus' ? <BusFront className="w-8 h-8 text-gray-500" /> : <TicketIcon className="w-8 h-8 text-gray-500" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-yellow-500 font-bold text-xs mb-1">{ticket.date}</p>
                                                <h4 className="font-bold text-white text-sm mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{ticket.title}</h4>
                                                <p className="text-gray-500 text-xs">{ticket.location}</p>
                                            </div>
                                            <div className="pr-2 hidden sm:block">
                                                <QrCode className="text-yellow-500 w-6 h-6 border-2 border-yellow-500/20 rounded p-1" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
