"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRNBackgroundClickResponseListener = void 0;
const notification_core_1 = require("@cupist/notification-core");
const notification_1 = require("../../shared/notification");
const react_1 = require("react");
const useRNBackgroundClickResponseListener = (props) => {
    const { onClickResponse, getValidNotificationData, dependencies = [], } = props !== null && props !== void 0 ? props : {};
    const { onLogNotificationEvent, onRefreshQueriesForDeepLink, onNavigateToDeepLink, } = (0, notification_core_1.useNotificationManage)(props);
    (0, react_1.useEffect)(() => {
        notification_1.RNNotificationModule.configure({
            onNotification: async (notification) => {
                const parsedNotification = (0, notification_core_1.parseReactNativeNotification)(notification);
                const validNotificationData = getValidNotificationData
                    ? getValidNotificationData === null || getValidNotificationData === void 0 ? void 0 : getValidNotificationData(parsedNotification)
                    : parsedNotification;
                if (validNotificationData.type) {
                    onLogNotificationEvent(validNotificationData.type);
                }
                if (validNotificationData.deepLink) {
                    await onRefreshQueriesForDeepLink(validNotificationData.deepLink);
                    onNavigateToDeepLink(validNotificationData.deepLink);
                }
                onClickResponse === null || onClickResponse === void 0 ? void 0 : onClickResponse(parsedNotification);
            },
        });
    }, dependencies);
};
exports.useRNBackgroundClickResponseListener = useRNBackgroundClickResponseListener;
//# sourceMappingURL=useRNBackgroundClickResponseListener.js.map