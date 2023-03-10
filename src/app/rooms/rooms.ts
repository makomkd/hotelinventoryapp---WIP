export interface Room {
    availableRooms: number;
    bookedRooms: number;
    totalRooms: number;
}

export interface RoomList {
    roomNum: string;
    roomType: string;
    amenities: string;
    price: number;
    rating: number;
    photos: string;
    checkInTime: Date;
    checkOutTime: Date;
}