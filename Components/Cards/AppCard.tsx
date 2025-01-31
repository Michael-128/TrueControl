import { Linking, View } from "react-native";
import { CVerticalSpacer } from "../Custom/CVerticalSpacer";
import { Card, Text, Button, Icon } from "@ui-kitten/components";
import { Image } from "react-native";
import { CBlueChip, CGreenChip, CRedChip } from "../Custom/Chip/CChip";
import { CHorizontalSpacer } from "../Custom/CHorizontalSpacer";
import { CDivider } from "../Custom/CDivider";
import { AppInfo } from "../../Models/AppInfo";
import { useEffect, useState } from "react";
import { CLabel } from "../Typography/CLabel";
import { postScaleReplicas } from "../../Views/AppsScreen/AppsLogic";
import { Credentials } from "../Storage/Storage";
import { sleep } from "../Helpers/Helpers";

export function AppCard(props: {app: AppInfo, credentials: Credentials, refreshApps: () => {}}) {
    const [isImageError, setIsImageError] = useState(false)

    const [openURL, setOpenURL] = useState<string | null>(null)

    function checkWebPortals() {
        if(!(props.app.hasOwnProperty("config"))) return false
        //console.log(1)
        if(!(props.app.hasOwnProperty("portals"))) return false
        //console.log(2)
        if(!props.app.portals.hasOwnProperty("web_portal")) return false
        //console.log(3)
        if(!(props.app.portals.web_portal!.length > 0)) return false
        //console.log(4)
        if(!(props.app.portals.web_portal![0].includes("https://") || props.app.portals.web_portal![0].includes("http://"))) return false
        //console.log(5)

        setOpenURL(props.app.portals.web_portal![0])
        return true
    }

    function checkOpen() {
        if(!(props.app.hasOwnProperty("config"))) return false
        if(!(props.app.hasOwnProperty("portals"))) return false
        if(!props.app.portals.hasOwnProperty("open")) return false
        if(!(props.app.portals.open!.length > 0)) return false
        if(typeof props.app.portals.open![0] != "string") return false
        if(!(props.app.portals.open![0].includes("https://") || props.app.portals.open![0].includes("http://"))) return false

        setOpenURL(props.app.portals.open![0])
        return true
    }

    useEffect(() => {
        if(!checkWebPortals())
            checkOpen()
    }, [props.app])

    async function followURL() {
        if(!openURL) return

        const supported = await Linking.canOpenURL(openURL);

        if (supported) {
            await Linking.openURL(openURL);
        }
    }

    async function scaleReplicas() {
        if(props.app.status.toLowerCase() == "active")
            postScaleReplicas(props.credentials.url, props.credentials.token, props.app.config.release_name, 0)
        else if(props.app.status.toLowerCase() == "stopped")
            postScaleReplicas(props.credentials.url, props.credentials.token, props.app.config.release_name, 1)

        await sleep(500)
        props.refreshApps()
    }

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
                    { props.app.status.toLowerCase() == "active" ? <CGreenChip text={props.app.status}/> : <></>}
                    { props.app.status.toLowerCase() == "stopped" ? <CRedChip text={props.app.status}/> : <></>}
                    { props.app.status.toLowerCase() == "deploying" ? <CBlueChip text={props.app.status}/> : <></>}
                    
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
                        props.app.status.toLowerCase() != "deploying" ?
                            <Button onPress={scaleReplicas}>
                                { props.app.status.toLowerCase() != "active" ? <Text>Start</Text> : <Text>Stop</Text> }
                            </Button>
                        : 
                            <Button disabled>
                                <Text>Deploying...</Text>
                            </Button>
                    }
                    
                    <CHorizontalSpacer/>

                    {
                        openURL && props.app.status.toLowerCase() === "active" ? 
                            <Button appearance="outline" onPress={followURL}>
                                <Text>Open</Text>
                            </Button>
                        :
                            <></>
                    }
                    
                </View>
                

            </Card>
        </View>
    )
}