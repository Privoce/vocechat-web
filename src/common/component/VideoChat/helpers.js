function getTrack(tracks) {
    if (Array.isArray(tracks)) {
        return tracks[0];
    } else {
        return tracks;
    }
}
function clientDebugger(client) {
}
export { getTrack, clientDebugger };