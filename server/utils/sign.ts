import crypto from 'crypto';

export function sign(value: string) {
     return crypto
          .createHmac(
               'sha256',
               process.env.SESSION_SECRET ||
                    'this_is_a_very_very_secure_secret_trust_me_frfr_ik_what_I_am_doing_maybe'
          )
          .update(value)
          .digest('hex');
}
