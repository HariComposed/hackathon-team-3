// Directions 4 & 5 — Co-authored brief / Projects + tabs

// ───────────────────────────────────────────────────────────────
// Direction 4 — Co-authored brief
// Two-pane: chat with Claude on the left, a living "brief" doc on the right.
// Claude fills the doc as you chat; citations are inline numbered superscripts.
// Best at making "context-gathering for Claude" tangible to non-tech users.
// ───────────────────────────────────────────────────────────────

function D4Setup() {
  return (
    <div style={{ flex: 1, padding: '28px 60px', overflow: 'hidden', display: 'flex', gap: 32 }}>
      {/* left: setup form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Hand size={32}>Let's compose a brief.</Hand>
        <H size={14} color={MUTED}>Answer three quick prompts. Claude drafts the right side as we go.</H>

        <Box seed={2} style={{ padding: '14px 16px' }}>
          <H size={12} color={MUTED}>① WHAT IS THIS?</H>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <Chip selected seed={1}>Project start</Chip>
            <Chip seed={2}>Prototype</Chip>
            <Chip seed={3}>Feature explore</Chip>
            <Chip seed={4}>General advice</Chip>
          </div>
        </Box>

        <Box seed={3} style={{ padding: '14px 16px' }}>
          <H size={12} color={MUTED}>② WHICH PLATFORMS?</H>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
            {PLATFORMS.map((p, i) => (
              <PlatformCard key={p.name} {...p} selected={p.name === 'Braze' || p.name === 'Talon One'} w={108} h={84} />
            ))}
          </div>
        </Box>

        <Box seed={4} style={{ padding: '14px 16px' }}>
          <H size={12} color={MUTED}>③ FOR WHO?</H>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip selected seed={1}>Existing client</Chip>
            <Chip seed={2}>New client</Chip>
            <Box seed={3} style={{ padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
              <H size={13}>Acme Co</H>
              <span style={{ color: MUTED, fontSize: 11 }}>▼</span>
            </Box>
          </div>
        </Box>

        <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
          <Btn ghost seed={1}>Skip — chat freeform</Btn>
          <Btn primary seed={2}>Compose brief →</Btn>
        </div>
      </div>

      {/* right: empty brief skeleton */}
      <div style={{ width: 380, position: 'relative' }}>
        <Note rotate={4} style={{ position: 'absolute', top: -10, right: -10 }}>The brief →</Note>
        <Box seed={5} style={{ padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 10, opacity: 0.55 }}>
          <Hand size={18}>Project brief</Hand>
          {['Context', 'Goal', 'Platforms in scope', 'Approach', 'Open questions', 'References'].map((s, i) => (
            <div key={s}>
              <H size={12} color={MUTED}>{s.toUpperCase()}</H>
              <Line length={300} dashed style={{ margin: '4px 0' }} />
              <Line length={240} dashed style={{ margin: '4px 0' }} />
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
}

function D4Drafting() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* left: chat */}
      <div style={{ flex: 1, padding: '18px 26px', display: 'flex', flexDirection: 'column', gap: 12, borderRight: `1.4px solid ${INK}` }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Hand size={20}>Conversation</Hand>
          <H size={12} color={MUTED}>· auto-writes brief →</H>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
          <Box seed={1}>
            <H size={13}><strong>Claude:</strong> Acme already runs Braze for email. Are you scoping <HL>Content Cards</HL> alongside or replacing existing canvases?</H>
          </Box>
          <div style={{ alignSelf: 'flex-end', maxWidth: 320 }}>
            <Box seed={2} style={{ background: `${PURPLE}10`, borderColor: PURPLE }}>
              <H size={13}>Alongside. New users only for the first 60 days.</H>
            </Box>
          </div>
          <Box seed={3}>
            <H size={13}><strong>Claude:</strong> Good. I've added that to the brief and flagged the IP warming step from <span style={{ color: PURPLE }}>[Acme — Braze setup]</span>.</H>
          </Box>
          <Note rotate={-2} style={{ alignSelf: 'flex-start' }}>
            Want me to <HL>draft a phased rollout plan</HL> based on Bloom Co?
          </Note>
        </div>
        <Box seed={9} style={{ padding: '10px 14px' }}>
          <H size={14} color={MUTED}>Reply…</H>
        </Box>
      </div>

      {/* right: living brief */}
      <div style={{ width: 460, padding: '18px 22px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Hand size={22}>Brief · Acme Braze CC</Hand>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn small ghost seed={1}>Edit</Btn>
            <Btn small seed={2}>Export</Btn>
          </div>
        </div>

        <div>
          <H size={11} color={MUTED}>CONTEXT</H>
          <H size={13}>Acme Co uses Braze for email today <sup style={{ color: PURPLE }}>[1]</sup>. Goal: add <HL>Content Cards</HL> for in-app discovery, new users only, 60-day pilot.</H>
        </div>
        <div>
          <H size={11} color={MUTED}>PLATFORMS IN SCOPE</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <Chip selected seed={1}>Braze · CC</Chip>
            <Chip selected seed={2}>Braze · IP Warming</Chip>
            <Chip selected seed={3}>Shopify · audiences</Chip>
          </div>
        </div>
        <div>
          <H size={11} color={MUTED}>APPROACH (draft) <span style={{ color: PURPLE, fontSize: 10 }}>· writing…</span></H>
          <H size={13}>1 · Validate render in dev segment <sup style={{ color: PURPLE }}>[2]</sup><br/>
            2 · 5% rollout to new users<br/>
            3 · Expand by cohort if CTR &gt; 4%</H>
        </div>
        <div>
          <H size={11} color={MUTED}>REFERENCES</H>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
            <H size={11}><span style={{ color: PURPLE }}>[1]</span> Acme — Braze setup (client)</H>
            <H size={11}><span style={{ color: PURPLE }}>[2]</span> Braze · Content Cards (platform)</H>
            <H size={11} color={MUTED}>+ 2 suggested · Bloom Co rollout, Lifecycle msging</H>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Btn small ghost seed={1}>→ Open Claude design</Btn>
          <Btn small ghost seed={2}>→ Generate prototype</Btn>
          <Btn primary small seed={3}>→ Save brief to KB</Btn>
        </div>
      </div>
    </div>
  );
}

function Direction4({ stage }) {
  return (
    <Screen>
      <TopBar project={stage >= 1 ? 'Acme Braze CC — brief' : 'New brief'} />
      {stage === 0 && <D4Setup />}
      {stage >= 1 && <D4Drafting />}
    </Screen>
  );
}

// ───────────────────────────────────────────────────────────────
// Direction 5 — Projects + tabs (IDE-style workspace)
// Left rail of projects (past chats), main area with tabs (Brief / Chat / KB /
// Prototype). Best for technical users who'll come back to long-running work.
// ───────────────────────────────────────────────────────────────

function D5ProjectsRail() {
  return (
    <div style={{ width: 190, borderRight: `1.4px solid ${INK}`, padding: '12px 8px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Btn primary seed={1} style={{ width: '100%', textAlign: 'center' }}>+ New project</Btn>
      <H size={11} color={MUTED} style={{ marginTop: 6 }}>ACTIVE</H>
      <Box seed={2} accent style={{ padding: '6px 8px', background: `${PURPLE}10` }}>
        <H size={12} weight={700}>Acme · Braze CC</H>
        <H size={10} color={MUTED}>edited 2m ago · 1 brief</H>
      </Box>
      <Box seed={3} style={{ padding: '6px 8px' }}>
        <H size={12}>Bloom Co · loyalty POC</H>
        <H size={10} color={MUTED}>yesterday</H>
      </Box>
      <Box seed={4} style={{ padding: '6px 8px' }}>
        <H size={12}>Outback · Shopify mig.</H>
        <H size={10} color={MUTED}>3d</H>
      </Box>
      <H size={11} color={MUTED} style={{ marginTop: 6 }}>SHARED</H>
      <Box seed={5} style={{ padding: '6px 8px' }}>
        <H size={12}>Team · CC playbook</H>
        <H size={10} color={MUTED}>5 collaborators</H>
      </Box>
      <Box seed={6} style={{ padding: '6px 8px' }}>
        <H size={12}>Internal · skills</H>
      </Box>
      <div style={{ marginTop: 'auto' }}>
        <Box seed={7} style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#ddd', border: `1.2px solid ${INK}` }} />
          <H size={11}>Sarah K.</H>
        </Box>
      </div>
    </div>
  );
}

function Tabs({ active = 0 }) {
  const tabs = ['Setup', 'Brief', 'Chat', 'Knowledge', 'Prototype'];
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: `1.4px solid ${INK}`, padding: '0 18px', background: '#fff' }}>
      {tabs.map((t, i) => (
        <div key={t} style={{
          padding: '8px 14px',
          borderBottom: i === active ? `3px solid ${PURPLE}` : '3px solid transparent',
          marginBottom: -1,
          fontFamily: 'Architects Daughter, cursive',
          fontSize: 13,
          fontWeight: i === active ? 700 : 400,
          color: i === active ? PURPLE : INK,
          opacity: i > 2 && i !== active ? 0.5 : 1,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {t}
          {i > 2 && i !== active && <span style={{ fontSize: 9, color: MUTED }}>·</span>}
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ padding: '8px 4px' }}>
        <Btn small ghost seed={1}>Share</Btn>
      </div>
    </div>
  );
}

function D5Setup() {
  return (
    <div style={{ flex: 1, padding: '18px 24px', overflow: 'hidden', display: 'flex', gap: 18 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Hand size={28}>Acme · Braze Content Cards</Hand>
        <H size={13} color={MUTED}>Inline onboarding — fill what you know, Claude infers the rest.</H>

        <Box seed={1} style={{ padding: '12px 14px' }}>
          <H size={12} color={MUTED}>PLATFORMS</H>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
            {PLATFORMS.map((p, i) => (
              <PlatformCard key={p.name} {...p} selected={p.name === 'Braze' || p.name === 'Shopify'} w={104} h={80} />
            ))}
          </div>
        </Box>

        <Box seed={2} style={{ padding: '12px 14px' }}>
          <H size={12} color={MUTED}>INTENT · CLIENT</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <Chip selected seed={1}>Project start</Chip>
            <Chip seed={2}>Prototype</Chip>
            <Chip seed={3}>Feature explore</Chip>
            <Chip seed={4}>General advice</Chip>
            <span style={{ width: 1, height: 18, background: INK, opacity: 0.3 }} />
            <Chip selected seed={5}>Existing · Acme</Chip>
          </div>
        </Box>

        <Box seed={3} accent style={{ padding: '12px 14px', background: `${PURPLE}06` }}>
          <H size={12} color={MUTED}>BRAZE FEATURES IN SCOPE</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {['Content Cards', 'Banners', 'Email', 'SMS', 'Push', 'IP Warming', 'Canvas Flow'].map((f, i) => (
              <Chip key={f} selected={i === 0 || i === 5} seed={i}>{f}</Chip>
            ))}
          </div>
        </Box>

        <Box seed={4} style={{ padding: '12px 14px' }}>
          <H size={12} color={MUTED}>YOUR NOTES / FILES</H>
          <Box dashed seed={1} style={{ padding: 8, marginTop: 6, minHeight: 60 }}>
            <Chip seed={1}>brief.pdf</Chip>
            <Chip seed={2}>discovery-notes.md</Chip>
            <H size={12} color={MUTED} style={{ marginTop: 6 }}>Drop or paste anything…</H>
          </Box>
        </Box>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn ghost seed={1}>Save as draft</Btn>
          <Btn primary seed={2}>Generate brief & chat →</Btn>
        </div>
      </div>

      {/* right: linked KB panel */}
      <div style={{ width: 220, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={12} color={MUTED}>LINKED FROM KB</H>
        <H size={11} color={MUTED}>Auto-suggested as you select →</H>
        <Box seed={1} style={{ padding: 8 }}>
          <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={1} />
          <KbDoc title="Braze · IP Warming" kind="DOC" highlighted seed={2} />
          <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={3} />
          <Line dashed length={170} style={{ margin: '6px 0' }} />
          <KbDoc title="Lifecycle messaging" kind="BP" seed={4} />
          <KbDoc title="Bloom — phased CC" kind="CLIENT" seed={5} />
        </Box>
        <H size={11} color={MUTED} style={{ marginTop: 8 }}>Click any doc → pin to brief</H>
      </div>
    </div>
  );
}

function D5Workspace() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Chat */}
      <div style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10, borderRight: `1.4px solid ${INK}` }}>
        <H size={11} color={MUTED}>CHAT · Acme · Braze CC</H>
        <Box seed={1}>
          <H size={13}><strong>Claude:</strong> I drafted a brief from your setup. Want me to validate the rollout plan against Bloom Co's run?</H>
        </Box>
        <div style={{ alignSelf: 'flex-end' }}>
          <Box seed={2} style={{ background: `${PURPLE}10`, borderColor: PURPLE, maxWidth: 280 }}>
            <H size={13}>Yes, and propose what to build first.</H>
          </Box>
        </div>
        <Box seed={3}>
          <H size={13}><strong>Claude:</strong> Bloom's phased model matches. First build: a render-test segment with two CC variants. I can scaffold the prototype <sup style={{ color: PURPLE }}>[1]</sup>.</H>
        </Box>
        <Note rotate={-1.5} style={{ alignSelf: 'flex-start' }}>
          ✨ I learnt a new pattern.<br/>Save <HL>"60-day new-user pilot"</HL> to KB?
        </Note>
        <div style={{ marginTop: 'auto' }}>
          <Box seed={9} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <H size={13} color={MUTED}>Reply…</H>
            <div style={{ flex: 1 }} />
            <Btn small seed={1}>+ Design</Btn>
            <Btn small seed={2}>+ Code</Btn>
            <Btn primary small seed={3}>↵</Btn>
          </Box>
        </div>
      </div>

      {/* KB panel — pinned docs */}
      <div style={{ width: 220, padding: '14px 12px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={11} color={MUTED}>PINNED REFS</H>
        <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={1} />
        <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={2} />
        <KbDoc title="Bloom — phased CC" kind="CLIENT" highlighted seed={3} />
        <Line dashed length={200} style={{ margin: '4px 0' }} />
        <H size={11} color={MUTED}>SUGGESTED</H>
        <KbDoc title="A/B for in-app msgs" kind="SKILL" seed={4} />
        <KbDoc title="Lifecycle messaging" kind="BP" seed={5} />
        <div style={{ marginTop: 'auto' }}>
          <Btn small seed={1} style={{ width: '100%', textAlign: 'center' }}>+ Add to KB</Btn>
        </div>
      </div>
    </div>
  );
}

function Direction5({ stage }) {
  return (
    <Screen>
      <TopBar project="Acme · Braze CC" />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <D5ProjectsRail />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Tabs active={stage === 0 ? 0 : 2} />
          {stage === 0 ? <D5Setup /> : <D5Workspace />}
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { Direction4, Direction5 });
