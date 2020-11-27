import AddressManager from './AddressManager';
import Swagger from './Swagger';

function App() {
  return window.location.search === '?swagger'
    ? <Swagger />
    : <AddressManager />;
}

export default App;
