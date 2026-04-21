import { type FormEvent, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Sparkles, X, Check, ChevronRight, Shield, Target, Layout, Zap } from 'lucide-react'
import { categories } from '../constants'
import { PromptService } from '../services/promptService'
import { RefineService } from '../services/refineService'
import type { Prompt } from '../types'
import { useLocation } from 'react-router-dom'

export default function Studio() {
  const location = useLocation()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Tech')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [refineInput, setRefineInput] = useState('')
  const [refining, setRefining] = useState(false)
  const [refinedText, setRefinedText] = useState('')

  useEffect(() => {
    // If this page was navigated to with state, prefill
    const navState = (location.state || null) as { prompt?: Prompt } | null
    const prompt = navState?.prompt
    if (prompt) {
      setEditingId(prompt.id)
      setTitle(prompt.title)
      setContent(prompt.content)
      setCategory(prompt.category)
      setRefineInput(prompt.content)
    }
  }, [location.state])

  const resetForm = () => {
    setTitle('')
    setContent('')
    setCategory('Tech')
    setEditingId(null)
    setRefineInput('')
    setRefinedText('')
  }

  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload = { title, content, category }

    try {
      if (editingId) {
        await PromptService.update(editingId, payload)
      } else {
        await PromptService.create(payload)
      }
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save prompt')
    } finally {
      setSaving(false)
    }
  }

  const handleRefine = async () => {
    if (!refineInput.trim()) {
      setError('Provide text to refine')
      return
    }

    setRefining(true)
    setError('')
    try {
      const refined = await RefineService.refine({ prompt: refineInput, category })
      setRefinedText(refined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refine prompt')
    } finally {
      setRefining(false)
    }
  }

  return (
    <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="section panel">

      <div className="panel__header">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-card-hover)', color: 'var(--fg)', padding: '0.75rem', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <Plus size={24} />
          </div>
          <div>
            <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '0.3em' }}>{editingId ? 'Update Prompt' : 'Create New Prompt'}</h2>
            <p className="hint" style={{ fontSize: '1rem' }}>Capture your raw thoughts and let AI structure them.</p>
          </div>
        </div>
        {editingId && (
          <button className="ghost" onClick={resetForm}>
            <X size={16} /> Cancel
          </button>
        )}
      </div>

      <form className="form" onSubmit={handleSave}>
        <div className="field-group">
          <label>Title</label>
          <input
            placeholder="e.g., Marketing Copy Generator"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label>Category</label>
          <div className="chips">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${category === cat ? 'chip--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Prompt Content</label>
          <textarea
            rows={6}
            placeholder="Describe what you want the AI to do..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setRefineInput(e.target.value)
            }}
            required
          />
        </div>

        <div className="actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button type="submit" className="primary" disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
            {saving ? 'Saving...' : editingId ? (<><Check size={18} /> Update</>) : (<><Plus size={18} /> Save Prompt</>)}
          </button>
          <button type="button" className="secondary" onClick={handleRefine} disabled={refining} style={{ width: '100%', justifyContent: 'center' }}>
            {refining ? 'Refining...' : (<><Sparkles size={18} /> Refine with AI</>)}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {(refineInput || refinedText) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="refine">
            <div className="panel__header">
              <div>
                <span className="eyebrow">AI Refinement Engine</span>
                <h3>Structured Framework</h3>
                <div className="framework-icons" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <div className="framework-item"><Shield size={14} /> Role</div>
                  <div className="framework-item"><Target size={14} /> Task</div>
                  <div className="framework-item"><Layout size={14} /> Requirements</div>
                  <div className="framework-item"><Zap size={14} /> Instructions</div>
                </div>
              </div>
            </div>

            <div className="refine__output">
              <div className="refine__header">
                <span className="badge">Optimized Output</span>
                {refinedText && (
                  <button className="link" onClick={() => setContent(refinedText)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    Apply to prompt <ChevronRight size={14} />
                  </button>
                )}
              </div>
              {refinedText ? (
                <pre>{refinedText}</pre>
              ) : (
                <p className="hint">Click "Refine with AI" to see the magic happen.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <div className="error">{error}</div>}
    </motion.section>
  )
}
