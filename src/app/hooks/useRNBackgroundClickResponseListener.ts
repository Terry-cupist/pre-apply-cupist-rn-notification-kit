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
      onNotification: async (notification) => {
        const parsedNotification = parseReactNativeNotification(notification);
        const validNotificationData = getValidNotificationData
          ? getValidNotificationData?.(parsedNotification)
          : parsedNotification;

        if (validNotificationData.type) {
          sendNotificationUserEvent(validNotificationData.type);
        }

        if (validNotificationData.deepLink) {
          console.log("navigateToLink start");
          navigateToLink(validNotificationData.deepLink);
          console.log("refreshDeepLinkApis start");
          await refreshDeepLinkApis(validNotificationData.deepLink);
          console.log("rn background click deepLink process done");
        }

        onClickResponse?.(parsedNotification);
      },
    });
  }, dependencies);
};
