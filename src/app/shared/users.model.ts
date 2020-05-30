import { EntryLog } from './entry-log.model'
import { EntryLogDetails } from './entry-log-details.model';

export class Users {
  public userId : number;

  public fullName : string;

  public nickName  : string;

  public mail  : string;

  public mobile  : string;

  public expensesLogData : Array<EntryLog>;

  public expensesLogDetailData : Array<EntryLogDetails>;

}
