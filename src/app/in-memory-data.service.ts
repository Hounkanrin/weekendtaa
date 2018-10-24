import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sport } from './model/sport';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sports = [
      { id: 1, name: 'natation' },
      { id: 2, name: 'foot' },
      { id: 3, name: 'hand' },
      { id: 4, name: 'basketball' },
      { id: 5, name: 'tenis' },
      { id: 6, name: 'voleybol' }
    ]
    return {sports};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(sports: Sport[]): number {
    return sports.length > 0 ? Math.max(...sports.map(sport => sport.id)) + 1 : 1;
  }
}
