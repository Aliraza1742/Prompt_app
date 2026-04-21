import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

export default function Home() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero"
      >
        <div className="hero-content">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✨</span>
              AI-Powered Refinement
            </span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient">Master the Art</span><br />
            of Prompt Engineering
          </motion.h1>

          <motion.p
            className="lede"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Craft, refine, and store powerful prompts using our structured framework.
            Unlock the true potential of LLMs with precision.
          </motion.p>

          <motion.div
            className="actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/studio" className="primary">
              Open Studio <ArrowRight size={16} />
            </Link>
            <Link to="/library" className="secondary">
              <Play size={16} fill="currentColor" style={{ opacity: 0.5 }} />
              Explore Library
            </Link>
          </motion.div>
        </div>

      </motion.section>
    </>
  )
}
