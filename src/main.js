
var Element = require('/home/mjennings/pagebuilder/html.js')
var el = require('./el.js')
var sty = require('./styles/style.js')
var stys = require('./styles/styles.js')

var html = el('html').style(
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
  'img' : '../media/img.jpg',
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
  'img' : '../media/grickly.png',
  'cornerText' : 'PDX CREATIVE CODERS',
  'content' : 'real',
  'links' : [
    {title : 'COMING JUNE 24TH, 2015', link : 'http://www.meetup.com/PDX-Creative-Coders/events/222773733/'}
  ]
}

var page = front

html.content(
  require('./components/head.js')([['Lato', ['300', '300italic']]]),
  body.content(
    require('./components/space.js')(page),
    require('./components/mass.js')(page),
    scripts
  )
)

//var test = el('div').style({'text-align' : 'center'})

var p = Element.generate([html], [{}],true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('css/d.css', p.css);
}
if(p.js[0] !== undefined){
  fs.writeFileSync('js/o.js', p.js);
}
fs.writeFileSync('dev.html', p.html[0]);
//fs.writeFileSync('test.html', p.html[1]);
