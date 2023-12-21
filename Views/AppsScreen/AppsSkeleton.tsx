import { Text } from "@ui-kitten/components";
import { BaseScreen } from "../BaseScreen";
import { AppsSkeletonCard } from "../../Components/Cards/AppsSkeletonCard";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";

export function AppsSkeleton() {
    return (
        <BaseScreen>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
            <AppsSkeletonCard/>
            <CVerticalSpacer/>
        </BaseScreen>
    )
}