 export interface Event {
  _id: string;
  title: string;
  category: string;
  date: string;
  startTime: string;
  location: string;
  volunteerSpots: number;
  imageUrl: string;
  description: string;
  organizerEmail: string;

  joinedCount?: number;
  remainingSpots?: number;

  volunteers?: {
    _id: string;
    name: string;
    image?: string;
    joinedAt?: string;
  }[];
}