exports.getValue = (array, key) => {
  return array.filter(o => o.key === key)[0].value;
};

exports.departures = [
  { key: '01', value: 'Johor' },
  { key: '02', value: 'Kedah' },
  { key: '03', value: 'Kelantan' },
  { key: '14', value: 'Kuala Lumpur' },
  { key: '15', value: 'Labuan' },
  { key: '04', value: 'Melaka' },
  { key: '05', value: 'Negeri Sembilan' },
  { key: '06', value: 'Pahang' },
  { key: '07', value: 'Penang' },
  { key: '08', value: 'Perak' },
  { key: '09', value: 'Perlis' },
  { key: '16', value: 'Putrajaya' },
  { key: '12', value: 'Sabah' },
  { key: '13', value: 'Sarawak' },
  { key: '10', value: 'Selangor' },
  { key: '11', value: 'Terengganu' },
];

exports.arrivals = [
  { key: '01', value: 'Johor' },
  { key: '02', value: 'Kedah' },
  { key: '03', value: 'Kelantan' },
  { key: '14', value: 'Kuala Lumpur' },
  { key: '15', value: 'Labuan' },
  { key: '04', value: 'Melaka' },
  { key: '05', value: 'Negeri Sembilan' },
  { key: '06', value: 'Pahang' },
  { key: '07', value: 'Penang' },
  { key: '08', value: 'Perak' },
  { key: '09', value: 'Perlis' },
  { key: '16', value: 'Putrajaya' },
  { key: '12', value: 'Sabah' },
  { key: '13', value: 'Sarawak' },
  { key: '10', value: 'Selangor' },
  { key: '11', value: 'Terengganu' },
];


exports.dates = [
  { key: '01', value: '01-09-2021' },
  { key: '02', value: '02-09-2021' },
  { key: '03', value: '03-09-2021' },
  { key: '14', value: '04-09-2021' },
  { key: '15', value: '05-09-2021' },
  { key: '04', value: '06-09-2021' },
  { key: '05', value: '07-09-2021' },
  { key: '06', value: '08-09-2021' },
  { key: '07', value: '09-09-2021' },
  { key: '08', value: '10-09-2021' },
  { key: '09', value: '11-09-2021' },
  { key: '16', value: '12-09-2021' },
  { key: '12', value: '13-09-2021' },
  { key: '13', value: '14-09-2021' },
  { key: '10', value: '15-09-2021' },
  { key: '11', value: '16-09-2021' },
];