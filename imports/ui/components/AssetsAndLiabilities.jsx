import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const AssetsAndLiabilities = ({ data }) => {
  console.log(data);
  if (data === undefined) {
    console.log('there are no assets')
    return (
      <span></span>
    )
  }

  const {
    TotalFixedAssets,
    FixedAssetInvestments,
    PensionFundAssets,
    TotalCurrentAssets,
    CreditorsDueWithinOneYear,
    LongTermCreditors
  } = data;

  const OwnUseAssets = TotalFixedAssets + FixedAssetInvestments;
  const LongTermInvestments = FixedAssetInvestments;
  const PensionSchemeAssetLiability = PensionFundAssets;
  const OtherAssets = TotalCurrentAssets;
  const TotalLiability = CreditorsDueWithinOneYear + LongTermCreditors;

  return (
    <div className="stretched row">
      <div className="column">
        <div className="ui tiny statistic">
          <div className="value">
            {currencyFormat(OwnUseAssets)}
          </div>
          <div className="label">
            Own Use Assets
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui tiny statistic">
          <div className="value">
            {currencyFormat(LongTermInvestments)}
          </div>
          <div className="label">
            Long Term Investments
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui tiny statistic">
          <div className="value">
            {currencyFormat(PensionSchemeAssetLiability)}
          </div>
          <div className="label">
            Pension Scheme Asset/Liability
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui tiny statistic">
          <div className="value">
            {currencyFormat(OtherAssets)}
          </div>
          <div className="label">
            Other Assets
          </div>
        </div>
      </div>
      <div className="column">
        <div className="ui tiny statistic">
          <div className="value">
            {currencyFormat(TotalLiability)}
          </div>
          <div className="label">
            Total Liability
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsAndLiabilities;
