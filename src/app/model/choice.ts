import { Person } from './person';
import { Level } from './level';
import { Sport } from './sport';
import { Place } from './place';



export class Choice {
  filter(arg0: (s: any) => boolean): Choice {
    throw new Error("Method not implemented.");
  }
  id: number;
  person: Person;
  level: Level;
  sport: Sport;
  places: Place[];
  choiceDate: Date;
  lastUpdate: Date;

}
