import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
  RegisterScreenStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  FieldStyle: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },

  screenContainer: {
    flex: 1,
    backgroundColor: 'white',

    padding: 10,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'purple',
    fontSize: 21,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  input: {
    fontSize: 17,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 1,
    width: 300,
  },

  loginButton: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    width: 200,
    backgroundColor: 'purple',
    borderRadius: 6,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});
