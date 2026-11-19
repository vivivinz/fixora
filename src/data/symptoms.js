export const SYMPTOMS_BY_APPLIANCE = {
  'Air conditioner': ['Not cooling', 'Water leaking', 'Loud noise', 'Bad smell', 'Not turning on', 'Ice buildup', 'Remote not working'],
  'Refrigerator / freezer': ['Not cold', 'Over-freezing', 'Noisy', 'Water pooling', 'Frost buildup', 'Door seal issue', 'Compressor clicking'],
  'Washing machine': ['Won’t spin', 'Won’t drain', 'Leaking', 'Excessive vibration', 'Door lock error', 'Not starting', 'Error code'],
  Television: ['No power', 'No picture', 'Lines / dead pixels', 'No sound', 'Backlight issue', 'HDMI not detected'],
  'Electric fan': ['Not turning on', 'Slow rotation', 'Unusual noise', 'Wobbling', 'Burning smell'],
  'Rice cooker / kitchen appliance': ['Not heating', 'Does not switch on', 'Overheating', 'Damaged cord', 'Unusual smell'],
  'Microwave / oven': ['Not heating', 'Turntable not moving', 'Sparks inside', 'Door not closing', 'Not turning on'],
  'Water dispenser': ['No water flow', 'Not cooling', 'Not heating', 'Leaking', 'Unusual noise'],
  'Electric stove / induction': ['Not heating', 'Error code', 'Uneven heating', 'Not turning on', 'Sparks'],
  'Lighting & switches': ['Light not working', 'Flickering', 'Switch feels hot', 'Buzzing sound'],
  'Outlets & wiring': ['Outlet not working', 'Sparks', 'Burning smell', 'Warm outlet', 'Breaker trips'],
  Other: ['Not turning on', 'Unusual noise', 'Leaking', 'Overheating', 'Other symptom'],
};

// A selected symptom containing any of these (case-insensitive) triggers the safety alert.
export const HAZARD_KEYWORDS = [
  'burning smell',
  'smoke',
  'sparks',
  'melted plug',
  'electric shock',
  'tingling',
  'water near electrical',
  'gas smell',
];

// Checkboxes in step 3 of Fixora Diagnose. Ticking any of them triggers the safety alert.
export const SAFETY_WARNING_SIGNS = [
  'Burning smell or smoke',
  'Sparks or melted plug',
  'Electric shock or tingling',
  'Water near electrical parts',
  'Gas smell',
];
