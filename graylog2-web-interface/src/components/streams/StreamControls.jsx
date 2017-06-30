import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { IfPermitted } from 'components/common';
import StreamForm from './StreamForm';
import PermissionsMixin from 'util/PermissionsMixin';

import StoreProvider from 'injection/StoreProvider';
import CombinedProvider from 'injection/CombinedProvider';
const { StreamsStore } = CombinedProvider.get('Streams');
const StartpageStore = StoreProvider.getStore('Startpage');

const StreamControls = React.createClass({
  propTypes: {
    stream: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    indexSets: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onClone: React.PropTypes.func.isRequired,
    onQuickAdd: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    isDefaultStream: React.PropTypes.bool,
  },
  mixins: [PermissionsMixin],
  getInitialState() {
    return {};
  },
  _onDelete(_, event) {
    event.preventDefault();
    this.props.onDelete(this.props.stream);
  },
  _onEdit(_, event) {
    event.preventDefault();
    this.refs.streamForm.open();
  },
  _onClone(_, event) {
    event.preventDefault();
    this.refs.cloneForm.open();
  },
  _onCloneSubmit(_, stream) {
    this.props.onClone(this.props.stream.id, stream);
  },
  _onQuickAdd(_, event) {
    event.preventDefault();
    this.props.onQuickAdd(this.props.stream.id);
  },
  _setStartpage(_, event) {
    event.preventDefault();
    StartpageStore.set(this.props.user.username, 'stream', this.props.stream.id);
  },
  addToFav(idStream,data){

    if(idStream)
      StreamsStore.addToFav(idStream,data)

  },
  removeFromFav(idStream,data){

    if(idStream)
      StreamsStore.modif(idStream,data)


  },
  render() {
    const stream = this.props.stream;
    var favoris
    if(this.props.stream.isFavoriteStream){
      favoris =<MenuItem key={`deleteStream-${stream.id}`} onSelect={
        this.removeFromFav.bind(this,this.props.stream.id,{
          title : this.props.stream.title,
          description : this.props.stream.description,
          remove_matches_from_default_stream :this.props.stream.remove_matches_from_default_stream,
          isFavoriteStream : this.props.stream.isFavoriteStream,
          index_set_id : this.props.stream.index_set_id,
        })}>
        Remove from to favorites
      </MenuItem>}
    else {
    favoris =<MenuItem key={`deleteStream-${stream.id}`} onSelect={
      this.addToFav.bind(this,this.props.stream.id,{
        title : this.props.stream.title,
        description : this.props.stream.description,
        remove_matches_from_default_stream :this.props.stream.remove_matches_from_default_stream,
        isFavoriteStream : this.props.stream.isFavoriteStream,
        index_set_id : this.props.stream.index_set_id,
      })}>
      Add to favorites
    </MenuItem>}

    return (
      <span>
        <DropdownButton title="More Actions" ref="dropdownButton" pullRight
                        id={`more-actions-dropdown-${stream.id}`} disabled={this.props.isDefaultStream}>
          {favoris}
          <IfPermitted permissions={`streams:edit:${stream.id}`}>
            <MenuItem key={`editStreams-${stream.id}`} onSelect={this._onEdit}>Edit stream</MenuItem>
          </IfPermitted>
          <IfPermitted permissions={`streams:edit:${stream.id}`}>
            <MenuItem key={`quickAddRule-${stream.id}`} onSelect={this._onQuickAdd}>Quick add rule</MenuItem>
          </IfPermitted>
          <IfPermitted permissions={['streams:create', `streams:read:${stream.id}`]}>
            <MenuItem key={`cloneStream-${stream.id}`} onSelect={this._onClone}>Clone this stream</MenuItem>
          </IfPermitted>
          <MenuItem key={`setAsStartpage-${stream.id}`} onSelect={this._setStartpage} disabled={this.props.user.read_only}>
            Set as startpage
          </MenuItem>
          <IfPermitted permissions={`streams:edit:${stream.id}`}>
            <MenuItem key={`divider-${stream.id}`} divider />
          </IfPermitted>
          <IfPermitted permissions={`streams:edit:${stream.id}`}>
            <MenuItem key={`deleteStream-${stream.id}`} onSelect={this._onDelete}>
              Delete this stream
            </MenuItem>
          </IfPermitted>

        </DropdownButton>
        <StreamForm ref="streamForm" title="Editing Stream" onSubmit={this.props.onUpdate} stream={stream} indexSets={this.props.indexSets} />
        <StreamForm ref="cloneForm" title="Cloning Stream" onSubmit={this._onCloneSubmit} indexSets={this.props.indexSets} />
      </span>
    );
  },
});

export default StreamControls;
