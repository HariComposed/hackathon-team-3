// Main app — assembles all directions into a DesignCanvas with sections.

const { useState } = React;

function CanvasIntro() {
  return (
    <div style={{ maxWidth: 920, padding: '28px 20px 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Hand size={56} color={PURPLE}>Composed · internal Claude</Hand>
      <Hand size={28}>5 wireframe directions — pick a vibe, mix and match</Hand>
      <H size={15} color={MUTED} style={{ maxWidth: 720 }}>
        Each direction is the same product (guided platform workflows on top of Claude + our KB), framed differently.
        The flow is shown across 2–3 frames per direction so you can see the progressive expansion.
        The last section shows the <HL>handoff to a real prototype</HL> — the punchline of the demo.
      </H>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap', marginTop: 8 }}>
        <Note rotate={-2} style={{ maxWidth: 260 }}>
          <strong>How to read:</strong><br/>
          <span style={{ fontSize: 14 }}>Drag any frame · double-click a label to rename · click any frame to focus it fullscreen.</span>
        </Note>
        <Note rotate={2} color="#dff2c8" style={{ maxWidth: 260 }}>
          <strong>Shared bones:</strong><br/>
          <span style={{ fontSize: 14 }}>Composed wordmark + project switcher + global model selector in every direction's top bar.</span>
        </Note>
        <Note rotate={-1} color="#ffd6e8" style={{ maxWidth: 260 }}>
          <strong>Built to evolve:</strong><br/>
          <span style={{ fontSize: 14 }}>Every direction has obvious "+ platform" and "+ stage" affordances so adding Klaviyo / Segment / new skills isn't a redesign.</span>
        </Note>
      </div>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="intro" title="Composed · internal Claude" subtitle="5 wireframe directions for the hackathon">
        <DCArtboard id="intro-blurb" label="overview" width={960} height={300}>
          <CanvasIntro />
        </DCArtboard>
      </DCSection>

      <DCSection id="d1" title="1 · Lab notebook" subtitle="Persistent KB sidebar · single page that progressively expands · most conservative">
        <DCArtboard id="d1-s1" label="A · Empty state" width={1180} height={720}>
          <Direction1 stage={0} />
        </DCArtboard>
        <DCArtboard id="d1-s2" label="B · Platforms picked → features expand · KB highlights related docs" width={1180} height={720}>
          <Direction1 stage={2} />
        </DCArtboard>
        <DCArtboard id="d1-s3" label="C · Context drafted, ready to chat" width={1180} height={720}>
          <Direction1 stage={3} />
        </DCArtboard>
      </DCSection>

      <DCSection id="d2" title="2 · Spotlight launcher" subtitle="Chat-first, minimal chrome · KB lives in floating chips · feels like Claude.ai with a smarter input">
        <DCArtboard id="d2-s1" label="A · Spotlight welcome — pills + platforms above one big input" width={1180} height={720}>
          <Direction2 stage={0} />
        </DCArtboard>
        <DCArtboard id="d2-s2" label="B · In conversation, references docked right · KB suggests new entries to save" width={1180} height={720}>
          <Direction2 stage={1} />
        </DCArtboard>
      </DCSection>

      <DCSection id="d3" title="3 · Workflow board" subtitle="Horizontal canvas of connected stages · best at showing extensibility — '+ stage' anywhere">
        <DCArtboard id="d3-s1" label="A · The whole workflow on one board" width={1180} height={720}>
          <Direction3 />
        </DCArtboard>
      </DCSection>

      <DCSection id="d4" title="4 · Co-authored brief" subtitle="Claude writes a living brief on the right while you chat on the left · friendliest to non-technical users">
        <DCArtboard id="d4-s1" label="A · Three quick prompts · empty brief skeleton" width={1180} height={720}>
          <Direction4 stage={0} />
        </DCArtboard>
        <DCArtboard id="d4-s2" label="B · Drafting · citations appear inline as Claude fills the brief" width={1180} height={720}>
          <Direction4 stage={1} />
        </DCArtboard>
      </DCSection>

      <DCSection id="d5" title="5 · Projects + tabs" subtitle="IDE-style workspace · projects rail + tabs · best for technical users with long-running work">
        <DCArtboard id="d5-s1" label="A · New project · onboarding inline under the Setup tab" width={1180} height={720}>
          <Direction5 stage={0} />
        </DCArtboard>
        <DCArtboard id="d5-s2" label="B · Chat tab · pinned KB refs on the right" width={1180} height={720}>
          <Direction5 stage={1} />
        </DCArtboard>
      </DCSection>

      <DCSection id="handoff" title="The handoff" subtitle="Same screen in every direction — Claude transitions from chat to building. This is the demo punchline.">
        <DCArtboard id="handoff-frame" label="Claude builds the prototype · design preview + live code + KB cited + new pattern auto-saved" width={1280} height={760}>
          <HandoffFrame />
        </DCArtboard>
      </DCSection>

      <DCSection id="systems" title="Cross-cutting systems" subtitle="The bits that work the same in every direction">
        <DCArtboard id="kb-contrib" label="Knowledge base contribution loops" width={960} height={520}>
          <KbContributionFrame />
        </DCArtboard>
        <DCArtboard id="topbar" label="Global top bar · model selector · personas" width={960} height={260}>
          <TopBarFrame />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// ─────────────────────────────────────────────────────────
// Cross-cutting frames
// ─────────────────────────────────────────────────────────
function KbContributionFrame() {
  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14, background: '#fafafa' }}>
      <Hand size={28}>How docs get into the KB</Hand>
      <H size={13} color={MUTED}>Three loops — same UI affordances appear in every direction.</H>

      <div style={{ display: 'flex', gap: 14, flex: 1 }}>
        {/* Loop 1: manual upload */}
        <Box seed={1} style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Hand size={20}>1 · Manual</Hand>
          <H size={12} color={MUTED}>Drag a file anywhere, or use "+ Upload doc" in the KB rail.</H>
          <Box dashed seed={2} style={{ padding: 14, minHeight: 70, textAlign: 'center' }}>
            <H size={12} color={MUTED}>drop .md, .pdf, .docx<br/>or paste a Notion / Confluence URL</H>
          </Box>
          <H size={11} color={MUTED}>Claude proposes tags →</H>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Chip selected seed={1}>Braze</Chip>
            <Chip selected seed={2}>Email</Chip>
            <Chip seed={3}>+ Add tag</Chip>
          </div>
        </Box>

        {/* Loop 2: save from chat */}
        <Box seed={2} style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Hand size={20}>2 · From a chat</Hand>
          <H size={12} color={MUTED}>Highlight any message → "Save as KB entry".</H>
          <Box seed={3} style={{ padding: 8, background: `${HILITE}` }}>
            <H size={12}><HL>For 60-day pilots, validate render in a dev segment before IP warming.</HL></H>
          </Box>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn small seed={1}>💾 Save to KB</Btn>
            <Btn small ghost seed={2}>Pin to project</Btn>
          </div>
        </Box>

        {/* Loop 3: auto-suggest */}
        <Box seed={3} accent style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, background: `${PURPLE}06` }}>
          <Hand size={20} color={PURPLE}>3 · Claude auto-suggests</Hand>
          <H size={12} color={MUTED}>When a pattern repeats across conversations, Claude proposes a new entry.</H>
          <Note rotate={-2}>
            ✨ I've seen this 3×<br/>
            <span style={{ fontSize: 14 }}><HL>"Phased CC rollout"</HL> — save as best practice?</span>
          </Note>
          <H size={11} color={MUTED}>Lands in a reviewer queue · 1 approver per tag area.</H>
          <div style={{ display: 'flex', gap: 6 }}>
            <Btn small ghost seed={1}>Reject</Btn>
            <Btn small seed={2}>Edit & save</Btn>
            <Btn primary small seed={3}>Approve</Btn>
          </div>
        </Box>
      </div>
    </div>
  );
}

