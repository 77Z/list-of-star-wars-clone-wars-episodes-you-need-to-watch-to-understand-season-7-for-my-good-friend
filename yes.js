//Copyright © Vince Richter 2020

//Weather to continue drawing the line or not
var showTips = true;

//required for drawing svgs through js
const SVG_NS = 'http://www.w3.org/2000/svg';

var sublines = [];

//Create Arrow function
function createArrow() {
    var arrowContainer = document.getElementById("arrowcontainer");
    var timeline = document.getElementById("timeline");
    var help = document.getElementById("help");

    var x1 = help.offsetLeft - 10;
    var y1 = help.offsetTop + 50;

    var x2 = timeline.offsetLeft + 130;
    var y2 = timeline.offsetTop - 10;

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("height", window.innerHeight);
    svg.setAttribute("width", window.innerWidth);
    svg.innerHTML = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ff0000" stroke-width="4" style="stroke: #ff0000; stroke-width: 4" />`;

    arrowContainer.appendChild(svg);
}

//draw the arrow on load
createArrow();

//when the window is resized, the red line will recalculate
window.onresize = function() {
    //recalculate arrow
    if (this.showTips) {
        var arrowContainer = document.querySelector(".arrowcontainer");
        while(arrowContainer.firstChild) arrowContainer.removeChild(arrowContainer.firstChild);
        this.createArrow();
    }
};

//stop calculating arrow placement and stop showing tips on the hover of the timeline
document.getElementById("timeline").addEventListener("mouseover", function() {
    showTips = false;
    document.getElementById("helpcontainer").style.opacity = "0";
    document.getElementById("arrowcontainer").style.opacity = "0";
});

//function for sidescrolling I found on jsfiddle
function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

//click listeners for the arrows
document.getElementById("rightscroll").addEventListener("click", function() {
    sideScroll(document.getElementById("timeline"), "right", 10, 300, 10);
});

document.getElementById("leftscroll").addEventListener("click", function() {
    sideScroll(document.getElementById("timeline"), "left", 10, 300, 10);
});

//Show/hide the scrolling arrows every 100ms
setInterval(function() {
    var timeline = document.getElementById("timeline");
    var rightscroll = document.getElementById("rightscroll");
    var leftscroll = document.getElementById("leftscroll");
    if (timeline.scrollLeft !== 0) {
        //show scroll left
        leftscroll.style.display = "flex";
    } else {
        //hide it
        leftscroll.style.display = "none";
    }

    if (timeline.scrollLeft === (timeline.scrollWidth - timeline.offsetWidth)) {
        //hide it
        rightscroll.style.display = "none";
    } else {
        //show scroll right
        rightscroll.style.display = "flex";
    }
}, 100);



//Goodie Goods

//This function is to show the episodes you need to watch
function showUnderstandings(level, episodes) {
    if (typeof episodes !== "object") throw new TypeError();
    if (typeof level !== "number") throw new TypeError();
    if (level < 1) throw new TypeError();
    if (level > 5) throw new TypeError();

    if (episodes.episodes.season < 1) throw new TypeError();
    if (episodes.episodes.season > 7) throw new TypeError();

    var sublineId = Math.random().toString().split(".")[1];
    var subline = document.createElement("div");
    subline.id = sublineId;
    subline.setAttribute("class", "subline subline-level-" + level);
    sublines.push(sublineId);

    document.getElementById("sublime-container").appendChild(subline);

    for(var i = 0; i < episodes.episodes.length; i++) {
        //For every sub-episode, run this function
        var subEpisode = episodes.episodes[i];

        var episode = document.createElement("div");
        episode.setAttribute("class", "episode");

        var thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", "episodes/" + subEpisode.thumbnail);
        thumbnail.setAttribute("alt", subEpisode.name + " Thumbnail");

        var name = document.createElement("span");
        name.innerHTML = "<b>S" + subEpisode.season + " EP:" + subEpisode.episodeNumber + " " + subEpisode.name + "</b> (" + subEpisode.runtime + "m)";
        name.setAttribute("class", "title");

        episode.appendChild(thumbnail);
        episode.appendChild(name);
        subline.appendChild(episode);
    }


    //check to see if subline needs to scroll
    if (episodes.episodes.length * 300 > window.innerWidth) {
        //has to scroll. Probably add a css anim.
        setTimeout(function() {
            //check to see if the user has a smaller or bigger screen
            //if (window.innerWidth < 1200) {
            //    //small
            //    document.getElementById(sublineId).classList.add("sublineScroll");
            //} else {
            //    //big
            //    document.getElementById(sublineId).classList.add("sublineScrollbig");
            //}
            document.getElementById(sublineId).classList.add("sublineScroll");
        }, 1300);
    }

    setTimeout(function() {
        document.getElementById(sublineId).style.opacity = "1";
    }, 100);
}

