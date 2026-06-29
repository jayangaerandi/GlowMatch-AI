import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5001/register",
        {
          name,
          email,
          password
        }
      );

      setMessage(
        response.data.message
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Registration Failed"
      );

    }
  };

  return (

    <div style={{ padding: "30px" }}>

      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <p>{message}</p>

    </div>
  );
}

export default Register;