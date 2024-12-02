export interface SentinelLayoutI18nMapping {
  sidebar?: SentinelSidebarI18n;
  notifications?: SentinelNotificationI18n;
  nav?: SentinelNavI18n;
  userMenu?: SentinelUserMenuI18n;
}

export interface SentinelNavI18n {
  versionTooltip: string;
}

export interface SentinelUserMenuI18n {
  myAccount: string;
  login: string;
  logout: string;
}

export interface SentinelNotificationI18n {
  menu?: SentinelNotificationMenuI18n;
  card?: SentinelNotificationCardI18n;
  detail?: SentinelNotificationDetailI18n;
}

export interface SentinelNotificationCardI18n {
  source: string;
}

export interface SentinelNotificationDetailI18n {
  source: string;
  type: string;
  created: string;
}

export interface SentinelNotificationMenuI18n {
  notifications: string;
  showAll: string;
  noNotifications: string;
}

export interface SentinelSidebarI18n {
  collapseSidebar: string;
  expandSidebar: string;
}
