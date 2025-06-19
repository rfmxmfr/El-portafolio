const createCookie = (name, value, options = {}) => {
  const defaults = {
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    maxAge: null,
  };

  const opts = { ...defaults, ...options };

  let cookie = `${name}=${value}; Path=${opts.path}`;

  if (opts.httpOnly) cookie += '; HttpOnly';
  if (opts.secure) cookie += '; Secure';
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
  if (opts.maxAge) cookie += `; Max-Age=${opts.maxAge}`;

  return cookie;
};

const clearCookie = (name, options = {}) => {
  return createCookie(name, '', { ...options, maxAge: 0 });
};

module.exports = {
  createCookie,
  clearCookie,
};
