module.exports = {
  title: 'Scratch',
  description: 'From Scratch',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Javascirpt', link: '/javascript/' },
      // { text: 'Typescript', link: '/typescript/' },
      { text: 'devOps', link: '/ci/' },
      { text: 'Docker', link: '/docker/' },
      { text: 'Nginx', link: '/server/nginx' },
      { text: 'Wiki', link: 'https://github.com/cluedit/cluedit.github.io/wiki' },
      { text: 'Github', link: 'https://github.com/cluedit' },
    ],
    sidebar: 'auto',
    serviceWorker: {
      updatePopup: true,
    },
  },
}
