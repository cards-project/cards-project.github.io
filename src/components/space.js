
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
module.exports = function (args){

  var width
  var height
  if(args.side === 'bottom' || args.side === 'top'){
    width = 1
    height = args.breadth
  } else {
    height = 1
    width = args.breadth
  }

  var transform = null
  var transformOrigin = null
  if(args.side === 'left' || args.side === 'right'){
     transform = "rotate(-90deg) translate3d(100%, 0, 0)"
     transformOrigin = args.side
  }

  var still = el('div').style(
    sty('position', 'fixed'),
    stys.dims((width * 100) + '%', (height * 100) + '%'),
    sty('z-index', '-1')
  ).content(
    el('div').style(
      stys.dims('100%', '100%'),
      stys.background(args.img, ['50%', '50%'], .85)
    ),
    (args.cornerText !== undefined ?
      el('span').style(
        sty('position' , 'absolute'),
        sty('margin', '25px'),
        sty('font-size', '1.4em'),
        sty('right', '0'),
        sty('top', '0'),
        sty('color', 'white'),
        stys.collapseLine('bottom')
      ).content(
        args.cornerText
      ) 
      : ''
    )
  )

  var space = ''
  if(args.title !== undefined){
    space = el('div').style(
      sty('position', 'relative'),
      stys.dims('100%', (100 * height) + '%'),
      sty('overflow', 'hidden')
    ).content(
      el('div').style(
        sty('font-size', '5em'),
        sty('color', 'white'),
        stys.collapseLine('bottom'),
        sty('width', '100%'),
        sty('text-align', 'center'),
        sty('position', 'absolute'),
        sty('bottom', '0'),
        sty('white-space', 'nowrap'),
        (transform !== null ? sty('transform', transform) : {}),
        (transform !== null ? sty('transform-origin', 'bottom ' + transformOrigin) : {})
      ).content(
        args.title
      )
    )
  }
  
  var sub = ''
  if(args.subtitle !== undefined){
    sub = el('div').style(
      sty('width', '100%'),
      sty('background', 'white'),
      sty('text-align', 'center'),
      sty('font-size', '1.5em'),
      sty('font-style', 'italic'),
      sty('white-space', 'nowrap'),
      stys.collapseLine('top'),
      (transform !== null ? sty('transform', transform) : {}),
      (transform !== null ? sty('transform-origin', 'top '  + transformOrigin) : {})
    ).content(
      args.subtitle
    )
  }

  var opposites = {
    'left' : 'right',
    'right' : 'left',
    'top' : 'bottom',
    'bottom' : 'top'
  }

  return el('div').style(
    sty(opposites[args.side], 0),
    sty('width', (100 * width) + '%')
  ).content(
    still, 
    space, 
    sub
  )
}

