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
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term){
    console.log(term);
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);

  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  render(){
    return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}/>
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
