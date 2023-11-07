export const validUser = [];

export const loginUser = (user) => {
  const foundUser = validUser.find(
    (element) =>
      element.email === user.email && element.password === user.password
  );

  if (foundUser) {
    return {
      type: "LOGIN_USER",
      payload: {
        email: user.email,
        password: user.password,
      },
    };
  } else {
    return {
      type: "LOGIN_FAILED",
    };
  }
};
