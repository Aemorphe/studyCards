import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import styles from './styles'


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
  static navigationOptions = {
    title: 'Register'
  };

    constructor() {
      super()
      this.state = {
        username: '',
        password: '',

      }
    }



register() {
      fetch('https://intelligent-croissant-96469.herokuapp.com/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email:this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) alert('Successfully registered! Here you go')
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
        <TextInput
          style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
          placeholder='  Email'
          onChangeText={(email) => this.setState(
            {email: email})}
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
          this.props.navigation.navigate('MainPage')
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


  class MainPage extends React.Component{
        static navigationOptions = {
          title: 'Cards'
        };
    
        constructor(props){
          super(props);
          this.state={
            author:'',
            title:'',
            subject:'',
            cards:[],
          }
        }
        
        addSet(){
         this.props.navigation.navigate('addCard')
      }
    
  
      render(){
        return(
          <View>
              <Header
               leftComponent={{icon:'menu',color:'#fff'}}
               centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}/>
              <TextInput placeholder="Create a new set..." onChangeText={(text)=>this.setState({newSet:text})}
              ></TextInput>
               <TouchableOpacity onPress={ () => {this.addSet()}}>
                <Text>Add</Text>
               </TouchableOpacity>
          </View>
        )
      }
    
     
class MyCardSet extends React.Component {

          //   static navigationOptions = ({navigation}) =>{
          //     return {
          //    // headerTitle:<MyCardHeader />,
          //     headerRight: (    )
          //   }
          // }
          constructor(props){
            super(props)
            const ds = new ListView.DataSource({
              rowHasChanged:(r1, r2) =>r1 !== r2
            });
            this.state ={
              dataSourse: ds.cloneWithRows(list),
            }
          }
        
        
          displaySets(subject){
            fetch('https://intelligent-croissant-96469.herokuapp.com/subjects')
            // this.props.navigation.navigate('SingleCard', {course:[subject]})
          }
        
        
            render() {
              return (
              // list.map((l, i) => (
              <View>
              <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
              />
              <ListView
                dataSource={this.state.dataSourse}
                renderRow={(rowData)=> <TouchableOpacity>
                    <Text onPress={this.displaySets(rowData)}>{rowData.course}</Text>
                  </TouchableOpacity>
                }
              //   }
              //   key={i}
              //     leftAvatar={{ source: { course: l.course } }}
              //     title={l.term}
              //     subtitle={l.course}
                />
              </View>
              )
            }
          }
        

    class addNewCard extends React.Component{
      static navigationOptions = {
        title: 'Add Card'
      }
    
      state = {
        question: '',
        answer: ''
      }
    
      handleSubmit() {
        let key = this.props.card.title
        let question = this.state.question
        let answer =  this.state.answer
        let questions = [ { question, answer }]
    
        this.props.addCard(key, questions)
        
        this.setState(() => ({ question: '', answer: '' }))
        this.props.navigation.goBack()
      }
    
      render() {
        return (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.content}>
              <Text style={styles.title}>Add new Card</Text>
              <Text style={styles.label}>Term</Text>
              <TextInput
                style={styles.input}
                onChangeText={(question) => this.setState({ question })}
                value={this.state.text}
              />
              <Text style={styles.label}>Definition</Text>
              <TextInput
                style={styles.input}
                onChangeText={(answer) => this.setState({ answer })}
                value={this.state.text}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={styles.buttonText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )
      }
    }
    

          class MyCard extends React.Component {
                constructor(props){
                  super(props)
                  const courseName = this.props.navigation.getParam('course','Nothing')
                  console.log(courseName)
                  console.log(courseName[0])
                  console.log('This is the second log',courseName[1])
                  const ds = new ListView.DataSource({
                    rowHasChanged:(r1, r2) =>r1 !== r2
                  });
                  this.state ={
                    dataSource: ds.cloneWithRows(courseName),
                  }
                }
            
                showDefinition(){
                  this.props.navigation.navigate('HomePage')
                }
            
            
              render(){
            
                return(
            
                  <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(course)=><TouchableOpacity onPress={this.showDefinition()}>
                  <View>
                    <Text>{course.term}</Text>
                  </View>
                  </TouchableOpacity>
                  }
                  />
              )
              }
              }
    
      
 
  


// Version 1 ------------------------------------------------------------------------------
// //Screens
// class LoginScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Login'
//   };

//   press() {
//     this.props.navigation.navigate('LoginScreen')
//   }
//   register() {
//     this.props.navigation.navigate('Register');
//   }

//   render() {
//      return (
//        <View style={styles.container}>
//          <Text style={styles.textBig}>COOLEST</Text>
//          <Text style={styles.textBigger}>StudyCard</Text>
//          <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonLightGray]}>
//            <Text style={styles.buttonLabel}>Login</Text>
//          </TouchableOpacity>
//          <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={ () => {this.register()} }>
//            <Text style={styles.buttonLabel}>New User</Text>
//          </TouchableOpacity>
//        </View>
//      )
//    }
// }

// class RegisterScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Register'
//   };

//     constructor() {
//       super()
//       this.state = {
//         username: '',
//         password: '',

//       }
//     }



//   register() {
//       fetch('https://hohoho-backend.herokuapp.com/register', {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: this.state.username,
//           password: this.state.password,
//         })
//       })
//       .then((response) => response.json())
//       .then((json) => {
//         if (json.success) alert('Successfully registered! Here you go')
//         else alert('Registration failed')

//         /* do something with responseJson and go back to the Login view but
//         * make sure to check for responseJson.success! */
//        this.props.navigation.navigate('Login')
//       })
//       .catch((err) => {
//         console.log('error', err)
//       });
//     }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.alltext}>Username</Text>
//         <TextInput
//           style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
//           placeholder='  Username'
//           onChangeText={(username) => this.setState({username: username})}
//         />
//         <Text style={styles.alltext}>Password</Text>
//         <TextInput
//           style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
//           placeholder='  Password'
//           onChangeText={(password) => this.setState({password: password})}
//           secureTextEntry={true}
//         />
//         <Text>{"\n\n\n\n"}</Text>
//         <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={this.register.bind(this)}>
//           <Text style={styles.buttonLabel}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }



// class Login extends React.Component {
//   static navigationOptions = {
//     title: 'Login'
//   };

//     constructor() {
//       super()
//       this.state = {
//         username: '',
//         password: ''
//       }
//     }

//     login(username, password) {
//       fetch('https://hohoho-backend.herokuapp.com/login', {
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password
//         })
//       })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json)
//         if (json.success) {
//           alert('Successfully Logged in!');
//           this.props.navigation.navigate('MainPage')
//         }
//         else {
//           alert('Login failed')
//         }
//       })
//       .then(
//         AsyncStorage.setItem('user', JSON.stringify({
//           username: this.state.username,
//           password: this.state.password
//         }))
//       )
//       .catch((err) => {
//         console.log('error', err)
//       });
//     }

//     render() {
//       return (
//         <View style={styles.container}>
//           <Text style={styles.alltext}>Username</Text>
//           <TextInput
//             style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
//             placeholder='  Username'
//             onChangeText={(username) => this.setState({username: username})}
//           />
//           <Text style={styles.alltext}>Password</Text>
//           <TextInput
//             style={{margin: 3, width: 250,backgroundColor:'white', height: 40}}
//             placeholder='  Password'
//             onChangeText={(password) => this.setState({password: password})}
//             secureTextEntry={true}
//           />
//           <Text>{"\n\n\n\n"}</Text>
//           <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={() => this.login(this.state.username, this.state.password)}>
//             <Text style={styles.buttonLabel}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       )
//     }
//   }





//   class MainPage extends React.Component{
//     static navigationOptions = {
//       title: 'Cards'
//     };

//     constructor(props){
//       super(props);
//       this.state={
//         newClass:'',
//         newSet:'',
//       }
//     }

//   addSet(){
//     list.push(this.state.newSet)
//     this.props.navigation.navigate('CardsSet')
//   }

//   addClass(){
//     list.push(this.state.newClass)
//   }


//   render(){
//     return(
//       <View>
//           <Header
//            leftComponent={{icon:'menu',color:'#fff'}}
//            centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}/>
//           <TextInput placeholder="Create a new set..." onChangeText={(text)=>this.setState({newSet:text})}
//           ></TextInput>
//            <TouchableOpacity onPress={ () => {this.addSet()}}>
//             <Text>Add</Text>
//            </TouchableOpacity>
//            <TextInput placeholder="Create a new class..." onChangeText={(text)=>this.setState({newClass:text})}
//           ></TextInput>
//            <TouchableOpacity onPress={ () => {this.addSet()}}>
//             <Text>Add</Text>
//            </TouchableOpacity>
//       </View>
//     )
//   }

//   }

//   class AddDeck extends React.Component{
//     state = {
//       text: ''
//     }

//     submitName =() =>{
//       const { text } = this.state

//       saveDeckTitle(text)
//       this.props.dispathch(addDeck(text))
//       this.props.navigation.navigate('DeckView')
//     }

//     render(){
//       return(
//         <View style={styles.container}>
//           <Text>What is the new decks name?</Text>
//           <TextInput onChangeText={(text)=> this.setState({text:text})}
//                   value={this.state.text}> 
//           </TextInput>
//           <Button onPress={this.submitName} title="submit">
//            </Button>
//         </View>
//       )
//     }

//   }


//   class MyCardSet extends React.Component {

//   //   static navigationOptions = ({navigation}) =>{
//   //     return {
//   //    // headerTitle:<MyCardHeader />,
//   //     headerRight: (    )
//   //   }
//   // }
//   constructor(props){
//     super(props)
//     const ds = new ListView.DataSource({
//       rowHasChanged:(r1, r2) =>r1 !== r2
//     });
//     this.state ={
//       dataSourse: ds.cloneWithRows(list),
//     }
//   }


//   displaySets(subject){
//     this.props.navigation.navigate('SingleCard', {course:[subject]})
//   }


//     render() {
//       return (
//       // list.map((l, i) => (
//       <View>
//       <Header
//         leftComponent={{ icon: 'menu', color: '#fff' }}
//         centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}
//         rightComponent={{ icon: 'home', color: '#fff' }}
//       />
//       <ListView
//         dataSource={this.state.dataSourse}
//         renderRow={(rowData)=> <TouchableOpacity>
//             <Text onPress={this.displaySets(rowData)}>{rowData.course}</Text>
//           </TouchableOpacity>
//         }
//       //   }
//       //   key={i}
//       //     leftAvatar={{ source: { course: l.course } }}
//       //     title={l.term}
//       //     subtitle={l.course}
//         />
//       </View>
//       )
//     }
//   }


//   class MyCard extends React.Component {
//     constructor(props){
//       super(props)
//       const courseName = this.props.navigation.getParam('course','Nothing')
//       console.log(courseName)
//       console.log(courseName[0])
//       console.log('This is the second log',courseName[1])
//       const ds = new ListView.DataSource({
//         rowHasChanged:(r1, r2) =>r1 !== r2
//       });
//       this.state ={
//         dataSource: ds.cloneWithRows(courseName),
//       }
//     }

//     showDefinition(){
//       this.props.navigation.navigate('HomePage')
//     }


//   render(){

//     return(

//       <ListView
//       dataSource={this.state.dataSource}
//       renderRow={(course)=><TouchableOpacity onPress={this.showDefinition()}>
//       <View>
//         <Text>{course.term}</Text>
//       </View>
//       </TouchableOpacity>
//       }
//       />
//   )
//   }
//   }


//   class Profile extends React.Component {
//     static navigationOptions = {
//       title: 'Profile'
//     };

//     constructor() {
//       super()
//       this.state = {
//         username: '',
//         password: ''
//       }
//     }

//     componentDidMount () {
//       AsyncStorage.getItem('user')
//       .then(result => {
//         var parsedResult = JSON.parse(result);
//         var username = parsedResult.username;
//         this.setState({username: username});
//       })
//       .catch(err => {alert(err)})
//     }

//       render() {
//         return (
//           <View >
//             <Text style={styles.alltext}>Username: {this.state.username}</Text>
//             <Text style={styles.alltext}>Ready to review?</Text>

//             <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={() => this.login(this.state.username, this.state.password)}>
//               <Text style={styles.buttonLabel}>My Cards</Text>
//             </TouchableOpacity>
//           </View>

//         )

//       }
//     }






//   //Navigator
//   export default StackNavigator({
//     Login: {
//       screen: LoginScreen,
//     },
//     Register: {
//       screen: RegisterScreen,
//     },
//     LoginScreen:{
//       screen:Login,
//     },
//     Profile:{
//       screen:Profile,
//     },
//     MainPage:{
//       screen:MainPage,
//     },
//     CardsSet: {
//       screen: MyCardSet,
//     },
//     SingleCard:{
//       screen:MyCard,
//     }
//   }, {initialRouteName: 'Login'});





//   //Styles
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#ff7733',
//     },
//     containerFull: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'stretch',
//       backgroundColor: '#ff7733',
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     },
//     instructions: {
//       textAlign: 'center',
//       color: '#5E3D3D',
//       marginBottom: 5,
//     },
//     button: {
//       alignSelf: 'stretch',
//       paddingTop: 10,
//       paddingBottom: 10,
//       marginTop: 10,
//       marginLeft: 75,
//       marginRight: 75,
//       borderRadius: 5
//     },
//     buttonLightGray: {
//       backgroundColor: '#ffffff',
//     },
//     buttonLabel: {
//       textAlign: 'center',
//       fontSize: 16,
//       color: '#ff7733'
//     },
//     textBig: {
//       fontSize: 34,
//       fontWeight:'bold',
//       textAlign: 'center',
//       margin: 10,
//       color:'#ffffff'
//     },
//     textBigger: {
//       fontSize: 40,
//       fontWeight:'bold',
//       textAlign: 'center',
//       margin: 10,
//       color:'#ffffff'
//     },
//     alltext:{
//       fontSize: 20,
//       fontWeight:'bold',
//       margin: 10,
//       color:'#ff7733'
//     }
//   });






