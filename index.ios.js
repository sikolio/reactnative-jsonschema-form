/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Form from './forms/forms';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Animated,
  ActivityIndicator
} from 'react-native';

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const log = (type) => console.log.bind(console, type);

class MyForm extends Component {
  render() {
    return (
      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")} />
    )
  }
}

class MyDefaultInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      bounceValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <Animated.View style={{flex: 1, padding: 10, transform: [{ scale: this.state.bounceValue }]}}>
        <TextInput
          style={{flex: .8}}
          placeholder='Escribe aqui el texto'
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{flex: .8}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </Animated.View>
    )
  }

  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
}

class MySpinner extends Component {
  _timer;

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    }
  }

  componentDidMount() {
    this.setToggleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
      this.setToggleTimeout();
    }, 2000);
  }

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size='large'
      />
    )
  }
}

const SpinnerStyles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8
  }
})

export default class AwesomeProject extends Component {
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <View style={{flex: 1}}>
        <View style={{flex: .2, backgroundColor: 'white'}}/>
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          <MyDefaultInput/>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}}>
          <Form schema={schema}>
          </Form>
        </View>
        <View style={{flex: 3, backgroundColor: 'steelblue'}}>
          <Button
            onPress={onPressedButton}
            title="Press Me"
            accessibilityLabel="See an informative alert"
          />
        </View>
      </View>
    );
  }
}

const onPressedButton = () => {;
  Alert.alert('Button Pressed');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
