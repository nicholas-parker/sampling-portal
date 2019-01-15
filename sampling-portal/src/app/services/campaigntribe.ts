import { TribeMember } from './tribeMember';
import { CampaignChannel } from './campaignchannel';
import { Activity } from './activity';

export class CampaignTribe {

  _id;

  member: TribeMember;

  // boolean 
  active;

  // a list of publication names
  publications: string[];

  // consent_pending | consent_request | consent_declined | consent_approved | delivery_error
  consentStatus;

  // delivery_pending | delivery_booked | delivery_collect | delivery_comnplete | delivery_error
  productDeliveryStatus;

  // product review outcome
  productOutcome;

  // potential reach: potential number of people this tribe member can reach
  potentialReach;

  // processId if a workflow is assigned to this engagement
  processId;

}
