!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.structures||(f.structures={})).tree=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = (function (_Array) {
	_inherits(Tree, _Array);

	function Tree(branchCount, depth) {
		_classCallCheck(this, Tree);

		_get(Object.getPrototypeOf(Tree.prototype), "constructor", this).call(this);
		this._branchCount = branchCount;
		this._depth = depth;
		this._level = 0;
		this._node = 0;
	}

	_createClass(Tree, [{
		key: "deepen",
		value: function deepen(index) {
			if (this.length < index) {
				this.length = index;
			}
		}
	}, {
		key: "nodesAt",
		value: function nodesAt() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return Math.pow(this._branchCount, level);
		}
	}, {
		key: "nodesAtFloored",
		value: function nodesAtFloored() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return this.nodesAt(level) - 1;
		}
	}, {
		key: "rootNodeAt",
		value: function rootNodeAt() {
			var level = arguments.length <= 0 || arguments[0] === undefined ? this._level : arguments[0];

			return this.nodesAtFoored(level) / this.adjCount;
		}
	}, {
		key: "locate",
		value: function locate(level, node) {
			return node + this.nodesAtFloored(level) / this.adjCount;
		}
	}, {
		key: "toFirst",
		value: function toFirst() {
			this._level++;
			this._node = this.firstChildNode;
		}
	}, {
		key: "toLast",
		value: function toLast() {
			this._level++;
			this._node = this.lastChildNode;
		}
	}, {
		key: "toParent",
		value: function toParent() {
			this._level--;
			this._node = Math.floor(this._node / this._branchCount);
		}
	}, {
		key: "goTo",
		value: function goTo() {
			var node = arguments.length <= 0 || arguments[0] === undefined ? this._node : arguments[0];
			var level = arguments.length <= 1 || arguments[1] === undefined ? this._level : arguments[1];

			this._level = level;
			this._node = node;
			return this.node;
		}
	}, {
		key: "maxNodes",
		get: function get() {
			return this.nodesAtFloored(this._depth + 1) / this.adjCount;
		}
	}, {
		key: "adjCount",
		get: function get() {
			return this._branchCount - 1;
		}
	}, {
		key: "firstChildNode",
		get: function get() {
			return this._node * this._branchCount;
		}
	}, {
		key: "firstChildIndex",
		get: function get() {
			return this.locate(this._level + 1, this.firstChildNode);
		}
	}, {
		key: "lastChildNode",
		get: function get() {
			return this._node * this._branchCount + this.adjCount;
		}
	}, {
		key: "lastChildIndex",
		get: function get() {
			return this.locate(this._level + 1, this.lastChildNode);
		}
	}, {
		key: "node",
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
			this.deepen(index + 1);
			return this[this.locate(level, node)];
		}
	}, {
		key: "root",
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
		key: "parent",
		get: function get() {
			this.toParent();
			return this.node;
		},
		set: function set(arg) {
			this.toParent();
			this.node = arg;
		}
	}, {
		key: "children",
		get: function get() {
			this.deepen(this.lastChildIndex + 1);
			var children = this.slice(this.firstChildIndex, this.lastChildIndex + 1);
			return children;
		},
		set: function set(vals) {
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

},{}]},{},[1])
(1)
});