import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { auth } from "../config";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../utils/AuthContext";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const user = useContext(AuthContext); // Use AuthContext to access the user

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(email)) {
      setEmailValidationMessage("Invalid email address.");
    } else {
      setEmailValidationMessage("");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (
          errorCode === "auth/invalid-email" ||
          errorCode === "auth/wrong-password"
        ) {
          Alert.alert(
            "Invalid Credentials",
            "The email or password is incorrect. Please try again."
          );
        } else {
          Alert.alert("Error", errorMessage);
        }
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animecompass</Text>
      <Text style={styles.caption}>Get started with your anime journey</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#BCA37F"
        value={email}
        onBlur={validateEmail}
        onChangeText={setEmail}
      />
      {emailValidationMessage ? (
        <Text style={styles.validationMessage}>{emailValidationMessage}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#BCA37F"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Image
          source={require("./../assets/google.png")} // Replace with the path to your Google icon.
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign In with Google</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Not a member? Register now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "#FFF2D8",
  },
  logoPlaceholder: {
    height: 200,
    width: 200,
    backgroundColor: "#BCA37F",
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    fontSize: 30,
    color: "#113946",
    fontWeight: "bold",
    textAlign: "center",
  },
  caption: {
    fontSize: 16,
    color: "#BCA37F",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(234, 215, 187, 0.7)", // Translucent version of #EAD7BB
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    color: "black",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#113946",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF2D8",
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#BCA37F",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  signupText: {
    color: "#BCA37F",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  validationMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
});
