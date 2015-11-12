var Deps = require('../structures/manifest'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Context = require('./context.jsx'); 


  ReactDOM.render(
    <Context />,
    document.getElementById('game')
  );
