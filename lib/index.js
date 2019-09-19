;(function(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'object') {
    exports['tdjs'] = factory()
  } else {
    global['tdjs'] = factory()
  }
})(this, function() {
  var throttle = function(func, wait, options) {
    var timeout, context, args, result
    var previous = 0
    if (!options) options = {}

    var later = function() {
      previous = options.leading === false ? 0 : +new Date()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) content = args = null
    }

    var throttled = function() {
      var now = +new Date()
      if (!previous && options.leading === false) previous = now

      var remaining = wait - (now - previous)
      context = this
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }

      return result
    }

    throttled.cancel = function() {
      clearTimeout(timeout)
      previous = 0
      timeout = context = args = null
    }

    return throttled
  }

  var debounce = function(func, wait, immediate) {
    var timeout, result

    var delay = function(func, wait, args) {
      return setTimeout(function() {
        return func.apply(null, args)
      }, wait)
    }

    var later = function(context, args) {
      timeout = null
      if (args) result = func.apply(context, args)
    }

    var debounced = function(args) {
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        var callNow = !timeout
        timeout = setTimeout(later, wait)
        if (callNow) result = func.apply(this, args)
      } else {
        timeout = delay(later, wait, this, args)
      }

      return result
    }

    debounced.cancel = function() {
      clearTimeout(timeout)
      timeout = null
    }

    return debounced
  }

  return {
    throttle,
    debounce
  }
})
