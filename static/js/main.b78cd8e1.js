'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./App.css');

var _spotifyWebApiJs = require('spotify-web-api-js');

var _spotifyWebApiJs2 = _interopRequireDefault(_spotifyWebApiJs);

var _reactCountdownClock = require('react-countdown-clock');

var _reactCountdownClock2 = _interopRequireDefault(_reactCountdownClock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var spotifyApi = new _spotifyWebApiJs2.default();

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    var params = _this.getHashParams();
    var token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    _this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      currentCount: 5,
      clockHidden: true,
      songInfoHidden: true,
      answer: ''
    };
    _this.getNowPlaying = _this.getNowPlaying.bind(_this);
    _this.getHashParams = _this.getHashParams.bind(_this);
    _this.toggleClock = _this.toggleClock.bind(_this);
    _this.toggleInfo = _this.toggleInfo.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'getNowPlaying',
    value: function getNowPlaying() {
      var _this2 = this;

      spotifyApi.getMyCurrentPlaybackState().then(function (response) {
        console.log(response);
        _this2.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      });
    }
  }, {
    key: 'getHashParams',
    value: function getHashParams() {
      var hashParams = {};
      var e,
          r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      return hashParams;
    }
  }, {
    key: 'toggleClock',
    value: function toggleClock() {
      this.setState({
        clockHidden: !this.state.clockHidden
      });
    }
  }, {
    key: 'toggleInfo',
    value: function toggleInfo() {
      this.toggleClock();
      this.setState({
        songInfoHidden: !this.state.songInfoHidden
      });
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick(e) {
      this.getNowPlaying();

      if (this.state.songInfoHidden) {
        this.toggleClock();
      } else {
        this.toggleInfo();
        this.setState({
          answer: ''
        });
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({
        answer: event.target.value
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.toggleInfo();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(
          'div',
          { className: 'MainHeader' },
          !this.state.loggedIn && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              null,
              'Login to Spotify to use Name That Tune'
            )
          ),
          this.state.loggedIn && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              null,
              'Name That Tune'
            )
          ),
          _react2.default.createElement(
            'a',
            { href: 'http://localhost:8888' },
            'Request Access From Spotify'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'Body' },
          _react2.default.createElement('hr', null),
          this.state.loggedIn && !this.state.clockHidden && _react2.default.createElement(_reactCountdownClock2.default, {
            seconds: 30,
            color: '#5CC8FF',
            alpha: 0.9,
            size: 720,
            onComplete: function onComplete() {
              return _this3.toggleInfo();
            }
          }),
          this.state.loggedIn && !this.state.songInfoHidden && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              { className: 'Header' },
              'How Did You Do?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'NowPlaying' },
              'Now Playing: ',
              this.state.nowPlaying.name
            )
          ),
          _react2.default.createElement('br', null),
          this.state.loggedIn && !this.state.songInfoHidden && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: this.state.nowPlaying.albumArt, style: { height: 650 } })
          ),
          this.state.loggedIn && !this.state.clockHidden && _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement('input', { type: 'text', value: this.state.answer, placeholder: 'Enter Your Answer Here', onChange: this.handleChange })
            ),
            _react2.default.createElement('input', { type: 'submit', value: 'Check Answer' })
          ),
          _react2.default.createElement('br', null),
          this.state.loggedIn && !this.state.songInfoHidden && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              null,
              'Your Answer:',
              _react2.default.createElement('br', null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'Answer' },
              this.state.answer
            )
          ),
          _react2.default.createElement('br', null),
          this.state.loggedIn && _react2.default.createElement(
            'button',
            { className: 'NowPlayingButton', onClick: function onClick() {
                return _this3.buttonClick();
              } },
            'Check Now Playing'
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;
