import { DependencyList } from "react";

export interface UseRNHookBaseProps<T extends (...args: any) => any> {
  onNotification: (params: ReturnType<T>) => void;
  dependencies?: DependencyList;
}
