const bcrypt = require('bcryptjs');
const hash = '$2a$12$I4jJcau64wPaGoDNm0X0zuNaxeHhoMPeDQ1TAoLIi1BIySVUsP7t.';
const password = 'admin123';
const ok = bcrypt.compareSync(password, hash);
console.log('Comparison result:', ok);
