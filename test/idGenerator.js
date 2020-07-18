
module.exports.idGenerator = (userContext, events, done) => {
  const id = Math.floor(Math.random() * 1000000) + 1;
  userContext.vars.id = id;
  return done();
}
