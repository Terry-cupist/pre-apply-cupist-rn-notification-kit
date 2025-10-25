import { DependencyList } from "react";

export interface UseRNHookBaseProps<T extends (...args: any) => any> {
  onClickResponse: (params: ReturnType<T>) => void;
  dependencies?: DependencyList;
}
