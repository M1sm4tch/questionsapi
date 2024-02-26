const bcrypt = require('bcryptjs');

const test = async () => {
    const password = 'faraz'
    const hashedpassword = await bcrypt.hash(password,10)
    const compare = await bcrypt.compare(password,hashedpassword)
    console.log(compare)
}

test()