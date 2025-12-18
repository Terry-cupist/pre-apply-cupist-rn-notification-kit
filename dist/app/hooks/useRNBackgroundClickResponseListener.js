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
        console.log('⚙️ [useRNBackgroundClickResponseListener] React Native 알림 리스너 설정');
        notification_1.RNNotificationModule.configure({
            onNotification: async (notification) => {
                console.log('👆 [useRNBackgroundClickResponseListener] 백그라운드 알림 클릭됨');
                const parsedNotification = (0, notification_core_1.parseReactNativeNotification)(notification);
                console.log('✅ [useRNBackgroundClickResponseListener] 알림 파싱 완료:', parsedNotification);
                const validNotificationData = getValidNotificationData
                    ? getValidNotificationData === null || getValidNotificationData === void 0 ? void 0 : getValidNotificationData(parsedNotification)
                    : parsedNotification;
                console.log('✓ [useRNBackgroundClickResponseListener] 유효성 검증 완료:', validNotificationData);
                if (validNotificationData.type) {
                    console.log('📊 [useRNBackgroundClickResponseListener] 이벤트 로깅:', validNotificationData.type);
                    onLogNotificationEvent(validNotificationData.type);
                }
                if (validNotificationData.deepLink) {
                    console.log('🔗 [useRNBackgroundClickResponseListener] 딥링크 발견:', validNotificationData.deepLink);
                    await onRefreshQueriesForDeepLink(validNotificationData.deepLink);
                    console.log('✅ [useRNBackgroundClickResponseListener] 쿼리 갱신 완료');
                    onNavigateToDeepLink(validNotificationData.deepLink);
                    console.log('🚀 [useRNBackgroundClickResponseListener] 네비게이션 실행');
                }
                onClickResponse === null || onClickResponse === void 0 ? void 0 : onClickResponse(parsedNotification);
                console.log('✅ [useRNBackgroundClickResponseListener] 클릭 응답 처리 완료');
            },
        });
    }, dependencies);
};
exports.useRNBackgroundClickResponseListener = useRNBackgroundClickResponseListener;
//# sourceMappingURL=useRNBackgroundClickResponseListener.js.map