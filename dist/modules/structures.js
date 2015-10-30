!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.structures=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = (function () {
	function Color(r, g, b, a) {
		_classCallCheck(this, Color);

		this.r = r || this.generateRandomValue();
		this.g = g || this.generateRandomValue();
		this.b = b || this.generateRandomValue();
		this.a = a || 1;
	}

	_createClass(Color, [{
		key: "generateRandomValue",
		value: function generateRandomValue() {
			return (255 * Math.random()).toFixed(0);
		}
	}, {
		key: "rgba",
		value: function rgba() {
			var arg = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

			return "rgba(" + arg.r + ", " + arg.g + ", " + arg.b + ", " + arg.a + ")";
		}
	}, {
		key: "rybRprob",
		value: function rybRprob(seed) {
			return 1.0 - Math.ceil(Math.abs(seed - 0.25) + Math.abs(0.75 - seed) - Math.abs(0.75 - 0.25));
		}
	}, {
		key: "rybGprob",
		value: function rybGprob(seed) {
			return 1.0 - Math.ceil(Math.abs(seed - 0.5) + Math.abs(0.75 - seed) - Math.abs(0.75 - 0.5));
		}
	}, {
		key: "rybBprob",
		value: function rybBprob(seed) {
			return 1.0 - Math.min(Math.ceil(Math.abs(seed - 0.75) + Math.abs(1.0 - seed) - Math.abs(1.0 - 0.75)), 1.0);
		}
	}, {
		key: "rybRandom",
		value: function rybRandom() {
			var seed = Math.random();
			var returned = {};
			returned.r = 255 * this.rybRprob(seed);
			returned.g = 255 * this.rybGprob(seed);
			returned.b = 255 * this.rybBprob(seed);
			returned.a = 1;
			return this.rgba(returned);
		}
	}, {
		key: "cmyRandom",
		value: function cmyRandom() {
			// results are 255 in 2, 0 in one
		}
	}, {
		key: "rgbRandom",
		value: function rgbRandom() {
			// results are 255 in r, g, or b
		}
	}]);

	return Color;
})();

