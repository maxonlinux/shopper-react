import { ChangeEvent, useState } from "react";
import { InitialCredentials } from "../../types/credentials";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function LoginPage() {
  // States
  const [credentials, setCredentials] = useState(InitialCredentials);

  //Declare hooks
  const { logIn } = useAuth();

  // Change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-full flex-col justify-center items-center px-2">
      <h1 className="font-bold text-2xl mb-4">Sign In</h1>
      <form className="flex flex-col w-full max-w-md gap-4">
        <input
          className="input-lg bg-gray-50 border border-gray-200"
          value={credentials.username}
          onChange={handleChange}
          type="text"
          name="username"
          autoComplete="username"
          placeholder="Username"
        />
        <input
          className="input-lg bg-gray-50 border border-gray-200"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
        />
        <button
          className="button-lg bg-accent text-white disabled:opacity-50"
          disabled={!credentials.username || !credentials.password}
          onClick={(e) => {
            e.preventDefault();
            logIn(credentials);
          }}
        >
          Sign In
          <span className="ic">done</span>
        </button>
        <div className="flex w-full items-center gap-4 px-4">
          <span className="h-[1px] w-full bg-gray-300"></span>
          <span className="whitespace-nowrap text-gray-500 text-sm">OR</span>
          <span className="h-[1px] w-full bg-gray-300"></span>
        </div>
        <Link
          className="button-lg bg-gray-50 border border-gray-100"
          to="/register"
        >
          Register
          <span className="ic">east</span>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
