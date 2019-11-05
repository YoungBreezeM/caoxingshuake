var fa = $("body");
var btn = $("<li></li>");
var json = {
    "background": "#42b983",
    "height": "16px",
    "padding": "5px",
    "z-index": 999,
    "cursor": "pointer",
    "bottom": "0",
    "left": "0",
    "color": "#fff",
    "position": "fixed"
};

//查找当前播放的位置
var index = 18;

// $(".ncells h4").each((i,item)=>{
// 	if($(item).hasClass("currents")){
//        // index=i;
//         console.log(i )
// 		return false;
// 	}
// });

//自动跳转下一个视频
function autoNext() {
    index++;
     let str = document.querySelectorAll(".ncells")[index].querySelector("a").title;
     if(str.indexOf("实操训练")>=0){
         index++;
     }
     window.location.href = document.querySelectorAll(".ncells")[index].querySelector("a").href;
    // console.log(document.querySelectorAll(".ncells")[index].querySelector("a").href);
}

btn.css(json);
btn.html("<span id='lfsenior'>开启自动播放模式</span>");
fa.append(btn);

btn.click(function () {
    let run = setInterval(() => {
        //获取iframe
        var video = $("iframe").contents().find("iframe").contents();
        //播放函数
        var play = function () {
            video.find("#video > button").click();
            var jy = video.find("#video > div.vjs-control-bar > div.vjs-volume-panel.vjs-control.vjs-volume-panel-vertical > button");

            //静音
            if (jy.attr("title") != "取消静音") jy.click();
        }
        //如果正在加载
        var load = video.find("#loading");
        if (load.css("visibility") != "hidden") {
            return false;
        }
        //获取当前进度
        var spans = video.find("#video > div.vjs-control-bar > div.vjs-progress-control.vjs-control > div").attr("aria-valuenow");
        // console.log(spans )
        // 如果还没播放完
        if (spans != 100) {
            play();
        }
        //  console.log(spans )
        //如果播放结束
        if (spans == 100) {
            console.log("第" + (index + 1) + "章节结束");
            // 自动跳到下一个视频
            console.log("跳到下一个视频")
            autoNext();
            setTimeout(() => {
                $("span[title='视频']").trigger("click");
            }, 2000);
            //   clearInterval(run);//计时器线程结束
            var bs = false;
            $(".onetoone").find(".flush").each(function () {
                if (bs) {
                    $(this).prev("a").on('click', "#coursetree>ncells", function () {
                        console.log("已结束章节：" + $(this).prev("a").attr("title"));
                    });
                    var str = $(this).prev("a").attr("href");
                    str = str.match(/'(\S*)'/)[1];
                    var reg = new RegExp("'", "g");
                    str = str.replace(reg, "");
                    var href = str.split(",");
                    getTeacherAjax(href[0], href[1], href[2])
                    bs = false;
                }
                if ($(this).css("display") == "block") {
                    bs = true;
                }
            })
        }
        $("#lfsenior").html("自动模式已开启,本章进度:" + spans + "%");
    }, 100);
});
