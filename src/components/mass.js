var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')
var content = require('../content.js')('lorem')

module.exports = function(){

  var paragraphs = el('div').style(
    sty('margin', '0 auto'),
    sty('width', '70%'),
    sty('text-indent', '1em')
  )
  for(var i = 0; i < 1; i++){
    paragraphs.content(el('p').content(content[i]))
  }

  var ret = el('div').style(
    sty('background', 'white'),
    sty('padding', '40px 0'),
    sty('text-align', 'justify')
  ).content(
    paragraphs,
    require('./links.js')()
  )



  return ret
}
