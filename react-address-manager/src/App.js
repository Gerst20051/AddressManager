import { useState } from 'react';

import AddressManager from './AddressManager';
import Swagger from './Swagger';

function App() {
  const [swagger, setSwagger] = useState(window.location.search === '?swagger');

  return swagger ? <Swagger /> : <AddressManager setSwagger={setSwagger} />;
}

export default App;
