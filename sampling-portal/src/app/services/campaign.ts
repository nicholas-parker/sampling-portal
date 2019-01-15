import { Engagement } from './engagement';
import { CampaignTribe } from './campaigntribe';

export class Campaign {

  _id;

  createdById;

  serviceOrgId;

  serviceOrgName;

  targetOrgId;

  targetOrgName;

  // definition
  name;

  description;

  openDate: Date;

  closeDate: Date;

  // title of the promotion displayed to the tribe member when they accept/dewcline the engagement
  promotionTitle;

  // description of sampling displayed to the tribe member when they accept/decline the engagement
  promotionDescription;

  // an array of delivery date options
  deliveryDates: Date[];

  // templates used to engage the tribe in the campaign
  engagement: Engagement[];

  // members of the tribe selected for the campaign
  tribe: CampaignTribe[];

  tags: string[];

  systemTags: string[];

}
