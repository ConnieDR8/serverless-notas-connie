import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const loginAlumno = async (codigo, password) => {
  const correo = `${codigo}@urp.edu.pe`;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.code);
  }
};
