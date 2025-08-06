import { useState } from 'react';
import styles from './App.module.scss';
import { Chips } from '../components';

function App() {
  const [selectedChip, setSelectedChip] = useState<string | undefined>();

  const items = [
    'Chip 1',
    'Chip 2',
    'Chip 3',
    'Chip 4',
    'Chip 5',
    'Chip 6',
    'Chip 7',
    'Chip 8',
    'Chip 9',
    'Chip 10',
    'Chip 11',
    'Chip 12',
    'Chip 13',
    'Chip 14',
  ];

  return (
    <div className={styles.app}>
      <Chips items={items} selectedItem={selectedChip} onSelect={setSelectedChip} />
    </div>
  );
}

export default App;
