/* eslint-disable no-restricted-syntax */
import { useAppContext } from 'context/appContext';
import IRoutine from 'interfaces/Routine';
import { FC } from 'react';

const ClassRoutine: FC = () => {
  const appContext = useAppContext() as any;

  const getRoomNumber = (routine: IRoutine[]): string => {
    for (const item of routine) {
      if (item?.roomNumber) return item?.roomNumber;
    }
    return 'no room';
  };
  return (
    <div className="mt-8">
      <div>
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
          <tbody>
            {appContext.routines.map((item: IRoutine[]) => (
              <tr key={getRoomNumber(item)}>
                <td>{getRoomNumber(item)}</td>
                {item.map((sub: IRoutine, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <td colSpan={sub?.hour || 1} key={`child-${index}`}>
                    {sub?.courseName && (
                      <div>
                        <strong>{sub?.courseName}</strong>-
                        <strong className="text-primary">
                          ({sub.semester})
                        </strong>
                        <br />
                        <u>{sub?.teacherName}</u>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassRoutine;
