import { ItemArea } from './item-area.model';
import { Items } from './items.model';

export class ItemCategory {

  public categoryId : number;

  public description : string;

  public color : number ;

  public areaId : number;

  public areaData : ItemArea;

  public items : Array<Items>;


}
