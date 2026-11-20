import type { RetirementBenefitMatrix } from '../../domain/models/RetirementBenefitModels';

interface RetirementBenefitMatrixTableProps {
  matrix: RetirementBenefitMatrix;
}

export function RetirementBenefitMatrixTable({
  matrix,
}: RetirementBenefitMatrixTableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Claiming Age</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(matrix.claimingAgeBenefits).map((age) => (
            <tr key={age}>
              <td>{age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
