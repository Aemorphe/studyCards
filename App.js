import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Location, Permissions, MapView } from 'expo';



//Screens
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  press() {
    this.props.navigation.navigate('LoginScreen')

  }
  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login to HoHoHo!</Text>
        <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Tap to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
          <Text style={styles.buttonLabel}>Tap to Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }


  register() {
    fetch('https://hohoho-backend.herokuapp.com/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if (json.success) alert('Successfully registered')
      else alert('Registration failed')

      /* do something with responseJson and go back to the Login view but
      * make sure to check for responseJson.success! */
     this.props.navigation.navigate('Login')
    })
    .catch((err) => {
      console.log('error', err)
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{margin: 3, width: 340, borderWidth: 1, height: 40}} 
          placeholder='  Username'
          onChangeText={(username) => this.setState({username: username})}
          />
        
        <TextInput 
          style={{margin: 3, width: 340, borderWidth: 1, height: 40}} 
          placeholder='  Password'
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
        />

        <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={this.register.bind(this)}>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        return this.login(username, password)
      }
      // Don't really need an else clause, we don't do anything in this case.
    })
    .catch(err => {alert(err)})
  }


  login(username, password) {
    fetch('https://hohoho-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if (json.success) {
        alert('Successfully Logged in!');
        this.props.navigation.navigate('Users')
      }
      else {
        alert('Login failed')
      }
    })
    .then(
      AsyncStorage.setItem('user', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }))
    )
    .catch((err) => {
      console.log('error', err)
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{margin: 3, width: 340, borderWidth: 1, height: 40}} 
          placeholder='  Username'
          onChangeText={(username) => this.setState({username: username})}
          />
        
        <TextInput 
          style={{margin: 3, width: 340, borderWidth: 1, height: 40}} 
          placeholder='  Password'
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
        />

        <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={() => this.login(this.state.username, this.state.password)}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Users extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
    headerRight: <Button title='Messages' onPress={ () => {navigation.state.params.onRightPress()} } />
  });

  constructor(props) {
    super(props);
    
    this.state = {
      users: [],
      refreshing: false
    };
  }

  componentDidMount () {
    fetch('https://hohoho-backend.herokuapp.com/users')
    .then((response) => response.json())
    .then((json) => {
      this.setState({users: json.users})
    })
    .then(() => this.props.navigation.setParams({
      onRightPress: this.messages.bind(this)
    }))
    .catch((err) => {
      console.log('error', err)
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    fetch('https://hohoho-backend.herokuapp.com/users')
    .then((response) => response.json())
    .then((json) => {
      this.setState({users: json.users})
    })
    .then(() => this.props.navigation.setParams({
      onRightPress: this.messages.bind(this)
    }))
    .then(() => {
      this.setState({refreshing: false});
    })
    .catch((err) => {
      console.log('error', err)
    });

  }


  touchUser (to) {
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: to._id
      })
    })
    .then((res) => res.json())
    .then((json) => {
      var success;
      json.success ? success = `Your Ho Ho Ho! to ${to.username} has been sent!` : `Your Ho Ho Ho! to ${to.username} could not be sent.`
      Alert.alert(
        'Ho-Ho-Ho',
        success,
        [{text: 'Dismiss'}] // Button
      )
    })

  }

  messages () {
    this.props.navigation.navigate('Messages')
  }

  longTouchUser (to, lat, long) {
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: to._id,
        location: {
          latitude: lat,
          longitude: long
        }
      })
    })
    .then((res) => res.json())
    .then((json) => {
      var success;
      json.success ? success = `Your location to ${to.username} has been sent!` : `Your location to ${to.username} could not be sent.`
      Alert.alert(
        'Send location',
        success,
        [{text: 'Dismiss'}] // Button
      )
    })

  }

  sendLocation = async(user) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Cannot get your current location.')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.longTouchUser(user, location.coords.latitude, location.coords.longitude)
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <ListView
        refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}/>}
        dataSource={ds.cloneWithRows(this.state.users)}
        renderRow={(rowData) => 
          <TouchableOpacity 
            onLongPress={this.sendLocation.bind(this, rowData)}
            delayLongPress={1000}
            onPress={this.touchUser.bind(this, rowData)}>
            <Text style={{margin: 3, borderWidth: 1, fontSize: 15}}>{rowData.username}</Text>
          </TouchableOpacity>}
      />
    )
  }

}

class Messages extends React.Component {
  static navigationOptions = {
    title: 'Messages' //you put the title you want to be displayed here
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount () {
    fetch('https://hohoho-backend.herokuapp.com/messages')
    .then((response) => response.json())
    .then((json) => {
      this.setState({messages: json.messages})
    })
    .catch((err) => {
      console.log('error', err)
    });
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      
      <ListView
        dataSource={ds.cloneWithRows(this.state.messages)}
        renderRow={(aMessage) => {
          // alert(JSON.stringify(aMessage, null, 2))
          if (!aMessage.location) {
            return (
          <View style={{margin: 3, borderWidth: 1, display: 'block'}}>
            <Text>From: {aMessage.from.username}</Text>
            <Text>To: {aMessage.to.username}</Text>
            <Text>Message: Yo</Text>
            <Text>When: {aMessage.timestamp}</Text>
            </View>) } 
            else {
              return (
                <View style={{margin: 3, borderWidth: 1, display: 'block'}}>
                  <Text>From: {aMessage.from.username}</Text>
                  <Text>To: {aMessage.to.username}</Text>
                  <Text>Message: Yo</Text>
                  <Text>When: {aMessage.timestamp}</Text>
                  <MapView style={{height: 100, width: 300}}
                    region={{
                      latitude: aMessage.location.latitude, 
                      longitude: aMessage.location.longitude,
                      latitudeDelta: 1,
                      longitudeDelta: 1}}>
                    <MapView.Marker
                    coordinate={{
                      latitude: aMessage.location.latitude, 
                      longitude: aMessage.location.longitude}}
                    title='Their location'/>
                  </MapView>
                </View>
              )
            }
            
            }}
      />
    )
  }

}


//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  LoginScreen: {
    screen: Login
  },
  Users: {
    screen: Users
  },
  Messages: {
    screen: Messages
  }
}, {initialRouteName: 'Login'});


//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});
