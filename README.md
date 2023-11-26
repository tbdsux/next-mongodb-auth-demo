# Next.js with MongoDB User-Auth Demo

This is demo to manually implement a simple user authentication system

## Features

- [x] User login
- [x] Create a new account
- [x] Verify user email
- [x] Forgot password implementation
- [ ] Login with code (through email)
- [ ] Refresh-Token model
- [ ] View active sessions
- [ ] ... others

## Development

### Environment Setup

```sh
MONGODB_URI=
SECRET_KEY=

RESEND_API_KEY=
RESEND_DOMAIN=

# define this only on local development
VERCEL_URL=
```

### Tech Stack

- Next.js (using App Router)
- MongoDB with Mongoose
- bcryptjs
- zod
- ReSend
- nanoid
- Tailwind (for simple styling)

## Demo

https://next-mongodb-auth-demo.vercel.app/

---

This is a part my learning to implement a user authentication from scratch.
