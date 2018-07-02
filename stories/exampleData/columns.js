export default [
  {
    title: [{ headerName: ['Patient'], key: 'KdLabel' }],
    subtitle: [{ headerName: [''], key: 'patientGroups', prefix: 'Groups: ' }],
    highlighted: true,
  },
  {
    title: [{ headerName: ['Rdc', 'Maint.'], key: 'RdcMaint', format: 'percent' }],
    subtitle: [],
  },
  {
    title: [{ headerName: ['Rdc', 'Hyp.'], key: 'RdcHyp', format: 'percent' }],
    subtitle: [],
  },
  {
    title: [{ headerName: ['Rdc', 'Chol'], key: 'RdcChol', format: 'percent' }],
    subtitle: [],
  },
  {
    title: [{ headerName: ['Age'], key: 'Age' }],
    subtitle: [{ headerName: ['DoB'], key: 'BirthDate', format: 'date' }],
  },
  {
    title: [{ headerName: ['Maint'], key: 'MaintMeds' }, { headerName: 'Meds', key: 'ActiveMeds' }],
    subtitle: [{ headerName: ['Billing Total'], key: 'BillingTotalMM', format: 'currency' }],
  },
  {
    title: [{ headerName: ['Rdc', 'Diab.'], key: 'RdcDiab', format: 'percent' }],
    subtitle: [],
  },
];