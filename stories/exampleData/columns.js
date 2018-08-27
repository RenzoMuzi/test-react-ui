const generateUrlRedirect = (record) => (`/Patient/Details?patientId=${record.PatientId}`);

export default [
  {
    title: [{ headerName: ['Patient'], key: 'KdLabel' }],
    subtitle: [
      { headerName: [''], key: 'Phones', subKey: 'PhoneNumber', prefix: 'Phone: ', format: 'phone' },
      { headerName: [''], key: 'PatientGroupName', prefix: 'Groups: ' },
    ],
    highlighted: true,
    options: { subtitleJoin: 'list', generateUrl: (record) => generateUrlRedirect(record) },
  },
  {
    title: [{ headerName: ['Rdc', 'Maint.'], key: 'RdcMaint', format: 'percent' }],
    subtitle: [],
    tooltip: ['RDC Maintenance'],
  },
  {
    title: [{ headerName: ['Rdc', 'Hyp.'], key: 'RdcHyp', format: 'percent' }],
    subtitle: [],
    tooltip: ['RDC Hypertension'],
  },
  {
    title: [{ headerName: ['Rdc', 'Chol'], key: 'RdcChol', format: 'percent' }],
    subtitle: [],
    tooltip: ['RDC Cholesterol'],
  },
  {
    title: [{ headerName: ['Age'], key: 'Age' }],
    subtitle: [{ headerName: ['DoB'], key: 'BirthDate', format: 'date' }],
  },
  {
    title: [{ headerName: ['Maint'], key: 'MaintMeds' }, { headerName: 'Meds', key: 'ActiveMeds' }],
    subtitle: [{ headerName: ['Billing Total'], key: 'BillingsTotalMM', format: 'currency' }],
    tooltip: ['Maintenance Meds / Active Meds'],
  },
  {
    title: [{ headerName: ['Rdc', 'Diab.'], key: 'RdcDiab', format: 'percent' }],
    subtitle: [],
    tooltip: ['RDC Diabetes'],
  },
];
