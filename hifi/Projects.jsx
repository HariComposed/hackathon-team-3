// Hi-fi: Compose app — Projects rail (left sidebar) + project header + tabs.

const PROJECTS = [
  { id: 'acme-cc', name: 'Acme · Braze Content Cards', client: 'Acme Co', updated: '2m', collab: 4, pinned: true, status: 'In progress' },
  { id: 'bloom-loy', name: 'Bloom · Loyalty POC', client: 'Bloom Co', updated: '1d', collab: 3, pinned: true, status: 'In progress' },
  { id: 'outback-sh', name: 'Outback · Shopify migration', client: 'Outback', updated: '3d', collab: 5, pinned: false, status: 'Draft' },
  { id: 'coastal-tal', name: 'Coastal · Talon promo rules', client: 'Coastal', updated: '5d', collab: 2, pinned: false, status: 'Draft' },
  { id: 'lumora-cdp', name: 'Lumora · CDP onboarding', client: 'Lumora', updated: '1w', collab: 4, pinned: false, status: 'Shipped' },
  { id: 'internal-cc', name: 'Internal · CC playbook', client: 'Internal', updated: '2w', collab: 6, pinned: false, status: 'Shipped' },
];

function ProjectsRail({ activeId, onSelect, onNewProject, collapsed, onToggle }) {
  if (collapsed) {
    return (
      <aside style={{
        width: 56, borderRight: `1px solid ${C.border}`, background: '#FFFFFF',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '16px 0', gap: 8,
      }}>
        <IconBtn icon="panel-left-open" label="Expand" onClick={onToggle} />
        <div style={{ height: 1, width: 32, background: C.rule, margin: '4px 0' }} />
        <IconBtn icon="plus" label="New project" onClick={onNewProject} active />
        {PROJECTS.filter(p => p.pinned).map(p => (
          <button key={p.id} onClick={() => onSelect(p.id)} title={p.name}
            style={{
              width: 32, height: 32, borderRadius: 8, border: 0, cursor: 'pointer',
              background: activeId === p.id ? 'rgba(108,92,231,.10)' : '#fff',
              color: activeId === p.id ? C.purple : C.muted,
              fontSize: 11, fontWeight: 600,
            }}>
            {p.client.slice(0, 2).toUpperCase()}
          </button>
        ))}
      </aside>
    );
  }
  return (
    <aside style={{
      width: 264, borderRight: `1px solid ${C.border}`, background: '#FFFFFF',
      display: 'flex', flexDirection: 'column', minHeight: 0,
    }}>
      <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Eyebrow>Projects</Eyebrow>
        <IconBtn icon="panel-left-close" label="Collapse" onClick={onToggle} size={28} />
      </div>

      <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6 }}>
        <Btn variant="primary" size="sm" icon="plus" onClick={onNewProject} fullWidth>New project</Btn>
      </div>

      <div style={{ padding: '4px 12px 8px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 32, padding: '0 10px',
          border: `1px solid ${C.border}`, borderRadius: 8,
          background: C.bg, color: C.muted, fontSize: 12,
        }}>
          <Icon name="search" size={12} />
          <span>Find a project…</span>
        </div>
      </div>

      <div style={{ padding: '0 12px 4px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Chip selected size="sm">All</Chip>
        <Chip size="sm">Mine</Chip>
        <Chip size="sm">Shared</Chip>
        <Chip size="sm">Drafts</Chip>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 16px' }}>
        <SectionLabel>Pinned</SectionLabel>
        {PROJECTS.filter(p => p.pinned).map(p => (
          <ProjectItem key={p.id} project={p} active={p.id === activeId} onClick={() => onSelect(p.id)} />
        ))}

        <SectionLabel>Recent</SectionLabel>
        {PROJECTS.filter(p => !p.pinned && p.status !== 'Shipped').map(p => (
          <ProjectItem key={p.id} project={p} active={p.id === activeId} onClick={() => onSelect(p.id)} />
        ))}

        <SectionLabel>Shipped</SectionLabel>
        {PROJECTS.filter(p => p.status === 'Shipped').map(p => (
          <ProjectItem key={p.id} project={p} active={p.id === activeId} onClick={() => onSelect(p.id)} />
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${C.rule}`, padding: '10px 12px' }}>
        <a href="#" style={{ fontSize: 12, color: C.muted, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="archive" size={12} />
          Archive · 47
        </a>
      </div>
    </aside>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      padding: '10px 8px 6px', fontSize: 11, fontWeight: 500,
      letterSpacing: '.06em', textTransform: 'uppercase', color: C.mutedLight,
    }}>{children}</div>
  );
}

function ProjectItem({ project, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const statusColour = { 'In progress': C.purple, 'Draft': C.warn, 'Shipped': C.ok }[project.status];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: '100%', padding: '10px 10px', textAlign: 'left',
        background: active ? 'rgba(108,92,231,.08)' : (hover ? C.bg : 'transparent'),
        border: 0, borderRadius: 8, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 4,
        fontFamily: 'Poppins, sans-serif',
        transition: 'background .12s',
        position: 'relative',
      }}
    >
      {active && (
        <span style={{
          position: 'absolute', left: -8, top: 8, bottom: 8, width: 3,
          background: C.purple, borderRadius: 9999,
        }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: statusColour, flexShrink: 0 }} />
        <span style={{
          fontSize: 13, fontWeight: active ? 600 : 500,
          color: active ? C.purple : C.fg, flex: 1, minWidth: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{project.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 }}>
        <span style={{ fontSize: 11, color: C.muted }}>{project.client}</span>
        <span style={{ width: 2, height: 2, borderRadius: 9999, background: C.mutedLight }} />
        <span style={{ fontSize: 11, color: C.muted }}>{project.updated}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Icon name="users" size={11} color={C.mutedLight} />
          <span style={{ fontSize: 11, color: C.muted }}>{project.collab}</span>
        </span>
      </div>
    </button>
  );
}

// Project header — title + status + tabs.
const PROJECT_TABS = [
  { id: 'workspace', label: 'Conversation', icon: 'messages-square' },
  { id: 'brief',     label: 'Brief',        icon: 'file-text' },
  { id: 'prototype', label: 'Prototype',    icon: 'wand-sparkles' },
  { id: 'share',     label: 'Share',        icon: 'users' },
];

function ProjectHeader({ project, tab, onTab, onShare }) {
  return (
    <div style={{ background: '#FFFFFF', borderBottom: `1px solid ${C.border}` }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        padding: '14px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <span style={{ fontSize: 13, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="folder" size={13} />
            {project.client}
            <Icon name="chevron-right" size={12} color={C.mutedLight} />
          </span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: C.fg, letterSpacing: '-0.005em' }}>
            {project.name.replace(project.client + ' · ', '')}
          </h2>
          <Badge tone="brand">{project.status}</Badge>
          <div style={{ display: 'flex', marginLeft: 4 }}>
            {['Sarah K.', 'Mira J.', 'Jonah D.', 'Priya R.'].map((n, i) => (
              <span key={n} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                <Avatar name={n} size={24} />
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Btn variant="secondary" size="sm" icon="share-2" onClick={onShare}>Share</Btn>
          <IconBtn icon="more-horizontal" label="More" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 0, padding: '0 16px' }}>
        {PROJECT_TABS.map(t => {
          const active = t.id === tab;
          return (
            <button
              key={t.id} onClick={() => onTab(t.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 14px', background: 'transparent', border: 0,
                borderBottom: active ? `2px solid ${C.purple}` : '2px solid transparent',
                marginBottom: -1,
                fontFamily: 'Poppins, sans-serif', fontSize: 13,
                fontWeight: active ? 600 : 500,
                color: active ? C.purple : C.body,
                cursor: 'pointer', transition: 'color .15s, border-color .15s',
              }}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

window.PROJECTS = PROJECTS;
window.PROJECT_TABS = PROJECT_TABS;
window.ProjectsRail = ProjectsRail;
window.ProjectHeader = ProjectHeader;
