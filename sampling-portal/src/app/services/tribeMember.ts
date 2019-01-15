import { CategoryTag } from './categoryTag';
import { Activity } from './activity';

export class TribeChannel {

      _id;

      /**
       * the channel code
       * post | email | sms | twitter | facebook
       */
      channelType;

      /**
       * this is the channel to use for primary contact
       */
      communicate;

      /**
       * this is the channel to use for physical delivery
       */
      deliver;

      /**
       * a flag to indicate this is a valid channel
       */
      valid;

      /**
       * the contact information for this channel, contains at lease a recipient field
       */
      recipient;
      address1;
      address2;
      address3;
      address4;
      address5;
      postCode;
  
      /**
       * notes relating to a physical delivery
       */
      deliveryNotes;

}

export class TribeMember {

        _id;
  
        /**
         *
         * the id of the organisation which owns this tribe member,
         * the organisation has the capability to create sample campaigns
         * -- i.e. its owned by the agency if the agency is working on behalf of the client
         *
         */
        ownerOrgId;

        /**
         * the id of the user which created this tribe member
         */
        createdById;

        /**
         * name of the tribe member
         */
        name;

        /**
         * FUTURE USE: a list of categorised tags (not in db schema yet)
         */
        categoryTags: CategoryTag[];

        /**
         * uncategorised tags
         */
        tags: string[];

        /**
         * a list of publication names
         */
        publications: string[];

        /**
         * topics this member is interested in
         */
        topics: string[];

        /**
         * date member added to the tribe
         */
        dateAdded: Date;

        /**
        *  status indicates the status of the member to have their information processed from a GDPR perspective
        *  pending | requested | consent | declined
        */
        gdprStatus: String;

        channel: Array<TribeChannel>;

        // activity history for this tribe member
        activity: [Activity];

}
