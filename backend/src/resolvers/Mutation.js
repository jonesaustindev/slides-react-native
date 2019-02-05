const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
            }
        }, info);
        user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        return user;
    },
    async signin(parent, { email, password }, ctx, info) {
        const user = await ctx.db.query.user({ where: { email } });
        if(!user) {
            throw new Error(`No user found for email ${email}`);
        }
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new Error(`Invalid password`);
        }
        user.jwt = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        return user;
    }
};

module.exports = Mutations;
