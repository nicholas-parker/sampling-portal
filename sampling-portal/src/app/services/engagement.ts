export class Engagement {

      static CHANNEL_EMAIL = 'email';
      static CHANNEL_SMS = 'sms';
      static CHANNEL_FACEBOOK = 'facebook';
      static CHANNEL_SNAPCHAT = 'snapchat';
      static CHANNEL_TWITTER = 'twitter';
  
      static CASE_SAMPLE_INVITATION = 'sample_invitation';
  
      _id;

      // email | sms | facebook | snapchat | twitter
      channelType;

      // sender, structure depends on channelType, i.e. email address for email
      sender;

      // template as a string, the template is processed into the message when the engagement is sent
      template;

      // subject
      subject;

      // useCase for this template: sample_invitation | .....
      useCase;

}
