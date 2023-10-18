import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Animecompass</Text>
      <Text style={styles.caption}>Get started with your anime journey</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#BCA37F"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#BCA37F"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#BCA37F"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => {
          /* Handle forgot password logic */
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Handle Login Logic here */
        }}
      >
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
});

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// export default function SignUp({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Animecompass</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           /* Handle Signup Logic here */
//         }}
//       >
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.loginText}>Already have an account? Login!</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 40,
//     backgroundColor: "#FFF2D8",
//   },
//   header: {
//     fontSize: 40,
//     color: "#113946",
//     marginBottom: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "rgba(234, 215, 187, 0.7)", // Translucent version of #EAD7BB
//     height: 50,
//     borderRadius: 25,
//     paddingLeft: 15,
//     color: "#BCA37F",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#113946",
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#FFF2D8",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
//   loginText: {
//     color: "#BCA37F",
//     marginTop: 20,
//     textAlign: "center",
//     textDecorationLine: "underline",
//   },
// });
