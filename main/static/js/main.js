let mood, audio, playbtn, nextbtn, prevbtn, mutebtn, seekslider, volumeslider, seeking = false, seekto,
    curtimetext, durtimetext, current_song, dir, playlist, ext, agent, repeat, setvolume, angry_playlist, angry_title,
    angry_poster, happy_playlist, happy_title, happy_poster, calm_playlist, calm_title, calm_poster, sad_playlist,
    sad_title, sad_poster, playlist_index;

dir = "static/songs/"

angry_playlist = ["ACDC-BackinBlack", "OhTheLarceny-ManonaMission", "LedZeppelin-ImmigrantSong"];
angry_title = ["ACDC - Back in Black", "Oh The Larceny - Man on a Mission", "Led Zeppelin - Immigrant Song"];
angry_poster = ["static/song_imgs/back_in_black.jpg", "static/song_imgs/man_on_a_mission.jpg", "static/song_imgs/immigrant_song.jpg"];

happy_playlist = ["Balam Pichkari", "Barso Re", "Dil Na Jaane Kyun", "Jiya re", "Kesariya", "Luv u Zindaggi", "Makhna", "Matargashti", "Sooraj Ki Baahon Mein", "Zindagi Ek Safar"];
happy_title = ["Balam Pichkari", "Barso Re", "Dil Na Jaane Kyun", "Jiya re", "Kesariya", "Luv u Zindagi", "Makhna", "Matargashti", "Sooraj Ki Baahon Mein", "Zindagi Ek Safar"];
happy_poster = ["static/song_imgs/Balam_Pichkari_cover.jpg", "static/song_imgs/Guruposter.jpg", "static/song_imgs/jayantabhai-ki-luv-story.jpg", "static/song_imgs/jiya re.jpg", "static/song_imgs/kesariya.jpg","static/song_imgs/Dear_Zindagi_poster.jpg", "static/song_imgs/makhna.jpg", "static/song_imgs/Tamasha.jpg", "static/song_imgs/Zindagi-Na-Milegi-Dobara.jpg", "static/song_imgs/Zindagi Ek Safar.jpg" ];

calm_playlist = ["Aas Pass Hai Khuda", "Allah Ke Bande", "Behe Chala","Behti Hawa Sa Tha Woh","Dil Kyun","Hamdard","Hawayein","Kasto Mazza hai","Nazm Nazm","Samjhawan"];
calm_title = ["Aas Pass Hai Khuda", "Allah Ke Bande", "Behe Chala","Behti Hawa Sa Tha Woh","Dil Kyun","Hamdard","Hawayein","Kasto Mazza","Nazm Nazm","Samjhawan"];
calm_poster = ["static/song_imgs/AnjanaAnjani.jpg", "static/song_imgs/Kailasa.jpg", "static/song_imgs/Uri.jpg","static/song_imgs/3Idiots.jpg","static/song_imgs/Kites.jpg","static/song_imgs/Ek_Villain_Poster.jpg","static/song_imgs/JabHarySejal.jpg","static/song_imgs/Parineeta.jpg","static/song_imgs/BareilyBarfi.jpg","static/song_imgs/Humpty.jpg"];

sad_playlist = ["Aaoge Jab Tum", "Ae Dil Hai Mushkil", "Channa Mereya","Dil Ibaadat","Jag Soona Soona Lage","Khushi Ke Pal Kahan Dhundu","Kya Khoya","Pachtaoge","Thodi Jagah","Tum Hi Ho"];
sad_title = ["Aaoge Jab Tum", "Ae Dil Hai Mushkil", "Channa Mereya","Dil Ibaadat","Jag Soona Soona Lage","Khushi Ke Pal Kahan Dhundu","Kya Khoya","Pachtaoge","Thodi Jagah","Tum Hi Ho"];
sad_poster = ["static/song_imgs/JabWeMet.jpg", "static/song_imgs/Ae_Dil_Hai_Mushkil.jpg", "static/song_imgs/Ae_Dil_Hai_Mushkil.jpg","static/song_imgs/TumMile.jpg","static/song_imgs/OmShantiOm.jpeg","static/song_imgs/Shanghai.jpg","static/song_imgs/Khamoshiyan.jpg","static/song_imgs/Pachtaoge.jpg","static/song_imgs/Marjaavan.jpeg","static/song_imgs/Aashiqui2.jpg"];

ext = ".mp3";
agent = navigator.userAgent.toLowerCase()

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
current_song = document.getElementById("current_song");
repeat = document.getElementById("repeat");

audio = new Audio();
audio.loop = false;

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#imageCapture');

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", () => { nextSong(mood) });
prevbtn.addEventListener("click", () => { prevSong(mood) });
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function (event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
    seek(event);
})
seekslider.addEventListener("mouseup", function () {
    seeking = false;
})
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function () {
    seektimeupdate();
})
audio.addEventListener("ended", function () {
    switchTrack(mood);
})
repeat.addEventListener("click", loop);


