import React, {Component} from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';

import './TorrentStatus.css'

const TorrentItem = observer(class TorrentItem extends Component {
  _onClick = () => {
    this.props.onDismissTorrent(this.props.torrent);
  }

  render() {
    const torrent = this.props.torrent;
    return (
      <tbody>
      <tr>
        <td><span>{torrent.name}</span>
          {torrent.files.length > 0
            ? torrent.files.map(file =>
              <ul key={file.name}>
                <li>{file.name} - {file.status}</li>
            </ul>)
            : null}
        </td>
        {
          torrent.stats ?
          <div>
            <td>{torrent.stats.speed}</td>
            <td>{torrent.stats.progress === 1 ? 'Complete' : torrent.stats.progress}</td>
          </div>
          :
          null
        }
        <td><input type="button" value="Dismiss" onClick={this._onClick}/></td>
      </tr>
    </tbody>
    )
  }
});

const TorrentStatus = observer(class TorrentStatus extends Component {
  render() {
    const torrents = this.props.torrents;
    return (
      <div>
        <h5 className="title">Results</h5>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Speed</th>
              <th>Progress</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {torrents.map((torrent) =>
            <TorrentItem key={torrent.hash} torrent={torrent} onDismissTorrent={this.dismissTorrent} />
        )}
        </table>
      </div>
    )
  }

  dismissTorrent = action((torrent) => {
    this.props.torrents.remove(torrent);
  })
})

export default TorrentStatus;
