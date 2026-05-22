// Hi-fi: Share modal — invite by email, link sharing, scope toggles.

function ShareModal({ open, onClose }) {
  useLucide([open]);
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,13,26,.42)',
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 560, background: '#FFFFFF',
        borderRadius: 20, boxShadow: '0 24px 64px rgba(0,0,0,.20)',
        fontFamily: 'Poppins, sans-serif', display: 'flex', flexDirection: 'column',
        maxHeight: 'calc(100vh - 64px)',
      }}>
        <header style={{ padding: '18px 24px', borderBottom: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(108,92,231,.10)', color: C.purple,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="share-2" size={16} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.fg }}>Share project</div>
            <div style={{ fontSize: 12, color: C.muted }}>Acme · Braze Content Cards</div>
          </div>
          <IconBtn icon="x" label="Close" onClick={onClose} />
        </header>

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18, overflowY: 'auto' }}>
          {/* Invite */}
          <div style={{
            height: 44, padding: '0 6px 0 14px',
            border: `1px solid ${C.border}`, borderRadius: 10,
            background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="at-sign" size={14} color={C.muted} />
            <input
              placeholder="Add by email or @handle…"
              style={{
                flex: 1, border: 0, outline: 'none', fontSize: 13, color: C.fg,
                fontFamily: 'Poppins, sans-serif', background: 'transparent',
              }}
            />
            <button style={{
              height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${C.border}`,
              background: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 12, color: C.body,
              display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
            }}>Editor <Icon name="chevron-down" size={11} color={C.muted} /></button>
            <Btn variant="primary" size="sm">Invite</Btn>
          </div>

          {/* People */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>People · 4</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['Sarah K.', 'sarah@composed.digital', 'Owner'],
                ['Mira J.', 'mira@composed.digital', 'Editor'],
                ['Jonah D.', 'jonah@composed.digital', 'Editor'],
                ['Priya R.', 'priya@composed.digital', 'Commenter'],
                ['Acme · brand team', '4 external members', 'Viewer'],
              ].map(([n, email, role]) => (
                <div key={n} style={{ padding: '6px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={n} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>{n}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{email}</div>
                  </div>
                  <button style={{
                    height: 28, padding: '0 8px', borderRadius: 6, border: 0,
                    background: 'transparent', fontFamily: 'Poppins, sans-serif', fontSize: 12, color: C.body,
                    display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                  }}>{role} <Icon name="chevron-down" size={11} color={C.muted} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              What gets shared
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['Brief & chat history', 'file-text', true],
                ['Knowledge references', 'library', true],
                ['Prototype code & previews', 'code-2', false],
                ['Internal client docs', 'lock', false],
              ].map(([label, icon, on]) => (
                <label key={label} style={{
                  padding: '8px 10px', borderRadius: 8,
                  background: on ? 'rgba(108,92,231,.04)' : C.bg,
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                }}>
                  <Icon name={icon} size={14} color={on ? C.purple : C.muted} />
                  <span style={{ flex: 1, fontSize: 13, color: C.fg, fontWeight: 500 }}>{label}</span>
                  <span style={{
                    width: 30, height: 18, borderRadius: 9999, padding: 2, flexShrink: 0,
                    background: on ? C.purple : C.borderStrong, transition: 'background .15s',
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: 9999, background: '#fff',
                      transform: on ? 'translateX(12px)' : 'translateX(0)',
                      transition: 'transform .15s ease', display: 'block',
                    }} />
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Link */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Link · anyone with the link
            </div>
            <div style={{
              padding: '6px 8px 6px 14px', height: 44,
              border: `1px solid ${C.border}`, borderRadius: 10,
              background: C.bg, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name="link" size={13} color={C.muted} />
              <code style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: C.body }}>
                composed.app/p/acme-braze-cc
              </code>
              <button style={{
                height: 30, padding: '0 10px', borderRadius: 6, border: `1px solid ${C.border}`,
                background: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 12, color: C.body,
                display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
              }}>Read only <Icon name="chevron-down" size={11} color={C.muted} /></button>
              <Btn variant="secondary" size="sm" icon="copy">Copy</Btn>
            </div>
          </div>
        </div>

        <footer style={{ padding: '12px 20px', borderTop: `1px solid ${C.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: C.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="info" size={11} />
            External viewers see a clean read-only version. No model picker, no Claude Code.
          </span>
          <Btn variant="primary" onClick={onClose}>Done</Btn>
        </footer>
      </div>
    </div>
  );
}

window.ShareModal = ShareModal;
