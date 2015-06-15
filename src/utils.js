
var sel = require('/home/mjennings/pagebuilder/selector.js')

module.exports.orientationStyle = function(element, orientation, breakPoint, vertStyles, horzStyles){

  if(orientation === 'horizontal'){
    element.style(horzStyles)
  } else {
    element.assign(
      new sel('@media (max-width: ' + breakPoint + 'px)', '$').style(
        horzStyles
      ),
    [0])
    element.assign(
      new sel('@media (min-width: ' + breakPoint + 'px)', '$').style(
        vertStyles
      ),
    [0])
  }

}
module.exports.truncate = function(num, precision){
  if(precision === undefined)
    precision = 2
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}
