import { Users } from './users.model';
import { EntryLog } from './entry-log.model';

export class EntryLogDetails {

  public EntryDetailId : number;

  public LogEntryId : number;

  public UserId : number;

  public Value : number;

  public IsPaid : number;

  public ExpensesLogData : EntryLog;

  public UserData : Users;


}
