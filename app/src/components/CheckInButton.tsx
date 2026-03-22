import { useState } from 'react'
import { CheckCircle, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CheckInButton() {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCheckIn = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setChecked(true)
    }, 1200)
  }

  return (
    <AnimatePresence mode="wait">
      {checked ? (
        <motion.div
          key="done"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 bg-secondary-container text-on-surface rounded-full px-5 py-3 font-label font-semibold text-sm justify-center"
        >
          <CheckCircle size={18} className="text-secondary" />
          Check-in bestätigt!
        </motion.div>
      ) : (
        <motion.button
          key="btn"
          whileTap={{ scale: 0.96 }}
          onClick={handleCheckIn}
          disabled={loading}
          className="flex items-center gap-2 bg-secondary text-on-secondary rounded-full px-5 py-3 font-label font-bold text-sm w-full justify-center transition-all"
        >
          {loading ? (
            <span className="loader-small" />
          ) : (
            <MapPin size={16} />
          )}
          {loading ? 'Bestätige...' : 'Check-In'}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
