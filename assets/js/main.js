


const $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)
    modeBox = $('.mode-box')
    modeIconImg = $('.mode-icon img')
    bgrVideo = $('.background-video video')
    menuButton = $('.menu-icon')
    rainButton = $('.rain-button')
    noiseItems  = $$('.noise-item input')
    musicMenuList = $$('.music-menu-item audio')
    musicSongList = $('.music-song-list')
    musicSongItem = $('.music-song-item audio')
    pausePlayBtn = $('.pause-play-btn')
    volumeTrackFull = $('.volume-track-full input')
const app = {
    isDay: true,
    isRain: true,
    isMenuBlock: true,
    isPlay: true,
    indexSong: 1,
    
    fetchAPI(){
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1LHdX1CrJQct6f6t1Cx8IxvtdLUjwd5kG0yPH9R0saRY/values/'tracce%20custom'!A2:F100?key=AIzaSyCo3Wls8gIK0QuoUW3LlO4tbZD6DSxqe6g`)
        .then((respon) => respon.json() )
        .then((datas) => {
            console.log(datas);
            this.setSong(datas)
            this.handleNextPre(datas)
        })
    },
    // neu ma het nhac se chuyen bai
    endSong(){
        musicSongItem.onended = () => {
            $('.next').click()
        }
    },
    //  lui bai hat
    preSong(datas){
        this.indexSong -= 1 
        if(this.indexSong === 0){
            this.indexSong = datas.values.length - 1
        }
        this.setSong(datas)
        
    },
    //  chuyen bai hat
    nextSong(datas){
        this.indexSong += 1 
        if(this.indexSong > datas.values.length - 1){
            this.indexSong = 1
        }
        this.setSong(datas)
        
    },
    // hanh dong tien, lui bai hat
    handleNextPre(datas){
        $('.pre').onclick = () => {
                this.preSong(datas)
                this.isPlay = false
                musicSongItem.play()
        }
        $('.next').onclick = () => {
                this.nextSong(datas)
                this.isPlay = false
                musicSongItem.play()
        }
    },
    // set bai hat
    setSong(datas){
        musicSongItem.src = `${datas.values[this.indexSong][3]}`
    },
    playSong(){
        pausePlayBtn.onclick = () => {
            if( this.isPlay === true ) {
                musicSongItem.play()
                this.isPlay = false
            }
            else {
                musicSongItem.pause()
                this.isPlay = true
            }
        }
        musicSongItem.onplay = () =>{
            $('.play').classList.remove('none')
            $('.pause').classList.add('none')
        }
        musicSongItem.onpause = () =>{
            $('.play').classList.add('none')
                $('.pause').classList.remove('none')
        }
    },
    // mode sang toi
    toggleMode(){
        modeBox.onclick = () => {
            if(this.isDay === true) {
                // icon , hinh tron
                $('.mode-item').classList.add('mode-item-night')
                $('.mode-icon').classList.add('mode-icon-night')
                modeIconImg.src = './assets/img/mode/day.d259f96b.svg'
                $('.background-video-1').style.opacity = '0'
                $('.background-video-2').style.opacity = '1'
                if(this.isRain === false ){
                    $('.background-video-2-rain').style.opacity = '1'
                }
                else {
                    
                }
                
                this.isDay = false

            }
            else {
                // icon , hinh tron

                $('.mode-item.mode-item-night').classList.remove('mode-item-night')
                $('.mode-icon.mode-icon-night ').classList.remove('mode-icon-night')
                modeIconImg.src = './assets/img/mode/night.5e06c080.svg'
                $('.background-video-1').style.opacity = '1'
                $('.background-video-2-rain').style.opacity = '0'

                $('.background-video-2').style.opacity = '0'
                if(this.isRain === true ){

                }
                else {
                    $('.background-video-1-rain').style.opacity = '1'
                }
                this.isDay = true

            }
        }
        menuButton.onclick = () => {
            if(this.isMenuBlock === true){
                $('.mix').style.opacity = '1'
                this.isMenuBlock = false
            }
            else {
                $('.mix').style.opacity = '0'
                this.isMenuBlock = true
            }

        }

    },
    // mua
    toggleRain(){
        rainButton.onclick = () => {
            if(this.isDay === true ){
                
                if(this.isRain === true ){
                    $('.background-video-1-rain').style.opacity = '1'
                    this.isRain = false
                }
                else {
                    $('.background-video-1-rain').style.opacity = '0'
                    this.isRain = true
                }
            }
            else {
                if(this.isRain === true ){
                    $('.background-video-2-rain').style.opacity = '1'
                    this.isRain = false

                }
                else {
                    $('.background-video-2-rain').style.opacity = '0'
                    this.isRain = true

                }
               
            }
        }

    },
    // thay doi volume
    changeVolumeMenu(){
        
        musicMenuList.forEach((musicMenuItem, index) => {
            musicMenuList[index].volume =  (noiseItems[index].value)/100 
            musicMenuItem.play()
        })

    },
    changeVolumeSong(){
        musicSongItem.volume = (volumeTrackFull.value)/100
    },
    
    start(){
        this.playSong()
        this.changeVolumeMenu()
        this.toggleMode()
        this.toggleRain()
        this.fetchAPI()
        this.endSong()
    }
    
}
app.start()



