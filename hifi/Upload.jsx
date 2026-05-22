// Hi-fi: Knowledge upload flow — drag-drop / paste / type → Claude pre-fills metadata → user reviews.
// Surfaces as a modal from the Knowledge app or any "+ Upload" button.

const KB_URL  = 'https://qignvmxqgwpgzdoughcf.supabase.co'
const KB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ252bXhxZ3dwZ3pkb3VnaGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzg5NzcsImV4cCI6MjA5NDk1NDk3N30.EkfZfNKKj-WAM21T6tDusPsAuySFu9dfAnhPqYIOKp8'

async function kbInsert(row) {
  const res = await fetch(`${KB_URL}/rest/v1/knowledge`, {
    method: 'POST',
    headers: {
      apikey: KB_ANON,
      Authorization: `Bearer ${KB_ANON}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Supabase ${res.status}: ${err}`)
  }
  return res.json()
}

function UploadModal({ open, onClose, onPublished }) {
  const [step, setStep] = React.useState('intake');  // 'intake' | 'review' | 'done'
  const [source, setSource] = React.useState('files');  // 'files' | 'link' | 'paste' | 'capture'
  const [stagedFiles, setStagedFiles] = React.useState([])   // { name, content, size }
  const [pasteText, setPasteText] = React.useState('')

  useLucide([open, step, source]);

  if (!open) return null;

  const handleClose = () => { setStep('intake'); setStagedFiles([]); setPasteText(''); onClose() }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,13,26,.42)',
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '64px 32px', overflowY: 'auto',
    }} onClick={handleClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 880, background: '#FFFFFF',
        borderRadius: 20, boxShadow: '0 24px 64px rgba(0,0,0,.20)',
        display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 128px)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        <UploadHeader step={step} onClose={handleClose} onBack={() => setStep('intake')} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {step === 'intake' && (
            <UploadIntake
              source={source} onSource={setSource}
              stagedFiles={stagedFiles} onStagedFiles={setStagedFiles}
              pasteText={pasteText} onPasteText={setPasteText}
              onNext={() => setStep('review')}
            />
          )}
          {step === 'review' && (
            <UploadReview
              stagedFiles={stagedFiles}
              pasteText={pasteText}
              source={source}
              onBack={() => setStep('intake')}
              onPublish={() => { setStep('done'); onPublished && onPublished() }}
            />
          )}
          {step === 'done' && <UploadDone onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
}

function UploadHeader({ step, onClose, onBack }) {
  const steps = ['Intake', 'Review', 'Done'];
  const active = { intake: 0, review: 1, done: 2 }[step];
  return (
    <header style={{ padding: '18px 24px', borderBottom: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'rgba(108,92,231,.10)', color: C.purple,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="upload-cloud" size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Add to knowledge</div>
        <div style={{ fontSize: 12, color: C.muted }}>
          Claude reads each upload, drafts metadata, and flags duplicates before anything lands in the tree.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 10px', borderRadius: 9999,
              fontSize: 12, fontWeight: 500,
              background: i === active ? 'rgba(108,92,231,.10)' : (i < active ? 'transparent' : 'transparent'),
              color: i === active ? C.purple : (i < active ? C.ok : C.muted),
            }}>
              {i < active ? <Icon name="check-circle-2" size={12} /> :
                <span style={{
                  width: 16, height: 16, borderRadius: 9999, border: `1.5px solid ${i === active ? C.purple : C.borderStrong}`,
                  background: i === active ? C.purple : '#fff', color: '#fff',
                  fontSize: 10, fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>{i + 1}</span>}
              {s}
            </span>
            {i < steps.length - 1 && <span style={{ width: 12, height: 1, background: C.border }} />}
          </React.Fragment>
        ))}
      </div>

      <IconBtn icon="x" label="Close" onClick={onClose} />
    </header>
  );
}

