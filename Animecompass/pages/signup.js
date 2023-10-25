import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [
    confirmPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
  ] = useState("");
  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordValidationMessage(
        "Password should be at least 6 characters long."
      );
    } else {
      setPasswordValidationMessage("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordValidationMessage("Passwords do not match.");
    } else {
      setConfirmPasswordValidationMessage("");
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(email)) {
      setEmailValidationMessage("Invalid email address.");
    } else {
      setEmailValidationMessage("");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
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
        onChangeText={setEmail}
        onBlur={validateEmail}
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
        onBlur={validatePassword}
      />
      {passwordValidationMessage ? (
        <Text style={styles.validationMessage}>
          {passwordValidationMessage}
        </Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#BCA37F"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onBlur={validateConfirmPassword}
      />
      {confirmPasswordValidationMessage ? (
        <Text style={styles.validationMessage}>
          {confirmPasswordValidationMessage}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          /* Handle forgot password logic */
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.signupText}>Already a Member? Login</Text>
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
  validationMessage: {
    color: "red",
    textAlign: "center",

    marginTop: 5,
    marginBottom: 10,
  },
});
