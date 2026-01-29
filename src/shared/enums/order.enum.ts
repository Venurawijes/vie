export enum OrderType {
  CONTACT_LESS = 1,
  CLICK_AND_COLLECT = 2,
  ROOM_ORDER = 3,
  DELIVERY = 4,
  UBER = 5,
  PICK_ME = 6,
  RETAIL = 7,
}

export enum FoodPreparationStatusType {
  COMPLETED = 3, //TODO: add rest of the types
}

export enum OrderTakeawayType {
  IN_STORE = 'in_store_takeaway',
  EXTERNAL_SERVICE = 'external_service_takeaway',
}

export enum OrderStatusType {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  PREPARING = 'PREPARING',
  READY = 'READY',
  ON_DELIVERY = 'ON_DELIVERY',
  COMPLETED = 'COMPLETED',
  NOT_CLEARED = 'NOT_CLEARED',
  CANCELLED = 'CANCELLED',
}

export enum ItemPreparationStatusType {
  READY_TO_START = 1,
  PREPARING = 2,
  COMPLETED = 3,
}

export enum OrderStatusValues {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
