import React from 'react'
import PerformaChart from './Chart'
import { Button } from '@/components/ui/button'
import PrintIcon from '../../../../../../public/assets/icons/PrintIcon'

const TabPerforma = () => {
    return (
        <div>
            <div className="">
                <Button
                    variant="outlinePrimary"
                    className='flex items-center gap-3'
                >
                    Performa
                    <PrintIcon />
                </Button>
            </div>
            <div className="mt-7">
                <PerformaChart />
            </div>
        </div>
    )
}

export default TabPerforma