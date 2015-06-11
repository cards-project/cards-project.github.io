
var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')

module.exports = function(){
  function item(){
    return el('div').style('width', '5em')
    .content(
      el('div').style(
        sty('position', 'absolute')
      ).content(
        el('div').style(
          sty('font-size', '2rem'),
          sty('height', '3rem'),
          sty('position', 'relative'),
          stys.flex('row', 'center', 'flex-end')
        ).content(
          el('span').style(
            stys.collapseLine('bottom'),
            sty('overflow', 'hidden')
          ).content(
            'test'
          )
        ),
        el('div').style(
          sty('font-size', '1.3rem'),
          stys.collapseLine('top'),
          sty('text-align', 'center')
        ).content(
          'subtitle'
        )
      ),
      el('div').style(
        sty('background', 'grey'),
        stys.dims('100%', '3rem'),
        sty('position', 'absolute'),
        sty('border-bottom', '1px solid white'),
        sty('z-index', '-1'),
        sty('left', '0')
      )
    )
  }

  return el('div').style(
    sty('width', '80%'),
    sty('margin', '0 auto'),
    stys.flex('row', 'center', 'center'),
    sty('flex-wrap', 'wrap')
  ).content(
    item(),
    item()
  )
}
