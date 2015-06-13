
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
 'font-weight' : '300', 
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
  'img' : '../media/img.jpg',
}

var front = {
  'title' : 'CARDS',
  'subtitle' : 'CODE ART REPRODUCIBLE DESIGN SCRIPTS',
  'side' : 'bottom',
  'breadth' : .75, 
  'img' : '../media/img.jpg',
  'cornerText' : 'PDX CREATIVE CODERS'
}

var page = submission

html.content(
  require('./components/head.js')([['Lato', ['300', '300italic']]]),
  body.content(
    require('./components/space.js')(page),
    require('./components/mass.js')().style(
      (function() {
         if(page.side === 'right' || page.side === 'left'){
           return stys.merge(
             sty('width', (100 * (1-page.breadth)) + '%'),
             sty(page.side, '0'), 
             sty('top', '0'),
             sty('min-height', '100%'),
             stys.flex('column', 'center', 'center')
           )
         } else {
           return sty('top', (100 * page.breadth) + '%')
         }
      })(),
      sty('position', 'absolute'),
      sty('box-sizing', 'border-box')
    ),
    scripts
  )
)

var p = html.generate({},true);

var fs = require('fs');
if(p.css !== undefined){
  fs.writeFileSync('css/o.css', p.css);
}
if(p.js !== undefined){
  fs.writeFileSync('js/o.js', p.js);
}
fs.writeFileSync('index.html', p.html);
