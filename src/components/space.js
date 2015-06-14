
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
     transform = "rotate(" + (args.side === 'right' ? '-' : '') + "90deg) " +
                 "translate3d(" + (args.side === 'right' ? '' : '-') + "100%, 0, 0)"
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
      stys.dims('100%', '100%'),
      sty('overflow', 'hidden')
    ).content(
      el('div').style(
        sty('font-size', '5em'),
        sty('color', 'white'),
        stys.collapseLine('bottom'),
        (function() {
          if(args.side === 'left' || args.side === 'right'){
            return stys.merge(
              sty('bottom', '4vh'),
              sty(args.side, 0)
            )
          } else {   
            return stys.merge(
              sty('width', '100%'),
              sty('bottom', '0')
            )
          }
        })(),
        sty('text-align', 'center'),
        sty('position', 'absolute'),
        sty('white-space', 'nowrap'),
        (transform !== null ? sty('transform', transform) : {}),
        (transform !== null ? sty('transform-origin', 'bottom ' + transformOrigin) : {})
      ).content(
        args.title
      )
    )
  }
  
  var small = new sel('@media (max-width: 600px)', '$').style(
    sty('font-size', '4vw')
  )

  var sub = ''
  if(args.subtitle !== undefined){
    sub = el('div').style(
      (function() {
        if(args.side === 'left' || args.side === 'right'){
          return stys.merge(
            sty('bottom', '10vh'),
            sty(args.side, '0')
          )
        } else {   
          return stys.merge(
            sty('width', '100%')
          )
        }
      })(),
      sty('position', 'absolute'),
      sty('text-align', 'center'),
      sty('font-size', '1.5em'),
      sty('font-style', 'italic'),
      sty('white-space', 'nowrap'),
      sty('z-index', '5'),
      stys.collapseLine('top'),
      (transform !== null ? sty('transform', transform) : {}),
      (transform !== null ? sty('transform-origin', 'top '  + transformOrigin) : {})
    ).content(
      args.subtitle
    )
    .assign(small, [0])
  }

  var opposites = {
    'left' : 'right',
    'right' : 'left',
    'top' : 'bottom',
    'bottom' : 'top'
  }

  return el('div').style(
    sty(opposites[args.side], 0),
    sty('width', (100 * width) + '%'),
    sty('position', 'absolute'),
    (function(){
      if(args.side === 'left' || args.side === 'right'){
        return stys.merge(
          sty('bottom', '0'),
          sty('top', '0')
        )
      } else {
        return sty('height', (100 * height) + '%')
      }
    })()
    
  ).content(
    still, 
    space, 
    sub
  )
}

