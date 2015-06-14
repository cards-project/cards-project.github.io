
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

  var isVertical = (args.side === 'left' || args.side === 'right')

  var width
  var height
  if(!isVertical){
    width = 1
    height = args.breadth
  } else {
    height = 1
    width = args.breadth
  }

  var transform = null
  if(isVertical){
     transform = "rotate(" + (args.side === 'right' ? '-' : '') + "90deg) " +
                 "translate3d(" + (args.side === 'right' ? '' : '-') + "100%, 0, 0)"
  }

  //this is the portion of the space that has fixed positioning and does
  //not move
  var still = el('div').style(
    sty('position', 'fixed'),
    stys.dims(pString(width), pString(height)),
    sty('z-index', '-1')
  ).content(
    //the background image
    el('div').style(
      stys.dims('100%', '100%'),
      stys.background(args.img, ['50%', '50%'], .85)
    ),

    //the corner text, if any
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

  //the space that will contain the main title and subtitle
  var title = ''
  if(args.title !== undefined){
    //the title
    title = el('div').style(
      sty('font-size', '5em'),
      sty('color', 'white'),
      stys.collapseLine('bottom'),
      sty('text-align', 'center'),
      sty('position', 'absolute'),
      sty('white-space', 'nowrap'),
      (transform !== null ? sty('transform', transform) : {}),
      (transform !== null ? sty('transform-origin', 'bottom ' + args.side) : {}),
      (isVertical ?
          stys.merge(
            sty('bottom', '4vh'),
            sty(args.side, 0)
          )
        :
          stys.merge(
            sty('width', '100%'),
            sty('bottom', '0')
          )
      )
    ).content(
      args.title
    )
  }

  //TODO: think of a better way to do this  
  var small = new sel('@media (max-width: 600px)', '$').style(
    sty('font-size', '4vw')
  )

  //the subtitle
  var sub = ''
  if(args.subtitle !== undefined){
    sub = el('div').style(
      (isVertical ?
          stys.merge(
            sty('bottom', '10vh'),
            sty(args.side, '0')
          )
        :
          stys.merge(
            sty('text-align', 'center'),
            sty('width', '100%'),
            sty('top' , '100%')
          )
      ),
      sty('position', 'absolute'),
      sty('font-size', '1.5em'),
      sty('font-style', 'italic'),
      sty('white-space', 'nowrap'),
      sty('z-index', '5'),
      stys.collapseLine('top'),
      (transform !== null ? sty('transform', transform) : {}),
      (transform !== null ? sty('transform-origin', 'top '  + args.side) : {})
    ).content(
      args.subtitle
    )

    if(!isVertical){
      sub.assign(small, [0])
    }
  }

  var opposites = {
    'left' : 'right',
    'right' : 'left',
    'top' : 'bottom',
    'bottom' : 'top'
  }

  //the whole thing
  return el('div').style(
    //get the div close to whatever side it needs to
    sty(opposites[args.side], 0),
    sty('width', pString(width)),
    sty('position', 'absolute'),
    //set the height
    (isVertical ?
        stys.merge(
          sty('bottom', '0'),
          sty('top', '0')
        )
      :
        sty('height', pString(height))
    )
    
  ).content(
    still, 
    title, 
    sub
  )
}

//returns proportion in percentage form as a string
function pString(proportion){
  return (100 * proportion) + '%'
}
