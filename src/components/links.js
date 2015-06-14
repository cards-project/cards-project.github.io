var Selector = require('/home/mjennings/pagebuilder/selector.js')
var sty = require('../styles/style.js')
var stys = require('../styles/styles.js')
var el = require('../el.js')

module.exports = function(){

  var ret = el('div').style(
    sty('margin', '0 auto'),
    stys.flex('row', 'space-around', 'center'),
    sty('flex-wrap', 'wrap'),
    sty('padding', '40px 0')
  )

  var e = entry(2.7, 1.3, 3.3)

  for(var i = 0; i < arguments.length; i++){
    ret.content(
      e(arguments[i][0], arguments[i][1], arguments[i][2])
    )
  }

  return ret
}


/*
  returns a link, with text and background

  titleSize: the font size for the title in rem
  subtitleSize: the font size for the subtitle in rem
  bannerHeight: the height in rem of the banner behind the link
  title: the text for the title
  subtitle: the text for the subtitle
  img: the path to the background banner image
  
*/
function entry(titleSize, subtitleSize, bannerHeight){
  return function(title, subtitle, img){

    //style to make the background appear on hover
    var bannerAppear = new Selector('$container:hover $background').style(
      sty('opacity', '1'),
      sty('z-index', '2')
    )

    //style to make the text change color and stand in front of background on hover
    var textChange = new Selector('$:hover .top-text').style(
      sty('color', 'white'),
      sty('z-index', '3')
    )
  
    var background = el('div').style(
      stys.dims('100%', bannerHeight + 'rem'),
      stys.background(img, ['50%', '75%'], .85),
      sty('pointer-events', 'none'),
  
      sty('position', 'absolute'),
      sty('left', '0'),
  
      sty('opacity', '0'),
      sty('z-index', '-1'),
      sty('transition', 'opacity .25s linear')
    )

    background.assign(bannerAppear, ['background'])

  
    return el('div').style(
      stys.dims('fit-content', (bannerHeight + subtitleSize) + 'rem'),
      sty('min-width', '25%'),
      sty('margin', '0 15px'),
      sty('text-align', 'center')
    )
    .content(
      background,
      text(title, subtitle, titleSize + 'rem', subtitleSize + 'rem', bannerHeight + 'rem')
    )
    .assign(bannerAppear, ['container'])
    .assign(textChange, [0])
  }
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

  var subtitle = el('div').style(
    stys.collapseLine('top'),
    sty('font-size', subtitleSize)
  )
  .content(
    subtitleText
  )

  return el('div').style(
    sty('display', 'inline-block')
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
