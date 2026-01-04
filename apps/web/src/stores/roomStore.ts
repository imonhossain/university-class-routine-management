import { create } from 'zustand';
import IRoom from 'interfaces/Room';

interface RoomState {
  rooms: IRoom[];
  setRooms: (rooms: IRoom[]) => void;
  addRoom: (room: IRoom) => void;
  deleteRoom: (id: string) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [room, ...state.rooms] })),
  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
    })),
}));
