/**
 * class represents the response of a service action which typically results in a boolean type response
 */
export class ActionResponse {

  public ACTION_OK = 'action_ok';
  public ACTION_FAIL = 'action_fail';

 /*
  * a string representing the technical name of the action
  */
  public actionName;

 /*
  * The result of the action: ACTION_OK | ACTION_FAIL
  */
  public result;

 /*
  * a specific error code generated by the service
  */
  public errorCode;

 /*
  * a technical error message
  */
  public errorMessage;

 /*
  * information which is displayed to the user as a result of the action
  */
  public userInformation;

 /*
  * the key of the business entity updated
  */
  public issueId;

}
