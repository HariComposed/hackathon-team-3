// Hi-fi: Knowledge — Confluence-like tree on the left, doc reader on the right.
// Top-level "Knowledge" app within Composed OS.

function Knowledge({ initialDocId = 'acme-braze-setup' }) {
  const [activeId, setActiveId] = React.useState(initialDocId);
  const [expanded, setExpanded] = React.useState({
    'sp-clients': true,
    'fl-acme': true,
    'sp-platforms': true,
    'fl-braze': true,
    'sp-bestprac': false,
    'sp-skills': false,
    'sp-internal': false,
  });
  useLucide([activeId, expanded]);
  const toggle = (id) => setExpanded({ ...expanded, [id]: !expanded[id] });

  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, background: C.bg }}>
      <KbTree activeId={activeId} expanded={expanded} onToggle={toggle} onSelect={setActiveId} />
      <KbDoc docId={activeId} />
      <KbDocSide />
    </div>
  );
}

// ─── Confluence-style tree ────────────────────────────────────
const KB_TREE = [
  {
    id: 'sp-clients', label: 'Clients', kind: 'space', icon: 'building-2', count: 83,
    children: [
      {
        id: 'fl-acme', label: 'Acme Co', kind: 'folder', icon: 'folder', count: 32,
        children: [
          { id: 'acme-braze-setup',    label: 'Acme — Braze setup' },
          { id: 'acme-shopify',        label: 'Acme — Shopify checkout' },
          { id: 'acme-discovery',      label: 'Acme — Discovery notes' },
          { id: 'acme-ip-plan',        label: 'Acme — IP warming plan' },
          { id: 'fl-acme-contracts',   label: 'Contracts', kind: 'folder', icon: 'folder', count: 4, children: [] },
          { id: 'fl-acme-campaigns',   label: 'Campaigns · 2025–26', kind: 'folder', icon: 'folder', count: 8, children: [] },
        ],
      },
      {
        id: 'fl-bloom', label: 'Bloom Co', kind: 'folder', icon: 'folder', count: 18,
        children: [
          { id: 'bloom-loyalty', label: 'Bloom — Loyalty POC' },
          { id: 'bloom-phased',  label: 'Bloom — phased CC pilot' },
        ],
      },
      { id: 'fl-outback',  label: 'Outback',  kind: 'folder', icon: 'folder', count: 24, children: [] },
      { id: 'fl-coastal',  label: 'Coastal',  kind: 'folder', icon: 'folder', count: 9, children: [] },
      { id: 'fl-lumora',   label: 'Lumora',   kind: 'folder', icon: 'folder', count: 12, children: [] },
    ],
  },
  {
    id: 'sp-platforms', label: 'Platforms', kind: 'space', icon: 'plug', count: 235,
    children: [
      {
        id: 'fl-braze', label: 'Braze', kind: 'folder', icon: 'folder', count: 147,
        children: [
          { id: 'braze-cc',        label: 'Content Cards' },
          { id: 'braze-ipw',       label: 'IP warming' },
          { id: 'braze-canvas',    label: 'Canvas flow' },
          { id: 'braze-banners',   label: 'Banners' },
          { id: 'braze-email',     label: 'Email best practice' },
          { id: 'braze-catalogs',  label: 'Catalogs' },
        ],
      },
      { id: 'fl-shopify',   label: 'Shopify',   kind: 'folder', icon: 'folder', count: 96, children: [] },
      { id: 'fl-talon',     label: 'Talon One', kind: 'folder', icon: 'folder', count: 54, children: [] },
      { id: 'fl-eagleeye',  label: 'Eagle Eye', kind: 'folder', icon: 'folder', count: 38, children: [] },
    ],
  },
  {
    id: 'sp-bestprac', label: 'Best practice', kind: 'space', icon: 'book-open', count: 41, children: [],
  },
  {
    id: 'sp-skills', label: 'Claude skills', kind: 'space', icon: 'sparkles', count: 18, children: [],
  },
  {
    id: 'sp-internal', label: 'Internal notes', kind: 'space', icon: 'lock', count: 35, children: [],
  },
];