function TopBarFrame() {
  return (
    <div style={{ padding: 22, height: '100%', display: 'flex', flexDirection: 'column', gap: 12, background: '#fafafa' }}>
      <Hand size={26}>The global top bar</Hand>
      <H size={12} color={MUTED}>Project switcher · model selector · persona toggle (subtle: just swaps default prompts).</H>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <TopBar project="Acme · Braze CC" model="Claude Sonnet 4.5" extras={
            <div style={{ display: 'flex', gap: 6 }}>
              <Chip selected seed={1}>🧠 Technical</Chip>
              <Chip seed={2}>📣 Marketing</Chip>
            </div>
          } />
          <Note rotate={-4} style={{ position: 'absolute', top: 6, right: 380, padding: '2px 8px', fontSize: 14 }}>persona ↓</Note>
          <Note rotate={3} style={{ position: 'absolute', top: -10, right: 90, padding: '2px 8px', fontSize: 14 }}>swap model anytime</Note>
        </div>
        <H size={12} color={MUTED} style={{ marginTop: 6 }}>Model picker — opened</H>
        <Box seed={2} style={{ padding: 10, width: 280 }}>
          <H size={11} color={MUTED}>CHOOSE MODEL · sticky per-project</H>
          {[
            ['Sonnet 4.5', 'balanced · default', true],
            ['Opus 4.1', 'deep reasoning · slow', false],
            ['Haiku 4.5', 'fast & cheap', false],
          ].map(([n, sub, sel], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', border: `1.4px solid ${INK}`, background: sel ? PURPLE : '#fff' }} />
              <H size={13} weight={sel ? 700 : 400}>{n}</H>
              <H size={11} color={MUTED}>· {sub}</H>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
