import "./App.css";
("use client");
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-8">This is a placeholder for the dashboard content.</p>
        <Button onClick={() => navigate("/")}>Log Out</Button>
      </div>
    </>
  );
}

export default App;
