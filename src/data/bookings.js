import { SEED_TECHNICIANS as T } from './technicians.js';

// Every step shown in the booking-detail timeline, in order.
export const BOOKING_STATUSES = [
  'Requested',
  'Technician Accepted',
  'Owner Authorization',
  'Confirmed',
  'Technician En Route',
  'Inspection Done',
  'Quote Sent',
  'Repair In Progress',
  'Completed',
  'Rated',
];

export const isActiveBooking = (booking) => !['Completed', 'Rated'].includes(booking.status);

export const SEED_BOOKINGS = [
  { id: 'FX-1001', appliance: 'Air conditioner', issue: 'Not cooling', tech: T[0].name, status: 'Requested', customer: 'Demo Student', owner: 'Own appliance', date: '2026-11-22', time: '10:00 AM', created: 'Demo record' },
  { id: 'FX-1002', appliance: 'Refrigerator / freezer', issue: 'Not cold', tech: T[2].name, status: 'Technician Accepted', customer: 'Demo Café Owner', owner: 'Own appliance', date: '2026-11-23', time: '1:00 PM', created: 'Demo record' },
  { id: 'FX-1003', appliance: 'Washing machine', issue: 'Won’t drain', tech: T[3].name, status: 'Confirmed', customer: 'Demo Dorm Owner', owner: 'Shared appliance', date: '2026-11-24', time: '2:00 PM', created: 'Demo record' },
  { id: 'FX-1004', appliance: 'Television', issue: 'No picture', tech: T[4].name, status: 'Repair In Progress', customer: 'Demo Student', owner: 'Own appliance', date: '2026-11-20', time: '4:00 PM', created: 'Demo record' },
  { id: 'FX-1005', appliance: 'Electric fan', issue: 'Slow rotation', tech: T[5].name, status: 'Completed', customer: 'Demo Café Owner', owner: 'Own appliance', date: '2026-11-18', time: '9:00 AM', created: 'Demo record' },
  { id: 'FX-1006', appliance: 'Rice cooker / kitchen appliance', issue: 'Not heating', tech: T[6].name, status: 'Quote Sent', customer: 'Demo Dorm Owner', owner: 'Landlord-owned', date: '2026-11-21', time: '11:00 AM', created: 'Demo record' },
  { id: 'FX-1007', appliance: 'Water dispenser', issue: 'Leaking', tech: T[8].name, status: 'Requested', customer: 'Demo Student', owner: 'Own appliance', date: '2026-11-25', time: '3:00 PM', created: 'Demo record' },
  { id: 'FX-1008', appliance: 'Lighting & switches', issue: 'Flickering', tech: T[9].name, status: 'Rated', customer: 'Demo Café Owner', owner: 'Own appliance', date: '2026-11-17', time: '9:00 AM', created: 'Demo record' },
];
