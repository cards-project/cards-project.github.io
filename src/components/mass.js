var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')
var content = require('../content.js')('lorem')

module.exports = function(){
  var ret = el('div').style(
    sty('width', '100%'),
    sty('background', 'white'),
    sty('padding', '40px 0'),
    sty('text-align', 'justify')
  ).content(
    el('div').style(
      sty('margin', '0 auto'),
      sty('width', '70%'),
      sty('text-indent', '1em')
    ).capture()
  )

  for(var i = 0; i < content.length; i++){
    ret.content(el('p').content(content[i]))
  }
  return ret
}
