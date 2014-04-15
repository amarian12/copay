'use strict';

var imports = require('soop').imports();

function Storage() {
  this.data = {};
}

Storage.prototype._read = function(k) {
  var ret;
  try {
    ret = JSON.parse(localStorage.getItem(k));
  } catch (e) {};
  return ret;
};


// get value by key
Storage.prototype.getGlobal = function(k) {
  return this._read(k);
};

// set value for key
Storage.prototype.setGlobal = function(k,v) {
  localStorage.setItem(k, JSON.stringify(v));
};

// remove value for key
Storage.prototype.removeGlobal = function(k) {
  localStorage.removeItem(k);
};



Storage.prototype._key = function(walletId, k) {
  return walletId + '::' + k;
};
// get value by key
Storage.prototype.get = function(walletId, k) {
  return this._read(localStorage.getItem(this._key(walletId,k)));
};

// set value for key
Storage.prototype.set = function(walletId, k,v) {
  localStorage.setItem(this._key(walletId,k), JSON.stringify(v));
};

// remove value for key
Storage.prototype.remove = function(walletId, k) {
  localStorage.removeItem(this._key(walletId,k));
};

// remove all values
Storage.prototype.clearAll = function() {
  localStorage.clear();
};     

module.exports = require('soop')(Storage);