//Version 0 ---------------------------------------------------------------------------------------

// import React from 'react';
// import { StyleSheet, Text, View, Alert, ListView,TouchableOpacity, TextInput } from 'react-native';
// import { createStackNavigator,StackNavigator } from 'react-navigation';
// import {Header, ListItem, Button, Icon} from 'react-native-elements';


// const list = [
//   {
//     username:'Daisy',
//     cardId:'1',
//     term:'Apple',
//     course:'Biology',
//     definition:'Delicious fruit',
//   },
//   {
//     username:'Abby',
//     cardId:'2',
//     term:'Blue',
//     course:'Physics',
//     definition:'Her fav color'
//   },
//   {
//     username:'Cindy',
//     cardId:'3',
//     term:'Chocolate',
//     course:'Finance',
//     definition:'DIY'
//   }
// ]


// class MainPage extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//       newClass:'',
//       newSet:'',
//     }
//   }

// addSet(){
//   list.push(this.state.newSet)
//   this.props.navigation.navigate('CardsSet')
// }

// addClass(){
//   list.push(this.state.newClass)
// }


// render(){
//   return(
//     <View>
//         <Header
//          leftComponent={{icon:'menu',color:'#fff'}}
//          centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}/>
//         <TextInput placeholder="Create a new set..." onChangeText={(text)=>this.setState({newSet:text})}
//         ></TextInput>
//          <TouchableOpacity onPress={ () => {this.addSet()}}>
//           <Text>Add</Text>
//          </TouchableOpacity>
//          <TextInput placeholder="Create a new class..." onChangeText={(text)=>this.setState({newClass:text})}
//         ></TextInput>
//          <TouchableOpacity onPress={ () => {this.addSet()}}>
//           <Text>Add</Text>
//          </TouchableOpacity>
//     </View> 
//   )
// }

