import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import ReactCountdownClock from 'react-countdown-clock';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
    constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ''},
      currentCount: 5,
      clockHidden: true,
      songInfoHidden: true
    }
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.searchTracks = this.searchTracks.bind(this);
  }

  getNowPlaying(){
  spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response)
      this.setState({
        nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
      });
      this.searchTracks();
    })
  }

  searchTracks(){
    var trackName = this.state.nowPlaying.name;
    var searchTerm = trackName.split(' ', 1);
    spotifyApi.searchTracks(searchTerm)
    .then((data) => {
      console.log('Search by "' + searchTerm + '"', data.body);
    }, function(err) {
      console.error(err);
    });
  }

  getHashParams(){
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  toggleClock(){
    this.setState({
      clockHidden: !this.state.clockHidden
    });
  }

  toggleInfo(){
    this.toggleClock();
    this.setState({
      songInfoHidden: !this.state.songInfoHidden
    });
  }

  buttonClick(e){
    this.getNowPlaying();
    this.toggleClock();
  }

  render() {
    return (
      <div className="App">
        <h1>Login to Spotify to use Name That Tune</h1>
        <a href="http://localhost:8888">Login to Spotify</a>
          <div>
            {this.state.loggedIn && !this.state.clockHidden &&
              <ReactCountdownClock
                seconds={5}
                color='#34E543'
                alpha={0.9}
                size={720}
                onComplete={() => this.toggleInfo()}
              />}
            {this.state.loggedIn && !this.state.songInfoHidden &&
              <div>
                Now Playing: { this.state.nowPlaying.name }
              </div>}
              {this.state.loggedIn && !this.state.songInfoHidden &&
              <div>
                <img src={this.state.nowPlaying.albumArt} style={{ height: 650 }}/>
              </div>}
            {this.state.loggedIn &&
              <button onClick={() => this.buttonClick()}>
                Check Now Playing
              </button>
            }
        </div>
      </div>
    );
  }
}

export default App;
