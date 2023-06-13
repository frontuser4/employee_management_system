import ExpenceTable from '../component/expence/ExpenceTable';

const ExpenceTables = ({year, month}) => {

  return (
    <>
    <ExpenceTable
      year={year}
      month={month}
    />
    </>
  )
}

export default ExpenceTables;