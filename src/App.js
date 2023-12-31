import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInPage from "./component/SignInPage";
import SignUpPage from "./component/SignUpPage";
import Home from "./component/Home";
import { useAuthContext } from "./context/AuthContext";
import TopBar from "./component/TopBar";
import Question from "./component/Question";
import Submitted from "./component/Submitted";
import QuestionScreen from "./component/Sql/QuestionScreen";
import Score from "./component/Score";

function App() {
  const {isUser} = useAuthContext()
  return (
    <main className={`${isUser ? "bg-white" : "bg-secondary-subtle"} + " h-full"`}>
      <BrowserRouter>
          <TopBar />
          <Routes>
            <Route exact path="/" element={<SignInPage />} />
            <Route exact path="/SignUp" element={<SignUpPage />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/question" element={<Question />} />
            <Route exact path="/submit" element={<Submitted />} />
            <Route exact path="/sql" element={<QuestionScreen />} />
            <Route exact path="/score" element={<Score />} />
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
