export enum UserAccessType {
  RESTRICTED = 'RESTRICTED',
  STANDARD = 'STANDARD',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

export enum UserState {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

export enum MediaType {
  EVENT_COVER = 'EVENT_COVER',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  BANNER = 'BANNER',
}

export enum ActivityType {
  ACCOUNT_CREATE = 'ACCOUNT_CREATE',
  ACCOUNT_ACTIVATE = 'ACCOUNT_ACTIVATE',
  ACCOUNT_RESET_PASS = 'ACCOUNT_RESET_PASS',
  ACCOUNT_RESET_PASS_REQUEST = 'ACCOUNT_RESET_PASS_REQUEST',
  ACCOUNT_UPDATE_INFO = 'ACCOUNT_UPDATE_INFO',
  ACCOUNT_LOGIN = 'ACCOUNT_LOGIN',
  ATTEND_EVENT = 'ATTEND_EVENT',
  ATTEND_EVENT_AS_STAFF ='ATTEND_EVENT_AS_STAFF',
  BONUS_POINTS = 'BONUS_POINTS',
  MILESTONE = 'MILESTONE',
  ORDER_MERCHANDISE = 'ORDER_MERCHANDISE',
}