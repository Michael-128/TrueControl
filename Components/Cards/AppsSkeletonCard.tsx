import React from 'react';
import { Card, Text } from "@ui-kitten/components";
import { CDivider } from "../Custom/CDivider";
import { CIconHeader } from "../Typography/CIconHeader";
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { CVerticalSpacer } from '../Custom/CVerticalSpacer';

export function AppsSkeletonCard() {
    const colorMode = 'light'

    return (
        <Card>
            <Skeleton colorMode={colorMode} width={'100%'} height={20}/>

            <CDivider/>

            <MotiView
                transition={{
                type: 'timing',
                }}
                animate={{ backgroundColor: '#fff' }}
            >
                <Skeleton colorMode={colorMode} width={'100%'} height={75} />
            </MotiView>
        </Card>
    )
}