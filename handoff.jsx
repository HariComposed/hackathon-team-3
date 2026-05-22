// Handoff frame — what happens when Claude transitions from chat → prototype/design/code.
// This is the "demo punchline" the user called out specifically.

function HandoffFrame() {
  return (
    <Screen width={1280} height={760}>
      <TopBar project="Acme · Braze CC — building" extras={
        <Box seed={2} style={{ padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <H size={12} color={PURPLE}>● Building prototype</H>
        </Box>
      } />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: chat (compact) */}
        <div style={{ width: 280, borderRight: `1.4px solid ${INK}`, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, background: '#fff' }}>
          <H size={11} color={MUTED}>CHAT — collapsed</H>
          <Box seed={1} style={{ padding: 8 }}>
            <H size={11} color={MUTED}>You</H>
            <H size={12}>Build a CC render-test segment with two variants.</H>
          </Box>
          <Box seed={2} style={{ padding: 8 }}>
            <H size={11} color={MUTED}>Claude</H>
            <H size={12}>Scaffolding now. I'll wire it to your Braze sandbox & generate a preview.</H>
          </Box>
          <Note rotate={-2}>Using skill:<br/><HL>Prototype builder</HL></Note>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <H size={11} color={MUTED}>HANDOFF MODE</H>
            <Chip selected seed={1}>🎨 Design</Chip>
            <Chip selected seed={2}>⌨ Code</Chip>
            <Chip seed={3}>📋 Brief</Chip>
            <Chip seed={4}>🚀 Ship</Chip>
          </div>
        </div>

        {/* Middle: Design preview */}
        <div style={{ flex: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8, background: '#fafafa', borderRight: `1.4px dashed ${INK}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <H size={12} color={MUTED}>DESIGN PREVIEW · Content Card variants</H>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn small ghost seed={1}>Mobile</Btn>
              <Btn small seed={2}>Tablet</Btn>
              <Btn small ghost seed={3}>Web</Btn>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
            {/* Variant A — phone mock */}
            <div style={{ position: 'relative' }}>
              <Note rotate={-3} style={{ position: 'absolute', top: -28, left: 4, padding: '3px 8px', fontSize: 14 }}>Variant A</Note>
              <div style={{
                width: 180, height: 320,
                border: `2px solid ${INK}`, borderRadius: 24,
                background: '#fff', padding: 14,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <Line length={36} style={{ height: 3, alignSelf: 'center', borderRadius: 2 }} />
                <H size={11} color={MUTED}>Acme app</H>
                <PH w={150} h={70} label="hero" />
                <Box seed={1} accent style={{ padding: 8, background: `${PURPLE}10` }}>
                  <H size={11} color={PURPLE}>NEW · for you</H>
                  <H size={12} weight={700}>Welcome offer</H>
                  <H size={11} color={MUTED}>Free shipping for 7 days</H>
                </Box>
                <Box seed={2} style={{ padding: 8 }}>
                  <H size={11}>Browse picks ›</H>
                </Box>
                <Line length={30} style={{ height: 3, alignSelf: 'center', marginTop: 'auto' }} />
              </div>
            </div>

            {/* Variant B — phone mock */}
            <div style={{ position: 'relative' }}>
              <Note rotate={3} color="#dff2c8" style={{ position: 'absolute', top: -28, right: 4, padding: '3px 8px', fontSize: 14 }}>Variant B</Note>
              <div style={{
                width: 180, height: 320,
                border: `2px solid ${INK}`, borderRadius: 24,
                background: '#fff', padding: 14,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <Line length={36} style={{ height: 3, alignSelf: 'center', borderRadius: 2 }} />
                <H size={11} color={MUTED}>Acme app</H>
                <Box seed={3} style={{ padding: 8, display: 'flex', gap: 8 }}>
                  <PH w={48} h={48} />
                  <div style={{ flex: 1 }}>
                    <H size={11} color={PURPLE}>NEW</H>
                    <H size={12} weight={700}>Welcome offer</H>
                    <H size={10} color={MUTED}>Free shipping · 7 days</H>
                  </div>
                </Box>
                <PH w={150} h={130} label="content grid" />
                <Line length={30} style={{ height: 3, alignSelf: 'center', marginTop: 'auto' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Btn small ghost seed={1}>← Tweak A</Btn>
            <Btn small ghost seed={2}>Tweak B →</Btn>
            <div style={{ flex: 1 }} />
            <Btn small seed={3}>Regenerate</Btn>
            <Btn primary small seed={4}>Approve & ship</Btn>
          </div>
        </div>

        {/* Right: code panel + KB calls */}
        <div style={{ width: 320, padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 8, background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <H size={11} color={MUTED}>GENERATED · braze-cc-pilot.tsx</H>
            <H size={11} color={PURPLE}>● live</H>
          </div>

          <Box seed={1} style={{ padding: 10, background: '#1a1a2e', borderColor: '#1a1a2e', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: 11, color: '#dcd6ff', lineHeight: 1.5 }}>
            <div><span style={{ color: '#7BB1FD' }}>import</span> {'{ braze }'} <span style={{ color: '#7BB1FD' }}>from</span> <span style={{ color: '#dff2c8' }}>'@composed/sdk'</span></div>
            <div style={{ marginTop: 4 }}><span style={{ color: '#9D00FF' }}>// pulled from KB · Acme — Braze setup</span></div>
            <div><span style={{ color: '#7BB1FD' }}>export const</span> pilot = {'{'}</div>
            <div>&nbsp;&nbsp;segment: <span style={{ color: '#dff2c8' }}>'new_users_60d'</span>,</div>
            <div>&nbsp;&nbsp;variants: [<span style={{ color: '#dff2c8' }}>'A'</span>, <span style={{ color: '#dff2c8' }}>'B'</span>],</div>
            <div>&nbsp;&nbsp;rollout: {'{'} pct: <span style={{ color: '#fef4a8' }}>5</span> {'}'},</div>
            <div>&nbsp;&nbsp;ipWarm: <span style={{ color: '#fef4a8' }}>true</span></div>
            <div>{'}'}</div>
            <div style={{ marginTop: 4, color: '#7a7a85' }}>// 47 more lines…</div>
          </Box>

          <H size={11} color={MUTED}>USED FROM KB</H>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <KbDoc title="Acme — Braze setup" kind="CLIENT" highlighted seed={1} />
            <KbDoc title="Braze · CC reference" kind="DOC" highlighted seed={2} />
            <KbDoc title="Prototype builder" kind="SKILL" highlighted seed={3} />
            <KbDoc title="A/B for in-app msgs" kind="SKILL" highlighted seed={4} />
          </div>

          <Line dashed length={290} style={{ margin: '4px 0' }} />

          <H size={11} color={MUTED}>NEW · save back to KB?</H>
          <Box dashed seed={1} accent style={{ padding: 8, background: `${PURPLE}06` }}>
            <H size={12} weight={700}>"60-day new-user CC pilot"</H>
            <H size={11} color={MUTED}>Pattern used twice this month. Auto-tag: Braze · Pilot · Loyalty-adjacent</H>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Btn small ghost seed={1}>Edit</Btn>
              <Btn primary small seed={2}>Save</Btn>
              <Btn small ghost seed={3}>Skip</Btn>
            </div>
          </Box>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { HandoffFrame });
