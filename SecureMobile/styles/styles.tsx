import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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
  promptTitleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  promptErrorMessage: {
    color: 'red',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    marginTop: 2,
  },
  loginErrorMessage: {
    color: 'red',
    fontSize: 16,
    fontWeight: '400',
  },
  input: {
    fontSize: 17,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 1,
    width: 300,
  },

  loginButton: {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    width: 200,
    backgroundColor: 'purple',
    borderRadius: 6,
    alignSelf: 'center',
  },

  disabledLoginButton: {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    width: 200,
    backgroundColor: 'gray',
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
