// Hi-fi: Brief tab — full-page document with slash menu.
// Replaces the popover-on-selection pattern: now `/` triggers a Notion-style command menu.

function Brief({ slashOpen = true, onOpenKnowledge }) {
  const [explainerOpen, setExplainerOpen] = React.useState(true);
  useLucide([slashOpen, explainerOpen]);
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, background: C.bg }}>
      <BriefTOC />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 48px 96px' }}>
        {explainerOpen && <BriefExplainer onDismiss={() => setExplainerOpen(false)} />}
        <BriefDoc slashOpen={slashOpen} onOpenKnowledge={onOpenKnowledge} />
      </div>
    </div>
  );
}

function BriefExplainer({ onDismiss }) {
  return (
    <div style={{
      maxWidth: 760, margin: '0 auto 20px',
      padding: '14px 18px', borderRadius: 12,
      background: 'linear-gradient(135deg, rgba(124,58,237,.05), rgba(79,70,229,.03))',
      border: `1px solid rgba(108,92,231,.20)`,
      display: 'flex', alignItems: 'flex-start', gap: 12,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: GRAD_BRAND, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="file-text" size={15} />
      </div>
      <div style={{ flex: 1, fontSize: 13, color: C.body, lineHeight: 1.55 }}>
        <strong style={{ color: C.fg, fontWeight: 600 }}>What is a brief?</strong>{' '}
        The living context Claude uses to give you better answers. It updates as you chat, cites knowledge as it goes, and is what you hand off when you're ready to build a document, design, or prototype.
      </div>
      <IconBtn icon="x" label="Dismiss" onClick={onDismiss} size={28} />
    </div>
  );
}

function BriefTOC() {
  const sections = [
    { id: 'context', label: 'Context' },
    { id: 'goal', label: 'Goal' },
    { id: 'platforms', label: 'Platforms in scope' },
    { id: 'approach', label: 'Approach', active: true, status: 'editing' },
    { id: 'risks', label: 'Risks' },
    { id: 'questions', label: 'Open questions', count: 3 },
    { id: 'references', label: 'References', count: 4 },
    { id: 'activity', label: 'Activity', count: 12 },
  ];
  return (
    <aside style={{ width: 220, padding: '32px 16px', borderRight: `1px solid ${C.border}`, background: '#FFFFFF', overflowY: 'auto' }}>
      <Eyebrow>On this page</Eyebrow>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12 }}>
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`}
            style={{
              padding: '7px 10px', borderRadius: 6,
              display: 'flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', fontSize: 13,
              fontWeight: s.active ? 600 : 500,
              color: s.active ? C.purple : C.body,
              background: s.active ? 'rgba(108,92,231,.08)' : 'transparent',
            }}
          >
            <span style={{
              width: 4, height: 4, borderRadius: 9999,
              background: s.active ? C.purple : C.mutedLight,
            }} />
            <span style={{ flex: 1 }}>{s.label}</span>
            {s.status === 'editing' && (
              <span style={{
                width: 6, height: 6, borderRadius: 9999, background: C.purple,
                animation: 'pulse 1.4s ease-in-out infinite',
              }} />
            )}
            {s.count != null && (
              <span style={{ fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace' }}>{s.count}</span>
            )}
          </a>
        ))}
      </nav>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 1 } }`}</style>

      <div style={{ marginTop: 24 }}>
        <Eyebrow>Versions</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
          {[
            ['v3', '2m ago', 'Claude + Sarah', true],
            ['v2', '1h ago', 'Sarah K.', false],
            ['v1', '1h ago', 'Auto-draft', false],
          ].map(([v, when, who, sel]) => (
            <div key={v} style={{
              padding: '8px 10px', borderRadius: 6,
              background: sel ? 'rgba(108,92,231,.06)' : 'transparent',
              border: sel ? `1px solid rgba(108,92,231,.20)` : '1px solid transparent',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: sel ? C.purple : C.fg, fontFamily: 'JetBrains Mono, monospace' }}>{v}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: C.muted }}>{when}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{who}</div>
              </div>
            </div>
          ))}
        </div>
        <Btn variant="ghost" size="sm" icon="git-compare" fullWidth style={{ marginTop: 8 }}>Compare versions</Btn>
      </div>
    </aside>
  );
}

