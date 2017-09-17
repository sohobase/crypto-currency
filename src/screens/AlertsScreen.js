import { arrayOf, func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { addAlertAction, removeAlertAction } from '../actions';
import { C, STYLE, THEME } from '../config';
import { AlertListItem, Button, ButtonIcon, Modal } from '../components';
import styles from './AlertsScreen.style';

const keyExtractor = ({ currency, low, high }) => `${currency}${low}${high}${new Date()}`;

class AlertsScreen extends Component {
  static navigationOptions({ navigation: { state } }) {
    const { currency = {}, _showAlert } = state.params || {};

    return {
      title: `${currency.name} Alerts`,
      headerRight: <ButtonIcon icon="add" onPress={() => { _showAlert(); }} />,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
      modal: false,
    };
    this._closeAlert = this._closeAlert.bind(this);
    this._onChangeAmount = this._onChangeAmount.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._saveAlert = this._saveAlert.bind(this);
    this._showAlert = this._showAlert.bind(this);
  }

  componentDidMount() {
    const { _showAlert } = this;
    const { navigation } = this.props;

    navigation.setParams({ _showAlert });
  }

  _closeAlert() {
    this.setState({ modal: false, item: undefined });
  }

  _saveAlert() {
    const { _closeAlert } = this;
    const { addAlert, removeAlert, currency: { symbol } } = this.props;
    const { item = {} } = this.state;

    if (item.currency) removeAlert(item);
    else addAlert({ ...item, currency: symbol });
    _closeAlert();
  }

  _showAlert(item) {
    this.setState({ item, modal: item === undefined });
  }

  _onChangeAmount(field, value) {
    const { item = {} } = this.state;

    this.setState({
      item: { ...item, [field]: parseFloat(value) },
    });
  }

  _renderItem({ item }) {
    const { _showAlert } = this;
    return (
      <AlertListItem alert={item} onPress={() => _showAlert(item)} />
    );
  }

  render() {
    const { _closeAlert, _onChangeAmount, _renderItem, _saveAlert } = this;
    const { alerts } = this.props;
    const { item, modal } = this.state;

    const inputProps = {
      containerStyle: styles.fieldReset,
      keyboardType: 'numeric',
      underlineColorAndroid: THEME.PRIMARY,
    };

    return (
      <View style={STYLE.SCREEN}>
        <Modal
          title={`${modal ? 'New' : 'Edit'} alert`}
          onClose={_closeAlert}
          visible={modal || item !== undefined}
        >
          <View style={[STYLE.ROW]}>
            <View style={styles.fieldset}>
              <FormLabel labelStyle={[styles.fieldReset]}>Low</FormLabel>
              <FormInput
                autoFocus={modal}
                defaultValue={item && item.low && item.low.toString()}
                inputStyle={styles.input}
                onChangeText={_onChangeAmount.bind(null, 'low')} //eslint-disable-line
                ref={input => this.low = input} //eslint-disable-line
                {...inputProps}
              />
            </View>
            <View style={styles.fieldset}>
              <FormLabel labelStyle={[styles.fieldReset, styles.labelRight]}>High</FormLabel>
              <FormInput
                defaultValue={item && item.high && item.high.toString()}
                inputStyle={[styles.input, styles.inputRight]}
                onChangeText={_onChangeAmount.bind(null, 'high')} //eslint-disable-line
                ref={input => this.high = input} //eslint-disable-line
                {...inputProps}
              />
            </View>
          </View>
          <Button
            caption={item && item.currency ? 'Delete' : 'Save'}
            onPress={() => { _saveAlert(); }}
            style={[STYLE.MODAL_BUTTON, styles.modalButton]}
          />
        </Modal>
        <FlatList data={alerts} keyExtractor={keyExtractor} renderItem={_renderItem} />
      </View>
    );
  }
}

AlertsScreen.propTypes = {
  addAlert: func,
  alerts: arrayOf(C.SHAPE.ALERT),
  currency: C.SHAPE.CURRENCY,
  navigation: C.SHAPE.NAVIGATION,
  removeAlert: func,
};

AlertsScreen.defaultProps = {
  addAlert() {},
  alerts: [],
  currency: undefined,
  navigation: undefined,
  removeAlert() {},
};

const mapStateToProps = ({ alerts = [] }, props) => {
  const { currency = {} } = props.navigation.state.params;

  return {
    currency,
    alerts: alerts.filter(item => currency.symbol === item.currency),
  };
};

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(addAlertAction(alert)),
  removeAlert: alert => dispatch(removeAlertAction(alert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);