function fetchMusicDetails(mood) {
    $("#playpausebtn img").attr("src", "static/imgs/pause.png");
    switch (mood) {
        case "Angry":
            $("#circle-image img").attr("src", angry_poster[playlist_index]);
            current_song.innerHTML = angry_title[playlist_index];
            audio.src = dir + angry_playlist[playlist_index] + ext;
            break;

        case "Happy":
            $("#circle-image img").attr("src", happy_poster[playlist_index]);
            current_song.innerHTML = happy_title[playlist_index];
            audio.src = dir + happy_playlist[playlist_index] + ext;
            break;

        case "Calm":
            $("#circle-image img").attr("src", calm_poster[playlist_index]);
            current_song.innerHTML = calm_title[playlist_index];
            audio.src = dir + calm_playlist[playlist_index] + ext;
            break;

        case "Sad":
            $("#circle-image img").attr("src", sad_poster[playlist_index]);
            current_song.innerHTML = sad_title[playlist_index];
            audio.src = dir + sad_playlist[playlist_index] + ext;
            break;
    }
    audio.play();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        $("#playpausebtn img").attr("src", "static/imgs/pause.png");
    } else {
        audio.pause();
        $("#playpausebtn img").attr("src", "static/imgs/play.png");
    }
}

function nextSong(mood) {
    playlist_index++;
    switch (mood) {
        case "Angry":
            if (playlist_index > angry_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Happy":
            if (playlist_index > happy_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Calm":
            if (playlist_index > calm_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Sad":
            if (playlist_index > sad_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function prevSong(mood) {
    playlist_index--;
    switch (mood) {
        case "Angry":
            if (playlist_index < 0) {
                playlist_index = angry_playlist.length - 1;
            }
            break;
        case "Happy":
            if (playlist_index < 0) {
                playlist_index = happy_playlist.length - 1;
            }
            break;
        case "Calm":
            if (playlist_index < 0) {
                playlist_index = calm_playlist.length - 1;
            }
            break;
        case "Sad":
            if (playlist_index < 0) {
                playlist_index = sad_playlist.length - 1;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function mute() {
    if (audio.muted) {
        audio.muted = false;
        $("#mutebtn img").attr("src", "static/imgs/speaker.png");
    } else {
        audio.muted = true;
        $("#mutebtn img").attr("src", "static/imgs/mute.png");
    }
}

function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function setVolume() {
    audio.volume = volumeslider.value / 100;
}

function seektimeupdate() {
    if (audio.duration) {
        let temp = audio.currentTime * (100 / audio.duration);
        seekslider.value = temp;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs
        }
        if (curmins < 10) {
            curmins = "0" + curmins
        }
        if (dursecs < 10) {
            dursecs = "0" + dursecs
        }
        if (durmins < 10) {
            durmins = "0" + durmins
        }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        curtimetext.innerHTML = "00:00";
        durtimetext.innerHTML = "00:00";
    }
}

function switchTrack(mood) {
    switch (mood) {
        case "Angry":
            if (playlist_index == angry_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Happy":
            if (playlist_index == happy_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Calm":
            if (playlist_index == calm_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Sad":
            if (playlist_index == sad_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function loop() {
    if (audio.loop) {
        audio.loop = false;
        $("#repeat img").attr("src", "static/imgs/loop.png");
    } else {
        audio.loop = true;
        $("#repeat img").attr("src", "static/imgs/loop1.png");
    }
}

document.querySelector('#test').addEventListener('click', function () {
    getExpression();
});

const getExpression = () => {
    Webcam.snap(image_uri => {
        console.log(image_uri)
        fetch('/expression', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_uri: image_uri })
        }).then(response => {
            return response.json();
        }).then(res => {
            mood = res.mood;
            mood = mood.charAt(0).toUpperCase() + mood.slice(1);
            document.querySelector('#status').innerHTML = `Current Mood: ${mood}`;
            switch (mood) {
                case "Angry":
                    playlist_index = 0;
                    audio.src = dir + angry_playlist[0] + ext;
                    current_song.innerHTML = angry_title[playlist_index];
                    $("#circle-image img").attr("src", angry_poster[playlist_index]);
                    $("body").css("background", "linear-gradient(to bottom, rgb(255, 0, 0) , rgb(255, 0, 76))");
                    break;
                case "Happy":
                    playlist_index = 0;
                    audio.src = dir + happy_playlist[0] + ext;
                    current_song.innerHTML = happy_title[playlist_index];
                    $("#circle-image img").attr("src", happy_poster[playlist_index]);
                    $("body").css("background", "url(https://www.sunwaymedical.com/images/establish.jpg)");
                    break;
                case "Calm":
                    playlist_index = 0;
                    audio.src = dir + calm_playlist[0] + ext;
                    current_song.innerHTML = calm_title[playlist_index];
                    $("#circle-image img").attr("src", calm_poster[playlist_index]);
                    $("body").css("background", "url(https://wallup.net/wp-content/uploads/2016/12/07/137513-field-depth_of_field-road-blonde-white_dress-Jake_Olson-Nebraska-children.jpg) -200px 60px ");
                    break;
                case "Sad":
                    playlist_index = 0;
                    audio.src = dir + sad_playlist[0] + ext;
                    current_song.innerHTML = sad_title[playlist_index];
                    $("#circle-image img").attr("src", sad_poster[playlist_index]);
                    $("body").css("background", "url(https://media.zicxa.com/507566)  ");
                    break;
            }
        });
    });
}

setTimeout(() => { getExpression() }, 2000);
