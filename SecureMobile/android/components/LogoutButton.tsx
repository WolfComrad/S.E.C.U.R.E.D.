import React, {useState} from 'react';
import {Modal, Pressable, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function LogoutButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(!modalVisible);
    console.log('logged out');
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
              Logout
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={styles.menuButton}
        onPress={() => setModalVisible(true)}>
        {<Icon name="menu" size={23}></Icon>}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'flex-end',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'flex-end',
    shadowColor: '#000',
    height: 100,
    width: 100,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'right',
    color: 'black',
  },
});
