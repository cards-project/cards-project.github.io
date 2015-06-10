var el = require('./el.js')

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

html.content(
  require('./head.js')([['Lato', ['300', '300italic']]]),
  body.content(
    'test',
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