function BriefDoc({ slashOpen, onOpenKnowledge }) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>
      {/* Document header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Eyebrow>Brief · v3</Eyebrow>
          <Badge tone="brand" size="sm" icon="loader-circle">Claude is editing</Badge>
          <div style={{ flex: 1 }} />
          <Btn variant="primary" size="sm" icon="wand-sparkles" iconRight="arrow-right">Open prototype</Btn>
          <IconBtn icon="more-horizontal" label="More: export, save to knowledge, compare versions" />
        </div>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 600, color: C.fg, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
          Phased Content Cards rollout for Acme Co
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, color: C.muted }}>
          <div style={{ display: 'flex' }}>
            {['Sarah K.', 'Mira J.', 'Jonah D.'].map((n, i) => (
              <span key={n} style={{ marginLeft: i === 0 ? 0 : -6 }}>
                <Avatar name={n} size={22} />
              </span>
            ))}
          </div>
          <span>Sarah K. & 2 others</span>
          <span style={{ color: C.mutedLight }}>·</span>
          <span>Last edit · Claude · 2m ago</span>
          <span style={{ color: C.mutedLight }}>·</span>
          <span>Acme Co</span>
        </div>
      </div>

      {/* Sections */}
      <BriefDocSection id="context" label="Context">
        <p style={ParaStyle()}>
          Acme Co runs Braze for email today <RefSup n="1" />. The brand team wants to test <Mark>Content Cards</Mark> for in-app discovery — new users only, 60-day pilot — without disturbing the existing canvas program.
        </p>
      </BriefDocSection>

      <BriefDocSection id="goal" label="Goal">
        <p style={ParaStyle()}>
          Lift activation (first purchase within 7 days) by <strong>≥ 8%</strong> for new users vs. control cohort.
        </p>
      </BriefDocSection>

      <BriefDocSection id="platforms" label="Platforms in scope">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <PlatformPill name="Braze" feature="Content Cards" colour="#FF4F00" />
          <PlatformPill name="Braze" feature="IP warming" colour="#FF4F00" />
          <PlatformPill name="Shopify" feature="Audiences" colour="#5E8E3E" />
        </div>
      </BriefDocSection>

      <BriefDocSection id="approach" label="Approach" editing>
        <ol style={{ ...ParaStyle(), paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>Validate render in a dev segment <RefSup n="2" />.</li>
          <li>Roll out to <Mark>5% of new users</Mark> with two CC variants (offer-led vs. category-led).</li>
          <li>Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%.</li>
          <li>Schedule IP warming only if combined email + CC volume crosses sender threshold <RefSup n="3" />.</li>
        </ol>

        {/* The slash menu — inline editing surface */}
        {slashOpen && (
          <div style={{ position: 'relative', marginTop: 16, paddingLeft: 22 }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 16, color: C.muted,
              lineHeight: 1.5, position: 'relative',
            }}>
              <span style={{ color: C.fg }}>5.</span> <SlashCursor>/</SlashCursor><span style={{ color: C.mutedLight }}>add what could go wrong</span>
            </div>
            <SlashMenu />
          </div>
        )}
      </BriefDocSection>

      <BriefDocSection id="risks" label="Risks">
        <ul style={{ ...ParaStyle(), paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>CC analytics gap on iOS &lt; 14.5 — cohort-segment to monitor.</li>
          <li>Audience overlap with existing canvases — frequency cap at user level.</li>
        </ul>
      </BriefDocSection>

      <BriefDocSection id="questions" label="Open questions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Which CC slot in the app — home or category?',
            'Are we OK with a 5% cohort or do we want headroom?',
            'Who owns the weekly analytics review?',
          ].map((q, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 10,
              border: `1px solid ${C.border}`, background: '#FFFFFF',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: 9999, flexShrink: 0,
                border: `1.5px solid ${C.borderStrong}`, background: '#fff',
              }} />
              <span style={{ flex: 1, fontSize: 14, color: C.body }}>{q}</span>
              <Avatar name={['Sarah K.', 'Mira J.', 'Jonah D.'][i]} size={20} />
            </div>
          ))}
        </div>
      </BriefDocSection>

      <BriefDocSection id="references" label="References">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['1', 'Acme — Braze setup', 'Client'],
            ['2', 'Braze · Content Cards', 'Platform doc'],
            ['3', 'Braze · IP Warming', 'Platform doc'],
            ['4', 'Bloom — phased CC pilot', 'Client'],
            ['5', 'A/B for in-app messages', 'Skill'],
          ].map(([n, t, k]) => (
            <a key={n} href="#"
              onClick={(e) => { e.preventDefault(); onOpenKnowledge && onOpenKnowledge(); }}
              style={{
              padding: '10px 12px', borderRadius: 10,
              border: `1px solid ${C.border}`, background: '#FFFFFF',
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.purple, fontFamily: 'JetBrains Mono, monospace', minWidth: 22 }}>[{n}]</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: C.fg, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{k}</div>
              </div>
              <Icon name="external-link" size={12} color={C.mutedLight} />
            </a>
          ))}
        </div>
      </BriefDocSection>
    </div>
  );
}

