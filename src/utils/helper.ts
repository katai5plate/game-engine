import * as uuids from "uuid";
import lz from "lz-string";

/** 指定した変数をデバッグ用にグローバル参照可能にする */
export const toGlobalForDebug = (target: Record<string, any>) => {
  Object.entries(target).forEach(([k, v]) => {
    (globalThis as any)[k] = v;
  });
};

export const uuid = () => uuids.v4();

export const zip = (text: string) => lz.compressToUTF16(text);
export const unzip = (text: string) => lz.decompressFromUTF16(text);

/** "_" がついたプロパティをインテリセンスに表示しない */
export const managerToUse = <T>(manager: T) =>
  manager as Omit<typeof manager, `_${string}`>;
