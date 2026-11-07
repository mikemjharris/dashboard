// Reads each site's version.json (written by its deploy workflow) straight
// from the browser; the sites serve it with a CORS header for this.

const projects = [
  { url: 'https://www.mikemjharris.com', repo: 'personal-website' },
  { url: 'https://www.mikemjharris.com/dashboard', repo: 'dashboard' },
  { url: 'https://blog.mikemjharris.com', repo: 'blog' },
  { url: 'https://books.mikemjharris.com', repo: 'books' },
  { url: 'https://snowman.mikemjharris.com', repo: 'threejs-snowman' },
  { url: 'https://animated-message.mikemjharris.com', repo: 'svg-animation-with-node-server' },
];

const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  Object.assign(node, attrs);
  node.append(...children);
  return node;
};

// version.json dates look like 2026-11-07_09-30-00 (UTC).
const parseDeployDate = (value) => {
  const m = /^(\d{4}-\d{2}-\d{2})_(\d{2})-(\d{2})-(\d{2})$/.exec(value || '');
  return m ? new Date(`${m[1]}T${m[2]}:${m[3]}:${m[4]}Z`) : null;
};

const ago = (date) => {
  const days = Math.floor((Date.now() - date) / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 60) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
};

const load = async (project) => {
  try {
    const response = await fetch(`${project.url}/version.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(response.status);
    return { ...project, ok: true, status: await response.json() };
  } catch {
    return { ...project, ok: false };
  }
};

const row = (project) => {
  const link = el('a', { href: project.url, target: '_blank', className: project.ok ? '' : 'error' },
    project.url.replace('https://', ''));
  if (!project.ok) {
    return el('div', { className: 'row' }, link, el('div', { className: 'error status' }, 'Error - no status'));
  }
  const { commit = '', branch = '', deploy_date: deployDate } = project.status;
  const date = parseDeployDate(deployDate);
  const commitLink = el('a', {
    href: `https://github.com/mikemjharris/${project.repo}/commit/${commit}`,
    target: '_blank',
  }, commit.slice(0, 7));
  return el('div', { className: 'row' }, link, el('div', { className: 'status' },
    el('div', {}, commitLink, ` on ${branch}`),
    el('div', { title: deployDate }, date ? `${date.toLocaleString()} (${ago(date)})` : deployDate || '')));
};

Promise.all(projects.map(load)).then((results) => {
  document.getElementById('projects').replaceChildren(...results.map(row));
});
