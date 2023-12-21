import { BaseScreen } from "../BaseScreen";
import { OverviewSkeletonCard } from "../../Components/Cards/OverviewSkeletonCard";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";

export function OverviewSkeleton() {
    return (
        <BaseScreen>
            <OverviewSkeletonCard title="System" iconName="nas" />
            <CVerticalSpacer/>
            <OverviewSkeletonCard title="Processor" iconName="chip" />
            <CVerticalSpacer/>
            <OverviewSkeletonCard title="Memory" iconName="memory" />
            <CVerticalSpacer/>
            <OverviewSkeletonCard title="Storage" iconName="harddisk" />
            <CVerticalSpacer/>
            <OverviewSkeletonCard title="Network" iconName="network" />
        </BaseScreen>
    )
}