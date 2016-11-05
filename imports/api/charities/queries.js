// set of homepage queries to be used on client & server
import { Charities } from './charities'

export const topGrossIncomeQuery = function function_name(val) {
  return Charities.find({
    "GrossIncome": { $type: 1 }
  }, {
    sort: { "GrossIncome": -1 }
  });
}

export const bottomGrossIncomeQuery = function function_name(val) {
  return Charities.find({
    "GrossIncome": { $type: 1 }
  }, {
    sort: { "GrossIncome": 1 }
  });
}

export const topTotalExpenditureQuery = function function_name(val) {
  return Charities.find({
    "TotalExpenditure": { $type: 1 }
  }, {
    sort: { "TotalExpenditure": -1 }
  });
}

export const bottomTotalExpenditureQuery = function function_name(val) {
  return Charities.find({
    "TotalExpenditure": { $type: 1 }
  }, {
    sort: { "TotalExpenditure": 1 }
  });
}


export const currentCharity = function (val) {
	return Charities.find({"RegisteredCharityNumber": val})
}
