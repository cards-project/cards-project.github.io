
var Element = require('/home/mjennings/pagebuilder/html.js')
var el = require('./el.js')
var sty = require('./styles/style.js')
var stys = require('./styles/styles.js')

var html = el('html', {'ng-app' : 'app'}).style(
  {'margin' : '0', 'padding' : '0'}
)
var body = el('body').style({
 'margin' : '0',
 'padding' : '0',
 'font-family' : "'Lato', sans serif",
 'font-weight' : '300'
})


        /* ------------- THE SCRIPTS --------------- */

var scripts = [
  './bower_components/angular/angular.js',
  './bower_components/angular-route/angular-route.js',
  './bower_components/angular-resource/angular-resource.js',
  './js/directives.js',
  './js/series.js',
  './js/app.js',
]

for(var i = 0; i < scripts.length; i++){
  scripts[i] = el('script', 'src', scripts[i])
}

/* ---------------- THE WHOLE SHEBANG ----------------- */

html.content(
  require('./components/head.js')([['Lato', ['300', '300italic']]]),
  body.content(
    el('div', {'ng-view' : undefined}),
    scripts
  )
)

var templates = [
  html, 
  require('./components/space.js')('bottom', .75),
  require('./components/space.js')('bottom', .45),
  require('./components/space.js')('right', .43, .75),
  require('./components/space.js')('left', .43, .75),
  require('./components/vertical.js')(),
  require('./components/links.js')(),
  require('./components/page.js')(),
  require('./components/series.js')(),
  require('./components/submission.js')()
]
var names = [
  'dev', 
  'outerBottomLarge',
  'outerBottomSmall',
  'outerRight',
  'outerLeft',
  'vertical', 
  'links', 
  'page',
  'series',
  'submission'
]

var p = Element.generate(templates, [{}],true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('css/d.css', p.css);
}
if(p.js[0] !== undefined){
  fs.writeFileSync('js/o.js', p.js);
}

for(var i = 0; i < Object.keys(p.html).length; i++){
  fs.writeFileSync((i !== 0 ? 'templates/' : '') + names[i] + '.html', p.html[i]);
  console.log("wrote " + i)
}
