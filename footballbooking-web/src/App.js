import './App.css';
import Header from './components/Header/Header';
import '../src/assets/css/base.css';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import PitchDetail from './pages/PitchDetail';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BookingDetailPage from './pages/BookingDetailPage';

// Home.propTypes = {
//   pitch: PropTypes.string,
//   handlePitchDetail: PropTypes.func
// };

// Home.defaultProps = {
//   pitch: '0',
//   handlePitchDetail: null
// }

function App() {

  // const [filter, setFilter] = useState({});

  // function handleFilterSubmit(formValues) {
  //   setFilter(formValues)
  //   console.log("App: " + formValues.searchTerm)
  // }
  const [pitchId, setPitchId] = useState()

  function handlePitchDetail(pitchId) {
    setPitchId(pitchId)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        {console.log("render")}
        <Route path='/' element={<Home onPitchDetail={handlePitchDetail} />}></Route>
        <Route path={'/pitchdetail/:id'} element={<PitchDetail />}></Route>
        <Route path={'/login'} element={<LoginPage />}></Route>
        <Route path={'/signup'} element={<SignupPage />}></Route>
        <Route path={'/bookingdetail'} element={<BookingDetailPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
