import React from 'react';
import { Card, Text } from "@ui-kitten/components";
import { CDivider } from "../Custom/CDivider";
import { CIconHeader } from "../Typography/CIconHeader";
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { CVerticalSpacer } from '../Custom/CVerticalSpacer';

export function OverviewSkeletonCard(props: {title: string, iconName: string}) {
    const colorMode = 'light'

    return (
        <Card>
            <CIconHeader iconName={props.iconName}>
                {props.title}
            </CIconHeader>

            <CDivider/>

            <MotiView
                transition={{
                type: 'timing',
                }}
                animate={{ backgroundColor: '#fff' }}
            >


                <Skeleton colorMode={colorMode} width={'100%'} height={20} />
                <CVerticalSpacer margin={5}/>
                <Skeleton colorMode={colorMode} width={'100%'} height={20} />
                <CVerticalSpacer margin={5}/>
                <Skeleton colorMode={colorMode} width={'100%'} height={20} />
                <CVerticalSpacer margin={5}/>
                <Skeleton colorMode={colorMode} width={'100%'} height={20} />
            </MotiView>
        </Card>
    )
}