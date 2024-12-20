import React from 'react';
import ScreenHeader from '../components/ScreenHeader'
import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
  } from '@coreui/react'
  import { getStyle } from '@coreui/utils'
  import { CChartBar, CChartLine } from '@coreui/react-chartjs'
  import CIcon from '@coreui/icons-react'
  import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
  

const DashboardCardBlue = () =>{
    return (
                    <CWidgetStatsA
                        color="primary"
                        value={
                            <>
                            26K{' '}
                            {/* <span className="fs-6 fw-normal">
                                (-12.4% <CIcon icon={cilArrowBottom} size='m'/>)
                            </span> */}
                            </>
                        }
                        title="Users"
                        action={
                            <CDropdown alignment="end">
                            <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                                <CIcon icon={cilOptions} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                <CDropdownItem>Another action</CDropdownItem>
                                <CDropdownItem>Something else here...</CDropdownItem>
                                <CDropdownItem disabled>Disabled action</CDropdownItem>
                            </CDropdownMenu>
                            </CDropdown>
                        }
                        chart={
                            <CChartLine
                            // ref={widgetChartRef1}
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                {
                                    label: 'My First dataset',
                                    backgroundColor: 'transparent',
                                    borderColor: 'rgba(255,255,255,.55)',
                                    pointBackgroundColor: getStyle('--cui-primary'),
                                    data: [65, 59, 84, 84, 51, 55, 40],
                                },
                                ],
                            }}
                            options={{
                                plugins: {
                                legend: {
                                    display: false,
                                },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                x: {
                                    border: {
                                    display: false,
                                    },
                                    grid: {
                                    display: false,
                                    drawBorder: false,
                                    },
                                    ticks: {
                                    display: false,
                                    },
                                },
                                y: {
                                    min: 30,
                                    max: 89,
                                    display: false,
                                    grid: {
                                    display: false,
                                    },
                                    ticks: {
                                    display: false,
                                    },
                                },
                                },
                                elements: {
                                line: {
                                    borderWidth: 1,
                                    tension: 0.4,
                                },
                                point: {
                                    radius: 4,
                                    hitRadius: 10,
                                    hoverRadius: 4,
                                },
                                },
                            }}
                            />
                        }
            />
          
    )

}

export default DashboardCardBlue