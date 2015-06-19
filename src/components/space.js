
var util = require('../utils.js')
var sel = require('/home/mjennings/pagebuilder/selector.js')
var el = require('../el.js')
var stys = require('../styles/styles.js')
var sty = require('../styles/style.js')


/*
  args is an object with the following properties:

  REQUIRED

    img : path to the img to display behind the space
    breadth : percentage of the screen the image takes
              up along its shorter axis
    side : the side that the title and subtitle will
           run along, either top, bottom, left, or right
    
  OPTIONAL
 
    title : the title to display
    subtitle : the subtitle
    cornerText : the text to display at the top right
                 corner of the space

*/
module.exports = function (side, breadth, horzBreadth){

  var orientation = (side === 'left' || side === 'right') ? 'vertical' : 'horizontal'

  var vertDims = [(100 * breadth) + '%', '100%']
  var horzDims = ['100%', (100 * (horzBreadth !== undefined ? horzBreadth : breadth)) + '%']

  var transform = null
  if(orientation === 'vertical'){
     transform = "rotate(" + (side === 'right' ? '-' : '') + "90deg) " +
                 "translate3d(" + (side === 'right' ? '' : '-') + "100%, 0, 0)"
  }

  var brighten = new sel('$:hover $').style({'filter': 'brightness(1)'})

  var backgroundImage = el('div', {'ng-style' : "{backgroundImage : 'url(' + img + ')'}"}).style(
    stys.dims('100%', '100%'),
 //   stys.background('{{ img }}', ['50%', '50%'], .85)
    sty('background-position', '50% 50%'),
    sty('background-size', 'cover'),
    sty('filter', 'brightness(.85)'),
    sty('transition', 'filter .5s')
  )

  if(orientation === 'vertical')
    backgroundImage.assign(brighten, [1])

  //this is the portion of the space that has fixed positioning and does
  //not move
  var still = el('div').style(
    sty('position', 'fixed'),
    sty('z-index', '-1')
  ).content(
    backgroundImage,
    //the corner text, if any
    el('span', {'ng-if' : 'cornerText !== undefined'}).style(
      sty('position' , 'absolute'),
      sty('margin', '25px'),
      sty('font-size', '1.4rem'),
      sty('right', '0'),
      sty('top', '0'),
      sty('color', 'white'),
      stys.collapseLine('bottom')
    ).content(
      '{{ cornerText }}'
    ) 
  )

  util.orientationStyle(still, orientation, 600, stys.dims(vertDims[0], vertDims[1]), stys.dims(horzDims[0], horzDims[1]))

  //the space that will contain the main title and subtitle
  var title = el('div').style(
    sty('font-size', '5rem'),
    sty('color', 'white'),
    stys.collapseLine('bottom'),
    sty('text-align', 'center'),
    sty('position', 'absolute'),
    sty('white-space', 'nowrap')
  ).content(
    '{{ title }}'
  )

  util.orientationStyle(title, orientation, 600, 
    stys.merge(
      sty('bottom', '4vh'),
      sty(side, 0),
      sty('transform', transform),
      sty('transform-origin', 'bottom ' + side)
    ),
    stys.merge(
      sty('width', '100%'),
      sty('bottom', '0')
    )
  )


  //the subtitle
  var sub = el('div').style(
    sty('position', 'absolute'),
    sty('font-size', '1.5rem'),
    sty('font-style', 'italic'),
    sty('white-space', 'nowrap'),
    sty('z-index', '5'),
    stys.collapseLine('top')
  ).content(
    '{{ subtitle }}'
  )

  util.orientationStyle(sub, orientation, 600, 
    stys.merge(
      sty('bottom', '10vh'),
      sty(side, 0),
      sty('transform', transform),
      sty('transform-origin', 'top ' + side)
    ),
    stys.merge(
      sty('width', '100%'),
      sty('top', '100%'),
      sty('text-align', 'center')
    )
  )

  //TODO: think of a better way to do this  
  var small = new sel('@media (max-width: 600px)', '$').style(
    sty('font-size', '4vw')
  )
  sub.assign(small, [0])

  var opposites = {
    'left' : 'right',
    'right' : 'left',
    'top' : 'bottom',
    'bottom' : 'top'
  }

  //the whole thing
  var space = el('div').style(
    //get the div close to whatever side it needs to
    sty('position', 'absolute')
  ).content(
    still, 
    title, 
    sub
  )
  .assign(brighten, [0])

  util.orientationStyle(space, orientation, 600,
    stys.merge(
      sty('bottom', '0'),
      sty('top', '0'),
      sty('width', vertDims[0]),
      sty(opposites[side], 0)
    ),
    stys.merge(
      stys.dims(horzDims[0], horzDims[1]),
      sty('top', '0')
    )
  )


  var container = el('div').style(
    sty('background', 'white'),
    sty('padding-' + opposites[side], '1.5rem'),
    sty('position', 'absolute'),
    sty('box-sizing', 'border-box')
  ).content(
    el('div').style(
      sty('text-indent', '1em'),
      sty('width', '70%'),
      sty('margin', '0 auto')
    ).content(
      el('ng-transclude')
    )
  )

  util.orientationStyle(container, orientation, 600,
    stys.merge(
      sty('width', (100 * (1-breadth)) + '%'),
      sty(side, '0'), 
      sty('top', '0'),
      sty('min-height', '100%'),
      stys.flex('column', 'center', 'center')
    ),
    stys.merge(
      sty('top', (100 * (horzBreadth !== undefined ? horzBreadth : breadth)) + '%'),
      sty('width', '100%')
    )
  )

  var ret = el('div').content(
    space,
    container
  )

  return ret
}

