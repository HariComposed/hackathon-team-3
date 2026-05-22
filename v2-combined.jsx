// v2 — the combined flow: Setup → Workspace (chat + brief) → Brief full → Knowledge → Prototype handoff hub.

// ─── Setup tab ────────────────────────────────────────────────
function V2Setup() {
  return (
    <div style={{ flex: 1, padding: '18px 24px', overflow: 'hidden', display: 'flex', gap: 18 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Hand size={28}>Acme · Braze Content Cards</Hand>
        <H size={13} color={MUTED}>Set the scope. Claude scaffolds the brief on the right as you choose.</H>

        <Box seed={1} style={{ padding: '12px 14px' }}>
          <H size={11} color={MUTED}>① PLATFORMS · multi-select</H>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
            {PLATFORMS.map((p) => (
              <PlatformCard key={p.name} {...p} selected={p.name === 'Braze' || p.name === 'Shopify'} w={104} h={80} />
            ))}
            <div style={{
              width: 104, height: 80, border: `1.6px dashed ${MUTED}`,
              borderRadius: roughRadius(99), display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: MUTED, fontFamily: 'Caveat, cursive', fontSize: 16,
            }}>+ Klaviyo · Segment · …</div>
          </div>
        </Box>

        <Box seed={2} style={{ padding: '12px 14px' }}>
          <H size={11} color={MUTED}>② INTENT · CLIENT</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip selected seed={1}>Project start</Chip>
            <Chip seed={2}>Prototype</Chip>
            <Chip seed={3}>Feature explore</Chip>
            <Chip seed={4}>General advice</Chip>
            <span style={{ width: 1, height: 18, background: INK, opacity: 0.3, margin: '0 4px' }} />
            <Chip selected seed={5}>Existing · Acme</Chip>
            <Chip seed={6}>New client</Chip>
            <Chip seed={7}>Internal</Chip>
          </div>
        </Box>

        <Box seed={3} accent style={{ padding: '12px 14px', background: `${PURPLE}06` }}>
          <H size={11} color={MUTED}>③ BRAZE FEATURES <span style={{ color: PURPLE }}>· expanded because Braze is selected</span></H>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {['Content Cards', 'Banners', 'Email', 'SMS', 'Push', 'IP Warming', 'Canvas Flow', 'Catalogs', 'Connected Content'].map((f, i) => (
              <Chip key={f} selected={i === 0 || i === 5} seed={i}>{f}</Chip>
            ))}
            <Chip seed={20}>+ Suggest</Chip>
          </div>
          <H size={11} color={MUTED} style={{ marginTop: 10 }}>SHOPIFY FEATURES</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {['Checkout API', 'Audiences', 'Webhooks', 'Functions'].map((f) => <Chip key={f} seed={f.length}>{f}</Chip>)}
          </div>
        </Box>

        <Box seed={4} style={{ padding: '12px 14px' }}>
          <H size={11} color={MUTED}>④ NOTES / FILES (optional)</H>
          <Box dashed seed={1} style={{ padding: 8, marginTop: 6, minHeight: 50, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Chip seed={1}>brief.pdf</Chip>
            <Chip seed={2}>discovery-notes.md</Chip>
            <H size={12} color={MUTED}>Drop or paste anything…</H>
          </Box>
        </Box>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 'auto' }}>
          <Btn ghost seed={1}>Save as draft</Btn>
          <Btn primary seed={2}>Generate brief & open workspace →</Btn>
        </div>
      </div>

      {/* Live brief preview, right column */}
      <div style={{ width: 320, position: 'relative' }}>
        <Note rotate={3} style={{ position: 'absolute', top: -8, right: -4, padding: '2px 8px', fontSize: 14, zIndex: 2 }}>writing as you choose…</Note>
        <Box seed={5} style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Hand size={20}>Brief · draft</Hand>
          <H size={11} color={MUTED}>auto-generated · you can edit anything</H>
          <div>
            <H size={10} color={MUTED}>CONTEXT</H>
            <H size={12}>Help <HL>Acme Co</HL> set up <HL>Braze Content Cards</HL> alongside their existing email canvases.</H>
          </div>
          <div>
            <H size={10} color={MUTED}>PLATFORMS</H>
            <div style={{ display: 'flex', gap: 4, marginTop: 3, flexWrap: 'wrap' }}>
              <Chip selected seed={1}>Braze · CC</Chip>
              <Chip selected seed={2}>Braze · IP Warm</Chip>
              <Chip selected seed={3}>Shopify</Chip>
            </div>
          </div>
          <div>
            <H size={10} color={MUTED}>OPEN QUESTIONS · Claude will ask</H>
            <H size={12}>· What's the segment we're targeting?<br/>· Pilot duration?<br/>· Success metric?</H>
          </div>
          <div>
            <H size={10} color={MUTED}>REFERENCES (auto)</H>
            <H size={11}><span style={{ color: PURPLE }}>[1]</span> Acme — Braze setup<br/>
              <span style={{ color: PURPLE }}>[2]</span> Braze · Content Cards<br/>
              <span style={{ color: PURPLE }}>[3]</span> Braze · IP Warming</H>
          </div>
        </Box>
      </div>
    </div>
  );
}

// ─── Workspace tab ─ chat ⟷ brief, both live ───────────────────
function V2Workspace() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Chat column */}
      <div style={{ flex: 1.1, padding: '14px 22px', display: 'flex', flexDirection: 'column', gap: 10, borderRight: `1.4px solid ${INK}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Hand size={20}>Conversation</Hand>
          <H size={11} color={MUTED}>· brief auto-updates →</H>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>Hide brief</Btn>
        </div>

        <Box seed={1}>
          <H size={11} color={MUTED}>Claude</H>
          <H size={13}>I drafted the brief from your setup. A few questions sharpen the approach — what segment are we piloting to first?</H>
        </Box>
        <div style={{ alignSelf: 'flex-end', maxWidth: 360 }}>
          <Box seed={2} style={{ background: `${PURPLE}10`, borderColor: PURPLE }}>
            <H size={13}>New users only, first 60 days. Goal is to lift activation by 8%.</H>
          </Box>
        </div>
        <Box seed={3}>
          <H size={11} color={MUTED}>Claude · added to brief</H>
          <H size={13}>Got it. Bloom Co ran a similar pilot — same segment, +11% activation in 6 weeks <sup style={{ color: PURPLE }}>[4]</sup>. I've cited it and outlined a phased rollout in <span style={{ color: PURPLE }}>Approach</span>.</H>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <Btn small ghost seed={1}>↪ Show diff</Btn>
            <Btn small ghost seed={2}>Cite differently</Btn>
            <Btn small ghost seed={3}>Undo edit</Btn>
          </div>
        </Box>
        <Note rotate={-2} style={{ alignSelf: 'flex-start' }}>
          ✨ Want me to scaffold a <HL>render-test prototype</HL> next?
        </Note>

        <div style={{ marginTop: 'auto' }}>
          <Box seed={9} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <H size={13} color={MUTED}>Reply…</H>
            <div style={{ flex: 1 }} />
            <Btn small ghost seed={1}>📎</Btn>
            <Btn small seed={2}>↗ Handoff</Btn>
            <Btn primary small seed={3}>↵</Btn>
          </Box>
        </div>
      </div>

      {/* Brief column */}
      <div style={{ flex: 0.95, padding: '14px 18px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Hand size={20}>Brief · Acme Braze CC</Hand>
          <div style={{ display: 'flex', gap: 4 }}>
            <Btn small ghost seed={1}>v3</Btn>
            <Btn small ghost seed={2}>Edit</Btn>
            <Btn small seed={3}>Export</Btn>
          </div>
        </div>

        <div>
          <H size={10} color={MUTED}>CONTEXT</H>
          <H size={13}>Acme Co uses Braze for email today <sup style={{ color: PURPLE }}>[1]</sup>. Adding <HL>Content Cards</HL> for in-app discovery, <strong>new users only</strong>, 60-day pilot.</H>
        </div>
        <div>
          <H size={10} color={MUTED}>GOAL · <span style={{ color: PURPLE }}>just added</span></H>
          <Box seed={1} style={{ padding: 6, background: `${HILITE}` }}>
            <H size={13}>Lift activation by ≥ 8% for new users (vs. control).</H>
          </Box>
        </div>
        <div>
          <H size={10} color={MUTED}>APPROACH · <span style={{ color: PURPLE }}>● Claude editing…</span></H>
          <H size={13}>1 · Render-test in dev segment <sup style={{ color: PURPLE }}>[2]</sup><br/>
            2 · 5% rollout to new users, 2 CC variants<br/>
            3 · Expand by cohort if CTR &gt; 4%<br/>
            4 · IP warming if email volume rises <sup style={{ color: PURPLE }}>[3]</sup></H>
        </div>
        <div>
          <H size={10} color={MUTED}>RISKS</H>
          <H size={13}>· CC analytics gap on iOS &lt; 14.5<br/>· Audience overlap with existing canvases</H>
        </div>
        <div>
          <H size={10} color={MUTED}>REFERENCES <span style={{ color: MUTED, fontSize: 9 }}>· pinned to brief</span></H>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <H size={11}><span style={{ color: PURPLE }}>[1]</span> Acme — Braze setup</H>
            <H size={11}><span style={{ color: PURPLE }}>[2]</span> Braze · Content Cards</H>
            <H size={11}><span style={{ color: PURPLE }}>[3]</span> Braze · IP Warming</H>
            <H size={11}><span style={{ color: PURPLE }}>[4]</span> Bloom — phased CC <span style={{ color: PURPLE, fontSize: 10 }}>· just cited</span></H>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Brief tab full-screen ────────────────────────────────────
function V2BriefFull() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* TOC */}
      <div style={{ width: 200, padding: '14px 12px', borderRight: `1.4px dashed ${INK}`, background: '#fff' }}>
        <H size={11} color={MUTED}>SECTIONS</H>
        {['Context', 'Goal', 'Platforms', 'Approach', 'Risks', 'Open questions', 'References', 'Activity'].map((s, i) => (
          <div key={s} style={{ padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Architects Daughter, cursive', fontSize: 13, color: i === 3 ? PURPLE : INK, fontWeight: i === 3 ? 700 : 400 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: i === 3 ? PURPLE : 'transparent', border: `1.2px solid ${INK}` }} />
            {s}
            {i === 3 && <span style={{ fontSize: 9, color: PURPLE, marginLeft: 'auto' }}>● editing</span>}
            {i === 5 && <span style={{ fontSize: 9, color: MUTED, marginLeft: 'auto' }}>3</span>}
            {i === 7 && <span style={{ fontSize: 9, color: MUTED, marginLeft: 'auto' }}>12</span>}
          </div>
        ))}

        <H size={11} color={MUTED} style={{ marginTop: 12 }}>VERSIONS</H>
        <Box seed={1} style={{ padding: 6, marginTop: 4 }}>
          <H size={11} weight={700}>v3 · current</H>
          <H size={10} color={MUTED}>2m ago · Claude + Sarah</H>
        </Box>
        <Box seed={2} style={{ padding: 6 }}>
          <H size={11}>v2</H>
          <H size={10} color={MUTED}>1h ago</H>
        </Box>
        <Box seed={3} style={{ padding: 6 }}>
          <H size={11}>v1 · auto-draft</H>
          <H size={10} color={MUTED}>setup</H>
        </Box>
      </div>

      {/* Document */}
      <div style={{ flex: 1, padding: '20px 36px', overflow: 'hidden', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Hand size={32}>Brief · Acme · Braze Content Cards</Hand>
          <Chip selected seed={1}>v3</Chip>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>Compare v2 → v3</Btn>
          <Btn small ghost seed={2}>Export PDF</Btn>
          <Btn small seed={3}>Save to KB</Btn>
          <Btn primary small seed={4}>Open handoff →</Btn>
        </div>

        <div>
          <H size={11} color={MUTED}>CONTEXT</H>
          <H size={15}>Acme Co runs Braze for email today <sup style={{ color: PURPLE }}>[1]</sup>. The brand team wants to test <HL>Content Cards</HL> for in-app discovery — new users only, 60-day pilot — without disturbing the existing canvas program.</H>
        </div>

        <div>
          <H size={11} color={MUTED}>GOAL</H>
          <H size={15}>Lift activation by ≥ 8% for new users vs. control cohort.</H>
        </div>

        <div style={{ position: 'relative' }}>
          <H size={11} color={MUTED}>APPROACH <span style={{ color: PURPLE }}>· Claude is editing</span></H>
          <Box seed={2} accent style={{ padding: 12, background: `${PURPLE}06`, marginTop: 4 }}>
            <H size={14}>1. Validate render in a dev segment <sup style={{ color: PURPLE }}>[2]</sup><br/>
              2. Roll out to 5% of new users with two CC variants (offer-led vs. category-led)<br/>
              3. Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%<br/>
              4. Schedule <HL>IP warming</HL> only if combined email + CC volume crosses sender threshold <sup style={{ color: PURPLE }}>[3]</sup></H>
          </Box>
          <Note rotate={-3} style={{ position: 'absolute', right: -16, top: -6, padding: '3px 8px', fontSize: 14, zIndex: 2 }}>
            🖱 select text<br/>→ rewrite · cite · ask
          </Note>
        </div>

        <div>
          <H size={11} color={MUTED}>OPEN QUESTIONS (3)</H>
          <H size={14}>· Which CC slot in the app — home or category?<br/>
            · Are we OK with a 5% cohort or want bigger?<br/>
            · Who owns analytics review weekly?</H>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <H size={11} color={MUTED}>REFERENCES</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            {[['[1]', 'Acme — Braze setup', 'CLIENT'], ['[2]', 'Braze · Content Cards', 'DOC'], ['[3]', 'Braze · IP Warming', 'DOC'], ['[4]', 'Bloom — phased CC', 'CLIENT']].map(([n, t, k]) => (
              <Box key={n} seed={n.length} style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <H size={11} color={PURPLE}>{n}</H>
                <H size={11}>{t}</H>
                <span style={{ fontSize: 9, color: MUTED }}>{k}</span>
              </Box>
            ))}
          </div>
        </div>
      </div>

      {/* Activity sidebar */}
      <div style={{ width: 200, padding: '14px 10px', borderLeft: `1.4px dashed ${INK}`, background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <H size={11} color={MUTED}>ACTIVITY</H>
        {[
          ['Claude', 'cited Bloom — phased CC in Approach', '2m', PURPLE],
          ['Sarah K.', 'added Goal: +8% activation', '4m', null],
          ['Mira J.', '💬 commented on Risks', '12m', null],
          ['Claude', 'auto-drafted v1 from setup', '1h', PURPLE],
          ['Sarah K.', 'created project', '1h', null],
        ].map(([who, what, when, color], i) => (
          <Box key={i} seed={i + 1} style={{ padding: 6 }}>
            <H size={11} weight={700} color={color || INK}>{who}</H>
            <H size={11}>{what}</H>
            <H size={10} color={MUTED}>{when}</H>
          </Box>
        ))}
      </div>
    </div>
  );
}

function V2Combined({ tab = 'Workspace' }) {
  const body = tab === 'Setup' ? <V2Setup /> : tab === 'Workspace' ? <V2Workspace /> : <V2BriefFull />;
  // When in full brief view, the side KB is collapsed; when on workspace, scoped KB present.
  return <V2Shell activeTab={tab} kbCollapsed={tab !== 'Setup'}>{body}</V2Shell>;
}

Object.assign(window, { V2Combined, V2Setup, V2Workspace, V2BriefFull });
