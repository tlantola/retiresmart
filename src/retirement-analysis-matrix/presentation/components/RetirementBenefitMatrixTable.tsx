import type { RetirementBenefitMatrix } from '../../domain/models/RetirementBenefitModels';

interface RetirementBenefitMatrixTableProps {
  matrix: RetirementBenefitMatrix;
}

export function RetirementBenefitMatrixTable({
  matrix,
}: RetirementBenefitMatrixTableProps) {
  const projections = Object.values(matrix.claimingAgeBenefits);

  if (projections.length === 0) {
    return null;
  }

  const projectionAges = Object.keys(
    projections[0].cumulativeBenefitAmountByAge,
  );

  return (
    <>
      <h3>Retirement Benefit Matrix</h3>

      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Projection Age</th>

              {projections.map((projection) => (
                <th key={projection.claimingAge}>{projection.claimingAge}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {projectionAges.map((projectionAge) => (
              <tr key={projectionAge}>
                <td>{projectionAge}</td>

                {projections.map((projection) => {
                  const value =
                    projection.cumulativeBenefitAmountByAge[
                      Number(projectionAge)
                    ];

                  return (
                    <td key={projection.claimingAge}>
                      {value === undefined
                        ? ''
                        : value.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
