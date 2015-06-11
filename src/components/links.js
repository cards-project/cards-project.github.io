var Selector = require('/home/mjennings/pagebuilder/selector.js')
var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')

module.exports = function(){

  function baselineText(text, size, dir){
    return el('div').style(
      sty('height', size)
    ).content(
      el('span').style(
        sty('line-height', '0'),
        sty('font-size', size),
        (dir === 'top' ? sty('vertical-align', 'text-top') : {})
      ).content(
        '&nbsp;' + text
      ),
      el('span').style(
        sty('display', 'inline-block'),
        sty('height', size),
        sty('content', '""')
      )
    )
  }

  function text(){

    var title = el('div').style(
      sty('font-size', '2rem'),
      sty('height', '3rem'),
      sty('position', 'relative'),
      sty('text-align', 'center')
    ).content(
      baselineText('TEST', '3rem')
    )

    var subtitle = el('div').style(
      sty('font-size', '.87rem'),
      sty('height', '1.3rem'),
      sty('position', 'relative'),
      sty('text-align', 'center')
    ).content(
      baselineText("<i>SUBTITLE</i>", '1.3rem', 'top')
    )

    return el('div').style(
      sty('position', 'absolute')
    ).content(
      title,
      subtitle
    )
  }

  function item(){
    return el('div').style(stys.dims('10em', '3rem'))
    .content(
      text(),
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
