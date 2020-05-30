import { ItemArea } from './item-area.model';
import { ItemCategory } from './item-category.model';
import { EntryLog } from './entry-log.model';

export class Items {

  public productId : number;

  public name : string;

  public description : string;

  public areaId : number;

  public categoryId : number;

  public area : ItemArea;

  public category : ItemCategory;

  public expensesLog : Array<EntryLog>;


}
