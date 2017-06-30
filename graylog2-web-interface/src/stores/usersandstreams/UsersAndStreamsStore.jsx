import Reflux from 'reflux'
import ActionsProvider from 'injection/ActionsProvider';
const UsersAndStreamsActions = ActionsProvider.getActions('UsersAndStreams');



let UsersAndStreamsStore  = Reflux.createStore({

  init(){
   this.listenTo(UsersAndStreamsActions.loadSelectedPermission, this.onloadSelectedPermission);
    this.listenTo(UsersAndStreamsActions.loadSelectedIdStream, this.onloadSelectedIdStream);

  },
  getInitialState() {
    return { permissionStore: "",
              idStreamStore: "",
              change : false
    };
  },
  onloadSelectedPermission(permission){
    this.trigger({permissionStore: permission})
  },
  onloadSelectedIdStream(idStream){
    this.trigger({
      idStreamStore : idStream,
      change: true
    });
  },

});
export default UsersAndStreamsStore
