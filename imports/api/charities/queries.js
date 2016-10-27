// set of homepage queries to be used on client & server
import { Charities } from './charities'

export const topGrossIncomeQuery = Charities.find({
  "GrossIncome": { $type: 1 }
}, {
  sort: { "GrossIncome": -1 }
});
