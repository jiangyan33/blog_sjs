/**
 * 测试token的签发与校验
 */
const jwt = require('jsonwebtoken');

let payload = {
    name: '石江山',
    password: '123456'
};
let signature = 'helloworld1';

let token = jwt.sign(payload, signature);
console.log(token);
/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi55-z5rGf5bGxIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1MzU2MjU1MDB9.jnNtgGBPVPBKHzYLa_K4IQcWDfrwqFR23O67QZt9ihM
 */

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi55-z5rGf5bGxIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1MzU2MjU1ODl9.U6VwKEW67RXciIOrrb5eNvIQ_dG_ZzXMvZosIyfIVnY', signature, (err, decoded) => {
    if (err) {
        console.log(err);
    }
    console.log(decoded);
})
