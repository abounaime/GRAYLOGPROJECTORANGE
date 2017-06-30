import React from 'react';
import ReactSelect from 'react-select';
import Reflux from 'reflux';
import ActionsProvider from 'injection/ActionsProvider';
const UsersAndStreamsActions = ActionsProvider.getActions('UsersAndStreams');
const UsersStore = StoreProvider.getStore('Users');
import StoreProvider from 'injection/StoreProvider';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from 'routing/Routes';
import { Row, Col, Button } from 'react-bootstrap';


const propTypes = ReactSelect.propTypes;
propTypes.onValueChange = React.PropTypes.func;
propTypes.size = React.PropTypes.oneOf(['normal', 'small']);

const SelectStreamsUsers = React.createClass({
  propTypes: propTypes,
  getDefaultProps() {
    return {
      size: 'normal',
    };
  },
  getInitialState() {
    return {
      value: this.props.value,
      idStream: undefined,
      change : false
    };
  },

  componentDidMount() {
    this.reactSelectStyles.use();
    this.reactSelectSmStyles.use();
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  },
  componentWillUnmount() {
    this.reactSelectStyles.unuse();
    this.reactSelectSmStyles.unuse();
  },
  getValue() {
    return this.state.value;
  },
  clearValue() {
    // Clear value needs an event, so we just give it one :grumpy:
    // As someone said: "This can't do any more harm that we already do"
    this.refs.select.clearValue(new CustomEvent('fake'));
  },
  _onChange(value) {
    this.setState({value: value});
    this.setState({idStream: value, change : true})
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  },
  componentDidUpdate(){
    if ( this.state.change) {
      UsersAndStreamsActions.loadSelectedIdStream(this.state.idStream);
      this.setState({ change : false})
    }
  },

  editUser(username){
    var URL = window.location.href;
    console.log(URL)
    var urlModifie=URL.split('/')
    var taille=urlModifie.length
    window.location = "http://"+urlModifie[taille-2]+"/system/authentication/users/edit/"+username.value
  },
  reactSelectStyles: require('!style/useable!css!react-select/dist/default.css'),
  reactSelectSmStyles: require('!style/useable!css!./Select.css'),
  render() {

    // eslint-disable-next-line no-unused-vars
    const { onValueChange, size, ...reactSelectProps } = this.props;

    return (

      <div className={size === 'small' ? 'select-sm' : ''}>
        <ReactSelect ref="select" onChange={this._onChange} {...reactSelectProps}
                     onOptionLabelClick={this.editUser}   value={this.state.value}
        />
      </div>
    );
  },
});

export default SelectStreamsUsers;
