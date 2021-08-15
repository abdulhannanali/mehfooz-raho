/* eslint-disable */

export enum FetchState {
  pending = "Pending",
  idle = "Idle",
  rejected = "Rejected",
  fulfilled = "Fulfilled",
}

export function isFetchStateLoading(fetchState: FetchState) {
  return fetchState === FetchState.pending || fetchState === FetchState.idle;
}
