"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Capacitor } from '@capacitor/core';

export default function NativeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      router.replace('/welcome/');
    }
  }, [router]);

  return null;
}
