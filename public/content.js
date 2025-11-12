let autoPauseEnabled = true

const pausedByScript = new WeakMap();

chrome.storage.sync.get(["enabled"],(result)=>{
    autoPauseEnabled = result.enabled ?? true;
})

chrome.storage.onChanged.addListener((changes,area)=>{
    if(area === "sync" && changes.enabled){
        autoPauseEnabled = changes.enabled.newValue;
    }
})

function autopause(video){
    if(!video){
        return;
    }
    document.addEventListener("visibilitychange",()=>{
        if(!autoPauseEnabled){
            return;
        }
        if(document.hidden){
            if(!video.paused){
                video.pause();
                pausedByScript.set(video,true)
            }
        }else{
            if(pausedByScript.get(video)){
                video.play();
                pausedByScript.set(video,false)
            }
        }
    })
}
function getVideo(){
    const video = document.querySelector("video");
    autopause(video)
}
const observer = new MutationObserver(()=>{
    const video = document.querySelector("video");
    if(video && !video.hasAttribute("data-autopause")){
        video.setAttribute("data-autopause","true");
        autopause(video)
    }
})
observer.observe(document.body,{childList:true,subtree:true});

getVideo();