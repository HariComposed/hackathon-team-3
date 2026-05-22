// Hi-fi: Knowledge — live data from Supabase.
// Shows both the Confluence-synced knowledge table (Acme Co)
// and the braindance documents table (Standards library).

const SUPABASE_URL  = 'https://qignvmxqgwpgzdoughcf.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ252bXhxZ3dwZ3pkb3VnaGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzg5NzcsImV4cCI6MjA5NDk1NDk3N30.EkfZfNKKj-WAM21T6tDusPsAuySFu9dfAnhPqYIOKp8'

async function kbFetch(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
  })
  if (!res.ok) throw new Error(`Supabase ${res.status}`)
  return res.json()
}

function Knowledge({ initialDocId = null }) {
  const [kbPages, setKbPages]       = React.useState([])   // knowledge table
  const [stdPages, setStdPages]     = React.useState([])   // documents table
  const [activeId, setActiveId]     = React.useState(initialDocId)
  const [activeSource, setActiveSource] = React.useState('knowledge') // 'knowledge' | 'documents'
  const [doc, setDoc]               = React.useState(null)
  const [docLoading, setDocLoading] = React.useState(false)
  const [search, setSearch]         = React.useState('')
  const [loading, setLoading]       = React.useState(true)

  // Load both sources on mount
  React.useEffect(() => {
    Promise.all([
      kbFetch('knowledge?select=id,title,author,updated_at,url&order=title.asc').catch(() => []),
      kbFetch('documents?select=id,file_path,name,doc_type,category,synced_at&order=file_path.asc').catch(() => []),
    ]).then(([kb, std]) => {
      setKbPages(kb)
      setStdPages(std)
      if (!initialDocId) {
        if (kb.length > 0) { setActiveId(kb[0].id); setActiveSource('knowledge') }
        else if (std.length > 0) { setActiveId(std[0].id); setActiveSource('documents') }
      }
    }).finally(() => setLoading(false))
  }, [])

  // Load doc content when selection changes
  React.useEffect(() => {
    if (!activeId) return
    setDocLoading(true)
    setDoc(null)
    const path = activeSource === 'knowledge'
      ? `knowledge?select=id,title,content,url,author,updated_at,tags&id=eq.${activeId}`
      : `documents?select=id,name,file_path,doc_type,category,content,authority,last_reviewed,synced_at&id=eq.${activeId}`
    kbFetch(path)
      .then(rows => setDoc(rows[0] ? { ...rows[0], _source: activeSource } : null))
      .catch(console.error)
      .finally(() => setDocLoading(false))
  }, [activeId, activeSource])

  useLucide([kbPages, stdPages, activeId, search, loading])

  const q = search.trim().toLowerCase()
  const filteredKb  = q ? kbPages.filter(p => (p.title||'').toLowerCase().includes(q)) : kbPages
  const filteredStd = q ? stdPages.filter(p => (p.name||p.file_path||'').toLowerCase().includes(q)) : stdPages

  const selectDoc = (id, source) => { setActiveId(id); setActiveSource(source) }

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, background: C.bg }}>
      <KbTree
        kbPages={filteredKb}
        stdPages={filteredStd}
        loading={loading}
        activeId={activeId}
        activeSource={activeSource}
        onSelect={selectDoc}
        search={search}
        onSearch={setSearch}
        total={kbPages.length + stdPages.length}
      />
      <KbDoc doc={doc} loading={docLoading} />
      <KbDocSide doc={doc} />
    </div>
  )
}

