// v2 app — assembles the combined direction + explorations on a DesignCanvas.

function V2Intro() {
  return (
    <div style={{ maxWidth: 940, padding: '24px 20px 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Hand size={52} color={PURPLE}>Combined direction · v2</Hand>
      <Hand size={26}>Project workspace + co-authored brief + dynamic handoff</Hand>
      <H size={15} color={MUTED} style={{ maxWidth: 760 }}>
        Built around your three favourites (D5 + D4 + D1). The project view is the host shell;
        the brief co-authors with you on the right; the KB drawer is always one click away and
        the full Knowledge tab handles the long tail (we explore 3 ways).
        The handoff at the end is now <HL>dynamic</HL> — same context, different output.
      </H>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
        <Note rotate={-2} style={{ maxWidth: 240 }}>
          <strong>Read top to bottom →</strong><br/>
          <span style={{ fontSize: 14 }}>① flow · ② KB · ③ brief · ④ sharing · ⑤ handoff</span>
        </Note>
        <Note rotate={2} color="#dff2c8" style={{ maxWidth: 240 }}>
          <strong>Same chrome everywhere</strong><br/>
          <span style={{ fontSize: 14 }}>Projects rail · tabs · KB drawer · top bar.<br/>
          Tabs evolve as the team grows (Activity, Share).</span>
        </Note>
        <Note rotate={-1} color="#ffd6e8" style={{ maxWidth: 240 }}>
          <strong>Built to grow</strong><br/>
          <span style={{ fontSize: 14 }}>"+ Klaviyo · Segment · …" and "+ Add doc" appear in every relevant frame.</span>
        </Note>
      </div>
    </div>
  );
}

function V2App() {
  return (
    <DesignCanvas>
      <DCSection id="v2-intro" title="Combined direction · v2" subtitle="Building on what you liked from options 1, 4 and 5">
        <DCArtboard id="v2-intro-card" label="overview" width={960} height={300}>
          <V2Intro />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-flow" title="① The flow · Setup → Workspace → Brief" subtitle="The brief is the artefact that builds as you talk. Same shell on every tab.">
        <DCArtboard id="v2-setup" label="A · Setup tab — brief drafts as you choose" width={1320} height={740}>
          <V2Combined tab="Setup" />
        </DCArtboard>
        <DCArtboard id="v2-workspace" label="B · Workspace — chat ⟷ brief, both live · Claude edits brief from chat" width={1320} height={740}>
          <V2Combined tab="Workspace" />
        </DCArtboard>
        <DCArtboard id="v2-brief-full" label="C · Brief tab — full doc · versions · activity · select-to-act" width={1320} height={740}>
          <V2Combined tab="Brief" />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-kb" title="② Knowledge — designing for hundreds of docs" subtitle="Three takes. We'd ship A (faceted) as the default and add B's smart collections on the home view.">
        <DCArtboard id="v2-kb-facet" label="A · Faceted browser · scales by client × platform × type × recency" width={1320} height={740}>
          <V2Knowledge mode="faceted" />
        </DCArtboard>
        <DCArtboard id="v2-kb-coll" label="B · Smart collections · 'in play' surfaces what's relevant to your open projects" width={1320} height={740}>
          <V2Knowledge mode="collections" />
        </DCArtboard>
        <DCArtboard id="v2-kb-spot" label="C · Search-first · semantic + tags · Claude summarises results" width={1320} height={740}>
          <V2Knowledge mode="spotlight" />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-brief-dyn" title="③ How the brief stays dynamic" subtitle="What Claude can do TO the brief — and what you can do back.">
        <DCArtboard id="v2-brief-actions" label="A · Select text → Claude actions popover · @-mention anywhere · inline comments" width={1320} height={740}>
          <V2BriefActionsView />
        </DCArtboard>
        <DCArtboard id="v2-brief-diff" label="B · Version diff · approve / revert Claude edits one change at a time" width={1320} height={740}>
          <V2BriefDiff />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-share" title="④ Sharing with internal teams" subtitle="Composed is a consultancy — projects are team artefacts, not solo chats.">
        <DCArtboard id="v2-share-modal" label="A · Share modal · roles · link · scope (what gets shared, what doesn't)" width={1320} height={740}>
          <V2ShareModal />
        </DCArtboard>
        <DCArtboard id="v2-activity" label="B · Activity tab · Claude actions inline · @-mentions to Slack · approve KB suggestions" width={1320} height={740}>
          <V2Activity />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-handoff" title="⑤ Dynamic handoff" subtitle="Same brief + KB, different outputs. Picked from inside the chat, expanded in the Prototype tab.">
        <DCArtboard id="v2-hand-sugg" label="A · How modes surface · Claude offers them in chat at the right moment" width={1320} height={740}>
          <V2HandoffSuggestedView />
        </DCArtboard>
        <DCArtboard id="v2-hand-hub" label="B · Handoff hub · pick a mode (Claude recommends based on intent)" width={1320} height={740}>
          <V2HandoffHubView />
        </DCArtboard>
        <DCArtboard id="v2-hand-doc" label="C · Mode: Document · client memo / ADR / playbook" width={1320} height={740}>
          <V2HandoffDocView />
        </DCArtboard>
        <DCArtboard id="v2-hand-design" label="D · Mode: Claude Design · visual variants, editable per-element" width={1320} height={740}>
          <V2HandoffDesignView />
        </DCArtboard>
        <DCArtboard id="v2-hand-code" label="E · Mode: Claude Code · perfect prompt + open in Claude Code (or hand to a teammate)" width={1320} height={740}>
          <V2HandoffCodeView />
        </DCArtboard>
      </DCSection>

      <DCSection id="v2-back" title="Reference · v1 directions" subtitle="The original five — kept for comparison.">
        <DCArtboard id="v1-link" label="open Composed Claude wireframes.html for v1" width={520} height={140}>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Hand size={22}>v1 lives in:</Hand>
            <H size={14}>Composed Claude wireframes.html</H>
            <H size={12} color={MUTED}>5 directions side-by-side — D1 Lab notebook · D2 Spotlight · D3 Workflow board · D4 Co-authored brief · D5 Projects + tabs.</H>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<V2App />);
