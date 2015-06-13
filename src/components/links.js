var Selector = require('/home/mjennings/pagebuilder/selector.js')
var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')

module.exports = function(){

  function baselineText(text, fontSize, height){
    return el('div').style(
      sty('height', fontSize)
    ).content(
      el('span').style(
        sty('line-height', '0'),
        sty('font-size', fontSize )
      ).content(
        '&nbsp;' + text
      ),
      el('span').style(
        sty('display', 'inline-block'),
        sty('height', height )
      )
    )
  }

  function text(width, topHeight, titleSize, subtitleSize){

    var title = baselineText('BEGINNINGS', titleSize, topHeight).attribute('class', 'top-text')
    .style(
      sty('z-index', '1'),
      sty('transition', 'color .25s linear'),
      sty('position', 'relative'),
      sty('height', topHeight)
    )

    var subtitle = el('div').style(
      stys.collapseLine('top'),
      sty('text-align', 'center'),
      sty('font-size', subtitleSize)
    )
    .content(
      '<i>SERIES 1</i>'
    )

    return el('div').style(
      sty('position', 'absolute'),
      sty('width', width),
      sty('text-align', 'center')
    ).content(
      title,
      subtitle
    )
  }

  function item(){

    var sizes = [2.7, 1.3]
    var topHeight = 3.3

    var background = el('div', {'class' : 'background'}).style(
      stys.dims('100%', topHeight + 'rem'),
      stys.background('../media/img.jpg', ['50%', '75%'], .85),

      sty('position', 'absolute'),
      sty('left', '0'),

      sty('opacity', '0'),
      sty('z-index', '-1'),
      sty('transition', 'opacity .25s linear')
    )

    var bannerAppear = new Selector('$:hover .background').style(
      sty('opacity', '1'),
      sty('z-index', '2')
    )
    var textChange = new Selector('$:hover .top-text').style(
      sty('color', 'white'),
      sty('z-index', '3')
    )

    var width = '35rem'
    return el('div').style(
      stys.dims(width, (topHeight + sizes[1]) + 'rem')
    )
    .content(
      text(width, topHeight + 'rem', sizes[0] + 'rem', sizes[1] + 'rem'),
      background
    )
    .assign(bannerAppear, [0])
    .assign(textChange, [0])
  }

  return el('div').style(
    sty('width', '80%'),
    sty('margin', '0 auto'),
    stys.flex('row', 'center', 'center'),
    sty('flex-wrap', 'wrap'),
    sty('padding', '40px 0')
  ).content(
    item()
  )
}
