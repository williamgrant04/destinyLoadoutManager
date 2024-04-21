import { ItemBindStatus, ItemLocation, TransferStatuses } from "./destinyEnums"

export interface Components {
  [key: string]: string
}

export interface ManifestObject {
  [key: string]: string
}

export interface Tokens {
  access_token: string,
  expires_in: number,
  membership_id: string
  refresh_expires_in: number,
  refresh_token: string,
  token_type: string
}

export interface User {
  name: string,
  id: string
  type: number
}

export interface ProfileItem {
  itemHash: number,
  itemInstanceId?: string,
  quantity: number,
  bindStatus: ItemBindStatus,
  location: ItemLocation,
  buchetHash: number,
  transferStatus: TransferStatuses,
  lockable: boolean,
  state: number, // This could be an enum but I think there are a few variations to this one? I'm not sure.
  dismantlePermission: number,
  isWrapper: boolean,
  tooltipNotificationIndexes: Array<any>, // Not sure what type this is, can't find a reference
  versionNumber?: number
}

export interface DestinyMembership {
  LastSeenDisplayName: string,
  LastSeenDisplayNameType: number,
  iconPath: string,
  crossSaveOverride: number,
  applicableMembershipTypes: Array<number>,
  isPublic: boolean,
  membershipType: number,
  membershipId: string,
  displayName: string,
  bungieGlobalDisplayName: string,
  bungieGlobalDisplayNameCode: number
}