function connectDivsThroughLines(element1, element2, linewidth, linecolor) {
    if (typeof linewidth !== "number") throw new TypeError();
    if (typeof linecolor !== "string") throw new TypeError();
}

function destroySubline() {
    if (sublines.length == 0) return; else {
        for (var i = 0; i < sublines.length; i++) {
            document.getElementById(sublines[i]).remove();
        }
        sublines = [];
    }
}


//EP hover events

document.getElementById("ep-thebadbatch").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        sublineTitle: "The Bad Batch Understandings",
        "episodes": [
            {
                name: "Clone Cadets",
                runtime: 26,
                episodeNumber: 1,
                season: 3,
                thumbnail: "S31.jpg",
                onhover() {}
            },
            {
                name: "The Citadel",
                runtime: 25,
                episodeNumber: 18,
                season: 3,
                thumbnail: "S318.png",
                onhover() {
                    //This is where the citadels understandings go :p
                }
            },
            {
                name: "Counterattack",
                runtime: 25,
                episodeNumber: 19,
                season: 3,
                thumbnail: "S319.jpg",
                onhover() {}
            },
            {
                name: "Citadel Rescue",
                runtime: 25,
                episodeNumber: 20,
                season: 3,
                thumbnail: "S320.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-adistantecho").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Clone Cadets",
                runtime: 26,
                episodeNumber: 1,
                season: 3,
                thumbnail: "S31.jpg",
                onhover() {}
            },
            {
                name: "The Citadel",
                runtime: 25,
                episodeNumber: 18,
                season: 3,
                thumbnail: "S318.png",
                onhover() {
                    //This is where the citadels understandings go :p
                }
            },
            {
                name: "Counterattack",
                runtime: 25,
                episodeNumber: 19,
                season: 3,
                thumbnail: "S319.jpg",
                onhover() {}
            },
            {
                name: "Citadel Rescue",
                runtime: 25,
                episodeNumber: 20,
                season: 3,
                thumbnail: "S320.jpg",
                onhover() {}
            },
            {
                name: "The Bad Batch",
                runtime: 27,
                episodeNumber: 1,
                season: 7,
                thumbnail: "1.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-onthewingsofkeeradaks").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Clone Cadets",
                runtime: 26,
                episodeNumber: 1,
                season: 3,
                thumbnail: "S31.jpg",
                onhover() {}
            },
            {
                name: "The Citadel",
                runtime: 25,
                episodeNumber: 18,
                season: 3,
                thumbnail: "S318.png",
                onhover() {}
            },
            {
                name: "Counterattack",
                runtime: 25,
                episodeNumber: 19,
                season: 3,
                thumbnail: "S319.jpg",
                onhover() {}
            },
            {
                name: "Citadel Rescue",
                runtime: 25,
                episodeNumber: 20,
                season: 3,
                thumbnail: "S320.jpg",
                onhover() {}
            },
            {
                name: "The Bad Batch",
                runtime: 27,
                episodeNumber: 1,
                season: 7,
                thumbnail: "1.jpg",
                onhover() {}
            },
            {
                name: "A Distant Echo",
                runtime: 26,
                episodeNumber: 2,
                season: 7,
                thumbnail: "2.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-unfinishedbusiness").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Clone Cadets",
                runtime: 26,
                episodeNumber: 1,
                season: 3,
                thumbnail: "S31.jpg",
                onhover() {}
            },
            {
                name: "The Citadel",
                runtime: 25,
                episodeNumber: 18,
                season: 3,
                thumbnail: "S318.png",
                onhover() {}
            },
            {
                name: "Counterattack",
                runtime: 25,
                episodeNumber: 19,
                season: 3,
                thumbnail: "S319.jpg",
                onhover() {}
            },
            {
                name: "Citadel Rescue",
                runtime: 25,
                episodeNumber: 20,
                season: 3,
                thumbnail: "S320.jpg",
                onhover() {}
            },
            {
                name: "The Bad Batch",
                runtime: 27,
                episodeNumber: 1,
                season: 7,
                thumbnail: "1.jpg",
                onhover() {}
            },
            {
                name: "A Distant Echo",
                runtime: 26,
                episodeNumber: 2,
                season: 7,
                thumbnail: "2.jpg",
                onhover() {}
            },
            {
                name: "On the Wings of Keeradaks",
                runtime: 21,
                episodeNumber: 3,
                season: 7,
                thumbnail: "3.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-gonewithatrace").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Sabotage",
                runtime: 26,
                episodeNumber: 17,
                season: 5,
                thumbnail: "S517.jpg",
                onhover() {}
            },
            {
                name: "The Jedi Who Knew Too Much",
                runtime: 26,
                episodeNumber: 18,
                season: 5,
                thumbnail: "S518.jpg",
                onhover() {}
            },
            {
                name: "To Catch a Jedi",
                runtime: 26,
                episodeNumber: 19,
                season: 5,
                thumbnail: "S519.jpg",
                onhover() {}
            },
            {
                name: "The Wrong Jedi",
                runtime: 26,
                episodeNumber: 20,
                season: 5,
                thumbnail: "S520.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-dealnodeal").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Sabotage",
                runtime: 26,
                episodeNumber: 17,
                season: 5,
                thumbnail: "S517.jpg",
                onhover() {}
            },
            {
                name: "The Jedi Who Knew Too Much",
                runtime: 26,
                episodeNumber: 18,
                season: 5,
                thumbnail: "S518.jpg",
                onhover() {}
            },
            {
                name: "To Catch a Jedi",
                runtime: 26,
                episodeNumber: 19,
                season: 5,
                thumbnail: "S519.jpg",
                onhover() {}
            },
            {
                name: "The Wrong Jedi",
                runtime: 26,
                episodeNumber: 20,
                season: 5,
                thumbnail: "S520.jpg",
                onhover() {}
            },
            {
                name: "Gone with a Trace",
                runtime: 25,
                episodeNumber: 5,
                season: 7,
                thumbnail: "5.jpg",
                onhover() {}
            }
        ]
    });
});


