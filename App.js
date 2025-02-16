import React, { useState } from 'react';
import IdeaVetting from './IdeaVetting';
import PitchOptimizer from './PitchOptimizer';

function App() {
  const [currentTab, setCurrentTab] = useState('idea');

  return (
    <div>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h1>Founder's Odyssey MVP</h1>
        <nav>
          <button onClick={() => setCurrentTab('idea')} style={{ marginRight: '10px' }}>
            Idea Vetting
          </button>
          <button onClick={() => setCurrentTab('pitch')}>Pitch Optimizer</button>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {currentTab === 'idea' && <IdeaVetting />}
        {currentTab === 'pitch' && <PitchOptimizer />}
      </main>
    </div>
  );
}

export default App;
