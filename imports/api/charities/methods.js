import { Meteor } from 'meteor/meteor';
import { Charities } from './charities';

Meteor.methods({
  getSearchContent() {
    console.log(`in the method definition`);
    let cursor = Charities.find({}, { fields: { _id: 1, CharityName: 1, RegisteredCharityNumber: 1 } })
    return cursor.fetch().map(function(el, idx, arr) {
      return {
        title: el.CharityName,
        description: (el.RegisteredCharityNumber).toString()
      }
    })
  }
});