document.getElementById("ep-dangerousdebt").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Sabotage",
                runtime: 26,
                episodeNumber: 17,
                season: 5,
                thumbnail: "S517.jpg",
                onhover() {}
            },
            {
                name: "The Jedi Who Knew Too Much",
                runtime: 26,
                episodeNumber: 18,
                season: 5,
                thumbnail: "S518.jpg",
                onhover() {}
            },
            {
                name: "To Catch a Jedi",
                runtime: 26,
                episodeNumber: 19,
                season: 5,
                thumbnail: "S519.jpg",
                onhover() {}
            },
            {
                name: "The Wrong Jedi",
                runtime: 26,
                episodeNumber: 20,
                season: 5,
                thumbnail: "S520.jpg",
                onhover() {}
            },
            {
                name: "Gone with a Trace",
                runtime: 25,
                episodeNumber: 5,
                season: 7,
                thumbnail: "5.jpg",
                onhover() {}
            },
            {
                name: "Deal No Deal",
                runtime: 27,
                episodeNumber: 6,
                season: 7,
                thumbnail: "6.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-togethoragain").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        "episodes": [
            {
                name: "Sabotage",
                runtime: 26,
                episodeNumber: 17,
                season: 5,
                thumbnail: "S517.jpg",
                onhover() {}
            },
            {
                name: "The Jedi Who Knew Too Much",
                runtime: 26,
                episodeNumber: 18,
                season: 5,
                thumbnail: "S518.jpg",
                onhover() {}
            },
            {
                name: "To Catch a Jedi",
                runtime: 26,
                episodeNumber: 19,
                season: 5,
                thumbnail: "S519.jpg",
                onhover() {}
            },
            {
                name: "The Wrong Jedi",
                runtime: 26,
                episodeNumber: 20,
                season: 5,
                thumbnail: "S520.jpg",
                onhover() {}
            },
            {
                name: "Gone with a Trace",
                runtime: 25,
                episodeNumber: 5,
                season: 7,
                thumbnail: "5.jpg",
                onhover() {}
            },
            {
                name: "Deal No Deal",
                runtime: 27,
                episodeNumber: 6,
                season: 7,
                thumbnail: "6.jpg",
                onhover() {}
            },
            {
                name: "Dangerous Debt",
                runtime: 27,
                episodeNumber: 7,
                season: 7,
                thumbnail: "7.jpg",
                onhover() {}
            }
        ]
    });
});

