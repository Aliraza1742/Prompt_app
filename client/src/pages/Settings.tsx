import { useState } from 'react'
import { useTheme } from '../providers/theme'
import { Settings as SettingsIcon, Save, Moon, Sun } from 'lucide-react'

export default function Settings() {
  const { theme, toggle } = useTheme()
  const [apiBase, setApiBase] = useState(() => localStorage.getItem('api_base_override') || '')

  const saveApiBase = () => {
    localStorage.setItem('api_base_override', apiBase.trim())
    alert('API base override saved.')
  }

  return (
    <section className="section panel">
      <div className="panel__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-card-hover)', color: 'var(--fg)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <SettingsIcon size={20} />
          </div>
          <div>
            <h2 className="page-title">Settings</h2>
            <p className="hint">Customize your workflow.</p>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="card settings-card">
          <h3>Appearance</h3>
          <p className="hint">Manage the look and feel of your studio preference.</p>
          <div className="field-group">
            <label className="label">Theme Preference</label>
            <div className="actions" style={{ justifyContent: 'flex-start', marginTop: '0.5rem' }}>
              <button className={`secondary ${theme === 'dark' ? 'active' : ''}`} onClick={toggle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                Switch to {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </div>

        <div className="card settings-card">
          <h3>Developer Config</h3>
          <p className="hint">Advanced configuration for API endpoints.</p>
          <div className="field-group">
            <label className="label">API Base (Override)</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <input
                  placeholder="http://localhost:4000"
                  value={apiBase}
                  onChange={(e) => setApiBase(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <button className="primary" onClick={saveApiBase} style={{ whiteSpace: 'nowrap' }}>
                <Save size={16} /> Save
              </button>
            </div>
            <p className="hint" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              Leave empty to use default. Requires refresh to take effect.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
