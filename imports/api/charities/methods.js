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
  },
  topGrossIncome() {
    const findParams = {
      "RegistrationHistory.RemovalReason": { $eq: "" },
      "Submission": { $exists: true }
    };

    function withSubmissionsOnly(x) {
      return x.hasOwnProperty('Submission');
    };

    function grossIncomeToInt(x) {
      const lastSubmission = Array.from(x.Submission).pop();
      const GrossIncome = lastSubmission.GrossIncome === '' ? 0 : parseInt(lastSubmission.GrossIncome);
      const res = {
        CharityName: x.CharityName,
        RegisteredCharityNumber: x.RegisteredCharityNumber,
        GrossIncome: GrossIncome
      };
      return res;
    };

    function sortByGrossIncome(a, b) {
      if (a.GrossIncome > b.GrossIncome) {
        return -1
      };
      if (a.GrossIncome < b.GrossIncome) {
        return 1
      };
      return 0;
    };

    const res = Charities.find(findParams, {
        // limit: 10,
        fields: { CharityName: 1, RegisteredCharityNumber: 1, Submission: 1 }
      }).fetch()
      .filter(withSubmissionsOnly)
      .map(grossIncomeToInt)
      .sort(sortByGrossIncome);
      console.log(res[0]);
    return res[0];
  }
});
