import './App.css';
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import UniDash from './views/University'
import AdminDash from './views/Admin'
import Home from './components/Organization/Dashboard/home'
import Condidates from './components/Organization/Dashboard/condidate'
import Tests from './components/Organization/Dashboard/Tests'
import EmpLogin from './components/Employees/Auth/EmpLogin';
import OrgLogin from './components/Organization/Auth/OrgLogin';
import StdLogin from './components/Student/Auth/StdLogin';
import StdHome from './components/Student/Dashboard/Stdhome';
import StdResult from './components/Student/Dashboard/StdResults';
import StdTest from './components/Student/Dashboard/StdTests';
import OrgSignUp from './components/Organization/Auth/OrgSignUp';
import StdSignUp from './components/Student/Auth/StdSignUp';
import Emphome from './components/Employees/DashBoard/Emphome'
import EmpResults from './components/Employees/DashBoard/EmpResults'
import EmpQna from './components/Employees/DashBoard/EmpQna'
import Employee from './components/Organization/Dashboard/Employee';
import Student from './views/Student';
import EmpDash from './views/Employee';
import LandingPage from './views/LandingPage';
import EmpTest from './components/Employees/DashBoard/EmpTest';
import AttachQue from './components/Employees/DashBoard/AttachQue';
import EmpTestQue from './components/Employees/DashBoard/EmpTestQue';
import AppliedTest from './components/Student/Dashboard/AppliedTest';
import StudentApply from './components/Student/Dashboard/StudentApply';
import ApplyTest from './components/Student/Dashboard/ApplyTest';
import AdminLogin from './components/Admin/AdminLogin';
import AdminHome from './components/Admin/Dashboard/AdminHome';
import AdminOrg from './components/Admin/Dashboard/AdminOrg';
import AdminConsult from './components/Admin/Dashboard/AdminConsult';
import BlogCat from './components/Admin/Dashboard/BlogCat';
import Quiz from './components/Student/quiz/Quiz';
import QuizStart from './components/Student/quiz/QuizStart';
import AttemptTest from './components/Employees/DashBoard/AttemptTest';
import ResultParent from './components/Employees/DashBoard/ResultParent';
import Consultancy from './components/Consultancy/Consultancy';
import Blog from './components/Consultancy/Blog';
import SingleBlog from './components/Consultancy/SingleBlog';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/> }/>
        {/* Org Auth */}
        <Route path="org/register" element={<OrgSignUp/>}/>
        <Route path="org/login" element={<OrgLogin/>}/>
        <Route path="quiz/:stdid/:testid" element={< QuizStart />}/>
        {/* Consultancy */}
        <Route path='consultancy' element={<Consultancy/>}/>
        <Route path='blogs' element={ <Blog/> }/>
        <Route path='blog' element={ <SingleBlog/> }/>
        {/* Employe Auth */}
        <Route path="employee/login" element={<EmpLogin/>}/>
        {/*  Student Auth */}
        <Route path="condidate/login" element={<StdLogin/>}/>
        <Route path="condidate/register" element={<StdSignUp/>}/>
        {/* Org Route */}
        <Route path="org/:id/*" element={<UniDash />} >
          <Route path="" element={<Home/>} />
          <Route path="home" element={<Home/>} />
          <Route path="employee" element={< Employee />} />
          <Route path="condidates" element={<Condidates/>} />
          <Route path="tests" element={<Tests/>} />
        </Route>
        {/* Student Route sudo snap install notion-snap */}
        <Route path="std/:id/*" element={<Student />} >
          <Route path="" element={< StdHome />} />
          <Route path="home" element={<StdHome/>} />
          <Route path="results" element={< StdResult />} />
          <Route path="tests" element={< StudentApply />} >
            <Route path='' element={<StdTest/>} />
            <Route path=':applyTest' element={<ApplyTest/>} />
          </Route>

          <Route path="applied" element={< AppliedTest />} />
        </Route>
        <Route path="employee/:id" element={<EmpDash/>} >
        <Route path="" element={< Emphome/> } />
        <Route path="home" element={< Emphome/>} />
        <Route path="test" element={< EmpTestQue/>} >
          <Route path="" element={<EmpTest/>}/>
          <Route path=":testId" element={<AttachQue/>}/>
        </Route>
        <Route path="results" element={< EmpResults/>} >
          <Route path="" element={<ResultParent/>}/>
          <Route path=":attemptid" element={<AttemptTest/>}/>
        </Route>
        <Route path="qna" element={< EmpQna />}/>
        </Route>
        {/* Admin  */}
        <Route path="/admin/:id" element={<AdminDash />} >
          <Route path="" element={<AdminHome/>}/>
          <Route path="home" element={<AdminHome/>}/>
          <Route path="org" element={<AdminOrg/>}/>
          <Route path="consultancy" element={<AdminConsult/>}/>
          <Route path="category" element={<BlogCat/>}/>
        </Route>
        {/* Admin Auth */}
        <Route path="/admin/login" element={< AdminLogin/> }/>
      </Routes>
    </div>
  );
}

export default App;
