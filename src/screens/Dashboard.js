import React,{useState} from 'react';
import ScreenHeader from '../components/ScreenHeader'
import {
    CRow,
    CCol
  } from '@coreui/react'
import DashboardCardBlue from '../components/DashboardCardBlue';
import DashboardCardLightBlue from '../components/DashboardCardLightBlue';  
import DashboardCardInfo from '../components/DashboardCardInfo';
import DashboardCardDanger from '../components/DashboardCardDanger';
import Chart from 'react-google-charts';
import {
    CCard,
    CCardBody,
    CCardHeader,
  } from '@coreui/react'

import { DataGrid } from '@mui/x-data-grid';

const data = [
    ["Year", "Sales", "Expenses"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
  ];

export const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
};

const Dashboard = () =>{
    const [shows, setShows] = useState([
        {
          id: 1,
          image: "https://via.placeholder.com/50",
          name: "Show 1",
          totalViews: "20204",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/50",
          name: "Show 2",
          totalViews: "20005",
        },
        {
          id: 3,
          name: "Show 3",
          image: "https://via.placeholder.com/50",
          totalViews: "100005",
        },
        {
          id: 4,
          image: "https://via.placeholder.com/50",
          name: "Show 4",
          totalViews: "9952",
        },
      ]);

      const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "image",
          headerName: "Image",
          width: 100,
          renderCell: (params) => (
            <img src={params.value} alt="show" style={{ width: "50px", height: "50px" }} />
          ),
        },
        { field: "name", headerName: "Name", width: 200 },
        { field: "totalViews", headerName: "Total Views", width: 150 }
      ];
    

    return (
        <div className='container'>
            <ScreenHeader label='Dashboard'/>
            <CRow>
                <CCol sm={6} xl={4} xxl={3}>
                    <DashboardCardBlue />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <DashboardCardLightBlue />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <DashboardCardInfo />
                </CCol>
                <CCol sm={6} xl={4} xxl={3}>
                    <DashboardCardDanger />
                </CCol>
            </CRow>
            <CRow>
               <CCol xs>
               <CCard className="mb-4 mt-4">
                   <CCardHeader>Traffic {' & '} Sales</CCardHeader>
                   <CCardBody>
                   <CRow>
                       <CCol xs={12} md={6} xl={6}>
                       <CRow>
                           <CCol xs={6}>
                           <div className="border-start border-start-4 border-start-info py-1 px-3">
                               <div className="text-body-secondary text-truncate small">New Clients</div>
                               <div className="fs-5 fw-semibold">9,123</div>
                           </div>
                           </CCol>
                           <CCol xs={6}>
                           <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                               <div className="text-body-secondary text-truncate small">
                               Recurring Clients
                               </div>
                               <div className="fs-5 fw-semibold">22,643</div>
                           </div>
                           </CCol>
                       </CRow>
                       <hr className="mt-0" />

                       </CCol>
                       <CCol xs={12} md={6} xl={6}>
                           <CRow>
                               <CCol xs={6}>
                               <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                   <div className="text-body-secondary text-truncate small">Pageviews</div>
                                   <div className="fs-5 fw-semibold">78,623</div>
                               </div>
                               </CCol>
                               <CCol xs={6}>
                               <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                   <div className="text-body-secondary text-truncate small">Organic</div>
                                   <div className="fs-5 fw-semibold">49,123</div>
                               </div>
                               </CCol>
                           </CRow>

                           <hr className="mt-0" />
                       </CCol>
                       <CCol xs={12} md={12} xl={12}>
                           <Chart
                               chartType="LineChart"
                               width="100%"
                               height="100%"
                               data={data}
                               options={options}
                               legendToggle
                           />
                       </CCol>
                   </CRow>
                   </CCardBody>
               </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol xs={6} md={6} xl={6}>
                    <CCard className="mb-4 mt-4">
                        <CCardHeader>Top Performing Contents</CCardHeader>
                        <DataGrid rows={shows} columns={columns} pageSize={5} />
                    </CCard>
                </CCol>

                <CCol xs={6} md={6} xl={6}>
                    <CCard className="mb-4 mt-4">
                        <CCardHeader>Low Performing Contents</CCardHeader>
                        <DataGrid rows={shows} columns={columns} pageSize={5} />
                    </CCard>
                </CCol>
                
            </CRow>

        </div>
    )

}

export default Dashboard