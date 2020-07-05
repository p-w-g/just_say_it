export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const USER_NAME = 'USER_NAME'


export function userName(text) {
  return { type: USER_NAME, text }
}

export function logIn() {
  return { type: LOG_IN }
}

export function logOut() {
  return { type: LOG_OUT }
}
