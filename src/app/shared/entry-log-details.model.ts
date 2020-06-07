import { Users } from './users.model';
import { EntryLog } from './entry-log.model';

export class EntryLogDetails {

  public entryDetailId : number;

  public logEntryId : number;

  public userId : number;

  public value : number;

  public isPaid : number;

  public expensesLogData : EntryLog;

  public UserData : Users;


}
