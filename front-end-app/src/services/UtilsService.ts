/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from 'axios';
import { TimeSlotConstant } from 'constants/TimeSlotConstant';
import DayType from 'enums/DayType';
import EntityName from 'enums/EntityName';
import IBooking from 'interfaces/Booking';
import IRoutine from 'interfaces/Routine';
import ISemesterReport from 'interfaces/SemesterReport';
import ITeacherReport from 'interfaces/TeacherReport';
import ITeacherReportGraph from 'interfaces/TeacherReportGraph';
import { ITimeSlot } from 'interfaces/TimeSlot';
import { toastError } from 'services/ToasterServices';

export const errorMessage = (statusCode: number, type?: EntityName): string => {
  const entityName = type || '';
  switch (statusCode) {
    case 500:
      return 'something went wrong please try again';
    case 405:
      return `Sorry! ${entityName} couldn't find it.`;
    case 404:
      return `Sorry! ${entityName} couldn't find it.`;
    case 400:
      return `Invalid ${entityName} input data`;
    default:
      return `${entityName} has some problem`;
  }
};

export const httpErrorDisplay = (error: any, type?: EntityName): void => {
  // NOTE: this log for understanding error
  /* eslint-disable-next-line no-console */
  console.error('error', error);
  if (error?.response?.data?.message) {
    toastError(error.response.data.message);
  } else {
    const err = error as AxiosError;
    const statusCode: number = err.response?.status as number;
    toastError(errorMessage(statusCode, type));
  }
};
export const getTimePeriodById = (timeSlotId: string): ITimeSlot => {
  const found = TimeSlotConstant.find((timeSlot) => timeSlot.id === timeSlotId);
  if (found) {
    return found;
  }
  toastError('Time Slot id invalid');
  return {} as ITimeSlot;
};

export const convertBookingToRoutine = (bookings: IBooking): IRoutine => {
  const timeSlotList = bookings.timeSlotId.split(',');
  const timeSlot: ITimeSlot = getTimePeriodById(timeSlotList[0]);
  const routine: IRoutine = {
    ...bookings,
    startTime: timeSlot.startTime,
    endTime: getTimePeriodById(timeSlotList[timeSlotList.length - 1]).endTime,
    dayGroup: timeSlot.dayGroup,
    hour: timeSlotList.length,
    startId: Number(timeSlot.id),
  };
  return routine;
};

export const convertBookingToRoutines = (
  bookings: IBooking[],
  dayType: DayType,
): IRoutine[] => {
  const hasMap = {};
  for (const booking of bookings) {
    const routine = convertBookingToRoutine(booking);
    if (hasMap[booking.roomId]) {
      hasMap[booking.roomId].push(routine);
    } else {
      hasMap[booking.roomId] = [];
      hasMap[booking.roomId].push(routine);
    }
  }
  const list: IRoutine[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [key, value] of Object.entries(hasMap)) {
    const temp = value as IRoutine[];
    const sortedList = temp.sort((a, b) => a.startId - b.startId);
    const finalList = [];
    if (dayType === DayType.FRIDAY) {
      let index = 1;
      let childIndex = 0;
      while (index < 11) {
        const item = sortedList[childIndex];
        if (item?.timeSlotId.split(',').includes(index.toString())) {
          finalList.push(item);
          childIndex += 1;
          index += item.hour;
          // sortedList.push()
        } else {
          finalList.push([] as unknown as IRoutine);
          index += 1;
        }
      }
    } else {
      let index = 11;
      let childIndex = 0;
      while (index <= 14) {
        const item = sortedList[childIndex];
        if (item?.timeSlotId.split(',').includes(index.toString())) {
          finalList.push(item);
          childIndex += 1;
          index += item.hour;
          // sortedList.push()
        } else {
          finalList.push([] as unknown as IRoutine);
          index += 1;
        }
      }
    }

    list.push(finalList as unknown as IRoutine);
  }
  return list;
};

export const getFridayBooking = (bookings: IBooking[]) => {
  return bookings.filter((item) => {
    const timeSlot = getTimePeriodById(item.timeSlotId.split(',')[0]);
    if (timeSlot.dayGroup === 1 || timeSlot.dayGroup === 2) {
      return item;
    }
  });
};
export const getSaturDayBooking = (bookings: IBooking[]) => {
  return bookings.filter((item) => {
    const timeSlot = getTimePeriodById(item.timeSlotId.split(',')[0]);
    if (timeSlot.dayGroup === 3) {
      return item;
    }
  });
};

export const getRoomNumber = (routine: IRoutine[]): string => {
  for (const item of routine) {
    if (item?.roomNumber) return item?.roomNumber;
  }
  return 'no room';
};

export const getSemesterWiseData = (
  semester: number,
  bookings: IBooking[],
): ISemesterReport[] => {
  return bookings
    .filter((item: IBooking) => item.semester === semester)
    .map((booking: IBooking) => {
      const timeSlotsIds = booking.timeSlotId.split(',');
      const timeSlot: ITimeSlot = getTimePeriodById(timeSlotsIds[0]);
      const timeSlotEnd: ITimeSlot = getTimePeriodById(
        timeSlotsIds[timeSlotsIds.length - 1],
      );
      const obj: ISemesterReport = {
        day: timeSlot.dayGroup === 3 ? DayType.SATURDAY : DayType.FRIDAY,
        courseName: booking.courseName as string,
        startTime: timeSlot.startTime,
        endTime: timeSlotEnd.endTime,
        roomNumber: booking.roomNumber as string,
        courseCode: booking.courseCode as string,
        teacherName: booking.teacherName as string,
      };
      return obj;
    });
};
export const getTeacherWiseData = (
  teacherId: string,
  bookings: IBooking[],
): ITeacherReport[] => {
  return bookings
    .filter((item: IBooking) => item.teacherId === teacherId)
    .map((booking: IBooking) => {
      const timeSlotsIds = booking.timeSlotId.split(',');
      const timeSlot: ITimeSlot = getTimePeriodById(timeSlotsIds[0]);
      const timeSlotEnd: ITimeSlot = getTimePeriodById(
        timeSlotsIds[timeSlotsIds.length - 1],
      );
      const obj: ITeacherReport = {
        day: timeSlot.dayGroup === 3 ? DayType.SATURDAY : DayType.FRIDAY,
        courseName: booking.courseName as string,
        startTime: timeSlot.startTime,
        endTime: timeSlotEnd.endTime,
        roomNumber: booking.roomNumber as string,
        courseCode: booking.courseCode as string,
        teacherName: booking.teacherName as string,
        semester: booking.semester,
      };
      return obj;
    });
};

export const teacherReportGraph = (
  bookings: IBooking[],
): ITeacherReportGraph[] => {
  const hasMap = {};
  for (const item of bookings) {
    if (hasMap[item.teacherId]) {
      hasMap[item.teacherId] += item.courseCredit;
    } else {
      hasMap[item.teacherId] = item.courseCredit;
    }
  }
  const list: ITeacherReportGraph[] = [];
  for (const [key, value] of Object.entries(hasMap)) {
    const found: IBooking | undefined = bookings.find(
      (item: IBooking) => item.teacherId === key,
    );
    if (found) {
      const obj: ITeacherReportGraph = {
        name: found.teacherName as string,
        credit: value as number,
      };
      list.push(obj);
    }
  }
  return list;
};
