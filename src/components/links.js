var Selector = require('/home/mjennings/pagebuilder/selector.js')
var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')

module.exports = function(){

  var ret = el('div').style(
    sty('margin', '40px auto'),
    stys.flex('row', 'space-around', 'center'),
    sty('flex-wrap', 'wrap')
  )
  .content(
    entry(2.2, 1.1, 2.5)
  )

  return ret
}


/*
  returns a link, with text and background

  titleSize: the font size for the title in rem
  subtitleSize: the font size for the subtitle in rem
  bannerHeight: the height in rem of the banner behind the link
  
*/
function entry(titleSize, subtitleSize, bannerHeight){

  var transitionTime = '.25s'
  var opacityTransition = 'opacity ' + transitionTime
  //the z-index change of the background must be delayed so that it does
  //not disappear immediately on hover
  var zindexTransition = 'z-index 0s ' + transitionTime

  //style to make the background appear on hover
  var bannerAppear = new Selector('$container:hover $background').style(
    sty('opacity', '1'),
    sty('z-index', '2'),
    sty('transition', opacityTransition)
  )

  //style to make the text change color and stand in front of background on hover
  var textChange = new Selector('$:hover .top-text').style(
    sty('color', 'white'),
    sty('z-index', '3')
  )
 
  var background = el('div', {'ng-style' : "{backgroundImage : 'url(./media/' + link.img + ')'}"}).style(
    stys.dims('100%', bannerHeight + 'rem'),
    stys.background(['50%', '75%'], .85),
    sty('pointer-events', 'none'),

    sty('position', 'absolute'),
    sty('left', '0'),

    sty('opacity', '0'),
    sty('z-index', '-1'),
    sty('transition', opacityTransition + ', ' + zindexTransition)
  )

  background.assign(bannerAppear, ['background'])

  var ret = el('div', {'ng-repeat' : "link in links", 'ng-click' : 'goto(link.path)'}).style(
    stys.dims('fit-content', (bannerHeight + subtitleSize) + 'rem'),
    sty('min-width', '25%'),
    sty('margin', '0 15px'),
    stys.flex('row', 'center'),
    sty('text-align', 'center'),
    sty('cursor', 'pointer')
  )
  .content(
    background,
    text('{{ link.title }}', '{{ link.subtitle }}', titleSize + 'rem', subtitleSize + 'rem', bannerHeight + 'rem')
  )

  //ret.attribute('onclick', 'window.location.href = &quot;' + link + '&quot;')

  ret.assign(bannerAppear, ['container'])
  ret.assign(textChange, [0])

  return ret
}

/*
  Returns a div with the formatted title and subtitle for a link
*/
function text(titleText, subtitleText, titleSize, subtitleSize, bannerHeight){

  var title = baselineText(titleText, titleSize, bannerHeight).attribute('class', 'top-text')
  .style(
    sty('z-index', '1'),
    sty('transition', 'color .25s linear'),
    sty('position', 'relative')
  )

  var subtitle = ''
  if(subtitleText !== undefined){
    subtitle = el('div').style(
      stys.collapseLine('top'),
      sty('font-size', subtitleSize)
    )
    .content(
      subtitleText
    )
  }

  return el('div').style(
    sty('display', 'inline-block'),
    sty('color', 'rgb(140, 140, 140)')
  )
  .content(
    title,
    subtitle
  )
}

//returns a div containing text with font-size fontSize
//and height height, with the baseline of the text aligned
//with the bottom of the div
function baselineText(text, fontSize, height){
  return el('div').style(
    sty('height', height)
  ).content(
    el('span').style(
      sty('line-height', '0'),
      sty('font-size', fontSize )
    ).content(
      text
    ),
    el('span').style(
      sty('display', 'inline-block'),
      sty('height', height )
    )
  )
}
