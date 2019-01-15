export class CampaignChannel {

  // post | email | sms | facebook | snapchat | twitter
  channelType;

  // true: use this channel for dispatch
  deliver;

  // true: use this channel for communication
  communicate;

  // date this channel was last used for communication
  sentDate: Date;

  // delivery status of last communication
  deliveryStatus;

  // a UUID used to identify this channel when the tribe member confirms/declines engagement
  channelUUID;

  // an object containing the contact information for this channel
  // for post => address, email => email address etc...
  contact: any;

}
