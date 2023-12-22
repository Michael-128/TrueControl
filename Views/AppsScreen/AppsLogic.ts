import { postFetch } from "../BaseLogic/BaseLogic";

export async function postScaleReplicas(url: string, token: string, releaseName: string, replicaCount: number) {
    const res = await postFetch(`${url}/api/v2.0/chart/release/scale`, token, {
        release_name: releaseName,
        scale_options: {
            replica_count: replicaCount
        }
    })
}