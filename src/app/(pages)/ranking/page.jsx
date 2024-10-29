import { HeaderRanking } from '@/app/(components)/HeaderRanking'
import { RankingSection } from '@/app/(components)/RankingSection'
import { Stats } from '@/app/(components)/Stats'
import React from 'react'

const Ranking = () => {
    return (
        <div className="h-full w-full bg-gray-50  overflow-y-scroll">
            <HeaderRanking />
            <Stats />
            <RankingSection />
        </div>
    )
}

export default Ranking