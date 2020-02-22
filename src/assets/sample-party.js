export default {
  id: 1,
  name: "Party 1",
  state: "COMPLETE",
  members: [
    {
      id: 1,
      name: "Kesha"
    },
    {
      id: 2,
      name: "Igor"
    }
  ],
  expenses: [
    {
      id: 1,
      name: "Chocolate",
      price: 500,
      payMemberId: 1,
    }
  ],
  coefficients: [
    {
      memberId: 1,
      expenseId: 1,
      coefficient: 1
    },
    {
      memberId: 2,
      expenseId: 1,
      coefficient: 0.5
    }
  ],
  transfers: [
    {
      fromMemberId: 2,
      toMemberId: 1,
      amount: 150
    }
  ]
}