import Charities from '../../server/charities'
// 

Meteor.publish('max.gross.income', function() {
  return Charities.find({
    userId: { $exists: false }
  }, {
    fields: Lists.publicFields
  });
});
