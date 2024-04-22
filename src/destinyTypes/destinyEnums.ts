// ! A lot of these will be "incomplete" but that will be because I literally can't find the other options available

export enum QueryComponents {
  Profiles = 100,
  VendorRecepts = 101,
  ProfileInventories = 102,
  ProfileCurrencies = 103,
  ProfileProgression = 104,
  PlatformSilver = 105,
  Characters = 200,
  CharacterInventories = 201,
  CharacterProgressions = 202,
  CharacterRenderData = 203,
  CharacterActivities = 204,
  CharacterEquipment = 205,
  CharacterLoadouts = 206,
  ItemInstances = 300,
  ItemObjectives = 301,
  ItemPerks = 302,
  ItemRenderData = 303,
  ItemStats = 304,
  ItemSockets = 305,
  ItemTalentGrids = 306,
  ItemCommonData = 307,
  ItemPlugStates = 308,
  ItemPlugObjectives = 309,
  ItemReusablePlugs = 310,
  Vendors = 400,
  VendorCategories = 401,
  VendorSales = 402,
  Kiosks = 500,
  CurrencyLookups = 600,
  PresentationNodes = 700,
  Collectables = 800,
  Records = 900,
  Transitory = 1000,
  Metrics = 1100,
  StringVariables = 1200,
  Craftables = 1300,
  SocialCommendations = 1400
}

export enum ItemLocation {
  Inventory = 1,
  Vault = 2
}

export enum ItemBindStatus {
  NotBound = 0
}

export enum TransferStatuses {
  CanTransfer = 0,
  NotTransferrable = 2
}

export enum ClassType {
  Hunter = 1,
  Titan = 0,
  Warlock = 2
}
