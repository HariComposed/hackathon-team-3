// v2 — Dynamic handoff modes.
// The Prototype tab adapts to what the user actually needs:
//   · Text answer / doc · Claude Design · Claude Code · Slide deck · Save to KB
// Plus: how the recommendation surfaces inside the chat itself.

// ─── Handoff hub ──────────────────────────────────────────────
function V2HandoffHub() {
  return (
    <div style={{ flex: 1, padding: '20px 30px', overflow: 'hidden', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Hand size={28}>Hand off — what do you actually need?</Hand>
        <div style={{ flex: 1 }} />
        <Chip selected seed={1}>From brief v3</Chip>
        <Btn small ghost seed={2}>Use different brief</Btn>
      </div>
      <H size={12} color={MUTED}>Claude suggests a mode based on intent. Pick anything — they all use the same brief + KB context.</H>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          {
            kind: '💬 Answer', mode: 'Simple text reply',
            body: 'For quick questions and "explain X". Stays in chat.',
            cta: 'Pick mode', recommend: false, useFor: '"What\'s IP warming?"',
          },
          {
            kind: '📄 Document', mode: 'Markdown / PDF / Notion',
            body: 'Recommendation memo, best-practice writeup, ADR.',
            cta: 'Pick mode', recommend: false, useFor: 'Client-facing memo',
          },
          {
            kind: '🎨 Claude Design', mode: 'Visual preview · variants',
            body: 'Mocked-up screens for a CC pilot, dashboard, email.',
            cta: 'Pick mode', recommend: true, useFor: 'CC variants A/B',
          },
          {
            kind: '⌨ Claude Code', mode: 'Generated prompt + hand-off',
            body: 'Perfect prompt + open in Claude Code · scaffolds the prototype.',
            cta: 'Pick mode', recommend: true, useFor: 'Render-test prototype',
          },
          {
            kind: '🖼 Slide deck', mode: 'HTML/PPTX export',
            body: 'For pitching the approach internally or to client.',
            cta: 'Pick mode', recommend: false, useFor: 'Stakeholder walkthrough',
          },
          {
            kind: '📚 Save to KB', mode: 'Pattern · skill · doc',
            body: 'Turn this conversation into reusable knowledge.',
            cta: 'Pick mode', recommend: true, useFor: '"60-day CC pilot" pattern',
          },
        ].map((m, i) => (
          <Box key={m.kind} seed={i + 1} accent={m.recommend} style={{
            padding: 14, display: 'flex', flexDirection: 'column', gap: 6,
            background: m.recommend ? `${PURPLE}06` : '#fff',
            position: 'relative',
          }}>
            {m.recommend && (
              <Note rotate={3} color="#dff2c8" style={{ position: 'absolute', top: -10, right: -6, padding: '2px 6px', fontSize: 12, zIndex: 2 }}>
                Claude recommends
              </Note>
            )}
            <Hand size={22}>{m.kind}</Hand>
            <H size={11} color={MUTED}>{m.mode}</H>
            <H size={13} style={{ flex: 1 }}>{m.body}</H>
            <Box dashed seed={i} style={{ padding: 5, background: '#fafafa' }}>
              <H size={10} color={MUTED}>e.g. {m.useFor}</H>
            </Box>
            <Btn primary={m.recommend} seed={i} style={{ alignSelf: 'flex-start' }}>{m.cta} →</Btn>
          </Box>
        ))}
      </div>
    </div>
  );
}

