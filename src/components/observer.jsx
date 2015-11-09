var coordinates = [0, 0];
var observer = null;

function emitChange() {
  observer(coordinates);
}

exports.observe = function (o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

exports.move = function (toX, toY) {
  coordinates = [toX, toY];
  emitChange();
}