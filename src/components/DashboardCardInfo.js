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
  

const DashboardCardInfo = () =>{
    return (
        <CWidgetStatsA
            color="warning"
            value={
            <>
                170{' '}
            </>
            }
            title="TV Shows"
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
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
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
                    display: false,
                    },
                    y: {
                    display: false,
                    },
                },
                elements: {
                    line: {
                    borderWidth: 2,
                    tension: 0.4,
                    },
                    point: {
                    radius: 0,
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

export default DashboardCardInfo




