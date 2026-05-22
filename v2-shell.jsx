// v2 shell — the "combined direction" chrome (projects rail · tabs · KB drawer).
// All v2 frames sit inside this shell so the design feels unified.

const TABS = ['Setup', 'Workspace', 'Brief', 'Knowledge', 'Prototype', 'Share'];

function V2ProjectsRail({ active = 'Acme · Braze CC' }) {
  return (
    <div style={{
      width: 178, borderRight: `1.4px solid ${INK}`,
      padding: '12px 8px', background: '#fff',
      display: 'flex', flexDirection: 'column', gap: 6,
      overflow: 'hidden',
    }}>
      <Btn primary seed={1} style={{ width: '100%', textAlign: 'center' }}>+ New project</Btn>

      <Box dashed seed={2} style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
        <span style={{ fontSize: 11 }}>🔍</span>
        <H size={11} color={MUTED}>Find a project…</H>
      </Box>

      <H size={10} color={MUTED} style={{ marginTop: 6 }}>★ PINNED</H>
      <Box seed={3} accent style={{ padding: '5px 8px', background: `${PURPLE}10` }}>
        <H size={12} weight={700}>{active}</H>
        <H size={10} color={MUTED}>· brief · 2 collab.</H>
      </Box>
      <Box seed={4} style={{ padding: '5px 8px' }}>
        <H size={12}>Bloom · loyalty POC</H>
        <H size={10} color={MUTED}>3 collab.</H>
      </Box>

      <H size={10} color={MUTED} style={{ marginTop: 6 }}>RECENT</H>
      <Box seed={5} style={{ padding: '5px 8px' }}>
        <H size={12}>Outback · Shopify mig.</H>
      </Box>
      <Box seed={6} style={{ padding: '5px 8px' }}>
        <H size={12}>Internal · CC playbook</H>
      </Box>
      <Box seed={7} style={{ padding: '5px 8px' }}>
        <H size={12}>Coastal · Talon promos</H>
      </Box>

      <H size={10} color={MUTED} style={{ marginTop: 6 }}>👥 TEAM SHARED</H>
      <Box seed={8} style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <H size={12}>CC patterns</H>
        <span style={{ fontSize: 10, color: MUTED, marginLeft: 'auto' }}>5</span>
      </Box>
      <Box seed={9} style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <H size={12}>Eng skills</H>
        <span style={{ fontSize: 10, color: MUTED, marginLeft: 'auto' }}>12</span>
      </Box>

      <div style={{ marginTop: 'auto' }}>
        <Box seed={10} style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#ddd', border: `1.2px solid ${INK}` }} />
          <H size={11}>Sarah K.</H>
          <span style={{ fontSize: 10, color: MUTED, marginLeft: 'auto' }}>▼</span>
        </Box>
      </div>
    </div>
  );
}

function V2Tabs({ active = 'Workspace' }) {
  return (
    <div style={{
      display: 'flex', gap: 0,
      borderBottom: `1.4px solid ${INK}`,
      padding: '0 16px', background: '#fff', flex: '0 0 auto',
    }}>
      {TABS.map((t) => {
        const isActive = t === active;
        return (
          <div key={t} style={{
            padding: '8px 12px',
            borderBottom: isActive ? `3px solid ${PURPLE}` : '3px solid transparent',
            marginBottom: -1,
            fontFamily: 'Architects Daughter, cursive',
            fontSize: 13,
            fontWeight: isActive ? 700 : 400,
            color: isActive ? PURPLE : INK,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            {t}
            {t === 'Share' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE }} />}
          </div>
        );
      })}
      <div style={{ flex: 1 }} />
      <div style={{ padding: '6px 0', display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ display: 'flex' }}>
          {['S', 'M', 'J'].map((c, i) => (
            <span key={c} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: ['#ddd', '#ffd6e8', '#dff2c8'][i],
              border: `1.4px solid ${INK}`,
              marginLeft: i === 0 ? 0 : -8,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Caveat, cursive', fontSize: 12, fontWeight: 700,
            }}>{c}</span>
          ))}
        </span>
        <Btn small seed={3}>Share</Btn>
      </div>
    </div>
  );
}

// KB drawer — auto-scoped to the active project. The full KB lives in the
// Knowledge tab. This drawer is the "what's in play right now" view.
function V2KbDrawer({ collapsed }) {
  if (collapsed) {
    return (
      <div style={{
        width: 36, borderLeft: `1.4px solid ${INK}`, background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 10,
      }}>
        <H size={11} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>KNOWLEDGE</H>
        <Chip seed={1}>4</Chip>
      </div>
    );
  }
  return (
    <div style={{
      width: 256, borderLeft: `1.4px solid ${INK}`, background: '#fff',
      padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Hand size={18}>Knowledge</Hand>
        <H size={11} color={MUTED}>scoped to project ⌃</H>
      </div>
      <Box dashed seed={1} style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 11 }}>🔍</span>
        <H size={11} color={MUTED}>Search · ⌘K to scope-out</H>
      </Box>

      <H size={10} color={MUTED} style={{ marginTop: 4 }}>📌 PINNED TO BRIEF (4)</H>
      <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={1} />
      <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={2} />
      <KbDoc title="Braze · IP Warming" kind="DOC" highlighted seed={3} />
      <KbDoc title="Bloom — phased CC" kind="CLIENT" highlighted seed={4} />

      <H size={10} color={MUTED} style={{ marginTop: 4 }}>✨ CLAUDE SUGGESTS</H>
      <KbDoc title="Lifecycle messaging" kind="BP" seed={5} />
      <KbDoc title="A/B for in-app msgs" kind="SKILL" seed={6} />
      <KbDoc title="Acme — discovery notes" kind="CLIENT" seed={7} />

      <H size={10} color={MUTED} style={{ marginTop: 4 }}>BROWSE</H>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Chip seed={1}>Clients</Chip>
        <Chip seed={2}>Platforms</Chip>
        <Chip seed={3}>Best prac.</Chip>
        <Chip seed={4}>Skills</Chip>
        <Chip seed={5}>Internal</Chip>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Btn small seed={1} style={{ width: '100%', textAlign: 'center' }}>+ Upload · paste · link</Btn>
      </div>
    </div>
  );
}

// The main shell wrapper. Children = body of the active tab.
function V2Shell({ activeTab = 'Workspace', kbCollapsed = false, project = 'Acme · Braze CC', children, width = 1320, height = 740, model = 'Claude Sonnet 4.5' }) {
  return (
    <Screen width={width} height={height}>
      <TopBar project={project} model={model} extras={
        <div style={{ display: 'flex', gap: 6 }}>
          <Chip selected seed={1}>🧠 Technical</Chip>
          <Chip seed={2}>📣 Marketing</Chip>
        </div>
      } />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <V2ProjectsRail />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <V2Tabs active={activeTab} />
          {children}
        </div>
        <V2KbDrawer collapsed={kbCollapsed} />
      </div>
    </Screen>
  );
}

Object.assign(window, { V2Shell, V2ProjectsRail, V2Tabs, V2KbDrawer, TABS });
