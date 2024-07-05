
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Nextpage from './pages/Nextpage';
import Kid from './pages/Kid';

import Appli from './components/Appli';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/nextpage' element={<Nextpage />} />
          <Route path='/kid' element={<Kid />} />
          

          <Route path='/appli' element={<Appli />} />


          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
