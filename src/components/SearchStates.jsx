export function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌕</div>
      <div><h2>Start with a username</h2><p>Public GitHub profiles and repositories will show up here.</p></div>
    </div>
  );
}

export function LoadingState({ username }) {
  return <div className="message-state"><span className="spinner dark" />Searching GitHub for <strong>@{username}</strong>…</div>;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div><h2>Couldn’t load that profile</h2><p>{message}</p></div>
      <button type="button" onClick={onRetry}>Try again <span>→</span></button>
    </div>
  );
}
