var el = require('../el.js')

module.exports = function(fonts){
  var head = el('head')
  fonts.forEach(function(entry){
    head.content(gFont(entry[0], entry[1]))
  })
  head.content(el('link/', {
    'rel' : 'stylesheet',
    'type' : 'text/css',
    'href' : 'css/o.css'
  }))
  return head.embedJS()
}

function gFont(font, weights){
  return el('link/', {
    'rel' : 'stylesheet',
    'type' : 'text/css',
    'href' : 'http://fonts.googleapis.com/css?family=' + 
              font.replace(' ','+') + ':' + weights.join(',')
  })
} 
