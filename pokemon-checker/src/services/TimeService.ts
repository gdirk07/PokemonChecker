import { Time } from "../constants/Time"

export class TimeService { 
  /**
   * Generic method for returning a timestamp to be consumed.
   * 
   * Defaults to 1 hour (60 minutes)
   * @param minutes Duration to set an expiry time for
   */
  public generateExpiryTimestamp(minutes = 60): number {
    const newStamp =
      Date.now() +
      minutes * Time.MILLISECONDS_PER_SECOND * Time.SECONDS_PER_MINUTE;

    return newStamp;
  }
}