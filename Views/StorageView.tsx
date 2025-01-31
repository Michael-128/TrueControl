import { Card, Text, useTheme } from "@ui-kitten/components";
import { BaseView } from "./BaseView";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { CProgressBar } from "../Components/Custom/CProgressBar";
import { CDivider } from "../Components/Custom/CDivider";
import { toSize } from "../Components/Helpers/Helpers";
import { CGreenChip } from "../Components/Custom/Chip/CChip";
import { CIconHeader } from "../Components/Typography/CIconHeader";
import { View } from "react-native";
import { useStorageViewModel } from "../ViewModels/StorageViewModel";

export function StorageView() {
    const { storageInfo } = useStorageViewModel()

    return (
        <BaseView>
            <>
               {
                    storageInfo.flatMap(info => {
                        return (
                            <View key={info.pool.id}>
                                <Card>                                        
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <CIconHeader iconName="harddisk">
                                            {info.pool.name}
                                        </CIconHeader>
                                        <CGreenChip text={info.pool.status}/>
                                    </View>
                                    
                                    <CVerticalSpacer margin={3}/>
                                    <CDivider/>
                                    <CVerticalSpacer margin={3}/>

                                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <Text category="h6" style={{fontWeight:"normal"}}>{toSize(info.poolDataset.used.parsed + info.poolDataset.available.parsed)} Total</Text>
                                        <Text category="h6" style={{fontWeight:"normal"}}>{toSize(info.poolDataset.available.parsed)} Free</Text>
                                    </View>
                                    <CVerticalSpacer margin={5}/>
                                    <CProgressBar progress={ info.poolDataset.used.parsed / (info.poolDataset.available.parsed + info.poolDataset.used.parsed) * 100 }/>
                                    
                                    {
                                        info.pool.healthy ? <></> : <>
                                            <CDivider/>
                                            <Text category="h5">Problems</Text>
                                            <CVerticalSpacer margin={3}/>
                                            <Text category="p1">{info.pool.status_detail}</Text>
                                        </>
                                    }
                                </Card>
                                <CVerticalSpacer/>
                            </View>
                        )
                    })
               }
            </>
        </BaseView>
    )
}

/**
 *  {
                    datasetInfo.flatMap(dataset => {
                        
                    })
                }
 */