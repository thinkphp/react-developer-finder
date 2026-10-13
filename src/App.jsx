import { useState } from 'react';
import ProfileCard from './components/ProfileCard.jsx';
import RepositoryList from './components/RepositoryList.jsx';
import SearchForm from './components/SearchForm.jsx';
import { EmptyState, ErrorState, LoadingState } from './components/SearchStates.jsx';

function App() {
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function searchUser(value = query) {
    const username = value.trim().replace(/^@/, '');
    if (!username) {
      setError('Enter a GitHub username to search.');
      setStatus('error');
      return;
    }

    setQuery(username);
    setStatus('loading');
    setError('');
    setProfile(null);
    setRepositories([]);

    try {
      const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}`;
      const options = { headers: { Accept: 'application/vnd.github+json' } };
      const [profileResponse, repositoriesResponse] = await Promise.all([
        fetch(endpoint, options),
        fetch(`${endpoint}/repos?sort=updated&per_page=100&type=owner`, options),
      ]);

      if (profileResponse.status === 404) throw new Error(`No GitHub user found for “${username}”.`);
      if (profileResponse.status === 403 || repositoriesResponse.status === 403) {
        throw new Error('GitHub API rate limit reached. Please try again later.');
      }
      if (!profileResponse.ok || !repositoriesResponse.ok) {
        throw new Error('GitHub could not complete the request. Please try again.');
      }

      const [userData, repositoryData] = await Promise.all([
        profileResponse.json(),
        repositoriesResponse.json(),
      ]);
      setProfile(userData);
      setRepositories(repositoryData.filter((repository) => !repository.fork).slice(0, 10));
      setStatus('success');
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">GH</span><span>GitHub<span className="brand-accent">Finder</span></span></a>
        <span className="top-label">PUBLIC PROFILE EXPLORER</span>
      </header>

      <main id="top">
        <section className="intro">
          <p className="eyebrow">DISCOVER OPEN SOURCE</p>
          <h1>Find a developer.<br /><span>Explore their work.</span></h1>
          <p className="intro-copy">Search any GitHub username to see their profile and latest repositories.</p>
          <SearchForm query={query} onQueryChange={setQuery} onSearch={searchUser} loading={status === 'loading'} />
        </section>

        <section className="results" aria-live="polite">
          {status === 'idle' && <EmptyState />}
          {status === 'loading' && <LoadingState username={query} />}
          {status === 'error' && <ErrorState message={error} onRetry={() => searchUser()} />}
          {status === 'success' && profile && <>
            <ProfileCard profile={profile} />
            <RepositoryList repositories={repositories} />
          </>}
        </section>
      </main>

      <footer><span>React Find a Developer</span><span>Data provided by the GitHub public API</span></footer>
    </div>
  );
}

export default App;
