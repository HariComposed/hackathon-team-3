// Hi-fi: Prototype tab — handoff modes.
// Hub picker + Document, Claude Design, Claude Code modes.

function Handoff({ mode, onMode }) {
  useLucide([mode]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: C.bg }}>
      <HandoffSubnav mode={mode} onMode={onMode} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {mode === 'hub' && <HandoffHub onMode={onMode} />}
        {mode === 'document' && <HandoffDoc />}
        {mode === 'design' && <HandoffDesign />}
        {mode === 'code' && <HandoffCode />}
      </div>
    </div>
  );
}

function HandoffSubnav({ mode, onMode }) {
  const modes = [
    { id: 'hub',      label: 'Pick a mode', icon: 'layout-grid' },
    { id: 'document', label: 'Document',    icon: 'file-text' },
    { id: 'design',   label: 'Claude Design', icon: 'palette' },
    { id: 'code',     label: 'Claude Code',   icon: 'code-2' },
  ];
  return (
    <div style={{
      background: '#FFFFFF', borderBottom: `1px solid ${C.border}`,
      padding: '0 24px', display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {modes.map(m => {
        const active = m.id === mode;
        return (
          <button
            key={m.id} onClick={() => onMode(m.id)}
            style={{
              padding: '12px 14px', display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 0,
              borderBottom: active ? `2px solid ${C.purple}` : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: 13,
              fontWeight: active ? 600 : 500,
              color: active ? C.purple : C.body,
            }}
          >
            <Icon name={m.icon} size={14} />
            {m.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <Badge tone="brand" icon="file-text">From brief v3</Badge>
    </div>
  );
}

// ─── Hub ──────────────────────────────────────────────────────
function HandoffHub({ onMode }) {
  const modes = [
    { id: 'answer',   icon: 'message-square', title: 'Stay in chat',
      sub: 'Quick questions and clarifications. No artefact produced.',
      eg: '"Explain CC analytics gaps on iOS"', recommend: false },
    { id: 'document', icon: 'file-text', title: 'Document',
      sub: 'KDD, SD, client memo or ADR. Markdown · PDF · Notion · Google Doc.',
      eg: 'KDD for the Acme Braze CC pilot', recommend: false },
    { id: 'design',   icon: 'palette', title: 'Claude Design',
      sub: 'Mocked-up screens with editable elements. Mobile · tablet · web.',
      eg: 'CC variants A/B — offer-led vs. category-led', recommend: true },
    { id: 'code',     icon: 'code-2', title: 'Claude Code',
      sub: 'Generated prompt + open in Claude Code with the brief and KB attached.',
      eg: 'Render-test prototype · Next.js + Braze sandbox', recommend: true },
    { id: 'deck',     icon: 'presentation', title: 'Slide deck',
      sub: 'HTML or PPTX for internal review or client pitch.',
      eg: 'Stakeholder walkthrough · 8 slides', recommend: false },
    { id: 'kb',       icon: 'library', title: 'Save to knowledge',
      sub: 'Turn this conversation into a reusable pattern, skill, or doc.',
      eg: 'The "60-day new-user CC pilot" pattern', recommend: true },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 96px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <Eyebrow>Hand off</Eyebrow>
            <h1 style={{ margin: '8px 0 4px', fontSize: 28, fontWeight: 600, color: C.fg, letterSpacing: '-0.01em' }}>
              What do you need from this brief?
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.5, maxWidth: 600 }}>
              Modes share the same context — brief, knowledge pins, decision history. Pick one to start; you can run more than one in parallel.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {modes.map(m => (
            <ModeCard key={m.id} mode={m} onClick={() => m.id !== 'answer' && m.id !== 'deck' && m.id !== 'kb' && onMode(m.id)} />
          ))}
        </div>

        <div style={{
          marginTop: 28, padding: 20, borderRadius: 16,
          background: '#FFFFFF', border: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(108,92,231,.10)', color: C.purple,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="sparkles" size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>
              Claude recommends starting with Claude Design, then Claude Code
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
              Your intent is "Prototype" and the brief has visual variants pending. Mocking before coding cuts a build cycle.
            </div>
          </div>
          <Btn variant="primary" icon="palette" iconRight="arrow-right" onClick={() => onMode('design')}>
            Open Claude Design
          </Btn>
        </div>
      </div>
    </div>
  );
}

function ModeCard({ mode, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        textAlign: 'left', padding: 20,
        background: mode.recommend ? 'linear-gradient(135deg, rgba(124,58,237,.04), rgba(79,70,229,.02))' : '#FFFFFF',
        border: `1px solid ${mode.recommend ? 'rgba(108,92,231,.30)' : C.border}`,
        borderRadius: 16,
        boxShadow: hover ? SH_LG : SH_SM,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all .15s cubic-bezier(.2,.8,.2,1)',
        cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative', minHeight: 200,
      }}
    >
      {mode.recommend && (
        <span style={{
          position: 'absolute', top: 12, right: 12,
          padding: '3px 8px', borderRadius: 9999,
          fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
          background: GRAD_BRAND, color: '#fff',
        }}>Recommended</span>
      )}
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: mode.recommend ? GRAD_BRAND : 'rgba(108,92,231,.10)',
        color: mode.recommend ? '#fff' : C.purple,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={mode.icon} size={20} />
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.fg }}>{mode.title}</div>
        <div style={{ fontSize: 13, color: C.body, marginTop: 4, lineHeight: 1.55 }}>{mode.sub}</div>
      </div>
      <div style={{ marginTop: 'auto', padding: '8px 10px', background: C.bg, borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>For example</div>
        <div style={{ fontSize: 12, color: C.body, marginTop: 4, fontStyle: 'italic' }}>{mode.eg}</div>
      </div>
    </button>
  );
}

// ─── Mode: Document ───────────────────────────────────────────
function HandoffDoc() {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 96px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Eyebrow>Document</Eyebrow>
            <Badge tone="brand" size="sm" icon="loader-circle">Drafting…</Badge>
            <div style={{ flex: 1 }} />
            <Btn variant="ghost" size="sm" icon="rotate-ccw">Regenerate</Btn>
            <Btn variant="ghost" size="sm" icon="copy">Copy</Btn>
            <Btn variant="secondary" size="sm" icon="external-link">Open in Notion</Btn>
            <Btn variant="primary" size="sm" icon="download">Export PDF</Btn>
          </div>

          <article style={{
            background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 16,
            padding: '40px 48px', boxShadow: SH_SM, fontFamily: 'Poppins, sans-serif',
          }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ color: C.fg }}>From</strong> Composed Digital
              <span style={{ color: C.mutedLight }}>·</span>
              <strong style={{ color: C.fg }}>To</strong> Acme Co · brand team
              <span style={{ color: C.mutedLight }}>·</span>
              22 May 2026
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Badge tone="brand" icon="file-check-2">KDD</Badge>
              <span style={{ fontSize: 12, color: C.muted }}>Key Decision Document</span>
            </div>
            <h1 style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 600, color: C.fg, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Phased Content Cards rollout for Acme Co
            </h1>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 28 }}>
              Drafted by Claude · approved by Sarah K. · cites 4 references from your knowledge base
            </div>

            <DocBlock label="Recommendation" body={(
              <>Run a 60-day Content Cards pilot to new users at 5% of inbound traffic, with two creative variants (offer-led vs. category-led). Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%. <RefSup n="1" /><RefSup n="2" /></>
            )} />
            <DocBlock label="Why" body={(
              <>Bloom Co's near-identical rollout returned <strong>+11% activation in six weeks</strong> <RefSup n="3" />. Acme's MAU comfortably powers an 8% lift at 5% cohort.</>
            )} />
            <DocBlock label="Risks" body={(
              <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>iOS &lt; 14.5 has CC analytics gaps — we'll cohort-segment to monitor.</li>
                <li>Combined email + CC volume may cross IP threshold — schedule warming if so. <RefSup n="4" /></li>
              </ul>
            )} />
            <DocBlock label="Timeline" body={(
              <>Week 1–2 · render test in dev. Week 3 · 5% rollout. Week 7 · analytics review. Week 9 · expand decision.</>
            )} />

            <div style={{ height: 1, background: C.rule, margin: '28px 0' }} />

            <div style={{ fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>References</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: C.body }}>
              <div><span style={{ color: C.purple, fontFamily: 'JetBrains Mono, monospace' }}>[1]</span> Braze · Content Cards</div>
              <div><span style={{ color: C.purple, fontFamily: 'JetBrains Mono, monospace' }}>[2]</span> Lifecycle messaging · best practice</div>
              <div><span style={{ color: C.purple, fontFamily: 'JetBrains Mono, monospace' }}>[3]</span> Bloom — phased CC pilot</div>
              <div><span style={{ color: C.purple, fontFamily: 'JetBrains Mono, monospace' }}>[4]</span> Braze · IP Warming</div>
            </div>
          </article>
        </div>
      </div>

      <aside style={{ width: 280, borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', padding: '24px 16px', overflowY: 'auto' }}>
        <Eyebrow>Document type</Eyebrow>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          <Chip selected size="sm" icon="file-check-2">KDD</Chip>
          <Chip size="sm" icon="file-cog">SD</Chip>
          <Chip size="sm">Memo</Chip>
          <Chip size="sm">ADR</Chip>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
          <strong style={{ color: C.body, fontWeight: 600 }}>KDD</strong> Key Decision Document · captures why, what and when.<br/>
          <strong style={{ color: C.body, fontWeight: 600 }}>SD</strong> Solution Design · the technical how.
        </div>
        <div style={{ marginTop: 20 }}><Eyebrow>Audience</Eyebrow></div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          <Chip selected size="sm">Client</Chip>
          <Chip size="sm">Internal</Chip>
          <Chip size="sm">Engineering</Chip>
        </div>
        <div style={{ marginTop: 20 }}><Eyebrow>Length</Eyebrow></div>
        <div style={{ marginTop: 10 }}>
          <input type="range" min="1" max="5" defaultValue="2" style={{ width: '100%', accentColor: C.purple }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted, marginTop: 4 }}>
            <span>Tight</span><span>1 page</span><span>Deep</span>
          </div>
        </div>
        <div style={{ marginTop: 24, height: 1, background: C.rule }} />
        <div style={{ marginTop: 16 }}><Eyebrow>Pulled from knowledge</Eyebrow></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
          {['Braze · Content Cards', 'Bloom — phased CC pilot', 'Lifecycle messaging', 'Braze · IP Warming'].map(t => (
            <a key={t} href="#" style={{ padding: '6px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 12, color: C.body }}>
              <Icon name="file-text" size={12} color={C.purple} />
              {t}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}

function DocBlock({ label, body }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 600, color: C.fg }}>{label}</h3>
      <div style={{ fontSize: 15, color: C.body, lineHeight: 1.7 }}>{body}</div>
    </div>
  );
}

// ─── Mode: Claude Design ──────────────────────────────────────
function HandoffDesign() {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#F5F5F7' }}>
        <div style={{ padding: '14px 24px', background: '#FFFFFF', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="palette" size={16} color={C.purple} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>Content Cards · variants</span>
          <Badge tone="brand" size="sm" icon="loader-circle">Generating…</Badge>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4, padding: 3, background: C.bg, borderRadius: 8 }}>
            <SegBtn icon="smartphone" label="iPhone" selected />
            <SegBtn icon="tablet" label="Tablet" />
            <SegBtn icon="monitor" label="Web" />
          </div>
          <Btn variant="ghost" size="sm" icon="rotate-ccw">Regenerate</Btn>
          <Btn variant="secondary" size="sm" icon="external-link">Open in Figma</Btn>
          <Btn variant="primary" size="sm" icon="code-2" iconRight="arrow-right">Build in Claude Code</Btn>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 32, display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
          <PhoneMock variant="A" />
          <PhoneMock variant="B" />
          <PhoneMock variant="C" dim />
        </div>

        <div style={{ background: '#FFFFFF', borderTop: `1px solid ${C.border}`, padding: '12px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Btn variant="ghost" size="sm" icon="arrow-left">Brief</Btn>
          <div style={{ flex: 1 }} />
          <Btn variant="ghost" size="sm" icon="plus">Try variant D</Btn>
          <Btn variant="ghost" size="sm" icon="message-square-plus">Ask Claude to tweak</Btn>
          <Btn variant="primary" size="sm" icon="check">Approve variants A & B</Btn>
        </div>
      </div>

      <aside style={{ width: 280, borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', padding: '24px 16px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <Eyebrow>Editing variant A · offer-led</Eyebrow>
        </div>
        <DesignSection label="Offer">
          <textarea defaultValue="20% off your first order" rows={2}
            style={{
              width: '100%', resize: 'vertical',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, color: C.fg,
              padding: 10, border: `1px solid ${C.border}`, borderRadius: 8,
              background: C.bg, outline: 'none',
            }}
          />
        </DesignSection>
        <DesignSection label="Tone">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Chip selected size="sm">Direct</Chip>
            <Chip size="sm">Playful</Chip>
            <Chip size="sm">Premium</Chip>
          </div>
        </DesignSection>
        <DesignSection label="Slot">
          <Chip selected size="sm" icon="layout">Home · above fold</Chip>
        </DesignSection>
        <DesignSection label="CTA label">
          <input defaultValue="Claim offer" style={{
            width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: 13, color: C.fg,
            padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 8,
            background: C.bg, outline: 'none',
          }} />
        </DesignSection>
        <div style={{ height: 1, background: C.rule, margin: '16px 0' }} />
        <DesignSection label="Brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: '#FF4F00' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>Acme brand kit</div>
              <div style={{ fontSize: 11, color: C.muted }}>Pulled from KB</div>
            </div>
          </div>
        </DesignSection>
      </aside>
    </div>
  );
}

function DesignSection({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function SegBtn({ icon, label, selected }) {
  return (
    <button
      style={{
        height: 28, padding: '0 10px', borderRadius: 6, border: 0,
        background: selected ? '#FFFFFF' : 'transparent',
        boxShadow: selected ? SH_SM : 'none',
        fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500,
        color: selected ? C.fg : C.muted, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      <Icon name={icon} size={12} />
      {label}
    </button>
  );
}

function PhoneMock({ variant, dim }) {
  return (
    <div style={{ position: 'relative' }}>
      <Badge tone={variant === 'A' ? 'brand' : variant === 'B' ? 'ok' : 'soft'} size="sm" style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)' }}>
        Variant {variant} · {variant === 'A' ? 'offer-led' : variant === 'B' ? 'category-led' : 'personalised (pending)'}
      </Badge>
      <div style={{
        width: 260, height: 540, opacity: dim ? 0.45 : 1,
        background: '#1A1A2E', borderRadius: 40, padding: 10,
        position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,.18)',
      }}>
        <div style={{
          width: '100%', height: '100%', background: '#FFFFFF',
          borderRadius: 32, overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Status + notch */}
          <div style={{ height: 32, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'relative' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600 }}>9:41</span>
            <div style={{ width: 80, height: 18, background: '#1A1A2E', borderRadius: 9999, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
            <span style={{ fontSize: 9, color: C.muted }}>•••</span>
          </div>
          {/* App header */}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, background: '#FF4F00', color: '#fff', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>A</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>Acme</span>
            <div style={{ flex: 1 }} />
            <Icon name="search" size={14} color={C.muted} />
            <Icon name="user" size={14} color={C.muted} />
          </div>
          <div style={{ padding: '0 16px 12px' }}>
            <div style={{ height: 100, borderRadius: 12, background: 'linear-gradient(135deg, #FFE5D6, #FFC8A8)', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#7A2F00' }}>Spring picks</span>
            </div>
          </div>

          {/* The CC */}
          <div style={{ padding: '0 16px 12px' }}>
            {variant === 'A' && (
              <div style={{
                padding: 14, borderRadius: 12,
                background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: '#fff',
                display: 'flex', flexDirection: 'column', gap: 6,
                boxShadow: '0 4px 12px rgba(108,92,231,.35)',
              }}>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>For you</span>
                <span style={{ fontSize: 18, fontWeight: 600 }}>20% off your first order</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                  <span style={{ fontSize: 11, opacity: 0.85 }}>Ends Sunday</span>
                  <span style={{ background: '#fff', color: C.purple, padding: '5px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600 }}>Claim offer →</span>
                </div>
              </div>
            )}
            {variant === 'B' && (
              <div style={{
                padding: 12, borderRadius: 12,
                background: '#FFFFFF', border: `1px solid ${C.border}`,
                display: 'flex', gap: 10, alignItems: 'center',
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(135deg, #DBEAFE, #93C5FD)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: C.purple, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Explore</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>Outdoor &amp; camping</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>32 picks for you</div>
                </div>
                <Icon name="chevron-right" size={14} color={C.muted} />
              </div>
            )}
            {variant === 'C' && (
              <div style={{
                padding: 14, borderRadius: 12,
                background: C.bgSoft, border: `1px dashed ${C.borderStrong}`,
                fontSize: 11, color: C.muted, textAlign: 'center',
              }}>
                Personalised variant<br/>(pending generation)
              </div>
            )}
          </div>

          {/* Grid */}
          <div style={{ padding: '0 16px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ aspectRatio: '1 / 1.1', borderRadius: 10, background: C.bg }} />
            ))}
          </div>

          {/* Tab bar */}
          <div style={{ height: 56, borderTop: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            {['home', 'search', 'heart', 'shopping-bag', 'user'].map((ic, i) => (
              <Icon key={ic} name={ic} size={16} color={i === 0 ? C.purple : C.muted} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mode: Claude Code ────────────────────────────────────────
function HandoffCode() {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 96px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <Eyebrow>Claude Code</Eyebrow>
            <h1 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 600, color: C.fg, letterSpacing: '-0.01em' }}>
              Open the prototype in Claude Code
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
              Claude has prepared a prompt and attached the brief, knowledge references, and Acme brand kit. Spinning up a sandbox takes about 30 seconds.
            </p>
          </div>

          {/* The prompt */}
          <section style={{ background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: SH_SM }}>
            <header style={{ padding: '14px 18px', borderBottom: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 8, background: C.fg, color: '#fff',
                fontSize: 11, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>1</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>Prompt Claude will run</div>
              <div style={{ flex: 1 }} />
              <Btn variant="ghost" size="sm" icon="pencil">Edit</Btn>
              <Btn variant="ghost" size="sm" icon="copy">Copy</Btn>
            </header>
            <div style={{
              padding: 18, fontSize: 14, color: C.body, lineHeight: 1.7, fontFamily: 'Poppins, sans-serif',
            }}>
              <p style={{ margin: '0 0 12px' }}>
                You are setting up a <strong>Content Cards render-test prototype</strong> for Acme Co's mobile app. Build a Next.js + Braze sandbox that:
              </p>
              <ul style={{ margin: '0 0 12px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Targets a synthetic "new users · 60d" segment with two CC variants (offer-led, category-led).</li>
                <li>Wires the Braze Web SDK to a feature-flagged client that records: impression, dismiss, CTA tap, activation event.</li>
                <li>Includes a <code style={CodeInline()}>/control</code> page that turns CC off for the cohort.</li>
                <li>Ships a <code style={CodeInline()}>/report</code> page reading from the analytics events, showing CTR &amp; activation delta.</li>
              </ul>
              <p style={{ margin: 0 }}>
                Use Acme's brand tokens <RefSup n="5" />. Reference Bloom Co's pilot structure <RefSup n="3" /> and Braze CC slot rules <RefSup n="1" />. IP warming is out of scope for this prototype.
              </p>
            </div>
          </section>

          {/* Attached context */}
          <section style={{ background: '#FFFFFF', border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: SH_SM }}>
            <header style={{ padding: '14px 18px', borderBottom: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 8, background: C.fg, color: '#fff',
                fontSize: 11, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>2</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>What's attached</div>
              <div style={{ flex: 1 }} />
              <Btn variant="ghost" size="sm" icon="plus">Add</Btn>
            </header>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['file-text', 'Brief v3', 'Phased Content Cards rollout', true],
                ['library', 'Braze · Content Cards', 'Knowledge · platform doc', true],
                ['building-2', 'Acme — Braze setup', 'Knowledge · client', true],
                ['building-2', 'Bloom — phased CC pilot', 'Knowledge · client', true],
                ['palette', 'Acme brand kit', 'Tokens · colours · type', true],
                ['messages-square', 'Chat decision log', '7 turns · 12 minutes', true],
              ].map(([icon, name, sub, sel], i) => (
                <label key={i} style={{
                  padding: '10px 12px', borderRadius: 10,
                  background: sel ? 'rgba(108,92,231,.04)' : '#FFFFFF',
                  border: `1px solid ${sel ? 'rgba(108,92,231,.20)' : C.border}`,
                  display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 4,
                    background: sel ? C.purple : '#fff',
                    border: `1.5px solid ${sel ? C.purple : C.borderStrong}`,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sel && <Icon name="check" size={11} stroke={3} color="#fff" />}
                  </span>
                  <Icon name={icon} size={14} color={C.muted} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{
            background: '#FFFFFF', border: `1px solid rgba(108,92,231,.30)`, borderRadius: 16,
            boxShadow: SH_LG, padding: 20, display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: GRAD_BRAND, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="code-2" size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Spin up the sandbox in Claude Code</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                Read-only Acme env vars · live preview · branchable · shareable URL · ~30 second setup
              </div>
            </div>
            <Btn variant="primary" size="lg" icon="external-link" iconRight="arrow-up-right">
              Open Claude Code
            </Btn>
          </section>

          <p style={{ margin: 0, fontSize: 12, color: C.muted, textAlign: 'center' }}>
            Slash-to-teammate (Slack handoff) is on the roadmap.
          </p>
        </div>
      </div>

      {/* Live sandbox preview */}
      <aside style={{ width: 380, background: '#0D0D1A', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <header style={{ padding: '14px 18px', borderBottom: `1px solid rgba(255,255,255,.08)`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: C.ok, boxShadow: `0 0 0 3px rgba(16,185,129,.20)` }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Sandbox preview</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 11, color: '#8B8B9A', fontFamily: 'JetBrains Mono, monospace' }}>braze-cc-pilot</span>
        </header>
        <div style={{ padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#DCDCFA', lineHeight: 1.7 }}>
          <div style={{ color: '#8B8B9A' }}>// pilot.ts · pulled from KB · Acme [5]</div>
          <CodeLine><CKw>import</CKw>{' { braze } '}<CKw>from</CKw>{' '}<CStr>'@composed/sdk'</CStr></CodeLine>
          <CodeLine><CKw>export const</CKw>{' pilot = {'}</CodeLine>
          <CodeLine>{'  '}segment: <CStr>'new_users_60d'</CStr>,</CodeLine>
          <CodeLine>{'  '}variants: [<CStr>'A · offer'</CStr>, <CStr>'B · category'</CStr>],</CodeLine>
          <CodeLine>{'  '}rollout: {'{'} pct: <CNum>5</CNum> {'}'}, </CodeLine>
          <CodeLine>{'  '}control: <CNum>true</CNum>,</CodeLine>
          <CodeLine>{'  '}events: [<CStr>'imp'</CStr>, <CStr>'tap'</CStr>, <CStr>'act'</CStr>]</CodeLine>
          <CodeLine>{'}'}</CodeLine>
          <div style={{ marginTop: 10, color: '#8B8B9A' }}>// scaffolding · 47 more lines…</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: '14px 16px', borderTop: `1px solid rgba(255,255,255,.08)`, fontSize: 11, color: '#8B8B9A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: C.purple, animation: 'pulse 1.4s ease-in-out infinite' }} />
            Claude is writing — preview at <span style={{ color: '#fff' }}>render-test.acme.composed.app</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CodeLine({ children }) {
  return <div>{children}</div>;
}
function CKw({ children }) { return <span style={{ color: '#A78BFA' }}>{children}</span>; }
function CStr({ children }) { return <span style={{ color: '#86EFAC' }}>{children}</span>; }
function CNum({ children }) { return <span style={{ color: '#FCD34D' }}>{children}</span>; }
function CodeInline() {
  return {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13, padding: '1px 6px', borderRadius: 4,
    background: C.bgSoft, color: C.fg, fontWeight: 500,
  };
}

window.Handoff = Handoff;
