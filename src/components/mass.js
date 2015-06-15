var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')
var content = require('../content.js')('lorem')
var util = require('../utils.js')

module.exports = function(page){

  var width = '70%'

  var paragraphs = el('div').style(
    sty('margin', '0 auto'),
    sty('width', width),
    sty('text-indent', '1em')
  )

  for(var i = 0; i < content.length; i++){
    paragraphs.content(el('p').content(content[i]))
  }

  var ret = el('div').style(
    sty('background', 'white'),
    sty('padding', '30px 0'),
    sty('text-align', 'justify'),
    sty('position', 'absolute'),
    sty('box-sizing', 'border-box')
  ).content(
    paragraphs,
    require('./links.js')(
      ['BEGINNINGS', '<i>SERIES 1</i>', '../media/img.jpg'],
      ['SECOND', '<i>SERIES 2</i>', '../media/img.jpg'],
      ['WOW', '<i>SERIES 3</i>', '../media/img.jpg']
    )
    .style('width', width)
  )

  util.orientationStyle(ret, (page.side === 'right' || page.side === 'left') ? 'vertical' : 'horizontal', 600,
    stys.merge(
      sty('width', (100 * (1-page.breadth)) + '%'),
      sty(page.side, '0'), 
      sty('top', '0'),
      sty('min-height', '100%'),
      stys.flex('column', 'center', 'center')
    ),
    sty('top', (100 * (page.horzBreadth !== undefined ? page.horzBreadth : page.breadth)) + '%')
  )

  return ret
}
