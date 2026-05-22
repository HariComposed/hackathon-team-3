// Hi-fi App — state + routing across the Compose, Knowledge apps and modals.
// Default landing is the New project flow (no pinned conversation).

function App() {
  const [appNav, setAppNav] = React.useState('compose');
  const [activeProjectId, setActiveProjectId] = React.useState('acme-cc');
  const [projectTab, setProjectTab] = React.useState('brief');
  const [handoffMode, setHandoffMode] = React.useState('hub');
  const [model, setModel] = React.useState('Claude Sonnet 4.5');
  const [railCollapsed, setRailCollapsed] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);

  const activeProject = activeProjectId ? PROJECTS.find(p => p.id === activeProjectId) : null;

  useLucide([appNav, projectTab, handoffMode, railCollapsed, shareOpen, uploadOpen, activeProjectId]);

  const openProject = (id) => {
    setActiveProjectId(id);
    setProjectTab('brief');
  };
  const newProject = () => setActiveProjectId(null);

  return (
    <Shell app={appNav} onNavApp={setAppNav} model={model} onModel={setModel}>
      {appNav === 'compose' && (
        <>
          <ProjectsRail
            activeId={activeProjectId}
            onSelect={openProject}
            onNewProject={newProject}
            collapsed={railCollapsed}
            onToggle={() => setRailCollapsed(c => !c)}
          />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: C.bg }}>
            {!activeProject ? (
              <Setup onCreate={() => openProject('acme-cc')} />
            ) : (
              <>
                <ProjectHeader
                  project={activeProject}
                  tab={projectTab}
                  onTab={setProjectTab}
                  onShare={() => setShareOpen(true)}
                />
                {projectTab === 'workspace' && (
                  <Workspace
                    onOpenPrototype={() => setProjectTab('prototype')}
                    onOpenBrief={() => setProjectTab('brief')}
                    onOpenKnowledge={() => setAppNav('knowledge')}
                  />
                )}
                {projectTab === 'brief' && <Brief onOpenKnowledge={() => setAppNav('knowledge')} />}
                {projectTab === 'prototype' && <Handoff mode={handoffMode} onMode={setHandoffMode} />}
                {projectTab === 'share' && <ShareInline onOpenModal={() => setShareOpen(true)} />}
              </>
            )}
          </main>
        </>
      )}

      {appNav === 'knowledge' && (
        <KnowledgeApp onUpload={() => setUploadOpen(true)} />
      )}

      {appNav !== 'compose' && appNav !== 'knowledge' && (
        <ComingSoon app={appNav} />
      )}

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />

      {(appNav === 'compose' || appNav === 'knowledge') && !uploadOpen && !shareOpen && (
        <FloatingFab onClick={() => setUploadOpen(true)} />
      )}
    </Shell>
  );
}

function KnowledgeApp({ onUpload }) {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }} onClick={(e) => {
      const tgt = e.target.closest && e.target.closest('button');
      if (tgt && /upload|paste link|new page|^add$/i.test(tgt.textContent || '')) {
        e.preventDefault(); e.stopPropagation();
        onUpload();
      }
    }}>
      <Knowledge />
    </div>
  );
}

function FloatingFab({ onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 30,
        height: 48, padding: '0 18px', borderRadius: 9999, border: 0,
        background: GRAD_BRAND, color: '#fff',
        fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
        boxShadow: hover ? '0 16px 32px rgba(108,92,231,.35)' : '0 8px 24px rgba(108,92,231,.20)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer', transition: 'all .15s cubic-bezier(.2,.8,.2,1)',
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}
    >
      <Icon name="upload-cloud" size={16} />
      Add to knowledge
    </button>
  );
}