function ParaStyle() {
  return { margin: 0, fontSize: 15, color: C.body, lineHeight: 1.75, fontFamily: 'Poppins, sans-serif' };
}

function BriefDocSection({ id, label, editing, children }) {
  return (
    <section id={id} style={{ marginBottom: 36, scrollMarginTop: 96 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: C.fg, letterSpacing: '-0.005em' }}>{label}</h2>
        {editing && <Badge tone="brand" size="sm" icon="loader-circle">Claude editing</Badge>}
      </div>
      {children}
    </section>
  );
}

function PlatformPill({ name, feature, colour }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 6px', borderRadius: 9999,
      background: '#FFFFFF', border: `1px solid ${C.border}`,
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: 9999,
        background: colour, color: '#fff',
        fontSize: 10, fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{name.slice(0, 2).toUpperCase()}</span>
      <span style={{ fontSize: 13, color: C.fg, fontWeight: 500 }}>{name}</span>
      <span style={{ fontSize: 11, color: C.mutedLight }}>·</span>
      <span style={{ fontSize: 12, color: C.muted }}>{feature}</span>
    </div>
  );
}

function SlashCursor({ children }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      background: 'rgba(108,92,231,.10)', color: C.purple,
      padding: '0 4px', borderRadius: 4, fontWeight: 600,
      borderRight: `2px solid ${C.purple}`,
      animation: 'caret 1s steps(2) infinite',
    }}>{children}</span>
  );
}

