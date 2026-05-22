// Directions 1, 2, 3 — Lab notebook / Spotlight / Workflow board

const PLATFORMS = [
  { name: 'Braze', tag: 'Messaging' },
  { name: 'Shopify', tag: 'Commerce' },
  { name: 'Talon One', tag: 'Promotions' },
  { name: 'Eagle Eye', tag: 'Loyalty' },
];

// ───────────────────────────────────────────────────────────────
// Direction 1 — Lab notebook
// Persistent left KB rail, single scrolling page that progressively expands.
// Most conservative; closest to existing Claude.ai layout.
// ───────────────────────────────────────────────────────────────

function D1Sidebar({ highlights = [] }) {
  const isHL = (t) => highlights.includes(t);
  return (
    <div style={{
      width: 240, borderRight: `1.4px solid ${INK}`,
      background: '#fff', padding: '12px 10px',
      display: 'flex', flexDirection: 'column', gap: 8,
      fontFamily: 'Architects Daughter, cursive',
    }}>
      <H size={13} color={MUTED}>KNOWLEDGE BASE</H>
      <Box seed={1} style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13 }}>🔍</span>
        <H size={12} color={MUTED}>Search docs…</H>
      </Box>
      <div style={{ marginTop: 6 }}>
        <H size={12} color={MUTED}>▾ Platforms</H>
        <KbDoc title="Braze · Content Cards" kind="DOC" highlighted={isHL('braze-cc')} indent={1} seed={1} />
        <KbDoc title="Braze · IP Warming guide" kind="DOC" highlighted={isHL('braze-ipw')} indent={1} seed={2} />
        <KbDoc title="Braze · Email best prac." kind="DOC" highlighted={isHL('braze-email')} indent={1} seed={3} />
        <KbDoc title="Shopify · Checkout API" indent={1} seed={4} />
        <KbDoc title="Talon One · Campaigns" indent={1} seed={5} />
      </div>
      <div>
        <H size={12} color={MUTED}>▾ Clients</H>
        <KbDoc title="Acme — discovery notes" indent={1} seed={6} />
        <KbDoc title="Acme — Braze setup" highlighted={isHL('acme-braze')} indent={1} seed={7} />
        <KbDoc title="Bloom Co — POC" indent={1} seed={8} />
      </div>
      <div>
        <H size={12} color={MUTED}>▾ Best practice</H>
        <KbDoc title="Lifecycle messaging" indent={1} seed={9} />
        <KbDoc title="Loyalty integration" indent={1} seed={10} />
      </div>
      <div>
        <H size={12} color={MUTED}>▾ Claude skills</H>
        <KbDoc title="Prototype builder" indent={1} seed={11} />
        <KbDoc title="Brief generator" indent={1} seed={12} />
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Btn small seed={13} style={{ width: '100%', textAlign: 'center' }}>+ Upload doc</Btn>
        <H size={10} color={MUTED}>Drag files anywhere</H>
      </div>
    </div>
  );
}

