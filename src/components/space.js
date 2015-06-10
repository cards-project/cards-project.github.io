
var el = require('../el.js')
var stys = require('../styles/styles.js')
var sty = require('../styles/style.js')

module.exports = function (title, subtitle, height, img, cornerText){

  var still = el('div').style(
    stys.still(height),
    sty('z-index', '-1')
  ).content(
    el('div').style(
      stys.dims('100%', '100%'),
      stys.background(img, ['50%', '50%'], .85)
    ),
    el('span').style(
      sty('position' , 'absolute'),
      sty('margin', '25px'),
      sty('font-size', '1.4em'),
      sty('right', '0'),
      sty('top', '0'),
      sty('color', 'white'),
      stys.collapseLine('bottom')
    ).content(
      cornerText
    )
  )

  var space = el('div').style(
    stys.dims('100%', (100 * height) + '%'),
    stys.flex('row', 'center', 'flex-end')
  ).content(
    el('span').style(
      sty('font-size', '5em'),
      sty('color', 'white'),
      stys.collapseLine('bottom')
    ).content(
      title
    )
  )

  var sub = el('div').style(
    stys.dims('100%'),
    sty('background', 'white'),
    sty('text-align', 'center'),
    sty('font-size', '1.5em'),
    sty('font-style', 'italic'),
    stys.collapseLine('top')
  ).content(
    subtitle
  )

  return el().content(still, space, sub)
}

