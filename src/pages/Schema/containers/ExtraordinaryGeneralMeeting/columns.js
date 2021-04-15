import React from "react";

export const columns = [
  {
    Header: 'Shareholder',
    accessor: 'shareholder',
    editable: true
  },
  {
    Header: '# existing shares',
    accessor: 'existing_shares',
    editable: true,
    type: "number",
    style: {
      width: "120px"
    }
  },
  {
    Header: '# new shares',
    accessor: 'new_shares',
    editable: true,
    type: "number",
    style: {
      width: "100px"
    }
  },
  {
    Header: 'represented with',
    accessor: 'represented_with',
    editable: true
  },
  {
    Header: '% shares',
    accessor: 'shares',
    type: "number",
    style: {
      width: "80px"
    }
  },
  {
    Header: 'subscription amount',
    accessor: 'subscription_amount',
    type: "number",
    style: {
      width: "150px"
    }
  },
];