function D1Main({ stage = 1 }) {
  return (
    <div style={{ flex: 1, padding: '20px 28px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Hand size={32}>Hi Sarah — what are we working on?</Hand>
      <H size={14} color={MUTED}>A single page. Each section appears as you make a choice.</H>

      {/* Step 1: Platforms */}
      <Box seed={2} style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Hand size={22}>1 · Pick the platforms</Hand>
          <H size={12} color={MUTED}>multi-select</H>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p.name} {...p} selected={stage >= 1 && (p.name === 'Braze' || p.name === 'Talon One')} />
          ))}
          <div style={{
            width: 120, height: 96, border: `1.6px dashed ${MUTED}`,
            borderRadius: roughRadius(99), display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: MUTED, fontFamily: 'Caveat, cursive', fontSize: 18,
          }}>+ add platform</div>
        </div>
      </Box>

      {/* Step 2: Intent */}
      {stage >= 1 && (
        <Box seed={3} style={{ padding: '14px 16px' }}>
          <Hand size={22} style={{ marginBottom: 10, display: 'block' }}>2 · What do you need?</Hand>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <Chip selected seed={1}>Project start</Chip>
            <Chip seed={2}>Prototype building</Chip>
            <Chip seed={3}>Feature exploration</Chip>
            <Chip seed={4}>General advice</Chip>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <H size={13} color={MUTED}>Client:</H>
            <Chip selected seed={5}>Existing — Acme Co</Chip>
            <Chip seed={6}>New client</Chip>
            <Chip seed={7}>Internal / N/A</Chip>
          </div>
        </Box>
      )}

      {/* Step 3: Features expanded for Braze */}
      {stage >= 2 && (
        <Box seed={4} accent style={{ padding: '14px 16px', background: `${PURPLE}08` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Hand size={22}>3 · Narrow the scope — <span style={{ color: PURPLE }}>Braze</span></Hand>
            <H size={11} color={MUTED}>Tap a feature → KB highlights related docs ←</H>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Content Cards', 'Banners', 'Email', 'SMS', 'Push', 'IP Warming', 'Canvas Flow', 'Catalogs'].map((f, i) => (
              <Chip key={f} selected={i < 2} seed={i}>{f}</Chip>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <H size={13} color={MUTED}>Talon One →</H>
            {['Campaigns', 'Rules', 'Coupons', 'Loyalty tiers'].map((f) => <Chip key={f} seed={f.length}>{f}</Chip>)}
          </div>
        </Box>
      )}

      {/* Step 4: Context + chat */}
      {stage >= 3 && (
        <Box seed={5} style={{ padding: '14px 16px' }}>
          <Hand size={22} style={{ marginBottom: 10, display: 'block' }}>4 · Give Claude context</Hand>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <H size={12} color={MUTED}>Generated prompt scaffold — edit inline</H>
              <Box dashed seed={11} style={{ padding: 10, marginTop: 4, minHeight: 80 }}>
                <H size={13}>You're helping <HL>Acme Co</HL> set up <HL>Braze Content Cards</HL>. Their goal is to test in-app discovery. Reference: <span style={{ color: PURPLE }}>[Acme — Braze setup]</span> <span style={{ color: PURPLE }}>[Content Cards doc]</span>…</H>
              </Box>
            </div>
            <div style={{ width: 220 }}>
              <H size={12} color={MUTED}>Your notes / attachments</H>
              <Box dashed seed={12} style={{ padding: 8, marginTop: 4, minHeight: 80 }}>
                <H size={12} color={MUTED}>Drop files, paste links…</H>
                <Chip seed={1} style={{ marginTop: 6 }}>brief.pdf</Chip>
              </Box>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Btn ghost seed={5}>Save as project</Btn>
            <Btn primary seed={6}>Start with Claude →</Btn>
          </div>
        </Box>
      )}
    </div>
  );
}

function Direction1({ stage }) {
  const highlights = stage >= 2 ? ['braze-cc', 'braze-email', 'acme-braze'] : [];
  return (
    <Screen>
      <TopBar project={stage >= 1 ? 'Acme · Braze rollout' : 'New chat'} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <D1Sidebar highlights={highlights} />
        <D1Main stage={stage} />
      </div>
    </Screen>
  );
}

// ───────────────────────────────────────────────────────────────
// Direction 2 — Spotlight launcher
// Minimal, chat-first. KB lives as floating "reference chips" that pop next to
// what you're typing. Platforms / intent as a pill rail above the input.
// ───────────────────────────────────────────────────────────────

