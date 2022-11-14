import IRoutine from 'interfaces/Routine';
import { FC } from 'react';
import { getRoomNumber } from 'services/UtilsService';

interface Props {
  routines: any[];
}

const DisplayRoutineList: FC<Props> = ({ routines }) => {
  return (
    <tbody>
      {routines.map((item: IRoutine[]) => (
        <tr key={getRoomNumber(item)}>
          <td>
            <strong className="text-error">{getRoomNumber(item)}</strong>
          </td>
          {item.map((sub: IRoutine) => (
            <td colSpan={sub?.hour || 1} key={`child-${sub?.id}`}>
              {sub?.courseName && (
                <div>
                  <strong>{sub?.courseName}</strong>-
                  <strong className="text-primary">({sub.semester})</strong>
                  <br />
                  <u>{sub?.teacherName}</u>
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DisplayRoutineList;
