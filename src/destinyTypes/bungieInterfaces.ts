import { ItemBindStatus, ItemLocation, TransferStatuses } from "./destinyEnums"

export interface Components {
  [key: string]: string;
}

export interface ManifestObject {
  [key: string]: {
    [key: string]: any;
  };
}

export interface Tokens {
  access_token: string;
  expires_in: number;
  membership_id: string
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface User {
  name: string;
  id: string;
  type: number;
}

export interface ProfileItem {
  itemHash: number;
  itemInstanceId?: string;
  quantity: number;
  bindStatus: ItemBindStatus;
  location: ItemLocation;
  buchetHash: number;
  transferStatus: TransferStatuses;
  lockable: boolean;
  state: number; // This could be an enum but I think there are a few variations to this one? I'm not sure.
  dismantlePermission: number;
  isWrapper: boolean;
  tooltipNotificationIndexes: Array<unknown>; // Not sure what type this is, can't find a reference
  versionNumber?: number;
}

export interface DestinyMembership {
  LastSeenDisplayName: string;
  LastSeenDisplayNameType: number;
  iconPath: string;
  crossSaveOverride: number;
  applicableMembershipTypes: Array<number>;
  isPublic: boolean;
  membershipType: number;
  membershipId: string;
  displayName: string;
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
}

export interface StoredUser {
  characterEquipment: {
    data: {
      [key: string]: {
        items: Array<object>;
      };
    };
    privacy: number;
  };
  characterInventories: {
    data: {
      [key: string]: {
        items: Array<object>;
      };
    };
    privacy: number;
  };
  characterLoadouts: {
    data: {
      [key: string]: {
        loadouts: Array<object>;
      };
    };
    privacy: number;
  };

  characters: {
    data: {
      [key: string]: Character;
    };
  }
  profile: {
    data: {
      characterIds: Array<string>;
      currentGuardianRank: number;
      currentSeasonHash: number;
      currentSeasonRewardPowerCap: number;
      dateLastPlayed: string;
      eventCardHashesOwned: Array<unknown>; // I don't have any on my account so I don't know the type
      lifetimeHighestGuardianRank: number;
      seasonHashes: Array<number>;
      userInfo: {
        applicableMembershipTypes: Array<number>;
        bungieGlobalDisplayName: string;
        bungieGlobalDisplayNameCode: number;
        crossSaveOverride: number;
        displayName: string;
        isPublic: boolean;
        membershipId: string;
        membershipType: number;
      };
      versionsOwned: number;
    };
    privacy: number;
  };

  profileInventory: {
    data: {
      items: Array<object>;
    };
  };

  itemComponents: {
    perks: {
      data: {
        [key: string]: {
          perks: Array<object>;
        };
      }
      privacy: number;
    };

    sockets: {
      data: {
        [key: string]: {
          sockets: Array<object>;
        };
      }
      privacy: number;
    }
  }
}

export interface Character {
  baseCharacterLevel: number;
  characterId: string;
  classHash: number;
  classType: number;
  dateLastPlayed: string;
  emblemBackgroundPath: string;
  emblemColor: { red: number; green: number; blue: number; alpha: number }; // Genuinely what is this used for? The values don't seem accurate at all
  emblemHash: number;
  emblemPath: string;
  genderHash: number;
  genderType: number;
  levelProgression: { [key: string]: number } // Did not feel necessary to write out this whole thing because levels aren't a thing in Destiny anymore
  light: number;
  membershipId: string;
  membershipType: number;
  minutesPlayedThisSession: string;
  minutesPlayedTotal: string;
  percentToNextLevel: number;
  raceHash: number;
  raceType: number;
  stats: { [key: string]: number }; // Unsure if these change
  titleRecordHash: number;
}

export interface Item {
  bindStatus: number;
  bucketHash: number;
  dismantlePermission: number;
  isWrapper: boolean;
  itemHash: number;
  itemInstanceId: string;
  location: number;
  lockable: boolean;
  quantity: number;
  state: number;
  transferStatus: number;
  versionNumber: number;
}
