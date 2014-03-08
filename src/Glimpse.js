/**
 *
 *
 */


/**
 * Helper Class to Figure Some Things Out
 *
 *
 *
 */
function Glimpse (domEl) {

  if (!(this instanceof Glimpse)) {
    return new Glimpse(domEl);
  }

  if (typeof domEl === 'undefined') {
    domEl = window;
  }

  //
  var self = this;

  //
  self.domEl = typeof domEl === 'string' ? document.getElementById(domEl) : domEl;
  self.lastFocused = undefined;
  self.lastBlurred = undefined;
  self.lastChanged = undefined;
  self.blurredCallback = undefined;
  self.focusedCallback = undefined;


  // Immediately invoke function, to create a closure
  ~function () {
    self.domEl.onfocus = function (ev) {
      self.lastFocused = +new Date();
      self.lastChanged = self.lastFocused - self.lastBlurred;
      if (typeof self.focusedCallback === 'function') {
        self.focusedCallback.call(self, ev);
      }
    };
    self.domEl.onblur = function (ev) {
      self.lastBlurred = +new Date();
      self.lastChanged = self.lastBlurred - self.lastFocused ;
      if (typeof self.blurredCallback === 'function')
        self.blurredCallback.call(self, ev);
    };
  }();

  return self;
}

Glimpse.prototype.blurred = function (callback) {
  if (typeof callback === 'function') {
    this.blurredCallback = callback;
  }
  return this;
};

/**
 *
 *
 */
Glimpse.prototype.focused = function (callback) {
  if (typeof callback === 'function') {
    this.focusedCallback = callback;
  }
  return this;
};
