// Hi-fi: Knowledge — live data from Supabase knowledge table.
// Left: tree of RSL pages + text search. Right: doc reader.

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
  const [pages, setPages]         = React.useState([])
  const [activeId, setActiveId]   = React.useState(initialDocId)
  const [doc, setDoc]             = React.useState(null)
  const [docLoading, setDocLoading] = React.useState(false)
  const [search, setSearch]       = React.useState('')
  const [loading, setLoading]     = React.useState(true)

  // Load all pages on mount
  React.useEffect(() => {
    kbFetch('knowledge?select=id,title,author,updated_at,url&order=title.asc')
      .then(rows => {
        setPages(rows)
        if (!initialDocId && rows.length > 0) setActiveId(rows[0].id)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Load doc content when selection changes
  React.useEffect(() => {
    if (!activeId) return
    setDocLoading(true)
    setDoc(null)
    kbFetch(`knowledge?select=id,title,content,url,author,updated_at,tags&id=eq.${activeId}`)
      .then(rows => setDoc(rows[0] || null))
      .catch(console.error)
      .finally(() => setDocLoading(false))
  }, [activeId])

  useLucide([pages, activeId, doc, search, loading, docLoading])

  // Filter pages by search query
  const filtered = search.trim()
    ? pages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    : pages

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, background: C.bg }}>
      <KbTree
        pages={filtered}
        loading={loading}
        activeId={activeId}
        onSelect={setActiveId}
        search={search}
        onSearch={setSearch}
        total={pages.length}
      />
      <KbDoc doc={doc} loading={docLoading} />
      <KbDocSide doc={doc} />
    </div>
  )
}

// ─── Left sidebar ─────────────────────────────────────────────
function KbTree({ pages, loading, activeId, onSelect, search, onSearch, total }) {
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

      {/* Space header */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="building-2" size={13} color={C.purple} />
        <span style={{ fontSize: 12, fontWeight: 600, color: C.purple, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          RSL Queensland
        </span>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace', marginLeft: 'auto' }}>
          {total}
        </span>
      </div>

      {/* Page list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 4px 16px' }}>
        {loading ? (
          <div style={{ padding: '24px 16px', fontSize: 13, color: C.muted, textAlign: 'center' }}>
            Loading…
          </div>
        ) : pages.length === 0 ? (
          <div style={{ padding: '24px 16px', fontSize: 13, color: C.muted, textAlign: 'center' }}>
            No results
          </div>
        ) : pages.map(page => (
          <KbTreeItem
            key={page.id}
            page={page}
            active={activeId === page.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  )
}

function KbTreeItem({ page, active, onSelect }) {
  const [hover, setHover] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onSelect(page.id)}
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
      <Icon name="file-text" size={13} color={active ? C.purple : C.mutedLight} />
      <span style={{
        fontSize: 13,
        color: active ? C.purple : C.fg,
        fontWeight: active ? 600 : 500,
        flex: 1, minWidth: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{page.title}</span>
    </div>
  )
}

// ─── Doc reader ───────────────────────────────────────────────
function KbDoc({ doc, loading }) {
  useLucide([doc, loading])

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

  const updatedLabel = doc.updated_at
    ? new Date(doc.updated_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FFFFFF' }}>
      <div style={{ padding: '20px 48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted, marginBottom: 16 }}>
          <Icon name="library" size={12} />
          <a href="#" style={{ color: C.muted, textDecoration: 'none' }}>RSL Queensland</a>
          <Icon name="chevron-right" size={11} color={C.mutedLight} />
          <span style={{ color: C.fg, fontWeight: 500 }}>{doc.title}</span>
          <div style={{ flex: 1 }} />
          {doc.url && (
            <a href={doc.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: C.muted, textDecoration: 'none', fontSize: 12 }}>
              <Icon name="external-link" size={12} /> Confluence
            </a>
          )}
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '20px 48px 96px' }}>
        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <Badge tone="soft" icon="file-text">Confluence</Badge>
          <h1 style={{ margin: '12px 0 8px', fontSize: 36, fontWeight: 600, color: C.fg, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
            {doc.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
            {doc.author && (
              <>
                <Avatar name={doc.author} size={22} bg={GRAD_LOGO} />
                <span>{doc.author}</span>
                <span style={{ color: C.mutedLight }}>·</span>
              </>
            )}
            {updatedLabel && <span>Updated {updatedLabel}</span>}
          </div>
        </div>

        {/* Tags */}
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

        {/* Content */}
        <div style={{ fontSize: 15, color: C.body, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
          {doc.content || <span style={{ color: C.muted, fontStyle: 'italic' }}>No content</span>}
        </div>
      </article>
    </div>
  )
}

// ─── Right sidebar ────────────────────────────────────────────
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
                <Icon name="external-link" size={12} /> View in Confluence
              </a>
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
