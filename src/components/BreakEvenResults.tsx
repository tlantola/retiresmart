interface BreakEvenResultsProps {
  breakEvenAge: number;
}

export function BreakEvenResults({
  breakEvenAge,
}: BreakEvenResultsProps) {
  return (
    <section>
      <h2>Results</h2>

      <p>
        Break-even Age: {breakEvenAge}
      </p>
    </section>
  );
}