// }
// // class MyCardHeader extends React.Component{
//   // constructor(props){
//   //   super(props);
//   //   this.state ={
      
//   //   }
//   // }
//   // MyCardSet(){
//   //   this.props.navigation.navigate('SingleCard')
//   // }
//   // render(){
//   //   return( <Header
//   //   leftComponent ={<Icon onPress = {this.MyCardSet()}
//     // name='sc-telegram'
//     // type='evilicon'
//     // color='#517fa4'
//   // />}

// //       style={{ width: 100, height: 130 }}
// //     />)
// //   }
// // }


// class MyCardSet extends React.Component {

// //   static navigationOptions = ({navigation}) =>{
// //     return {
// //    // headerTitle:<MyCardHeader />,
// //     headerRight: (    )
// //   }
// // }
// constructor(props){
//   super(props)
//   const ds = new ListView.DataSource({
//     rowHasChanged:(r1, r2) =>r1 !== r2
//   });
//   this.state ={
//     dataSourse: ds.cloneWithRows(list),
//   }
// }


// displaySets(subject){
//   this.props.navigation.navigate('SingleCard', {course:[subject]})
// }


//   render() {
//     return ( 
//     // list.map((l, i) => (
//     <View> 
//     <Header
//       leftComponent={{ icon: 'menu', color: '#fff' }}
//       centerComponent={{ text: 'My Cards', style: { color: '#fff' } }}
//       rightComponent={{ icon: 'home', color: '#fff' }}
//     />
//     <ListView
//       dataSource={this.state.dataSourse}
//       renderRow={(rowData)=> <TouchableOpacity>
//         <Text onPress={this.displaySets(rowData)}>{rowData.course}</Text>
//         </TouchableOpacity>
//       }
//     //   } 
//     //   key={i}
//     //     leftAvatar={{ source: { course: l.course } }}
//     //     title={l.term}
//     //     subtitle={l.course}
//       />
//     </View>
//     )
//   }
// }


// class MyCard extends React.Component {
//   constructor(props){
//     super(props)
//     const courseName = this.props.navigation.getParam('course','Nothing')
//     console.log(courseName)
//     console.log(courseName[0])
//     console.log('This is the second log',courseName[1])
//     const ds = new ListView.DataSource({
//       rowHasChanged:(r1, r2) =>r1 !== r2
//     });
//     this.state ={
//       dataSource: ds.cloneWithRows(courseName),
//     }
//   }

//   showDefinition(){
//     this.props.navigation.navigate('HomePage')
//   }
 
  
// render(){

//   return(
    
//     <ListView
//     dataSource={this.state.dataSource}
//     renderRow={(course)=><TouchableOpacity>
//     <View>
//       <Text>{course.term}</Text>
//     </View>
//     </TouchableOpacity>
//     }
//     />  
// )


// }
// }

// export default StackNavigator({
//   HomePage:{
//     screen:MainPage,
//   },
//   CardsSet: {
//     screen: MyCardSet,
//   },
//   SingleCard:{
//     screen:MyCard,
//   }
  
// }, {initialRouteName: 'HomePage'});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
