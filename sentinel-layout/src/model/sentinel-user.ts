/**
 * Interface representing a user
 */
export interface SentinelUser {
  name?: string;
  login?: string;
  /**
   * Must be in string base64 format
   */
  picture?: string;
  pictureSrc?: string;
}