// ─── Mode: Text / Document ────────────────────────────────────
function V2HandoffDoc() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '20px 30px', background: '#fafafa', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Chip selected seed={1}>📄 Document</Chip>
          <Hand size={22}>Recommendation memo</Hand>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>Markdown</Btn>
          <Btn small seed={2}>PDF</Btn>
          <Btn small ghost seed={3}>Notion</Btn>
          <Btn small ghost seed={4}>Google Doc</Btn>
        </div>

        <Box seed={2} style={{ padding: 18, flex: 1, overflow: 'hidden', background: '#fff' }}>
          <H size={11} color={MUTED}>FROM: Composed Digital · TO: Acme Co brand-team · 22 May 2026</H>
          <Hand size={26} style={{ marginTop: 8, display: 'block' }}>Phased Content Cards rollout</Hand>
          <H size={11} color={MUTED}>Drafted by Claude · approved by Sarah K. · cites 4 KB sources</H>

          <Hand size={16} style={{ marginTop: 14, display: 'block' }}>Recommendation</Hand>
          <H size={13}>Run a 60-day Content Cards pilot to new users at 5% of inbound traffic, with two creative variants (offer-led vs. category-led). Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%. <sup style={{ color: PURPLE }}>[1][2]</sup></H>

          <Hand size={16} style={{ marginTop: 10, display: 'block' }}>Why</Hand>
          <H size={13}>Bloom Co's near-identical rollout returned +11% activation in 6 weeks <sup style={{ color: PURPLE }}>[3]</sup>. Acme's MAU comfortably powers an 8% lift at 5% cohort.</H>

          <Hand size={16} style={{ marginTop: 10, display: 'block' }}>Risks</Hand>
          <H size={13}>· iOS &lt; 14.5 has CC analytics gaps — we'll cohort-segment to monitor.<br/>· Combined email+CC volume may cross IP threshold — schedule warming if so <sup style={{ color: PURPLE }}>[4]</sup>.</H>

          <H size={11} color={MUTED} style={{ marginTop: 14 }}>REFERENCES — [1] Braze · Content Cards · [2] Lifecycle messaging · [3] Bloom — phased CC · [4] Braze · IP Warming</H>
        </Box>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Btn ghost seed={1}>← Back to brief</Btn>
          <div style={{ flex: 1 }} />
          <Btn ghost seed={2}>Rewrite shorter</Btn>
          <Btn ghost seed={3}>Add diagrams</Btn>
          <Btn primary seed={4}>Export & share</Btn>
        </div>
      </div>

      <div style={{ width: 220, padding: '14px 12px', background: '#fff', borderLeft: `1.4px dashed ${INK}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={11} color={MUTED}>STYLE</H>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Chip selected seed={1}>Memo</Chip>
          <Chip seed={2}>ADR</Chip>
          <Chip seed={3}>FAQ</Chip>
          <Chip seed={4}>Playbook</Chip>
        </div>
        <H size={11} color={MUTED}>AUDIENCE</H>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Chip selected seed={1}>Client</Chip>
          <Chip seed={2}>Internal</Chip>
          <Chip seed={3}>Eng</Chip>
        </div>
        <H size={11} color={MUTED}>LENGTH</H>
        <Box seed={2} style={{ padding: 6 }}>
          <H size={12}>~ 1 page</H>
        </Box>
        <H size={11} color={MUTED}>VOICE</H>
        <Box seed={3} style={{ padding: 6 }}>
          <H size={12}>Composed AU · plain</H>
        </Box>
        <H size={11} color={MUTED} style={{ marginTop: 8 }}>USED FROM KB</H>
        <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={1} />
        <KbDoc title="Bloom — phased CC" kind="CLIENT" highlighted seed={2} />
        <KbDoc title="Lifecycle messaging" kind="BP" highlighted seed={3} />
        <KbDoc title="Braze · IP Warming" kind="DOC" highlighted seed={4} />
      </div>
    </div>
  );
}

// ─── Mode: Claude Design ──────────────────────────────────────
function V2HandoffDesign() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '14px 22px', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Chip selected seed={1}>🎨 Claude Design</Chip>
          <Hand size={22}>Content Cards · variants</Hand>
          <div style={{ flex: 1 }} />
          <Btn small seed={1}>iPhone</Btn>
          <Btn small ghost seed={2}>Android</Btn>
          <Btn small ghost seed={3}>Tablet</Btn>
        </div>

        <div style={{ flex: 1, display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center' }}>
          {[
            { name: 'A · offer-led', accent: PURPLE },
            { name: 'B · category-led', accent: '#5a8a3a' },
            { name: 'C · personalised', accent: '#a04040', dim: true },
          ].map((v, i) => (
            <div key={v.name} style={{ position: 'relative' }}>
              <Note rotate={i % 2 ? 3 : -3} color={i === 0 ? '#fef4a8' : i === 1 ? '#dff2c8' : '#ffd6e8'} style={{ position: 'absolute', top: -28, left: i % 2 ? 'auto' : 4, right: i % 2 ? 4 : 'auto', padding: '3px 8px', fontSize: 13, zIndex: 2 }}>
                {v.name}
              </Note>
              <div style={{
                width: 200, height: 380, opacity: v.dim ? 0.5 : 1,
                border: `2px solid ${INK}`, borderRadius: 28,
                background: '#fff', padding: 14,
                display: 'flex', flexDirection: 'column', gap: 8,
                transform: tilt(i),
              }}>
                <Line length={36} style={{ height: 3, alignSelf: 'center', borderRadius: 2 }} />
                <H size={11} color={MUTED}>Acme app · home</H>
                <PH w={170} h={70} label="hero" />
                {i === 0 && (
                  <Box seed={1} accent style={{ padding: 8, background: `${PURPLE}10`, borderColor: PURPLE }}>
                    <H size={11} color={PURPLE}>NEW · for you</H>
                    <H size={12} weight={700}>20% off first order</H>
                    <H size={11} color={MUTED}>Tap to claim →</H>
                  </Box>
                )}
                {i === 1 && (
                  <Box seed={2} style={{ padding: 8, display: 'flex', gap: 8 }}>
                    <PH w={48} h={48} />
                    <div style={{ flex: 1 }}>
                      <H size={11} color={PURPLE}>EXPLORE</H>
                      <H size={12} weight={700}>Outdoor & camping</H>
                      <H size={10} color={MUTED}>32 picks for you</H>
                    </div>
                  </Box>
                )}
                {i === 2 && (
                  <Box dashed seed={3} style={{ padding: 8 }}>
                    <H size={11} color={MUTED}>placeholder · CTR pending</H>
                  </Box>
                )}
                <PH w={170} h={120} label="grid" />
                <Line length={30} style={{ height: 3, alignSelf: 'center', marginTop: 'auto' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Btn small ghost seed={1}>← Brief</Btn>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={2}>Try variant C</Btn>
          <Btn small ghost seed={3}>Regenerate all</Btn>
          <Btn small seed={4}>Export to Figma</Btn>
          <Btn primary small seed={5}>→ Build prototype (Code)</Btn>
        </div>
      </div>

      <div style={{ width: 240, padding: '14px 12px', background: '#fff', borderLeft: `1.4px dashed ${INK}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <H size={11} color={MUTED}>EDITING VARIANT A</H>
        <Box seed={1} style={{ padding: 8 }}>
          <H size={11} color={MUTED}>Tone</H>
          <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            <Chip selected seed={1}>Direct</Chip>
            <Chip seed={2}>Playful</Chip>
            <Chip seed={3}>Premium</Chip>
          </div>
        </Box>
        <Box seed={2} style={{ padding: 8 }}>
          <H size={11} color={MUTED}>Offer</H>
          <Box dashed seed={1} style={{ padding: 4, marginTop: 4 }}>
            <H size={12}>20% off first order</H>
          </Box>
        </Box>
        <Box seed={3} style={{ padding: 8 }}>
          <H size={11} color={MUTED}>Slot</H>
          <Chip selected seed={1}>Home · above fold</Chip>
        </Box>
        <Note rotate={-2}>
          Tap any element → ask Claude to rework just that piece.
        </Note>
        <div style={{ marginTop: 'auto' }}>
          <H size={11} color={MUTED}>USES BRAND</H>
          <Box seed={1} style={{ padding: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 14, background: PURPLE, borderRadius: 3 }} />
            <H size={11}>Acme · brand kit</H>
          </Box>
        </div>
      </div>
    </div>
  );
}

