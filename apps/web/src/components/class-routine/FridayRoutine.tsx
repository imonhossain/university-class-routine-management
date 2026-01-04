import { FC } from 'react';
import DisplayRoutineList from './DisplayRoutineList';

interface Props {
  routines: any[];
}

const FridayRoutine: FC<Props> = ({ routines }) => {
  return (
    <>
      <h1>Friday Routine</h1>
      <div className="mb-8">
        <table className="nub-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>8:45am-9:45am</th>
              <th>9:45am-10:45am</th>
              <th>10:45am-11:45am</th>
              <th>11:45am-12:45am</th>
              <th>2:30pm-3:30pm</th>
              <th>3:30pm-4:30pm</th>
              <th>4:30pm-5:30pm</th>
              <th>5:30pm-6:30pm</th>
              <th>6:30pm-7:30pm</th>
              <th>7:30pm-8:30pm</th>
            </tr>
          </thead>
          <DisplayRoutineList routines={routines} />
        </table>
      </div>
    </>
  );
};

export default FridayRoutine;
