/**
 * class to represent an organisation user
 */

export class UserChannel {

  public channelCode: string;
  public recipient: string;

}

export class User {

  public username: string;
  public channel: UserChannel[];
  public roles: [string];
  public tags: [string];

}
