// Hi-fi shell — Composed OS-style top nav, leaner and responsive.
// Composed wordmark · app nav (Compose / Knowledge primary, rest in a Tools menu)
// search · model · notifications · profile.

function Shell({ app, onNavApp, onHome, model, onModel, children }) {
  useLucide([]);
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <TopNav app={app} onNavApp={onNavApp} onHome={onHome} model={model} onModel={onModel} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>{children}</div>
    </div>
  );
}

const PRIMARY_APPS = [
  { id: 'compose',   label: 'Compose',   icon: 'sparkles' },
  { id: 'knowledge', label: 'Knowledge', icon: 'library' },
];
const SECONDARY_APPS = [
  { id: 'workflows', label: 'Workflows', icon: 'workflow' },
  { id: 'audiences', label: 'Audiences', icon: 'users' },
  { id: 'models',    label: 'Models',    icon: 'brain' },
  { id: 'settings',  label: 'Settings',  icon: 'settings' },
];

function TopNav({ app, onNavApp, onHome, model, onModel }) {
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  useLucide([toolsOpen, searchOpen, profileOpen]);

  // Find label of active app for the Tools button (if it's a secondary one).
  const activeSecondary = SECONDARY_APPS.find(a => a.id === app);

  return (
    <header style={{
      height: 60, background: '#FFFFFF',
      borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 12,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Left: logo + primary nav */}
      <a href="#" onClick={(e) => { e.preventDefault(); onNavApp('compose'); onHome && onHome(); }}
        style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
        <img src="assets/logo-wordmark.svg" alt="Composed Digital" style={{ height: 24 }} />
      </a>

      <nav style={{ display: 'flex', gap: 0, marginLeft: 6, flexShrink: 0 }}>
        {PRIMARY_APPS.map(a => <NavLink key={a.id} {...a} active={app === a.id} onClick={() => onNavApp(a.id)} />)}
        <ToolsMenu
          open={toolsOpen} setOpen={setToolsOpen}
          activeSecondary={activeSecondary}
          onNav={(id) => { onNavApp(id); setToolsOpen(false); }}
        />
      </nav>

      <div style={{ flex: 1, minWidth: 16 }} />

      {/* Right cluster */}
      <SearchInline open={searchOpen} setOpen={setSearchOpen} />
      <ModelPicker value={model} onChange={onModel} />
      <ProfileMenu open={profileOpen} setOpen={setProfileOpen} />
    </header>
  );
}

function NavLink({ id, label, icon, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 60, padding: '0 12px',
        fontSize: 13, fontWeight: 500,
        color: active ? C.purple : (hover ? C.fg : C.muted),
        textDecoration: 'none',
        borderBottom: active ? `2px solid ${C.purple}` : '2px solid transparent',
        transition: 'color .15s ease',
      }}
    >
      <Icon name={icon} size={15} />
      {label}
    </a>
  );
}

