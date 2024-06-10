import storage from '../../services/storage';

export default class PinCodeManager {
  static async setPin(pinCode: string | null) {
    if (pinCode === null) {
      storage.remove('pin-code');

      return;
    }

    const hash = await PinCodeManager.hashPinCode(pinCode);

    storage.write('pin-code', { pinCode: hash, isLocked: false });
  }

  static isSet() {
    const locks = storage.read('pin-code');

    return !!locks && !!locks.pinCode;
  }

  static isLocked() {
    const pin = storage.read('pin-code');

    return !!pin && pin.isLocked;
  }

  static lock() {
    const locks = storage.read('pin-code');

    if (!locks || !locks.pinCode) {
      throw new Error('Pin code is not set');
    }

    const { pinCode } = locks;

    storage.write('pin-code', { pinCode, isLocked: true });
  }

  static async unlock(pinCode: string) {
    const locks = storage.read('pin-code');

    if (!locks || !locks.pinCode) {
      throw new Error('Pin code is not set');
    }

    const { pinCode: hashedPinCode } = locks;

    const theSame = await PinCodeManager.comparePinCode(pinCode, hashedPinCode);

    if (!theSame) {
      throw new Error('The pin code is incorrect');
    }

    storage.write('pin-code', { pinCode: hashedPinCode, isLocked: false });

    return theSame;
  }

  private static async comparePinCode(pinCode: string, hashedPinCode: string) {
    const hash = await PinCodeManager.hashPinCode(pinCode);

    return hash === hashedPinCode;
  }

  private static async hashPinCode(pinCode: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pinCode);
    const firstHash = await crypto.subtle.digest('SHA-512', data);
    const hash = await crypto.subtle.digest('SHA-512', firstHash);

    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
