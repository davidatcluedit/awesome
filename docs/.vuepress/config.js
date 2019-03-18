module.exports = {
  title: 'Scratch',
  description: 'From Scratch',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.6.0/dist/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Javascirpt', link: '/javascript/' },
      { text: 'Typescript', link: '/typescript/' },
      { text: 'Python', link: '/python/' },
      { text: 'ORM', link: '/db/orm.html' },
      { text: 'devOps', link: '/ci/' },
      { text: 'Docker', link: '/docker/' },
      { text: 'Kubernetes', link: '/kubernetes/' },
      { text: 'Nginx', link: '/server/nginx' },
      { text: 'Wiki', link: 'https://github.com/cluedit/cluedit.github.io/wiki' },
      { text: 'Github', link: 'https://github.com/cluedit' },
    ],
    sidebar: 'auto',
    serviceWorker: {
      updatePopup: true,
    },
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: true },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2, 3, 4] },
    config: md => {
      md.set({ html: true })
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-katex'))
      md.use(require('markdown-it-mermaid').default)
    },
  },
}
