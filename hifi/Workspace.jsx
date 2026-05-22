// Hi-fi: Workspace — chat on the left, live brief on the right.
// The heart of the app.

function Workspace({ onOpenPrototype, onOpenBrief, onOpenKnowledge }) {
  useLucide([]);
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, background: C.bg }}>
      <ChatPane onOpenPrototype={onOpenPrototype} onOpenKnowledge={onOpenKnowledge} />
    </div>
  );
}

function ChatPane({ onOpenPrototype, onOpenKnowledge }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: '#FFFFFF' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
        <ChatScroll>
          <SystemMsg>
            Brief auto-drafted from your setup · 4 references pinned · 3 open questions
          </SystemMsg>
          <ClaudeMsg>
            <p style={{ margin: 0 }}>I've sketched the brief from your setup. Two things sharpen the approach before we go deeper:</p>
            <ol style={{ margin: '12px 0 0', paddingLeft: 18 }}>
              <li>What segment are we piloting to first — all new users, or a sub-cohort?</li>
              <li>What's the activation metric we're moving — first-purchase, account-complete, something else?</li>
            </ol>
            <Sources onOpenKnowledge={onOpenKnowledge} items={[
              ['Acme — Braze setup', 'Client doc', 'building-2'],
              ['Braze · Content Cards', 'Platform doc', 'plug'],
            ]} />
          </ClaudeMsg>
          <UserMsg>
            New users only, first 60 days. Goal is to lift activation (first purchase within 7 days) by 8%. Two creative variants — one offer-led, one category-led.
          </UserMsg>
          <ClaudeMsg edits>
            <p style={{ margin: 0 }}>
              Got it — added to the brief. Bloom Co ran a near-identical pilot last year with <Mark>+11% activation in six weeks</Mark>. I've cited it under Approach and outlined a phased rollout:
            </p>
            <ul style={{ margin: '12px 0 0', paddingLeft: 18 }}>
              <li>Render-test in a dev segment</li>
              <li>5% rollout to new users with two CC variants</li>
              <li>Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%</li>
            </ul>
            <Sources onOpenKnowledge={onOpenKnowledge} items={[
              ['Bloom — phased CC pilot', 'Client doc', 'building-2'],
              ['Lifecycle messaging', 'Best practice', 'book-open'],
            ]} />
            <EditPills />
          </ClaudeMsg>
          <UserMsg>
            Sounds right. Is 5% enough to hit statistical significance on +8%?
          </UserMsg>
          <ClaudeMsg>
            <p style={{ margin: 0 }}>
              At Acme's MAU (~140k monthly new users), 5% × 60 days gives ≈ 95% power to detect an 8% lift at α = 0.05. If you want more headroom, 10% gets you 99% power and shortens the read to 35 days.
            </p>
            <Sources onOpenKnowledge={onOpenKnowledge} items={[
              ['A/B for in-app messages', 'Skill · power calcs', 'sparkles'],
            ]} />
            <Suggestion icon="wand-sparkles" title="Ready to build the prototype?" body="I can scaffold a Next.js + Braze sandbox with both variants, a control page and an analytics reader." onAction={onOpenPrototype} />
          </ClaudeMsg>
        </ChatScroll>
      </div>

      <ChatComposer onOpenPrototype={onOpenPrototype} />
    </div>
  );
}

