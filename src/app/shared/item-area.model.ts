import { ItemCategory } from './item-category.model';
import { Items } from './items.model';

export class ItemArea {

  public areaId : number;

  public description : string;

  public color : number;

  public itemsCategory : Array<ItemCategory>;

  public items : Array<Items>;

}
