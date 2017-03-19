import React, { Component } from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { beginDropboxUpload } from './dropboxUpload';
import actions from './actions';
import utils from './utils';
import TorrentStatus from './TorrentStatus.jsx';

const App = observer(class App extends Component {
  render() {
    const store = this.props.store;
    return (
      <div className="container">
        <DevTools />
        <div className="row">
          <div className="col-sm-7 col-sm-offset-3">
            <h3>
              <span className="glyphicon glyphicon-save title-icon" aria-hidden="true"></span>
                 Torrent to Dropbox
            </h3>
          </div>
        </div>
        <div className="row">
          <form className="form-horizontal" onSubmit={this.addTorrent}>
            <div className="form-group">
              <div className="col-sm-7 col-sm-offset-3">
                <input className="form-control" type="text" placeholder="Enter magnet URI" id="magnet_link" name="magnet"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-7 col-sm-offset-3">
                <div className="checkbox">
                  <label>
                    <input type="checkbox"/> Upload to Dropbox
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-7 col-sm-offset-3">
                <button type="submit" className="btn btn-primary">Download</button>
              </div>
            </div>
          </form>
        </div>
        {store.torrents.length > 0 ?
          <TorrentStatus torrents={ store.torrents } />
          : null}
      </div>
    );
  }

  componentDidMount() {
    actions.socket.on('download:start', this.torrentDownloadStart);
    actions.socket.on('download:progress', this.torrentDownloadProgress);
    actions.socket.on('download:complete', this.torrentDownloadComplete);
  }

  torrentDownloadStart = (torrent) => {
    const store = this.props.store;
    store.addTorrent(torrent);
  }

  torrentDownloadProgress = (torrent) => {
    const store = this.props.store;
    store.mergeTorrentInfo(torrent);
  }

  torrentDownloadComplete = (torrent) => {
    const store = this.props.store;
    store.mergeTorrentInfo(torrent);
    beginDropboxUpload(store, torrent);
  }

  addTorrent = (event) => {
    // Prevent the default action for form submission
    event.preventDefault();
    const store = this.props.store;
    // Get the form object and extract the FormData from it
    // This returns the value of the magnet field
    var magnetValue = new FormData(event.target).get('magnet');
    if (!(utils.isValidMagnetURI(magnetValue))) {
      return store.setStatus('Please enter a valid magent URI');
    }
    store.incrementPendingRequests();
    actions.postMagnetURI(store, magnetValue);
  }
});

export default App;
