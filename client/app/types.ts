export type RootStackParamList = {
    // List all screens here with their respective parameter types
    home: undefined;  // Home screen does not require any parameters
    booking: { bookingId: string };  // Booking screen requires a bookingId parameter
    level: { level: number };  // Level screen requires a level number parameter
    // Add more screens here
  };
  