function playAudio(src) {
    src = '/android_asset/www/' + src;
    var media = new Media(src, success, errorThrown);
    media.play();
}

function success() {}
function errorThrown(e) {
    alert('Error while playing the sound!');
}/**
 * Created by cupbe_000 on 1/13/2015.
 */