function ToolsMenu({ open, setOpen, activeSecondary, onNav }) {
  const [hover, setHover] = React.useState(false);
  const active = !!activeSecondary;
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          height: 60, padding: '0 12px', border: 0, background: 'transparent',
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
          borderBottom: active ? `2px solid ${C.purple}` : '2px solid transparent',
          color: active ? C.purple : (hover || open ? C.fg : C.muted),
          fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
        }}
      >
        <Icon name={activeSecondary?.icon || 'layout-grid'} size={15} />
        {activeSecondary?.label || 'Tools'}
        <Icon name="chevron-down" size={11} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 80 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% - 1px)', left: 0,
            width: 220, background: '#FFFFFF',
            border: `1px solid ${C.border}`, borderRadius: 12,
            boxShadow: '0 16px 32px rgba(0,0,0,.10)', padding: 6, zIndex: 90,
          }}>
            <div style={{ padding: '6px 10px', fontSize: 10, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.muted }}>
              Other apps
            </div>
            {SECONDARY_APPS.map(a => {
              const sel = a.id === activeSecondary?.id;
              return (
                <button key={a.id} onClick={() => onNav(a.id)}
                  style={{
                    width: '100%', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10,
                    background: sel ? 'rgba(108,92,231,.06)' : 'transparent',
                    border: 0, borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'Poppins, sans-serif',
                    color: sel ? C.purple : C.fg,
                  }}>
                  <Icon name={a.icon} size={14} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{a.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function SearchInline({ open, setOpen }) {
  // On narrower widths we show an icon-only trigger; full input pops open as overlay.
  const [focus, setFocus] = React.useState(false);

  // Compact pill that expands inline.
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      height: 34,
      padding: '0 10px',
      border: `1px solid ${focus ? C.purple : C.border}`, borderRadius: 8,
      background: C.bg, color: C.muted,
      fontSize: 12, fontFamily: 'Poppins, sans-serif',
      minWidth: 0,
      width: 'clamp(36px, 22vw, 240px)',
      cursor: 'text',
      transition: 'border-color .15s ease',
      flexShrink: 1,
    }}
      onClick={() => setFocus(true)}
    >
      <Icon name="search" size={13} />
      <span style={{
        flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>Search projects, briefs, knowledge…</span>
      <kbd style={{
        flexShrink: 0,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, padding: '1px 5px', borderRadius: 3,
        background: '#FFF', border: `1px solid ${C.border}`, color: C.muted,
      }}>⌘K</kbd>
    </div>
  );
}

function ModelPicker({ value = 'Claude Sonnet 4.5', onChange }) {
  const [open, setOpen] = React.useState(false);
  // Show a short form (e.g. "Sonnet 4.5") to save horizontal space.
  const short = value.replace(/^Claude\s+/, '');
  const models = [
    { id: 'sonnet', name: 'Claude Sonnet 4.5', sub: 'Balanced · default', tag: 'Recommended' },
    { id: 'opus',   name: 'Claude Opus 4.5',  sub: 'Deep reasoning · slower' },
    { id: 'haiku',  name: 'Claude Haiku 4.5', sub: 'Fast · economical' },
  ];
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 10px', borderRadius: 8,
          background: open ? 'rgba(108,92,231,.10)' : '#FFFFFF',
          border: `1px solid ${open ? C.purple : C.border}`,
          fontFamily: 'Poppins, sans-serif', fontSize: 12, color: C.fg,
          fontWeight: 500, cursor: 'pointer', transition: 'all .15s ease',
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 9999, background: C.purple, boxShadow: '0 0 0 3px rgba(108,92,231,.15)' }} />
        <span style={{ whiteSpace: 'nowrap' }}>{short}</span>
        <Icon name="chevron-down" size={11} color={C.muted} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 80 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            width: 280, background: '#FFFFFF',
            border: `1px solid ${C.border}`, borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,.12)', padding: 8, zIndex: 90,
          }}>
            <div style={{ padding: '6px 8px', fontSize: 11, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: C.muted }}>
              Choose model
            </div>
            {models.map(m => {
              const sel = m.name === value;
              return (
                <button
                  key={m.id}
                  onClick={() => { onChange && onChange(m.name); setOpen(false); }}
                  style={{
                    width: '100%', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10,
                    background: sel ? 'rgba(108,92,231,.06)' : 'transparent',
                    border: 0, borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  <span style={{
                    width: 14, height: 14, borderRadius: 9999, flexShrink: 0,
                    border: `1.5px solid ${sel ? C.purple : C.border}`,
                    background: sel ? C.purple : '#fff',
                    boxShadow: sel ? 'inset 0 0 0 2.5px #fff' : 'none',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.fg, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {m.name}
                      {m.tag && <Badge tone="brand" size="sm">{m.tag}</Badge>}
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{m.sub}</div>
                  </div>
                </button>
              );
            })}
            <div style={{ height: 1, background: C.rule, margin: '6px 0' }} />
            <div style={{ padding: '4px 10px 6px', fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="info" size={12} />
              Sticky per project. Marketing teammates default to Sonnet.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProfileMenu({ open, setOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          padding: 2, border: 0, background: 'transparent', borderRadius: 9999, cursor: 'pointer',
          boxShadow: open || hover ? `0 0 0 2px ${C.border}` : 'none',
          transition: 'box-shadow .15s',
        }}
      >
        <Avatar name="Sarah K." bg={GRAD_LOGO} size={30} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 80 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            width: 220, background: '#FFFFFF',
            border: `1px solid ${C.border}`, borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,.12)', padding: 6, zIndex: 90,
          }}>
            <div style={{ padding: '8px 10px 4px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>Sarah Kim</div>
              <div style={{ fontSize: 11, color: C.muted }}>sarah@composed.digital</div>
            </div>
            <div style={{ height: 1, background: C.rule, margin: '4px 0' }} />
            {[
              ['user-cog', 'Account'],
              ['circle-help', 'Help & docs'],
              ['keyboard', 'Keyboard shortcuts'],
              ['moon', 'Switch to dark'],
            ].map(([ic, lbl]) => (
              <button key={lbl} style={{
                width: '100%', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: 0, borderRadius: 6, cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, color: C.fg, textAlign: 'left',
              }}>
                <Icon name={ic} size={13} color={C.muted} />
                {lbl}
              </button>
            ))}
            <div style={{ height: 1, background: C.rule, margin: '4px 0' }} />
            <button style={{
              width: '100%', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 8,
              background: 'transparent', border: 0, borderRadius: 6, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, color: C.err, textAlign: 'left',
            }}>
              <Icon name="log-out" size={13} />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

window.Shell = Shell;
window.TopNav = TopNav;
