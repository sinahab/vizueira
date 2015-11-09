var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Context = require('./context.jsx'),
    Observe = require('./observer').observe;    


Observe(function (coordinates) {
  ReactDOM.render(
    <Context coordinates={coordinates} />,
    document.getElementById('game')
  );
});