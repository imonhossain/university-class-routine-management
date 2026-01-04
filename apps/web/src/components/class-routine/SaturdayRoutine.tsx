import { FC } from 'react';
import DisplayRoutineList from './DisplayRoutineList';

interface Props {
  routines: any[];
}

const SaturdayRoutine: FC<Props> = ({ routines }) => {
  return (
    <>
      <h1>Saturday Routine</h1>
      <div className="mb-8">
        <table className="nub-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>6:00pm-7:00pm</th>
              <th>7:00pm-8:00pm</th>
              <th>8:00pm-9:00pm</th>
              <th>9:00pm-10:00pm</th>
            </tr>
          </thead>
          <DisplayRoutineList routines={routines} />
        </table>
      </div>
    </>
  );
};

export default SaturdayRoutine;