function KbTree({ activeId, expanded, onToggle, onSelect }) {
  return (
    <aside style={{
      width: 296, background: '#FFFFFF', borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      <header style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="library" size={18} color={C.purple} />
        <div style={{ fontSize: 15, fontWeight: 600, color: C.fg, flex: 1 }}>Knowledge</div>
        <IconBtn icon="plus" label="New page" size={28} />
      </header>

      <div style={{ padding: '0 12px 12px' }}>
        <div style={{
          height: 32, padding: '0 10px',
          border: `1px solid ${C.border}`, borderRadius: 8,
          background: C.bg, display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: C.muted,
        }}>
          <Icon name="search" size={12} />
          <span style={{ flex: 1 }}>Search 412 docs…</span>
          <kbd style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            padding: '1px 5px', borderRadius: 3,
            background: '#FFF', border: `1px solid ${C.border}`,
          }}>⌘K</kbd>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TreeQuick icon="star" label="Starred" count={6} />
        <TreeQuick icon="clock" label="Recent" count={12} />
        <TreeQuick icon="pin" label="In play" count={9} note="across 4 projects" />
        <TreeQuick icon="sparkles" label="Claude-drafted" count={3} pending />
      </div>

      <div style={{ height: 1, background: C.rule, margin: '0 12px' }} />

      {/* Tree body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 4px 16px' }}>
        {KB_TREE.map(node => (
          <TreeNode key={node.id} node={node} depth={0} activeId={activeId} expanded={expanded} onToggle={onToggle} onSelect={onSelect} />
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${C.rule}`, padding: '8px 12px', display: 'flex', gap: 6 }}>
        <Btn variant="ghost" size="sm" icon="upload" fullWidth>Upload</Btn>
        <Btn variant="ghost" size="sm" icon="link" fullWidth>Paste link</Btn>
      </div>
    </aside>
  );
}

function TreeQuick({ icon, label, count, note, pending }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: '6px 8px', borderRadius: 6, textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: 8,
        background: hover ? C.bg : 'transparent',
      }}
    >
      <Icon name={icon} size={13} color={C.muted} />
      <span style={{ fontSize: 13, color: C.body, fontWeight: 500 }}>{label}</span>
      {pending && <span style={{ width: 6, height: 6, borderRadius: 9999, background: C.purple }} />}
      <span style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace' }}>{count}</span>
    </a>
  );
}

function TreeNode({ node, depth, activeId, expanded, onToggle, onSelect }) {
  const isFolder = node.kind === 'space' || node.kind === 'folder';
  const open = expanded[node.id];
  const active = !isFolder && activeId === node.id;
  const [hover, setHover] = React.useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (isFolder) onToggle(node.id);
          else onSelect(node.id);
        }}
        style={{
          padding: '5px 8px',
          paddingLeft: 8 + depth * 16,
          borderRadius: 6,
          background: active ? 'rgba(108,92,231,.08)' : (hover ? C.bg : 'transparent'),
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
          position: 'relative',
        }}
      >
        {active && (
          <span style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 2, background: C.purple, borderRadius: 9999 }} />
        )}
        {isFolder ? (
          <Icon
            name={open ? 'chevron-down' : 'chevron-right'}
            size={12} color={C.mutedLight}
            style={{ flexShrink: 0 }}
          />
        ) : (
          <span style={{ width: 12 }} />
        )}
        {isFolder ? (
          <Icon name={open ? 'folder-open' : node.icon} size={13} color={node.kind === 'space' ? C.purple : C.muted} />
        ) : (
          <Icon name="file-text" size={13} color={C.mutedLight} />
        )}
        <span style={{
          fontSize: 13, color: active ? C.purple : C.fg,
          fontWeight: active ? 600 : (node.kind === 'space' ? 600 : 500),
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{node.label}</span>
        {node.count != null && isFolder && (
          <span style={{ fontSize: 11, color: C.mutedLight, fontFamily: 'JetBrains Mono, monospace' }}>{node.count}</span>
        )}
      </div>
      {isFolder && open && node.children && node.children.length > 0 && (
        <>{node.children.map(c => (
          <TreeNode key={c.id} node={c} depth={depth + 1} activeId={activeId} expanded={expanded} onToggle={onToggle} onSelect={onSelect} />
        ))}</>
      )}
    </>
  );
}

// ─── Doc reader ───────────────────────────────────────────────
const DOC_DB = {
  'acme-braze-setup': {
    breadcrumb: ['Clients', 'Acme Co'],
    title: 'Acme — Braze setup',
    kind: 'Client',
    updated: '2 days ago by Sarah K.',
    body: 'acme-braze-setup',
  },
  'braze-cc': {
    breadcrumb: ['Platforms', 'Braze'],
    title: 'Braze · Content Cards',
    kind: 'Platform doc',
    updated: '9 days ago by Internal',
    body: 'braze-cc',
  },
};

function KbDoc({ docId }) {
  const doc = DOC_DB[docId] || DOC_DB['acme-braze-setup'];
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#FFFFFF' }}>
      {/* Page chrome */}
      <div style={{ padding: '20px 48px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted, marginBottom: 16 }}>
          <Icon name="library" size={12} />
          {doc.breadcrumb.map((b, i) => (
            <React.Fragment key={b}>
              <a href="#" style={{ color: C.muted, textDecoration: 'none' }}>{b}</a>
              <Icon name="chevron-right" size={11} color={C.mutedLight} />
            </React.Fragment>
          ))}
          <span style={{ color: C.fg, fontWeight: 500 }}>{doc.title}</span>
          <div style={{ flex: 1 }} />
          <Btn variant="primary" size="sm" icon="pin" onClick={(e) => e.preventDefault()}>Pin to brief</Btn>
          <IconBtn icon="more-horizontal" label="More" />
        </div>
      </div>

      {docId === 'acme-braze-setup' ? <DocAcmeBrazeSetup doc={doc} /> : <DocBrazeCC doc={doc} />}
    </div>
  );
}

function DocHeader({ doc }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <Badge tone="soft" icon="building-2">{doc.kind}</Badge>
      <h1 style={{ margin: '12px 0 8px', fontSize: 36, fontWeight: 600, color: C.fg, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
        {doc.title}
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
        <Avatar name="Sarah K." size={22} bg={GRAD_LOGO} />
        <span>{doc.updated}</span>
        <span style={{ color: C.mutedLight }}>·</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="eye" size={12} /> 47 views</span>
        <span style={{ color: C.mutedLight }}>·</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="message-square" size={12} /> 6 comments</span>
      </div>
    </div>
  );
}

function DocAcmeBrazeSetup({ doc }) {
  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '20px 48px 96px' }}>
      <DocHeader doc={doc} />

      <DocPara>
        Acme runs Braze for transactional and lifecycle email today. The integration was set up by Composed in Q2 2025 and has been in production since. This page is the source of truth for credentials, sender configuration, and the canvases currently live.
      </DocPara>

      <DocCallout tone="info" icon="info" title="In-play in: Acme · Braze Content Cards rollout">
        This page is currently pinned to one active project brief. Edits will be highlighted in that project's activity feed.
      </DocCallout>

      <DocH2>Sender configuration</DocH2>
      <DocPara>
        Acme uses a dedicated IP for transactional and a shared pool for marketing. IP warming was completed September 2025 and the sender reputation has held steady at 98% in Google Postmaster.
      </DocPara>

      <DocTable
        head={['Field', 'Value']}
        rows={[
          ['Workspace ID', <code>acme-prod</code>],
          ['SDK key', <code>YEN-…-7F4</code>],
          ['Sender domain', 'mail.acme.com'],
          ['Dedicated IP', <code>74.125.224.18</code>],
          ['Daily volume cap', '480k transactional, 1.2M marketing'],
        ]}
      />

      <DocH2>Live canvases</DocH2>
      <DocPara>
        Six canvases run in production. New canvases must be reviewed by Mira before promotion — see the Composed canvas review checklist.
      </DocPara>
      <DocTable
        head={['Canvas', 'Audience', 'Status']}
        rows={[
          ['Welcome series · trialists', 'New trialists', <Badge tone="ok">Live</Badge>],
          ['Lifecycle · onboarding D3',  'New trialists', <Badge tone="ok">Live</Badge>],
          ['Re-engage · 30d dormant',    'Dormant accounts', <Badge tone="ok">Live</Badge>],
          ['Churn risk · agent triage',  'At-risk enterprise', <Badge tone="warn">Review</Badge>],
          ['Expansion · usage spike',    'Power users', <Badge tone="ok">Live</Badge>],
          ['Birthday',                   'All marketable',   <Badge tone="soft">Paused</Badge>],
        ]}
      />

      <DocH2>Pending integrations</DocH2>
      <DocPara>
        Content Cards is being scoped for new users (60-day pilot — see Acme · Braze CC project). Klaviyo migration was deprioritised in February.
      </DocPara>
    </article>
  );
}

