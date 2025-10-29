import {
  parseReactNativeNotification,
  useNotificationManage,
} from "@cupist/notification-core";
import { RNNotificationModule } from "@shared/notification";
import { useEffect } from "react";
import { UseRNHookBaseProps } from "./types";

export const useRNBackgroundClickResponseListener = (
  props?: UseRNHookBaseProps<typeof parseReactNativeNotification>,
) => {
  const {
    onClickResponse,
    getValidNotificationData,
    dependencies = [],
  } = props ?? {};
  const {
    onLogNotificationEvent,
    onRefreshQueriesForDeepLink,
    onNavigateToDeepLink,
  } = useNotificationManage(props);
  useEffect(() => {
    RNNotificationModule.configure({
      onNotification: async (notification) => {
        const parsedNotification = parseReactNativeNotification(notification);
        const validNotificationData = getValidNotificationData
          ? getValidNotificationData?.(parsedNotification)
          : parsedNotification;

        if (validNotificationData.type) {
          onLogNotificationEvent(validNotificationData.type);
        }

        if (validNotificationData.deepLink) {
          await onRefreshQueriesForDeepLink(validNotificationData.deepLink);
          onNavigateToDeepLink(validNotificationData.deepLink);
        }

        onClickResponse?.(parsedNotification);
      },
    });
  }, dependencies);
};
