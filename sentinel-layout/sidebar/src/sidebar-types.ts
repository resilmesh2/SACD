export type SidebarState = 'expanded' | 'semi-collapsed' | 'collapsed';

export type SidebarBreakpoint = 'small' | 'medium' | 'large';

export interface SidebarBreakpoints {
  small: number;
  medium: number;
}

export interface SidebarWidthOptions {
  expanded: string;
  semiCollapsed: string;
}
