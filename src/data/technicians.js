export const SEED_TECHNICIANS = [
  { id: 1, name: 'Marco D. Santos', skill: 'Air conditioner', years: 6, area: 'Alangilan', rating: '4.8', available: 'Today', verified: false },
  { id: 2, name: 'J. Reyes Electrical Services', skill: 'Outlets & wiring', years: 8, area: 'Alangilan', rating: '4.9', available: 'Today', verified: false },
  { id: 3, name: 'Paolo M. Cruz', skill: 'Refrigerator / freezer', years: 4, area: 'Batangas City', rating: '4.7', available: 'This week', verified: false },
  { id: 4, name: 'Ana L. Mendoza', skill: 'Washing machine', years: 5, area: 'Alangilan', rating: '4.9', available: 'Today', verified: false },
  { id: 5, name: 'R. Villanueva Appliance Repair', skill: 'Television', years: 7, area: 'Alangilan', rating: '4.6', available: 'This week', verified: false },
  { id: 6, name: 'Nico B. Flores', skill: 'Electric fan', years: 3, area: 'Alangilan', rating: '4.7', available: 'Today', verified: false },
  { id: 7, name: 'Batangas Home Tech', skill: 'Rice cooker / kitchen appliance', years: 9, area: 'Batangas City', rating: '4.8', available: 'This week', verified: false },
  { id: 8, name: 'L. Garcia', skill: 'Microwave / oven', years: 4, area: 'Alangilan', rating: '4.5', available: 'Today', verified: false },
  { id: 9, name: 'C. Dela Cruz', skill: 'Water dispenser', years: 5, area: 'Alangilan', rating: '4.6', available: 'Today', verified: false },
  { id: 10, name: 'M. Bautista', skill: 'Lighting & switches', years: 6, area: 'Batangas City', rating: '4.8', available: 'This week', verified: false },
].map((tech) => ({ ...tech, demo: true }));
