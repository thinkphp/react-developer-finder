export default function SearchForm({ query, onQueryChange, onSearch, loading }) {
  function submit(event) {
    event.preventDefault();
    onSearch(query);
  }

  function searchExample(username) {
    onQueryChange(username);
    onSearch(username);
  }

  return (
    <>
      <form className="search-form" onSubmit={submit}>
        <span className="input-prefix">@</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Enter a username"
          aria-label="GitHub username"
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : <>Search <span aria-hidden="true">→</span></>}
        </button>
      </form>
      <p className="examples">
        Popular:
        {['torvalds', 'sindresorhus', 'yyx990803'].map((username) => (
          <button key={username} onClick={() => searchExample(username)} type="button">{username}</button>
        ))}
      </p>
    </>
  );
}