// Inline "Sources" footer under a Claude message — cites KB docs.
function Sources({ items, onOpenKnowledge }) {
  return (
    <div style={{
      marginTop: 12, padding: '10px 12px',
      background: C.bg, borderRadius: 10,
      border: `1px solid ${C.rule}`,
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: '.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Icon name="library" size={11} color={C.purple} />
        From your knowledge base
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {items.map(([title, kind, ic]) => (
          <a key={title} href="#"
            onClick={(e) => { e.preventDefault(); onOpenKnowledge && onOpenKnowledge(); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 9px 4px 6px', borderRadius: 9999,
              background: '#FFFFFF', border: `1px solid ${C.border}`,
              textDecoration: 'none', cursor: 'pointer',
            }}>
            <span style={{ width: 18, height: 18, borderRadius: 5, background: 'rgba(108,92,231,.10)', color: C.purple, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={ic} size={10} />
            </span>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.fg }}>{title}</span>
            <span style={{ fontSize: 10, color: C.muted }}>{kind}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ChatScroll({ children }) {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {children}
    </div>
  );
}

function SystemMsg({ children }) {
  return (
    <div style={{
      alignSelf: 'center', maxWidth: 540,
      padding: '8px 14px', background: C.bgSoft, color: C.muted,
      fontSize: 12, borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>
      <Icon name="info" size={12} />
      {children}
    </div>
  );
}

function ClaudeMsg({ children, edits }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span style={{
        width: 30, height: 30, borderRadius: 9999, flexShrink: 0,
        background: GRAD_BRAND, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="sparkles" size={15} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>Claude</span>
          <span style={{ fontSize: 11, color: C.muted }}>Sonnet 4.5</span>
          {edits && <Badge tone="brand" size="sm" icon="pencil">Edited brief</Badge>}
        </div>
        <div style={{ fontSize: 14, color: C.body, lineHeight: 1.65 }}>{children}</div>
      </div>
    </div>
  );
}

function UserMsg({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: C.muted }}>Sarah K. · just now</span>
          <Avatar name="Sarah K." size={20} bg={GRAD_LOGO} />
        </div>
        <div style={{
          background: GRAD_BRAND, color: '#fff',
          padding: '12px 16px', borderRadius: 16, borderBottomRightRadius: 4,
          fontSize: 14, lineHeight: 1.55,
        }}>{children}</div>
      </div>
    </div>
  );
}

function ReferenceLink({ n }) {
  return (
    <sup style={{
      fontFamily: 'JetBrains Mono, monospace',
      color: C.purple, fontSize: 11, fontWeight: 600,
      padding: '1px 5px', background: 'rgba(108,92,231,.10)',
      borderRadius: 4, cursor: 'pointer',
    }}>[{n}]</sup>
  );
}

function EditPills() {
  return (
    <div style={{ marginTop: 12 }}>
      <Btn variant="ghost" size="sm" icon="more-horizontal">Review edits</Btn>
    </div>
  );
}

function Suggestion({ icon, title, body, onAction }) {
  return (
    <div style={{
      marginTop: 14, padding: 14,
      background: 'linear-gradient(135deg, rgba(124,58,237,.06), rgba(79,70,229,.04))',
      border: '1px solid rgba(108,92,231,.30)', borderRadius: 12,
      display: 'flex', alignItems: 'flex-start', gap: 12,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, flexShrink: 0,
        background: GRAD_BRAND, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{title}</div>
        <div style={{ fontSize: 12, color: C.body, marginTop: 4, lineHeight: 1.55 }}>{body}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <Btn variant="primary" size="sm" icon="arrow-right" onClick={onAction}>Open prototype</Btn>
          <Btn variant="ghost" size="sm">Not yet</Btn>
        </div>
      </div>
    </div>
  );
}

function ChatComposer({ onOpenPrototype }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.rule}`, background: '#FFFFFF' }}>
      <div style={{
        maxWidth: 760, margin: '0 auto', padding: 12,
        border: `1px solid ${focus ? C.purple : C.border}`, borderRadius: 16,
        background: '#FFFFFF', boxShadow: focus ? SH_LG : SH_SM,
        transition: 'border-color .15s, box-shadow .15s',
      }}>
        <div
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          contentEditable suppressContentEditableWarning
          style={{
            fontSize: 14, color: C.body, lineHeight: 1.55, minHeight: 40,
            outline: 'none', padding: '4px 4px',
          }}
        >
          Reply, or ask Claude to do something with the brief…
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <IconBtn icon="plus" label="Add: attach, mention, slash command" />
          <div style={{ flex: 1 }} />
          <Btn variant="primary" size="sm" iconRight="corner-down-left">Send</Btn>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '8px auto 0', display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        <SuggestionChip>Compare with Bloom's pilot</SuggestionChip>
        <SuggestionChip>What are the risks?</SuggestionChip>
        <SuggestionChip>Draft a client memo</SuggestionChip>
        <SuggestionChip>Show me CC variant mocks</SuggestionChip>
      </div>
    </div>
  );
}

function SuggestionChip({ children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height: 26, padding: '0 10px', borderRadius: 9999,
        border: `1px solid ${C.border}`, background: hover ? C.bgSoft : '#FFFFFF',
        fontSize: 12, color: C.body, cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      <Icon name="sparkles" size={11} color={C.purple} />
      {children}
    </button>
  );
}

// ─── Live brief pane (right side) ─────────────────────────────
function BriefLivePane({ onOpenBrief }) {
  return (
    <aside style={{ width: 440, background: '#FFFFFF', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <header style={{ padding: '14px 20px', borderBottom: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="file-text" size={16} color={C.purple} />
        <div style={{ fontSize: 14, fontWeight: 600, color: C.fg }}>Live brief</div>
        <Badge tone="soft" size="sm">v3</Badge>
        <div style={{ flex: 1 }} />
        <IconBtn icon="arrow-up-right" label="Open full brief" onClick={onOpenBrief} />
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
        <BriefSection label="Context">
          <p style={{ margin: 0, fontSize: 13, color: C.body, lineHeight: 1.65 }}>
            Acme Co uses Braze for email today <RefSup n="1" />. We're adding <Mark>Content Cards</Mark> for in-app discovery — <strong>new users only</strong>, 60-day pilot — without disturbing the existing canvas program.
          </p>
        </BriefSection>

        <BriefSection label="Goal · added 4m ago">
          <div style={{
            padding: 10, background: 'rgba(108,92,231,.06)',
            border: `1px solid rgba(108,92,231,.20)`, borderRadius: 8,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <Icon name="target" size={14} color={C.purple} style={{ marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: 13, color: C.body, lineHeight: 1.6 }}>
              Lift activation (first purchase &lt; 7d) by <strong>≥ 8%</strong> for new users vs. control cohort.
            </p>
          </div>
        </BriefSection>

        <BriefSection label="Approach · Claude editing">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: C.body, lineHeight: 1.6 }}>
            <ApproachItem n="1">Validate render in a dev segment <RefSup n="2" /></ApproachItem>
            <ApproachItem n="2">Roll out to <Mark>5% of new users</Mark> with two CC variants (offer-led vs. category-led)</ApproachItem>
            <ApproachItem n="3">Expand by cohort if CTR &gt; 4% and activation delta ≥ +3%</ApproachItem>
            <ApproachItem n="4">Schedule IP warming only if combined volume crosses threshold <RefSup n="3" /></ApproachItem>
          </div>
        </BriefSection>

        <BriefSection label="Risks">
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: C.body, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li>CC analytics gap on iOS &lt; 14.5 — cohort-segment to monitor</li>
            <li>Audience overlap with existing canvases — frequency cap at user level</li>
          </ul>
        </BriefSection>

        <BriefSection label="References · pinned (4)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Acme — Braze setup', 'Client'],
              ['Braze · Content Cards', 'Platform doc'],
              ['Braze · IP Warming', 'Platform doc'],
              ['Bloom — phased CC pilot', 'Client · just cited'],
            ].map(([t, k], i) => (
              <div key={t} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0',
                borderBottom: i < 3 ? `1px solid ${C.rule}` : 'none',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.purple, fontFamily: 'JetBrains Mono, monospace', minWidth: 22 }}>[{i + 1}]</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: C.fg, fontWeight: 500 }}>{t}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{k}</div>
                </div>
                <IconBtn icon="external-link" label="Open" size={24} />
              </div>
            ))}
          </div>
        </BriefSection>
      </div>
    </aside>
  );
}

function RefSup({ n }) {
  return (
    <sup style={{
      fontFamily: 'JetBrains Mono, monospace',
      color: C.purple, fontSize: 10, fontWeight: 600,
      padding: '1px 4px', background: 'rgba(108,92,231,.10)',
      borderRadius: 3, cursor: 'pointer', marginLeft: 2,
    }}>[{n}]</sup>
  );
}

function ApproachItem({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <span style={{
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        background: C.bgSoft, color: C.body,
        fontSize: 11, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 1,
      }}>{n}</span>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}

function ActivityItem({ who, what, when, tone }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      {tone === 'brand' ? (
        <span style={{
          width: 20, height: 20, borderRadius: 9999, flexShrink: 0,
          background: GRAD_BRAND, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="sparkles" size={11} />
        </span>
      ) : <Avatar name={who} size={20} />}
      <div style={{ flex: 1, fontSize: 12, color: C.body, lineHeight: 1.5 }}>
        <span style={{ fontWeight: 500, color: tone === 'brand' ? C.purple : C.fg }}>{who}</span>{' '}{what}
        <span style={{ color: C.muted }}>{' · '}{when}</span>
      </div>
    </div>
  );
}

window.Workspace = Workspace;
window.ActivityItem = ActivityItem;
window.RefSup = RefSup;