function DocBrazeCC({ doc }) {
  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '20px 48px 96px' }}>
      <DocHeader doc={doc} />
      <DocPara>Reference doc for Braze Content Cards: slot strategy, render targets, analytics caveats.</DocPara>
    </article>
  );
}

function DocPara({ children }) {
  return <p style={{ margin: '0 0 16px', fontSize: 15, color: C.body, lineHeight: 1.75 }}>{children}</p>;
}
function DocH2({ children }) {
  return <h2 style={{ margin: '28px 0 12px', fontSize: 22, fontWeight: 600, color: C.fg, letterSpacing: '-0.005em' }}>{children}</h2>;
}
function DocCallout({ tone = 'info', icon, title, children }) {
  const map = { info: C.info, brand: C.purple, ok: C.ok, warn: C.warn, err: C.err };
  const colour = map[tone];
  return (
    <div style={{
      margin: '16px 0', padding: '12px 16px',
      borderRadius: 12, background: `${colour}0F`, border: `1px solid ${colour}30`,
      display: 'flex', gap: 12,
    }}>
      <Icon name={icon} size={16} color={colour} style={{ marginTop: 4, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{title}</div>
        <div style={{ fontSize: 13, color: C.body, marginTop: 4, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}
function DocTable({ head, rows }) {
  return (
    <div style={{ margin: '16px 0', borderRadius: 12, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: C.bg }}>
            {head.map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: `1px solid ${C.rule}` }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${C.rule}` : 'none' }}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: '12px 16px', color: C.body, verticalAlign: 'top' }}>
                  {typeof cell === 'string' ? cell : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KbDocSide() {
  return (
    <aside style={{ width: 260, padding: '24px 16px', borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', overflowY: 'auto' }}>
      <Eyebrow>People</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
        {[['Sarah K.', 'Owner'], ['Mira J.', 'Editor'], ['Jonah D.', 'Editor']].map(([n, r]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name={n} size={22} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{n}</div>
              <div style={{ fontSize: 10, color: C.muted }}>{r}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Labels</Eyebrow>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 12 }}>
          {['acme', 'braze', 'integration', 'production', 'email'].map(t => (
            <span key={t} style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 4,
              background: C.bgSoft, color: C.body, fontWeight: 500,
            }}>#{t}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Linked from</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          {[
            ['Acme · Braze CC', 'Project · brief'],
            ['Bloom — phased CC', 'KB · client'],
            ['Lifecycle messaging', 'KB · best practice'],
          ].map(([t, k]) => (
            <a key={t} href="#" style={{ padding: '6px 8px', borderRadius: 6, textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{t}</span>
              <span style={{ fontSize: 10, color: C.muted }}>{k}</span>
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Related · Claude</Eyebrow>
        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: 'rgba(108,92,231,.06)', border: `1px solid rgba(108,92,231,.20)` }}>
          <div style={{ fontSize: 12, color: C.body, lineHeight: 1.5 }}>
            This doc is the closest match to your active brief — already pinned. I also suggest <strong>Bloom — phased CC pilot</strong> as a similar reference.
          </div>
          <Btn variant="subtle" size="sm" icon="pin" style={{ marginTop: 8 }}>Pin Bloom doc</Btn>
        </div>
      </div>
    </aside>
  );
}

window.Knowledge = Knowledge;
window.KB_TREE = KB_TREE;
