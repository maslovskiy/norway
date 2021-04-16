import createDecorator from "final-form-calculate";

const valuesChecker = value => {
  if (value === undefined || value === null || isNaN(parseFloat(value))) {
    return 0
  } else {
    return Math.round(value * 100) / 100
  }
}

const multiplier = (a, b) =>
  Math.round((valuesChecker(a) * valuesChecker(b)) * 100) / 100

const divider = (a, b) => {
  const result = Math.round((valuesChecker(a) / valuesChecker(b)) * 100) / 100;
  return isFinite(result) && !isNaN(result) ? result : 0
}

const feeder = (a, b) =>
  Math.round((valuesChecker(a) + valuesChecker(b)) * 100) / 100


export const calculateShares = (existing_shares, number_of_shares_before_increase) =>
  divider(existing_shares, number_of_shares_before_increase)

export const calculateSubscriptionAmount = (new_shares, drawing_course) =>
  multiplier(new_shares, drawing_course)


export const calculator = createDecorator(
  {
    field: "number_of_shares_before_increase",
    updates: {
      total_existing_share_capital: (ignoredValue, allValues = {}) => {
        const {number_of_shares_before_increase, denomination} = allValues;
        return multiplier(number_of_shares_before_increase, denomination)
      },
      number_of_shares_after_increase: (ignoredValue, allValues = {}) => {
        const {number_of_new_shares, number_of_shares_before_increase} = allValues;
        return feeder(number_of_shares_before_increase, number_of_new_shares)
      }
    }
  },
  {
    field: "denomination",
    updates: {
      total_existing_share_capital: (ignoredValue, allValues = {}) => {
        const {number_of_shares_before_increase, denomination} = allValues;
        return multiplier(number_of_shares_before_increase, denomination)
      },
      sum_increased_share_capital: (ignoredValue, allValues = {}) => {
        const {number_of_new_shares, denomination} = allValues;
        return multiplier(number_of_new_shares, denomination)
      },
    }
  },
  {
    field: "number_of_new_shares",
    updates: {
      sum_increased_share_capital: (ignoredValue, allValues = {}) => {
        const {number_of_new_shares, denomination} = allValues;
        return multiplier(number_of_new_shares, denomination)
      },
      number_of_shares_after_increase: (ignoredValue, allValues = {}) => {
        const {number_of_new_shares, number_of_shares_before_increase} = allValues;
        return feeder(number_of_shares_before_increase, number_of_new_shares)
      }
    }
  },
  {
    field: "total_existing_share_capital",
    updates: {
      total_share_capital: (ignoredValue, allValues = {}) => {
        const {total_existing_share_capital, sum_increased_share_capital} = allValues;
        return feeder(total_existing_share_capital, sum_increased_share_capital)
      },
    }
  },
  {
    field: "sum_increased_share_capital",
    updates: {
      total_share_capital: (ignoredValue, allValues = {}) => {
        const {total_existing_share_capital, sum_increased_share_capital} = allValues;
        return feeder(total_existing_share_capital, sum_increased_share_capital)
      },
    }
  },
  {
    field: "generalMeetingTableValues",
    updates: {
      number_of_new_shares: (ignoredValue, allValues = {}) => {
        const {generalMeetingTableValues = []} = allValues;
        return generalMeetingTableValues.length > 0 ? generalMeetingTableValues
          .map(({new_shares}) => new_shares ? valuesChecker(new_shares) : 0)
          .reduce((acc, val) => feeder(acc, val)) : 0
      },
      total_subscription_amount: (ignoredValue, allValues = {}) => {
        const {generalMeetingTableValues = []} = allValues;
        return generalMeetingTableValues.length > 0 ? generalMeetingTableValues
          .map(({subscription_amount}) => subscription_amount ? valuesChecker(subscription_amount) : 0)
          .reduce((acc, val) => feeder(acc, val)) : 0
      }
    }
  },
  // {
  //   field: "total_subscription_amount",
  //   updates: {
  //     number_of_new_shares: (ignoredValue, allValues = {}) => {
  //       console.log("total_subscription_amount")
  //       // const {generalMeetingTableValues = []} = allValues;
  //       // return generalMeetingTableValues.length > 0 ? generalMeetingTableValues
  //       //   .map(({new_shares}) => new_shares ? valuesChecker(new_shares) : 0)
  //       //   .reduce((acc, val) => feeder(acc, val)) : 0
  //     },
  //   }
  // },
);