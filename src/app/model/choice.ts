import { Person } from './person';
import { Level } from './level';
import { Sport } from './sport';
import { Place } from './place';



export class Choice {
    id: number;
    person: Person;
    level: Level;
    sport: Sport;
    places: Place[];
    choiceDate: Date;
    lastUpdate: Date;
    /*places?: any[];*/
}
