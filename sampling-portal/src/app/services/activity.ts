export class Activity {

  /**
   * user who initiated this activity
   */
  userId;

  activityDate: Date;

 /**
  * created | consent_request | consent_approved | consent_declined | delivery_booked | delivery_collect | delivery_complete | delivery_error
  */
  activityType: String;

  description: String;

}