function ComingSoon({ app }) {
  const labels = {
    workflows: 'Workflows', audiences: 'Audiences', models: 'Models', settings: 'Settings',
  };
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 64, background: C.bg }}>
      <div style={{ maxWidth: 460, textAlign: 'center' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, margin: '0 auto 16px',
          background: 'rgba(108,92,231,.10)', color: C.purple,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="construction" size={28} />
        </div>
        <Eyebrow>{labels[app] || app}</Eyebrow>
        <h2 style={{ margin: '8px 0 6px', fontSize: 24, fontWeight: 600, color: C.fg }}>
          Already in Composed OS
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
          {labels[app]} lives in the main Composed OS app — this prototype focuses on Compose and Knowledge.
        </p>
      </div>
    </div>
  );
}

function ShareInline({ onOpenModal }) {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
      <div style={{ flex: 1, padding: '24px 32px 96px', overflowY: 'auto' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <Eyebrow>Project · Share</Eyebrow>
              <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 600, color: C.fg, letterSpacing: '-0.01em' }}>
                Activity &amp; collaborators
              </h1>
              <p style={{ margin: 0, fontSize: 14, color: C.muted }}>
                Everything that's happened on this project — brief edits, comments, knowledge actions, Claude proposals.
              </p>
            </div>
            <Btn variant="primary" icon="user-plus" onClick={onOpenModal}>Invite people</Btn>
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
            <Chip selected>All</Chip>
            <Chip>Brief edits</Chip>
            <Chip>Comments</Chip>
            <Chip>Knowledge</Chip>
            <Chip>Claude</Chip>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ActivityCard who="Claude" what="scaffolded a render-test prototype with variants A &amp; B" when="just now" tone="brand" big />
            <ActivityCard who="Sarah K." what="mentioned @Mira J. — what segment should we pilot to first?" when="4m" mention />
            <ActivityCard who="Mira J." what={'replied: "New users, 60d. Activation goal ≥ 8%."'} when="3m" />
            <ActivityCard who="Claude" what="cited Bloom — phased CC pilot in Approach" when="2m" tone="brand" />
            <ActivityCard who="Jonah D." what="commented on Risks — iOS metric gap matters for our cohort" when="12m" />
            <ActivityCard who="Claude" what={'suggested saving "60-day new-user CC pilot" as a pattern in Knowledge'} when="14m" tone="brand" big approve />
            <ActivityCard who="Sarah K." what="invited Priya R. as Commenter" when="1h" />
            <ActivityCard who="Claude" what="auto-drafted brief v1 from setup" when="1h" tone="brand" />
          </div>
        </div>
      </div>

      <aside style={{ width: 280, padding: '24px 16px', borderLeft: `1px solid ${C.border}`, background: '#FFFFFF', overflowY: 'auto' }}>
        <Eyebrow>On this project</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {[['Sarah K.', 'Owner'], ['Mira J.', 'Editor'], ['Jonah D.', 'Editor'], ['Priya R.', 'Commenter']].map(([n, r]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name={n} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.fg }}>{n}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{r}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function ActivityCard({ who, what, when, tone, big, mention, approve }) {
  return (
    <div style={{
      padding: 14, borderRadius: 12,
      background: big ? 'rgba(108,92,231,.04)' : '#FFFFFF',
      border: `1px solid ${big ? 'rgba(108,92,231,.20)' : C.border}`,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      {tone === 'brand' ? (
        <span style={{
          width: 32, height: 32, borderRadius: 9999, flexShrink: 0,
          background: GRAD_BRAND, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="sparkles" size={15} />
        </span>
      ) : <Avatar name={who} size={32} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: tone === 'brand' ? C.purple : C.fg }}>{who}</span>
          <span style={{ fontSize: 11, color: C.muted }}>· {when}</span>
        </div>
        <div style={{ fontSize: 13, color: C.body, marginTop: 4, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: what }} />
        {(mention || approve) && (
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            <Btn variant="ghost" size="sm">Reply</Btn>
            <Btn variant="ghost" size="sm">Resolve</Btn>
            {approve && <Btn variant="primary" size="sm" icon="check">Approve &amp; save</Btn>}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
