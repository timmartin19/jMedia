exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo: 'app.js'
      order: [
        'app/jquery.media.js',
        'app/defaults.js',
        'app/players.js',
        'app/private.js'
      ]
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'app.js'