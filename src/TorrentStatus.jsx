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
        <div className="row">
          <h3 className="col-sm-7 col-sm-offset-3">Torrents</h3>
        </div>
        <div className="row">
          <div className="col-sm-7 col-sm-offset-3">
            {torrents.map((torrent) =>
              <div className="panel panel-default" key={torrent.hash}>
                <div className="panel-body">
                  <div className="row">
                    <h5 className="col-sm-5 title-overflow">{torrent.name}</h5>
                    <span className="col-sm-7 text-right">
                      {torrent.stats ? `${(torrent.stats.progress * 100).toFixed(2)}% - ${torrent.stats.speed.toFixed(2)}B/s` : null}
                    </span>
                  </div>
                  </div>
                </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-7 col-sm-offset-3">
              {torrents.map((torrent) =>
                <TorrentItem key={torrent.hash} torrent={torrent} onDismissTorrent={this.dismissTorrent} />
            )}
          </div>
        </div>
      </div>
    )
  }

  dismissTorrent = action((torrent) => {
    this.props.torrents.remove(torrent);
  })
})

export default TorrentStatus;
