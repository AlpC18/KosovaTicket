import { useState } from 'react'
import { ChevronLeft, ChevronRight, Ticket, BusFront, Music, Theater } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type Event = { day: number; title: string; type: 'event' | 'bus' | 'concert' | 'theater'; color: string }

const events2024: Event[] = [
    { day: 1, title: 'Sunny Hill Festival', type: 'concert', color: 'bg-yellow-500' },
    { day: 4, title: 'Dokufest Night', type: 'event', color: 'bg-purple-500' },
    { day: 7, title: 'Prishtina → Prizren', type: 'bus', color: 'bg-blue-500' },
    { day: 10, title: 'National Theatre: Hamlet', type: 'theater', color: 'bg-pink-500' },
    { day: 14, title: 'Era Istrefi Live', type: 'concert', color: 'bg-yellow-500' },
    { day: 18, title: 'Jazz Night Prizren', type: 'concert', color: 'bg-orange-500' },
    { day: 21, title: 'Prishtina → Peja', type: 'bus', color: 'bg-blue-500' },
    { day: 24, title: 'Kosovo Philharmonic', type: 'theater', color: 'bg-pink-500' },
    { day: 28, title: 'Noizy in Gjilan', type: 'concert', color: 'bg-yellow-500' },
]

const typeIcon = { event: Ticket, bus: BusFront, concert: Music, theater: Theater }
const typeLabel = { event: 'Event', bus: 'Bus Trip', concert: 'Concert', theater: 'Theater' }

export default function CalendarPage() {
    const [year, setYear] = useState(2024)
    const [month, setMonth] = useState(9) // October
    const navigate = useNavigate()

    // Build calendar days
    const firstDay = new Date(year, month, 1).getDay()
    const offset = firstDay === 0 ? 6 : firstDay - 1
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = [
        ...Array(offset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ]

    const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
    const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

    const selectedDayEvents = (day: number) => events2024.filter(e => e.day === day)

    const [selected, setSelected] = useState<number | null>(null)

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            {/* Month navigation */}
            <div className="flex items-center justify-between px-5 py-5">
                <button onClick={prevMonth} className="w-10 h-10 bg-[#1A1D2D] border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-black text-white">{MONTH_NAMES[month]}</h1>
                    <p className="text-gray-500 text-xs mt-0.5">{year}</p>
                </div>
                <button onClick={nextMonth} className="w-10 h-10 bg-[#1A1D2D] border border-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 px-4 mb-3">
                {DAY_NAMES.map(d => (
                    <div key={d} className={`text-center text-[10px] font-bold uppercase tracking-wider ${d === 'Sat' || d === 'Sun' ? 'text-yellow-600' : 'text-gray-600'}`}>{d}</div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 px-4">
                {cells.map((day, i) => {
                    if (day === null) return <div key={i} />
                    const evs = selectedDayEvents(day)
                    const isSelected = selected === day
                    const today = day === 24

                    return (
                        <button
                            key={i}
                            onClick={() => setSelected(isSelected ? null : day)}
                            className={`relative flex flex-col items-center py-2 rounded-2xl transition-all min-h-[52px] ${isSelected ? 'bg-yellow-500 text-black' : today ? 'bg-[#2A2D40] text-white ring-2 ring-yellow-500/40' : 'text-gray-300 hover:bg-[#1A1D2D]'}`}
                        >
                            <span className={`text-sm font-bold  ${isSelected ? 'text-black' : ''}`}>{day}</span>
                            {evs.length > 0 && (
                                <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                                    {evs.slice(0, 2).map((e, j) => (
                                        <div key={j} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black/50' : e.color}`} />
                                    ))}
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Selected day events */}
            <div className="px-4 mt-5">
                {selected && selectedDayEvents(selected).length > 0 ? (
                    <>
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                            {MONTH_NAMES[month]} {selected} · Events
                        </h2>
                        <div className="space-y-3">
                            {selectedDayEvents(selected).map((e, i) => {
                                const Icon = typeIcon[e.type]
                                return (
                                    <button
                                        key={i}
                                        onClick={() => navigate('/seat-selection')}
                                        className="w-full flex items-center gap-4 bg-[#1A1D2D] rounded-2xl p-4 border border-gray-800 hover:border-yellow-500/30 transition-all text-left group"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${e.color}/20`}>
                                            <Icon className={`w-5 h-5 ${e.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-white text-sm">{e.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{typeLabel[e.type]}</p>
                                        </div>
                                        <span className="text-yellow-500 text-xs font-bold border border-yellow-500/30 px-3 py-1.5 rounded-xl group-hover:bg-yellow-500/10 transition-colors">Book</span>
                                    </button>
                                )
                            })}
                        </div>
                    </>
                ) : selected ? (
                    <div className="flex flex-col items-center py-10 text-gray-600">
                        <p className="font-semibold text-sm">No events on {MONTH_NAMES[month]} {selected}</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-8 text-gray-600">
                        <p className="text-sm">Tap a day to see events</p>
                    </div>
                )}
            </div>
        </div>
    )
}
