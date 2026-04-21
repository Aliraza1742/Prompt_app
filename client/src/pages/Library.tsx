import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit3, Trash2, ChevronRight, Search, Copy, Heart } from 'lucide-react'
import { categories } from '../constants'
import { useToast } from '../providers/toast'
import { useNavigate } from 'react-router-dom'
import { usePrompts } from '../hooks/usePrompts'
import { useFavorites } from '../hooks/useFavorites'
import { copyToClipboard } from '../utils/clipboard'
import { filterPrompts } from '../utils/filters'

export default function Library() {
  const [filterCategory, setFilterCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const navigate = useNavigate()
  const { show } = useToast()

  const { prompts, loading, error, deletePrompt } = usePrompts()
  const { favorites, toggleFavorite } = useFavorites()

  const filteredPrompts = useMemo(() => {
    return filterPrompts(prompts, filterCategory, search, showFavorites, favorites)
  }, [prompts, filterCategory, search, showFavorites, favorites])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Delete this prompt?')
    if (!confirmDelete) return

    try {
      await deletePrompt(id)
    } catch {
      show('Failed to delete prompt', 'error')
    }
  }

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    show(success ? 'Copied to clipboard' : 'Copy failed', success ? 'success' : 'error')
  }

  return (
    <section className="section">
      <div className="filters">
        <div className="filters-header">
          <h2>Your Library</h2>
          <p className="hint">Manage and reuse your best performing prompts.</p>
        </div>
        <div className="filters-actions">
          <div className="chips">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${filterCategory === cat ? 'chip--active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
            <button
              type="button"
              className={`chip ${showFavorites ? 'chip--active' : ''}`}
              onClick={() => setShowFavorites((v) => !v)}
            >
              Favorites
            </button>
          </div>
          <div className="search-container" style={{ position: 'relative' }}>
            <Search className="search-icon" size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-secondary)' }} />
            <input
              className="search"
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem', width: '240px' }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="empty">
          <p>Loading your library...</p>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty">
          <p>No prompts found. Start by creating one in Studio.</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid">
          {filteredPrompts.map((prompt) => (
            <motion.article key={prompt.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card">
              <div className="card__header">
                <span className="badge">{prompt.category}</span>
                <div className="card__actions">
                  <button onClick={() => navigate('/studio', { state: { prompt } })} className="link">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(prompt.id)} className="link link--danger">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => handleCopy(prompt.content)} className="link">
                    <Copy size={16} />
                  </button>
                  <button onClick={() => toggleFavorite(prompt.id)} className="link">
                    <Heart size={16} color={favorites.includes(prompt.id) ? '#00b894' : 'var(--muted)'} />
                  </button>
                </div>
              </div>
              <h3>{prompt.title}</h3>
              <p className="card__body">{prompt.content}</p>
              <div className="card__footer">
                <span className="card__meta">{prompt.created_at && new Date(prompt.created_at).toLocaleDateString()}</span>
                <button className="link" onClick={() => navigate('/studio', { state: { prompt } })}>
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {error && <div className="error">{error}</div>}
    </section>
  )
}