document.getElementById("ep-oldfriendsnotforgotten").addEventListener("mouseenter", function() {
    showUnderstandings(1, {
        episodes: [
            {
                name: "Star Wars: The Phantom Menace",
                runtime: 136,
                episodeNumber: 1,
                season: 0,
                thumbnail: "phantommenace.jpg",
                onhover() {}
            },
            {
                name: "Sabotage",
                runtime: 26,
                episodeNumber: 17,
                season: 5,
                thumbnail: "S517.jpg",
                onhover() {}
            },
            {
                name: "The Jedi Who Knew Too Much",
                runtime: 26,
                episodeNumber: 18,
                season: 5,
                thumbnail: "S518.jpg",
                onhover() {}
            },
            {
                name: "To Catch a Jedi",
                runtime: 26,
                episodeNumber: 19,
                season: 5,
                thumbnail: "S519.jpg",
                onhover() {}
            },
            {
                name: "The Wrong Jedi",
                runtime: 26,
                episodeNumber: 20,
                season: 5,
                thumbnail: "S520.jpg",
                onhover() {}
            },
            {
                name: "Gone with a Trace",
                runtime: 25,
                episodeNumber: 5,
                season: 7,
                thumbnail: "5.jpg",
                onhover() {}
            },
            {
                name: "Deal No Deal",
                runtime: 27,
                episodeNumber: 6,
                season: 7,
                thumbnail: "6.jpg",
                onhover() {}
            },
            {
                name: "Dangerous Debt",
                runtime: 27,
                episodeNumber: 7,
                season: 7,
                thumbnail: "7.jpg",
                onhover() {}
            },
            {
                name: "Togethor Again",
                runtime: 26,
                episodeNumber: 8,
                season: 7,
                thumbnail: "8.jpg",
                onhover() {}
            },
            {
                name: "The Mandalore Plot",
                runtime: 25,
                episodeNumber: 12,
                season: 2,
                thumbnail: "S212.jpg",
                onhover() {}
            },
            {
                name: "A Friend in Need",
                runtime: 26,
                episodeNumber: 14,
                season: 4,
                thumbnail: "S414.jpg"
            }
        ]
    });
});



//Destroy on leave
document.getElementById("ep-thebadbatch").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-adistantecho").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-onthewingsofkeeradaks").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-unfinishedbusiness").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-gonewithatrace").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-dealnodeal").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-dangerousdebt").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-togethoragain").addEventListener("mouseleave", destroySubline);
document.getElementById("ep-oldfriendsnotforgotten").addEventListener("mouseleave", destroySubline);