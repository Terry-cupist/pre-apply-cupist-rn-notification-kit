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
  const { sendNotificationUserEvent, refreshDeepLinkApis, navigateToLink } =
    useNotificationManage(props);
  useEffect(() => {
    RNNotificationModule.configure({
      onNotification: (notification) => {
        const parsedNotification = parseReactNativeNotification(notification);
        const validNotificationData = getValidNotificationData
          ? getValidNotificationData?.(parsedNotification)
          : parsedNotification;

        if (validNotificationData.type) {
          sendNotificationUserEvent(validNotificationData.type);
        }

        if (validNotificationData.deepLink) {
          refreshDeepLinkApis(validNotificationData.deepLink);
          navigateToLink(validNotificationData.deepLink);
        }

        onClickResponse?.(parsedNotification);
      },
    });
  }, dependencies);
};
