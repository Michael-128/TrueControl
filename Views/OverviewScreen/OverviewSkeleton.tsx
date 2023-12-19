import { BaseScreen } from "../BaseScreen";
import { SkeletonCard } from "../../Components/Cards/SkeletonCard";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";

export function OverviewSkeleton() {
    return (
        <BaseScreen>
            <SkeletonCard title="System" iconName="nas" />
            <CVerticalSpacer/>
            <SkeletonCard title="Processor" iconName="chip" />
            <CVerticalSpacer/>
            <SkeletonCard title="Memory" iconName="memory" />
            <CVerticalSpacer/>
            <SkeletonCard title="Storage" iconName="harddisk" />
            <CVerticalSpacer/>
            <SkeletonCard title="Network" iconName="network" />
        </BaseScreen>
    )
}