import { Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

export function BaseView(props: {children: JSX.Element | JSX.Element[]}) {
    return (
        <ScrollView>
            <Layout style={{
                paddingVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: "transparent"
            }}>
                {props.children}
            </Layout>
        </ScrollView>
    )
}