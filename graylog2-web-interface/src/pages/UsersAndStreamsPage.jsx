import React from 'react';
import Reflux from 'reflux';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PermissionsMixin from 'util/PermissionsMixin';
import StoreProvider from 'injection/StoreProvider';
import { DocumentTitle, IfPermitted, PageHeader } from 'components/common';
const UsersStore = StoreProvider.getStore('Users');
const StreamsStore = StoreProvider.getStore('Streams');
import CreateStreamButton from 'components/streams/CreateStreamButton';
import ActionsProvider from 'injection/ActionsProvider';
import UserNotification from 'util/UserNotification';
import Routes from 'routing/Routes';
import ss from 'components/UsersAndStreams.css'
const UsersAndStreamsStore = StoreProvider.getStore('UsersAndStreams');
const IndexSetsStore = StoreProvider.getStore('IndexSets');
const IndexSetsActions = ActionsProvider.getActions('IndexSets');
import EntityList from 'components/common/EntityList.jsx';
import SelectUsersStreams from 'components/common/SelectUsersStreams.jsx';
import SelectStreamsUsers from 'components/common/SelectStreamsUsers.jsx';

const UsersAndStreamsPage = React.createClass({
  mixins: [Reflux.connect(UsersAndStreamsStore), Reflux.connect(IndexSetsStore),PermissionsMixin],
  getInitialState() {
    return {
      usersName: [{}],
      streamsTitleList:  [{}],
      streamsList: [{}],
      streamsUsers: undefined,
      selectedValuePermission: undefined,
      selectedValueIdStream: undefined
    };
  },
  componentDidMount() {
    this.loadUsersName();
    this.loadStreamsTitleList();
    this.loadStreamsList();

  },
  loadUsersName() {
    const promise = UsersStore.loadUsers();
    promise.done((users) => {
      this.setState({
        usersName: users.map(function (user) {
          return { value : user.username , label : user.username }
        }),
      });
    });
  },
  componentDidUpdate(){
    if(this.state.idStreamStore == "" && this.state.change)
    {
      this.setState({streamsUsers : ""})
      this.setState({change : false})
    }
    if(this.state.permissionStore == "" && this.state.change)
    {
      this.setState({streamsUsers : ""})
      this.setState({change : false})
    }
  },
  filterById(user){
    var perm,permissionUser
    var cpt=0

    for(var i=0;i<user.permissions.length;i++){

      if(user.permissions[i].indexOf("streams")>=0 ) {
        perm = user.permissions[i]
        var idStreams = this.state.idStreamStore
        permissionUser = perm.split(":");
        var idStreamsTab = idStreams.split(",")
        for (var j=0; j < idStreamsTab.length; j++) {
          console.log(permissionUser);
          if (permissionUser[permissionUser.length-1].indexOf(idStreamsTab[j]) >= 0) {
           ++cpt
        }
      }
        if(cpt==idStreamsTab.length)
        return user
          }
    }

  },
  loadUsersStreams() {
      const promise = UsersStore.loadUsers();
      promise.done((users) => {
        var arrayUs=users.filter(this.filterById)
          this.setState({
             streamsUsers: arrayUs.map(function (user) {
               return {value: user.username, label: user.username}
           }),
         });
      });
  },
  loadStreamsTitleList() {
    var listeStreams=StreamsStore.listStreamsForAllUsers().then((response) => {
      this.setState({
        streamsTitleList: response.map(function (stream) {
          return { value : stream.id , label : stream.title }
        })
      });
    });
  },
  loadStreamsList() {
    StreamsStore.listStreamsForAllUsers().then((response) => {
      this.setState({
        streamsList: response });
    });
  },

  formatSelectedOptions(permissions, permission, collection) {
    return collection
      .filter(item => this.isPermitted(permissions, [`${permission}:${item.id}`]))
      .map(item => item.title)
      .join(',');
  },

  _onSave(_, stream) {
    StreamsStore.save(stream, () => {
      UserNotification.success('Stream has been successfully created.', 'Success');
    });
  },

  render() {
    const a=["yeeeeeeeeees",'nooooooo']
    if(this.state.idStreamStore && this.state.change) {
      this.loadUsersStreams()
      this.setState({change : false})
    }
    console.log('permissionstore : '+this.state.permissionStore)
    if(this.state.permissionStore)
    var streamReadOptions = this.formatSelectedOptions
    (this.state.permissionStore, 'streams:read', this.state.streamsList);
    return (
      <DocumentTitle title="Users & Streams">
      <div>
        <span>
          <PageHeader title="Users and Streams" subpage>
            <span>Here is the list of users with their streams availables.</span>
            {null}
          </PageHeader>
           <label htmlfor="name">Type or select an user</label>
            <SelectUsersStreams
             name="form-field-name"
             value=""
             options={this.state.usersName}
             multi ={true}
             placeholder= "Type or select an user"
            />
  </span>
        <label htmlFor="name"> Stream(s) available(s)</label>

        <SelectUsersStreams
                placeholder="Choose streams read permissions..."
                value={streamReadOptions}
                multi ={true}
                disabled={true}
        />
        <label htmlfor="name">Type or select a stream</label>

        <SelectStreamsUsers
          name="form-field-name"
          value=""
          options={this.state.streamsTitleList}
          multi ={true}
          placeholder= "Type or select a stream"
        />
        <label htmlfor="name"> User(s) who can see the stream</label>

        <SelectStreamsUsers
          name="form-field-name"
          value={this.state.streamsUsers}
          multi ={true}
          placeholder= "Type or select a stream"
        />

        <IfPermitted permissions="streams:create">
          <CreateStreamButton   ref="createStreamButton" bsSize="large" bsStyle="success" onSave={this._onSave}
                              indexSets={this.state.indexSets}
                                className="createStreamsCss"
                              />
        </IfPermitted>
        <IfPermitted permissions="users:edit">
          <LinkContainer to={Routes.SYSTEM.AUTHENTICATION.USERS.CREATE}>
            <Button bsStyle="success" className="addUserCss">Add new user</Button>
          </LinkContainer>
        </IfPermitted>
      </div>
      </DocumentTitle>
    );
  },

});

export default UsersAndStreamsPage;





