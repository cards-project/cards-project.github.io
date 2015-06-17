var el = require('../el.js')

module.exports = function(fonts){
  var head = el('head')
  fonts.forEach(function(entry){
    head.content(gFont(entry[0], entry[1]))
  })
  head.content(
    el('link/', {
      'rel' : 'stylesheet',
      'type' : 'text/css',
      'href' : 'css/d.css'
    }),
    el("meta/", {
      'name' : 'viewport',
      'content' : 'width=device-width, initial-scale=1.0'
    })
  )
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
