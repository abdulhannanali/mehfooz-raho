import { notification } from "antd";

export const errorNotification = notification.error;

export function fetchErrorNotification(target: string) {
  return errorNotification({
    message: `Failed to fetch ${target}`,
    description: `There was a problem fetching ${target}. Please check your internet connection or refresh.`,
  });
}
