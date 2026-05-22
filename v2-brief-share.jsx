// v2 — Brief dynamism (Claude inline actions, diff view) + Sharing & teams.

// ─── Brief inline actions ──────────────────────────────────────
// Body of "Brief tab, with text selected → Claude actions popup".
function V2BriefActionsBody() {
  return (
    <div style={{ flex: 1, padding: '20px 36px', overflow: 'hidden', background: '#fafafa', display: 'flex', gap: 18, position: 'relative' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Hand size={24}>Brief · Approach</Hand>
        <H size={11} color={MUTED}>Select any text → Claude actions appear inline. Or @-mention Claude anywhere.</H>

        <Box seed={2} style={{ padding: 14, position: 'relative' }}>
          <H size={15}>1. Validate render in a dev segment.<br/>
            2. Roll out to 5% of new users with two CC variants
            <span style={{ background: HILITE, padding: '0 2px', position: 'relative' }}>
              {' (offer-led vs. category-led).'}
              <span style={{ position: 'absolute', right: -2, top: 0, bottom: 0, width: 2, background: PURPLE }} />
            </span>
            <br/>
            3. Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%<br/>
            4. Schedule IP warming only if combined volume crosses threshold.</H>

          <div style={{
            position: 'absolute', top: 64, right: 40,
            width: 240, background: '#fff',
            border: `1.8px solid ${PURPLE}`,
            borderRadius: roughRadius(7),
            padding: 10, boxShadow: '2px 4px 0 rgba(0,0,0,0.12)',
            transform: 'rotate(-0.3deg)',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <H size={11} color={PURPLE}>✨ CLAUDE · for this selection</H>
            {[
              ['↺  Rewrite', 'shorter · clearer · more technical'],
              ['＋ Expand', 'add detail from KB'],
              ['🔗 Add citation', 'pull from referenced docs'],
              ['? Ask Claude', 'why this approach?'],
              ['💬 Comment', 'thread on this section'],
              ['🪄 Turn into…', 'list · table · diagram'],
            ].map(([label, sub], i) => (
              <div key={label} style={{ padding: 4, display: 'flex', flexDirection: 'column', borderBottom: i < 5 ? `1px dashed ${INK}` : 'none' }}>
                <H size={12} weight={700}>{label}</H>
                <H size={10} color={MUTED}>{sub}</H>
              </div>
            ))}
          </div>
        </Box>

        <Note rotate={-2}>
          @Claude works in any section.<br/>
          <span style={{ fontSize: 14 }}>Try "@Claude tighten this to 3 bullets"</span>
        </Note>

        <Box seed={3} style={{ padding: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#ffd6e8', border: `1.2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 11, fontWeight: 700 }}>M</span>
            <H size={12} weight={700}>Mira J.</H>
            <H size={10} color={MUTED}>12m · on "5% of new users"</H>
          </div>
          <H size={12} style={{ marginTop: 4 }}>Is 5% enough to get statsig on +8% activation? Should we model power?</H>
          <div style={{ marginTop: 6, paddingLeft: 26, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: PURPLE, color: '#fff', border: `1.2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 9, fontWeight: 700 }}>C</span>
              <H size={11} weight={700}>Claude</H>
              <H size={10} color={MUTED}>10m</H>
            </div>
            <H size={11} style={{ paddingLeft: 22 }}>At Acme's MAU, 5% × 60d gives ~95% power for an 8% lift. Math in <span style={{ color: PURPLE }}>[Power calcs]</span>.</H>
          </div>
        </Box>
      </div>

      <div style={{ width: 240 }}>
        <Hand size={18}>@-mention preview</Hand>
        <Box seed={2} style={{ padding: 10, marginTop: 6 }}>
          <H size={11} color={MUTED}>In Approach section</H>
          <Box dashed seed={1} style={{ padding: 6, marginTop: 4 }}>
            <H size={12}><span style={{ color: PURPLE }}>@Claude</span> add what could go wrong</H>
          </Box>
          <H size={11} color={MUTED} style={{ marginTop: 6 }}>↳ inserts a Risks subsection drawing on:</H>
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Chip seed={1}>Bloom · post-mortem</Chip>
            <Chip seed={2}>Braze · known issues</Chip>
            <Chip seed={3}>Acme · iOS metric gap</Chip>
          </div>
        </Box>

        <Hand size={18} style={{ marginTop: 14, display: 'block' }}>Other commands</Hand>
        <Box seed={3} style={{ padding: 10, marginTop: 6 }}>
          <H size={12}>· @Claude tighten to 3 bullets</H>
          <H size={12}>· @Claude compare with Bloom</H>
          <H size={12}>· @Claude what are we missing?</H>
          <H size={12}>· @Claude turn into a slide</H>
          <H size={12}>· @Claude open as prototype</H>
        </Box>
      </div>
    </div>
  );
}

// ─── Brief diff view ──────────────────────────────────────────
function V2BriefDiffBody() {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <div style={{ width: 200, padding: '14px 12px', borderRight: `1.4px dashed ${INK}`, background: '#fff' }}>
        <H size={11} color={MUTED}>VERSIONS</H>
        {[
          ['v3 · current', '2m ago', 'Claude + Sarah', true],
          ['v2', '1h ago', 'Sarah K.', false],
          ['v1 · auto-draft', '1h ago', 'Claude · setup', false],
        ].map(([n, t, who, sel], i) => (
          <Box key={i} seed={i + 1} accent={sel} style={{ padding: 6, marginTop: 4, background: sel ? `${PURPLE}10` : '#fff' }}>
            <H size={12} weight={sel ? 700 : 400}>{n}</H>
            <H size={10} color={MUTED}>{t} · {who}</H>
          </Box>
        ))}
        <H size={11} color={MUTED} style={{ marginTop: 12 }}>COMPARING</H>
        <Box seed={4} style={{ padding: 6 }}>
          <H size={11} color={MUTED}>from</H>
          <H size={12} weight={700}>v2</H>
          <H size={11} color={MUTED}>→ to</H>
          <H size={12} weight={700} color={PURPLE}>v3</H>
        </Box>
        <H size={11} color={MUTED} style={{ marginTop: 10 }}>CHANGES</H>
        <H size={11}>3 sections edited</H>
        <H size={11}>1 reference added</H>
        <H size={11}>1 question resolved</H>
      </div>

      <div style={{ flex: 1, padding: '20px 30px', background: '#fafafa', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Hand size={26}>Compare v2 → v3</Hand>
          <Chip selected seed={1}>by Claude</Chip>
          <div style={{ flex: 1 }} />
          <Btn small ghost seed={1}>Revert v3</Btn>
          <Btn primary small seed={2}>Approve all</Btn>
        </div>

        <div>
          <H size={11} color={MUTED}>GOAL · added</H>
          <Box seed={2} style={{ padding: 8, background: '#dff2c8', borderColor: '#5a8a3a' }}>
            <H size={13}>+ Lift activation by ≥ <strong>8%</strong> for new users vs. control cohort.</H>
          </Box>
        </div>

        <div>
          <H size={11} color={MUTED}>APPROACH · edited</H>
          <Box seed={3} style={{ padding: 8, background: '#ffd6d6', borderColor: '#a04040' }}>
            <H size={13} style={{ textDecoration: 'line-through', color: '#a04040' }}>– Roll out to 10% of new users with one CC variant.</H>
          </Box>
          <Box seed={4} style={{ padding: 8, background: '#dff2c8', borderColor: '#5a8a3a', marginTop: 4 }}>
            <H size={13}>+ Roll out to <strong>5%</strong> of new users with <strong>two CC variants</strong> (offer-led vs. category-led).</H>
            <H size={11} color={MUTED} style={{ marginTop: 4 }}>↻ Claude · informed by Bloom — phased CC pilot [4]</H>
          </Box>
        </div>

        <div>
          <H size={11} color={MUTED}>REFERENCES · added</H>
          <Box seed={5} style={{ padding: 8, background: '#dff2c8', borderColor: '#5a8a3a' }}>
            <H size={13}>+ [4] Bloom — phased CC pilot</H>
          </Box>
        </div>

        <div>
          <H size={11} color={MUTED}>OPEN QUESTIONS · resolved</H>
          <Box seed={6} style={{ padding: 8, background: '#ffd6d6', borderColor: '#a04040' }}>
            <H size={13} style={{ textDecoration: 'line-through', color: '#a04040' }}>– "What's the segment we're targeting?"</H>
            <H size={11} color={MUTED} style={{ marginTop: 4 }}>Resolved → "New users, 60-day window" (Sarah K.)</H>
          </Box>
        </div>
      </div>
    </div>
  );
}

// ─── Share modal ──────────────────────────────────────────────
function V2ShareModalBody() {
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, padding: 30, opacity: 0.35, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Hand size={22}>(Workspace behind, dimmed)</Hand>
      </div>

      <Box seed={1} style={{ width: 540, padding: 22, background: '#fff', boxShadow: '4px 8px 0 rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Hand size={26}>Share · Acme · Braze CC</Hand>
            <H size={12} color={MUTED}>This shares the brief, chat history, KB pins and prototype tab.</H>
          </div>
          <H size={20} color={MUTED}>×</H>
        </div>

        <Box dashed seed={2} style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12 }}>📧</span>
          <H size={13} color={MUTED}>Add by email or @handle…</H>
          <div style={{ flex: 1 }} />
          <Box seed={3} style={{ padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <H size={11}>Editor</H>
            <span style={{ fontSize: 10, color: MUTED }}>▼</span>
          </Box>
          <Btn small primary seed={4}>Invite</Btn>
        </Box>

        <H size={11} color={MUTED}>PEOPLE</H>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['Sarah K.', 'sarah@composed', 'Owner', '#ddd'],
            ['Mira J.', 'mira@composed', 'Editor', '#ffd6e8'],
            ['Jonah D.', 'jonah@composed', 'Editor', '#dff2c8'],
            ['Priya R.', 'priya@composed', 'Commenter', '#c8e0ff'],
            ['Acme · brand-team', '4 people · external', 'Viewer', '#fef4a8'],
          ].map(([name, email, role, c], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: c, border: `1.4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 13 }}>{name[0]}</span>
              <div style={{ flex: 1 }}>
                <H size={13} weight={700}>{name}</H>
                <H size={10} color={MUTED}>{email}</H>
              </div>
              <Box seed={i + 1} style={{ padding: '2px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <H size={11}>{role}</H>
                <span style={{ fontSize: 9, color: MUTED }}>▼</span>
              </Box>
            </div>
          ))}
        </div>

        <H size={11} color={MUTED} style={{ marginTop: 4 }}>SCOPE · what gets shared</H>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip selected seed={1}>✓ Brief</Chip>
          <Chip selected seed={2}>✓ Chat history</Chip>
          <Chip selected seed={3}>✓ KB pins</Chip>
          <Chip seed={4}>✗ Prototype code</Chip>
          <Chip seed={5}>✗ Client docs</Chip>
        </div>

        <H size={11} color={MUTED} style={{ marginTop: 4 }}>LINK · anyone with link</H>
        <Box dashed seed={3} style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <H size={11} color={MUTED}>composed.app/p/acme-braze-cc?v=read</H>
          <div style={{ flex: 1 }} />
          <Chip seed={1}>Read only</Chip>
          <Btn small seed={2}>Copy</Btn>
        </Box>

        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <Btn ghost seed={1}>Cancel</Btn>
          <Btn primary seed={2}>Done</Btn>
        </div>
      </Box>
    </div>
  );
}

// ─── Activity / collaboration ─────────────────────────────────
function V2ActivityBody() {
  return (
    <div style={{ flex: 1, padding: '18px 26px', overflow: 'hidden', display: 'flex', gap: 18 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Hand size={26}>Project activity</Hand>
        <H size={12} color={MUTED}>Like Linear · scoped to this project · @-mentions notify in Slack.</H>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip selected seed={1}>All</Chip>
          <Chip seed={2}>Comments</Chip>
          <Chip seed={3}>Brief edits</Chip>
          <Chip seed={4}>KB pins</Chip>
          <Chip seed={5}>Prototype</Chip>
          <Chip seed={6}>Claude only</Chip>
        </div>

        {[
          ['Claude', '↗ scaffolded a render-test prototype · variants A/B', 'just now', PURPLE, true, false],
          ['Sarah K.', '@Mira J. — what segment should we pilot to first?', '4m', null, false, true],
          ['Mira J.', 'replied: "New users, 60d. Activation goal ≥ 8%."', '3m', null, false, false],
          ['Claude', 'cited Bloom — phased CC pilot in Approach', '2m', PURPLE, false, false],
          ['Jonah D.', '💬 commented on Risks · "iOS metric gap matters for our cohort"', '12m', null, false, false],
          ['Claude', '✨ suggested saving "60-day new-user pilot" to KB', '14m', PURPLE, false, true],
          ['Sarah K.', 'invited Priya R. as Commenter', '1h', null, false, false],
          ['Claude', 'auto-drafted brief v1 from setup', '1h', PURPLE, false, false],
        ].map(([who, what, when, color, big, action], i) => (
          <Box key={i} seed={i + 1} accent={big} style={{ padding: 10, background: big ? `${PURPLE}06` : '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: color || '#ddd', color: color ? '#fff' : INK, border: `1.2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 13 }}>{who[0]}</span>
              <H size={13} weight={700} color={color || INK}>{who}</H>
              <H size={11} color={MUTED} style={{ marginLeft: 'auto' }}>{when}</H>
            </div>
            <H size={13} style={{ marginTop: 4 }}>{what}</H>
            {action && (
              <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                <Btn small ghost seed={1}>Reply</Btn>
                <Btn small ghost seed={2}>Resolve</Btn>
                {who === 'Claude' && <Btn small primary seed={3}>Approve & save</Btn>}
              </div>
            )}
          </Box>
        ))}
      </div>

      <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <H size={11} color={MUTED}>👥 ON THIS PROJECT</H>
        <Box seed={1} style={{ padding: 8 }}>
          {[['Sarah K.', 'Owner', '#ddd'], ['Mira J.', 'Editor', '#ffd6e8'], ['Jonah D.', 'Editor', '#dff2c8'], ['Priya R.', 'Commenter', '#c8e0ff']].map(([n, r, c]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: c, border: `1.2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Caveat, cursive', fontSize: 10, fontWeight: 700 }}>{n[0]}</span>
              <H size={12}>{n}</H>
              <H size={10} color={MUTED} style={{ marginLeft: 'auto' }}>{r}</H>
            </div>
          ))}
        </Box>

        <H size={11} color={MUTED}>🔗 RELATED PROJECTS</H>
        <Box seed={2} style={{ padding: 8 }}>
          <H size={12}>Bloom · loyalty POC</H>
          <H size={10} color={MUTED}>shared 2 refs</H>
        </Box>

        <H size={11} color={MUTED}>📣 NOTIFICATIONS</H>
        <Chip selected seed={1}>Slack #acme-cc</Chip>
        <Chip seed={2}>Email digest · daily</Chip>
      </div>
    </div>
  );
}

// Shell-wrapped exports
function V2BriefActionsView() { return <V2Shell activeTab="Brief" kbCollapsed={true}><V2BriefActionsBody /></V2Shell>; }
function V2BriefDiff() { return <V2Shell activeTab="Brief" kbCollapsed={true}><V2BriefDiffBody /></V2Shell>; }
function V2ShareModal() { return <V2Shell activeTab="Workspace" kbCollapsed={true}><V2ShareModalBody /></V2Shell>; }
function V2Activity() { return <V2Shell activeTab="Share" kbCollapsed={true}><V2ActivityBody /></V2Shell>; }

Object.assign(window, { V2BriefActionsView, V2BriefDiff, V2ShareModal, V2Activity });
