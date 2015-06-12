
module.exports.truncate = function(num, precision){
  if(precision === undefined)
    precision = 2
  return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
}
