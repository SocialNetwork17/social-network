export const PATH = {
  MAIN: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: "/forgot-password", // ➕
  PROFILE: "/profile", // ➕
  SERVICES: '/services',
  POLICY: '/policy',
  CONGRATULATIONS: '/congratulations',
  LINK_EXPIRED: '/link-expired',
  CREATE_NEW_PASSWORD: "/create-new-password",
  RECOVERY_CODE: '/recovery-code',


  //CALLBACK - ПУТИ ДЛЯ ПЕРЕНАПРАВЛЕНИЯ С ПОЧТЫ
  REGISTRATION_CALLBACK: '/callback/registration',
  RECOVERY_CALLBACK: '/callback/recovery',
} as const
