import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Home, Ticket, User, ChevronLeft, Bell, Menu, Search, Heart, Gift, WifiOff } from 'lucide-react'

import HomePage from './pages/HomePage'
import DiscoverPage from './pages/DiscoverPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import PaymentPage from './pages/PaymentPage'
import TicketsPage from './pages/TicketsPage'
import ProfilePage from './pages/ProfilePage'
import PremiumPage from './pages/PremiumPage'
import NotificationsPage from './pages/NotificationsPage'
import SearchPage from './pages/SearchPage'
import MapPage from './pages/MapPage'
import OnboardingPage from './pages/OnboardingPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import EventDetailPage from './pages/EventDetailPage'
import SavedPage from './pages/SavedPage'
import RewardsPage from './pages/RewardsPage'
import SchedulePage from './pages/SchedulePage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import SupportPage from './pages/SupportPage'
import LanguagePage from './pages/LanguagePage'
import NotificationSettingsPage from './pages/NotificationSettingsPage'
import StatsPage from './pages/StatsPage'
import GroupBookingPage from './pages/GroupBookingPage'
import LiveTrackingPage from './pages/LiveTrackingPage'
import DealsPage from './pages/DealsPage'
import CalendarPage from './pages/CalendarPage'
import JourneyPlannerPage from './pages/JourneyPlannerPage'
import TransferPage from './pages/TransferPage'
import VenueMapPage from './pages/VenueMapPage'
import CancelTicketPage from './pages/CancelTicketPage'
import AdminPage from './pages/AdminPage'

const CLEAN_PAGES = ['/seat-selection', '/payment', '/onboarding', '/premium', '/event', '/group-booking', '/live-tracking', '/venue-map', '/admin']
const BACK_PAGES = ['/seat-selection', '/payment', '/event', '/order-success', '/group-booking', '/live-tracking', '/premium', '/venue-map', '/cancel-ticket', '/transfer', '/admin']
const HIDDEN_HEADER = ['/onboarding', '/order-success', '/event', '/live-tracking', '/admin']

function TopBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (HIDDEN_HEADER.some(p => pathname.startsWith(p))) return null
  const isBackPage = BACK_PAGES.some(p => pathname.startsWith(p))

  if (isBackPage) {
    return (
      <header className="flex items-center justify-between px-4 py-3 bg-[#1A1D2D] text-white border-b border-gray-800 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-yellow-500 hover:bg-white/5 rounded-xl transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="font-bold text-lg">
          <span className="text-[#6C7293]">Kosovo</span><span className="text-[#FFD700]">Pass</span>
        </div>
        <div className="w-10" />
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#1A1D2D] text-white sticky top-0 z-50 border-b border-gray-800">
      <button className="p-2 -ml-2 text-yellow-500 hover:bg-white/5 rounded-xl transition-colors">
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex flex-col items-center">
        <div className="font-bold text-lg leading-tight">
          <span className="text-[#6C7293]">Kosovo</span><span className="text-[#FFD700]">Pass</span>
        </div>
        <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Explore Kosovo</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button onClick={() => navigate('/notifications')} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-white/5 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full ring-2 ring-[#1A1D2D]" />
        </button>
        <button onClick={() => navigate('/search')} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-white/5 rounded-xl transition-colors">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}

function BottomNav() {
  const { pathname } = useLocation()
  const isClean = CLEAN_PAGES.some(p => pathname.startsWith(p))
  if (isClean || ['/onboarding', '/order-success'].includes(pathname)) return null

  const links = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Tickets', icon: Ticket, path: '/tickets' },
    { name: 'Saved', icon: Heart, path: '/saved' },
    { name: 'Rewards', icon: Gift, path: '/rewards' },
    { name: 'Profile', icon: User, path: '/profile' },
  ]

  return (
    <nav className="sticky bottom-0 bg-[#161825]/95 backdrop-blur border-t border-gray-800 z-50">
      <div className="flex justify-around items-center py-2">
        {links.map(item => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
          const Icon = item.icon
          return (
            <Link key={item.name} to={item.path} className={`flex flex-col items-center px-2 py-1.5 rounded-xl transition-colors group ${isActive ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}>
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-yellow-500/15' : 'group-hover:bg-white/5'}`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
              </div>
              <span className={`text-[9px] font-bold mt-0.5 ${isActive ? 'text-yellow-500' : 'text-gray-600'}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function MainLayout() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-[#1F2232] text-white font-sans overflow-hidden">
      <TopBar />
      {isOffline && (
        <div className="bg-red-500 text-white text-[10px] font-bold py-1.5 flex items-center justify-center gap-2 uppercase tracking-widest z-50">
          <WifiOff className="w-3 h-3" /> Offline Mode (Showing Cached Tickets)
        </div>
      )}
      <main className="flex-1 overflow-y-auto"><Outlet /></main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0A0B0F] min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md h-screen md:h-[900px] md:rounded-[44px] md:border-[6px] md:border-[#1A1D2D] overflow-hidden relative shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col">
          <Routes>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/live-tracking" element={<LiveTrackingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/journey" element={<JourneyPlannerPage />} />
              <Route path="/group-booking" element={<GroupBookingPage />} />
              <Route path="/venue-map" element={<VenueMapPage />} />
              <Route path="/seat-selection" element={<SeatSelectionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/cancel-ticket" element={<CancelTicketPage />} />
              <Route path="/history" element={<OrderHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/notification-settings" element={<NotificationSettingsPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/language" element={<LanguagePage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
