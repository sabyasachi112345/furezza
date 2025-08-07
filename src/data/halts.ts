import { Halt } from '../types/halt';

export const generateDummyHalts = (): Halt[] => [
  { id: 1, name: "Warehouse", lat: 12.971598, lng: 77.594566 },
  { id: 2, name: "Checkpoint A", lat: 12.935192, lng: 77.614532 },
  { id: 3, name: "Delivery Point", lat: 12.927923, lng: 77.627108 },
];
