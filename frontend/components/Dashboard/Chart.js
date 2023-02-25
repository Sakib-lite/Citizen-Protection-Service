import React, { Fragment } from 'react';
import { useComplaintByFilter, usePoliceStationName } from '../../utils/hooks';
import BarChart from './BarChart';

const Chart = () => {
  const { policeStations, loading, error } = usePoliceStationName();
  const {
    complaints: solvedComplaints,
    loading: solvedLoading,
    error: solvedError,
  } = useComplaintByFilter('solved');
  const {
    complaints: pendingComplaints,
    loading: pendingLoading,
    error: pendingError,
  } = useComplaintByFilter('pending');

  if (
    loading ||
    error ||
    solvedError ||
    pendingError ||
    solvedLoading ||
    pendingLoading
  )
    return;

  const stations = [...policeStations];
  const solvedCompliaintsArr = [...solvedComplaints];
  const pendingCompliaintsArr = [...pendingComplaints];
  const sortedStations = [];
  const sortedSolvedComplaints = new Array(stations.length).fill(0);
  const sortedPendingComplaints = new Array(stations.length).fill(0);

  stations.sort((a, b) => a.complaints.length - b.complaints.length);
  solvedCompliaintsArr.sort((a, b) => a.name.localeCompare(b.name));

  solvedCompliaintsArr.forEach((comp) => {
    sortedSolvedComplaints.push(comp.count); // Push the name and age into the array
  });

  pendingCompliaintsArr.sort((a, b) => a.name.localeCompare(b.name));

  pendingCompliaintsArr.forEach((comp) => {
    sortedPendingComplaints.push(comp.count); // Push the name and age into the array
  });

  stations.forEach((station) => {
    sortedStations.push(station.name); // Push the name and age into the array
  });
  sortedStations.reverse();
  sortedSolvedComplaints.reverse();
  sortedPendingComplaints.reverse();


  return (
    <Fragment>
      <BarChart
        stationLabel={sortedStations}
        solvedComplaints={sortedSolvedComplaints}
        pendingComplains={sortedPendingComplaints}
      />
    </Fragment>
  );
};

export default Chart;
