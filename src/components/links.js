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

  function text(width){

    var title = el('div', {'class' : 'top-text'}).style(
      sty('font-size', '2rem'),
      sty('height', '3rem'),
      sty('position', 'relative'),
      sty('text-align', 'center'),
      sty('z-index', '1'),
      sty('transition', 'color .25s linear')
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
      sty('position', 'absolute'),
      sty('width', width)
    ).content(
      title,
      subtitle
    )
  }

  function item(){

    var background = el('div', {'class' : 'bg'}).style(
      stys.dims('100%', '3rem'),
      sty('position', 'absolute'),
      sty('left', '0'),
      sty('z-index', '-1'),
      sty('background', 'url(../media/img.jpg)'),
      sty('background-size', 'cover'),
      sty('filter', 'brightness(.85)'),
      sty('background-position', '50%, 75%'),
      sty('opacity', '0'),
      sty('transition', 'opacity .25s linear')
    )

    var s = new Selector('$:hover .bg').style(
      sty('opacity', '1'),
      sty('z-index', '2')
    )
    var t = new Selector('$:hover .top-text').style(
      sty('color', 'white'),
      sty('z-index', '3')
    )

    return el('div').style(stys.dims('20em', '4.3rem'))
    .content(
      text('20em'),
      background
    ).assign(s, ['0'])
    .assign(t, ['0'])
  }

  return el('div').style(
    sty('width', '80%'),
    sty('margin', '0 auto'),
    stys.flex('row', 'center', 'center'),
    sty('flex-wrap', 'wrap'),
    sty('padding-bottom', '35px')
  ).content(
    item(),
    item(),
    item()
  )
}