// ─── Step 1 — Intake ───────────────────────────────────────────
function UploadIntake({ source, onSource, stagedFiles, onStagedFiles, pasteText, onPasteText, onNext }) {
  const canProceed = source === 'files' ? stagedFiles.length > 0
    : source === 'paste' ? pasteText.trim().length > 0
    : true  // link/capture always allow next (demo)

  return (
    <div style={{ padding: '24px 28px 28px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { id: 'files',   icon: 'file-up',    label: 'Files',      sub: 'PDF, docx, md, csv' },
          { id: 'link',    icon: 'link',       label: 'Paste link', sub: 'Notion · Confluence · Drive · web' },
          { id: 'paste',   icon: 'clipboard',  label: 'Paste text', sub: 'Transcript, snippet, notes' },
          { id: 'capture', icon: 'monitor',    label: 'Capture page', sub: 'Browser extension · Cmd-Shift-K' },
        ].map(s => (
          <SourceTab key={s.id} {...s} selected={source === s.id} onClick={() => onSource(s.id)} />
        ))}
      </div>

      {source === 'files' && <FilesIntake stagedFiles={stagedFiles} onStagedFiles={onStagedFiles} />}
      {source === 'link' && <LinkIntake />}
      {source === 'paste' && <PasteIntake value={pasteText} onChange={onPasteText} />}
      {source === 'capture' && <CaptureIntake />}

      <div style={{
        marginTop: 24, padding: 14, borderRadius: 12,
        background: 'rgba(108,92,231,.04)', border: `1px solid rgba(108,92,231,.18)`,
        display: 'flex', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9999, flexShrink: 0,
          background: GRAD_BRAND, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="sparkles" size={14} />
        </div>
        <div style={{ flex: 1, fontSize: 13, color: C.body, lineHeight: 1.6 }}>
          <strong style={{ color: C.fg, fontWeight: 600 }}>Claude pre-processes each upload:</strong> reads content, drafts a title, suggests a folder, generates a 2-sentence summary, applies tags, and flags possible duplicates. You review before anything is published.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <span style={{ fontSize: 12, color: C.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="shield-check" size={12} />
          Client docs auto-restrict to the client team. PII gets scanned and flagged.
        </span>
        <Btn variant="primary" iconRight="arrow-right" onClick={onNext} disabled={!canProceed}>
          Process &amp; review
        </Btn>
      </div>
    </div>
  );
}

function SourceTab({ id, icon, label, sub, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, padding: '12px 14px',
        background: selected ? 'rgba(108,92,231,.06)' : '#FFFFFF',
        border: `${selected ? '1.5px' : '1px'} solid ${selected ? C.purple : (hover ? C.borderStrong : C.border)}`,
        borderRadius: 12, cursor: 'pointer', textAlign: 'left',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex', flexDirection: 'column', gap: 6,
        transition: 'all .15s',
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: selected ? 'rgba(108,92,231,.15)' : C.bgSoft,
        color: selected ? C.purple : C.body,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={15} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{label}</div>
      <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{sub}</div>
    </button>
  );
}

function FilesIntake({ stagedFiles, onStagedFiles }) {
  const handleFiles = (files) => {
    Array.from(files).forEach(f => {
      const sizeLabel = f.size < 1024 * 1024
        ? (f.size / 1024).toFixed(0) + ' KB'
        : (f.size / (1024 * 1024)).toFixed(1) + ' MB'
      const icon = f.name.endsWith('.pdf') ? 'file-text'
        : f.name.endsWith('.md') ? 'file-code-2'
        : f.name.endsWith('.csv') ? 'sheet'
        : 'file'
      const reader = new FileReader()
      reader.onload = (e) => {
        onStagedFiles(prev => [
          ...prev,
          { name: f.name, size: sizeLabel, content: e.target.result || '', icon, status: 'ready' }
        ])
      }
      // Read as text for text files, otherwise just store name
      if (f.type.startsWith('text/') || f.name.match(/\.(md|txt|csv|json|jsx|js|ts|tsx|html|css)$/i)) {
        reader.readAsText(f)
      } else {
        // For binary files (PDF etc) we can't read content in browser — store placeholder
        reader.onload = null
        onStagedFiles(prev => [
          ...prev,
          { name: f.name, size: sizeLabel, content: `[Binary file: ${f.name}]`, icon, status: 'ready' }
        ])
      }
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length) handleFiles(e.target.files)
    e.target.value = ''
  }

  const removeFile = (idx) => onStagedFiles(prev => prev.filter((_, i) => i !== idx))

  return (
    <>
      <label
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          border: `2px dashed ${C.borderStrong}`, borderRadius: 16,
          padding: '40px 24px', background: C.bg,
          textAlign: 'center', cursor: 'pointer',
        }}>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.md,.csv,.pptx,.txt,.png,.jpg,.js,.jsx,.ts,.tsx,.html,.json"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'rgba(108,92,231,.10)', color: C.purple,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="file-up" size={28} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Drop files here, or click to browse</div>
        <div style={{ fontSize: 12, color: C.muted }}>PDF · docx · md · csv · txt · and more</div>
        <span style={{
          marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 32, padding: '0 12px', borderRadius: 8,
          border: `1px solid ${C.border}`, background: '#fff',
          fontSize: 13, fontWeight: 500, color: C.fg,
        }}>
          Choose files
        </span>
      </label>

      {stagedFiles.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
            Staged · {stagedFiles.length} file{stagedFiles.length !== 1 ? 's' : ''}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stagedFiles.map((f, idx) => (
              <StagedFile key={idx} name={f.name} size={f.size} status={f.status} icon={f.icon} onRemove={() => removeFile(idx)} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function StagedFile({ name, size, status, progress, icon, onRemove }) {
  return (
    <div style={{
      padding: 12, borderRadius: 10,
      background: '#FFFFFF', border: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: C.bgSoft, color: C.body,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        {status === 'processing' ? (
          <div style={{ marginTop: 6, height: 4, background: C.bgSoft, borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: GRAD_BRAND, borderRadius: 9999, transition: 'width .3s' }} />
          </div>
        ) : (
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{size}</div>
        )}
      </div>
      {status === 'processing' ? (
        <Badge tone="brand" size="sm" icon="loader-circle">Reading {progress}%</Badge>
      ) : (
        <Badge tone="ok" size="sm" icon="check">Ready</Badge>
      )}
      <IconBtn icon="x" label="Remove" size={28} onClick={onRemove} />
    </div>
  );
}

function LinkIntake() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        height: 48, padding: '0 14px',
        border: `1px solid ${C.borderStrong}`, borderRadius: 12,
        background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="link" size={16} color={C.muted} />
        <input
          placeholder="Paste a Notion, Confluence, Drive, or web URL…"
          style={{
            flex: 1, border: 0, outline: 'none', fontSize: 14, color: C.fg,
            fontFamily: 'Poppins, sans-serif', background: 'transparent',
          }}
        />
        <Btn variant="primary" size="sm" icon="arrow-right">Fetch</Btn>
      </div>

      <div style={{
        padding: '12px 16px', borderRadius: 10,
        background: C.bg, border: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: '#FFFFFF', border: `1px solid ${C.border}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#000',
        }}>N</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>notion.so/composed/Acme-Braze-Audit-2026</div>
          <div style={{ fontSize: 11, color: C.muted }}>Authenticated via Composed workspace · 4 child pages will sync</div>
        </div>
        <Badge tone="ok" size="sm" icon="check">Fetched</Badge>
      </div>

      <div style={{ fontSize: 12, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="refresh-cw" size={12} />
        Linked pages stay in sync — Claude refreshes them weekly and on demand.
      </div>
    </div>
  );
}

function PasteIntake({ value, onChange }) {
  return (
    <div style={{
      border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', background: '#FFFFFF',
    }}>
      <div style={{
        padding: '10px 14px', borderBottom: `1px solid ${C.rule}`,
        display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.muted,
      }}>
        <Icon name="clipboard" size={12} />
        Paste a transcript, snippet, or notes
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Paste your content here…"
        rows={8}
        style={{
          width: '100%', border: 0, outline: 'none',
          padding: 14, fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 13, color: C.fg, lineHeight: 1.6, resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function CaptureIntake() {
  return (
    <div style={{
      padding: '32px 28px', borderRadius: 16, background: C.bg, textAlign: 'center',
      border: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, margin: '0 auto 12px',
        background: 'rgba(108,92,231,.10)', color: C.purple,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="monitor" size={28} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Install the Composed capture extension</div>
      <div style={{ fontSize: 13, color: C.muted, marginTop: 6, maxWidth: 460, margin: '6px auto 0', lineHeight: 1.6 }}>
        Grab any page in your browser — vendor docs, support threads, client portals — with a keyboard shortcut. The page lands here for Claude to clean up and file.
      </div>
      <Btn variant="primary" icon="chrome" style={{ marginTop: 14 }}>Add to Chrome</Btn>
    </div>
  );
}

// ─── Step 2 — Review ──────────────────────────────────────────
function UploadReview({ stagedFiles, pasteText, source, onBack, onPublish }) {
  // Build items list from real data
  const items = React.useMemo(() => {
    if (source === 'paste' && pasteText.trim()) {
      const firstLine = pasteText.trim().split('\n')[0].slice(0, 60)
      return [{ name: firstLine || 'Pasted text', content: pasteText.trim(), isPaste: true }]
    }
    return stagedFiles.length > 0 ? stagedFiles : [{ name: 'Demo — Acme Q2 brief', content: 'Demo content for presentation.', isDemo: true }]
  }, [stagedFiles, pasteText, source])

  const [idx, setIdx] = React.useState(0)
  const current = items[idx] || items[0]

  const [title, setTitle] = React.useState('')
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [published, setPublished] = React.useState([])

  // Auto-fill title from filename/first line when item changes
  React.useEffect(() => {
    if (!current) return
    const base = current.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    setTitle(base)
  }, [idx, current && current.name])

  const handlePublishOne = async () => {
    if (!current) return
    setSaving(true); setError(null)
    try {
      await kbInsert({
        title: title || current.name,
        content: current.content || '',
        author: 'Uploaded',
        tags: [],
        updated_at: new Date().toISOString(),
      })
      setPublished(prev => [...prev, idx])
      if (idx + 1 < items.length) {
        setIdx(i => i + 1)
      } else {
        onPublish()
      }
    } catch(e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (!current) return null
  const remaining = items.length - published.length
  const preview = (current.content || '').slice(0, 400)

  return (
    <div style={{ padding: '24px 28px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Eyebrow>Review · {idx + 1} of {items.length}</Eyebrow>
        <div style={{ flex: 1 }} />
        {items.length > 1 && idx + 1 < items.length && (
          <Btn variant="ghost" size="sm" onClick={() => { setPublished(p => [...p, idx]); setIdx(i => i + 1) }}>Skip</Btn>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        {/* Form */}
        <div style={{
          background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 16,
          padding: 20, display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <FormField label="Title" hint="Edit to taste">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%', height: 38, padding: '0 12px',
                border: `1px solid ${C.border}`, borderRadius: 8, background: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500, color: C.fg, outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </FormField>

          <FormField label="Content preview">
            <div style={{
              padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`,
              background: C.bg, fontSize: 12, color: C.muted, lineHeight: 1.6,
              maxHeight: 160, overflowY: 'auto', fontFamily: 'JetBrains Mono, monospace',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {preview || '(no text content)'}
              {(current.content || '').length > 400 && <span style={{ color: C.mutedLight }}> …</span>}
            </div>
          </FormField>

          {error && (
            <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fff3f3', border: '1px solid #fecaca', fontSize: 12, color: '#dc2626' }}>
              {error}
            </div>
          )}
        </div>

        {/* Side info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 14,
            padding: 14, display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>File info</div>
            <div style={{ fontSize: 13, color: C.fg, fontWeight: 500 }}>{current.name}</div>
            {current.size && <div style={{ fontSize: 12, color: C.muted }}>{current.size}</div>}
            <div style={{ fontSize: 12, color: C.muted }}>{(current.content || '').length.toLocaleString()} chars</div>
          </div>

          <div style={{
            padding: 14, borderRadius: 14, background: 'rgba(108,92,231,.04)', border: `1px solid rgba(108,92,231,.18)`,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.fg }}>Where it goes</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
              Saved to the <strong style={{ color: C.fg }}>Acme Co</strong> knowledge section. Visible in the Knowledge sidebar immediately after publishing.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <Btn variant="ghost" icon="arrow-left" onClick={onBack} disabled={saving}>Back</Btn>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {remaining > 1 && <span style={{ fontSize: 12, color: C.muted }}>{remaining - 1} more after this →</span>}
          <Btn variant="primary" icon={saving ? 'loader-circle' : 'check'} onClick={handlePublishOne} disabled={saving || !title.trim()}>
            {saving ? 'Saving…' : (idx + 1 < items.length ? 'Save & next' : 'Publish to knowledge')}
          </Btn>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, hint, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: C.fg, letterSpacing: '0.02em' }}>{label}</label>
        {hint && <span style={{ fontSize: 11, color: C.muted }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function FolderPicker() {
  return (
    <div style={{
      padding: '10px 12px', borderRadius: 8,
      border: `1px solid ${C.border}`, background: '#FFFFFF',
      display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
    }}>
      <Icon name="library" size={13} color={C.purple} />
      <span style={{ fontSize: 12, color: C.muted }}>Clients</span>
      <Icon name="chevron-right" size={11} color={C.mutedLight} />
      <Icon name="folder" size={13} color={C.muted} />
      <span style={{ fontSize: 12, color: C.muted }}>Acme Co</span>
      <Icon name="chevron-right" size={11} color={C.mutedLight} />
      <Icon name="folder" size={13} color={C.muted} />
      <span style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>Audits</span>
      <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 4, fontSize: 10, background: 'rgba(108,92,231,.10)', color: C.purple, fontWeight: 600 }}>SUGGESTED</span>
      <div style={{ flex: 1 }} />
      <Btn variant="ghost" size="sm" icon="folder-tree">Change…</Btn>
    </div>
  );
}

// ─── Step 3 — Done ────────────────────────────────────────────
function UploadDone({ onClose }) {
  return (
    <div style={{ padding: '40px 32px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: 'rgba(16,185,129,.10)', color: C.ok,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="check-circle-2" size={32} />
      </div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: C.fg }}>3 pages added to knowledge</h2>
      <p style={{ margin: 0, fontSize: 14, color: C.muted, maxWidth: 500, lineHeight: 1.55 }}>
        Filed under <strong style={{ color: C.fg }}>Clients · Acme Co · Audits</strong>. Cross-linked from <strong style={{ color: C.fg }}>Acme — Braze setup</strong> and the active <strong style={{ color: C.fg }}>Acme · Braze CC</strong> brief.
      </p>
      <div style={{
        background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 12,
        padding: 12, width: '100%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {[
          'Acme — Braze CC audit · Q2 2026',
          'discovery-notes-2026-05.md',
          'canvas-audit-export.csv',
        ].map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.body }}>
            <Icon name="check" size={12} color={C.ok} />
            <span style={{ flex: 1, textAlign: 'left' }}>{t}</span>
            <Icon name="external-link" size={12} color={C.mutedLight} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <Btn variant="ghost" icon="plus">Upload more</Btn>
        <Btn variant="primary" iconRight="arrow-right" onClick={onClose}>Back to knowledge</Btn>
      </div>
    </div>
  );
}

window.UploadModal = UploadModal;
