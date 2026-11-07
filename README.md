Dashboard
========================

Shows what's deployed on each of my sites: https://www.mikemjharris.com/dashboard/

Each site's deploy workflow writes a `version.json` (commit, branch, deploy time),
served with a CORS header. This page is plain HTML and JavaScript that fetches
them all from the browser; there's no build step or backend.

To run locally: `npx serve .` from the repo root and open http://localhost:3000/site/
(asset paths are absolute, so it's easiest to check on the live site), or just edit
`site/` and merge: `.github/workflows/deploy.yml` uploads it to `dashboard/` in the
www bucket. The bucket and the deploy role are in
[mikemjharris/infra](https://github.com/mikemjharris/infra).