module.exports = Color;

},{}],2:[function(_dereq_,module,exports){
'use strict';

module.exports = {
	color: _dereq_('./color'),
	tree: _dereq_('./tree'),
	probability: _dereq_('./randomSet')
};

},{"./color":1,"./randomSet":3,"./tree":4}],3:[function(_dereq_,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = _dereq_('./tree');

var DeterministicProbability = (function (_Tree) {
    _inherits(DeterministicProbability, _Tree);

    function DeterministicProbability() {
        var tries = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var spread = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, DeterministicProbability);

        _get(Object.getPrototypeOf(DeterministicProbability.prototype), 'constructor', this).call(this);
        this._maxTries = tries;
        this._spread = this.checkSpread(spread);
        this._decisions = this._spread.length;
        this.createPossibilities();
    }

    _createClass(DeterministicProbability, [{
        key: 'checkSpread',
        value: function checkSpread(spread) {
            if (Array.isArray(spread)) {
                return spread;
            }
            return this.createSpreadExNihlo();
        }
    }, {
        key: 'createSpreadExNihlo',
        value: function createSpreadExNihlo() {
            var newSpread = [];
            for (var i = 0; i < this._tries; i++) {
                newSpread.push(i);
            }
            return newSpread;
        }
    }, {
        key: 'createPossibilities',
        value: function createPossibilities() {
            this.width = this._decisions;
            this.root = new Probability(this);
            this.breadthTraversalInitialize(Possibility, this.root, 1);
            this.root;
        }
    }, {
        key: 'determine',
        value: function determine() {
            var index = this.root.choosePossibility();
            var value = this.toNth(index).determine();
            this.parent;
        }
    }, {
        key: 'actual',
        get: function get() {
            console.log(this.children);
            return this.children.map(function (child) {
                return child.value;
            });
        }
    }]);

    return DeterministicProbability;
})(Tree);

var Probability = (function () {
    function Probability(set) {
        _classCallCheck(this, Probability);

        this._tries = set._maxTries;
        this._decisions = set._spread;
        this._value = set._spread;
        this.initialize();
    }

    _createClass(Probability, [{
        key: 'choosePossibility',
        value: function choosePossibility() {
            var seed = Math.floor(Math.random() * this._unactualized.length);
            var value = this._unactualized.splice(seed, 1);
            return value[0];
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            this._unactualized = [];
            for (var i = 0; i < this._decisions.length; i++) {
                this._unactualized.push(i);
            }
        }
    }, {
        key: 'chooseValue',
        value: function chooseValue() {
            var seed = Math.floor(Math.random() * this._decisions.length);
            var value = this._decisions.splice(seed, 1)[0];
            return value;
        }
    }]);

    return Probability;
})();

var Possibility = (function () {
    function Possibility(probability) {
        _classCallCheck(this, Possibility);

        this.value = false;
        this._probability = probability;
    }

    _createClass(Possibility, [{
        key: 'determine',
        value: function determine() {
            this.value = this._probability.chooseValue();
            return this.value;
        }
    }]);

    return Possibility;
})();

module.exports = DeterministicProbability;

},{"./tree":4}],4:[function(_dereq_,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = (function (_Array) {
	_inherits(Tree, _Array);

	function Tree(branchCount, depth) {
		_classCallCheck(this, Tree);

		_get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this);
		this._branchCount = branchCount;
		this._depth = depth;
		this._level = 0;
		this._node = 0;
	}

	_createClass(Tree, [{
		key: 'deepen',
		value: function deepen(index) {
			if (this.length < index) {
				this.length = index;
			}
		}
	}, {
		key: 'nodesAt',
		value: function nodesAt() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return Math.pow(this._branchCount, level);
		}
	}, {
		key: 'nodesAtIndexed',
		value: function nodesAtIndexed() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return this.nodesAt(level) - 1;
		}
	}, {
		key: 'rootNodeAt',
		value: function rootNodeAt() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return this.nodesAtIndexed(level) / this.adjCount;
		}
	}, {
		key: 'locate',
		value: function locate(level, node) {
			return node + this.nodesAtIndexed(level) / this.adjCount;
		}
	}, {
		key: 'toFirst',
		value: function toFirst() {
			this._level++;
			this._node = this.firstChildNode;
		}
	}, {
		key: 'toLast',
		value: function toLast() {
			this._level++;
			this._node = this.lastChildNode;
		}
	}, {
		key: 'toNth',
		value: function toNth(index) {
			this._level++;
			this._node = this.firstChildNode + index;
			return this.node;
		}
	}, {
		key: 'toParent',
		value: function toParent() {
			this._level--;
			this._node = Math.floor(this._node / this._branchCount);
		}
	}, {
		key: 'goTo',
		value: function goTo() {
			var node = arguments.length <= 0 || arguments[0] === undefined ? this._node : arguments[0];
			var level = arguments.length <= 1 || arguments[1] === undefined ? this._level : arguments[1];

			this._level = level;
			this._node = node;
			return this.node;
		}
	}, {
		key: 'depthTraversalCall',
		value: function depthTraversalCall(callback) {
			callback(this.node);
			for (var i = 0; i < this._branchCount; i++) {
				this.toNth(i);
				if (this.node !== undefined) {
					this.depthTraversalCall(callback);
				}
				this.parent;
			}
		}
	}, {
		key: 'depthTraversalSet',
		value: function depthTraversalSet(value) {
			for (var i = 0; i < this._branchCount; i++) {
				this.toNth(i);
				if (this.node !== undefined) {
					if (typeof value == 'function') {
						this.node = value();
					} else {
						this.node = value;
					}
					this.depthTraversal(value);
				}
				this.parent;
			}
		}
	}, {
		key: 'breadthTraversalCall',
		value: function breadthTraversalCall(callback) {
			var level = arguments.length <= 1 || arguments[1] === undefined ? this._level : arguments[1];

			for (var i = 0, j = this.nodesAt(); i < j; i++) {
				this.toNode(i);
				callback(this.node);
			}
			if (this.length > this.lastChildIndex + 1) {
				this._level++;
				this.breadthTraversal();
			}
		}
	}, {
		key: 'breadthTraversalSet',
		value: function breadthTraversalSet(value, level) {
			this._level = level || this._level;
			for (var i = 0, j = this.nodesAt(); i < j; i++) {
				this.goTo(i, this._level);
				if (typeof value == 'function') {
					this.node = value();
				} else {
					this.node = value;
				}
			}
		}
	}, {
		key: 'breadthTraversalInitialize',
		value: function breadthTraversalInitialize(func, val, level) {
			this._level = level || this._level;
			for (var i = 0, j = this.nodesAt(); i < j; i++) {
				this.goTo(i, this._level);
				this.node = new func(val);
			}
		}
	}, {
		key: 'width',
		set: function set(arg) {
			this._branchCount = arg;
		}
	}, {
		key: 'maxNodes',
		get: function get() {
			return this.nodesAtIndexed(this._depth + 1) / this.adjCount;
		}
	}, {
		key: 'adjCount',
		get: function get() {
			return this._branchCount - 1;
		}
	}, {
		key: 'firstChildNode',
		get: function get() {
			return this._node * this._branchCount;
		}
	}, {
		key: 'firstChildIndex',
		get: function get() {
			return this.locate(this._level + 1, this.firstChildNode);
		}
	}, {
		key: 'lastChildNode',
		get: function get() {
			return this._node * this._branchCount + this.adjCount;
		}
	}, {
		key: 'lastChildIndex',
		get: function get() {
			return this.locate(this._level + 1, this.lastChildNode);
		}
	}, {
		key: 'node',
		set: function set(value) {
			var level = this._level,
			    node = this._node,
			    index = this.locate(level, node);
			this.deepen(index + 1);
			this[this.locate(level, node)] = value;
		},
		get: function get() {
			var level = this._level,
			    node = this._node,
			    index = this.locate(level, node);
			return this[this.locate(level, node)];
		}
	}, {
		key: 'root',
		get: function get() {
			this._level = 0;
			this._node = 0;
			return this.node;
		},
		set: function set(value) {
			this._level = 0;
			this._node = 0;
			this.node = value;
			return this.node;
		}
	}, {
		key: 'parent',
		get: function get() {
			this.toParent();
			return this.node;
		},
		set: function set(arg) {
			this.toParent();
			this.node = arg;
		}
	}, {
		key: 'children',
		get: function get() {
			var children = this.slice(this.firstChildIndex, this.lastChildIndex + 1);
			return children;
		},
		set: function set(vals) {
			vals.length = this._branchCount;
			this.deepen(this.lastChildIndex + 1);
			vals.map(function (item, index) {
				this[this.firstChildIndex + index] = item;
			}, this);
			return this.children;
		}
	}]);

	return Tree;
})(Array);

module.exports = Tree;

},{}]},{},[2])
(2)
});