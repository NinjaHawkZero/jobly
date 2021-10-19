const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");
const {sqlForPartialUpdate} = require("./sql")

const obj = {firstName: 'Aliya', age: 32}
//Test for sqlForPartialUpdate function
describe("update data", function () {
  test("update: Data", function() {
    const newObj = sqlForPartialUpdate({firstName: 'Aliya', age: 32}, obj);
    expect(newObj).toEqual({
      setCols: "\"Aliya\"=$1, \"32\"=$2",
      values:['Aliya', 32],
    });
  })
})

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false,
    });
  });

  test("works: admin", function () {
    const token = createToken({ username: "test", isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: true,
    });
  });

  test("works: default no admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false,
    });
  });
});
