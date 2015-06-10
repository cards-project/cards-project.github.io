
module.exports.still = function(height){
  return merge(
    dims('100%', (100 * height) + '%'),
    {'position' : 'fixed'}
  )
}



/////

module.exports.font = function(size, weight) {
  var ret = {'font-size' : size }
  if(weight !== undefined)
    ret['font-weight'] = weight
  return ret
}

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
function background(img, position, brightness){
  var ret = {
    'background' : 'url(' + img + ')',
    'background-size' : 'cover'
  }
  if(position !== undefined)
    ret['background-position'] = position[0] + ' ' + position[1]

  if(brightness !== undefined)
    ret['filter'] = 'brightness(' + brightness + ')'

  return ret
}

module.exports.flex = function(dir, justify, align){
  return {
    'display' : 'flex',
    'flex-direction' : dir,
    'justify-content' : justify,
    'align-items' : align
  }
}

module.exports.collapseLine = function(dir){
  var height = (dir === 'top') ? 65 : 75
  return {'line-height' : height + '%'}
}

module.exports.margin = function(marg){
  return {'margin' : margin}
}
