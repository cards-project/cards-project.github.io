
var contentGetter = require('./content.js')
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
  './js/app.js',
]

for(var i = 0; i < scripts.length; i++){
  scripts[i] = el('script', 'src', scripts[i])
}

/* ---------------- THE WHOLE SHEBANG ----------------- */

var submission = {
  'title' : 'GHOST FIRE',
  'subtitle' : 'MICHAEL JENNINGS',
  'side' : 'right',
  'breadth' : .35, 
  'horzBreadth' : .7,
  'img' : './media/img.jpg',
  'links' : [ 
    { title : 'BEGINNINGS', subtitle : '<i>SERIES 1</i>', img : '../media/img.jpg'},
    { title : 'SECOND', subtitle : '<i>SERIES 2</i>', img : '../media/img.jpg'},
    { title: 'WOW', subtitle : '<i>SERIES 3</i>', img : '../media/img.jpg'}
  ]
}

var front = {
  'title' : 'CARDS',
  'subtitle' : 'CODE ART REPRODUCIBLE DESIGN SCRIPTS',
  'side' : 'bottom',
  'breadth' : .75, 
  'img' : './media/grickly.png',
  'cornerText' : 'PDX CREATIVE CODERS',
  'content' : 'real',
  'links' : [
    {title : 'COMING JUNE 24TH, 2015', link : 'http://www.meetup.com/PDX-Creative-Coders/events/222773733/'}
  ]
}

var page = front

var content = contentGetter('real')

var paragraphs = el('div').style('text-indent', '1em')

for(var i = 0; i < content.length; i++){
  paragraphs.content(el('p').content(content[i]))
}


html.content(
  require('./components/head.js')([['Lato', ['300', '300italic']]]),
/*  body.content(
    require('./components/space.js')(page),
    require('./components/mass.js')(page),
    scripts
  )*/
  body.content(
    el('div', {'ng-view' : undefined}),
    scripts
  )
)

var templates = [
  html, 
  require('./components/space.js')('bottom', .75),
  require('./components/space.js')('right', .37, .75),
  require('./components/links.js')(),
  require('./components/page.js')()
]
var names = ['dev', 'outerBottomLarge', 'outerRight', 'links', 'page']

//var test = el('div').style({'text-align' : 'center'})

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
