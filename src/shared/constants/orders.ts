import { ItemPreparationStatusType, OrderType } from '../enums/order.enum';

export const ORDER_TYPES: Record<number, string> = {
  [OrderType.CONTACT_LESS]: 'Dine-In',
  [OrderType.CLICK_AND_COLLECT]: 'Take-Away',
  [OrderType.ROOM_ORDER]: 'Room-Orders',
  [OrderType.DELIVERY]: 'Delivery',
  [OrderType.UBER]: 'Uber',
  [OrderType.PICK_ME]: 'Pick-Me',
  [OrderType.RETAIL]: 'Retail',
};

export const ITEM_CARD_BG_COLOR: Record<number, string> = {
  [ItemPreparationStatusType.READY_TO_START]: 'bg-[#AED2FF]',
  [ItemPreparationStatusType.PREPARING]: 'bg-[#FFE690]',
  [ItemPreparationStatusType.COMPLETED]: 'bg-[#99FFB6]',
  [100]: 'bg-[#FFEACE]', // new round items
  [101]: 'bg-[#FF0E0E]', // canceled items
};

export const ITEM_STATUS_NAME: Record<number, string> = {
  [ItemPreparationStatusType.READY_TO_START]: 'Ready to Start',
  [ItemPreparationStatusType.PREPARING]: 'Preparing',
  [ItemPreparationStatusType.COMPLETED]: 'Completed',
};

export const orderTitleBgColorPlate = [
  'bg-[#5275C0]',
  'bg-[#A546D2]',
  'bg-[#EB5757]',
  'bg-[#D94C75]',
  'bg-[#5D5FEF]',
];

export const ORDER_TITLE_BG_COLOR: Record<number, string> = {
  [OrderType.CONTACT_LESS]: 'bg-[#5275C0]',
  [OrderType.CLICK_AND_COLLECT]: 'bg-[#A546D2]',
  [OrderType.ROOM_ORDER]: 'bg-[#EB5757]',
  [OrderType.DELIVERY]: 'bg-[#1CA89F]',
  [OrderType.UBER]: 'bg-[#1CA89F]',
  [OrderType.PICK_ME]: 'bg-[#1CA89F]',
};

export const ORDER_TITLE_BORDER_COLOR: Record<number, string> = {
  [OrderType.CONTACT_LESS]: '!border-blue-500',
  [OrderType.CLICK_AND_COLLECT]: '!border-[#A546D2]',
  [OrderType.ROOM_ORDER]: '!border-[#EB5757]',
  [OrderType.DELIVERY]: '!border-[#1CA89F]',
  [OrderType.UBER]: '!border-[#1CA89F]',
  [OrderType.PICK_ME]: '!border-[#1CA89F]',
};
