function formatNumber(number = 0) {
  return new Intl.NumberFormat('en', {
    notation: number > 999 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(number);
}

export default function ProfileCard({ profile }) {
  return (
    <article className="profile-card">
      <img className="avatar" src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
      <div className="profile-details">
        <h2>{profile.name || profile.login}</h2>
        <a className="username" href={profile.html_url} target="_blank" rel="noreferrer">
          @{profile.login} <span>↗</span>
        </a>
        <p>{profile.bio || 'No bio provided.'}</p>
      </div>
      <a className="profile-link" href={profile.html_url} target="_blank" rel="noreferrer">
        View profile <span>↗</span>
      </a>
      <div className="profile-stats">
        <span><strong>{formatNumber(profile.public_repos)}</strong> repositories</span>
        {profile.location && <span>{profile.location}</span>}
        {profile.company && <span>{profile.company}</span>}
      </div>
    </article>
  );
}
