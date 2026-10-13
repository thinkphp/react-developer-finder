function formatNumber(number = 0) {
  return new Intl.NumberFormat('en', {
    notation: number > 999 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(number);
}

function relativeDate(date) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function languageColor(language) {
  const colors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5', Java: '#b07219',
    Go: '#00add8', Rust: '#dea584', HTML: '#e34c26', CSS: '#663399', 'C++': '#f34b7d',
    Ruby: '#701516', Swift: '#f05138', Vue: '#41b883', Shell: '#89e051',
  };
  return colors[language] || '#f27935';
}

function RepositoryCard({ repository }) {
  return (
    <article className="repo-card">
      <div className="repo-main">
        <div className="repo-title-line">
          <a className="repo-name" href={repository.html_url} target="_blank" rel="noreferrer">
            {repository.name} <span>↗</span>
          </a>
          {repository.fork && <span className="fork-label">FORK</span>}
        </div>
        <p>{repository.description || 'No description provided.'}</p>
        <div className="repo-meta">
          {repository.language && <span className="language"><i style={{ background: languageColor(repository.language) }} />{repository.language}</span>}
          <span>★ {formatNumber(repository.stargazers_count)}</span>
          <span>⑂ {formatNumber(repository.forks_count)}</span>
          <span>Updated {relativeDate(repository.updated_at)}</span>
        </div>
      </div>
    </article>
  );
}

export default function RepositoryList({ repositories }) {
  return (
    <>
      <div className="repo-heading">
        <div><p className="eyebrow">LATEST ACTIVITY</p><h2>Repositories</h2></div>
        <span className="count">{repositories.length} results</span>
      </div>
      {repositories.length ? (
        <div className="repo-list">
          {repositories.map((repository) => <RepositoryCard key={repository.id} repository={repository} />)}
        </div>
      ) : (
        <div className="empty-state compact">
          <div><h2>No repositories to show</h2><p>This profile has no public repositories.</p></div>
        </div>
      )}
    </>
  );
}