function SlashMenu() {
  const items = [
    { group: 'Ask Claude' },
    { icon: 'sparkles',           label: 'Continue writing',         sub: 'Pick up where I left off',           hot: '↵', primary: true },
    { icon: 'rotate-ccw',         label: 'Rewrite shorter',          sub: 'Tighten this section',               hot: 'R' },
    { icon: 'list-tree',          label: 'Expand with detail',       sub: 'Pull from referenced knowledge',     hot: 'E' },
    { icon: 'quote',              label: 'Add a citation',           sub: 'Reference a KB doc by name',         hot: '⌘K' },
    { icon: 'message-circle-question', label: 'Ask Claude about this', sub: 'Why this approach?',              hot: '?' },
    { group: 'Turn into' },
    { icon: 'list',               label: 'Bulleted list',            sub: 'Convert paragraph to bullets',       hot: '*' },
    { icon: 'table',              label: 'Comparison table',         sub: 'Side-by-side options',               hot: 'T' },
    { icon: 'workflow',           label: 'Decision diagram',         sub: 'Mermaid · flow chart',               hot: 'D' },
    { group: 'Comments & people' },
    { icon: 'message-square',     label: 'Comment',                  sub: 'Thread on this block',               hot: 'C' },
    { icon: 'at-sign',             label: 'Mention teammate',         sub: 'Notifies in Slack',                  hot: '@' },
  ];
  return (
    <div style={{
      position: 'absolute', top: 26, left: 22, width: 360,
      background: '#FFFFFF', borderRadius: 12,
      border: `1px solid ${C.border}`,
      boxShadow: '0 16px 40px rgba(0,0,0,.12)',
      padding: 6, zIndex: 30,
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="slash-square" size={12} color={C.purple} />
        <span style={{ fontSize: 11, color: C.muted, fontFamily: 'JetBrains Mono, monospace' }}>/add what could go wrong</span>
      </div>
      <div style={{ height: 1, background: C.rule, margin: '4px 0' }} />
      {items.map((it, i) => {
        if (it.group) {
          return (
            <div key={i} style={{ padding: '8px 10px 4px', fontSize: 10, fontWeight: 600, color: C.mutedLight, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {it.group}
            </div>
          );
        }
        return <SlashRow key={i} {...it} />;
      })}
      <div style={{ padding: '6px 10px', borderTop: `1px solid ${C.rule}`, marginTop: 4, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: C.muted }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Kbd>↑↓</Kbd> navigate
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Kbd>↵</Kbd> select
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Kbd>esc</Kbd> close
        </span>
      </div>
    </div>
  );
}

function SlashRow({ icon, label, sub, hot, primary }) {
  return (
    <div style={{
      padding: '8px 10px', borderRadius: 8,
      display: 'flex', alignItems: 'center', gap: 10,
      background: primary ? 'rgba(108,92,231,.08)' : 'transparent',
      cursor: 'pointer',
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: primary ? GRAD_BRAND : C.bgSoft,
        color: primary ? '#fff' : C.body,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={14} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{label}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{sub}</div>
      </div>
      {hot && <Kbd>{hot}</Kbd>}
    </div>
  );
}

function Kbd({ children }) {
  return (
    <kbd style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
      padding: '1px 6px', borderRadius: 4,
      background: '#FFFFFF', border: `1px solid ${C.border}`,
      color: C.muted, fontWeight: 500,
    }}>{children}</kbd>
  );
}

function BriefSidebar() {
  return (
    <aside style={{ width: 240, padding: '32px 16px', borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', overflowY: 'auto' }}>
      <Eyebrow>Knowledge in play</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
        {[
          ['Acme — Braze setup', 'Client', true],
          ['Braze · Content Cards', 'Doc', true],
          ['Braze · IP Warming', 'Doc', true],
          ['Bloom — phased CC pilot', 'Client', true],
          ['A/B for in-app messages', 'Skill', false],
          ['Lifecycle messaging', 'Best practice', false],
        ].map(([t, k, pinned], i) => (
          <a key={t} href="#" style={{
            padding: '8px 10px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8,
            background: pinned ? 'rgba(108,92,231,.04)' : 'transparent',
            textDecoration: 'none',
          }}>
            <Icon name={pinned ? 'pin' : 'file-text'} size={12} color={pinned ? C.purple : C.mutedLight} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t}</div>
              <div style={{ fontSize: 10, color: C.muted }}>{k}</div>
            </div>
          </a>
        ))}
      </div>
      <Btn variant="ghost" size="sm" icon="search" fullWidth style={{ marginTop: 12 }}>Browse all knowledge</Btn>

      <div style={{ marginTop: 28 }}>
        <Eyebrow>Activity</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          <ActivityItem who="Claude" what="cited Bloom — phased CC" when="2m" tone="brand" />
          <ActivityItem who="Sarah K." what="added activation goal" when="4m" />
          <ActivityItem who="Mira J." what="commented on Risks" when="12m" />
          <ActivityItem who="Claude" what="suggested saving '60-day pilot' to KB" when="14m" tone="brand" />
        </div>
      </div>
    </aside>
  );
}

window.Brief = Brief;
