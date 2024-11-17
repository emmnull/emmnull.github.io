import { browser } from '$app/environment';

export const isMacOS = browser ? /macos|mac os/i.test(navigator.userAgent) : undefined;

export const isWindows = browser ? /windows|win32|win64/i.test(navigator.userAgent) : undefined;

export const isLinux = browser ? /linux/i.test(navigator.userAgent) : undefined;

export const isIOS = browser ? /iphone|ipad/i.test(navigator.userAgent) : undefined;

export const isAndroid = browser ? /android/i.test(navigator.userAgent) : undefined;

export const isMobile = browser ? isAndroid || isIOS : undefined;
