import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import React from'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name: 'name1', artist: 'art1', album: 'album1', id: 1}, 
                      {name: 'name2', artist: 'art2', album: 'album2', id: 2}, 
                      {name: 'name3', artist: 'art3', album: 'album3', id: 3}],
      playlistName: 'PLAYLIST',
      playlistTracks: []
    }
    this.addTrack.bind(this);
    this.removeTrack.bind(this);
    this.updatePlaylistName.bind(this);
    this.savePlaylist.bind(this);
  }

  savePlaylist(){
    const trackURI = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

  }

  updatePlaylistName(name){
    this.state.playlistName = name;
  }
  
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTracks => playlistTracks.id !== track.id)
    });
  }

  render(){
    return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} 
                        playlistTracks={this.state.playlistTracks} 
                        onRemove={this.removeTrack} 
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                        />
            </div>
          </div>
        </div>
      );
  }
}

export default App;
