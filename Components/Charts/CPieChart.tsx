import { PieChart } from "react-native-chart-kit"

export function CPieChart(props: {accessor: string, data: Array<object>}) {
    return (
        <PieChart
            width={120}
            height={120}
            accessor={props.accessor}
            backgroundColor={"transparent"}
            hasLegend={false}
            paddingLeft="30"
            chartConfig={{
                color: () => {return "#fff"}
            }}
            data={props.data}
            absolute
        />
    )
}