function D2Welcome() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 24, position: 'relative' }}>
      {/* tiny KB toggle in corner */}
      <Box seed={1} style={{ position: 'absolute', top: 18, right: 18, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <H size={12}>⌘K · Browse KB</H>
      </Box>

      <Hand size={44} color={INK}>What are we working on?</Hand>
      <H size={14} color={MUTED}>Type, or pick a starting point</H>

      {/* The spotlight input */}
      <div style={{ width: 720, position: 'relative' }}>
        <Box seed={3} style={{ padding: '14px 16px', minHeight: 96, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip selected seed={1}>📍 Project start</Chip>
            <Chip seed={2}>Prototype</Chip>
            <Chip seed={3}>Feature explore</Chip>
            <Chip seed={4}>General advice</Chip>
            <div style={{ width: 1, height: 18, background: INK, opacity: 0.3, margin: '0 4px' }} />
            <Chip selected seed={5}>Existing client: Acme</Chip>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <H size={13} color={MUTED}>on</H>
            {PLATFORMS.map((p, i) => (
              <Chip key={p.name} selected={p.name === 'Braze'} seed={i + 7}>{p.name}</Chip>
            ))}
          </div>
          <Line dashed length={680} style={{ marginTop: 4 }} />
          <H size={16} color={MUTED}>Ask anything, or describe what you're trying to do…</H>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn small ghost seed={1}>📎</Btn>
              <Btn small ghost seed={2}>📷</Btn>
            </div>
            <Btn primary seed={3}>↵</Btn>
          </div>
        </Box>

        {/* Floating doc chip — appears when Braze is selected */}
        <Note rotate={3} style={{ position: 'absolute', right: -160, top: 80, maxWidth: 180 }}>
          3 KB docs ready ↗<br/>
          <span style={{ fontSize: 14 }}>Braze · Content Cards, IP Warming, Acme — Braze setup</span>
        </Note>
      </div>

      {/* Recent / suggested */}
      <div style={{ width: 720 }}>
        <H size={12} color={MUTED}>Recent projects</H>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
          {['Acme · Braze rollout', 'Bloom Co · loyalty POC', 'Outback · Shopify migration', 'Internal · email skill'].map((p, i) => (
            <Box key={p} seed={i + 1} style={{ padding: '6px 12px', display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PURPLE }} />
              <H size={13}>{p}</H>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

function D2Chat() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Centered chat column */}
      <div style={{ flex: 1, padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip selected seed={1}>Project start</Chip>
          <Chip selected seed={2}>Braze</Chip>
          <Chip selected seed={3}>Acme</Chip>
          <Chip seed={4}>+ Content Cards</Chip>
          <Chip seed={5}>+ IP Warming</Chip>
        </div>

        {/* User msg */}
        <div style={{ alignSelf: 'flex-end', maxWidth: 460 }}>
          <Box seed={2} style={{ background: `${PURPLE}10`, borderColor: PURPLE }}>
            <H size={14}>We're rolling out Content Cards for Acme's app. Recommend a phased approach.</H>
          </Box>
        </div>

        {/* Claude msg with citations */}
        <div style={{ maxWidth: 580 }}>
          <Box seed={3}>
            <H size={14}>For Acme's stack (Shopify + Braze), the standard rollout is three phases <sup style={{ color: PURPLE }}>[1][2]</sup>. Start with a low-stakes segment to validate rendering and analytics before fanning out.</H>
            <div style={{ marginTop: 8, padding: 8, background: '#f6f4ef', borderRadius: 6 }}>
              <H size={12} color={MUTED}>📎 Referenced</H>
              <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                <Chip seed={1}>[1] Braze · Content Cards</Chip>
                <Chip seed={2}>[2] Acme — Braze setup</Chip>
              </div>
            </div>
          </Box>
        </div>

        {/* Suggestion to save back to KB */}
        <Note rotate={-2} style={{ alignSelf: 'flex-start' }}>
          ✨ Claude found a new pattern.<br/>
          <span style={{ fontSize: 14 }}>"Phased CC rollout" — save to KB?</span>
        </Note>

        <div style={{ marginTop: 'auto' }}>
          <Box seed={9} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <H size={14} color={MUTED}>Reply…</H>
            <div style={{ flex: 1 }} />
            <Btn small seed={1}>+ Design</Btn>
            <Btn small seed={2}>+ Code</Btn>
            <Btn primary small seed={3}>↵</Btn>
          </Box>
        </div>
      </div>

      {/* Right: floating refs panel (can be docked) */}
      <div style={{ width: 240, borderLeft: `1.4px dashed ${INK}`, padding: 12, background: '#fff' }}>
        <H size={12} color={MUTED}>REFERENCES IN USE</H>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={1} />
          <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={2} />
          <KbDoc title="Lifecycle messaging" kind="BP" seed={3} />
        </div>
        <Line dashed length={210} style={{ margin: '14px 0' }} />
        <H size={12} color={MUTED}>SUGGESTED</H>
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <KbDoc title="Bloom Co — phased CC" kind="CLIENT" seed={4} />
          <KbDoc title="A/B for in-app msgs" kind="SKILL" seed={5} />
        </div>
      </div>
    </div>
  );
}

function Direction2({ stage }) {
  return (
    <Screen>
      <TopBar project={stage >= 1 ? 'Acme · Braze CC rollout' : 'New chat'} />
      {stage === 0 && <D2Welcome />}
      {stage >= 1 && <D2Chat />}
    </Screen>
  );
}

// ───────────────────────────────────────────────────────────────
// Direction 3 — Workflow board
// Horizontal canvas of connected "stage" nodes. Each stage is a card; the user
// scrolls left→right through them. New stages can be added via "+".
// Best when extensibility is the demo.
// ───────────────────────────────────────────────────────────────

function StageCard({ idx, label, status, w = 260, h = 320, children, last }) {
  const dim = status === 'pending';
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: w, height: h, position: 'relative',
        border: `1.8px ${dim ? 'dashed' : 'solid'} ${status === 'active' ? PURPLE : INK}`,
        borderRadius: roughRadius(idx),
        background: status === 'active' ? `${PURPLE}06` : '#fff',
        opacity: dim ? 0.55 : 1,
        padding: 12,
        transform: tilt(idx),
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            border: `1.6px solid ${status === 'active' ? PURPLE : INK}`,
            background: status === 'done' ? PURPLE : '#fff',
            color: status === 'done' ? '#fff' : INK,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Caveat, cursive', fontSize: 14, fontWeight: 700,
          }}>{status === 'done' ? '✓' : idx}</span>
          <Hand size={20}>{label}</Hand>
        </div>
        <Line length={w - 30} dashed={dim} />
        <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
      </div>
      {!last && (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 6px' }}>
          <Line length={28} dashed style={{ background: dim ? `repeating-linear-gradient(90deg, ${MUTED} 0 4px, transparent 4px 8px)` : undefined }} />
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: dim ? MUTED : INK }}>→</span>
        </div>
      )}
    </div>
  );
}

function D3Board() {
  return (
    <div style={{ flex: 1, padding: '20px 24px', overflow: 'hidden', position: 'relative' }}>
      {/* board header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <Hand size={24}>Workflow · Acme · Braze rollout</Hand>
          <H size={12} color={MUTED}>Drag stages to reorder · "+" to add custom step</H>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn small ghost seed={1}>Zoom out</Btn>
          <Btn small seed={2}>+ Stage</Btn>
        </div>
      </div>

      {/* the horizontal board */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflow: 'hidden', padding: '24px 0' }}>
        <StageCard idx={1} label="Define" status="done" w={180} h={260}>
          <Chip selected seed={1}>Project start</Chip>
          <div style={{ marginTop: 6 }}><Chip selected seed={2}>Acme · Existing</Chip></div>
          <div style={{ marginTop: 10 }}>
            <H size={12} color={MUTED}>Platforms</H>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
              <Chip selected seed={3}>Braze</Chip>
              <Chip selected seed={4}>Shopify</Chip>
            </div>
          </div>
        </StageCard>

        <StageCard idx={2} label="Scope" status="done" w={210} h={260}>
          <H size={12} color={MUTED}>Braze features</H>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
            <Chip selected seed={1}>Content Cards</Chip>
            <Chip selected seed={2}>IP Warming</Chip>
            <Chip seed={3}>Email</Chip>
            <Chip seed={4}>SMS</Chip>
          </div>
          <Line dashed length={180} style={{ margin: '10px 0' }} />
          <H size={11} color={MUTED}>3 KB docs auto-linked</H>
        </StageCard>

        <StageCard idx={3} label="Context" status="active" w={240} h={260}>
          <H size={12} color={MUTED}>Generated prompt</H>
          <Box dashed seed={2} style={{ padding: 6, marginTop: 4 }}>
            <H size={11}>Help <HL>Acme</HL> plan a phased <HL>Content Cards</HL> rollout. Goal: in-app discovery for new users…</H>
          </Box>
          <H size={12} color={MUTED} style={{ marginTop: 8 }}>Your notes</H>
          <Box dashed seed={3} style={{ padding: 6, marginTop: 4 }}>
            <Chip seed={1}>brief.pdf</Chip>
            <H size={11} color={MUTED} style={{ marginTop: 4 }}>add anything…</H>
          </Box>
        </StageCard>

        <StageCard idx={4} label="Chat" status="pending" w={180} h={260}>
          <H size={12} color={MUTED}>Conversation</H>
          <Box dashed seed={1} style={{ padding: 6, marginTop: 6, height: 40 }} />
          <Box dashed seed={2} style={{ padding: 6, marginTop: 6, height: 40 }} />
        </StageCard>

        <StageCard idx={5} label="Handoff" status="pending" w={180} h={260} last>
          <H size={12} color={MUTED}>Build & ship</H>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Btn small ghost seed={1}>→ Prototype</Btn>
            <Btn small ghost seed={2}>→ Design</Btn>
            <Btn small ghost seed={3}>→ Code</Btn>
            <Btn small ghost seed={4}>→ Save to KB</Btn>
          </div>
        </StageCard>

        <div style={{ marginLeft: 12, width: 60, height: 60, border: `1.6px dashed ${MUTED}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, fontFamily: 'Caveat, cursive', fontSize: 20 }}>+</div>
      </div>

      {/* docked KB strip */}
      <div style={{ marginTop: 16, borderTop: `1.4px dashed ${INK}`, paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <H size={12} color={MUTED}>KB DOCS REFERENCED BY THIS WORKFLOW (click to pin to a stage)</H>
          <Btn small ghost seed={1}>Expand panel ⌃</Btn>
        </div>
        <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
          {['Braze · Content Cards', 'Braze · IP Warming', 'Acme — Braze setup', 'Lifecycle messaging', 'A/B for in-app msgs'].map((t, i) => (
            <Box key={t} seed={i + 1} style={{ padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6, minWidth: 140 }}>
              <span style={{ width: 6, height: 6, background: PURPLE, borderRadius: '50%' }} />
              <H size={11}>{t}</H>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

function Direction3() {
  return (
    <Screen>
      <TopBar project="Acme · Braze rollout" extras={
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn small ghost seed={1}>Board</Btn>
          <Btn small seed={2}>Chat</Btn>
        </div>
      } />
      <D3Board />
    </Screen>
  );
}

Object.assign(window, { Direction1, Direction2, Direction3, PLATFORMS });
