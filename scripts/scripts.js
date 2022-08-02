const videos = {
    options: [{
            0: {
                title: "Start Here",
                url: 'https://player.vimeo.com/external/115250225.hd.mp4?s=3495e1727e280418c05cacdc6e0fe708650be9ee&profile_id=175',
            }
        }, {
            optionsDescription: "Your choice - Get more information on",
            0: {
                title: "Deep dive diagnostic criteria",
                url: 'https://player.vimeo.com/external/115250225.hd.mp4?s=3495e1727e280418c05cacdc6e0fe708650be9ee&profile_id=175',
            },
            1: {
                title: "Risk of progression to MM – Mayo model",
                url: 'https://player.vimeo.com/external/115250227.hd.mp4?s=3a2c0a545c9cd9b54532835978318007683c303f&profile_id=175',
            },
            2: {
                title: "Risk of progression to MM – Spanish model",
                url: 'https://player.vimeo.com/external/115250228.hd.mp4?s=a675616db68c0fff31205df308c29e9aa1746949&profile_id=175',
            }
        }, {
            optionsDescription: "Your choice - Imaging topic",
            0: {
                title: "Imaging – Completely negative",
                url: 'https://player.vimeo.com/external/115250225.hd.mp4?s=3495e1727e280418c05cacdc6e0fe708650be9ee&profile_id=175',
            },
            1: {
                title: "Imaging – Positive, but not fulfilling criteria for active MM",
                url: 'https://player.vimeo.com/external/115250227.hd.mp4?s=3a2c0a545c9cd9b54532835978318007683c303f&profile_id=175',
            }
        }, {
            optionsDescription: "Your choice - Treatment",
            0: {
                title: "To treat?",
                url: 'https://player.vimeo.com/external/115250225.hd.mp4?s=3495e1727e280418c05cacdc6e0fe708650be9ee&profile_id=175',
            },
            1: {
                title: "Len/Len-dex",
                url: 'https://player.vimeo.com/external/115250227.hd.mp4?s=3a2c0a545c9cd9b54532835978318007683c303f&profile_id=175',
            },
            2: {
                title: "KRd",
                url: 'https://player.vimeo.com/external/115250228.hd.mp4?s=a675616db68c0fff31205df308c29e9aa1746949&profile_id=175',
            }
        }
        // , {
        //     0: {
        //         title: "end",
        //         url: 'https://player.vimeo.com/external/115250225.hd.mp4?s=3495e1727e280418c05cacdc6e0fe708650be9ee&profile_id=175',
        //     }
        // }
    ]
};
var phase_counter = 0;

$(function() {
    createMenu(phase_counter);

    $(".options-grid").on("click", function(event) {
        if ($(event.target).data('option') != undefined) {
            $(".video-container").removeClass("hide").addClass("show");
            //$(".options-grid").removeClass("show").addClass("hide");
            $(".grid-container").removeClass("show").addClass("hide");
            console.log(videos.options[phase_counter][$(event.target).data('option')].title)

            $('<source />', {
                type: 'video/mp4',
                src: videos.options[phase_counter][$(event.target).data('option')].url,
            }).appendTo($('video'));

            phase_counter++;
            if (phase_counter >= videos.options.length) {
                phase_counter = 0;
            }
            if (phase_counter == 0) {
                $(".back-button").removeClass("show").addClass("hide");
            } else {
                $(".back-button").removeClass("hide").addClass("show");
            }
        }
    });
    $('video').on('ended', function() {
        changePhase(phase_counter);
    })
    $("#home").on('click', function() {
        phase_counter = 0;
        changePhase(phase_counter);
    });
    $("#back").on('click', function() {
        phase_counter--;
        changePhase(phase_counter);
    });
    $("#start").on('click', function() {
        $(".video-container").removeClass("hide").addClass("show");
        $(".get-started").removeClass("show").addClass("hide");
        $(".myke-logo").removeClass("hide").addClass("show");
        console.log(videos.options[phase_counter][$(this).data('option')].title)
        $('<source />', {
            type: 'video/mp4',
            src: videos.options[phase_counter][$(this).data('option')].url,
        }).appendTo($('video'));

        phase_counter++;
        if (phase_counter >= videos.options.length) {
            phase_counter = 0;
        }
    });

    $("#fullscreen").on('click', function() {
        if (!$(this).hasClass("opened")) {
            if (screenfull.isEnabled) {
                screenfull.request();
                $(this).addClass("opened");
            }
        } else {
            if (screenfull.isEnabled) {
                screenfull.exit();
                $(this).removeClass("opened");
            }
        }
    });
});

function toggleVisibility(element) {
    if (element.hasClass('hide')) {
        element.removeClass('hide');
        element.addClass('show');
    } else if (element.hasClass('show')) {
        element.removeClass('show');
        element.addClass('hide');
    }
}

function createMenu(id) {
    $(".options-grid").empty();
    if (phase_counter > 0) {
        $('<div class="case-study"><img src = "assets/icons/smmCaseStudy.svg"/></div><div class="option-description">' + videos.options[id].optionsDescription + '</div>')
            .appendTo($('.options-grid'));
        for (const [key, value] of Object.entries(videos.options[id])) {
            if (key != "optionsDescription") {
                console.log("key: " + key + " value: " + value);
                $('<div class="option-' + key + '"><a data-option = "' + key + '">' + value.title + '</a></div>').appendTo($('.options-grid'));
                $('<div class="border-' + key + '"></div>').appendTo($('.options-grid'));
            }
        };
    } else if (phase_counter == 0) {
        console.log("first");
        $(".get-started").removeClass("hide").addClass("show");
        $(".myke-logo").removeClass("show").addClass("hide");
    } else {
        console.log("error: negative phase_counter")
    }
}

function changePhase(new_phase) {
    $(".video-container").removeClass("show").addClass("hide");
    // $(".options-grid").removeClass("hide").addClass("show");
    $(".grid-container").removeClass("hide").addClass("show");
    if (phase_counter == 0) {
        $(".back-button").removeClass("show").addClass("hide");
    } else {
        $(".back-button").removeClass("hide").addClass("show");
    }

    createMenu(new_phase);

    $("video").get(0).pause();
    $("video").children('source').remove();
    $("video").get(0).load();
}