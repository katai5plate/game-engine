import * as uuids from "uuid";

/** 指定した変数をデバッグ用にグローバル参照可能にする */
export const toGlobalForDebug = (target: Record<string, any>) => {
  Object.entries(target).forEach(([k, v]) => {
    (globalThis as any)[k] = v;
  });
};

export const uuid = () => uuids.v4();
