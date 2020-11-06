
import * as React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import * as Permissions  from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { Header } from 'react-native-elements';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermission:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal',
    }
    
  }
  getCameraPermission = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission:status === 'granted',
      buttonState:'clicked'
    })
  }
  handleBarcodeScanner = async ({type,data}) => {
    this.setState({
      scanned:true,
      scannedData: data,
      buttonState:'normal',
    })
  } 
  render(){
    if(this.state.buttonState === 'clicked' && this.state.hasCameraPermission){
      return (
        <BarCodeScanner onBarCodeScanned={this.state.scanned? undefined:this.handleBarcodeScanner}
        style = {StyleSheet.absoluteFillObject}/>
      );
    }
    else if(this.state.buttonState === 'normal'){
      return(
        <View style={styles.container}>
          <Header
          backgroundColor={'#9cb218'}
          centerComponent={{
            text: 'Barcode Scanner',
            style: { color: 'white', fontSize: 20, fontWeight: 'bold',margin:70 },
          }}
        />
          <Image style={styles.imageStyle} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'}}/>
          <Text>
            {this.state.hasCameraPermission===true?this.state.scannedData:"Request Camera Permission"}

          </Text>
          <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission}> 
            <Text>Scan the QR code</Text>
          </TouchableOpacity>
        </View>
      )
    }
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  imageStyle:{
    width:100,
    height:100,
    marginTop:50,
    marginBottom:50,
  },
  scanButton:{
    width:150,
    height:50,
    backgroundColor:'yellow',
    justifyContent:'center',
    alignItems:"center",
    marginTop:50,
  }
});
