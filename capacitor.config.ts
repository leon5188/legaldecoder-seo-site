import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.legaldecoder.app",
  appName: "Legaldecoder",
  webDir: "out",
  server: {
    androidScheme: "https",
    iosScheme: "capacitor",
    hostname: "localhost"
  },
  ios: {
    contentInset: "always"
  },
  // Explicitly disable any remote server URL override
  overrideUserAgent: undefined
};

export default config;
