import { useState } from 'react'
import { CheckCircle, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CheckInButtonProps {
  ehrensacheName?: string
}

export default function CheckInButton({ }: CheckInButtonProps) {
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
          className="flex items-center gap-2 bg-secondary-light text-secondary rounded-xl px-4 py-3 font-semibold text-sm"
        >
          <CheckCircle size={18} className="fill-secondary text-white" />
          Check-in bestätigt!
        </motion.div>
      ) : (
        <motion.button
          key="btn"
          whileTap={{ scale: 0.96 }}
          onClick={handleCheckIn}
          disabled={loading}
          className="flex items-center gap-2 bg-primary text-white rounded-xl px-4 py-3 font-semibold text-sm shadow-md active:shadow-sm transition-all w-full justify-center"
        >
          {loading ? (
            <span className="loader-small" />
          ) : (
            <MapPin size={16} />
          )}
          {loading ? 'Bestätige...' : 'Jetzt einchecken'}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
