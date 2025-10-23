import { parseReactNativeNotification } from "@cupist/notification-core";
import { RNNotificationModule } from "@shared/notification";
import { useEffect } from "react";
import { UseRNHookBaseProps } from "./types";

export const useRNBackgroundClick = ({
  onNotification,
  dependencies = [],
}: UseRNHookBaseProps<typeof parseReactNativeNotification>) => {
  useEffect(() => {
    RNNotificationModule.configure({
      onNotification: (notification) => {
        const parsedNotification = parseReactNativeNotification(notification);
        onNotification(parsedNotification);
      },
    });
  }, dependencies);
};
