// v2 — Knowledge tab: three takes on organising MANY docs across MANY clients.

// ─── A. Faceted browser (recommended) ─────────────────────────
function V2KbFaceted() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Facet rail */}
      <div style={{ width: 220, padding: '14px 12px', borderRight: `1.4px solid ${INK}`, background: '#fff', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        <Box dashed seed={1} style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>🔍</span>
          <H size={12} color={MUTED}>Search 412 docs…</H>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: MUTED, padding: '1px 4px', border: `1px solid ${MUTED}`, borderRadius: 3 }}>⌘K</span>
        </Box>

        <H size={11} color={MUTED}>CLIENT</H>
        <Box seed={1} style={{ padding: 6 }}>
          {['Acme Co (32)', 'Bloom Co (18)', 'Outback (24)', 'Coastal (9)', 'Internal (—)'].map((c, i) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontFamily: 'Architects Daughter, cursive', fontSize: 12 }}>
              <span style={{ width: 10, height: 10, border: `1.2px solid ${INK}`, borderRadius: 2, background: i < 2 ? PURPLE : '#fff' }} />
              <H size={12} weight={i < 2 ? 700 : 400} color={i < 2 ? PURPLE : INK}>{c}</H>
            </div>
          ))}
        </Box>

        <H size={11} color={MUTED}>PLATFORM</H>
        <Box seed={2} style={{ padding: 6 }}>
          {['Braze (147)', 'Shopify (96)', 'Talon One (54)', 'Eagle Eye (38)', 'Klaviyo (12)', 'Segment (8)'].map((c, i) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontFamily: 'Architects Daughter, cursive', fontSize: 12 }}>
              <span style={{ width: 10, height: 10, border: `1.2px solid ${INK}`, borderRadius: 2, background: i === 0 ? PURPLE : '#fff' }} />
              <H size={12} weight={i === 0 ? 700 : 400} color={i === 0 ? PURPLE : INK}>{c}</H>
            </div>
          ))}
        </Box>

        <H size={11} color={MUTED}>TYPE</H>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Chip selected seed={1}>Client</Chip>
          <Chip seed={2}>Platform</Chip>
          <Chip selected seed={3}>Best prac.</Chip>
          <Chip seed={4}>Skill</Chip>
          <Chip seed={5}>Internal</Chip>
        </div>

        <H size={11} color={MUTED}>UPDATED</H>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Chip seed={1}>Any</Chip>
          <Chip selected seed={2}>30d</Chip>
          <Chip seed={3}>90d</Chip>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Btn small ghost seed={1} style={{ width: '100%', textAlign: 'center' }}>Clear filters</Btn>
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, padding: '14px 18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Hand size={22}>Knowledge · 18 results <H size={12} color={MUTED}>· Acme Co, Bloom Co · Braze · Best prac. · 30d</H></Hand>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn small ghost seed={1}>Sort: relevance</Btn>
            <Btn small ghost seed={2}>List</Btn>
            <Btn small seed={3}>Cards</Btn>
            <Btn small primary seed={4}>+ Add doc</Btn>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <H size={11} color={MUTED}>Smart collections:</H>
          <Chip seed={1}>★ My recent</Chip>
          <Chip seed={2}>📌 In play</Chip>
          <Chip seed={3}>🆕 Added this week</Chip>
          <Chip seed={4}>⚠ Stale (&gt;6mo)</Chip>
          <Chip seed={5}>✨ Claude-drafted</Chip>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, overflow: 'hidden' }}>
          {[
            ['Acme — Braze setup', 'CLIENT · ACME', 'Email canvases live; CC integration pending IP warming.', 'Sarah K. · 2d', true],
            ['Bloom — phased CC pilot', 'CLIENT · BLOOM', '60-day new-user pilot, +11% activation result.', 'Mira J. · 5d', true],
            ['Braze · Content Cards', 'DOC · BRAZE', 'Render targets, analytics caveats, slot strategy.', 'Internal · 9d', false],
            ['Lifecycle messaging playbook', 'BEST PRAC.', 'Phase model from acquisition → loyalty.', 'Team · 14d', false],
            ['Acme — discovery notes', 'CLIENT · ACME', 'Brand-team interview transcripts and goals.', 'Sarah K. · 21d', false],
            ['IP warming · ramp plan', 'DOC · BRAZE', 'Standard ramp schedule with sender-rep checks.', 'Internal · 22d', false],
          ].map(([title, tag, snip, who, pinned], i) => (
            <Box key={i} seed={i + 1} style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
              {pinned && <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 12 }}>📌</span>}
              <H size={10} color={MUTED}>{tag}</H>
              <H size={13} weight={700}>{title}</H>
              <H size={11} color={MUTED} style={{ flex: 1 }}>{snip}</H>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>
                <H size={10} color={MUTED}>{who}</H>
                <div style={{ flex: 1 }} />
                <Btn small ghost seed={i}>Pin to brief</Btn>
              </div>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── B. Smart collections ─────────────────────────────────────
function V2KbCollections() {
  return (
    <div style={{ flex: 1, padding: '14px 18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Hand size={24}>Knowledge · collections</Hand>
        <div style={{ flex: 1 }} />
        <Box dashed seed={1} style={{ padding: '4px 10px', width: 280, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>🔍</span>
          <H size={12} color={MUTED}>Search across 412 docs…</H>
        </Box>
        <Btn primary small seed={2}>+ Add doc</Btn>
      </div>

      <H size={11} color={MUTED}>📌 IN PLAY · linked to your open projects</H>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          ['Acme — Braze setup', 'Acme · Braze CC'],
          ['Bloom — phased CC', 'Acme · Braze CC'],
          ['Braze · Content Cards', '2 projects'],
          ['Outback — Shopify mig.', 'Outback · Shopify'],
        ].map(([t, p], i) => (
          <Box key={i} seed={i + 1} accent style={{ padding: 8, background: `${PURPLE}06`, minWidth: 200 }}>
            <H size={12} weight={700}>{t}</H>
            <H size={10} color={MUTED}>used in {p}</H>
          </Box>
        ))}
      </div>

      <H size={11} color={MUTED}>BY CLIENT · {`{ Acme · Bloom · Outback · Coastal · 8 more }`} → expand any</H>
      <Box seed={2} style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Hand size={18}>Acme Co</Hand>
          <span style={{ fontSize: 10, color: MUTED }}>32 docs · 2 active projects</span>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>View all →</Btn>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip seed={1}>Braze (8)</Chip>
          <Chip seed={2}>Shopify (12)</Chip>
          <Chip seed={3}>Discovery (5)</Chip>
          <Chip seed={4}>Contracts (3)</Chip>
          <Chip seed={5}>+4 tags</Chip>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {['Acme — Braze setup', 'Acme — discovery notes', 'Acme — Shopify checkout', 'Acme — IP warming plan'].map((t, i) => (
            <Box key={t} seed={i + 4} style={{ padding: '4px 10px' }}>
              <H size={11}>{t}</H>
            </Box>
          ))}
          <H size={11} color={MUTED} style={{ alignSelf: 'center' }}>+28 more →</H>
        </div>
      </Box>

      <div style={{ display: 'flex', gap: 12 }}>
        <Box seed={3} style={{ padding: 12, flex: 1 }}>
          <Hand size={18}>By platform</Hand>
          <H size={11} color={MUTED}>quick jumps</H>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {['Braze (147)', 'Shopify (96)', 'Talon One (54)', 'Eagle Eye (38)', '+ add platform'].map((t, i) => (
              <Chip key={t} selected={i === 0} seed={i}>{t}</Chip>
            ))}
          </div>
        </Box>
        <Box seed={4} style={{ padding: 12, flex: 1 }}>
          <Hand size={18}>✨ Claude curated</Hand>
          <H size={11} color={MUTED}>cross-doc collections it noticed</H>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
            <H size={12}>📚 "Phased CC rollouts" — 5 docs</H>
            <H size={12}>📚 "IP warming for retail" — 7 docs</H>
            <H size={12}>📚 "Loyalty + messaging" — 9 docs</H>
          </div>
        </Box>
      </div>

      <Note rotate={-1.5} style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
        Tags + collections = no tree. Scales to 1000s of docs.
      </Note>
    </div>
  );
}

// ─── C. Spotlight search (primary discovery mode) ─────────────
function V2KbSpotlight() {
  return (
    <div style={{ flex: 1, padding: '20px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Hand size={22}>Knowledge · search-first</Hand>
      <H size={12} color={MUTED}>For very-large KBs. Type what you mean; everything else is a filter on the results.</H>

      <Box seed={1} style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <H size={20} weight={700}>"phased rollout for new users"</H>
          <div style={{ flex: 1 }} />
          <Chip selected seed={1}>Braze</Chip>
          <Chip selected seed={2}>Acme</Chip>
          <Chip seed={3}>+ filter</Chip>
        </div>
        <H size={11} color={MUTED}>22 matches · semantic + tag search · ranked by relevance to your active brief</H>
      </Box>

      <div style={{ flex: 1, display: 'flex', gap: 14, overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Bloom — phased CC pilot', 'CLIENT · BLOOM CO', '"…60-day new-user pilot for Content Cards…"', 96],
            ['Lifecycle messaging playbook', 'BEST PRAC.', '"…ramp to new users in three cohort waves…"', 88],
            ['Braze · Content Cards', 'DOC · BRAZE', '"…phased rollouts: see canvas pacing…"', 82],
            ['Acme — discovery notes', 'CLIENT · ACME', '"…activation lift target stated as 8%…"', 71],
            ['IP warming · ramp plan', 'DOC · BRAZE', '"…schedule senders during phased rollouts…"', 65],
          ].map(([title, tag, snip, score], i) => (
            <Box key={i} seed={i + 1} style={{ padding: 10, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 36, textAlign: 'center' }}>
                <H size={16} weight={700} color={PURPLE}>{score}</H>
                <H size={10} color={MUTED}>match</H>
              </div>
              <div style={{ flex: 1 }}>
                <H size={10} color={MUTED}>{tag}</H>
                <H size={13} weight={700}>{title}</H>
                <H size={12} color={MUTED}>{snip}</H>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Btn small ghost seed={1}>Open</Btn>
                <Btn small seed={2}>Pin</Btn>
              </div>
            </Box>
          ))}
        </div>

        <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Box seed={1} accent style={{ padding: 10, background: `${PURPLE}06` }}>
            <H size={11} color={PURPLE}>✨ CLAUDE SAYS</H>
            <H size={12}>Across these 5 docs, the recurring pattern is: dev-segment validation → 5% cohort → expand by CTR.</H>
            <Btn small seed={1} style={{ marginTop: 6 }}>Use this as approach →</Btn>
          </Box>
          <Box seed={2} style={{ padding: 10 }}>
            <H size={11} color={MUTED}>RELATED TAGS</H>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
              <Chip seed={1}>cohorts</Chip>
              <Chip seed={2}>activation</Chip>
              <Chip seed={3}>CTR</Chip>
              <Chip seed={4}>IP warming</Chip>
            </div>
          </Box>
          <Box seed={3} style={{ padding: 10 }}>
            <H size={11} color={MUTED}>RECENT SEARCHES</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 6 }}>
              <H size={11}>· "talon promo rules acme"</H>
              <H size={11}>· "eagle eye loyalty tiers"</H>
              <H size={11}>· "shopify checkout webhook"</H>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

function V2Knowledge({ mode = 'faceted' }) {
  const body = mode === 'faceted' ? <V2KbFaceted /> : mode === 'collections' ? <V2KbCollections /> : <V2KbSpotlight />;
  return <V2Shell activeTab="Knowledge" kbCollapsed={true}>{body}</V2Shell>;
}

Object.assign(window, { V2Knowledge, V2KbFaceted, V2KbCollections, V2KbSpotlight });
