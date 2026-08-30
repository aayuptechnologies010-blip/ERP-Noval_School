import React from 'react';
import './styles.css';

export default function FeeAmountTable({ data }) {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <table className="erp-table">
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Fee Head</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{row.feeHead}</td>
              <td className="text-right">{row.amount.toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" style={{ textAlign: 'center' }}>Total</td>
          <td className="text-right">{total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
