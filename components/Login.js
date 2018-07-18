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
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';



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
         <Text style={styles.textBig}>COOLEST</Text>
         <Text style={styles.textBigger}>StudyCard</Text>
         <Text>{"\n\n\n\n"}</Text>
         <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonLightGray]}>
           <Text style={styles.buttonLabel}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={ () => {this.register()} }>
           <Text style={styles.buttonLabel}>New User</Text>
         </TouchableOpacity>
       </View>
     )
   }
}


class RegisterScreen extends React.Component {

    constructor() {
      super()
      this.state = {
        username: '',
        password: '',
        email: '',
      }
    }


  register() {
    console.log('Hi',this.state)  
    fetch('https://intelligent-croissant-96469.herokuapp.com/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email:this.state.email,
        })
        
      })
      .then((response) => {
          console.log(JSON.stringify(response.json()))
          if (json.success) alert('Successfully registered! Here you go')
          else alert('Registration failed')
  
          /* do something with responseJson and go back to the Login view but
          * make sure to check for responseJson.success! */
         this.props.navigation.navigate('Login')
          return response.json()
      })
    //   .then((json) => {
    //       console.log('response',json)

    //   })
      .catch((err) => {
        console.log('error', err)
      });
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.alltext}>Username</Text>
        <TextInput
          style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
          placeholder='  Username'
          onChangeText={(username) => this.setState({username: username})}
        />
        <Text style={styles.alltext}>Password</Text>
        <TextInput
          style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
          placeholder='  Password'
          onChangeText={(password) => this.setState({password: password})}
          secureTextEntry={true}
        />
         <Text style={styles.alltext}>Email</Text>
        <TextInput
          style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
          placeholder='  Email'
          onChangeText={(email) => this.setState({email: email})}
          
        />
        <Text>{"\n\n\n\n"}</Text>
        <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={this.register.bind(this)}>
          <Text style={styles.buttonLabel}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}



class Login extends React.Component {
 
    constructor() {
      super()
      this.state = {
        username: '',
        password: ''
      }
    }

    login(username, password) {
      fetch('https://intelligent-croissant-96469.herokuapp.com/login', {
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
          this.props.navigation.navigate('Home')
        }
        else {
          alert('Login failed')
        }
      })
      .then(
        AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }))
      )
      .catch((err) => {
        console.log('error', err)
      });
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.alltext}>Username</Text>
          <TextInput
            style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
            placeholder='  Username'
            onChangeText={(username) => this.setState({username: username})}
          />
          <Text style={styles.alltext}>Password</Text>
          <TextInput
            style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
            placeholder='  Password'
            onChangeText={(password) => this.setState({password: password})}
            secureTextEntry={true}
          />
          <Text>{"\n\n\n\n"}</Text>
          <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={() => this.login(this.state.username, this.state.password)}>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  export default StackNavigator({
        Login: {
          screen: LoginScreen,
        },
        Register: {
          screen: RegisterScreen,
        },
        LoginScreen:{
          screen:Login,
        },
      }, {initialRouteName: 'Login'});



  const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ff7733',
        },
        containerFull: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: '#ff7733',
        },
        welcome: {
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        },
        instructions: {
          textAlign: 'center',
          color: '#5E3D3D',
          marginBottom: 5,
        },
        button: {
          alignSelf: 'stretch',
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: 10,
          marginLeft: 75,
          marginRight: 75,
          borderRadius: 5
        },
        buttonLightGray: {
          backgroundColor: '#ffffff',
        },
        buttonLabel: {
          textAlign: 'center',
          fontSize: 16,
          color: '#ff7733'
        },
        textBig: {
          fontSize: 34,
          fontWeight:'bold',
          textAlign: 'center',
          margin: 10,
          color:'#ffffff'
        },
        textBigger: {
          fontSize: 40,
          fontWeight:'bold',
          textAlign: 'center',
          margin: 10,
          color:'#ffffff'
        },
        alltext:{
          fontSize: 20,
          fontWeight:'bold',
          margin: 10,
          color:'#ff7733'
        }
      });