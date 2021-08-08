import {
  DefaultSettingValue,
  SettingConfig,
} from "./contexts/SettingsContext";

export const BooleanSetting: SettingConfig = {
  verify: (value: any): boolean => (value === "true" || value === "false" || value === true || value === false),
  convert: (value: string): boolean => (value === "true")
}

export const IntegerSetting: SettingConfig = {
  verify: (value: any): boolean => !isNaN(value),
  convert: (value: string): number => parseInt(value)
}

export interface EthereumNetwork {
  name: string
  key: string
  genesis: number
  chainId: number
}

export const EthereumNetworkOptions: {
  [key: string]: EthereumNetwork
} = {
  mainnet: { name: "Mainnet", key: "mainnet", genesis: 12965000, chainId: 1 },
  staging: { name: "Staging", key: "staging", genesis: 12965000, chainId: 1 },
};

export enum Setting {
  maxBlocksToChart = "maxBlocksToChart",
  maxBlocksToRender = "maxBlocksToRender",
  doNotShowChart = "doNotShowChart"
}

export const defaultNetwork = EthereumNetworkOptions['mainnet']
export const defaultSettings: { [key: string]: DefaultSettingValue } =
{
  [Setting.maxBlocksToRender]: {
    config: IntegerSetting,
    defaultValue: 50,
  },
  [Setting.maxBlocksToChart]: {
    config: IntegerSetting,
    defaultValue: 500,
  },
  [Setting.doNotShowChart]: {
    config: BooleanSetting,
    defaultValue: false,
  },
};

export const maxBlocksToKeepInMemory = 1000;

export const prefetchCount = 20;

// Max WebSocket Reconnection Attempts.
export const maxReconnectionAttempts = 5;