import React from 'react';
import ReactSelect from 'react-select';
import Reflux from 'reflux';
import ActionsProvider from 'injection/ActionsProvider';
const UsersAndStreamsActions = ActionsProvider.getActions('UsersAndStreams');
const UsersStore = StoreProvider.getStore('Users');
import StoreProvider from 'injection/StoreProvider';


const propTypes = ReactSelect.propTypes;
propTypes.onValueChange = React.PropTypes.func;
propTypes.size = React.PropTypes.oneOf(['normal', 'small']);

const SelectUsersStreams = React.createClass({
  propTypes: propTypes,
  getDefaultProps() {
    return {
      size: 'normal',
    };
  },
  getInitialState() {
    return {
      value: this.props.value,
      permission: "",
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
  componentDidUpdate(){

  },
  clearValue() {
    // Clear value needs an event, so we just give it one :grumpy:
    // As someone said: "This can't do any more harm that we already do"
    this.refs.select.clearValue(new CustomEvent('fake'));
  },
  componentDidUpdate(){
    if (this.state.permission && this.state.change) {
      UsersAndStreamsActions.loadSelectedPermission(this.state.permission);
      console.log("action lancé"+this.state.permission)
      this.setState({ change : false})
    }
  },
  _onChange(value) {
    this.setState({
      permission: ""
    })
    var splitsentence = value.split(",");
    var length= splitsentence.length
    for(var i=0;i<splitsentence.length;i++) {
      const promise = UsersStore.load(splitsentence[i])
      promise.done((users) => {
        this.setState({
          permission: this.state.permission + "," + users.permissions,
          change : true
        });
      });
    }
    this.setState({value: value});

    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  },
  reactSelectStyles: require('!style/useable!css!react-select/dist/default.css'),
  reactSelectSmStyles: require('!style/useable!css!./Select.css'),
  render() {
    // eslint-disable-next-line no-unused-vars
    const { onValueChange, size, ...reactSelectProps } = this.props;

    return (
      <div className={size === 'small' ? 'select-sm' : ''}>
        <ReactSelect ref="select" onChange={this._onChange} {...reactSelectProps} value={this.state.value}

        />
      </div>
    );

  },
});

export default SelectUsersStreams;
