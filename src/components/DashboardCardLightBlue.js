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
  

const DashboardCardLightBlue = () =>{
    return (
        <CWidgetStatsA
                        color="info"
                        value={
                            <>
                            $6.200{' '}
                            </>
                        }
                    title="Income"
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
                        className="mt-3 mx-3"
                        style={{ height: '70px' }}
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                            datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(255,255,255,.55)',
                                pointBackgroundColor: getStyle('--cui-info'),
                                data: [1, 18, 9, 17, 34, 22, 11],
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
                                min: -9,
                                max: 39,
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

export default DashboardCardLightBlue