// ─── Left sidebar ─────────────────────────────────────────────
function KbTree({ kbPages, stdPages, loading, activeId, activeSource, onSelect, search, onSearch, total }) {
  return (
    <aside style={{
      width: 296, background: '#FFFFFF', borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      <header style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="library" size={18} color={C.purple} />
        <div style={{ fontSize: 15, fontWeight: 600, color: C.fg, flex: 1 }}>Knowledge</div>
      </header>

      {/* Search */}
      <div style={{ padding: '0 12px 12px' }}>
        <div style={{
          height: 32, padding: '0 10px',
          border: `1px solid ${C.border}`, borderRadius: 8,
          background: C.bg, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="search" size={12} color={C.muted} />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder={`Search ${total} docs…`}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 12, color: C.fg, fontFamily: 'inherit',
            }}
          />
          {search && (
            <span onClick={() => onSearch('')} style={{ cursor: 'pointer', color: C.muted, fontSize: 12 }}>✕</span>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 4px 16px' }}>
        {loading ? (
          <div style={{ padding: '24px 16px', fontSize: 13, color: C.muted, textAlign: 'center' }}>Loading…</div>
        ) : (
          <>
            {/* Acme Co — knowledge table */}
            <KbSectionHeader icon="building-2" label="Acme Co" count={kbPages.length} />
            {kbPages.length === 0
              ? <div style={{ padding: '4px 20px 8px', fontSize: 12, color: C.muted }}>No results</div>
              : kbPages.map(page => (
                <KbTreeItem key={page.id} label={page.title} active={activeId === page.id && activeSource === 'knowledge'} onSelect={() => onSelect(page.id, 'knowledge')} icon="file-text" />
              ))
            }

            {/* Standards — documents table */}
            <KbSectionHeader icon="book-open" label="Standards" count={stdPages.length} style={{ marginTop: 12 }} />
            {stdPages.length === 0
              ? <div style={{ padding: '4px 20px 8px', fontSize: 12, color: C.muted }}>No results</div>
              : stdPages.map(page => (
                <KbTreeItem key={page.id} label={page.name || page.file_path} active={activeId === page.id && activeSource === 'documents'} onSelect={() => onSelect(page.id, 'documents')} icon="book-marked" badge={page.category} />
              ))
            }
          </>
        )}
      </div>
    </aside>
  )
}

function KbSectionHeader({ icon, label, count, style }) {
  return (
    <div style={{ padding: '8px 16px 6px', display: 'flex', alignItems: 'center', gap: 6, ...style }}>
      <Icon name={icon} size={13} color={C.purple} />
      <span style={{ fontSize: 12, fontWeight: 600, color: C.purple, textTransform: 'uppercase', letterSpacing: '0.04em', flex: 1 }}>
        {label}
      </span>
      <span style={{ fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace' }}>{count}</span>
    </div>
  )
}

function KbTreeItem({ label, active, onSelect, icon = 'file-text', badge }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
      style={{
        padding: '6px 8px 6px 20px',
        borderRadius: 6,
        background: active ? 'rgba(108,92,231,.08)' : (hover ? C.bg : 'transparent'),
        display: 'flex', alignItems: 'center', gap: 6,
        cursor: 'pointer', position: 'relative',
      }}
    >
      {active && (
        <span style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 2, background: C.purple, borderRadius: 9999 }} />
      )}
      <Icon name={icon} size={13} color={active ? C.purple : C.mutedLight} />
      <span style={{
        fontSize: 13, color: active ? C.purple : C.fg,
        fontWeight: active ? 600 : 500,
        flex: 1, minWidth: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{label}</span>
      {badge && (
        <span style={{ fontSize: 10, color: C.muted, background: C.bgSoft, padding: '1px 5px', borderRadius: 3, flexShrink: 0 }}>{badge}</span>
      )}
    </div>
  )
}

// ─── Lightweight markdown renderer ────────────────────────────
function renderInline(text) {
  // Bold, italic, inline code — returns array of React nodes
  const parts = []
  let i = 0, buf = ''
  while (i < text.length) {
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1)
      if (end !== -1) {
        if (buf) parts.push(buf); buf = ''
        parts.push(<code key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.88em', background: 'rgba(108,92,231,.08)', color: '#6c5ce7', padding: '1px 5px', borderRadius: 3 }}>{text.slice(i+1, end)}</code>)
        i = end + 1; continue
      }
    }
    if (text[i] === '*' && text[i+1] === '*') {
      const end = text.indexOf('**', i + 2)
      if (end !== -1) {
        if (buf) parts.push(buf); buf = ''
        parts.push(<strong key={i} style={{ fontWeight: 600, color: '#2d3436' }}>{text.slice(i+2, end)}</strong>)
        i = end + 2; continue
      }
    }
    if (text[i] === '_' && text[i+1] === '_') {
      const end = text.indexOf('__', i + 2)
      if (end !== -1) {
        if (buf) parts.push(buf); buf = ''
        parts.push(<strong key={i} style={{ fontWeight: 600 }}>{text.slice(i+2, end)}</strong>)
        i = end + 2; continue
      }
    }
    if (text[i] === '*' && text[i+1] !== '*') {
      const end = text.indexOf('*', i + 1)
      if (end !== -1) {
        if (buf) parts.push(buf); buf = ''
        parts.push(<em key={i}>{text.slice(i+1, end)}</em>)
        i = end + 1; continue
      }
    }
    buf += text[i]; i++
  }
  if (buf) parts.push(buf)
  return parts
}

function MarkdownContent({ content }) {
  if (!content) return <span style={{ color: '#b2bec3', fontStyle: 'italic' }}>No content</span>

  const lines = content.split('\n')
  const nodes = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trimStart().startsWith('```')) {
      const lang = line.trim().slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]); i++
      }
      nodes.push(
        <pre key={i} style={{
          background: '#f8f7ff', border: '1px solid rgba(108,92,231,.15)',
          borderRadius: 8, padding: '14px 18px', margin: '20px 0',
          overflowX: 'auto', fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13, lineHeight: 1.6, color: '#2d3436',
        }}>
          {lang && <div style={{ fontSize: 10, color: '#b2bec3', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lang}</div>}
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      i++; continue
    }

    // Headings
    const h3 = line.match(/^### (.+)/)
    if (h3) {
      nodes.push(<h3 key={i} style={{ fontSize: 16, fontWeight: 600, color: '#2d3436', margin: '28px 0 8px', letterSpacing: '-0.01em' }}>{renderInline(h3[1])}</h3>)
      i++; continue
    }
    const h2 = line.match(/^## (.+)/)
    if (h2) {
      nodes.push(
        <h2 key={i} style={{ fontSize: 20, fontWeight: 600, color: '#2d3436', margin: '36px 0 10px', letterSpacing: '-0.02em', paddingBottom: 8, borderBottom: '1px solid #f0eeff' }}>
          {renderInline(h2[1])}
        </h2>
      )
      i++; continue
    }
    const h1 = line.match(/^# (.+)/)
    if (h1) {
      nodes.push(<h1 key={i} style={{ fontSize: 26, fontWeight: 700, color: '#2d3436', margin: '0 0 16px', letterSpacing: '-0.02em' }}>{renderInline(h1[1])}</h1>)
      i++; continue
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      nodes.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid #f0eeff', margin: '28px 0' }} />)
      i++; continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const qLines = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        qLines.push(lines[i].slice(2)); i++
      }
      nodes.push(
        <blockquote key={i} style={{
          borderLeft: '3px solid #6c5ce7', margin: '16px 0',
          paddingLeft: 16, color: '#636e72', fontStyle: 'italic',
        }}>
          {qLines.map((q, qi) => <p key={qi} style={{ margin: '4px 0' }}>{renderInline(q)}</p>)}
        </blockquote>
      )
      continue
    }

    // Unordered list — collect consecutive list items
    if (/^(\s*)([-*+]) /.test(line)) {
      const items = []
      while (i < lines.length && /^(\s*)([-*+]) /.test(lines[i])) {
        const indent = lines[i].match(/^(\s*)/)[1].length
        const text = lines[i].replace(/^\s*[-*+] /, '')
        items.push({ indent, text, key: i })
        i++
      }
      nodes.push(
        <ul key={`ul-${i}`} style={{ margin: '12px 0', paddingLeft: 24, listStyle: 'disc' }}>
          {items.map(it => (
            <li key={it.key} style={{ margin: '4px 0', fontSize: 15, color: '#636e72', lineHeight: 1.7, marginLeft: it.indent * 8 }}>
              {renderInline(it.text)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push({ text: lines[i].replace(/^\d+\. /, ''), key: i }); i++
      }
      nodes.push(
        <ol key={`ol-${i}`} style={{ margin: '12px 0', paddingLeft: 24, listStyle: 'decimal' }}>
          {items.map(it => (
            <li key={it.key} style={{ margin: '4px 0', fontSize: 15, color: '#636e72', lineHeight: 1.7 }}>
              {renderInline(it.text)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Frontmatter-style key: value lines (common in standards docs)
    if (/^[a-zA-Z_]+:\s+\S/.test(line) && !line.startsWith(' ')) {
      const [k, ...vParts] = line.split(':')
      const v = vParts.join(':').trim()
      nodes.push(
        <div key={i} style={{ display: 'flex', gap: 8, margin: '3px 0', fontSize: 14 }}>
          <span style={{ color: '#b2bec3', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, minWidth: 100 }}>{k}</span>
          <span style={{ color: '#636e72' }}>{renderInline(v)}</span>
        </div>
      )
      i++; continue
    }

    // Blank line → spacing
    if (line.trim() === '') {
      nodes.push(<div key={i} style={{ height: 10 }} />)
      i++; continue
    }

    // Normal paragraph
    nodes.push(
      <p key={i} style={{ margin: '0 0 2px', fontSize: 15, color: '#636e72', lineHeight: 1.75 }}>
        {renderInline(line)}
      </p>
    )
    i++
  }

  return <div style={{ paddingTop: 8 }}>{nodes}</div>
}

// ─── Doc reader (no Icon/useLucide — avoids DOM reconciler crash) ─────────────
function KbDoc({ doc, loading }) {
  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF', color: C.muted, fontSize: 14 }}>
        Loading…
      </div>
    )
  }

  if (!doc) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF', color: C.muted, fontSize: 14 }}>
        Select a page
      </div>
    )
  }

  const isStandard = doc._source === 'documents'
  const title = isStandard ? (doc.name || doc.file_path) : doc.title
  const sourceLabel = isStandard ? (doc.doc_type || 'Standard') : 'Confluence'
  const breadcrumb = isStandard ? (doc.category || 'Standards') : 'Acme Co'
  const dateVal = isStandard ? doc.synced_at : doc.updated_at
  const dateLabel = dateVal
    ? new Date(dateVal).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FFFFFF' }}>
      <div style={{ padding: '20px 48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted, marginBottom: 16 }}>
          <span>{isStandard ? '📖' : '📚'}</span>
          <span style={{ color: C.muted }}>{breadcrumb}</span>
          <span>›</span>
          <span style={{ color: C.fg, fontWeight: 500 }}>{title}</span>
          <div style={{ flex: 1 }} />
          {doc.url && (
            <a href={doc.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: C.muted, textDecoration: 'none', fontSize: 12 }}>
              ↗ {isStandard ? 'Source' : 'Confluence'}
            </a>
          )}
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '20px 48px 96px' }}>
        <div style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px',
            borderRadius: 4, background: C.bgSoft, color: C.muted, marginBottom: 12,
            textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>{sourceLabel}</span>
          <h1 style={{ margin: '12px 0 8px', fontSize: 36, fontWeight: 600, color: C.fg, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
            {title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
            {doc.author && (
              <>
                <Avatar name={doc.author} size={22} bg={GRAD_LOGO} />
                <span>{doc.author}</span>
                <span style={{ color: C.mutedLight }}>·</span>
              </>
            )}
            {doc.authority && <span>Authority: {doc.authority}</span>}
            {dateLabel && <span>{isStandard ? 'Synced' : 'Updated'} {dateLabel}</span>}
          </div>
        </div>

        {doc.tags && doc.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 24 }}>
            {doc.tags.map(t => (
              <span key={t} style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 4,
                background: C.bgSoft, color: C.body, fontWeight: 500,
              }}>#{t}</span>
            ))}
          </div>
        )}

        <MarkdownContent content={doc.content} />
      </article>
    </div>
  )
}

// ─── Right sidebar (no Icon/useLucide) ────────────────────────
function KbDocSide({ doc }) {
  return (
    <aside style={{ width: 260, padding: '24px 16px', borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', overflowY: 'auto' }}>
      {doc && (
        <>
          {doc.author && (
            <>
              <Eyebrow>Author</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <Avatar name={doc.author} size={22} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{doc.author}</div>
                </div>
              </div>
            </>
          )}

          {doc.tags && doc.tags.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <Eyebrow>Labels</Eyebrow>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 12 }}>
                {doc.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 4,
                    background: C.bgSoft, color: C.body, fontWeight: 500,
                  }}>#{t}</span>
                ))}
              </div>
            </div>
          )}

          {doc.url && (
            <div style={{ marginTop: 24 }}>
              <Eyebrow>Source</Eyebrow>
              <a href={doc.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: 12, color: C.purple, textDecoration: 'none' }}>
                ↗ {doc._source === 'documents' ? 'View source' : 'View in Confluence'}
              </a>
            </div>
          )}
          {doc.file_path && (
            <div style={{ marginTop: 24 }}>
              <Eyebrow>File path</Eyebrow>
              <div style={{ marginTop: 8, fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-all' }}>{doc.file_path}</div>
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Eyebrow>Related · Claude</Eyebrow>
            <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: 'rgba(108,92,231,.06)', border: `1px solid rgba(108,92,231,.20)` }}>
              <div style={{ fontSize: 12, color: C.body, lineHeight: 1.5 }}>
                This doc is synced from Confluence and available for Claude to reference across all projects.
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

window.Knowledge = Knowledge
