import { Items } from "./items.model";
import { Users } from "./users.model";
import { EntryLogDetails } from "./entry-log-details.model";



export class EntryLog {
  public logEntryId: number;

  public productId: number;

  public description: string;

  public date: string; //handle

  public receipt: string; //miss

  public total: number;

  public splitted: boolean;

  public whoPaidId: number;

  public notes: string;

  public status: number;

  public product: Items;

  public whoPaid: Users;

  public expensesLogDetail: Array<EntryLogDetails>;

  public constructor(init?: Partial<EntryLog>) {
    Object.assign(this, init);
  }
}