// ─── Mode: Claude Code ────────────────────────────────────────
function V2HandoffCode() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '14px 22px', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Chip selected seed={1}>⌨ Claude Code</Chip>
          <Hand size={22}>Generated prompt + handoff</Hand>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>Edit prompt</Btn>
          <Btn small seed={2}>Copy</Btn>
        </div>

        <Hand size={18}>① The prompt Claude wrote for you</Hand>
        <Box seed={2} style={{ padding: 14, background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <H size={13}>You are setting up a <strong>Content Cards render-test prototype</strong> for Acme Co's mobile app. Build a Next.js + Braze sandbox that:</H>
          <H size={13}>· Targets a synthetic "new users · 60d" segment with two CC variants (offer-led, category-led).<br/>
            · Wires Braze SDK to a feature-flagged client that records: impression, dismiss, CTA tap, activation event.<br/>
            · Includes a /control page that turns CC off for the cohort.<br/>
            · Ships a /report page reading from the analytics events with CTR &amp; activation delta.</H>
          <H size={13}>Use Acme's brand tokens <sup style={{ color: PURPLE }}>[5]</sup>. Reference Bloom Co's pilot structure <sup style={{ color: PURPLE }}>[3]</sup> and Braze CC slot rules <sup style={{ color: PURPLE }}>[1]</sup>. IP warming is out of scope for this prototype.</H>
          <H size={11} color={MUTED}>Brief, KB refs and decision history attached as context · 4 docs · 3 prior conversations</H>
        </Box>

        <Hand size={18}>② Open in</Hand>
        <div style={{ display: 'flex', gap: 14 }}>
          <Box seed={1} accent style={{ padding: 12, flex: 1, background: `${PURPLE}06`, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <H size={14} weight={700}>Claude Code · cloud</H>
            <H size={11} color={MUTED}>Spins a sandbox with Acme env vars (read-only).<br/>Live preview · branchable · sharable URL.</H>
            <Btn primary seed={1} style={{ alignSelf: 'flex-start', marginTop: 6 }}>Open Claude Code →</Btn>
          </Box>
          <Box seed={2} style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <H size={14} weight={700}>claude on your machine</H>
            <H size={11} color={MUTED}>Downloads a starter repo + .claude folder<br/>prefilled with this prompt and KB context.</H>
            <Btn seed={1} style={{ alignSelf: 'flex-start', marginTop: 6 }}>Download starter ↓</Btn>
          </Box>
          <Box seed={3} style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <H size={14} weight={700}>Slash to a teammate</H>
            <H size={11} color={MUTED}>@mention an engineer · they get the prompt, brief and KB in a Slack thread.</H>
            <Btn ghost seed={1} style={{ alignSelf: 'flex-start', marginTop: 6 }}>Pick teammate</Btn>
          </Box>
        </div>

        <Hand size={18}>③ What gets attached</Hand>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip selected seed={1}>Brief v3</Chip>
          <Chip selected seed={2}>4 KB docs</Chip>
          <Chip selected seed={3}>Acme brand kit</Chip>
          <Chip selected seed={4}>Chat decision log</Chip>
          <Chip seed={5}>+ test data</Chip>
          <Chip seed={6}>+ Figma export</Chip>
        </div>
      </div>

      <div style={{ width: 320, padding: '14px 14px', background: '#1a1a2e', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <H size={11} style={{ color: '#9d8eff' }}>SANDBOX · braze-cc-pilot.tsx</H>
        <Box seed={1} style={{ padding: 10, background: '#0d0d1a', borderColor: '#1a1a2e', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: '#dcd6ff', lineHeight: 1.55 }}>
          <div><span style={{ color: '#7BB1FD' }}>import</span> {'{ braze }'} <span style={{ color: '#7BB1FD' }}>from</span> <span style={{ color: '#dff2c8' }}>'@composed/sdk'</span></div>
          <div style={{ marginTop: 6, color: '#9D00FF' }}>// pulled from KB · Acme — Braze setup [5]</div>
          <div><span style={{ color: '#7BB1FD' }}>export const</span> pilot = {'{'}</div>
          <div>&nbsp;&nbsp;segment: <span style={{ color: '#dff2c8' }}>'new_users_60d'</span>,</div>
          <div>&nbsp;&nbsp;variants: [<span style={{ color: '#dff2c8' }}>'A · offer'</span>, <span style={{ color: '#dff2c8' }}>'B · cat'</span>],</div>
          <div>&nbsp;&nbsp;rollout: {'{'} pct: <span style={{ color: '#fef4a8' }}>5</span> {'}'},</div>
          <div>&nbsp;&nbsp;control: <span style={{ color: '#fef4a8' }}>true</span>,</div>
          <div>&nbsp;&nbsp;events: [<span style={{ color: '#dff2c8' }}>'imp'</span>, <span style={{ color: '#dff2c8' }}>'tap'</span>, <span style={{ color: '#dff2c8' }}>'act'</span>]</div>
          <div>{'}'}</div>
          <div style={{ marginTop: 6, color: '#7a7a85' }}>// scaffolding · 47 more lines…</div>
        </Box>
        <H size={11} style={{ color: '#9d8eff' }}>● Claude Code is writing — live preview ready in ~30s</H>
        <Box seed={2} dashed style={{ padding: 8, background: '#0d0d1a', borderColor: '#3a3a5e' }}>
          <H size={11} style={{ color: '#dcd6ff' }}>preview · render-test.acme.composed.app</H>
        </Box>
      </div>
    </div>
  );
}

// ─── Mode: in-chat suggestion (how it surfaces) ───────────────
function V2HandoffSuggested() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '14px 24px', display: 'flex', flexDirection: 'column', gap: 10, borderRight: `1.4px solid ${INK}` }}>
        <H size={11} color={MUTED}>CHAT · Acme · Braze CC</H>
        <Box seed={1}>
          <H size={13}><strong>You:</strong> What's the right way to actually pilot Content Cards for Acme?</H>
        </Box>
        <Box seed={2}>
          <H size={11} color={MUTED}>Claude</H>
          <H size={13}>Run a 60-day pilot to new users at 5% of inbound, with two variants. The depth of answer you need points to different next steps — pick one:</H>

          {/* Inline handoff card */}
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              ['💬', 'Stay in chat', 'I\'ll explain the decisions inline', false],
              ['📄', 'Draft a client memo', 'A 1-pager Acme can sign off on', false],
              ['🎨', 'Mock the CC variants', 'Visual A/B in Claude Design', true],
              ['⌨', 'Build the prototype', 'Open in Claude Code with the brief', true],
            ].map(([icon, title, sub, rec], i) => (
              <Box key={i} seed={i + 1} accent={rec} style={{ padding: 10, background: rec ? `${PURPLE}06` : '#fff', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <H size={14}>{icon} <strong>{title}</strong></H>
                <H size={11} color={MUTED}>{sub}</H>
                {rec && <H size={10} color={PURPLE}>✨ recommended for "Prototype" intent</H>}
              </Box>
            ))}
          </div>
        </Box>

        <Note rotate={-2} style={{ alignSelf: 'flex-start' }}>
          Mode picks aren't one-way.<br/>
          <span style={{ fontSize: 14 }}>Generate the memo AND the prototype — they share the brief.</span>
        </Note>

        <div style={{ marginTop: 'auto' }}>
          <Box seed={9} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <H size={13} color={MUTED}>Reply, or pick a mode above…</H>
            <div style={{ flex: 1 }} />
            <Btn primary small seed={3}>↵</Btn>
          </Box>
        </div>
      </div>

      <div style={{ width: 240, padding: '14px 12px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <H size={11} color={MUTED}>BRIEF · live</H>
        <Box seed={1} style={{ padding: 8 }}>
          <H size={11} color={MUTED}>APPROACH</H>
          <H size={11}>5% pilot · 2 variants · 60d…</H>
          <H size={10} color={PURPLE} style={{ marginTop: 4 }}>● Claude · editing</H>
        </Box>
        <H size={11} color={MUTED}>PINNED REFS</H>
        <KbDoc title="Braze · Content Cards" kind="DOC" highlighted seed={1} />
        <KbDoc title="Bloom — phased CC" kind="CLIENT" highlighted seed={2} />
        <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={3} />
      </div>
    </div>
  );
}

function V2HandoffHubView() { return <V2Shell activeTab="Prototype" kbCollapsed={true}><V2HandoffHub /></V2Shell>; }
function V2HandoffDocView() { return <V2Shell activeTab="Prototype" kbCollapsed={true}><V2HandoffDoc /></V2Shell>; }
function V2HandoffDesignView() { return <V2Shell activeTab="Prototype" kbCollapsed={true}><V2HandoffDesign /></V2Shell>; }
function V2HandoffCodeView() { return <V2Shell activeTab="Prototype" kbCollapsed={true}><V2HandoffCode /></V2Shell>; }
function V2HandoffSuggestedView() { return <V2Shell activeTab="Workspace" kbCollapsed={true}><V2HandoffSuggested /></V2Shell>; }

Object.assign(window, {
  V2HandoffHubView, V2HandoffDocView, V2HandoffDesignView, V2HandoffCodeView, V2HandoffSuggestedView,
});
