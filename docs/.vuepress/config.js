module.exports = {
  title: 'Scratch',
  description: 'From Scratch',
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
    extendMarkdown: md => {
      md.use(require('markdown-it-task-lists'))
    },
  },
}
