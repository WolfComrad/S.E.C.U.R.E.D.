import React, { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={{flex:1, alignItems:"center"}}>
            <View style={{paddingTop:40, alignItems:"center"}}>
                <Text>Username</Text>
                <TextInput 
                    placeholderTextColor={"black"}
                    placeholder="Enter your Username"
                />
            </View>
            <View style={{paddingTop:10, alignItems:"center"}}>
                <Text>Password</Text>
                <TextInput
                    value={password}
                    placeholderTextColor={"black"}
                    placeholder="Enter your Password"
                    onChangeText={(text) => {
                        setPassword(text) ;
                        console.log(password)}}
                    
                />
            </View>
    
            <Pressable
                style={{
                    width: 200,
                    backgroundColor: "#2D2D2A",
                    borderRadius:6
                }}
            >
                <Text style={{color: "#E5DCC5", alignSelf:"center"}}>Login</Text>
            </Pressable>
        </View>
    )
}
export default LoginScreen