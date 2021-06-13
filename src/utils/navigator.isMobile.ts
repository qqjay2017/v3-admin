
export function isMobile () {
  const appVersion = navigator.appVersion.toLocaleLowerCase()
  return appVersion.indexOf('iphone') > 0 || appVersion.indexOf('android') > 0
}
