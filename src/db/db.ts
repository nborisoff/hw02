// import {VideoDBType} from './video-db-type'

import {VideoDBType} from "../types/videos";

export type DBType = {
    videos: VideoDBType[];
    // some: any[]
}

export const db: DBType = {
    videos: [],
    // some: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.videos = []
        // db.some = []
        return
    }

    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}
