// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-models/video-models'
import {DBType} from '../src/db/db'

export const video1: any /*VideoDBType*/ = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    // author: 'a' + Date.now() + Math.random(),
    // canBeDownloaded: true,
    // minAgeRestriction: null,
    // createdAt: new Date().toISOString(),
    // publicationDate: new Date().toISOString(),
    // availableResolution: [Resolutions.P240],
}

// ...

export const dataset1: DBType = {
    videos: [video1],
}
