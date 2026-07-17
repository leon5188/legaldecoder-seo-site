import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.legaldecoder.app',
  appName: 'Legaldecoder',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    iosScheme: 'capacitor',
    hostname: 'localhost'
  }
};

export default config;
