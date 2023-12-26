export interface Attendee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    diplomaId: number;
    diplomaCategoryId: number;
    isIrlAttendee: boolean;
    regionalCode: string;
    virtualTourSatisfaction: number;
    websiteSatisfaction: number;
}