import { View } from "react-native";
import { CVerticalSpacer } from "../Custom/CVerticalSpacer";
import { Card, Text, Button, Icon } from "@ui-kitten/components";
import { Image } from "react-native";
import { CBlueChip, CGreenChip, CRedChip } from "../Custom/Chip/CChip";
import { CHorizontalSpacer } from "../Custom/CHorizontalSpacer";
import { CDivider } from "../Custom/CDivider";
import { AppInfo } from "../../Types/Intefaces/AppInfo";
import { useState } from "react";

export function AppCard(props: {app: AppInfo}) {
    const [isImageError, setIsImageError] = useState(false)

    return (
        <View>
            <CVerticalSpacer/>
            <Card>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    {
                        !isImageError ?
                            <Image onError={() => {setIsImageError(true)}} style={{height: 32, width: 32, resizeMode: "contain", marginRight: 10}} alt="App" source={{uri: props.app.chart_metadata.icon}}/>
                        :
                            <Icon name="apps" pack="material" style={{height: 24, width: 24, marginRight: 10}}/>
                    }
                    <Text category="h5">{props.app.name}</Text>
                </View>
                <CVerticalSpacer margin={3}/>
                <Text category="s1">{props.app.chart_metadata.description}</Text>
                
                <CVerticalSpacer margin={5}/>
                
                <View style={{flexDirection: "row"}}>
                    {
                        props.app.status == "ACTIVE" ?
                            <CGreenChip text={props.app.status}/>
                        :
                            <CRedChip text={props.app.status}/>
                    }

                    <CHorizontalSpacer margin={5}/>

                    {
                        props.app.update_available ? <CBlueChip text="Updates Available"/> : <></>
                    }
                </View>
                
                <CDivider/>

                <Text category="h6">Actions</Text>
                
                <CVerticalSpacer margin={5}/>

                <View style={{flexDirection: "row"}}>
                    {
                        props.app.status != "ACTIVE" ?
                            <Button>
                                <Text>Start</Text>
                            </Button>
                        :
                            <Button>
                                <Text>Stop</Text>
                            </Button>
                    }
                    
                    
                    <CHorizontalSpacer/>

                    <Button appearance="outline">
                        <Text>Open</Text>
                    </Button>
                </View>
                

            </Card>
        </View>
    )
}