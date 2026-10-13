# React Developer Finder

React Developer Finder is a web application built with React and Vite. It lets you search for a GitHub user by username and explore their public profile.

## Features

- Search for users through the public GitHub API. Usernames can be entered with or without `@`.
- View the user's avatar, name, bio, location, company, and public repository count when available.
- Browse up to 10 public repositories that are not forks, sorted by most recently updated.
- See each repository's description, programming language, star and fork counts, and last updated date.
- Try suggested usernames and see loading, error, and no-repository states.

## Requirements

- Node.js and npm
- An internet connection to access the GitHub API

## Installation and usage

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal by Vite.

## Other commands

```bash
npm run build    # construiește aplicația pentru producție în dist/
npm run preview  # previzualizează local versiunea construită
npm run deploy   # construiește și publică directorul dist/ cu gh-pages
```

The application uses the public GitHub API without a token. If the API rate limit is exceeded, the application displays an error message.
