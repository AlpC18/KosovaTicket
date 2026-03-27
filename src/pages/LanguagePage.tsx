import { useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const languages = [
    { code: 'sq', name: 'Shqip', native: 'Albanish', flag: '🇽🇰' },
    { code: 'en', name: 'English', native: 'Anglisht', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', native: 'Turqisht', flag: '🇹🇷' },
    { code: 'sr', name: 'Srpski', native: 'Sërbisht', flag: '🇷🇸' },
    { code: 'de', name: 'Deutsch', native: 'Gjermanisht', flag: '🇩🇪' },
]

const currencies = ['EUR (€)', 'USD ($)', 'GBP (£)', 'CHF (₣)']
const regions = ['Prishtina', 'Prizren', 'Peja', 'Gjilan', 'Gjakova', 'Mitrovica']

export default function LanguagePage() {
    const { t, i18n } = useTranslation()
    const [activeLang, setActiveLang] = useState(i18n.language || 'en')
    const [currency, setCurrency] = useState('EUR (€)')
    const [region, setRegion] = useState('Prishtina')

    const changeLanguage = (code: string) => {
        setActiveLang(code)
        i18n.changeLanguage(code)
    }

    return (
        <div className="flex flex-col min-h-full bg-[#1F2232] pb-28">
            <div className="px-4 pt-5 pb-4">
                <h1 className="text-2xl font-black text-white">{t('language') || 'Language & Region'}</h1>
                <p className="text-xs text-gray-500 mt-0.5">Choose your preferred language and settings</p>
            </div>

            {/* Language grid */}
            <div className="px-4 space-y-6">
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">App Language</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {languages.map(lang => {
                            const isActive = activeLang === lang.code
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 ${isActive ? 'border-yellow-500 bg-yellow-900/15 shadow-[0_0_20px_rgba(234,179,8,0.1)]' : 'border-gray-800 bg-[#1A1D2D] hover:border-gray-700'}`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-bold text-sm leading-tight ${isActive ? 'text-white' : 'text-gray-300'}`}>{lang.name}</p>
                                        <p className="text-gray-600 text-xs mt-0.5 truncate">{lang.native}</p>
                                    </div>
                                    {isActive && (
                                        <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-black" strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Currency */}
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Currency</h2>
                    <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
                        {currencies.map(c => (
                            <button
                                key={c}
                                onClick={() => setCurrency(c)}
                                className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#22253a] transition-colors"
                            >
                                <span className="text-white text-sm font-medium">{c}</span>
                                {currency === c && <Check className="w-4 h-4 text-yellow-500" strokeWidth={3} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Default City */}
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Default City</h2>
                    <div className="bg-[#1A1D2D] rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
                        {regions.map(r => (
                            <button
                                key={r}
                                onClick={() => setRegion(r)}
                                className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#22253a] transition-colors"
                            >
                                <span className="text-white text-sm font-medium">{r}</span>
                                {region === r && <Check className="w-4 h-4 text-yellow-500" strokeWidth={3} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
