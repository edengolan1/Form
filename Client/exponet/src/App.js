import './App.css';
import ProcedureSettings from './pages/procedureSettings/ProcedureSettings';
import SideBar from './components/sidebar/SideBar';

function App() {
  return (
    <div className='app'>
      <ProcedureSettings/>
      <SideBar/>
    </div>
  );
}

export default App;