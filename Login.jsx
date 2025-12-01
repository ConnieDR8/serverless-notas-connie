import { useState } from "react";
import { loginAlumno } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const user = await loginAlumno(codigo, password);

      // Guardamos el alumno
      localStorage.setItem("alumno", JSON.stringify({
        uid: user.uid,
        email: user.email
      }));

      setMsg("Inicio de sesión exitoso ✔");

      setTimeout(() => navigate("/courses"), 400);

    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-3 text-center">Login Alumno</h2>

      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Código"
          className="border p-2 rounded"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
          Iniciar sesión
        </button>
      </form>

      {msg && (
        <p className={`mt-4 text-center ${msg.includes("✔") ? "text-green-600" : "text-red-600"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}
