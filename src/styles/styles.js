
module.exports.merge = merge
function merge(){
  var ret = {}
  for(var i = 0; i < arguments.length; i++){
    var keys = Object.keys(arguments[i])
    for(var j = 0; j < keys.length; j++){
      ret[keys[j]] = arguments[i][keys[j]]
    }
  }
  return ret
}

module.exports.dims = dims
function dims(width, height){
  var ret = { 'width' : width }
  if(height !== undefined)
    ret['height'] = height

  return ret
}

module.exports.background = background
function background(position, brightness){
  var ret = {
    'background-size' : 'cover'
  }
  if(position !== undefined)
    ret['background-position'] = position[0] + ' ' + position[1]

  if(brightness !== undefined)
    ret['filter'] = 'brightness(' + brightness + ')'

  return ret
}

module.exports.flex = function(dir, justify, align){
  var ret = {
    'display' : 'flex',
    'flex-direction' : dir
  }
  if(justify !== undefined)
    ret['justify-content'] = justify
  if(align !== undefined)
    ret['align-items'] = align

  return ret
}

module.exports.collapseLine = function(dir){
  var height = (dir === 'top') ? 85 : 75
  return {'line-height' : height + '%'}
}
